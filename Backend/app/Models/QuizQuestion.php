<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'question_text',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
        ];
    }

    // =============================================
    // RELATIONSHIPS
    // =============================================

    /**
     * A question belongs to one quiz.
     * Inverse of Quiz::questions()
     */
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    /**
     * A question has multiple answer options (typically 4).
     */
    public function options()
    {
        return $this->hasMany(QuizOption::class);
    }
}
