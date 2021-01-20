import React, { Component } from 'react';
//import config from '../../config';
//import TokenService from '../../services/token-service';
//import './LanguageCard.css';

//Question: Edit card and Delete card will need to either forward to a new path, or load a component on this page. What is the best way to do this? Delete card can be a fetch request that deletes the id of that card. This means that I likely need this to be it's own component as I need each card to act independent of each other.

//Question: Don recommends going against using constructors, should I change it?

class LanguageCard extends Component {
  constructor(props) {
    super(props);
      this.state = {
        word: this.props.word
    };
  }
  
  renderCard = (word) => {
    return (
      <div className='wordCard'>
        <h2>{word.original}</h2>
        <div className='answerCountWrapper'>
          <button>Edit Card</button>
          <button>Delete Card</button>
        </div>
      </div>
    );
    };
    
    render() {
        return (
        <>
            {this.renderCard(this.state.word)}
        </>
    );
  }
}

export default LanguageCard;


