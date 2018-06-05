import React from 'react';
import PropTypes from 'prop-types';
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

Card.propTypes = {
	card: PropTypes.string.isRequired,
	classes: PropTypes.string,
	style: PropTypes.object,
}

export default Card;

/* PROPS
classes: string for animation (optional)
card: string for card code OR 'back' OR 'empty' 
style: animation delay for pile fly animation (optional)
*/

