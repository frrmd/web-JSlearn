<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'icon_url',
        'condition_type',   // Unique key used in backend logic, e.g. 'FIRST_MATERIAL', 'FIRST_QUIZ', 'XP_1000'
        'condition_value',
    ];

    protected function casts(): array
    {
        return [
            'condition_value' => 'integer',
        ];
    }

    // =============================================
    // RELATIONSHIPS
    // =============================================

    /**
     * An achievement can be unlocked by many users.
     * Uses the user_achievements pivot table.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_achievements')
                    ->withPivot('unlocked_at');
    }
}
