//Created question objects to be referenced later
var questions = [
    {
      title: 'Inside which HTML element do we put the JavaScript?',
      choices: ['<javascript>', '<scripting>', '<js>', '<script>'],
      answer: '<script>',
    },
    {
      title: 'Where is the correct place to insert a JavaScript?',
      choices: ['The <head> section', 'Both the <head> and <body> section are correct', 'The <body> section', 'The <footer> section'],
      answer: 'The <body> section',
    },
    {
      title: 'How do you call a function named "myFunction"?',
      choices: [
        'myFunction()',
        'call myFunction()',
        'function myFunction()',
        'call function myFunction()',
      ],
      answer: 'myFunction()',
    },
    {
      title:
        'How can you add a comment in Javascript?',
      choices: ['//This is a comment', '"This is a comment"', '<!--This is a comment--!>', '(This is a comment)'],
      answer: '//This is a comment',
    },
    {
      title:
        'Which of the following is correct about features of JavaScript?',
      choices: ['JavaScript is a lightweight, interpreted programming language.', 'JavaScript is designed for creating network-centric applications.', 'JavaScript is complementary to and integrated with Java.', 'All of the above.'],
      answer: 'All of the above.',
    },
  ];

  //referencing DOM elements
  var questionsEl = document.getElementById('questions');
  var timerEl = document.getElementById('time');
  var choicesEl = document.getElementById('choices');
  var submitBtn = document.getElementById('submit');
  var startBtn = document.getElementById('start');
  var initialsEl = document.getElementById('initials');
  // variables that keep track of timer and questions
  var currentQuestionIndex = 0;
  var time = questions.length * 15;
  var timerId;
  // starting function
  function startQuiz() {
    // hide start screen (helped by my instructors)
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');
  
    // un-hide questions section
    questionsEl.removeAttribute('class');
  
    // start timer
    timerId = setInterval(clockTick, 1000);
  
    // show starting time
    timerEl.textContent = time;
  
    getQuestion();
  }

  function getQuestion() {
    // currentQuestionIndex is at 0
    var currentQuestion = questions[currentQuestionIndex];
  
    // creating title element and inserting current qestion
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
  
    // clearing previous choices
    choicesEl.innerHTML = '';
  
    // loop over choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      // create new button for each choice
      var choice = currentQuestion.choices[i];
      var choiceButton = document.createElement('button');
      choiceButton.setAttribute('class', 'choice');
      choiceButton.setAttribute('value', choice);
  
      choiceButton.textContent = i + 1 + '. ' + choice;
  
      // display on the page
      choicesEl.appendChild(choiceButton);
    }
  }
  
  function questionClick(event) {
    var buttonEl = event.target;
  
    // if the clicked element is not a choice button, do nothing.
    if (!buttonEl.matches('.choice')) {
      return;
    }
  
    // check if user guessed wrong
    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
  
      // display new time on page
      timerEl.textContent = time;
    }
    
    // move to next question
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }
  
  function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
  
    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute('class', 'hide');
  }
  
  function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }
  
  function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== '') {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];
  
      // new object for current user
      var newScore = {
        score: time,
        initials: initials,
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem('highscores', JSON.stringify(highscores));
  
      // redirect to next page
      window.location.href = 'highscores.html';
    }
  }
  
  function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === 'Enter') {
      saveHighscore();
    }
  }
  
  // user clicks button to submit initials
  submitBtn.onclick = saveHighscore;
  
  // user clicks button to start quiz
  startBtn.onclick = startQuiz;
  
  // user clicks on element containing choices
  choicesEl.onclick = questionClick;
  
  initialsEl.onkeyup = checkForEnter;