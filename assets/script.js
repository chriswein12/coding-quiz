var questions = [
    {
        number: "Question 1",
        question: "Which of the following is not a logical operator?",
        answers: ["A.  || (OR)", "B.  @@ (AS WELL AS)", "C.  && (AND)", "D.  ! (NOT)"],
        correct: "B.  @@ (AS WELL AS)"
    },
    {
        number: "Question 2",
        question: "Which of the following is not a variable type in JavaScript?",
        answers: ["A.  reg", "B.  var", "C.  let", "D.  const"],
        correct: "A.  reg"
    },
    {
        number: "Question 3",
        question: "Which of the following is the correct way to set up an array?",
        answers: ["A.  var wine = ['Cabernet', 'Riesling', 'Sangiovese'];", "B.  var wine = [Cabernet, Riesling, Sangiovese];", "C.  var wine = {Cabernet; Riesling; Sangiovese};", "D.  var wine = ('Cabernet', 'Riesling', 'Sangiovese');"],
        correct: "A.  var wine = ['Cabernet', 'Riesling', 'Sangiovese'];"
    },
    {
        number: "Question 4",
        question: "var introduction = 'Hi!';. Which of the following will create a popup window saying 'Hi!'?",
        answers: ["A.  console.log(introduction);", "B.  console.dir(introduction);", "C.  document.querySelector(introduction);", "D.  alert(introduction);"],
        correct: "D.  alert(introduction);"
    },
    {
        number: "Question 5",
        question: "Which of the following is not a data type in JavaScript?",
        answers: ["A.  String", "B.  Number", "C.  Letter", "D.  Boolean"],
        correct: "C.  Letter"
    }
]

var startBtn = document.querySelector("#start-button");
var questionTitleEl = document.querySelector("#question-title-container");
var questionBoxEl = document.querySelector("#question-box");
var answersListEl = document.querySelector("answersList")
var timerEl = document.querySelector("#time");
var formTitleEl = document.querySelector("#submit-title")
var submitEl = document.querySelector("#submit-high-score");
var submitInitialsEl = document.querySelector("#initials");
var highScoreListEl = document.querySelector("#high-scores");

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
    questionContentEl.className = "question-content";
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
    submitTitleEl.innerHTML = "<h3 class='submit-title'>Enter your initials to save your score!</h3>";
    formTitleEl.appendChild(submitTitleEl);

    var submitInitialsEl = document.createElement("input");
    submitInitialsEl.setAttribute("type", "text");
    submitInitialsEl.setAttribute("id", "initials");
    submitInitialsEl.setAttribute("name", "initials");
    submitEl.appendChild(submitInitialsEl);

    var submitButtonEl = document.createElement("button");
    submitButtonEl.textContent = "submit";
    submitButtonEl.className = "submit-button";
    submitEl.appendChild(submitButtonEl);

    submitButtonEl.onclick = saveScore;

}

var saveScore = function() {
    debugger;
    var playerInitialsInput = document.querySelector("input[name='initials']").value
    var initials = playerInitialsInput

    console.log(initials)

    if (initials !== "") {

        var allSavedScores = JSON.parse(localStorage.getItem("allSavedScores")) || [];

        var  newHighScore = {
            score: time,
            initials: initials
            }
        

        console.log(allSavedScores);
        console.dir(allSavedScores);

        allSavedScores.push(newHighScore);
        localStorage.setItem("allSavedScores", JSON.stringify(allSavedScores));

        loadScore();


    }
    else {
        alert("Please enter Initials")
        saveScore();
    }
}

var loadScore = function(){
    var allSavedScores = JSON.parse(localStorage.getItem("allSavedScores")) || [];


    console.log(allSavedScores);

    
    for (var i = 0; i < allSavedScores.length; i++) {

    var scoreListItemEl = document.createElement("li");
    scoreListItemEl.textContent = allSavedScores[i].initials + " - " + allSavedScores[i].score;

    highScoreListEl.appendChild(scoreListItemEl);
    }

}



loadScore();

startBtn.addEventListener("click", startQuiz);
