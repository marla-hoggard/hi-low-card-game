import React from 'react';
import Card from './Card';
import './index.css';

export default class CardSection extends React.Component {
	render() {
		const props = this.props;
		return (
			<div>
				<div className="cards">
					<Card card={props.deck > 0 ? 'back' : 'empty'} />
					<Card card={props.card} />
				</div>
				<div className="card-numbers">
					<div className="number">CARDS: {props.deck}</div>
					<div className="number">CARDS: {props.pile}</div>
				</div>
			</div>
		);

	}
}

/* PROPS
card: string for card code OR 'empty' (outline where card should go)
deck: number of cards left in the deck
pile: numer of cards in the pile

*/

