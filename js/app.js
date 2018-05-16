/*
 * Create a list that holds all of your cards
 */
console.log("Start");
const cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
const deck = document.querySelector('.deck');
const fragment = document.createDocumentFragment(); 
let openCards = [];
let moveCount = 0;
//const movesSpan = document.querySelector('.moves');
const scorePanelSection = document.querySelector('.score-panel');
let displayTime = "00:00:00";


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 /* A function to create the score panel */

function createScorePanel() {
    console.log("function createScorePanel called");
    /* move counter */
    let movesSpan = document.querySelector('.moves');
    movesSpan.textContent = moveCount;
    /* timer */
    const timer = document.createElement('time');
    let timeDisplay = "00:00:00";
    timer.textContent = timeDisplay;
    timer.className = 'timer';
    timer.style.cssText = "border: 1px solid black; font-size: 16px; border-radius: 8px; margin-left: 50px";
    //timer.innerHTML = `<span class="timer>99:99:99</span>`;
    const resetDiv = document.querySelector('.restart');
    const scorepanelSection = document.querySelector('.score-panel');
    scorepanelSection.insertBefore(timer, resetDiv);
    /* reset button */
    const icon = document.querySelector('.fa-repeat');
    icon.style.display = "none";
    const resetButton = document.createElement('button');
    const repeatSign = '<i class="fa fa-repeat"></i>';
    resetButton.innerHTML = repeatSign;
    resetButton.style.cssText = "color: blue; border: 1px solid black; font-size: 20px; border-radius: 8px;"; 
 //   let resetDiv = document.querySelector('.restart');
    resetDiv.appendChild(resetButton);
    
  }

/* Clear the deck */

function clearDeck(deck) {
  console.log("function clearDeckcalled");
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }
}

createScorePanel();
clearDeck(deck);
createDeck();

// Shuffle function from http://stackoverflow.com/a/2450976
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

 /* Shuffle cards and repopulate the deck */
function createDeck() {
  console.log("function createDeck called");
  shuffle(cards);

  for (let i = 0; i <= 15; i++) {
    const card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `<i class='${cards[i]}'></i>`;
    fragment.appendChild(card);
  }
  deck.appendChild(fragment);
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

 /* Create function to display a card. */

function displayCard(e, clickedCard) {
  console.log("function call displayCard");
  console.log("clickedCard is " + clickedCard.className);
  if (openCards.length > 1) {
      openCards =[];
  }
  console.log("openCards length is now " + openCards.length);
  if (clickedCard.className === "card") {
    clickedCard.className="card open show";
    openCards.push(clickedCard);
    let list = openCards[0].className;
    console.log("display list is " + list);
    checkOpenCards(openCards);
  }
  else {
    alert("You can't click this card, try another");
  }
  moveCount++;

  if (moveCount === 1) {
    startClock();
  };

  console.log(displayTime);

  let movesSpan = document.querySelector('.moves');
  movesSpan.textContent = moveCount;
  return(clickedCard);
}

/* Set up the event listeners for all of the cards. */

function setupEventListeners() {
  console.log("function call setupEventListeners");  
  const cardList = document.querySelectorAll(".card");
  for (let i = 0; i <= 15; i++){
    let selectedCard = cardList[i];
    //console.log("selectedCard is " + selectedCard);
    /*selectedCard.addEventListener('click', (e) => {
        displayCard(e, selectedCard);
      });*/
      selectedCard.addEventListener('click', function(e) {
        displayCard(e, selectedCard);
      });
    //console.log("set listener for " + selectedCard);
  };
}

/* Create function to check a list of open cards */

function checkOpenCards(openCards) {
    console.log("function call checkOpenCards");  
    //console.log("openCards is " + openCards);
    let x = openCards.length - 1;
    let symbol = openCards[x].firstElementChild.className;
    console.log("symbol is " + symbol);
    console.log("openCards length is " + openCards.length);
    if (openCards.length === 2) {
        
		if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
			matchedCards(openCards);
		} else {
    //      setTimeout(() => unmatchedCards(openCards), 5000);
            setTimeout(function() {
                unmatchedCards(openCards)
            },1000);
        }
	}
}

/* Create function to deal with a matched pair of cards */

function matchedCards(openCards) {
    console.log("function call matchedCards");  
    let firstcard = openCards[0].className;
    let secondcard = openCards[1].className;
    console.log("first card is " + firstcard + " second card is " + secondcard);
	for (let i = 0; i < 2; i++) {
    	openCards[i].classList.add('match');
    	openCards[i].classList.remove('show', 'open');
    }
}

/* Create function to deal with an unmatched pair of cards */

function unmatchedCards(openCards) {
    console.log("function call unmatchedCards");  
    let firstcard = openCards[0].className;
    let secondcard = openCards[1].className;
    console.log("first card is " + firstcard + " second card is " + secondcard);
	for (let i = 0; i < 2; i++) {
      openCards[i].classList.remove('show', 'open');
    }
}

/* Function to start the clock */

function startClock() {
  console.log("function startClock called");
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let clock;
  
  let displayHours = "00";
  let displayMinutes = "00";
  let displaySeconds = "00";

  function increment() {
    console.log("Function increment called");
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
      }

    if (hours < 10) {
      displayHours = "0" + hours;
    }
    else {
      displayHours = hours;
    }

    if (minutes < 10) {
      displayMinutes = "0" + minutes;
    }
    else {
      displayMinutes = minutes;
    }

    if (seconds < 10) {
      displaySeconds = "0" + seconds;
    }
    else {
      displaySeconds = seconds;
    }

    displayTime = displayHours + ":" + displayMinutes + ":" + displaySeconds; 
    console.log("increment function " + displayTime);
  //  return displayTime;
    setClock();
    let clockTime = document.querySelector('.timer');
    clockTime.textContent = displayTime;
    console.log("Function increment ends");
  }

  function setClock(){
    console.log("Function set clock called");
    clock = setTimeout(increment, 1000);
  }
  setClock();
  console.log("Function startClock ends");
}

/* Set up the event listeners when the DOM is ready. */

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    setupEventListeners();
});

//clearDeck(deck);
//createDeck();
console.log("End");