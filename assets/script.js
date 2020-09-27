var questions = [
    {
        number: "Question 1",
        question: "Which of the following is not a logical operator?",
        answers: ["|| (OR)", "@@ (AS WELL AS)", "&& (AND)", "! (NOT)"],
        correct: "@@ (AS WELL AS)"
    },
    {
        number: "Question 2",
        question: "Which of the following is not a variable type in JavaScript?",
        answers: ["reg", "var", "let", "const"],
        correct: "reg"
    },
    {
        number: "Question 3",
        question: "Which of the following is the correct way to set up an array?",
        answers: ["var wine = ['Cabernet', 'Riesling', 'Sangiovese'];", "var wine = [Cabernet, Riesling, Sangiovese];", "var wine = {Cabernet; Riesling; Sangiovese};", "var wine = ('Cabernet', 'Riesling', 'Sangiovese');"],
        correct: "var wine = ['Cabernet', 'Riesling', 'Sangiovese']"
    },
    {
        number: "Question 4",
        question: "var introduction = 'Hi!';. Which of the following will create a popup window saying 'Hi!'?",
        answers: ["console.log(introduction);", "console.dir(introduction);", "document.querySelector(introduction);", "alert(introduction);"],
        correct: "alert(introduction);"
    },
    {
        number: "Question 5",
        question: "Which of the following is not a data type in JavaScript?",
        answers: ["String", "Number", "Letter", "Boolean"],
        correct: "Letter"
    }
]

var startBtn = document.querySelector("#start-button");
var questionTitleEl = document.querySelector("#question-title-container")
var questionBoxEl = document.querySelector("#question-box");
var answersListEl = document.querySelector("answersList")
var time = 75;
var currentQuestionIndex = 0;

var startQuiz = function() {
    var welcomeTitle = document.getElementById("welcome-title");
    var welcomeRules = document.getElementById("welcome-rules");
    var startButton = document.getElementById("start-button")
    welcomeTitle.remove();
    welcomeRules.remove();
    startButton.remove();

    pullQuestions();
}

var pullQuestions = function() {

    currentQuestion = questions[currentQuestionIndex];
       
    var questionTitleTextEl = document.createElement("h2");
    questionTitleTextEl.className = "question-title";
    questionTitleTextEl.innerHTML = "<h2 class='question-title'>" + currentQuestion.number + "</h2>";
    questionTitleEl.appendChild(questionTitleTextEl);

    var questionContentEl = document.createElement("p");
    questionContentEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    questionBoxEl.appendChild(questionContentEl);

    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var buttonChoiceEl = document.createElement("button");
        buttonChoiceEl.textContent = currentQuestion.answers[i];
        buttonChoiceEl.setAttribute()
        questionBoxEl.appendChild(buttonChoiceEl);


    }

}

var answerHandler = function() {
    

}





var starTimer = function() {

}

var endWin = function() {

}

var endLose = function () {

}

var finalScore = function() {

}





startBtn.addEventListener("click", startQuiz);
answerBtn.addEventListener("click", answerHandler);
