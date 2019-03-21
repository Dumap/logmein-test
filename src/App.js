import React, { Component } from 'react';
import { connect } from "react-redux";
import Deck from './Deck';
import Player from './Player';
import './App.css';

class App extends Component {
  state = {
    showCardBtn: 'Show Deck'
  }

  shuffleCards = () =>{
    this.props.dispatch({ type: "shuffle"})
  }

  dealOneCard = () =>{
    this.props.dispatch({ type: "deal"})
  }

  restart = () =>{
    this.props.dispatch({ type: "restart"})
    this.setState({showCardBtn: 'Show Deck'});
    this.shuffleCards();
  }

  toggleDeck = () =>{
    this.props.dispatch({ type: "show-deck"})
    let btnText = this.props.showDeck ? 'Show Deck' : 'Hide Deck'
    this.setState({showCardBtn: btnText});
  }

  componentDidMount = () =>{
    this.shuffleCards();
  }

  render() {
    return (
      <div className="App">
        <nav>Deck of Cards</nav>
        <div className="table">
          <Deck />
          <Player />
        </div>
        <div className="controls">
          <button type="button" onClick={this.shuffleCards}>Shuffle Cards</button>
          <button type="button" onClick={this.dealOneCard}>Deal Card</button>
          <button type="button" onClick={this.toggleDeck}>{this.state.showCardBtn}</button>
          <button type="button" onClick={this.restart}>Start Over</button>
      </div>
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    deck: state.deck,
    dealtCards: state.dealtCards,
    showDeck: state.showDeck
  };
};

let connectApp = connect(mapStateToProps)(App);
  
export default connectApp;

