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
            'password'  => Hash::make('password123'),
            'role'      => 'admin',
            'total_xp'  => 12500,
            'avatar_url' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        ]);

        // Student accounts
        $students = [
            ['name' => 'Sarah Chen',   'username' => 'sarah_c',    'email' => 'sarah@example.com',  'total_xp' => 9800],
            ['name' => 'Alex R.',      'username' => 'alex_r',     'email' => 'alex@example.com',   'total_xp' => 8420],
            ['name' => 'Jordan K.',    'username' => 'jordan_k',   'email' => 'jordan@example.com', 'total_xp' => 7900],
            ['name' => 'Harun',        'username' => 'harun_dev',  'email' => 'harun@gmail.com',    'total_xp' => 5420],
            ['name' => 'Riley Smith',  'username' => 'riley_s',    'email' => 'riley@example.com',  'total_xp' => 4890],
            ['name' => 'Dave G.',      'username' => 'dave_g',     'email' => 'dave@example.com',   'total_xp' => 4200],
        ];

        foreach ($students as $i => $s) {
            User::create([
                'name'       => $s['name'],
                'username'   => $s['username'],
                'email'      => $s['email'],
                'password'   => Hash::make('password123'),
                'role'       => 'student',
                'total_xp'   => $s['total_xp'],
                'avatar_url' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=' . $s['username'],
            ]);
        }
    }
}
