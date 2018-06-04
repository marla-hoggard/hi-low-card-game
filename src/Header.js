import React from 'react';
import star from './images/Gold_Star_big.png';
import './index.css';
import './stylesheets/header.css';

export default class Header extends React.Component {
	render() {
		const props = this.props;
		return (
			<div className="players">
				<div className="player-name player1">
					<img className={props.dealer ? "dealer1" : "hidden"} 
						src={star} width="32" height="32" alt="dealer" />
					{props.player1.name.toUpperCase()}
				</div>
				<div className="player-score">{props.player1.score}</div>
				<div className="player-score">{props.player2.score}</div>
				<div className="player-name">
					{props.player2.name.toUpperCase()}
					<img className={!props.dealer ? "dealer2" : "hidden"} 
						src={star} width="32" height="32" alt="dealer" />
				</div>
				<div className="series player1">Games Won: {props.player1.gamesWon}</div>
				<div className="series player2">Games Won: {props.player2.gamesWon}</div>
			</div>
		);

	}
}

/* PROPS
player1: object containg name, score
player2: object containing name, score
dealer: true = player1, false = player2
*/

