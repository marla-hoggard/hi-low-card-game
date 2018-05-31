import React from 'react';
import CardSection from './CardSection';
import './index.css';

export default class Game extends React.Component {
	render() {
		console.log("rendering Game");
		return (
			<CardSection card="AH" deck="51" pile="1" />
		);

	}
}


