import React from 'react';
import './index.css';
import './stylesheets/guess.css';

const Guess = (props) => {
	const guessLabel = (/s$/i).test(props.activePlayer) ? props.activePlayer.toUpperCase() + "' STREAK" :
		props.activePlayer.toUpperCase() + "'S STREAK";
	return (
		<div className="guess">
			<button className="pass" onClick={props.clickPass} disabled={props.guessCount < 3}>
				PASS DECK
			</button>
			<div className="guessButtons">
				<button className="hi-low" disabled={props.noCard}
					onClick={() => props.clickHiLow("hi")}>HI</button>
				<button className="hi-low" disabled={props.noCard}
					onClick={() => props.clickHiLow("low")}>LOW</button>
				<div className="guesserName">{guessLabel}&nbsp;<span className="guessCount">{props.guessCount}</span>
				</div>
			</div>
		</div>
	);
}

export default Guess;

/* PROPS
activePlayer: name of current guesser
guessCount: number representing current good guess streak
clickPass: function for pass deck button
clickHiLow: function for hi and low buttons (pass in 'hi' or 'low')
noCard: boolean -> true means no current card so disable hi/low buttons
*/

