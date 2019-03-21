import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function importAll(c) {
    return c.keys().map(c);
}

let fullDeck = importAll(require.context('../images/cards', false, /\.(svg)$/));

let reducer = function(state, action) {
    switch (action.type) {  
      case "shuffle":
        let shuffleCard = state.deck.length;
        let shuffledDeck = state.deck.slice();
        let randomCard;
        while(shuffleCard){
            randomCard = Math.floor(Math.random() * shuffleCard--);
            [shuffledDeck[shuffleCard], shuffledDeck[randomCard]] = [shuffledDeck[randomCard], shuffledDeck[shuffleCard]];
        }
        return { ...state, deck: shuffledDeck };
      case "deal":
        console.log("number of cards ", state.deck.length)
        let numCardsDeal = state.deck.length;
        if (numCardsDeal){
            let newDeck = state.deck.slice();
            let newDealtCards = state.dealtCards.slice();
            let randomCard = Math.floor(Math.random() * numCardsDeal-1);
            console.log("random card ", randomCard)
            newDealtCards.push(newDeck.splice(randomCard, 1))
            return { ...state, deck: newDeck, dealtCards : newDealtCards };

        }else{
           return state;
        }
      case "show-deck":
        if(state.showDeck){
            return { ...state, showDeck: false };
        }else{
            return { ...state, showDeck: true };
        }
      case "restart":
        return { ...state, deck: fullDeck, dealtCards : [] };
      default:
        return state;
    }
  };

const myStore = createStore(
    reducer,
    {
      deck: fullDeck,
      dealtCards: [],
      showDeck: false
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={myStore}>
      <App />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
