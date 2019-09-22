/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
let toggledCards = [];
let time = 0;
let running = 0;
let clockIsOff = true;
let moves = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

 //The memory game walkthrough by Matthew Cranford was consulted for this section of the project https://matthewcranford.com/category/blog-posts/walkthrough/memory-game/
deck.addEventListener('click', event => {
    const clickTarget = event.target; 
    if (isClickValid(clickTarget)) {
        if (clockIsOff= true) {
            startClock();
            clockIsOff = false;
        }
        showCard(clickTarget);
        addToggledCards(clickTarget);
        if (toggledCards.length === 2) {
            checkForMatch();
            addMoves();
            trackScore();
       }
    }
});

function showCard(clickTarget) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
}

function addToggledCards(clickTarget) {
    toggledCards.push(clickTarget);
}

function checkForMatch() {
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className ) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
    } else {
        setTimeout(() => {
            showCard(toggledCards[0]);
            showCard(toggledCards[1]);
            toggledCards = [];
        }, 1000);    
    }
}

function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') && toggledCards.length < 2 && !toggledCards.includes(clickTarget) && !toggledCards.includes('match')
    );
}

function shuffleCards() {
    const unshuffled = Array.from(document.querySelectorAll('.deck li'));
    const shuffled = shuffle(unshuffled);
    for (card of shuffled) {
        deck.appendChild(card);
    }
}
shuffleCards();

function addMoves() {
    moves++;
    const moveText = document.querySelector('.moves');
    moveText.innerHTML = moves;
}

function trackScore() {
    if (moves === 15 || moves === 25) {
        removeStar();
    }
} 

function removeStar() {
    const stars = document.querySelectorAll('.stars li')
    for (star of stars) {
        if (star.style.display !== 'none'){
            star.style.display = 'none';
            break;
        }    
    }
}

//The following 3 functions are from the Stopwatch tutorial from https://learnwebsitedesign.com/tutorials/javascript-stopwatch-code-tutorial.php
function startClock() {
	if(running == 0) {
		running = 1;
		increment();
	}
}

function stopClock() {
    if(running == 1) {
        running = 0;
    }
}

function reset(){
	running = 0;
	time = 0;
	document.getElementById("output").innerHTML = "00:00";
}

function increment() {
	if(running == 1) {
		setTimeout(function() {
			time++;
			let mins = Math.floor(time / 60);
			let secs = Math.floor(time % 60);
			if(secs <= 9){
				secs = "0" + secs;
			}
			document.getElementById("output").innerHTML = mins + ":" + secs;
			increment();
		}, 1000);
	}
}