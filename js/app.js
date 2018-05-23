/*
 * Create a list that holds all of your cards
 */
const icons = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube"
];

// deck ul
const cardsContainer = document.querySelector(".deck");

let openCards = [];
let matchedCards = [];

// timer variables
let interval;
let timer = document.getElementById("timer");
timer.innerHTML = "0 mins : 0 sec";
let popUp = document.querySelector(".popUp");
let closeBt = document.querySelector(".close");

shuffle(icons);
// create the cards
// init the game
function init() {
  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);

    //shuffle
    // card click event
    click(card);
  }
}

// function : click event
let clickCount = 0;

function click(card) {
  card.addEventListener("click", function() {
    clickCount++;

    if (clickCount === 1) {
      startTimer();
    }

    const currentCard = this;
    const previousCard = openCards[0];

    // we have open cards
    if (openCards.length === 1) {
      card.classList.add("show", "open", "disabled");
      openCards.push(currentCard);
      // we should compare two cards now

      comapre(currentCard, previousCard);
    } else {
      // we don't have any open cards

      card.classList.add("show", "open", "disabled");
      openCards.push(this);
    }
  });
}

function comapre(currentCard, previousCard) {
  // CHECK INNER CONENT + NOT ADDING SAME ELEMENT MATCH
  if (
    currentCard.innerHTML ===
    previousCard.innerHTML /*&& currentCard !=previousCard*/
  ) {
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchedCards.push(currentCard, previousCard);

    openCards = [];

    //check is over

    isOver();
  } else {
    //wait 500 ms

    setTimeout(function() {
      currentCard.classList.add("unMatched");
      previousCard.classList.add("unMatched");

      currentCard.classList.remove("open", "show", "disabled");
      previousCard.classList.remove("open", "show", "disabled");
    }, 850);
    openCards = [];
  }

  // add new move
  addMove();
}


function isOver() {
  if (matchedCards.length === icons.length) {
    clearInterval(interval);
    let time = getTimer();
    let rate = startContainer.innerHTML;

    popUp.classList.remove("hide");
    popUp.innerHTML = "<span class='close'>X</span>" + "<h2>game Over</h2>" + " you get " + moves + " moves  \n" + " in time " + time + "\n with raing " + rate;
    
    closePop();

  }
}




function closePop() {
  setInterval(function() {
        popUp.classList.add("hide");
  },3000);

}


function getTimer() {
  let timerContainer = document.getElementById("timer").innerHTML;
  return timerContainer;
}

// moves counter
let moves = 0;
const movesCotainer = document.querySelector(".moves");

function addMove() {
  moves++;
  movesCotainer.innerHTML = moves;
  // set the rating

  rating();
}

//star timer
let seconds = 0,
  minute = 0,
  hour = 0;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + " mins " + " : " + seconds + " sec ";
    seconds++;
    if (seconds == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
} // end of timer

// Rating Sys ***

const startContainer = document.querySelector(".stars");

function rating() {
  if (moves  > 0 && moves <12) {
    startContainer.innerHTML = `	<li><i class="fa fa-star"></i>
    <li><i class="fa fa-star-o"></i>
    <li><i class="fa fa-star-o"></i>
    
    
    `;
  } else if (moves > 12 && moves < 24 ) {
    startContainer.innerHTML = `
    <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star-o"></i></li>
            `;
  } else if (moves > 24 && moves < 35 ) {
           startContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li></li>
        		<li><i class="fa fa-star"></i></li>`;
         }
}

//restart button
const restartBt = document.querySelector(".restart");
+restartBt.addEventListener("click", function() {
  clickCount = 0;
  clearInterval(interval);
  (seconds = 0), (minute = 0), (hour = 0);
  timer.innerHTML = "0 mins : 0 sec";

  // delete all cards
  cardsContainer.innerHTML = "";
  // call init to create new cards
  init();

  // reset any related var

  matchedCards = [];
  moves = 0;
  movesCotainer.innerHTML = moves;
  shuffle(icons);
});

// start the game
init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
