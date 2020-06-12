/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a pair of dice as many times as he whishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game.



*/

// Global Variables
var scores, roundScore, activePlayer, gamePlaying;
// Intialise the game
init();

// -- CHANGE DICE NUMBER ON CLICK - WITH ANONYMOUS FUNCTION ====================
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Dice - Randon number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

// -- UPDATE PLAYER'S GLOBAL SCORE - WITH ANONYMOUS FUNCTION ===================
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Add current score to the global score
    scores[activePlayer] += roundScore;
    // 2. Update the user interface
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    // Take player input for winning score and overwrite default of 100
    var input = document.querySelector(".final-score").value;
    var winningScore;
    // Undefined, 0 , null, "" are COERCED to false
    // Anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // 3. Check if a player won the game
    if (scores[activePlayer] >= winningScore) {
      // Update winning player name to 'Winner!'
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      // Hide dice
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      // Update panel to winner styling
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      // Remove active class from panel
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Swtich player
      nextPlayer();
    }
  }
});

// -- NEXT PLAYER FUNCTION =====================================================
function nextPlayer() {
  //Next player - using ternary operator
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  // Reset round score to 0 when active player switches
  document.getElementById("current-0").textContent = " 0";
  document.getElementById("current-1").textContent = " 0";
  // Toogle active class for player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

// -- START NEW GAME ===========================================================
document.querySelector(".btn-new").addEventListener("click", init);

// -- INTIALISE GAME FUNCTION ==================================================
function init() {
  // Scores
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  // Set gamePlaying to true on intialise
  gamePlaying = true;
  // Reset on load
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
