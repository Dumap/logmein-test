import React, { Component } from 'react';
import { connect } from "react-redux";

class Player extends Component {

    renderCards = (card, index) => {
        return (<img className='card' key={"player-"+index} src={card} alt={index} />)
    }

    render(){
        return(
        <div className="deck-compact active-hand" >
             {this.props.dealtCards.map(this.renderCards)}
        </div>)
    }
}

let mapStateToProps = function(state) {
    return {
      deck: state.deck,
      dealtCards: state.dealtCards
    };
  };
  
let connectPlayer = connect(mapStateToProps)(Player);
  
export default connectPlayer;