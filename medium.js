const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const timerProgress = document.getElementById("timer");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let lives = 5; // Initialize the lives counter

let questions = [
  {
    question: "What is the sum of the first 20 terms of the arithmetic sequence where the first term is 2 and the common difference is 3?",
    choice1: "290",
    choice2: "400",
    choice3: "420",
    choice4: "460",
    answer: 3
  },
  {
    question: "How many different ways can you arrange the letters of the word 'DISCRETE'?",
    choice1: "5,040",
    choice2: "20,160",
    choice3: "40,320",
    choice4: "80,640",
    answer: 2
  },
  {
    question: "In a simple graph with 10 vertices and 15 edges, what is the sum of the degrees of all vertices?",
    choice1: "15",
    choice2: "20",
    choice3: "30",
    choice4: "60",
    answer: 4
  },
  {
    question: "How many subsets does a set with 8 elements have?",
    choice1: "64",
    choice2: "128",
    choice3: "256",
    choice4: "512",
    answer: 3
  },
  {
    question: "What is the minimum number of colors needed to color a complete graph with 5 vertices (K5)?",
    choice1: "2",
    choice2: "3",
    choice3: "4",
    choice4: "5",
    answer: 4
  },
  {
    question: "A force of 50 N moves an object 5 meters in the direction of the force. What is the work done?",
    choice1: "200 J",
    choice2: "250 J",
    choice3: "300 J",
    choice4: "350 J",
    answer: 2
  },
  {
    question: "What is the frequency of a wave with a wavelength of 2 meters traveling at a speed of 10 meters per second?",
    choice1: "2.5 Hz",
    choice2: "5 Hz",
    choice3: "10 Hz",
    choice4: "20 Hz",
    answer: 2
  },
  {
    question: "Which of the following particles has the highest mass?",
    choice1: "Electron",
    choice2: "Proton",
    choice3: "Neutron",
    choice4: "Photon",
    answer: 3
  },
  {
    question: "According to Newton’s second law of motion, what is the acceleration of a 10 kg object when a force of 60 N is applied to it?",
    choice1: "4 m/s²",
    choice2: "5 m/s²",
    choice3: "6 m/s²",
    choice4: "7 m/s²",
    answer: 3
  },
  {
    question: "What is the escape velocity from the surface of Earth, ignoring air resistance?",
    choice1: "7.9 km/s",
    choice2: "11.2 km/s",
    choice3: "15.6 km/s",
    choice4: "20.5 km/s",
    answer: 2
  }
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
const TIME_LIMIT = 10; // Time limit for each question in seconds
let timerInterval; // Timer interval variable

// Function to start the game
startGame = () => {
  questionCounter = 0;
  score = 0;
  lives = 5; // Reset lives
  availableQuestions = [...questions];
  getNewQuestion();
};

/// Function to get a new question
const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS || lives === 0) {
    localStorage.setItem("mostRecentScoreMedium", score);
    return window.location.assign("mediumend.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
  
  // Reset timer
  clearInterval(timerInterval);
  startTimer();
};

// Event listeners for user choices
choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
  
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      } else {
        // If the selected choice is incorrect, handle incorrect answer
        handleIncorrectAnswer(selectedAnswer); // Pass selected answer
      }
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        choices.forEach(choice => {
          choice.parentElement.classList.remove('correct');
          choice.parentElement.classList.remove('incorrect');
        });
        getNewQuestion();
        // Reset timer progress
        timerProgress.style.transition = 'none';
        timerProgress.style.width = '100%';
        setTimeout(() => {
          timerProgress.style.transition = '';
        }, 10);
      }, 1000);
    });
  });

// Function to increment the score
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// Function to start the timer
function startTimer() {
  let timePassed = 0;
  timerInterval = setInterval(() => {
    timePassed += 1;
    let progress = ((TIME_LIMIT - timePassed) / TIME_LIMIT) * 100;
    timerProgress.style.width = progress + "%";

    if (timePassed >= TIME_LIMIT) {
      clearInterval(timerInterval);
      handleTimeUp();
    }
  }, 1000);
}

// Function to decrement lives count
function decrementLives() {
  lives--;
  const livesText = document.getElementById("lives");
  livesText.innerText = lives;
  if (lives <= 0) {
    // If lives reach 0, end the game
    localStorage.setItem("mostRecentScoreMedium", score);
    return window.location.assign("mediumend.html");
  }
}

// Function to handle time up
handleTimeUp = () => {
  decrementLives(); // Decrement lives count
  const correctChoice = document.querySelector(
    `.choice-text[data-number="${currentQuestion.answer}"]`
  );
  correctChoice.parentElement.classList.add("correct");

  setTimeout(() => {
    correctChoice.parentElement.classList.remove("correct");
    getNewQuestion();
    // Reset timer animation
    timerProgress.style.transition = "none";
    timerProgress.style.width = "100%";
    setTimeout(() => {
      timerProgress.style.transition = "";
    }, 10);
  }, 1000);
};

// Function to handle incorrect answers
function handleIncorrectAnswer(selectedAnswer) {
  decrementLives(); // Decrease lives count
  const correctChoice = document.querySelector(
    `.choice-text[data-number="${currentQuestion.answer}"]`
  );
  correctChoice.parentElement.classList.add("correct");
  const selectedChoice = document.querySelector(
    `.choice-text[data-number="${selectedAnswer}"]`
  );
  selectedChoice.parentElement.classList.add("incorrect");
}

window.onload = () => {
  alert("Instructions: You have 10 seconds. If the timer runs out, you'll lose 1 life. If you lose all your lives, you lose.");
};

// Start the game
startGame();