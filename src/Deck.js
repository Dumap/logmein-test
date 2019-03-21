import React, { Component } from 'react';
import { connect } from "react-redux";
import back from './back.svg'


class Deck extends Component {

    renderCards = (card, index) => {
        if(this.props.showDeck){
            return (<img className='card' key={"deck-"+index} src={card} alt={index} />)
        }else{
            return (<img className='card' key={"deck-"+index} src={back} alt={index} />)
        }
    }

    render() {
        return(
            <div className={this.props.showDeck ? "deck-compact active-hand" : "deck-back active-hand"} >
                 {this.props.deck.map(this.renderCards)}
            </div>
        )
    }
}

let mapStateToProps = function(state) {
    return {
      deck: state.deck,
      dealtCards: state.dealtCards,
      showDeck: state.showDeck
    };
  };
  
let connectDeck = connect(mapStateToProps)(Deck);
  
export default connectDeck;

