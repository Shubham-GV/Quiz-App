// All quiz questions live here. To add your own, copy one block and edit it.
//
//   question:    the question text
//   options:     the answer choices (use 4 for the best layout)
//   answer:      position of the correct option in the list, starting from 0
//   explanation: shown after the player answers

const QUESTIONS = [
  {
    question: "Which data structure follows the LIFO (Last In, First Out) order?",
    options: ["Queue", "Stack", "Array", "Linked list"],
    answer: 1,
    explanation: "A stack removes the most recently added item first, like a pile of plates.",
  },
  {
    question: "What does print(type([])) show in Python?",
    options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"],
    answer: 1,
    explanation: "Square brackets [] create a list.",
  },
  {
    question: "What is the time complexity of binary search on a sorted array?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    answer: 2,
    explanation: "Binary search halves the search range every step, so it takes O(log n) steps.",
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["func", "define", "function", "def"],
    answer: 3,
    explanation: "Python functions start with the def keyword, for example: def greet():",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High Text Machine Language",
      "HyperTool Multi Language",
      "Home Text Markup Level",
    ],
    answer: 0,
    explanation: "HTML is the standard markup language used to structure web pages.",
  },
  {
    question: "Which of these Python data types is immutable (cannot be changed after creation)?",
    options: ["List", "Dictionary", "Tuple", "Set"],
    answer: 2,
    explanation: "Tuples cannot be modified after they are created. Lists, dictionaries and sets can.",
  },
  {
    question: "Which SQL command is used to read data from a table?",
    options: ["GET", "SELECT", "FETCH", "OPEN"],
    answer: 1,
    explanation: "SELECT retrieves rows from a table, for example: SELECT * FROM students;",
  },
  {
    question: "Which of these sorting algorithms has an average time complexity of O(n log n)?",
    options: ["Bubble sort", "Insertion sort", "Merge sort", "Selection sort"],
    answer: 2,
    explanation: "Merge sort splits the list and merges it back, giving O(n log n). The others are O(n²) on average.",
  },
  {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Utility",
      "Control Processing Union",
    ],
    answer: 0,
    explanation: "The CPU is the main chip that executes instructions in a computer.",
  },
  {
    question: "Which Git command saves your staged changes as a snapshot in the local history?",
    options: ["git push", "git clone", "git init", "git commit"],
    answer: 3,
    explanation: "git commit records a snapshot locally. git push is what sends commits to GitHub.",
  },
  {
    question: "Which symbol starts a single-line comment in Python?",
    options: ["//", "#", "/*", "--"],
    answer: 1,
    explanation: "Everything after # on a line is ignored by Python.",
  },
  {
    question: "What is the result of 7 // 2 in Python?",
    options: ["3.5", "4", "3", "2"],
    answer: 2,
    explanation: "// is floor division. It divides and rounds down, so 7 // 2 gives 3.",
  },
  {
    question: "Which of these is NOT one of the four pillars of Object-Oriented Programming?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
    answer: 3,
    explanation: "The four pillars are encapsulation, inheritance, polymorphism and abstraction.",
  },
  {
    question: "What is the decimal number 10 in binary?",
    options: ["1010", "1100", "1001", "1110"],
    answer: 0,
    explanation: "10 = 8 + 2, so the binary form is 1010.",
  },
];
