// Step 1a - Select and store the gameboard element
let gameboard = document.querySelector('#gameboard');
// Step 1b - Select and store the score element
let score = document.querySelector('#score');
// Step 1c - Select and store the cards element
let cards = document.querySelector('#cards');
// Step 1d - Select and store the message element
let message = document.querySelector('#message');

let selectedCard = 0;

let testboi = 0;

// Step 2 - Create an array of cards
const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
let deck = [];

// Step 2a - Create a function to shuffle the deck
function shuffleDeck () {
  // Step 2b - Create a placeholder array
  let tmp = [];
  deck = [];
  // Step 2c - Iterate through card values 4 times
  for (let i = 0; i < 4; i++) {
    tmp = cardValues.slice();
    // Step 2d - Using a conditional loop
    while (tmp.length != 0) {
      // Step 2e - Select a random card from the array
      let randomCard = Math.floor(Math.random() * (tmp.length));      

      // Step 2f - Add the card to the deck array
      deck.push(tmp[randomCard])
      tmp.splice(randomCard, 1);
    }
  }
}

// Step 2g - Call the shuffleDeck function
shuffleDeck();

// Step 3a - Create an array to store 2 players
//let players = ['Player One', 'Player Two'];
let players = [{name: 'Player One', score : 0}, {name: 'Player Two', score : 0}];

// Step 3b - Create a variable to store the current player
let currentPlayer = players[0];

// Step 3c - Create a variable to store the first selected card
let currentCard = 0;


// Step 4 - Iterate through the deck and bind a click event to each one
for (let card of deck) {
  //console.log(card)
  // Step 4a - Create a new div element to be a card
  let cardEle = document.createElement('div');
  // add element to display value when flipped
  cardEle.appendChild(document.createElement('p'))
  // Step 3b - Add a 'card' class to the class list on the new div element
  cardEle.classList.add('card');

  // Step 3c - Add a data value to the card with the card's value in it
  cardEle.dataset.value = card;
  cardEle.firstChild.textContent = cardEle.dataset.value;
  // Step 3c - Bind the cardSelected function
  // to the click event on the cardEle
  cardEle.addEventListener('click', cardSelected);
  cards.appendChild(cardEle);
}


// Step 5 - Create a function to store the logic
// for when a card is selected
function cardSelected (event)  { //alert(event.target.dataset.value); console.log(event.target.dataset.value)}
  // Step 5a - Check if there is already a card selected

  if (currentCard != 0) {
    // Step 6 - Compare the cards
    if (currentCard.dataset.value === event.target.dataset.value) {
      // Step 6b - Add a class to the 2 card elements
      // flipping them over
      currentCard.classList.add('flipped');
      event.target.classList.add('flipped');

      // Step 6c - Add a point to the score for this player
      currentPlayer.score += 1;

      // Step 6d - Tell the player to go again
      // (use string interpolation to show which player you're addressing)
      console.log('before congrats and reset ' + currentCard)
      console.log('testboi before congrats and reset ' + testboi)
      message.textContent = `Congratulations! ${currentPlayer.name}, please go again!`;

      currentCard = 0;
      console.log('after congrats and reset ' + currentCard)
      isBoardFull;
      return;
    } else {
      // Step 6e - Provide a fail message to the player
      message.textContent = "Oh, so sorry!!! But yer' not psychic!";

      setTimeout(function() {
        // Step 6f - Using a ternary, change players
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        // Step 6g - Concatenate a message to the message element
        // advising player 2 that it's their turn now
        // (use string interpolation to show which player you're addressing)
        message.textContent = ` ${currentPlayer.name}, your turn!`;
        
      }, 2000);
      currentCard = 0;
      return;
    }
  } else {

    // Step 5b - Assign the card to currentCard
    currentCard = event.target;
    // Step 5c - Tell the player to select another card
    // (use string interpolation to show which player you're addressing)
    message.textContent = `${currentPlayer.name}, please select another card`;
  }
}

function isBoardFull() {
  // Step 7 - Check if the board is full
  if (document.querySelectorAll('.flipped').length === 2) {
  //if (document.querySelectorAll('.flipped').length === deck.length) {
    // Step 7a - Check if one of the players has won
    if (players[0].score !== players[1].score) {
      let winner = (players[0].score > players[1].score) ? players[0] : players[1];
      // Step 7b - Tell the player they've won
      // (use string interpolation to show which player you're addressing)
      message.textContent = `${winner.name}, you won!!! Congratulations!`;
    } else {
      // Step 7c - Tell the players that the game has ended in a tie
      message.textContent = "The game was a tie! Nice try!";
    }
  }
}
// Take it further - Reset the board allowing the user to play again (Worth 20% of the final grade)
/*
  Step 1 - You will need a reset button in index.html
  Step 2 - You will need to bind an event listener
           that detects the click and executes a function
  Step 3 - You will need to reset all the pieces on the
           board
  Step 4 - You will need to reset the messages
  Step 5 - You will need to reset the players
*/