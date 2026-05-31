<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Topic;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // ═══════════════════════════════════════════════════
            // TOPIC 1 — Introduction to JavaScript
            // ═══════════════════════════════════════════════════
            'intro-to-js' => [
                [
                    'title' => 'What is JavaScript?',
                    'order' => 1,
                    'content' => '<h2>What is JavaScript?</h2>
<p>JavaScript is one of the most popular programming languages in the world. It is the language of the web — every modern website uses JavaScript to create interactive experiences for users.</p>

<div class="concept-box">
<h4>💡 Key Fact</h4>
<p>JavaScript is an <strong>interpreted language</strong>, meaning your code is executed line by line by the browser or runtime environment without needing a separate compilation step.</p>
</div>

<h3>Who Created JavaScript?</h3>
<p>JavaScript was created by <strong>Brendan Eich</strong> in <strong>1995</strong> while he was working at Netscape Communications. It was originally called "Mocha", then "LiveScript", before finally being renamed to "JavaScript".</p>

<h3>Why Was JavaScript Created?</h3>
<p>In the early days of the web, pages were completely static — just text and images. JavaScript was created to make web pages <strong>interactive and dynamic</strong>, allowing developers to respond to user actions like clicks, form submissions, and more.</p>

<h3>Where Does JavaScript Run?</h3>
<p>JavaScript can run in two main environments:</p>
<ul>
<li><strong>Browser</strong> — Every web browser (Chrome, Firefox, Safari) has a built-in JavaScript engine that runs your code.</li>
<li><strong>Server (Node.js)</strong> — Node.js allows JavaScript to run outside the browser, enabling server-side development.</li>
</ul>

<h3>Common Use Cases</h3>
<ul>
<li>Building interactive websites</li>
<li>Creating web and mobile applications</li>
<li>Server-side programming with Node.js</li>
<li>Game development</li>
<li>Desktop applications</li>
</ul>

<h3>Your First JavaScript Code</h3>
<p>The simplest way to see JavaScript in action is with <code>console.log()</code>:</p>
<pre><code>console.log("Hello, World!");</code></pre>
<p>This prints the text "Hello, World!" to the browser console or terminal.</p>',
                ],
                [
                    'title' => 'JavaScript History & Ecosystem',
                    'order' => 2,
                    'content' => '<h2>JavaScript History &amp; Ecosystem</h2>
<p>Understanding JavaScript\'s history helps you appreciate why the language works the way it does today.</p>

<h3>A Brief Timeline</h3>
<ul>
<li><strong>1995</strong> — Brendan Eich creates JavaScript at Netscape in just 10 days.</li>
<li><strong>1997</strong> — JavaScript is standardized as <strong>ECMAScript</strong> (ES1).</li>
<li><strong>2009</strong> — Node.js is released, allowing JavaScript to run on servers.</li>
<li><strong>2015</strong> — ES6 (ECMAScript 2015) brings major improvements like <code>let</code>, <code>const</code>, and arrow functions.</li>
<li><strong>Today</strong> — JavaScript is updated annually with new features.</li>
</ul>

<div class="concept-box">
<h4>💡 ECMAScript vs JavaScript</h4>
<p><strong>ECMAScript</strong> is the official specification (the rules). <strong>JavaScript</strong> is the most popular implementation of that specification. When people say "ES6" or "ES2015", they are referring to a specific version of the ECMAScript standard.</p>
</div>

<h3>The JavaScript Ecosystem</h3>
<p>JavaScript has a massive ecosystem of tools and frameworks:</p>
<ul>
<li><strong>Frontend Frameworks</strong> — React, Vue, Angular</li>
<li><strong>Backend</strong> — Node.js, Express, Deno</li>
<li><strong>Mobile</strong> — React Native, Ionic</li>
<li><strong>Package Manager</strong> — npm (Node Package Manager)</li>
</ul>

<h3>How JavaScript Code is Executed</h3>
<p>JavaScript code can be included in a web page in two ways:</p>
<pre><code>&lt;!-- Inline script --&gt;
&lt;script&gt;
  console.log("Hello from inline script!");
&lt;/script&gt;

&lt;!-- External file --&gt;
&lt;script src="app.js"&gt;&lt;/script&gt;</code></pre>
<p>Using an external <code>.js</code> file is the recommended approach for real projects because it keeps your code organized and reusable.</p>',
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 2 — Variables & Data Types
            // ═══════════════════════════════════════════════════
            'variables-data-types' => [
                [
                    'title' => 'Variables',
                    'order' => 1,
                    'content' => '<h2>Variables in JavaScript</h2>
<p>Variables are containers for storing data values. Think of them as labeled boxes where you can put information and retrieve it later.</p>

<h3>Declaring Variables</h3>
<p>JavaScript provides three keywords for declaring variables:</p>

<pre><code>let username = "Harun";
const PI = 3.14159;
var age = 20;</code></pre>

<div class="concept-box">
<h4>💡 Which One Should I Use?</h4>
<p>Use <code>const</code> by default. Use <code>let</code> when you need to reassign the variable. Avoid <code>var</code> in modern JavaScript.</p>
</div>

<h3>let — Reassignable, Block-Scoped</h3>
<p>Use <code>let</code> when you know the value will change later:</p>
<pre><code>let score = 0;
score = 10;
console.log(score); // 10</code></pre>

<h3>const — Not Reassignable, Block-Scoped</h3>
<p>Use <code>const</code> for values that should never be reassigned:</p>
<pre><code>const appName = "JSLearn";
appName = "NewName"; // Error! Cannot reassign a const</code></pre>

<h3>var — Function-Scoped (Legacy)</h3>
<p><code>var</code> is the old way to declare variables. It is function-scoped instead of block-scoped, which can lead to unexpected behavior:</p>
<pre><code>var greeting = "Hello";
console.log(greeting); // "Hello"</code></pre>
<p>In modern JavaScript, prefer <code>let</code> and <code>const</code> over <code>var</code>.</p>

<h3>Naming Rules</h3>
<ul>
<li>Variable names can contain letters, digits, underscores, and dollar signs.</li>
<li>Names must begin with a letter, underscore, or dollar sign.</li>
<li>Names are case-sensitive (<code>myVar</code> and <code>myvar</code> are different).</li>
<li>Use descriptive names like <code>userName</code> instead of <code>x</code>.</li>
</ul>',
                ],
                [
                    'title' => 'Data Types',
                    'order' => 2,
                    'content' => '<h2>Data Types in JavaScript</h2>
<p>Every value in JavaScript has a type. Understanding data types is essential for writing correct programs.</p>

<h3>Primitive Data Types</h3>
<p>JavaScript has the following primitive (basic) data types:</p>

<h4>String</h4>
<p>Text data, wrapped in quotes:</p>
<pre><code>let name = "Harun";
let greeting = \'Hello!\';
let message = `Welcome, ${name}`;</code></pre>

<h4>Number</h4>
<p>Both integers and decimals use the same type:</p>
<pre><code>let age = 25;
let price = 9.99;</code></pre>

<h4>Boolean</h4>
<p>Represents true or false:</p>
<pre><code>let isLoggedIn = true;
let hasAccess = false;</code></pre>

<h4>Undefined</h4>
<p>A variable that has been declared but not assigned a value:</p>
<pre><code>let result;
console.log(result); // undefined</code></pre>

<h4>Null</h4>
<p>Represents an intentional absence of any value:</p>
<pre><code>let selectedItem = null;</code></pre>

<div class="concept-box">
<h4>💡 Undefined vs Null</h4>
<p><code>undefined</code> means a variable exists but has no value yet. <code>null</code> means "no value on purpose." Think of <code>undefined</code> as an empty box and <code>null</code> as a box with a note that says "intentionally empty."</p>
</div>

<h3>Checking Types with typeof</h3>
<p>Use the <code>typeof</code> operator to check the type of a value:</p>
<pre><code>console.log(typeof "Hello");    // "string"
console.log(typeof 42);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (this is a known quirk!)</code></pre>',
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 3 — Operators & Conditions
            // ═══════════════════════════════════════════════════
            'operators-conditions' => [
                [
                    'title' => 'Operators',
                    'order' => 1,
                    'content' => '<h2>JavaScript Operators</h2>
<p>Operators let you perform operations on values — from basic math to logical comparisons.</p>

<h3>Arithmetic Operators</h3>
<p>Used for mathematical calculations:</p>
<pre><code>let a = 10;
let b = 3;

console.log(a + b);  // 13  (addition)
console.log(a - b);  // 7   (subtraction)
console.log(a * b);  // 30  (multiplication)
console.log(a / b);  // 3.33 (division)
console.log(a % b);  // 1   (remainder)</code></pre>

<h3>Comparison Operators</h3>
<p>Used to compare two values. The result is always a boolean (<code>true</code> or <code>false</code>):</p>
<pre><code>console.log(5 == "5");   // true  (loose equality — compares value only)
console.log(5 === "5");  // false (strict equality — compares value AND type)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true
console.log(10 > 5);     // true
console.log(10 <= 10);   // true</code></pre>

<div class="concept-box">
<h4>💡 Always Use Strict Equality</h4>
<p>Prefer <code>===</code> and <code>!==</code> over <code>==</code> and <code>!=</code>. Strict equality checks both value and type, which prevents unexpected bugs caused by type coercion.</p>
</div>

<h3>Logical Operators</h3>
<p>Used to combine boolean expressions:</p>
<pre><code>let age = 20;
let hasID = true;

console.log(age >= 18 && hasID);   // true  (AND — both must be true)
console.log(age >= 21 || hasID);   // true  (OR — at least one must be true)
console.log(!hasID);               // false (NOT — flips the boolean)</code></pre>

<h3>Assignment Operators</h3>
<pre><code>let x = 10;
x += 5;  // x = x + 5  → 15
x -= 3;  // x = x - 3  → 12
x *= 2;  // x = x * 2  → 24</code></pre>',
                ],
                [
                    'title' => 'Conditional Statements',
                    'order' => 2,
                    'content' => '<h2>Conditional Statements</h2>
<p>Conditional statements allow your program to make decisions and execute different code based on different conditions.</p>

<h3>if Statement</h3>
<p>Executes a block of code if the condition is true:</p>
<pre><code>let score = 85;

if (score >= 60) {
  console.log("You passed!");
}</code></pre>

<h3>if...else Statement</h3>
<p>Provides an alternative when the condition is false:</p>
<pre><code>let temperature = 30;

if (temperature > 35) {
  console.log("It\'s very hot!");
} else {
  console.log("The weather is fine.");
}</code></pre>

<h3>if...else if...else Chain</h3>
<p>Test multiple conditions in sequence:</p>
<pre><code>let grade = 75;

if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else if (grade >= 70) {
  console.log("C");
} else {
  console.log("D");
}</code></pre>

<div class="concept-box">
<h4>💡 Order Matters</h4>
<p>In an if...else if chain, JavaScript checks conditions from top to bottom and runs the <strong>first</strong> block that matches. Once a match is found, the remaining conditions are skipped.</p>
</div>

<h3>switch Statement</h3>
<p>Useful when comparing one value against many possible matches:</p>
<pre><code>let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  case "Sunday":
    console.log("Rest day");
    break;
  default:
    console.log("Regular day");
}</code></pre>
<p>Always include <code>break</code> after each case to prevent "fall-through" to the next case.</p>',
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 4 — Loops
            // ═══════════════════════════════════════════════════
            'loops' => [
                [
                    'title' => 'Loop Fundamentals',
                    'order' => 1,
                    'content' => '<h2>Loop Fundamentals</h2>
<p>Loops allow you to repeat a block of code multiple times. Instead of writing the same code over and over, you can use a loop to do it automatically.</p>

<h3>for Loop</h3>
<p>The most common loop. You specify a start, a condition, and an increment:</p>
<pre><code>for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}
// Output: Count: 1, Count: 2, Count: 3, Count: 4, Count: 5</code></pre>

<div class="concept-box">
<h4>💡 Anatomy of a for Loop</h4>
<p><code>for (initialization; condition; update)</code><br>
<strong>Initialization</strong> runs once before the loop starts.<br>
<strong>Condition</strong> is checked before every iteration — the loop stops when it becomes false.<br>
<strong>Update</strong> runs after each iteration.</p>
</div>

<h3>while Loop</h3>
<p>Repeats as long as a condition is true. Useful when you don\'t know in advance how many times to loop:</p>
<pre><code>let count = 1;

while (count <= 3) {
  console.log("Step:", count);
  count++;
}</code></pre>

<h3>do...while Loop</h3>
<p>Similar to while, but the code runs <strong>at least once</strong> because the condition is checked after the first execution:</p>
<pre><code>let num = 10;

do {
  console.log("Number:", num);
  num++;
} while (num <= 12);
// Output: 10, 11, 12</code></pre>

<h3>When to Use Which Loop?</h3>
<ul>
<li><strong>for</strong> — When you know exactly how many times to repeat.</li>
<li><strong>while</strong> — When the number of iterations depends on a changing condition.</li>
<li><strong>do...while</strong> — When the loop must execute at least once.</li>
</ul>',
                ],
                [
                    'title' => 'Advanced Loop Usage',
                    'order' => 2,
                    'content' => '<h2>Advanced Loop Usage</h2>
<p>Beyond the basic loop structures, JavaScript provides ways to control loop flow and iterate over collections more efficiently.</p>

<h3>break — Exit a Loop Early</h3>
<p>The <code>break</code> statement stops the loop immediately:</p>
<pre><code>for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
// Output: 1, 2, 3, 4</code></pre>

<h3>continue — Skip an Iteration</h3>
<p>The <code>continue</code> statement skips the current iteration and moves to the next one:</p>
<pre><code>for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}
// Output: 1, 2, 4, 5</code></pre>

<div class="concept-box">
<h4>💡 break vs continue</h4>
<p><code>break</code> = "Stop the entire loop right now."<br>
<code>continue</code> = "Skip this one iteration and keep going."</p>
</div>

<h3>Looping Through an Array</h3>
<p>A very common use of loops is processing every item in an array:</p>
<pre><code>const fruits = ["Apple", "Banana", "Cherry"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}</code></pre>

<h3>Nested Loops</h3>
<p>You can place a loop inside another loop. This is useful for working with grids or multi-dimensional data:</p>
<pre><code>for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log("Row " + row + ", Col " + col);
  }
}</code></pre>

<h3>Avoiding Infinite Loops</h3>
<p>An infinite loop happens when the condition never becomes false. This will freeze your program:</p>
<pre><code>// DON\'T do this!
// while (true) {
//   console.log("This never stops");
// }</code></pre>
<p>Always ensure your loop condition will eventually become false.</p>',
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 5 — Functions
            // ═══════════════════════════════════════════════════
            'functions' => [
                [
                    'title' => 'Function Basics',
                    'order' => 1,
                    'content' => '<h2>Function Basics</h2>
<p>Functions are reusable blocks of code that perform a specific task. Instead of repeating the same logic, you define it once in a function and call it whenever you need it.</p>

<h3>Declaring a Function</h3>
<p>Use the <code>function</code> keyword followed by a name and parentheses:</p>
<pre><code>function greet() {
  console.log("Hello, welcome to JSLearn!");
}

greet(); // Call the function
greet(); // Call it again</code></pre>

<div class="concept-box">
<h4>💡 Why Use Functions?</h4>
<p>Functions help you write <strong>DRY</strong> code (Don\'t Repeat Yourself). They make your code more organized, readable, and easier to debug.</p>
</div>

<h3>Function Parameters</h3>
<p>Parameters let you pass data into a function:</p>
<pre><code>function greetUser(name) {
  console.log("Hello, " + name + "!");
}

greetUser("Harun");  // "Hello, Harun!"
greetUser("Sarah");  // "Hello, Sarah!"</code></pre>

<h3>Multiple Parameters</h3>
<pre><code>function add(a, b) {
  console.log(a + b);
}

add(5, 3);   // 8
add(10, 20); // 30</code></pre>

<h3>Default Parameters</h3>
<p>You can set default values for parameters that are not provided:</p>
<pre><code>function greetUser(name = "Guest") {
  console.log("Hello, " + name + "!");
}

greetUser();         // "Hello, Guest!"
greetUser("Harun");  // "Hello, Harun!"</code></pre>',
                ],
                [
                    'title' => 'Function Parameters & Return Values',
                    'order' => 2,
                    'content' => '<h2>Function Parameters &amp; Return Values</h2>
<p>Functions become truly powerful when they can accept input and return output.</p>

<h3>The return Statement</h3>
<p>Use <code>return</code> to send a value back from the function:</p>
<pre><code>function multiply(a, b) {
  return a * b;
}

let result = multiply(4, 5);
console.log(result); // 20</code></pre>

<div class="concept-box">
<h4>💡 Return Stops Execution</h4>
<p>When a function hits a <code>return</code> statement, it immediately exits. Any code after <code>return</code> inside the function will not run.</p>
</div>

<h3>Using Return Values</h3>
<p>Since functions return values, you can use them directly in expressions:</p>
<pre><code>function getDiscount(price) {
  return price * 0.1;
}

let totalPrice = 100 - getDiscount(100);
console.log(totalPrice); // 90</code></pre>

<h3>Arrow Functions</h3>
<p>Arrow functions provide a shorter syntax for writing functions:</p>
<pre><code>const add = (a, b) => {
  return a + b;
};

console.log(add(3, 7)); // 10</code></pre>

<h3>Short Arrow Functions</h3>
<p>If the function body is a single expression, you can omit the curly braces and the <code>return</code> keyword:</p>
<pre><code>const double = (n) => n * 2;
console.log(double(5)); // 10

const greet = (name) => "Hello, " + name;
console.log(greet("Harun")); // "Hello, Harun"</code></pre>

<h3>When to Use Arrow Functions</h3>
<ul>
<li>Short, simple functions — arrow functions are more concise.</li>
<li>Callbacks (functions passed to other functions).</li>
<li>When you want clean, modern syntax.</li>
</ul>',
                ],
            ],

            // ═══════════════════════════════════════════════════
            // TOPIC 6 — Arrays & Objects
            // ═══════════════════════════════════════════════════
            'arrays-objects' => [
                [
                    'title' => 'Arrays',
                    'order' => 1,
                    'content' => '<h2>JavaScript Arrays</h2>
<p>An array is an ordered list of values. Arrays let you store multiple pieces of data in a single variable.</p>

<h3>Creating Arrays</h3>
<pre><code>const fruits = ["Apple", "Banana", "Cherry"];
const numbers = [10, 20, 30, 40, 50];</code></pre>

<h3>Accessing Elements</h3>
<p>Array elements are accessed by their index, starting from 0:</p>
<pre><code>console.log(fruits[0]); // "Apple"
console.log(fruits[1]); // "Banana"
console.log(fruits[2]); // "Cherry"</code></pre>

<div class="concept-box">
<h4>💡 Zero-Based Indexing</h4>
<p>The first element of an array is at index <code>0</code>, not <code>1</code>. This is a common source of bugs for beginners, so always keep it in mind!</p>
</div>

<h3>Array Length</h3>
<pre><code>console.log(fruits.length); // 3</code></pre>

<h3>Modifying Arrays</h3>
<pre><code>const colors = ["Red", "Green"];

colors.push("Blue");      // Add to the end → ["Red", "Green", "Blue"]
colors.pop();              // Remove from the end → ["Red", "Green"]
colors.unshift("Yellow");  // Add to the start → ["Yellow", "Red", "Green"]
colors.shift();            // Remove from the start → ["Red", "Green"]</code></pre>

<h3>Useful Array Methods</h3>
<pre><code>const nums = [1, 2, 3, 4, 5];

console.log(nums.includes(3));  // true
console.log(nums.indexOf(4));   // 3
console.log(nums.join(", "));   // "1, 2, 3, 4, 5"</code></pre>

<h3>Looping Through Arrays</h3>
<pre><code>const languages = ["HTML", "CSS", "JavaScript"];

for (let i = 0; i < languages.length; i++) {
  console.log(languages[i]);
}</code></pre>',
                ],
                [
                    'title' => 'Objects',
                    'order' => 2,
                    'content' => '<h2>JavaScript Objects</h2>
<p>Objects store data as <strong>key-value pairs</strong>. They are perfect for representing real-world entities like a user, a product, or a car.</p>

<h3>Creating Objects</h3>
<pre><code>const student = {
  name: "Harun",
  age: 20,
  isActive: true
};</code></pre>

<h3>Accessing Properties</h3>
<p>You can access object properties using <strong>dot notation</strong> or <strong>bracket notation</strong>:</p>
<pre><code>console.log(student.name);        // "Harun"
console.log(student["age"]);      // 20</code></pre>

<div class="concept-box">
<h4>💡 Dot vs Bracket Notation</h4>
<p>Use <strong>dot notation</strong> for simple, known property names. Use <strong>bracket notation</strong> when the property name is stored in a variable or contains special characters.</p>
</div>

<h3>Modifying Properties</h3>
<pre><code>student.age = 21;
student.email = "harun@example.com";

console.log(student.age);   // 21
console.log(student.email); // "harun@example.com"</code></pre>

<h3>Objects with Methods</h3>
<p>Objects can also contain functions, called <strong>methods</strong>:</p>
<pre><code>const calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(10, 4)); // 6</code></pre>

<h3>Real-World Example</h3>
<pre><code>const product = {
  name: "JavaScript Course",
  price: 0,
  category: "Education",
  isAvailable: true
};

if (product.isAvailable) {
  console.log(product.name + " is available!");
}</code></pre>

<h3>Arrays of Objects</h3>
<p>In real applications, you often work with arrays that contain objects:</p>
<pre><code>const users = [
  { name: "Harun", score: 95 },
  { name: "Sarah", score: 88 },
  { name: "Alex", score: 72 }
];

for (let i = 0; i < users.length; i++) {
  console.log(users[i].name + ": " + users[i].score);
}</code></pre>',
                ],
            ],
        ];

        foreach ($data as $slug => $materials) {
            $topic = Topic::where('slug', $slug)->first();
            if (!$topic) continue;

            foreach ($materials as $m) {
                Material::create([
                    'topic_id' => $topic->id,
                    'title'    => $m['title'],
                    'content'  => $m['content'],
                    'order'    => $m['order'],
                ]);
            }
        }
    }
}
