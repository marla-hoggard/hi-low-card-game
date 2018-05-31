import React from 'react';
import cardBack from './card-back.png';
import './index.css';

export default class Card extends React.Component {
	render() {
		const props = this.props;
		if (props.card === 'back') {
			return (
				<div class="card card-back">
					{/*<p class="deck-number">{props.stack}</p>*/}
				</div>
			);
		}
		else {
			const src = `https://deckofcardsapi.com/static/img/${props.card}.png`;
			return (
				<div class="card">
					<img src={src} alt={props.card} />
				</div>
			);
		}

	}
}

/* PROPS
card: string for card code OR 'back' OR 'empty' (outline where card should go)
**stack: number of cards in the deck - probably going in CardSection
*/

