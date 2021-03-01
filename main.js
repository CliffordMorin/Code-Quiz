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

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
  console.log('Started');
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  home.classList.add('hide')
  quiz.classList.remove('hide')
  startTimer()
  setNextQuestion()
}

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

function resetState() {
    clearStatusClass(document.querySelector('main'))
    //add when taken to finished section resets 
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.querySelector('main'), correct)
  //if not correct subtract 20 seconds from timer
  if (!correct) {
  timeLeft -= 20
  }
  Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
      endGame(timeInterval)
  }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function endGame(interval) {
    quiz.classList.add('hide')
    submitScore.classList.remove('hide')
    clearInterval(interval)
}