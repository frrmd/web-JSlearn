<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin account (per plan)
        User::create([
            'name'      => 'Farras M',
            'username'  => 'JS Master',
            'email'     => 'farras@gmail.com',
            'password'  => 'password123',
            'role'      => 'admin',
            'total_xp'  => 0,
            'avatar_url' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        ]);

        // Student accounts
        $students = [
            ['name' => 'Sarah Chen',   'username' => 'sarah_c',    'email' => 'sarah@example.com'],
            ['name' => 'Alex R.',      'username' => 'alex_r',     'email' => 'alex@example.com'],
            ['name' => 'Jordan K.',    'username' => 'jordan_k',   'email' => 'jordan@example.com'],
            ['name' => 'Harun',        'username' => 'harun_dev',  'email' => 'harun@gmail.com'],
            ['name' => 'Riley Smith',  'username' => 'riley_s',    'email' => 'riley@example.com'],
            ['name' => 'Dave G.',      'username' => 'dave_g',     'email' => 'dave@example.com'],
        ];

        foreach ($students as $i => $s) {
            User::create([
                'name'       => $s['name'],
                'username'   => $s['username'],
                'email'      => $s['email'],
                'password'   => 'password123',
                'role'       => 'student',
                'total_xp'   => 0,
                'avatar_url' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $s['username'],
            ]);
        }
    }
}
