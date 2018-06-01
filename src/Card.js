import React from 'react';
import './index.css';

export default class Card extends React.Component {
	render() {
		const props = this.props;
		if (props.card === 'back' || props.card === 'empty') {
			return (
				<div className={`card card-${props.card}`}>
				</div>
			);
		}
		else {
			const src = `https://deckofcardsapi.com/static/img/${props.card}.png`;
			return (
				<div className="card">
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

