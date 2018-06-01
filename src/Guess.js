import React from 'react';
import './index.css';

export default class Guess extends React.Component {
	render() {
		const props = this.props;
		const guessLabel = (/s$/i).test(props.activePlayer) ? props.activePlayer.toUpperCase() + "' GUESSES" :
			props.activePlayer.toUpperCase() + "'S STREAK";
		return (
			<div className="guess">
				<button className="pass" onClick={() => props.clickPass()} disabled={props.guessCount < 3}>
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
}

/* PROPS
guessCount: number representing current good guess streak
*/

