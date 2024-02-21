// SELECTING ELEMENTS 
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
// EL STANDS FOR ELEMENT
let scores, currentScore, activePlayer, playing;
// STARTING CONDITIONS

const init = function () {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0; // .textContent is used to SET the SCORE of PLAYER 1 and 2 to 0
    score1El.textContent = 0; // .textContent is used to SET the SCORE of PLAYER 1 and 2 to 0
    current0El.textContent = 0; // .textContent is used to SET the SCORE of PLAYER 1 and 2 to 0
    current1El.textContent = 0; // .textContent is used to SET the SCORE of PLAYER 1 and 2 to 0

    diceEl.classList.add('hidden'); // HIDING THE DICE
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
};
init(); // CALLING THE FUNCTION

// SWITCHING THE PLAYER
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer == 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

// ROLLING DICE FUNCTIONALITY

btnRoll.addEventListener('click', function() {
    if(playing) {

    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2.Displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;

    // src is used to display the dice and CHANGE the DICE NUMBER everytime someone REROLLS it

    // 3.Check for rolled 1: if true,switch to the next player
    if (dice !== 1) {
        // ADD DICE TO CURRENT SCORE
        currentScore += dice; // shortcut for currentScore = cuurentScore + dice
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        // current0El,textContent = currentscore; // CHANGE LATER
    } else {
        // SWITICHING THE PLAYER
        switchPlayer(); // JUST CALLING THE FUNCTION
    }
    }
});

btnHold.addEventListener('click', function() {
    if(playing) {
   
    // 1.Add current score to active player's score
    scores[activePlayer] += currentScore; // scores[0] = scores[0] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2.Check if player's score is >=50
    if(scores[activePlayer] >= 50 ) {
        // 3.Fininsh the Game
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.getElementById(`current--${activePlayer}`).textContent = 'Winner!';
    } else {

    // 4.Switch to next player

    switchPlayer(); // JUST CALLING THE FUNCTION
    }
}
});

btnNew.addEventListener('click', init);