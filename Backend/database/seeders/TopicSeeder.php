<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    public function run(): void
    {
        $topics = [
            ['title' => 'Introduction to JavaScript', 'slug' => 'intro-to-js',          'description' => 'Discover what JavaScript is, its history, and where it runs.',                       'order' => 1],
            ['title' => 'Variables & Data Types',     'slug' => 'variables-data-types',  'description' => 'Learn how to store data using let, const, and var, and explore primitive data types.', 'order' => 2],
            ['title' => 'Operators & Conditions',     'slug' => 'operators-conditions',  'description' => 'Master arithmetic, comparison, and logical operators along with conditional statements.', 'order' => 3],
            ['title' => 'Loops',                      'slug' => 'loops',                 'description' => 'Repeat actions efficiently with for, while, and do-while loops.',                     'order' => 4],
            ['title' => 'Functions',                   'slug' => 'functions',             'description' => 'Organize your code into reusable blocks with function declarations and arrow functions.', 'order' => 5],
            ['title' => 'Arrays & Objects',            'slug' => 'arrays-objects',        'description' => 'Work with collections of data using arrays and objects.',                             'order' => 6],
        ];

        foreach ($topics as $t) {
            Topic::create($t);
        }
    }
}
