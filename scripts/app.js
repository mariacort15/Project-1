console.log("JS is working!");

const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');
const fiftyButton = document.getElementById('fifty-btn');
const skipButton = document.getElementById('skip-btn');
const answerButtons = document.querySelectorAll('.answer-button');

let currentQuestionIndex = 0;
let usedFifty = false;
let usedSkip = false;

//Questions on screen
const questions = [
    {  //Question #1
        question: "What is the smallest prime number?", 
        answers: ["1", "2", "3", "0"],
        correct: "2"
    },
    {  //Question #2
        question: "What is the chemical symbol for gold?",
        answers: ["Au", "Ag", "Gd", "Go"],
        correct: "Au"
    },
    {   //Question #3
        question: "What is the rarest blood type in humans?",
        answers: ["O-", "A+", "AB-", "B-"],
        correct: "AB-"
    },
    {   //Question #4
        question: "Which country has the most official languages?",
        answers: ["India", "South Africa", "Switzerland", "Canada"],
        correct: "South Africa"
    },
    {   //Question #5
        question: "What is the term for a word or phrase spelled the same forwards and backwards?",
        answers: ["Anagram", "Palindrome", "Oxymoron", "Homonym"],
        correct: "Palindrome"
    },
    {  //Question #6
        question: "In computing, what does the acronym 'GPU' stand for?",
        answers: ["General Processing Unit", "Graphical Processing Unit", "Global Processor Unit", "Graphics Programming Utility"],
        correct: "Graphical Processing Unit"
    },
    {  //Question #7
        question: "Which ancient civilization built the Machu Picchu complex?",
        answers: ["Aztec", "Maya", "Inca", "Olmec"],
        correct: "Inca"
    },
    {  //Question #8
        question: "What famous scientist won two Nobel Prizes in different scientific fields?",
        answers: ["Marie Curie", "Albert Einstein", "Linus Pauling", "Richard Feynman"],
        correct: "Marie Curie"
    },
    {  //Question #9
        question: "Which physcist developed the theory of general relativity?",
        answers: ["Issac Newton", "Albert Einstein", "Niels Bohr", "Stephen Hawking"],
        correct: "Albert Einstein"
    },
    {  //Question #10
        question: "Which element has the highest melting point?",
        answers: ["Tungsten", "Iron", "Carbon", "Osmium"],
        correct: "Tungsten"
    },
];
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
fiftyButton.addEventListener('click', useFiftyFifty);
skipButton.addEventListener('click', useSkip);

function checkAnswer(selectedAnswer) {
    const moneySound = document.getElementById('money-sound');
  
    if (selectedAnswer === correctAnswer) {
      moneySound.currentTime = 0; 
      moneySound.play(); 
      showCorrectMessage();
    } else {
      showIncorrectMessage();
    }
}


function startGame() {
    startButton.classList.add('hide');
    restartButton.classList.add('hide');
    resultElement.classList.add('hide');
    currentQuestionIndex = 0;
    usedFifty = false;
    usedSkip = false;
    fiftyButton.disabled = false; 
    skipButton.disabled = false; 
    lifelines.classList.remove('hide');
    questionContainer.classList.remove('hide');
    loadNextQuestion();
}

function loadNextQuestion() {
    resetState();
    const questionData = questions[currentQuestionIndex];
    questionElement.innerText = questionData.question;
    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => {
            selectAnswer(answer, questionData.correct);
        });

        answerButtonElement.appendChild(button);
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex); 
  }

function resetState() {
    answerButtonElement.innerHTML = '';
}

function selectAnswer(selected, correct) {
    if (selected === correct) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadNextQuestion();
        } else {
            winGame();
        } 
    } else {
        loseGame();
    }
}

function winGame() {
    alert("You won!");
    questionContainer.classList.add('hide');
    resultElement.innerText = "Congratulations! You won the game!";
    resultElement.classList.remove('hide'); 
    restartButton.classList.remove('hide');
}

function loseGame() {
    alert("You Lost!");
    questionContainer.classList.add('hide');
    lifelines.classList.add('hide');
    resultElement.innerText = "Wrong answer! You lost the game.";
    resultElement.classList.remove('hide');
    restartButton.classList.remove('hide');
}

function useFiftyFifty() {
    if (usedFifty) return;
    usedFifty = true;
    fiftyButton.disabled = true;

const currentQ = questions[currentQuestionIndex];
const correct = currentQ.correct;
const wrongButtons = Array.from(answerButtonElement.children).filter(btn => btn.innerText !== correct);

for (let i = 0; i < 2; i++) {
    const index = Math.floor(Math.random() * wrongButtons.length);
    wrongButtons[index].disabled = true;
    wrongButtons[index].computedStyleMap.visibility = 'hidden';
wrongButtons.splice(index, 1);
  }
}

function useSkip() {
    if (usedSkip) return;
    usedSkip = true;
    skipButton.disabled = true;
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadNextQuestion();
    } else {
      winGame();
    }
  }

  console.log("You clicked:", selected);
  console.log("Correct answer is:", correct);



