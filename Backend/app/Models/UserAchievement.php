<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAchievement extends Model
{
    // No auto-incrementing timestamps — we manage unlocked_at manually
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'achievement_id',
        'unlocked_at',
    ];

    protected function casts(): array
    {
        return [
            'unlocked_at' => 'datetime',
        ];
    }

    // =============================================
    // RELATIONSHIPS
    // =============================================

    /**
     * This unlock record belongs to one user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * This unlock record belongs to one achievement.
     */
    public function achievement()
    {
        return $this->belongsTo(Achievement::class);
    }
}
