import React from 'react';
import './index.css';

export default class NewGame extends React.Component {
	render() {
		const props = this.props;
		return (
			<div className="new-game">
				<div className="welcome">Play Hi-Low!</div>
				<form>
					<input type="text" name="player1" value={props.player1} onChange={props.handleChange} />
					<input type="text" name="player2" value={props.player2} onChange={props.handleChange} />
					<button className="button" onClick={props.startGame}>Start Game</button>
				</form>
			</div>
		);
	}
}

/* PROPS
Player 1's name
Player 2's name
onChange for both inputs
onClick for startGame()
*/