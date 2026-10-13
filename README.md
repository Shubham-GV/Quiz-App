# Quiz App

A simple computer science quiz that runs in the browser. Built with plain HTML, CSS and JavaScript, with no frameworks and nothing to install.

**Live demo:** _add your GitHub Pages link here after publishing (see below)_

## Features

- 10 random questions per round, picked from a larger question bank
- Questions and answer options are shuffled every time
- 20-second timer for each question
- Instant feedback with a short explanation after every answer
- Progress bar and live score
- Results screen that reviews the questions you missed
- Best score is remembered in your browser
- Keyboard shortcuts: press 1 to 4 to answer
- Works on phones and desktop, with automatic light and dark mode

## How to run

No setup needed. Download or clone the project and open `index.html` in any browser.

```bash
git clone https://github.com/<your-username>/quiz-app.git
cd quiz-app
# then double-click index.html
```

## Add your own questions

Open `questions.js` and add a block to the list:

```js
{
  question: "Which language is used to style web pages?",
  options: ["HTML", "CSS", "Python", "SQL"],
  answer: 1,                       // position of the right option, starting from 0
  explanation: "CSS controls colours, layout and fonts.",
},
```

You can also change the number of questions per round and the timer at the top of `script.js`:

```js
const QUESTIONS_PER_QUIZ = 10;
const SECONDS_PER_QUESTION = 20;
```

## Publish it with GitHub Pages (free live link)

1. Push the project to a GitHub repository.
2. Open the repo, then **Settings** → **Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**, choose branch `main` and folder `/ (root)`, then click **Save**.
4. After a minute your quiz is live at `https://<your-username>.github.io/quiz-app/`.

## Project structure

```
.
├── index.html     # page layout (start, quiz and result screens)
├── style.css      # styling, including dark mode
├── script.js      # quiz logic (timer, scoring, review)
├── questions.js   # the question bank
├── README.md
├── LICENSE
└── .gitignore
```

## Ideas for improvement

- Quiz categories (Python, Web, DSA) with a menu to pick one
- Difficulty levels
- Load questions from a JSON file or an API
- A leaderboard or score history
- Sound effects and animations

## License

MIT. See [LICENSE](LICENSE).
