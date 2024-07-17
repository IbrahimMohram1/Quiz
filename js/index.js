import { Questions } from "./question.module.js";
import { Quiz } from "./quiz.module.js";

const categoryMenu = document.getElementById("categoryMenu");
const difficultyOptions = document.getElementById("difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
const startQuiz = document.getElementById("startQuiz");
const quizOptions = document.getElementById("quizOptions");

export let allQuestions;
export let myQuiz;

startQuiz.addEventListener("click", async () => {
  myQuiz = new Quiz(
    categoryMenu.value,
    difficultyOptions.value,
    questionsNumber.value,
  );

  allQuestions = await myQuiz.getQuizData();

  quizOptions.classList.replace("d-flex", "d-none");

  let myQuestion = new Questions(0);
  myQuestion.displayQuestion();
});
