<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    public function run(): void
    {
        $topics = [
            ['title' => 'JS Basics',          'slug' => 'js-basics',          'description' => 'Learn the core syntax and language fundamentals of JavaScript.',      'order' => 1],
            ['title' => 'Loops & Arrays',      'slug' => 'loops-arrays',       'description' => 'Master arrays, loops, and modern iteration methods.',                 'order' => 2],
            ['title' => 'DOM Manipulation',    'slug' => 'dom-manipulation',   'description' => 'Learn how to query, modify, and interact with the Document Object Model.', 'order' => 3],
            ['title' => 'Async & Fetch',       'slug' => 'async-fetch',        'description' => 'Understand Promises, async/await, and the Fetch API.',                'order' => 4],
            ['title' => 'React Hooks',         'slug' => 'react-hooks',        'description' => 'The foundation of modern React: useState, useEffect, and more.',      'order' => 5],
            ['title' => 'Node.js Express',     'slug' => 'nodejs-express',     'description' => 'Build server-side applications with Node.js and Express.',            'order' => 6],
        ];

        foreach ($topics as $t) {
            Topic::create($t);
        }
    }
}
