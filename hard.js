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
      question: "In how many ways can you arrange the letters of the word 'MATHEMATICS'?",
      choice1: "10! (factorial)",
      choice2: "11! (factorial)",
      choice3: "12! (factorial)",
      choice4: "13! (factorial)",
      answer: 3,
      explanation: "The word 'MATHEMATICS' has 11 letters, but there are repeating letters. So, the correct answer is 12! (factorial)."
    },
    {
      question: "What is the result of 5 factorial (5!)?",
      choice1: "15",
      choice2: "120",
      choice3: "25",
      choice4: "720",
      answer: 2,
      explanation: "The factorial of 5 (5!) is calculated as 5 × 4 × 3 × 2 × 1, which equals 120."
    },
    {
      question: "Which of the following is NOT a fundamental component of digital logic design?",
      choice1: "Flip-flop",
      choice2: "Transistor",
      choice3: "Capacitor",
      choice4: "Gate",
      answer: 3,
      explanation: "Digital logic design primarily involves components such as transistors, gates (e.g., AND, OR, NOT), and flip-flops, but capacitors are not typically considered fundamental components in this context."
    },
    {
      question: "Which law in Boolean algebra states that the complement of the sum of two variables is equal to the product of their complements?",
      choice1: "Identity law",
      choice2: "De Morgan's law",
      choice3: "Commutative law",
      choice4: "Distributive law",
      answer: 2,
      explanation: "De Morgan's law states that the complement of the sum of two variables is equal to the product of their complements, expressed as ¬(A + B) = ¬A ⋅ ¬B."
    },
    {
      question: "What is the SI unit of electric charge?",
      choice1: "Ampere (A)",
      choice2: "Volt (V)",
      choice3: "Coulomb (C)",
      choice4: "Ohm (Ω)",
      answer: 3,
      explanation: "The SI unit of electric charge is the coulomb (C), named after the French physicist Charles-Augustin de Coulomb."
    },
    {
      question: "Which law in physics states that for every action, there is an equal and opposite reaction?",
      choice1: "Newton's first law",
      choice2: "Newton's second law",
      choice3: "Newton's third law",
      choice4: "Law of gravitation",
      answer: 3,
      explanation: "Newton's third law of motion states that for every action, there is an equal and opposite reaction. This law is fundamental in understanding forces and motion."
    },
    {
      question: "What is the formula to calculate the velocity of an object given its displacement and time taken?",
      choice1: "v = d / t",
      choice2: "v = d * t",
      choice3: "v = t / d",
      choice4: "v = d + t",
      answer: 1,
      explanation: "The formula to calculate velocity (v) is given by dividing the displacement (d) by the time taken (t)."
    },
    {
      question: "Which theorem in discrete mathematics states that any integer greater than 1 can be written as a unique product of prime numbers?",
      choice1: "Fundamental theorem of arithmetic",
      choice2: "Euler's theorem",
      choice3: "Fermat's little theorem",
      choice4: "Chinese remainder theorem",
      answer: 1,
      explanation: "The fundamental theorem of arithmetic states that any integer greater than 1 can be written uniquely as a product of prime numbers, up to the order of the factors."
    },
    {
      question: "Which programming language is commonly used for low-level programming and embedded systems?",
      choice1: "Java",
      choice2: "Python",
      choice3: "C",
      choice4: "JavaScript",
      answer: 3,
      explanation: "C is commonly used for low-level programming and embedded systems due to its efficiency, close-to-hardware features, and portability."
    },
    {
      question: "In digital electronics, what does the term 'clock frequency' refer to?",
      choice1: "The speed at which data is transmitted over a network",
      choice2: "The frequency of the clock signal used to synchronize operations in a digital system",
      choice3: "The frequency of the power supply in a digital circuit",
      choice4: "The frequency at which a microprocessor operates",
      answer: 2,
      explanation: "In digital electronics, the clock frequency refers to the frequency of the clock signal, which is used to synchronize various operations within a digital system."
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
  lives = 3; // Reset lives
  availableQuestions = [...questions];
  getNewQuestion();
};

// Function to get a new question
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS || lives === 0) {
    localStorage.setItem("mostRecentScoreHard", score);
    return window.location.assign("hardend.html");
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
    localStorage.setItem("mostRecentScoreHard", score);
    return window.location.assign("hardend.html");
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
  alert("Instructions: You Only Have 10 Seconds Timer and 3 Lives, if the Timer runs out of time, you'll lose 1 live, and if your lives gone, you lose.");
};

// Start the game
startGame();