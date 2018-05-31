import React from 'react';

import Card from './Card';
import './index.css';

export default class Game extends React.Component {
	render() {
		return (
			<div class="cards">
				<Card card="back" stack="51" />
				<Card card="8S" stack="1" />
			</div>
		);

	}
}

/* PROPS
card: string for card code OR 'back' OR 'empty' (outline where card should go)
remaining: cards left in the deck




*/

