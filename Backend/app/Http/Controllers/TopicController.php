<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    use ApiResponse;

    /**
     * List all topics with material/quiz counts.
     */
    public function index()
    {
        $topics = Topic::withCount(['materials', 'quizzes'])
            ->orderBy('order')
            ->get();

        return $this->success($topics);
    }

    /**
     * Get a single topic by slug with its materials and quizzes.
     */
    public function show(string $slug)
    {
        $topic = Topic::where('slug', $slug)
            ->with([
                'materials' => function ($q) {
                    $q->select('id', 'topic_id', 'title', 'order')
                      ->orderBy('order');
                },
                'quizzes' => function ($q) {
                    $q->select('id', 'topic_id', 'title', 'xp_reward');
                },
            ])
            ->first();

        if (!$topic) {
            return $this->error('Topic not found', 404);
        }

        return $this->success($topic);
    }

    /**
     * Get a single material's full content.
     */
    public function showMaterial(string $slug, int $materialId)
    {
        $topic = Topic::where('slug', $slug)->first();

        if (!$topic) {
            return $this->error('Topic not found', 404);
        }

        $material = $topic->materials()->find($materialId);

        if (!$material) {
            return $this->error('Material not found', 404);
        }

        return $this->success($material);
    }

    /**
     * Get a quiz with its questions and options.
     */
    public function showQuiz(string $slug, int $quizId)
    {
        $topic = Topic::where('slug', $slug)->first();

        if (!$topic) {
            return $this->error('Topic not found', 404);
        }

        $quiz = $topic->quizzes()
            ->with(['questions.options' => function ($q) {
                // Hide is_correct from the response — grading happens server-side
                $q->select('id', 'quiz_question_id', 'option_text');
            }])
            ->find($quizId);

        if (!$quiz) {
            return $this->error('Quiz not found', 404);
        }

        return $this->success($quiz);
    }
}
