const questions = [
  {
    question:
      "What is the first thing you do when someone is having a seizure?",
    answers: [
      "Call emergency services",
      "Hold them upright",
      "Bring them water",
      "Stay calm",
    ],
    correct: "Stay calm",
  },
  {
    question:
      "How long should a seizure last before you call emergency services?",
    answers: [
      "More than 10 minutes",
      "More than 2 minutes",
      "More than 5 minutes",
      "Immediately",
    ],
    correct: "More than 5 minutes",
  },
  {
    question:
      "What is the safest position for a person having a seizure to be in?",
    answers: [
      "Laying flat on the ground",
      "On their side, head tilted slightly back with one bent knee",
      "Head elevated with body laying flat",
      "Sat upright on a chair",
    ],
    correct: "On their side, head tilted slightly back with one bent knee",
  },
  {
    question: "How can you prevent further injury?",
    answers: [
      "Clear area of any furniture and sharp objects",
      "Cushion head",
      "Loosen tight clothing",
      "All the above",
    ],
    correct: "All the above",
  },
  {
    question: "What should you NOT do when someone is having a seizure?",
    answers: [
      "Restrain someone",
      "Call emergency services",
      "Make a cushion out of someone’s sweater",
      "All the above",
    ],
    correct: "Restrain someone",
  },
];

// ===== DOM Elements: Storing references to HTML elements =====
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreContainer = document.getElementById("score-container");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

// ===== Quiz State Variables =====
let currentQuestionIndex = 0; // Tracks which question is being shown
let score = 0; // Tracks number of correct answers

// ===== Start the Quiz =====
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hidden"); // Hide score section
  document.getElementById("quiz").classList.remove("hidden"); // Show quiz section
  showQuestion(); // Display first question
}

// Show next question
function showQuestion() {
  resetAnswers();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  //create button for each answer choice
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    //mark the button if it's the correct answer
    if (answer === currentQuestion.correct) {
      button.dataset.correct = true;
    }

    //add click event listenerto check the answer
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button); //add button to the page
  });
}

// ==== Remove Old Answer buttons =====
function resetAnswers() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

//===== Handle Answer Selection ====
function selectAnswer(e) {
  const selectedButton = e.target; //get the clicked button
  const correct = selectedButton.dataset.correct === "true"; //Check if correct

  if (correct) {
    score++; //increment score if correct
  }

  currentQuestionIndex++; //Move to the next question

  if (currentQuestionIndex < questions.length) {
    showQuestion(); //show next question
  } else {
    endQuiz();
  }
}
// ==== End of quiz: show score ====
function endQuiz() {
  document.getElementById("quiz").classList.add("hidden"); //hide quiz section
  scoreContainer.classList.remove("hidden"); //show score section
  finalScore.textContent = `${score} out of ${questions.length}`; //show score
}

// ==== restart button event listener =====
restartBtn.addEventListener("click", startQuiz);

// ==== Initialise Quiz on page load ====
startQuiz();
