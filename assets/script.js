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
        correct: "var wine = ['Cabernet', 'Riesling', 'Sangiovese'];"
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
var questionTitleEl = document.querySelector("#question-title-container");
var questionBoxEl = document.querySelector("#question-box");
var answersListEl = document.querySelector("answersList")
var timerEl = document.querySelector("#time");
var formTitleEl = document.querySelector("#submit-title")
var submitEl = document.querySelector("#submit-high-score");

var time = 75;
var currentQuestionIndex = 0;

var startQuiz = function() {
    var welcomeTitle = document.getElementById("welcome-title");
    var welcomeRules = document.getElementById("welcome-rules");
    var startButton = document.getElementById("start-button");
    welcomeTitle.remove();
    welcomeRules.remove();
    startButton.remove();


   
    startTimer = setInterval(timer, 1000);
  

    pullQuestions();
}

var pullQuestions = function() {

  
    currentQuestion = questions[currentQuestionIndex];
       
    var questionTitleTextEl = document.createElement("h2");
    questionTitleTextEl.setAttribute("id", "question-title");
    questionTitleTextEl.innerHTML = "<h2 class='question-title'>" + currentQuestion.number + "</h2>";
    questionTitleEl.appendChild(questionTitleTextEl);

    var questionContentEl = document.createElement("p");
    questionContentEl.id = "question-content";
    questionContentEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    questionBoxEl.appendChild(questionContentEl);

    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var buttonChoiceEl = document.createElement("button");
        buttonChoiceEl.textContent = currentQuestion.answers[i];
        buttonChoiceEl.className = "possible-answers";
        buttonChoiceEl.setAttribute("value", buttonChoiceEl.textContent);
        questionBoxEl.appendChild(buttonChoiceEl);

        buttonChoiceEl.onclick= answerHandler;
        console.log(buttonChoiceEl.id);
    }



}

var answerHandler = function() {
    
    if (this.value === questions[currentQuestionIndex].correct) {
    alert("Correct!");
    }
    else {
        alert("Wrong.")
        time -= 15;

    }

    var questionTitle = document.getElementById("question-title");
    var questionContent = document.getElementById("question-content");

    questionTitle.remove();
    questionContent.remove();
  
    questionBoxEl.innerHTML="";

    if (time <=0) {
        endLose();
    }
    
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        endWin();
    }
    else {
        pullQuestions();
    }
}





var timer = function() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        endLose();
    }


}


var endWin = function() {
    
    clearInterval(startTimer);

    var score = time;

    var winTitleEl = document.createElement("h2");
    winTitleEl.innerHTML = "<h2 class='lose-title'>You've Won!!!</h2>";
    questionTitleEl.appendChild(winTitleEl);

    var winTextEl = document.createElement("p");
    winTextEl.innerHTML = "<p>Your score is " + score + "</p>";
    questionBoxEl.appendChild(winTextEl);

    finalScore();

}

var endLose = function () {
    clearInterval(startTimer);

    var questionTitle = document.getElementById("question-title");
    var questionContent = document.getElementById("question-content");
    questionTitle.remove();
    questionContent.remove();
  
    questionBoxEl.innerHTML="";

    var loseTitleEl = document.createElement("h2");
    loseTitleEl.innerHTML = "<h2 class='lose-title'>You Lost</h2>";
    questionTitleEl.appendChild(loseTitleEl);

    var loseTextEl = document.createElement("p");
    loseTextEl.innerHTML = "<p>The time has expired, better luck next time!</p>";
    questionBoxEl.appendChild(loseTextEl);

}

var finalScore = function() {

    var submitTitleEl = document.createElement("h3");
    submitTitleEl.innerHTML = "<h3 class='submite-title'>Enter your initials to save your score!</h3>";
    formTitleEl.appendChild(submitTitleEl);

    var submitFormEl = document.createElement("input");
    submitFormEl.innerHTML = "<type='text' name='initials' class='form' placeholder='Enter your initial here' />";
    submitEl.appendChild(submitFormEl);

    var submitButtonEl = document.createElement("button");
    submitButtonEl.textContent = "submit";
    submitButtonEl.className = "submit-button";
    submitEl.appendChild(submitButtonEl);

    submitButtonEl.onclick= saveScore;

}

var saveScore = function() {
    var initials = submitFormEl.value

    if (initials !== "") {

    }
}




startBtn.addEventListener("click", startQuiz);
