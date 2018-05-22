/*
 * Create a list that holds all of your cards
 */
//console.log("Start");
const cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
const deck = document.querySelector('.deck');
const fragment = document.createDocumentFragment(); 
let openCards = [];
let moveCount = 0;
let matchCount = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
//let clickedCards = 0;

//const movesSpan = document.querySelector('.moves');
const scorePanelSection = document.querySelector('.score-panel');
let displayTime = "00:00:00";
let starCount = 3;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 /* A function to create the score panel */

function createScorePanel() {
    //console.log("function createScorePanel called");
    /* move counter */
    let movesSpan = document.querySelector('.moves');
    movesSpan.textContent = moveCount;
    /* timer */
    const timer = document.createElement('time');
    let timeDisplay = "00:00:00";
    timer.textContent = timeDisplay;
    timer.className = 'timer';
    timer.style.cssText = "border: 1px solid black; font-size: 16px; border-radius: 8px; margin-left: 50px";
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
    resetButton.className = "resetButton";
    resetDiv.appendChild(resetButton);
    resetButton.addEventListener('click', function() {
      newGame(deck);
      //console.log("reset button clicked");
    });
  }

/* Clear the deck */

function clearDeck(deck) {
  //console.log("function clearDeckcalled");
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }
}

function newGame(deck) {
  let oldModal = document.querySelector('.modal');
  if (oldModal) {
    oldModal.remove();
  };
  moveCount = 0;
  matchCount = 0;
  while (starCount < 3) {
    addStar();
  }
  let resetMoves = document.querySelector('.moves');
  resetMoves.textContent = "0";
  let resetClock = document.querySelector('.timer');
  resetClock.textContent = "00:00:00";
  hours = 0;
  minutes = 0;
  seconds = 0;
  clearDeck(deck);
  createDeck();
  setupEventListeners();
  return deck;
}


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
  //console.log("function createDeck called");
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
  //console.log("function call displayCard");
  //console.log("clickedCard is " + clickedCard.className);
  //console.log("number of clickedCards is now " + clickedCards);

  
  if (clickedCard.className === "card") {
    clickedCard.className="card open show";
    openCards.push(clickedCard);
    let list = openCards[0].className;
    //console.log("display list is " + list);
    checkOpenCards(openCards);
  }

  if (moveCount === 1 && seconds === 0) {
    startClock();
  };

  let movesSpan = document.querySelector('.moves');
  movesSpan.textContent = moveCount;

  if (moveCount === 20 && starCount === 3 || moveCount === 40 && starCount === 2) {
    removeStar();
  }

  if (openCards.length > 1) {
    openCards =[];
}

if (matchCount === 8) {
  gameOver();
};

  return(clickedCard);

}

/* Set up the event listeners for all of the cards. */

function setupEventListeners() {
  //console.log("function call setupEventListeners");  
  const cardList = document.querySelectorAll(".card");
  for (let i = 0; i <= 15; i++){
    let selectedCard = cardList[i];
    //console.log("selectedCard is " + selectedCard);
    /*selectedCard.addEventListener('click', (e) => {
        displayCard(e, selectedCard);
      });*/
      selectedCard.addEventListener('click', function(e) {
        e.preventDefault();
        displayCard(e, selectedCard);
      });
  };
}

/* Create function to check a list of open cards */

function checkOpenCards(openCards) {
    //console.log("function call checkOpenCards");  
    //console.log("openCards is " + openCards);
    let x = openCards.length - 1;
    let symbol = openCards[x].firstElementChild.className;
    //console.log("symbol is " + symbol);
    //console.log("openCards length is " + openCards.length);
    if (openCards.length === 2) {
		  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
			  matchedCards(openCards);
      } 
      else {
    //setTimeout(() => unmatchedCards(openCards), 5000);
      setTimeout(function() {
        unmatchedCards(openCards)
            },1000);
      }
      moveCount++;
    }
}

/* Create function to deal with a matched pair of cards */

