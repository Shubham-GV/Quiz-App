"use strict";

// ---------- Settings (change these to customise the quiz) ----------
const QUESTIONS_PER_QUIZ = 10;
const SECONDS_PER_QUESTION = 20;
const BEST_SCORE_KEY = "quizApp.bestScore";

// ---------- Page elements ----------
const $ = (id) => document.getElementById(id);

const screens = {
  start: $("start-screen"),
  quiz: $("quiz-screen"),
  result: $("result-screen"),
};

const el = {
  startBtn: $("start-btn"),
  nextBtn: $("next-btn"),
  restartBtn: $("restart-btn"),
  bestScore: $("best-score"),
  progressText: $("progress-text"),
  progressBar: $("progress-bar"),
  timer: $("timer"),
  questionText: $("question-text"),
  options: $("options"),
  feedback: $("feedback"),
  scoreText: $("score-text"),
  resultScore: $("result-score"),
  resultMessage: $("result-message"),
  review: $("review"),
  reviewList: $("review-list"),
};

// ---------- Quiz state ----------
let quiz = [];          // the questions for this round
let current = 0;        // index of the current question
let score = 0;
let missed = [];        // questions answered wrongly or timed out
let locked = false;     // true after an answer, until "Next" is pressed
let timerId = null;
let timeLeft = 0;

// ---------- Helpers ----------
function shuffle(list) {
  // Fisher-Yates shuffle (returns a new array)
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(name) {
  for (const key in screens) {
    screens[key].hidden = key !== name;
  }
}

function loadBestScore() {
  try {
    const value = parseInt(localStorage.getItem(BEST_SCORE_KEY), 10);
    return Number.isNaN(value) ? null : value;
  } catch (error) {
    return null; // storage can be blocked, the quiz still works
  }
}

function saveBestScore(percent) {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(percent));
  } catch (error) {
    // ignore
  }
}

function showBestScore() {
  const best = loadBestScore();
  if (best === null) {
    el.bestScore.hidden = true;
  } else {
    el.bestScore.textContent = `Your best score: ${best}%`;
    el.bestScore.hidden = false;
  }
}

// ---------- Timer ----------
function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function renderTimer() {
  el.timer.textContent = `${timeLeft}s`;
  el.timer.classList.toggle("warn", timeLeft <= 5);
}

function startTimer() {
  stopTimer();
  timeLeft = SECONDS_PER_QUESTION;
  renderTimer();
  timerId = setInterval(() => {
    timeLeft -= 1;
    renderTimer();
    if (timeLeft <= 0) {
      selectAnswer(-1); // time is up
    }
  }, 1000);
}

// ---------- Quiz flow ----------
function startQuiz() {
  const picked = shuffle(QUESTIONS).slice(0, QUESTIONS_PER_QUIZ);

  // Shuffle the options of each question and remember where the right one went.
  quiz = picked.map((q) => {
    const options = shuffle(q.options.map((text, i) => ({ text, correct: i === q.answer })));
    return {
      question: q.question,
      explanation: q.explanation,
      options: options.map((o) => o.text),
      correctIndex: options.findIndex((o) => o.correct),
    };
  });

  current = 0;
  score = 0;
  missed = [];
  showScreen("quiz");
  showQuestion();
}

function showQuestion() {
  const q = quiz[current];
  locked = false;

  el.progressText.textContent = `Question ${current + 1} of ${quiz.length}`;
  el.progressBar.style.width = `${(current / quiz.length) * 100}%`;
  el.scoreText.textContent = `Score: ${score}`;
  el.questionText.textContent = q.question;
  el.feedback.textContent = "";
  el.nextBtn.hidden = true;
  el.options.replaceChildren();

  q.options.forEach((text, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = `${index + 1}. ${text}`;
    button.addEventListener("click", () => selectAnswer(index));
    el.options.appendChild(button);
  });

  startTimer();
}

function selectAnswer(chosen) {
  if (locked) return;
  locked = true;
  stopTimer();

  const q = quiz[current];
  const buttons = el.options.querySelectorAll(".option");
  buttons.forEach((button) => (button.disabled = true));
  buttons[q.correctIndex].classList.add("correct");

  const feedback = document.createElement("span");
  const label = document.createElement("strong");

  if (chosen === q.correctIndex) {
    score += 1;
    label.className = "good";
    label.textContent = "Correct! ";
  } else {
    if (chosen >= 0) buttons[chosen].classList.add("wrong");
    label.className = "bad";
    label.textContent = chosen === -1 ? "Time's up! " : "Not quite. ";
    missed.push(q);
  }

  feedback.append(label, q.explanation);
  el.feedback.replaceChildren(feedback);
  el.scoreText.textContent = `Score: ${score}`;

  el.nextBtn.textContent = current === quiz.length - 1 ? "See results" : "Next";
  el.nextBtn.hidden = false;
  el.nextBtn.focus();
}

function nextQuestion() {
  if (current < quiz.length - 1) {
    current += 1;
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const percent = Math.round((score / quiz.length) * 100);

  el.resultScore.textContent = `${score} / ${quiz.length} (${percent}%)`;
  el.resultMessage.textContent =
    percent >= 90 ? "Excellent work!" :
    percent >= 70 ? "Great job!" :
    percent >= 50 ? "Good effort. A little more practice and you'll get there." :
    "Keep practising, you'll improve quickly.";

  // Remember the best score
  const best = loadBestScore();
  if (best === null || percent > best) saveBestScore(percent);

  // List the questions the player missed
  el.reviewList.replaceChildren();
  el.review.hidden = missed.length === 0;
  missed.forEach((q) => {
    const item = document.createElement("li");

    const question = document.createElement("div");
    question.textContent = q.question;

    const answer = document.createElement("div");
    answer.className = "answer";
    answer.textContent = `Answer: ${q.options[q.correctIndex]}`;

    const why = document.createElement("div");
    why.className = "why";
    why.textContent = q.explanation;

    item.append(question, answer, why);
    el.reviewList.appendChild(item);
  });

  showScreen("result");
}

function goToStart() {
  showBestScore();
  showScreen("start");
}

// ---------- Events ----------
el.startBtn.addEventListener("click", startQuiz);
el.nextBtn.addEventListener("click", nextQuestion);
el.restartBtn.addEventListener("click", goToStart);

// Keyboard shortcut: press 1-4 to pick an option
document.addEventListener("keydown", (event) => {
  if (screens.quiz.hidden || locked) return;
  const index = Number(event.key) - 1;
  if (Number.isInteger(index) && index >= 0 && index < quiz[current].options.length) {
    selectAnswer(index);
  }
});

// ---------- Start ----------
$("rule-count").textContent = Math.min(QUESTIONS_PER_QUIZ, QUESTIONS.length);
$("rule-time").textContent = SECONDS_PER_QUESTION;
showBestScore();
