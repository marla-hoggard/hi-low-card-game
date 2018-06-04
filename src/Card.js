import React from 'react';
import './index.css';
import cardBack from './images/card-back-taylor.png';

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
				<div className="card-container">
					<div className={`card card-flip ${props.classes}`}>
						<div className="flip-back"><img src={cardBack} alt='back' /></div>
						<div className="flip-front"><img src={src} alt={props.card} /></div>
					</div>
				</div>
				
			);
		}

		// else {
		// 	const src = `https://deckofcardsapi.com/static/img/${props.card}.png`;
		// 	return (
		// 		<div className={`card ${props.classes}`}>
		// 			<img src={src} alt={props.card} />
		// 		</div>
		// 	);
		// }

	}
}

/* PROPS
classes: string to be the div id
card: string for card code OR 'back' OR 'empty' (outline where card should go)
*/

