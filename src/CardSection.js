import React from 'react';
import Card from './Card';
import './index.css';

export default class CardSection extends React.Component {
	render() {
		const props = this.props;
		console.log("rendering CardSection");
		return (
			<div>
				<div className="cards">
					<Card card="back" />
					<Card card={props.card} />
				</div>
				<div className="card-numbers">
					<div className="number">{props.deck}</div>
					<div className="number">{props.pile}</div>
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

