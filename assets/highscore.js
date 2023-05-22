function listScore() {
    var highscores = JSON.parse(window.localStorage.getItem('highscores'));
    //create for loop to create elements for each score
    for (var i = 0; i < highscores.length; i += 1) {
        var liEl = document.createElement ('li');
        liEl.textContent = highscores[i].initials + highscores [i].score;

        var olEl = document.getElementById('highscores');
        olEl.appendChild(liEl);
    }
}

function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }
  
  document.getElementById('clear').onclick = clearHighscores;
  

  listScore();