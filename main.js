var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const home = document.getElementById('home')  
const quiz = document.getElementById('quiz')
const submitScore = document.getElementById('submit-score')
const timer = document.getElementById('timer')

let timeLeft = 120
let shuffledQuestions, currentQuestionIndex, timeInterval
// let countRightAnswers = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

//Start Game on click of Start btn
function startGame() {
  console.log('Started');
  //shuffles questions randomly
  shuffledQuestions = questions.sort(() => Math.random() - .5) //shuffled questions = question array which is sorted by a random number. If sort is a negative or a positive number it sorts it differently but not randomly so we use Math.random which gives a number between 1 and 0. We subtract .5 from it to we can get a number that is less than zero or above zero 50% of the time. 
  currentQuestionIndex = 0
  home.classList.add('hide')
  quiz.classList.remove('hide')

  //timer set and starts counting down from 120
  startTimer()

  //creates the question
  setNextQuestion()
}

//Timer function. 
function startTimer() {
    timeInterval = setInterval(() => {
        if (timeLeft > 1) {
            timer.textContent = timeLeft;
            timeLeft--;
        } else if (timeLeft === 1) {
            timer.textContent = timeLeft;
            timeLeft--;
        } else {
            endGame(timeInterval)
        }
    }, 1000);
}

//resets background and then sets next random question 
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerHTML = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

//Resets quiz to the default state
function resetState() {
    clearStatusClass(document.querySelector('main'))
    nextButton.classList.add('hide')
    //removes the default answer buttons so we can replace them with the answers in each question
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

// Select answer
function selectAnswer(e) {
    //which button we selected
  var selectedButton = e.target
  //check if that button is correct
  var correct = selectedButton.dataset.correct
  setStatusClass(document.querySelector('main'), correct)
  //if not correct subtract 20 seconds from timer
  if (!correct) {
  timeLeft -= 20
  }
  //loops through all other answer buttons and checks to see if they are correct.
  //answerButtons.children returns a live collection which is not an array. So we need to convert it to an array so we can use the forEach loop.
  Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
      endGame(timeInterval)
  }
}

//clears elements status and checks if it correct or wrong then changes the class based on that.
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

//function to clear element of class
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function endGame(interval) {
    quiz.classList.add('hide')
    submitScore.classList.remove('hide')
    clearInterval(interval)
}