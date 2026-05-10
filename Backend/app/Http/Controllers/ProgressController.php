<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Quiz;
use App\Models\QuizOption;
use App\Models\Topic;
use App\Models\UserAchievement;
use App\Models\UserMaterialProgress;
use App\Models\UserQuizProgress;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    use ApiResponse;

    /**
     * Mark a material as completed for the current user.
     */
    public function completeMaterial(Request $request)
    {
        $request->validate([
            'material_id' => 'required|exists:materials,id',
        ]);

        $user = $request->user();

        // Prevent duplicate completion records
        $existing = UserMaterialProgress::where('user_id', $user->id)
            ->where('material_id', $request->material_id)
            ->first();

        if ($existing) {
            return $this->success(null, 'Material already completed');
        }

        UserMaterialProgress::create([
            'user_id'     => $user->id,
            'material_id' => $request->material_id,
        ]);

        // Check achievements after completing material
        $this->checkAchievements($user);

        return $this->success(null, 'Material completed', 201);
    }

    /**
     * Submit quiz answers, evaluate score, award XP.
     *
     * Expects: { quiz_id: int, answers: { question_id: option_id, ... } }
     */
    public function submitQuiz(Request $request)
    {
        $request->validate([
            'quiz_id'  => 'required|exists:quizzes,id',
            'answers'  => 'required|array',
        ]);

        $user = $request->user();
        $quiz = Quiz::with('questions.options')->findOrFail($request->quiz_id);

        // Evaluate answers
        $totalQuestions = $quiz->questions->count();
        $correctCount   = 0;

        foreach ($quiz->questions as $question) {
            $selectedOptionId = $request->answers[$question->id] ?? null;

            if ($selectedOptionId) {
                $isCorrect = QuizOption::where('id', $selectedOptionId)
                    ->where('quiz_question_id', $question->id)
                    ->where('is_correct', true)
                    ->exists();

                if ($isCorrect) {
                    $correctCount++;
                }
            }
        }

        // Calculate score (0-100)
        $score = $totalQuestions > 0 ? round(($correctCount / $totalQuestions) * 100) : 0;

        // Update or create quiz progress
        $progress = UserQuizProgress::updateOrCreate(
            ['user_id' => $user->id, 'quiz_id' => $quiz->id],
            [
                'best_score' => \DB::raw("GREATEST(best_score, {$score})"),
                'attempts'   => \DB::raw('attempts + 1'),
            ]
        );

        // Award XP based on score (only if score >= 60)
        $xpEarned = 0;
        if ($score >= 60) {
            $xpEarned = intval($quiz->xp_reward * ($score / 100));
            $user->increment('total_xp', $xpEarned);
        }

        // Reload to get actual best_score
        $progress->refresh();

        // Check achievements after quiz
        $this->checkAchievements($user);

        return $this->success([
            'score'          => $score,
            'correct'        => $correctCount,
            'total'          => $totalQuestions,
            'xp_earned'      => $xpEarned,
            'best_score'     => $progress->best_score,
            'total_xp'       => $user->fresh()->total_xp,
        ], 'Quiz submitted');
    }

    /**
     * Get progress summary for the current user.
     */
    public function summary(Request $request)
    {
        $user = $request->user();

        $materialsCompleted = UserMaterialProgress::where('user_id', $user->id)->count();
        $quizzesCompleted   = UserQuizProgress::where('user_id', $user->id)->count();
        $achievementsCount  = UserAchievement::where('user_id', $user->id)->count();
        $totalTopics        = Topic::count();

        // Topics with at least one material completed
        $topicsStarted = UserMaterialProgress::where('user_id', $user->id)
            ->join('materials', 'materials.id', '=', 'user_material_progress.material_id')
            ->distinct('materials.topic_id')
            ->count('materials.topic_id');

        return $this->success([
            'total_xp'            => $user->total_xp,
            'materials_completed' => $materialsCompleted,
            'quizzes_completed'   => $quizzesCompleted,
            'achievements_count'  => $achievementsCount,
            'topics_started'      => $topicsStarted,
            'total_topics'        => $totalTopics,
        ]);
    }

    /**
     * Get topic-level progress for the current user (which materials/quizzes are done).
     */
    public function topicProgress(Request $request, string $slug)
    {
        $user  = $request->user();
        $topic = Topic::where('slug', $slug)->with(['materials', 'quizzes'])->first();

        if (!$topic) {
            return $this->error('Topic not found', 404);
        }

        $completedMaterialIds = UserMaterialProgress::where('user_id', $user->id)
            ->whereIn('material_id', $topic->materials->pluck('id'))
            ->pluck('material_id');

        $quizProgress = UserQuizProgress::where('user_id', $user->id)
            ->whereIn('quiz_id', $topic->quizzes->pluck('id'))
            ->get()
            ->keyBy('quiz_id');

        return $this->success([
            'topic_id'               => $topic->id,
            'completed_material_ids' => $completedMaterialIds,
            'quiz_progress'          => $quizProgress,
        ]);
    }

    /**
     * Evaluate and unlock achievements for a user.
     */
    private function checkAchievements($user)
    {
        $materialsCompleted = UserMaterialProgress::where('user_id', $user->id)->count();
        $quizzesCompleted   = UserQuizProgress::where('user_id', $user->id)->count();
        $totalXp            = $user->fresh()->total_xp;

        // Get total materials across all topics
        $totalMaterials = \App\Models\Material::count();
        $allMaterialsDone = $materialsCompleted >= $totalMaterials && $totalMaterials > 0;

        $achievements = Achievement::all();

        foreach ($achievements as $achievement) {
            // Skip if already unlocked
            $alreadyUnlocked = UserAchievement::where('user_id', $user->id)
                ->where('achievement_id', $achievement->id)
                ->exists();

            if ($alreadyUnlocked) continue;

            $shouldUnlock = false;

            switch ($achievement->condition_type) {
                case 'NEW_ACCOUNT':
                    // Unlocked at registration (handled in AuthController)
                    break;
                case 'FIRST_MATERIAL':
                    $shouldUnlock = $materialsCompleted >= $achievement->condition_value;
                    break;
                case 'FIRST_QUIZ':
                    $shouldUnlock = $quizzesCompleted >= $achievement->condition_value;
                    break;
                case 'XP_1000':
                    $shouldUnlock = $totalXp >= $achievement->condition_value;
                    break;
                case 'ALL_TOPICS':
                    $shouldUnlock = $allMaterialsDone;
                    break;
            }

            if ($shouldUnlock) {
                UserAchievement::create([
                    'user_id'        => $user->id,
                    'achievement_id' => $achievement->id,
                    'unlocked_at'    => now(),
                ]);
            }
        }
    }
}
