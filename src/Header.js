import React from 'react';
import PropTypes from 'prop-types';
import star from './images/Gold_Star_big.png';
import './index.css';
import './stylesheets/header.css';

const Header = ({player1,player2,dealer}) => {
	return (
		<div className="players">
			<div className="player-name player1">
				<img className={dealer ? "dealer1" : "hidden"} 
					src={star} width="32" height="32" alt="dealer" />
				{player1.name.toUpperCase()}
			</div>
			<div className="player-score">{player1.score}</div>
			<div className="player-score">{player2.score}</div>
			<div className="player-name">
				{player2.name.toUpperCase()}
				<img className={!dealer ? "dealer2" : "hidden"} 
					src={star} width="32" height="32" alt="dealer" />
			</div>
			<div className="series player1">Games Won: {player1.gamesWon}</div>
			<div className="series player2">Games Won: {player2.gamesWon}</div>
		</div>
	);
}

Header.propTypes = {
	player1: PropTypes.shape({
		name: PropTypes.string, 
		score: PropTypes.number, 
		gamesWon: PropTypes.number,
	}).isRequired,
	player2: PropTypes.shape({
		name: PropTypes.string, 
		score: PropTypes.number, 
		gamesWon: PropTypes.number,
	}).isRequired, 
	dealer: PropTypes.bool.isRequired,
};

export default Header;

/* PROPS
player1: object containg name, score, games won
player2: object containing name, score, games
dealer: true = player1, false = player2
*/

