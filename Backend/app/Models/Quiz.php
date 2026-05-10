<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'topic_id',
        'title',
        'xp_reward',
    ];

    protected function casts(): array
    {
        return [
            'xp_reward' => 'integer',
        ];
    }

    // =============================================
    // RELATIONSHIPS
    // =============================================

    /**
     * A quiz belongs to one topic.
     * Inverse of Topic::quizzes()
     */
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    /**
     * A quiz has many questions, ordered for consistent display.
     */
    public function questions()
    {
        return $this->hasMany(QuizQuestion::class)->orderBy('order');
    }

    /**
     * A quiz can be attempted by many users.
     * Tracked via the user_quiz_progress table.
     */
    public function userProgress()
    {
        return $this->hasMany(UserQuizProgress::class);
    }
}
