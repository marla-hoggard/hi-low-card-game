import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import './stylesheets/newGame.css'

const NewGame = (props) => {
	return (
		<div className="new-game">
			<div className="welcome">Play Hi-Low!</div>
			<div className="instructions">Enter Player Names:</div>
			<form>
				<input type="text" name="player1" value={props.player1} onChange={props.handleChange} />
				<input type="text" name="player2" value={props.player2} onChange={props.handleChange} />
				<div className="buttons">
					<button className="button" onClick={props.startGame}>Start Game</button>
					<button className="button" onClick={props.showRules}>How To Play</button>
				</div>
			</form>
		</div>
	);
}

NewGame.propTypes = {
	player1: PropTypes.string.isRequired,
	player2: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	startGame: PropTypes.func.isRequired,
	showRules: PropTypes.func.isRequired,
};


export default NewGame;

/* PROPS
player1: Player 1's name
player2: Player 2's name
handleChange: onChange for both inputs
startGame: onClick for startGame()
showRules: onClick for toggleRules()
*/