function matchedCards(openCards) {
    //console.log("function call matchedCards");  
    let firstcard = openCards[0].className;
    let secondcard = openCards[1].className;
    //console.log("first card is " + firstcard + " second card is " + secondcard);
	for (let i = 0; i < 2; i++) {
    	openCards[i].classList.add('match');
    	openCards[i].classList.remove('show', 'open');
    }
    matchCount++
}

/* Create function to deal with an unmatched pair of cards */

function unmatchedCards(openCards) {
    //console.log("function call unmatchedCards");  
  let firstcard = openCards[0].className;
  let secondcard = openCards[1].className;
	for (let i = 0; i < 2; i++) {
      openCards[i].classList.remove('show', 'open');
    }
}

/* Function to start the clock */

function startClock() {
  //console.log("function startClock called");
  let clock;
  let displayHours = "00";
  let displayMinutes = "00";
  let displaySeconds = "00";
  const resetButton = document.querySelector('.resetButton');

  resetButton.addEventListener('click', function() {
    //console.log("reset button clicked in startClock");
    clearTimeout(clock); 
  });

  function increment() {
    //console.log("Function increment called ");
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
    //console.log("increment function " + displayTime);
    if (matchCount === 8) {
      clearTimeout(clock); 
      return;
    }
    else {
      setClock();
    };
    let clockTime = document.querySelector('.timer');
    clockTime.textContent = displayTime;
    /*console.log("Function increment ends");
    console.log("end of increment" + matchCount);
    if (matchCount === 8){
      console.log("call gameOver");
    };*/
  }
//console.log("out of increment");
  function setClock(){
    //console.log("Function set clock called matchCount is " + matchCount);
    if (matchCount === 8) {
      clearTimeout(clock); 
      return;
    }
    else {
      clock = setTimeout(increment, 1000);
    }  
  }  
  
  setClock();

}

function removeStar() {
  //console.log("function removeStar called");
  let starList = document.querySelectorAll('.fa-star');
  let firstStar = starList[0];
  starCount--;
  //console.log("stars = " + starCount);
  return firstStar.parentNode.removeChild(firstStar);
}

function addStar () {
  //console.log("addStar function called");
  const starsDiv = document.querySelector('.stars');
  const star = document.createElement('li');
  star.innerHTML = '<i class="fa fa-star"></i>';
  starsDiv.appendChild(star);
  starCount++;
}

/*A fuction to handle the winning modal */
function gameOver () {
  //console.log("function gameOver called: matchCount is " + matchCount);
  const modal = document.createElement('div');
  modal.className = "modal";
  modal.innerHTML = `<h1 class="modh1"></h1><p class="modp1"></p><p class="modp2"></p><p class="modp3"></p><p class="modp4"></p>`;
  modal.style.cssText = "width: 400px; height: 300px; background-color: white; position: fixed; z-index: 1; border: 5px; border-style: solid; border-color: black; border-radius: 5px; text-align: center";
  const headerDiv = document.querySelector('.container');
  headerDiv.appendChild(modal);
  const headerTxt = document.querySelector('.modh1');
  headerTxt.textContent = "Congratulations";
  const p1Txt = document.querySelector('.modp1');
  let modTxt = "You did it in " + moveCount + " moves";
  p1Txt.textContent = modTxt;
  const p2Txt = document.querySelector('.modp2');
  modTxt = "Your time was "  +  hours + " hours " + minutes + " minutes " + seconds + " seconds";
  p2Txt.textContent = modTxt;
  const p3Txt = document.querySelector('.modp3');
  modTxt = "Your star score was "  +  starCount;
  p3Txt.textContent = modTxt;
  const p4Txt = document.querySelector('.modp4');
  modTxt = "Press the reset button to play again";
  p4Txt.textContent = modTxt;
 }

/* Set up the event listeners when the DOM is ready. */
document.addEventListener("DOMContentLoaded", function(event) {
  //console.log("DOM fully loaded and parsed");
  createScorePanel();
  newGame(deck);  
});

//console.log("End");