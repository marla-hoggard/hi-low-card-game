import React from 'react';
import NewGame from './NewGame';
import Header from './Header';
import Guess from './Guess';
import CardSection from './CardSection';
import { RANKS } from './constants';
import './index.css';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			player1: {name: "Player 1 Name", score: 0},
			player2: {name: "Player 2 Name", score: 0},
			player1active: true, //player1 active, player2 dealing
			guessCount: 0,

			showNewGame: true,
			gameOver: false,

			fetchAction: null, //Which api call to make in DidUpdate
			deckSize: '',
			deckId: 'new',
			pile: [], //full card object
			currentCard: null, //full card object

			animatePile: '',
		}
		this.API = 'https://deckofcardsapi.com/api/deck/';
	}

	//Load pop window to enter names and press start
	newGame = () => {
		this.setState( {
			player1: {name: this.state.player1.name, score: 0},
			player2: {name: this.state.player2.name, score: 0},
			player1active: true,
			guessCount: 0,

			showNewGame: true,
			gameOver: false,

			fetchAction: null,
			pile: [],
			currentCard: null,

			animatePile: '',
		});
	}

	handleNameChange = (e) => {
		let {player1, player2} = this.state;
		if (e.target.name === 'player1') {
			player1.name = e.target.value;
			this.setState( { player1 } );
		}
		else if (e.target.name === 'player2') {
			player2.name = e.target.value;
			this.setState( { player2 } );
		}
	}

	//Reset state, shuffle deck, draw first card
	startGame = () => {
		this.setState( {
			showNewGame: false,
			gameOver: false,
			fetchAction: 'new',
		});
	}

	chooseHiOrLow = (hiOrLow) => {
		fetch(this.API + this.state.deckId + '/draw/?count=1')
		.then(response => response.json())
		.then(data => {
			console.log("drawing from choseHiOrLow (71)");
			console.log(data.cards[0].code);
			const newRank = RANKS.indexOf(data.cards[0].value);
			const oldRank = RANKS.indexOf(this.state.currentCard.value);
			if (hiOrLow === 'hi' && newRank > oldRank || 
				hiOrLow === 'low' && newRank < oldRank ) {
				console.log("Good guess!");
				const gameOver = data.remaining === 0 ? true : false;
				this.setState({
					pile: this.state.pile.concat(data.cards[0]),
					currentCard: data.cards[0],
					deckSize: data.remaining,
					guessCount: this.state.guessCount + 1,
					gameOver,
				})
			}
			else {
				console.log("WRONG!");
				let newState = {};
				if (this.state.player1active) {
					newState.player1 = this.state.player1;
					newState.player1.score += this.state.pile.length + 1;
					newState.animatePile = 'fly-player1';
				}		
				else {
					newState.player2 = this.state.player2;
					newState.player2.score += this.state.pile.length + 1;
					newState.animatePile = 'fly-player2';
				}
				newState = {
					...newState,
					pile: [],
					currentCard: data.cards[0],
					guessCount: 0,
				};
				if (this.state.deckSize <= 1) {
					this.setState({
						...newState,
						gameOver: true,
						deckSize: data.remaining,
					})
				}
				else {
					this.setState({
						...newState,
					});
					setTimeout(() => {
						this.setState({
							currentCard: null,
							animatePile: '',
							fetchAction: 'draw',
						});
					},750);
				}
			}
		});
	}

	passDeck = () => {
		this.setState({
			player1active: !this.state.player1active,
			guessCount: 0,
		});
	}

	componentDidUpdate() {
		if (this.state.fetchAction === 'new') {
			if (this.state.deckId === 'new') {
				fetch(this.API + 'new/draw/?count=1')
					.then(response => response.json())
					.then(data => {
						console.log(data);
						this.setState({
							deckSize: data.remaining,
							deckId: data.deck_id,
							pile: [data.cards[0]],
							currentCard: data.cards[0],
							fetchAction: null,
						});
					});
			}
			else {
				fetch(this.API + this.state.deckId + '/shuffle/')
					.then(response => response.json())
					.then(data => {
						fetch(this.API + this.state.deckId + '/draw/?count=1')
						.then(response => response.json())
						.then(data => {
							console.log(data);
							this.setState({
								deckSize: data.remaining,
								pile: [data.cards[0]],
								currentCard: data.cards[0],
								fetchAction: null,
							});
						});
					});
			}
		}
		// else if (this.state.deckSize == 0) {
		// 	this.setState({
		// 		gameOver: true,
		// 		fetchAction: null,
		// 	});
		// }
		else if (this.state.fetchAction === 'draw') {
			console.log("Draw did update: before timeout");
			setTimeout(() => {
				fetch(this.API + this.state.deckId + '/draw/?count=1')
					.then(response => response.json())
					.then(data => {
						console.log("Draw from did update: in timeout");
						console.log(data.cards[0].code);
						const gameOver = data.remaining === 0 ? true : false;
						this.setState({
							deckSize: data.remaining,
							pile: [data.cards[0]],
							currentCard: data.cards[0],
							fetchAction: null,
							gameOver,
						})
					}).catch(error => {
						console.log("Out of cards?");
					});
				}, 250);
		}
		return;
	}

	render() {
		const state = this.state;
		if (state.showNewGame) {
			return <NewGame 
					player1={state.player1.name}
					player2={state.player2.name}
					handleChange={(e) => this.handleNameChange(e)}
					startGame={this.startGame}
			/>
		}
		else {
			const message = state.player1.score < state.player2.score ?
				`${state.player1.name} wins!` :
				state.player1.score > state.player2.score ?
				`${state.player2.name} wins!` : "Tie"
			return (
				<div>
					<Header player1={state.player1} 
						player2={state.player2}
						dealer={!state.player1active} 
					/>
					<button className="button" onClick={() => this.newGame()}>New Game</button>
					{state.gameOver ? <div className="game-over">{message}</div> :
						<Guess activePlayer={state.player1active ? state.player1.name : state.player2.name}
							guessCount={state.guessCount}
							clickHiLow={this.chooseHiOrLow}
							clickPass={this.passDeck} />
					}
					<CardSection card={state.currentCard ? state.currentCard.code : 'empty'} 
						deck={state.deckSize} pile={state.pile.length}
						classes={state.animatePile} />
				</div>
			);
		}

	}
}


