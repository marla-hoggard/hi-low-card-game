import React from 'react';
import cardBack from './images/card-back-taylor.png';
import './index.css';
import './stylesheets/animations.css';

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
					<div className={`card card-flip ${props.classes}`} style={props.style}>
						<div className="flip-back"><img src={cardBack} alt='back' /></div>
						<div className="flip-front"><img src={src} alt={props.card} /></div>
					</div>
				</div>
				
			);
		}
	}
}

/* PROPS
classes: string to be the div id
card: string for card code OR 'back' OR 'empty' (outline where card should go)
style: animation delay for pile fly animation
*/

