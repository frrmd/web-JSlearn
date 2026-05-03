export const mockCourses = [
  {
    id: 'js-basics',
    title: 'JS Basics',
    icon: 'javascript',
    colorTheme: 'primary',
    isLocked: false,
    materials: [
      { id: 'm1', title: 'Introduction to JS Basics', description: 'Understand the core syntax and language fundamentals.', readTime: '5 min' },
      { id: 'm2', title: 'Variables and Data Types', description: 'Deep dive into let, const, var, and primitive types.', readTime: '7 min' }
    ],
    quizzes: [
      { id: 'q1', title: 'Quiz Level 1', description: 'Basic Syntax & Output' },
      { id: 'q2', title: 'Quiz Level 2', description: 'Variables & Types' }
    ]
  },
  {
    id: 'loops-arrays',
    title: 'Loops & Arrays',
    icon: 'rebase_edit',
    colorTheme: 'secondary',
    isLocked: false,
    materials: [
      { id: 'm1', title: 'Introduction to Arrays', description: 'Creating, accessing, and modifying lists of data.', readTime: '6 min' },
      { id: 'm2', title: 'Mastering Loops', description: 'For loops, while loops, and modern iteration methods.', readTime: '8 min' }
    ],
    quizzes: [
      { id: 'q1', title: 'Quiz Level 1', description: 'Array Fundamentals' },
      { id: 'q2', title: 'Quiz Level 2', description: 'Iteration Challenges' }
    ]
  },
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    icon: 'web',
    colorTheme: 'tertiary',
    isLocked: false,
    materials: [
      { id: 'm1', title: 'Selecting Elements', description: 'Learn how to query and select DOM nodes.', readTime: '5 min' },
      { id: 'm2', title: 'Event Listeners', description: 'Make your page interactive with events.', readTime: '8 min' }
    ],
    quizzes: [
      { id: 'q1', title: 'Quiz Level 1', description: 'Selectors & Attributes' },
      { id: 'q2', title: 'Quiz Level 2', description: 'Events & Reactivity' }
    ]
  },
  {
    id: 'async-fetch',
    title: 'Async & Fetch',
    icon: 'cloud_sync',
    colorTheme: 'secondary',
    isLocked: false,
    materials: [
      { id: 'm1', title: 'Promises Explained', description: 'Understanding asynchronous Javascript.', readTime: '6 min' },
      { id: 'm2', title: 'The Fetch API', description: 'How to make network requests natively.', readTime: '7 min' }
    ],
    quizzes: [
      { id: 'q1', title: 'Quiz Level 1', description: 'Promises & Callbacks' },
      { id: 'q2', title: 'Quiz Level 2', description: 'API Integration' }
    ]
  },
  {
    id: 'react-hooks',
    title: 'React Hooks',
    icon: 'token',
    colorTheme: 'tertiary',
    isLocked: false,
    materials: [
      { id: 'm1', title: 'useState and State Management', description: 'The foundation of interactive React components.', readTime: '5 min' },
      { id: 'm2', title: 'useEffect and Side Effects', description: 'Syncing your component with external systems.', readTime: '8 min' }
    ],
    quizzes: [
      { id: 'q1', title: 'Quiz Level 1', description: 'State Basics' },
      { id: 'q2', title: 'Quiz Level 2', description: 'Effect Dependencies' }
    ]
  },
  {
    id: 'nodejs-express',
    title: 'Node.js Express',
    icon: 'storage',
    colorTheme: 'primary',
    isLocked: false,
    materials: [
      { id: 'm1', title: 'Building a Server', description: 'Setting up your first Express app.', readTime: '7 min' },
      { id: 'm2', title: 'Routing and Middleware', description: 'Handling requests and abstracting logic.', readTime: '9 min' }
    ],
    quizzes: [
      { id: 'q1', title: 'Quiz Level 1', description: 'Server Fundamentals' },
      { id: 'q2', title: 'Quiz Level 2', description: 'Express Routing' }
    ]
  }
];
