import React from 'react';
import Header from './Header';
import Guess from './Guess';
import CardSection from './CardSection';
import './index.css';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			player1: {name: "Player 1", score: 0},
			player2: {name: "Player 2", score: 25},
			dealer: true,
			guessCount: 0,
		}
	}
	render() {
		return (
			<div>
				<Header player1={this.state.player1} 
					player2={this.state.player2}
					dealer={this.state.dealer} 
				/>
				<button className="new-game">New Game</button>
				<Guess activePlayer={this.state.dealer ? this.state.player2.name : this.state.player1.name}
					guessCount={this.state.guessCount} />
				<CardSection card="6H" deck="46" pile="3" />
			</div>
		);

	}
}


