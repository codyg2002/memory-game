/*
 * Create a list that holds all of your cards
 */

// Global variables
const deck = document.querySelector('.deck');
let toggledCards = [];
let time = 0;
let running = 0;
let clockIsOff = true;
let moves = 0;
let stars = 3;
let matchedPairs = 0;
const totalPairs = 8;

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
        if (clockIsOff === true) {
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
       if (matchedPairs === totalPairs) {
           gameOver();
       }
    }
});

document.getElementsByClassName('modal_replay')[0].addEventListener('click', ()=> {
    replay();
});

document.getElementsByClassName('modal_cancel')[0].addEventListener('click', ()=> {
    toggleModal();
});

document.getElementsByClassName('restart')[0].addEventListener('click', ()=> {
    repeat();
});

function showCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addToggledCards(clickTarget) {
    toggledCards.push(clickTarget);
}

function checkForMatch() {
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className ) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        matchedPairs++;
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
    let starsList = document.querySelectorAll('.stars li')
    for (star of starsList) {
        if (star.style.display !== 'none'){
            star.style.display = 'none';
            stars--;
            break;
        }
    }
}

//The following 2 functions are based on the Stopwatch tutorial from https://learnwebsitedesign.com/tutorials/javascript-stopwatch-code-tutorial.php
function startClock() {
    if (running === 0) {
	    running = 1;
        increment();
    } else {
        running = 0;
    }
}

function increment(){
	if(running === 1){
		setTimeout(function(){
			time++;
			var mins = Math.floor(time / 10 / 60);
			if(mins <= 9){
				mins = "0" + mins;
			}
			var secs = Math.floor(time / 10);
			if(secs <= 9){
				secs = "0" + secs;
			}
			var tenths = Math.floor(time % 10);
			if(tenths <= 9){
				tenths = "0" + tenths;
			}
			document.querySelector(".clock").innerHTML = mins + ":" + secs;
			increment();
		}, 100);
	}
};

// modal for end of game
function toggleModal() {
    const modal = document.querySelector(".my_modal");
    modal.classList.toggle("hide");
}

function getStats() {
    const timeStat = document.querySelector(".modal_time");
    const clockTime = document.querySelector(".clock").innerHTML;
    const moveStat = document.querySelector(".modal_moves");
    const starStat = document.querySelector(".modal_stars");
    getStars();
    timeStat.innerHTML = `Time = ${clockTime}`;
    moveStat.innerHTML = `Moves = ${moves}`;
    starStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
    let starsList = document.querySelectorAll('.stars li');
    for (star of starsList) {
        if (star.style.display === 'inline-block') {
            stars ++;
        }
    }
}

function reset() {
    stars = 3;
    clockIsOff = true;
    matchedPairs = 0;
    moves = 0;
	running = 0;
    time = 0;
    document.querySelector('.clock').innerHTML = "00:00";
    document.querySelector('.moves').innerHTML = '0';
}

function gameOver() {
    startClock();
    getStats();
    toggleModal();
}

function repeat() {
    reset();
    resetCards();
    resetStars();
    shuffleCards();
}

function replay() {
    reset();
    resetCards();
    resetStars();
    shuffleCards();
    toggleModal();
}

function resetCards() {
    const cards = Array.from(document.querySelectorAll('.card'));
    for (card of cards) {
        card.className = 'card';
    }
}

function resetStars() {
    const stars = Array.from(document.querySelectorAll('.stars li'));
    for (star of stars) {
        if (star.style.display === 'none') {
            star.style.display = 'inline-block';
        }
    }
}