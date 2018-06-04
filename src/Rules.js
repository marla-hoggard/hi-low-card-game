import React from 'react';
import './index.css';
import './stylesheets/rules.css'

const Rules = (props) => {
	return (
		<div className="rules">
			<div className="welcome">How To Play Hi-Low</div>
			<ul>
				<li>Play consists of a dealer and a guesser:</li>
				<ol>
					<li>The dealer draws a card from the top of the deck and places it face up.</li>
					<li><span className="highlight">The guesser must guess whether the next card drawn from the deck will be higher or lower than the face up card.</span></li>
					<li>Once the guesser guesses, the dealer draws the next card and places it face up on top of the previous card.</li>
					<li>If the guess is <span className="highlight">correct</span>, go back to step 2.</li>
					<li>If the guess is <span className="highlight">wrong</span>, the guesser receives a <span className="highlight">point for each card in the face up pile</span>, and the face up pile is discarded. Then play begins at step 1 again.</li>
				</ol>
				<li>When the guesser has made <span className="highlight">three correct guesses in a row</span>, s/he may continue to guess or choose to pass and the roles are reversed with the face up pile continuing to build.</li>
				<li>With each subsequent correct guess, the guesser may choose to continue or pass.</li>
				<li>If the player continues guessing and is wrong, play starts over at step 1 and the player must again make three correct guesses before being allowed to pass.</li>
				<li>The <span className="highlight">goal</span> is to end the game with as <span className="highlight">few points</span> as possible.</li>
				<li><span className="highlight">Aces</span> are <span className="highlight">high</span>.</li>
			</ul>
			<div className="center"><button className="button" onClick={props.onClick}>Play Hi-Low</button></div>
		</div>
	);
}

export default Rules;

/* PROPS
onClick: function that toggles showRules in Game.state
*/