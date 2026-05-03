export const mockQuizData = {
  'js-basics': {
    'q1': [
      {
        id: 'q1-1',
        questionText: 'What is the output of typeof []?',
        codeSnippet: 'console.log(typeof []);',
        options: [
          { id: 'opt1', text: '"Object"', isCorrect: true },
          { id: 'opt2', text: '"Array"', isCorrect: false },
          { id: 'opt3', text: '"String"', isCorrect: false },
          { id: 'opt4', text: '"Undefined"', isCorrect: false }
        ],
        tip: { title: 'Did you know?', content: 'In JavaScript, arrays are technically a specialized type of Object.' },
        xpReward: 10
      },
      {
        id: 'q1-2',
        questionText: 'Which keyword is used to declare a block-scoped variable?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'var', isCorrect: false },
          { id: 'opt2', text: 'let', isCorrect: true },
          { id: 'opt3', text: 'function', isCorrect: false },
          { id: 'opt4', text: 'global', isCorrect: false }
        ],
        tip: { title: 'Block Scope', content: 'The let keyword creates variables that are only accessible within the block {} they are declared in.' },
        xpReward: 10
      },
      {
        id: 'q1-3',
        questionText: 'What is the assignment operator in JavaScript?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: '==', isCorrect: false },
          { id: 'opt2', text: '===', isCorrect: false },
          { id: 'opt3', text: '=', isCorrect: true },
          { id: 'opt4', text: '=>', isCorrect: false }
        ],
        tip: { title: 'Assignment', content: '= is used to assign values to variables, whereas == and === are for comparison.' },
        xpReward: 10
      }
    ],
    'q2': [
      {
        id: 'q2-1',
        questionText: 'Which of the following is a primitive data type in JavaScript?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'Object', isCorrect: false },
          { id: 'opt2', text: 'Array', isCorrect: false },
          { id: 'opt3', text: 'String', isCorrect: true },
          { id: 'opt4', text: 'Function', isCorrect: false }
        ],
        tip: { title: 'Primitives', content: 'Primitives include String, Number, Boolean, Undefined, Null, Symbol, and BigInt.' },
        xpReward: 10
      },
      {
        id: 'q2-2',
        questionText: 'What will be the output?',
        codeSnippet: 'console.log(1 + "1");',
        options: [
          { id: 'opt1', text: '2', isCorrect: false },
          { id: 'opt2', text: '"11"', isCorrect: true },
          { id: 'opt3', text: 'NaN', isCorrect: false },
          { id: 'opt4', text: 'Error', isCorrect: false }
        ],
        tip: { title: 'Type Coercion', content: 'JavaScript coerces the number 1 to a string and concatenates them.' },
        xpReward: 15
      },
      {
        id: 'q2-3',
        questionText: 'How do you define a constant variable?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'let', isCorrect: false },
          { id: 'opt2', text: 'const', isCorrect: true },
          { id: 'opt3', text: 'var', isCorrect: false },
          { id: 'opt4', text: 'static', isCorrect: false }
        ],
        tip: { title: 'Constants', content: 'The const keyword is used to define variables whose reference cannot be changed.' },
        xpReward: 10
      }
    ]
  },
  'loops-arrays': {
    'q1': [
      {
        id: 'q1-1',
        questionText: 'Which array method adds one or more elements to the end of an array?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'push()', isCorrect: true },
          { id: 'opt2', text: 'pop()', isCorrect: false },
          { id: 'opt3', text: 'shift()', isCorrect: false },
          { id: 'opt4', text: 'unshift()', isCorrect: false }
        ],
        tip: { title: 'Array methods', content: 'push() adds to the end, while unshift() adds to the beginning of the array.' },
        xpReward: 15
      },
      {
        id: 'q1-2',
        questionText: 'How do you access the first element of an array named `arr`?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'arr[1]', isCorrect: false },
          { id: 'opt2', text: 'arr.first()', isCorrect: false },
          { id: 'opt3', text: 'arr[0]', isCorrect: true },
          { id: 'opt4', text: 'arr.get(0)', isCorrect: false }
        ],
        tip: { title: 'Zero-Indexed', content: 'JavaScript arrays are zero-indexed, meaning the first element is at index 0.' },
        xpReward: 10
      },
      {
        id: 'q1-3',
        questionText: 'Which method removes the last element from an array?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'pop()', isCorrect: true },
          { id: 'opt2', text: 'push()', isCorrect: false },
          { id: 'opt3', text: 'shift()', isCorrect: false },
          { id: 'opt4', text: 'splice()', isCorrect: false }
        ],
        tip: { title: 'Array Methods', content: 'pop() removes the last element, while shift() removes the first element.' },
        xpReward: 10
      }
    ],
    'q2': [
      {
        id: 'q2-1',
        questionText: 'Which of the following is the correct syntax for a `for` loop?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'for (i = 0; i < 5; i++)', isCorrect: true },
          { id: 'opt2', text: 'for i = 1 to 5', isCorrect: false },
          { id: 'opt3', text: 'for (i <= 5; i++)', isCorrect: false },
          { id: 'opt4', text: 'loop (i=0; i<5)', isCorrect: false }
        ],
        tip: { title: 'For Loop Syntax', content: 'A for loop requires initialization, condition, and iteration statements.' },
        xpReward: 15
      },
      {
        id: 'q2-2',
        questionText: 'Which array method creates a new array with the results of calling a provided function on every element?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'forEach()', isCorrect: false },
          { id: 'opt2', text: 'map()', isCorrect: true },
          { id: 'opt3', text: 'filter()', isCorrect: false },
          { id: 'opt4', text: 'reduce()', isCorrect: false }
        ],
        tip: { title: 'Mapping Arrays', content: 'map() returns a new array, while forEach() just iterates over the existing array.' },
        xpReward: 15
      },
      {
        id: 'q2-3',
        questionText: 'How do you find the total number of elements in an array named `arr`?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'arr.size', isCorrect: false },
          { id: 'opt2', text: 'arr.length', isCorrect: true },
          { id: 'opt3', text: 'arr.count()', isCorrect: false },
          { id: 'opt4', text: 'length(arr)', isCorrect: false }
        ],
        tip: { title: 'Array Length', content: 'The length property returns the number of elements in an array.' },
        xpReward: 10
      }
    ]
  },
  'dom-manipulation': {
    'q1': [
      {
        id: 'q1-1',
        questionText: 'Which method selects the first element that matches a CSS selector?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'getElementById', isCorrect: false },
          { id: 'opt2', text: 'querySelector', isCorrect: true },
          { id: 'opt3', text: 'querySelectorAll', isCorrect: false },
          { id: 'opt4', text: 'getElementsByClassName', isCorrect: false }
        ],
        tip: { title: 'DOM Selectors', content: 'querySelector returns the first matching element node.' },
        xpReward: 15
      },
      {
        id: 'q1-2',
        questionText: 'How do you change the text content of an HTML element?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'element.text = "..."', isCorrect: false },
          { id: 'opt2', text: 'element.textContent = "..."', isCorrect: true },
          { id: 'opt3', text: 'element.innerHTML = "..."', isCorrect: false },
          { id: 'opt4', text: 'Both B and C', isCorrect: false } // Technically innerHTML changes HTML, textContent is safer for just text. Let's make B correct for simplicity.
        ],
        tip: { title: 'Text Content', content: 'textContent is the standard way to change just the text of a node.' },
        xpReward: 10
      },
      {
        id: 'q1-3',
        questionText: 'What object represents the entire HTML document?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'window', isCorrect: false },
          { id: 'opt2', text: 'document', isCorrect: true },
          { id: 'opt3', text: 'body', isCorrect: false },
          { id: 'opt4', text: 'dom', isCorrect: false }
        ],
        tip: { title: 'The Document Object', content: 'The document object is the root of the DOM tree.' },
        xpReward: 10
      }
    ],
    'q2': [
      {
        id: 'q2-1',
        questionText: 'How do you attach an event listener to an element?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'element.attachEvent()', isCorrect: false },
          { id: 'opt2', text: 'element.listenEvent()', isCorrect: false },
          { id: 'opt3', text: 'element.addEventListener()', isCorrect: true },
          { id: 'opt4', text: 'element.on()', isCorrect: false }
        ],
        tip: { title: 'Event Listeners', content: 'addEventListener is the standard method for listening to events.' },
        xpReward: 15
      },
      {
        id: 'q2-2',
        questionText: 'How do you change the background color of an element in JavaScript?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'element.style.backgroundColor = "red"', isCorrect: true },
          { id: 'opt2', text: 'element.bgColor = "red"', isCorrect: false },
          { id: 'opt3', text: 'element.css("background-color", "red")', isCorrect: false },
          { id: 'opt4', text: 'element.style.background-color = "red"', isCorrect: false }
        ],
        tip: { title: 'CSS Properties in JS', content: 'CSS properties with hyphens become camelCase in JavaScript.' },
        xpReward: 15
      },
      {
        id: 'q2-3',
        questionText: 'Which method creates a new HTML element?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'document.createElement()', isCorrect: true },
          { id: 'opt2', text: 'document.makeElement()', isCorrect: false },
          { id: 'opt3', text: 'document.addNode()', isCorrect: false },
          { id: 'opt4', text: 'document.createNode()', isCorrect: false }
        ],
        tip: { title: 'Creating Elements', content: 'createElement allows you to build nodes before inserting them into the DOM.' },
        xpReward: 10
      }
    ]
  },
  'async-fetch': {
    'q1': [
      {
        id: 'q1-1',
        questionText: 'What is a Promise in JavaScript?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'A guarantee of synchronous execution', isCorrect: false },
          { id: 'opt2', text: 'An object representing the eventual completion or failure of an async operation', isCorrect: true },
          { id: 'opt3', text: 'A specific type of function', isCorrect: false },
          { id: 'opt4', text: 'A library for fetching data', isCorrect: false }
        ],
        tip: { title: 'Promises', content: 'A Promise acts as a proxy for a value not necessarily known when it is created.' },
        xpReward: 10
      },
      {
        id: 'q1-2',
        questionText: 'Which keywords are used to handle promises cleanly?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'try / catch', isCorrect: false },
          { id: 'opt2', text: 'async / await', isCorrect: true },
          { id: 'opt3', text: 'then / catch', isCorrect: false },
          { id: 'opt4', text: 'Both B and C', isCorrect: false } // We'll make B the primary modern answer for this question
        ],
        tip: { title: 'Async/Await', content: 'async/await is syntactic sugar over Promises, making code look synchronous.' },
        xpReward: 10
      },
      {
        id: 'q1-3',
        questionText: 'What method is called on a Promise when it is successfully resolved?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: '.catch()', isCorrect: false },
          { id: 'opt2', text: '.finally()', isCorrect: false },
          { id: 'opt3', text: '.done()', isCorrect: false },
          { id: 'opt4', text: '.then()', isCorrect: true }
        ],
        tip: { title: 'Resolving Promises', content: 'The .then() block executes when a Promise resolves successfully.' },
        xpReward: 10
      }
    ],
    'q2': [
      {
        id: 'q2-1',
        questionText: 'What does the `fetch()` API return?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'JSON data', isCorrect: false },
          { id: 'opt2', text: 'A Promise', isCorrect: true },
          { id: 'opt3', text: 'An XML object', isCorrect: false },
          { id: 'opt4', text: 'A string', isCorrect: false }
        ],
        tip: { title: 'Fetch API', content: 'fetch() initiates a network request and returns a Promise.' },
        xpReward: 15
      },
      {
        id: 'q2-2',
        questionText: 'How do you extract JSON data from a fetch response?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'response.parse()', isCorrect: false },
          { id: 'opt2', text: 'response.data', isCorrect: false },
          { id: 'opt3', text: 'response.json()', isCorrect: true },
          { id: 'opt4', text: 'JSON.parse(response)', isCorrect: false }
        ],
        tip: { title: 'Parsing Response', content: 'response.json() reads the response stream to completion and parses the JSON.' },
        xpReward: 15
      },
      {
        id: 'q2-3',
        questionText: 'What is the default HTTP method used by `fetch()`?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'POST', isCorrect: false },
          { id: 'opt2', text: 'PUT', isCorrect: false },
          { id: 'opt3', text: 'GET', isCorrect: true },
          { id: 'opt4', text: 'OPTIONS', isCorrect: false }
        ],
        tip: { title: 'Default Method', content: 'If no method is specified in the options, fetch performs a GET request.' },
        xpReward: 10
      }
    ]
  },
  'react-hooks': {
    'q1': [
      {
        id: 'q1-1',
        questionText: 'What does the `useState` hook return?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'The current state and a function to update it', isCorrect: true },
          { id: 'opt2', text: 'Only the state value', isCorrect: false },
          { id: 'opt3', text: 'A boolean indicating if state changed', isCorrect: false },
          { id: 'opt4', text: 'A configuration object', isCorrect: false }
        ],
        tip: { title: 'useState', content: 'It returns an array with exactly two items: the state value and the setter function.' },
        xpReward: 15
      },
      {
        id: 'q1-2',
        questionText: 'Can you use React Hooks inside a standard class component?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'Yes', isCorrect: false },
          { id: 'opt2', text: 'No', isCorrect: true },
          { id: 'opt3', text: 'Only in the constructor', isCorrect: false },
          { id: 'opt4', text: 'Only `useEffect`', isCorrect: false }
        ],
        tip: { title: 'Rules of Hooks', content: 'Hooks can only be called inside functional components or custom hooks.' },
        xpReward: 10
      },
      {
        id: 'q1-3',
        questionText: 'Where must Hooks be called in a functional component?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'Inside loops', isCorrect: false },
          { id: 'opt2', text: 'Inside conditional statements', isCorrect: false },
          { id: 'opt3', text: 'At the top level', isCorrect: true },
          { id: 'opt4', text: 'Anywhere', isCorrect: false }
        ],
        tip: { title: 'Top Level', content: 'React relies on the order in which Hooks are called.' },
        xpReward: 15
      }
    ],
    'q2': [
      {
        id: 'q2-1',
        questionText: 'What is the purpose of the dependency array in `useEffect`?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'To store local variables', isCorrect: false },
          { id: 'opt2', text: 'To define when the effect should re-run', isCorrect: true },
          { id: 'opt3', text: 'To pass props down', isCorrect: false },
          { id: 'opt4', text: 'To prevent memory leaks directly', isCorrect: false }
        ],
        tip: { title: 'Dependencies', content: 'The effect runs only if the values in the dependency array have changed between renders.' },
        xpReward: 15
      },
      {
        id: 'q2-2',
        questionText: 'What happens if you omit the dependency array in `useEffect` entirely?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'It runs only once on mount', isCorrect: false },
          { id: 'opt2', text: 'It throws an error', isCorrect: false },
          { id: 'opt3', text: 'It runs after every single render', isCorrect: true },
          { id: 'opt4', text: 'It never runs', isCorrect: false }
        ],
        tip: { title: 'Omitting Dependencies', content: 'Without a dependency array, the effect is triggered on every update.' },
        xpReward: 10
      },
      {
        id: 'q2-3',
        questionText: 'How do you clean up side effects in `useEffect`?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'By calling a cleanup function manually', isCorrect: false },
          { id: 'opt2', text: 'By returning a cleanup function from the effect', isCorrect: true },
          { id: 'opt3', text: 'React cleans them up automatically', isCorrect: false },
          { id: 'opt4', text: 'By throwing an error', isCorrect: false }
        ],
        tip: { title: 'Cleanup', content: 'Returning a function from the effect acts as a cleanup mechanism, running before the component unmounts or re-runs the effect.' },
        xpReward: 15
      }
    ]
  },
  'nodejs-express': {
    'q1': [
      {
        id: 'q1-1',
        questionText: 'What is Node.js?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'A JavaScript framework', isCorrect: false },
          { id: 'opt2', text: 'A JavaScript runtime environment', isCorrect: true },
          { id: 'opt3', text: 'A database', isCorrect: false },
          { id: 'opt4', text: 'A front-end library', isCorrect: false }
        ],
        tip: { title: 'Runtime', content: 'Node.js allows you to execute JavaScript code outside of a web browser.' },
        xpReward: 10
      },
      {
        id: 'q1-2',
        questionText: 'What is Express.js?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'A database for Node.js', isCorrect: false },
          { id: 'opt2', text: 'A minimal and flexible Node.js web application framework', isCorrect: true },
          { id: 'opt3', text: 'A testing utility', isCorrect: false },
          { id: 'opt4', text: 'A task runner', isCorrect: false }
        ],
        tip: { title: 'Express', content: 'Express provides a robust set of features for web and mobile applications.' },
        xpReward: 10
      },
      {
        id: 'q1-3',
        questionText: 'How do you initialize a new npm project?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'npm create', isCorrect: false },
          { id: 'opt2', text: 'npm start', isCorrect: false },
          { id: 'opt3', text: 'npm init', isCorrect: true },
          { id: 'opt4', text: 'node init', isCorrect: false }
        ],
        tip: { title: 'NPM Init', content: 'Running npm init creates a package.json file for your project.' },
        xpReward: 10
      }
    ],
    'q2': [
      {
        id: 'q2-1',
        questionText: 'What is middleware in Express?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'Functions that have access to the request object, response object, and the next middleware', isCorrect: true },
          { id: 'opt2', text: 'The core database engine', isCorrect: false },
          { id: 'opt3', text: 'A tool for writing CSS', isCorrect: false },
          { id: 'opt4', text: 'A front-end templating engine', isCorrect: false }
        ],
        tip: { title: 'Middleware', content: 'Middleware functions can execute code, modify requests/responses, and end the request-response cycle.' },
        xpReward: 15
      },
      {
        id: 'q2-2',
        questionText: 'Which method is used to define a route for GET requests in Express?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'app.post()', isCorrect: false },
          { id: 'opt2', text: 'app.route()', isCorrect: false },
          { id: 'opt3', text: 'app.get()', isCorrect: true },
          { id: 'opt4', text: 'app.fetch()', isCorrect: false }
        ],
        tip: { title: 'Routing', content: 'app.get() binds a handler to a specific path for HTTP GET requests.' },
        xpReward: 10
      },
      {
        id: 'q2-3',
        questionText: 'How do you send a JSON response in Express?',
        codeSnippet: null,
        options: [
          { id: 'opt1', text: 'res.sendJSON()', isCorrect: false },
          { id: 'opt2', text: 'res.json()', isCorrect: true },
          { id: 'opt3', text: 'res.send()', isCorrect: false },
          { id: 'opt4', text: 'res.respond()', isCorrect: false }
        ],
        tip: { title: 'JSON Responses', content: 'res.json() formats the payload as JSON and sets the correct Content-Type headers.' },
        xpReward: 15
      }
    ]
  }
};
