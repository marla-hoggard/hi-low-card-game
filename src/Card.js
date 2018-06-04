import React from 'react';
import cardBack from './images/card-back-taylor.png';
import './index.css';
import './stylesheets/cards.css';
import './stylesheets/animations.css';

const Card = ({classes,card,style}) => {
		if (card === 'back' || card === 'empty') {
			return (
				<div className={`card card-${card}`}>
				</div>
			);
		}
		else {
			const src = `https://deckofcardsapi.com/static/img/${card}.png`;
			return (
				<div className="card-container">
					<div className={`card card-flip ${classes}`} style={style}>
						<div className="flip-back"><img src={cardBack} alt='back' /></div>
						<div className="flip-front"><img src={src} alt={card} /></div>
					</div>
				</div>
				
			);
		}
}

export default Card;

/* PROPS
classes: string to be the div id
card: string for card code OR 'back' OR 'empty' (outline where card should go)
style: animation delay for pile fly animation
*/

