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
            'js-basics' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 30,
                    'questions' => [
                        ['text' => 'What is the output of typeof []?', 'order' => 1, 'options' => [
                            ['"Object"', true], ['"Array"', false], ['"String"', false], ['"Undefined"', false],
                        ]],
                        ['text' => 'Which keyword is used to declare a block-scoped variable?', 'order' => 2, 'options' => [
                            ['var', false], ['let', true], ['function', false], ['global', false],
                        ]],
                        ['text' => 'What is the assignment operator in JavaScript?', 'order' => 3, 'options' => [
                            ['==', false], ['===', false], ['=', true], ['=>', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 35,
                    'questions' => [
                        ['text' => 'Which of the following is a primitive data type in JavaScript?', 'order' => 1, 'options' => [
                            ['Object', false], ['Array', false], ['String', true], ['Function', false],
                        ]],
                        ['text' => 'What will be the output of console.log(1 + "1")?', 'order' => 2, 'options' => [
                            ['2', false], ['"11"', true], ['NaN', false], ['Error', false],
                        ]],
                        ['text' => 'How do you define a constant variable?', 'order' => 3, 'options' => [
                            ['let', false], ['const', true], ['var', false], ['static', false],
                        ]],
                    ],
                ],
            ],
            'loops-arrays' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 35,
                    'questions' => [
                        ['text' => 'Which array method adds one or more elements to the end of an array?', 'order' => 1, 'options' => [
                            ['push()', true], ['pop()', false], ['shift()', false], ['unshift()', false],
                        ]],
                        ['text' => 'How do you access the first element of an array named arr?', 'order' => 2, 'options' => [
                            ['arr[1]', false], ['arr.first()', false], ['arr[0]', true], ['arr.get(0)', false],
                        ]],
                        ['text' => 'Which method removes the last element from an array?', 'order' => 3, 'options' => [
                            ['pop()', true], ['push()', false], ['shift()', false], ['splice()', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 40,
                    'questions' => [
                        ['text' => 'Which of the following is the correct syntax for a for loop?', 'order' => 1, 'options' => [
                            ['for (i = 0; i < 5; i++)', true], ['for i = 1 to 5', false], ['for (i <= 5; i++)', false], ['loop (i=0; i<5)', false],
                        ]],
                        ['text' => 'Which array method creates a new array with the results of calling a provided function on every element?', 'order' => 2, 'options' => [
                            ['forEach()', false], ['map()', true], ['filter()', false], ['reduce()', false],
                        ]],
                        ['text' => 'How do you find the total number of elements in an array named arr?', 'order' => 3, 'options' => [
                            ['arr.size', false], ['arr.length', true], ['arr.count()', false], ['length(arr)', false],
                        ]],
                    ],
                ],
            ],
            'dom-manipulation' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 35,
                    'questions' => [
                        ['text' => 'Which method selects the first element that matches a CSS selector?', 'order' => 1, 'options' => [
                            ['getElementById', false], ['querySelector', true], ['querySelectorAll', false], ['getElementsByClassName', false],
                        ]],
                        ['text' => 'How do you change the text content of an HTML element?', 'order' => 2, 'options' => [
                            ['element.text = "..."', false], ['element.textContent = "..."', true], ['element.innerHTML = "..."', false], ['Both B and C', false],
                        ]],
                        ['text' => 'What object represents the entire HTML document?', 'order' => 3, 'options' => [
                            ['window', false], ['document', true], ['body', false], ['dom', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 40,
                    'questions' => [
                        ['text' => 'How do you attach an event listener to an element?', 'order' => 1, 'options' => [
                            ['element.attachEvent()', false], ['element.listenEvent()', false], ['element.addEventListener()', true], ['element.on()', false],
                        ]],
                        ['text' => 'How do you change the background color of an element in JavaScript?', 'order' => 2, 'options' => [
                            ['element.style.backgroundColor = "red"', true], ['element.bgColor = "red"', false], ['element.css("background-color", "red")', false], ['element.style.background-color = "red"', false],
                        ]],
                        ['text' => 'Which method creates a new HTML element?', 'order' => 3, 'options' => [
                            ['document.createElement()', true], ['document.makeElement()', false], ['document.addNode()', false], ['document.createNode()', false],
                        ]],
                    ],
                ],
            ],
            'async-fetch' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 30,
                    'questions' => [
                        ['text' => 'What is a Promise in JavaScript?', 'order' => 1, 'options' => [
                            ['A guarantee of synchronous execution', false], ['An object representing the eventual completion or failure of an async operation', true], ['A specific type of function', false], ['A library for fetching data', false],
                        ]],
                        ['text' => 'Which keywords are used to handle promises cleanly?', 'order' => 2, 'options' => [
                            ['try / catch', false], ['async / await', true], ['then / catch', false], ['Both B and C', false],
                        ]],
                        ['text' => 'What method is called on a Promise when it is successfully resolved?', 'order' => 3, 'options' => [
                            ['.catch()', false], ['.finally()', false], ['.done()', false], ['.then()', true],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 40,
                    'questions' => [
                        ['text' => 'What does the fetch() API return?', 'order' => 1, 'options' => [
                            ['JSON data', false], ['A Promise', true], ['An XML object', false], ['A string', false],
                        ]],
                        ['text' => 'How do you extract JSON data from a fetch response?', 'order' => 2, 'options' => [
                            ['response.parse()', false], ['response.data', false], ['response.json()', true], ['JSON.parse(response)', false],
                        ]],
                        ['text' => 'What is the default HTTP method used by fetch()?', 'order' => 3, 'options' => [
                            ['POST', false], ['PUT', false], ['GET', true], ['OPTIONS', false],
                        ]],
                    ],
                ],
            ],
            'react-hooks' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 40,
                    'questions' => [
                        ['text' => 'What does the useState hook return?', 'order' => 1, 'options' => [
                            ['The current state and a function to update it', true], ['Only the state value', false], ['A boolean indicating if state changed', false], ['A configuration object', false],
                        ]],
                        ['text' => 'Can you use React Hooks inside a standard class component?', 'order' => 2, 'options' => [
                            ['Yes', false], ['No', true], ['Only in the constructor', false], ['Only useEffect', false],
                        ]],
                        ['text' => 'Where must Hooks be called in a functional component?', 'order' => 3, 'options' => [
                            ['Inside loops', false], ['Inside conditional statements', false], ['At the top level', true], ['Anywhere', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 40,
                    'questions' => [
                        ['text' => 'What is the purpose of the dependency array in useEffect?', 'order' => 1, 'options' => [
                            ['To store local variables', false], ['To define when the effect should re-run', true], ['To pass props down', false], ['To prevent memory leaks directly', false],
                        ]],
                        ['text' => 'What happens if you omit the dependency array in useEffect entirely?', 'order' => 2, 'options' => [
                            ['It runs only once on mount', false], ['It throws an error', false], ['It runs after every single render', true], ['It never runs', false],
                        ]],
                        ['text' => 'How do you clean up side effects in useEffect?', 'order' => 3, 'options' => [
                            ['By calling a cleanup function manually', false], ['By returning a cleanup function from the effect', true], ['React cleans them up automatically', false], ['By throwing an error', false],
                        ]],
                    ],
                ],
            ],
            'nodejs-express' => [
                [
                    'title' => 'Quiz Level 1', 'xp_reward' => 30,
                    'questions' => [
                        ['text' => 'What is Node.js?', 'order' => 1, 'options' => [
                            ['A JavaScript framework', false], ['A JavaScript runtime environment', true], ['A database', false], ['A front-end library', false],
                        ]],
                        ['text' => 'What is Express.js?', 'order' => 2, 'options' => [
                            ['A database for Node.js', false], ['A minimal and flexible Node.js web application framework', true], ['A testing utility', false], ['A task runner', false],
                        ]],
                        ['text' => 'How do you initialize a new npm project?', 'order' => 3, 'options' => [
                            ['npm create', false], ['npm start', false], ['npm init', true], ['node init', false],
                        ]],
                    ],
                ],
                [
                    'title' => 'Quiz Level 2', 'xp_reward' => 40,
                    'questions' => [
                        ['text' => 'What is middleware in Express?', 'order' => 1, 'options' => [
                            ['Functions that have access to the request object, response object, and the next middleware', true], ['The core database engine', false], ['A tool for writing CSS', false], ['A front-end templating engine', false],
                        ]],
                        ['text' => 'Which method is used to define a route for GET requests in Express?', 'order' => 2, 'options' => [
                            ['app.post()', false], ['app.route()', false], ['app.get()', true], ['app.fetch()', false],
                        ]],
                        ['text' => 'How do you send a JSON response in Express?', 'order' => 3, 'options' => [
                            ['res.sendJSON()', false], ['res.json()', true], ['res.send()', false], ['res.respond()', false],
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
