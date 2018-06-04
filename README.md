# Hi - Lo

A two-player card game based on [these specs](https://gist.github.com/tublitzed/6d4efd525926b8bfecfa8771d50807f9).

A live version of the game can be played [on Heroku](https://hi-low-game.herokuapp.com/).

## The Rules
* Play consists of a dealer and a guesser:
1. The dealer draws a card from the top of the deck and places it face up.
2. The guesser must guess whether the next card drawn from the deck will be higher or lower than the face up card.
3. Once the guesser guesses, the dealer draws the next card and places it face up on top of the previous card.
4. If the guess is correct, go back to step 2.
5. If the guess is wrong, the guesser receives a point for each card in the face up pile, and the face up pile is discarded. Then play begins at step 1 again.

* When the guesser has made three correct guesses in a row, s/he may continue to guess or choose to pass and the roles are reversed with the face up pile continuing to build.
* With each subsequent correct guess, the guesser may choose to continue or pass.
* If the player continues guessing and is wrong, play starts over at step 1 and the player must again make three correct guesses before being allowed to pass.
* The goal is to end the game with as few points as possible.
* Aces are high.
