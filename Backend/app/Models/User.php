<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'avatar_url',
        'total_xp',
        'role',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login_at'     => 'datetime',
            'password'          => 'hashed',
            'total_xp'          => 'integer',
        ];
    }

    // =============================================
    // RELATIONSHIPS
    // =============================================

    /**
     * A user has completed many materials.
     * Table: user_material_progress
     */
    public function materialProgress()
    {
        return $this->hasMany(UserMaterialProgress::class);
    }

    /**
     * A user has attempted many quizzes.
     * Table: user_quiz_progress
     */
    public function quizProgress()
    {
        return $this->hasMany(UserQuizProgress::class);
    }

    /**
     * A user can unlock many achievements.
     * Uses the user_achievements pivot table.
     * withPivot('unlocked_at') gives access to when the badge was earned.
     */
    public function achievements()
    {
        return $this->belongsToMany(Achievement::class, 'user_achievements')
                    ->withPivot('unlocked_at')
                    ->orderByPivot('unlocked_at', 'desc');
    }
}
