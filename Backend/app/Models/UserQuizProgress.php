<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserQuizProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quiz_id',
        'best_score',
        'attempts',
    ];

    protected function casts(): array
    {
        return [
            'best_score' => 'integer',
            'attempts'   => 'integer',
        ];
    }

    // =============================================
    // RELATIONSHIPS
    // =============================================

    /**
     * This progress record belongs to one user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * This progress record belongs to one quiz.
     */
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
