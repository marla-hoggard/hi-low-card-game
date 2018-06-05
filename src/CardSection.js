import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './index.css';
import './stylesheets/cards.css';
import './stylesheets/animations.css';

const CardSection = (props) => {
	const pileCards = props.pile.slice(0,-1).map((card,index,pile) => {
		const classNames = props.classes.includes('fly') ? "card card-flip " + props.classes + "-delay" : "card card-flip";
		const duration = 2.25 + .2 * (pile.length - index);
		return (
			<Card key={card.code} classes={classNames} card={card.code} 
				style={{animationDuration: duration + 's'}} />
		);
	});
	return (
		<div className="card-area">
			<div className="cards">
				<Card card={props.deck > 0 ? 'back' : 'empty'}/>
				{pileCards}
				<Card classes={props.classes} card={props.card} />
			</div>
			<div className="card-numbers">
				<div className="number">CARDS: {props.deck}</div>
				<div className="number">CARDS: {props.pile.length}</div>
			</div>
		</div>
	);
}

CardSection.propTypes = {
	card: PropTypes.string.isRequired,
	deck: PropTypes.number.isRequired,
	pile: PropTypes.array.isRequired,
	classes: PropTypes.string,
}

export default CardSection;

/* PROPS
card: string for card code OR 'empty'
deck: number of cards left in the deck
pile: array of cards in the face-up pile
classes: string for animating card pile on score
*/

