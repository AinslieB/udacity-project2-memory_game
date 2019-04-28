//Script written by Ainslie B. ("Amy") Brown--Last updated on April 28, 2019
//Reference material for this script includes JAVASCRIPT & JQUERY by Jon Duckett
//and various onlline references such as W3Schools, MDN, freeCodeCamp,
//and others too numerous to list

//Previous version disables displayed cards
//Previous version adds starRating
//Penultimate version adds timer and modal
//Final version fixes bugs

//================================================================================
/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
//================================================================================

//Declare card variables
let numCards = 0;
let matchedPairs = 0;
let card = document.getElementsByClassName("card");
let cards = [...card];
//Returns the deck element
const gameboard = document.querySelector(".deck");
//Returns NodeList of 16 li elements
let flippedCards = [];
//Declare star rating variables
let threeStars = document.querySelectorAll(".fa-star")
let starRating = {
  Star1: threeStars[0],
  Star2: threeStars[1],
  Star3: threeStars[2],
};

//Add event listeners
for (let i = 0; i < cards.length; i++) {
   card = cards[i];
   cards[i].addEventListener ("click", flipCard);
   listener=true;
};

const newGame = document.querySelector(".restart");
newGame.addEventListener("click", restartGame);

const newGameModal = document.querySelector(".play-again-btn");
newGameModal.addEventListener("click", playAgain);

const closeGame = document.querySelector(".close-modal-btn");
closeGame.addEventListener ("click", closeModal);

document.body.onload = initGame();

let numMoves = 0;
let movesCounter = document.querySelector(".moves");
let totalMoves = document.querySelector("#totalMoves");


//================================================================================
//Create a list of shuffled cards
function initGame() {
  cards = shuffle(cards);
  for (let i = 0; i < cards.length; i ++) {
    gameboard.innerHTML = "";
    [].forEach.call(cards, function(item) {   //what does this line do?
      gameboard.appendChild(item);
      cards[i].classList.remove("show", "open", "match");
      cards[i].classList.disabled = false;
    });
  };
}

//Initialize moves and star rating
numMoves = 0;
movesCounter.innerHTML = numMoves;

threeStars[0] = "i.fas.fa-star";
threeStars[1] = "i.fas.fa-star";
threeStars[2] = "i.fas.fa-star";

//================================================================================
//Shuffle the cards
//(function from http://stackoverflow.com/a/2450976)
//================================================================================

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//================================================================================
//Set the stopwatch
//================================================================================

let totalTime = document.querySelector("#totalTime");
let stopwatch = document.getElementsByClassName('timer')[0],
    seconds = 0, minutes = 0,
    timeOut;

function formatTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

stopwatch.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

//Start the stopwatch
function timer() {
    timeOut = setTimeout(formatTime, 1000);
}

//================================================================================
//Flip card when user clicks it and increment moves counter
//================================================================================

function flipCard() {
flippedCards.push(this);
flippedCards[0].removeEventListener("click", flipCard);
flippedCards[0].disabled = true;
this.classList.add("show", "open");
this.classList.disabled = true;
this.classList.add("disableClick");
numMoves ++;
if (numMoves === 1) {
  timer();
}
movesCounter.innerHTML = numMoves;
totalMoves.innerHTML = numMoves;
setStarRating();

const numCards = flippedCards.length;
if(numCards === 2) {
  if(flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
    match();
  } else {
    setTimeout(function(){
      noMatch();
      }, 1000);
    }
  }
};


//================================================================================
//Assign star rating based on number of moves
//================================================================================

function setStarRating() {
const stars = document.getElementsByClassName
if (numMoves === 27) {
  threeStars[2].classList.remove("fa-star");
  star3.classList.remove("fa-star");
} else if (numMoves === 33) {
  threeStars[1].classList.remove("fa-star");
  star2.classList.remove("fa-star");
} else {
}
}


//================================================================================
//Display cards when they match
//================================================================================

function match() {
  flippedCards[0].removeEventListener("click", flipCard);
  flippedCards[1].removeEventListener("click", flipCard);
  flippedCards[0].disabled = true;
  flippedCards[1].disabled = true;
  flippedCards[0].classList.add("match");
  flippedCards[1].classList.add("match");
  matchedPairs ++;
  flippedCards[0].classList.remove("show", "open");
  flippedCards[1].classList.remove("show", "open",);

  if(matchedPairs ===8) {
    clearTimeout(timeOut);
    youWon();
}
  numCards = 0;
  flippedCards = [];
}

//================================================================================
//Hide cards when they don't match
//================================================================================

function noMatch() {
  flippedCards[0].classList.remove("show", "open", "match");
  flippedCards[1].classList.remove("show", "open", "match");
  flippedCards[0].classList.disabled = false;
  flippedCards[1].classList.disabled = false;
  flippedCards[0].addEventListener("click", flipCard);
  flippedCards[1].addEventListener("click", flipCard);
  flippedCards[0].disabled = false;
  flippedCards[1].disabled = false;
  listener=true;
  flippedCards = [];
  numCards = 0;
}

//================================================================================
//Display the modal when user has won
//================================================================================

const modal = document.querySelector('dialog');
function youWon() {
  if(matchedPairs ===8) {
    document.getElementById("totalTime").innerHTML = stopwatch.innerHTML;
    modal.showModal();
  }
}

//================================================================================
//Present end-of-game options
//================================================================================

function closeModal() {
  modal.close();
  window.location.reload();
}

function playAgain() {
  modal.close();
  window.location.reload();
}

function restartGame() {
  window.location.reload();
}

//END
