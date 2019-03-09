import React from 'react';
import Rules from './Rules';
import NewGame from './NewGame';
import Header from './Header';
import Guess from './Guess';
import CardSection from './CardSection';
import { RANKS } from './constants';
import './index.css';
import './stylesheets/game.css';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			player1: {name: "Player 1", score: 0, gamesWon: 2},
			player2: {name: "Player 2", score: 0, gamesWon: 4},
			player1active: true, //player1 guessing, player2 dealing
			guessCount: 0,

			showRules: false, //Show the how to play component
			showNewGame: true, //Show the new game component
			gameOver: false,

			fetchAction: null, //Which api call to make in DidUpdate
			deckSize: 0, //Cards remaining in the deck (face down)
			deckId: 'new',
			pile: [], //Array of card objects in face up pile
			currentCard: null, //full card object

			noCard: true, //disables hi-low buttons when true
			animatePile: '', //class names for animations
		}
		this.API = 'https://deckofcardsapi.com/api/deck/';
	}

	toggleRules = () => {
		this.setState(prevState => {
			return { showRules: !prevState.showRules }
		});
	}

	//Load pop window to enter names and press start
	newGame = () => {
		this.setState(prevState => {
			return {
				player1: {name: prevState.player1.name, score: 0, gamesWon: prevState.player1.gamesWon},
				player2: {name: prevState.player2.name, score: 0, gamesWon: prevState.player2.gamesWon},
				player1active: true,
				guessCount: 0,

				showNewGame: true,
				gameOver: false,

				fetchAction: null,
				pile: [],
				currentCard: null,

				animatePile: '',
				noCard: false,
			}
		});
	}

	//Reset state, update localStorage, shuffle deck, draw first card
	startGame = () => {
		let p1games, p2games;
		let {player1, player2} = {...this.state};
		if (player1.name == '') {
			player1.name = 'Player 1';
		}
		if (player2.name == '') {
			player2.name = 'Player 2';
		}
		const newSeries = {
			player1: {name: player1.name, wins: 0},
			player2: {name: player2.name, wins: 0},
		}

		if (localStorage.getItem('gamesWon')) {
			const gamesWon = JSON.parse(localStorage.getItem('gamesWon'));
			if (player1.name == gamesWon.player1.name &&
				player2.name == gamesWon.player2.name) {
				console.log("localStorage Matched")
				p1games = gamesWon.player1.wins;
				p2games = gamesWon.player2.wins;
			}
			else {
				localStorage.setItem('gamesWon', JSON.stringify(newSeries));
				console.log("localStorage Exists but no match")
				p1games = 0;
				p2games = 0;
			}
		}
		else {
			localStorage.setItem('gamesWon', JSON.stringify(newSeries));
			console.log("localStorage No match.")
			p1games = 0;
			p2games = 0;
		}

		player1.gamesWon = p1games;
		player2.gamesWon = p2games;

		this.setState( {
			player1,
			player2,
			showNewGame: false,
			gameOver: false,
			fetchAction: 'new',
			noCard: false,
			animatePile: 'deal-card'
		});
	}

	//Equivalent of New Game then Start Game with no player name changes
	playAgain = () => {
		const gamesWon = localStorage.getItem('gamesWon') ? JSON.parse(localStorage.getItem('gamesWon')) :
		{
			"player1": { "name":this.state.player1.name, "wins":this.state.player1.gamesWon },
			"player2": { "name":this.state.player2.name, "wins":this.state.player2.gamesWon }
		};
		console.log("Playing again");
		console.log(gamesWon);
		
		this.setState(prevState => {
			return {
				player1: {name: prevState.player1.name, score: 0, gamesWon: gamesWon.player1.wins},
				player2: {name: prevState.player2.name, score: 0, gamesWon: gamesWon.player2.wins},
				player1active: true,
				guessCount: 0,

				gameOver: false,

				fetchAction: 'new',
				pile: [],
				currentCard: null,

				animatePile: 'deal-card',
				noCard: false,
			}
		});
	}

	//For player name inputs in NewGame.js
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

	//For pressing Hi or Low buttons
	chooseHiOrLow = (hiOrLow) => {
		this.setState({
			noCard: true,
		});
		this.callAPI(this.API + this.state.deckId + '/draw/?count=1')
		.then(data => {
			console.log("drawing from choseHiOrLow");
			console.log(data.cards[0].code);
			const newRank = RANKS.indexOf(data.cards[0].value);
			const oldRank = RANKS.indexOf(this.state.currentCard.value);
			if ((hiOrLow === 'hi' && newRank > oldRank) || 
				(hiOrLow === 'low' && newRank < oldRank)) {
				console.log("Correct!");
				const gameOver = data.remaining === 0 ? true : false;
				const deal = this.state.animatePile.includes('deal-card') ? 'deal-again' : 'deal-card';
				
				if (gameOver) {
					this.updateSeriesRecords();
				}

				this.setState(prevState => {
					return {
						pile: prevState.pile.concat(data.cards[0]),
						currentCard: data.cards[0],
						deckSize: data.remaining,
						guessCount: prevState.guessCount + 1,
						gameOver,
						animatePile: deal,
						noCard: false,
					}
				});
			}
			else {
				console.log("WRONG!");
				let score = {};
				if (this.state.player1active) {
					score.player1 = {...this.state.player1};
					score.player1.score += this.state.pile.length + 1;
				}		
				else {
					score.player2 = {...this.state.player2};
					score.player2.score += this.state.pile.length + 1;
				}
				const newState = {
					pile: this.state.pile.concat(data.cards[0]),
					animatePile: this.state.player1active ? 'fly-player1' : 'fly-player2',
					currentCard: data.cards[0],
					guessCount: 0,
				};
				//guessed wrong and now game's over
				if (this.state.deckSize <= 1) {
					console.log("Guessed wrong and now game's over");
					this.updateSeriesRecords();
					this.setState({
						...newState,
						...score,
						gameOver: true,
						deckSize: data.remaining,
						fetchAction: 'noCards',
					}, () => {
						setTimeout(() => {
							this.setState({ pile: [] });
						},2250)
					});
				}
				else { //guessed wrong, game continues
					const pileSize = this.state.pile.length + 1;
					this.setState({
						...newState,
						noCard: true,
						deckSize: data.remaining,
					}, () => {
						setTimeout(() => {
							this.setState({
								animatePile: 'hidden',
								noCard: true,
							}, () => {
								this.setState({
									...score,
									pile: [],
									fetchAction: 'draw',
									animatePile: 'deal-card'
								});
							});
						},2250 + .2 * pileSize);
					});
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

	updateSeriesRecords = () => {
		console.log("updating from updateSeriesRecords");
		if (localStorage.getItem('gamesWon') == null) {
			console.log("Empty local storage");
			return;
		}
		let series = JSON.parse(localStorage.getItem('gamesWon'));
		let { player1, player2 } = {...this.state};

		if (player1.score < player2.score) {
			series.player1.wins++;
			player1.gamesWon++;
		}
		else if (player1.score > player2.score) {
			series.player2.wins++;
			player2.gamesWon++;
		}
		localStorage.setItem('gamesWon', JSON.stringify(series));

		this.setState({
			player1,
			player2,
		});

	}

	callAPI = (url) => {
		return fetch(url).then(response => response.json());
	}

	componentDidUpdate() {
		if (this.state.fetchAction === 'new') {
			//Need a new deck - shuffles and draws in one api call
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
							noCard: false,
							animatePile: 'deal-card'
						});
					});
			}
			else {
				//Already had a deck -> shuffles it, then draws 
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
								noCard: false,
								animatePile: 'deal-card'
							});
						});
					});
			}
		}
		//Drawing a card after a wrong guess
		else if (this.state.fetchAction === 'draw') {
			console.log("Draw from did update");
			fetch(this.API + this.state.deckId + '/draw/?count=1')
				.then(response => response.json())
				.then(data => {
					console.log(data.cards[0].code);
					const gameOver = data.remaining === 0 ? true : false;
					if (gameOver) {
						this.updateSeriesRecords();
					}
					this.setState({
						deckSize: data.remaining,
						pile: [data.cards[0]],
						currentCard: data.cards[0],
						fetchAction: null,
						animatePile: 'deal-card',
						noCard: false,
						gameOver,
					})
				}).catch(error => {
					console.log("Out of cards?");
				});
		}
	}

	render() {
		const state = this.state;
		if (state.showRules) {
			return <Rules onClick={this.toggleRules}/>
		}
		else if (state.showNewGame) {
			return <NewGame 
					player1={state.player1.name}
					player2={state.player2.name}
					handleChange={this.handleNameChange}
					startGame={this.startGame}
					showRules={this.toggleRules}
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

					<div className="game-buttons">
						<button className="button" onClick={this.newGame}>New Game</button>
						<button className="button" onClick={this.toggleRules}>How To Play</button>
					</div>

					{state.gameOver ? 
						<div className="game-over">
							<div className="message">{message}</div>
							<button className="button play-again" onClick={this.playAgain}>Play Again</button>
						</div> :
						<Guess activePlayer={state.player1active ? state.player1.name : state.player2.name}
							guessCount={state.guessCount}
							noCard={state.noCard}
							clickHiLow={this.chooseHiOrLow}
							clickPass={this.passDeck} />
					}
					<CardSection card={state.currentCard ? state.currentCard.code : 'empty'} 
						deck={state.deckSize} pile={state.pile}
						classes={state.animatePile} />
				</div>
			);
		}

	}
}


