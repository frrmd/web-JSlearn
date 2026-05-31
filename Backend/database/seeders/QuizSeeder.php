<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuizOption;
use App\Models\Topic;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $quizData = [
            // ═══════════════════════════════════════════════════
            // TOPIC 1 — Introduction to JavaScript
            // ═══════════════════════════════════════════════════
            'intro-to-js' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 30,
                    'questions' => [
                        ['text' => 'Who created JavaScript?', 'order' => 1, 'options' => [
                            ['Brendan Eich', true], ['Tim Berners-Lee', false], ['James Gosling', false], ['Guido van Rossum', false],
                        ]],
                        ['text' => 'In what year was JavaScript created?', 'order' => 2, 'options' => [
                            ['2001', false], ['1995', true], ['1989', false], ['2010', false],
                        ]],
                        ['text' => 'JavaScript is an interpreted language. What does that mean?', 'order' => 3, 'options' => [
                            ['Code is executed line by line without a separate compilation step', true],
                            ['Code must be compiled before running', false],
                            ['It only runs on servers', false],
                            ['It cannot interact with HTML', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 35,
                    'questions' => [
                        ['text' => 'Which of the following is a place where JavaScript can run?', 'order' => 1, 'options' => [
                            ['Only in the browser', false], ['Only on the server', false], ['Both in the browser and on the server (Node.js)', true], ['Only in mobile apps', false],
                        ]],
                        ['text' => 'What function is used to print output to the console?', 'order' => 2, 'options' => [
                            ['print()', false], ['echo()', false], ['console.log()', true], ['System.out.println()', false],
                        ]],
                        ['text' => 'What is ECMAScript?', 'order' => 3, 'options' => [
                            ['A JavaScript framework', false], ['The official specification that JavaScript implements', true], ['A web browser', false], ['A JavaScript library', false],
                        ]],
                        ['text' => 'Which HTML tag is used to include JavaScript in a web page?', 'order' => 4, 'options' => [
                            ['<javascript>', false], ['<js>', false], ['<script>', true], ['<code>', false],
                        ]],
                    ],
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 2 — Variables & Data Types
            // ═══════════════════════════════════════════════════
            'variables-data-types' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 30,
                    'questions' => [
                        ['text' => 'Which keyword declares a variable that cannot be reassigned?', 'order' => 1, 'options' => [
                            ['let', false], ['var', false], ['const', true], ['static', false],
                        ]],
                        ['text' => 'What is the value of a declared but unassigned variable?', 'order' => 2, 'options' => [
                            ['null', false], ['0', false], ['""', false], ['undefined', true],
                        ]],
                        ['text' => 'Which keyword is recommended for variables that will change value?', 'order' => 3, 'options' => [
                            ['const', false], ['let', true], ['var', false], ['define', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 35,
                    'questions' => [
                        ['text' => 'What is the typeof "Hello"?', 'order' => 1, 'options' => [
                            ['"text"', false], ['"string"', true], ['"char"', false], ['"word"', false],
                        ]],
                        ['text' => 'Which of the following is NOT a primitive data type in JavaScript?', 'order' => 2, 'options' => [
                            ['String', false], ['Boolean', false], ['Array', true], ['Number', false],
                        ]],
                        ['text' => 'What does null represent in JavaScript?', 'order' => 3, 'options' => [
                            ['An error', false], ['An empty string', false], ['The intentional absence of a value', true], ['The number zero', false],
                        ]],
                        ['text' => 'What is the output of typeof 42?', 'order' => 4, 'options' => [
                            ['"integer"', false], ['"number"', true], ['"float"', false], ['"digit"', false],
                        ]],
                    ],
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 3 — Operators & Conditions
            // ═══════════════════════════════════════════════════
            'operators-conditions' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 30,
                    'questions' => [
                        ['text' => 'What is the result of 10 % 3?', 'order' => 1, 'options' => [
                            ['3', false], ['1', true], ['0', false], ['10', false],
                        ]],
                        ['text' => 'What does the === operator check?', 'order' => 2, 'options' => [
                            ['Only value', false], ['Only type', false], ['Both value and type', true], ['Neither', false],
                        ]],
                        ['text' => 'What is the result of true && false?', 'order' => 3, 'options' => [
                            ['true', false], ['false', true], ['null', false], ['undefined', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 35,
                    'questions' => [
                        ['text' => 'Which statement is used to test multiple conditions in sequence?', 'order' => 1, 'options' => [
                            ['for', false], ['while', false], ['if...else if...else', true], ['switch only', false],
                        ]],
                        ['text' => 'What keyword ends each case in a switch statement to prevent fall-through?', 'order' => 2, 'options' => [
                            ['stop', false], ['exit', false], ['break', true], ['end', false],
                        ]],
                        ['text' => 'What is the output of: 5 == "5"?', 'order' => 3, 'options' => [
                            ['true', true], ['false', false], ['undefined', false], ['Error', false],
                        ]],
                        ['text' => 'Which logical operator means "OR"?', 'order' => 4, 'options' => [
                            ['&&', false], ['||', true], ['!', false], ['??', false],
                        ]],
                    ],
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 4 — Loops
            // ═══════════════════════════════════════════════════
            'loops' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 30,
                    'questions' => [
                        ['text' => 'How many times does this loop run: for (let i = 0; i < 3; i++) { }?', 'order' => 1, 'options' => [
                            ['2', false], ['3', true], ['4', false], ['Infinite', false],
                        ]],
                        ['text' => 'Which loop always executes at least once?', 'order' => 2, 'options' => [
                            ['for', false], ['while', false], ['do...while', true], ['for...in', false],
                        ]],
                        ['text' => 'What happens if a while loop condition is always true?', 'order' => 3, 'options' => [
                            ['It runs once', false], ['It throws an error', false], ['It creates an infinite loop', true], ['It skips the loop', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 35,
                    'questions' => [
                        ['text' => 'What does the break statement do inside a loop?', 'order' => 1, 'options' => [
                            ['Skips the current iteration', false], ['Stops the loop entirely', true], ['Restarts the loop', false], ['Pauses the loop', false],
                        ]],
                        ['text' => 'What does the continue statement do inside a loop?', 'order' => 2, 'options' => [
                            ['Stops the loop entirely', false], ['Skips the current iteration and moves to the next', true], ['Restarts the loop from the beginning', false], ['Throws an error', false],
                        ]],
                        ['text' => 'Which loop is best when you know exactly how many times to repeat?', 'order' => 3, 'options' => [
                            ['while', false], ['do...while', false], ['for', true], ['switch', false],
                        ]],
                        ['text' => 'What is the output of this code?\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  console.log(i);\n}', 'order' => 4, 'options' => [
                            ['1, 2, 3, 4, 5', false], ['1, 2, 4, 5', true], ['1, 2', false], ['3, 4, 5', false],
                        ]],
                    ],
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 5 — Functions
            // ═══════════════════════════════════════════════════
            'functions' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 30,
                    'questions' => [
                        ['text' => 'Which keyword is used to define a function in JavaScript?', 'order' => 1, 'options' => [
                            ['def', false], ['func', false], ['function', true], ['method', false],
                        ]],
                        ['text' => 'What is a parameter in a function?', 'order' => 2, 'options' => [
                            ['A value passed to the function when calling it', false],
                            ['A variable listed in the function definition', true],
                            ['The return value of the function', false],
                            ['The name of the function', false],
                        ]],
                        ['text' => 'What does this function return?\nfunction add(a, b) { return a + b; }\nadd(2, 3);', 'order' => 3, 'options' => [
                            ['23', false], ['5', true], ['undefined', false], ['Error', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 35,
                    'questions' => [
                        ['text' => 'What is the correct syntax for an arrow function?', 'order' => 1, 'options' => [
                            ['const fn = (a, b) => { return a + b; }', true],
                            ['const fn = function => (a, b) { return a + b; }', false],
                            ['const fn = arrow(a, b) { return a + b; }', false],
                            ['const fn = (a, b) -> { return a + b; }', false],
                        ]],
                        ['text' => 'What happens when a function hits a return statement?', 'order' => 2, 'options' => [
                            ['It continues executing the rest of the function', false],
                            ['It immediately exits the function and sends back the value', true],
                            ['It throws an error', false],
                            ['It pauses the function', false],
                        ]],
                        ['text' => 'What is the output?\nconst double = (n) => n * 2;\nconsole.log(double(4));', 'order' => 3, 'options' => [
                            ['4', false], ['6', false], ['8', true], ['undefined', false],
                        ]],
                        ['text' => 'What value is used when a default parameter is not provided?', 'order' => 4, 'options' => [
                            ['null', false], ['0', false], ['The default value defined in the function', true], ['An error is thrown', false],
                        ]],
                    ],
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 6 — Arrays & Objects
            // ═══════════════════════════════════════════════════
            'arrays-objects' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 30,
                    'questions' => [
                        ['text' => 'What is the index of the first element in a JavaScript array?', 'order' => 1, 'options' => [
                            ['1', false], ['0', true], ['-1', false], ['first', false],
                        ]],
                        ['text' => 'Which method adds an element to the end of an array?', 'order' => 2, 'options' => [
                            ['pop()', false], ['push()', true], ['shift()', false], ['unshift()', false],
                        ]],
                        ['text' => 'How do you find the number of elements in an array called arr?', 'order' => 3, 'options' => [
                            ['arr.size', false], ['arr.count()', false], ['arr.length', true], ['len(arr)', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 35,
                    'questions' => [
                        ['text' => 'How do you access the "name" property of an object called user?', 'order' => 1, 'options' => [
                            ['user.name', true], ['user[0]', false], ['user->name', false], ['user::name', false],
                        ]],
                        ['text' => 'Which notation should you use when a property name is stored in a variable?', 'order' => 2, 'options' => [
                            ['Dot notation', false], ['Bracket notation', true], ['Arrow notation', false], ['Colon notation', false],
                        ]],
                        ['text' => 'What is a method in a JavaScript object?', 'order' => 3, 'options' => [
                            ['A number stored in the object', false], ['A function stored as an object property', true], ['A special type of array', false], ['An object key', false],
                        ]],
                        ['text' => 'What does this code output?\nconst arr = ["a", "b", "c"];\nconsole.log(arr[1]);', 'order' => 4, 'options' => [
                            ['"a"', false], ['"b"', true], ['"c"', false], ['undefined', false],
                        ]],
                    ],
                ],
            ],
        ];

        foreach ($quizData as $slug => $quizzes) {
            $topic = Topic::where('slug', $slug)->first();
            if (!$topic) continue;

            foreach ($quizzes as $q) {
                $quiz = Quiz::create([
                    'topic_id'  => $topic->id,
                    'title'     => $q['title'],
                    'xp_reward' => $q['xp_reward'],
                ]);

                foreach ($q['questions'] as $qn) {
                    $question = QuizQuestion::create([
                        'quiz_id'       => $quiz->id,
                        'question_text' => $qn['text'],
                        'order'         => $qn['order'],
                    ]);

                    foreach ($qn['options'] as $opt) {
                        QuizOption::create([
                            'quiz_question_id' => $question->id,
                            'option_text'      => $opt[0],
                            'is_correct'       => $opt[1],
                        ]);
                    }
                }
            }
        }
    }
}
