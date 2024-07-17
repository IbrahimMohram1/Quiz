import { allQuestions, myQuiz } from "./index.js";

const questionsContainer = document.getElementById("questionsContainer");

export class Questions {
  constructor(index) {
    this.index = index;
    this.category = allQuestions[this.index].category;
    this.currentQuestion = allQuestions[this.index].question;
    this.questionLength = allQuestions.length;
    this.correctAnswer = allQuestions[this.index].correct_answer;
    this.inCorrectAnswer = allQuestions[this.index].incorrect_answers;
    this.allChoices = [this.correctAnswer, ...this.inCorrectAnswer].sort(); 

    this.answered = false;
  }

  displayQuestion() {
    let cartona = `
            <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      this.questionLength
    } Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.currentQuestion}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
        ${this.allChoices.map((choice) => `<li>${choice}</li>`).join("")}
      </ul>
    </div>
        `;
    questionsContainer.innerHTML = cartona;

    let allAnswers = Array.from(document.querySelectorAll(".choices li"));

    allAnswers.forEach((answer) => {
      answer.addEventListener("click", (e) => {
        this.checkAnswer(e.target);
      });
    });
  }

  checkAnswer(userAnswer) {
    if (this.answered) {
      return;
    }
    if (userAnswer.innerHTML == this.correctAnswer) {
      console.log("correct");
      userAnswer.classList.add("correct");
      myQuiz.score++;
    } else {
      console.log("incorrect");
      userAnswer.classList.add("wrong");
    }

    this.index++;
    this.answered = true;

    this.animateQuestion(userAnswer);

    setTimeout(() => {
      this.nextQuestion();
    }, 1000);
  }

  animateQuestion(element) {
    element.closest(".question").classList.remove("animate__bounceIn");
    element.closest(".question").classList.add("animate__backOutLeft");
  }

  nextQuestion() {
    if (this.index < this.questionLength) {
      let newQuestion = new Questions(this.index);
      newQuestion.displayQuestion();
    } else {
      questionsContainer.innerHTML = `
        <div id="tryAgainContainer" class="text-center text-white  animate__animated animate__bounceInDown">
              <h1>Your Score is <span>${myQuiz.score}</span></h1>
              <button id="tryAgainBtn" class="btn btn-danger">Try Again</button>
          </div>
        `;


        let tryAgainBtn =document.getElementById("tryAgainBtn")

        tryAgainBtn.addEventListener("click" , ()=>{
            window.location.reload()
        })

    }
  }
}
