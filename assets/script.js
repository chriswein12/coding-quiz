// Array of objects containing questions, answers, and correct answers.
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

// All of the global variables for the querySelector
var startBtn = document.querySelector("#start-button");
var questionTitleEl = document.querySelector("#question-title-container");
var questionBoxEl = document.querySelector("#question-box");
var answersListEl = document.querySelector("answersList")
var timerEl = document.querySelector("#time");
var formTitleEl = document.querySelector("#submit-title")
var submitEl = document.querySelector("#submit-high-score");
var submitInitialsEl = document.querySelector("#initials");
var highScoreListEl = document.querySelector("#high-scores");

// Initial values for time and current question
var time = 75;
var currentQuestionIndex = 0;

// when button is pressed, startQuiz function removes the initial html from the main section, and starts the process of pulling questions and starting the timer
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

// pullQuestions presents the questions and answers one at a time
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

// answerHandler checked if the answer is correct or incorrect, and removes 15 seconds for incorrect answers.
// If time goes to zero, it will call the endLose function, or if all questions are answered, it will got to the endWin function.
var answerHandler = function() {
    
    if (this.value === questions[currentQuestionIndex].correct) {
    alert("Correct!");
    }
    else {
        alert("Wrong.")
        time -= 15;
    }
   
    // clears out previous question.
    questionTitleEl.innerHTML="";
    questionBoxEl.innerHTML="";

    // checks to see if timer is above zero.
    if (time <=0) {
        endLose();
    }
    
    currentQuestionIndex++;

    // checks for win conditions, or goes to the next question.
    if (currentQuestionIndex === questions.length && time > 0) {
        endWin();
    }
    else {
        pullQuestions();
    }
}

// timer function.
var timer = function() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        endLose();
    }
}

// If the user wins, they will be presented with a winning message and their score. This then calls a function to submit their score.
var endWin = function() {
    
    clearInterval(startTimer);

    var score = time;

    var countdownTimer = document.getElementById("countdown-timer");
    countdownTimer.remove();
    
    var winTitleEl = document.createElement("h2");
    winTitleEl.innerHTML = "<h2 class='end-title'>You've Won!!!</h2>";
    questionTitleEl.appendChild(winTitleEl);

    var winTextEl = document.createElement("p");
    winTextEl.innerHTML = "<p class='win-text'><span>Your score is " + score + "!</span></p>";
    questionBoxEl.appendChild(winTextEl);

    finalScore();
}

// If the user loses, they will be presented with a message stating they lost. Since their score is zero, we do not ask to submit score.
var endLose = function () {
    clearInterval(startTimer);
    timerEl.textContent = 0;

    questionTitleEl.innerHTML="";
    questionBoxEl.innerHTML="";

    var loseTitleEl = document.createElement("h2");
    loseTitleEl.innerHTML = "<h2 class='end-title'>You Lost</h2>";
    questionTitleEl.appendChild(loseTitleEl);

    var loseTextEl = document.createElement("p");
    loseTextEl.innerHTML = "<p class='lose-text'>The time has expired, better luck next time! Refresh page if you'd like to try again!</p>";
    questionBoxEl.appendChild(loseTextEl);

}

// This function creates a submit form to enter initials and submit score.
var finalScore = function() {

    var submitTitleEl = document.createElement("h3");
    submitTitleEl.innerHTML = "<h3 class='submit-title'>Enter your initials to save your score!</h3>";
    formTitleEl.appendChild(submitTitleEl);

    var submitInitialsEl = document.createElement("input");
    submitInitialsEl.setAttribute("type", "text");
    submitInitialsEl.setAttribute("id", "initials");
    submitInitialsEl.setAttribute("name", "initials");
    submitInitialsEl.setAttribute("placeholder", "Enter Initials")
    submitEl.appendChild(submitInitialsEl);

    var submitButtonEl = document.createElement("button");
    submitButtonEl.textContent = "submit";
    submitButtonEl.className = "submit-button";
    submitEl.appendChild(submitButtonEl);

    submitButtonEl.onclick = saveScore;

}

// This function will check the value to make sure it is initials. It then pushes the object to a local storage array.
var saveScore = function() {
    var playerInitialsInput = document.querySelector("input[name='initials']").value
    var initials = playerInitialsInput

    console.log(initials)

    if (initials !== "" && initials.length <= 3 && isNaN(initials)) {

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
        return false;
    }
}

// This function will pull high score values from local storage, sort, and display the high scores.
var loadScore = function(){
    var allSavedScores = JSON.parse(localStorage.getItem("allSavedScores")) || [];

    allSavedScores.sort(function(a,b) {
        return b.score - a.score});

    console.log(allSavedScores);
    
    for (var i = 0; i < allSavedScores.length; i++) {

    var scoreListItemEl = document.createElement("li");
    scoreListItemEl.textContent = allSavedScores[i].initials + " - " + allSavedScores[i].score;

    highScoreListEl.appendChild(scoreListItemEl);
    } 
}

// Calls loadScore function when website starts.
loadScore();

// Listener for initial button to start quiz
startBtn.addEventListener("click", startQuiz);
