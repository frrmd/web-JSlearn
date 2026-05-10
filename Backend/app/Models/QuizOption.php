<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_question_id',
        'option_text',
        'is_correct',
    ];

    protected function casts(): array
    {
        return [
            'is_correct' => 'boolean',
        ];
    }

    // =============================================
    // RELATIONSHIPS
    // =============================================

    /**
     * An option belongs to one question.
     * Inverse of QuizQuestion::options()
     */
    public function question()
    {
        return $this->belongsTo(QuizQuestion::class);
    }
}
