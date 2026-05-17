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
            'js-basics' => [
                ['title' => 'Introduction to JS Basics', 'content' => '<h2>Welcome to JavaScript Basics</h2><p>JavaScript is a versatile programming language used for creating interactive web pages. It is one of the three core technologies of the World Wide Web, alongside HTML and CSS.</p><div class="concept-box"><h4>⚙️ Key Concept</h4><p>Always remember that JavaScript is parsed from top to bottom. The way you define your JS basics will determine how the rest of your program executes.</p></div><h3>What You\'ll Learn</h3><ul><li>Variables and constants</li><li>Data types (string, number, boolean)</li><li>Basic operators</li><li>Console output with <code>console.log()</code></li></ul><h3>Your First JavaScript Code</h3><pre><code>console.log("Hello, World!");</code></pre><p>JavaScript code can be placed inside <code>&lt;script&gt;</code> tags in an HTML file or in a separate <code>.js</code> file.</p>', 'order' => 1],
                ['title' => 'Variables and Data Types', 'content' => '<h2>Variables in JavaScript</h2><p>Variables are containers for storing data values. JavaScript provides three ways to declare variables:</p><h3>let, const, and var</h3><pre><code>let name = "John";    // block-scoped, reassignable\nconst PI = 3.14;      // block-scoped, NOT reassignable\nvar age = 25;         // function-scoped (avoid in modern JS)</code></pre><h3>Primitive Data Types</h3><ul><li><strong>String</strong> — <code>"Hello"</code></li><li><strong>Number</strong> — <code>42</code>, <code>3.14</code></li><li><strong>Boolean</strong> — <code>true</code>, <code>false</code></li><li><strong>Undefined</strong> — a variable declared but not assigned</li><li><strong>Null</strong> — intentional absence of value</li></ul><h3>typeof Operator</h3><pre><code>console.log(typeof "Hello"); // "string"\nconsole.log(typeof 42);      // "number"\nconsole.log(typeof true);    // "boolean"</code></pre>', 'order' => 2],
            ],
            'loops-arrays' => [
                ['title' => 'Introduction to Arrays', 'content' => '<h2>JavaScript Arrays</h2><p>Arrays are ordered lists of values. They can hold any data type and are zero-indexed.</p><div class="concept-box"><h4>⚙️ Key Concept</h4><p>Arrays in JavaScript are zero-indexed, meaning the first element is at position 0. Understanding indexing is crucial for working with array data.</p></div><h3>Creating Arrays</h3><pre><code>const fruits = ["Apple", "Banana", "Cherry"];\nconst numbers = [1, 2, 3, 4, 5];</code></pre><h3>Accessing Elements</h3><pre><code>console.log(fruits[0]); // "Apple"\nconsole.log(fruits.length); // 3</code></pre><h3>Common Array Methods</h3><ul><li><code>push()</code> — add to end</li><li><code>pop()</code> — remove from end</li><li><code>shift()</code> — remove from start</li><li><code>unshift()</code> — add to start</li><li><code>includes()</code> — check if element exists</li></ul>', 'order' => 1],
                ['title' => 'Mastering Loops', 'content' => '<h2>Loops in JavaScript</h2><p>Loops let you repeat a block of code multiple times.</p><h3>For Loop</h3><pre><code>for (let i = 0; i < 5; i++) {\n  console.log(i);\n}</code></pre><h3>While Loop</h3><pre><code>let count = 0;\nwhile (count < 3) {\n  console.log(count);\n  count++;\n}</code></pre><h3>Modern Iteration</h3><pre><code>const colors = ["red", "green", "blue"];\n\n// forEach\ncolors.forEach(color => console.log(color));\n\n// map — returns new array\nconst upper = colors.map(c => c.toUpperCase());\n\n// filter — returns filtered array\nconst long = colors.filter(c => c.length > 3);</code></pre>', 'order' => 2],
            ],
            'dom-manipulation' => [
                ['title' => 'Selecting Elements', 'content' => '<h2>DOM Selection Methods</h2><p>The Document Object Model (DOM) is a tree-like representation of your HTML page. JavaScript can access and modify any part of it.</p><div class="concept-box"><h4>⚙️ Key Concept</h4><p>The DOM is not part of JavaScript itself — it is a Web API provided by the browser. JavaScript uses the DOM to interact with the page structure.</p></div><h3>Selection Methods</h3><pre><code>// By ID\nconst header = document.getElementById("main-header");\n\n// By CSS selector (first match)\nconst btn = document.querySelector(".submit-btn");\n\n// All matches\nconst items = document.querySelectorAll(".list-item");</code></pre><h3>Modifying Content</h3><pre><code>header.textContent = "New Title";\nheader.innerHTML = "<em>Styled Title</em>";\nbtn.style.backgroundColor = "blue";</code></pre>', 'order' => 1],
                ['title' => 'Event Listeners', 'content' => '<h2>Making Pages Interactive</h2><p>Event listeners let you respond to user actions like clicks, key presses, and form submissions.</p><h3>Adding an Event Listener</h3><pre><code>const button = document.querySelector("#myBtn");\n\nbutton.addEventListener("click", function() {\n  alert("Button clicked!");\n});</code></pre><h3>Common Events</h3><ul><li><code>click</code> — mouse click</li><li><code>input</code> — text field changes</li><li><code>submit</code> — form submission</li><li><code>keydown</code> — key pressed</li><li><code>mouseover</code> — mouse hover</li></ul><h3>Event Object</h3><pre><code>document.addEventListener("keydown", (event) => {\n  console.log("Key pressed:", event.key);\n});</code></pre>', 'order' => 2],
            ],
            'async-fetch' => [
                ['title' => 'Promises Explained', 'content' => '<h2>Understanding Promises</h2><p>A Promise is an object representing the eventual completion or failure of an asynchronous operation.</p><h3>Promise States</h3><ul><li><strong>Pending</strong> — initial state</li><li><strong>Fulfilled</strong> — operation completed</li><li><strong>Rejected</strong> — operation failed</li></ul><h3>Creating a Promise</h3><pre><code>const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("Done!"), 1000);\n});\n\nmyPromise.then(result => console.log(result));</code></pre><h3>Async/Await</h3><pre><code>async function fetchData() {\n  const result = await myPromise;\n  console.log(result);\n}</code></pre>', 'order' => 1],
                ['title' => 'The Fetch API', 'content' => '<h2>Making Network Requests</h2><p>The Fetch API provides a modern interface for making HTTP requests.</p><h3>Basic GET Request</h3><pre><code>fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));</code></pre><h3>With Async/Await</h3><pre><code>async function getData() {\n  try {\n    const response = await fetch("https://api.example.com/data");\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error("Failed:", error);\n  }\n}</code></pre><h3>POST Request</h3><pre><code>await fetch("/api/users", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "John" })\n});</code></pre>', 'order' => 2],
            ],
            'react-hooks' => [
                ['title' => 'useState and State Management', 'content' => '<h2>Managing State with useState</h2><p>The <code>useState</code> hook lets you add state to functional components.</p><h3>Basic Usage</h3><pre><code>import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    &lt;button onClick={() => setCount(count + 1)}&gt;\n      Clicked {count} times\n    &lt;/button&gt;\n  );\n}</code></pre><h3>Rules</h3><ul><li>Always call hooks at the top level</li><li>Never call hooks inside loops or conditions</li><li>State updates trigger a re-render</li></ul>', 'order' => 1],
                ['title' => 'useEffect and Side Effects', 'content' => '<h2>Side Effects with useEffect</h2><p>The <code>useEffect</code> hook synchronizes your component with external systems.</p><h3>Basic Usage</h3><pre><code>import { useEffect, useState } from "react";\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const interval = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n\n    return () => clearInterval(interval); // cleanup\n  }, []); // empty array = run once on mount\n\n  return &lt;p&gt;{seconds} seconds&lt;/p&gt;;\n}</code></pre><h3>Dependency Array</h3><ul><li><code>[]</code> — run once on mount</li><li><code>[value]</code> — run when value changes</li><li>No array — run after every render</li></ul>', 'order' => 2],
            ],
            'nodejs-express' => [
                ['title' => 'Building a Server', 'content' => '<h2>Your First Express Server</h2><p>Express.js is a minimal and flexible Node.js web application framework.</p><h3>Setup</h3><pre><code>npm init -y\nnpm install express</code></pre><h3>Hello World Server</h3><pre><code>const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.send("Hello World!");\n});\n\napp.listen(3000, () => {\n  console.log("Server running on port 3000");\n});</code></pre>', 'order' => 1],
                ['title' => 'Routing and Middleware', 'content' => '<h2>Express Routing & Middleware</h2><p>Routes define how your app responds to client requests. Middleware functions execute during the request lifecycle.</p><h3>Route Methods</h3><pre><code>app.get("/users", (req, res) => { ... });\napp.post("/users", (req, res) => { ... });\napp.put("/users/:id", (req, res) => { ... });\napp.delete("/users/:id", (req, res) => { ... });</code></pre><h3>Middleware</h3><pre><code>// Runs for every request\napp.use(express.json());\n\n// Custom middleware\napp.use((req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next();\n});</code></pre><h3>Route Parameters</h3><pre><code>app.get("/users/:id", (req, res) => {\n  const userId = req.params.id;\n  res.json({ id: userId });\n});</code></pre>', 'order' => 2],
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
