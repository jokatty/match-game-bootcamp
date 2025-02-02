// helper functions
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      newDeck.push(card); // add double the cards to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};

function showMatchMessage() {
  const matchDiv = document.createElement('p');
  document.body.appendChild(matchDiv);
  setTimeout(() => {
    matchDiv.innerText = '';
  }, 3000);
  matchDiv.innerText = 'match found!!!';
}

function greetingMessage() {
  const name = prompt("Hi, What's your name?", 'there');
  const greeting = document.createElement('h1');
  document.body.appendChild(greeting);
  greeting.innerHTML = `Hi, ${name}!`;
}

function gameReset() {
  const resetButton = document.createElement('button');
  resetButton.innerText = 'Game Reset';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    window.location.reload();
  });
}

function displayNumOfWins(wins) {
  const winningCount = document.createElement('h3');
  document.body.appendChild(winningCount);
  if (wins === 13) {
    winningCount.innerText = `This is SPECIAL Message for total ${wins} wins.`;
  }
  else {
    winningCount.innerText = `total ${wins} number of wins so far.`;
  }
}
// boardSize has to be an even number
const boardSize = 4;
const board = [];
let firstCard = null;
let firstCardElement;
let deck;
let numOfWins = 0;
let downCounter = 60000;

const squareClick = (cardElement, column, row) => {
  console.log(cardElement);

  console.log('FIRST CARD DOM ELEMENT', firstCard);

  console.log('BOARD CLICKED CARD', board[column][row]);

  const clickedCard = board[column][row];

  // the user already clicked on this square
  if (cardElement.innerText !== '') {
    return;
  }

  // first turn
  if (firstCard === null) {
    console.log('first turn');
    firstCard = clickedCard;
    // turn this card over
    cardElement.innerText = firstCard.name;

    // hold onto this for later when it may not match
    firstCardElement = cardElement;

    // second turn
  } else {
    console.log('second turn');
    if (
      clickedCard.name === firstCard.name
        && clickedCard.suit === firstCard.suit
    ) {
      console.log('match');
      numOfWins += 1;
      console.log(`${numOfWins} number of wins so far`);
      if (numOfWins > 0) {
        displayNumOfWins(numOfWins);
      }

      // turn this card over
      cardElement.innerText = clickedCard.name;
      showMatchMessage();
    } else {
      console.log('NOT a match');

      // turn this card back over
      firstCardElement.innerText = '';
      setTimeout(() => { cardElement.innerText = ''; }, 3000);
    }

    // reset the first card
    firstCard = null;
  }
};
// create all the board elements that will go on the screen
// return the built board
const buildBoardElements = (board) => {
  // create the element that everything will go inside of
  const boardElement = document.createElement('div');
  // give it a class for CSS purposes
  boardElement.classList.add('board');

  // use the board data structure we passed in to create the correct size board
  for (let i = 0; i < board.length; i += 1) {
    // make a var for just this row of cards
    const row = board[i];

    // make an element for this row of cards
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // make all the squares for this row
    for (let j = 0; j < row.length; j += 1) {
      // create the square element
      const square = document.createElement('div');

      // set a class for CSS purposes
      square.classList.add('square');

      // set the click event
      // eslint-disable-next-line
      square.addEventListener('click', (event) => {
        // we will want to pass in the card element so
        // that we can change how it looks on screen, i.e.,
        // "turn the card over"
        squareClick(event.currentTarget, i, j);
      });

      rowElement.appendChild(square);
    }
    boardElement.appendChild(rowElement);
  }

  return boardElement;
};

const initGame = () => {
  greetingMessage();
  // create this special deck by getting the doubled cards and
  // making a smaller array that is ( boardSize squared ) number of cards
  const doubleDeck = makeDeck();
  const deckSubset = doubleDeck.slice(0, boardSize * boardSize);
  deck = shuffleCards(deckSubset);

  // deal the cards out to the board data structure
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push(deck.pop());
    }
  }

  const boardEl = buildBoardElements(board);

  document.body.appendChild(boardEl);

  gameReset();
};

initGame();
// setInterval(() => {
//   window.location.reload();
// }, 180000);

const timer = setInterval(() => {
  downCounter -= 1000;
  console.log(`${downCounter} milli seconds is remaining`);
  if (downCounter <= 0) {
    // clearInterval(timer);
    window.location.reload();
  }
}, 1000);
