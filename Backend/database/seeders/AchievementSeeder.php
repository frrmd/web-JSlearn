<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $achievements = [
            [
                'title'           => 'New Account',
                'description'     => 'Welcome aboard! Your learning journey starts here.',
                'icon_url'        => 'waving_hand',
                'condition_type'  => 'NEW_ACCOUNT',
                'condition_value' => 1,
            ],
            [
                'title'           => 'First Read',
                'description'     => 'You completed your first learning material. Keep it up!',
                'icon_url'        => 'menu_book',
                'condition_type'  => 'FIRST_MATERIAL',
                'condition_value' => 1,
            ],
            [
                'title'           => 'Quiz Starter',
                'description'     => 'You completed your first quiz. Test that knowledge!',
                'icon_url'        => 'quiz',
                'condition_type'  => 'FIRST_QUIZ',
                'condition_value' => 1,
            ],
            [
                'title'           => 'XP Hunter',
                'description'     => 'You earned 1000 XP! Keep climbing the leaderboard.',
                'icon_url'        => 'local_fire_department',
                'condition_type'  => 'XP_1000',
                'condition_value' => 1000,
            ],
            [
                'title'           => 'Topic Master',
                'description'     => 'You completed all materials in every topic. Incredible!',
                'icon_url'        => 'military_tech',
                'condition_type'  => 'ALL_TOPICS',
                'condition_value' => 1,
            ],
        ];

        foreach ($achievements as $a) {
            Achievement::create($a);
        }
    }
}
