import React, { Component } from 'react';
import config from '../../config';
import './CommunityDecks.css';

class CommunityDecks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        { language: 'french', numCards: 42, icon: 'french flag', id:1 },
        { language: 'french2', numCards: 45, icon: 'french flag2', id:2 },
        { language: 'french3', numCards: 45, icon: 'french flag2', id:3 }
      ],
    };
  }

  componentDidMount() {
    // fetch request to get all of the community CommunityDecks
    // needs language name, and number of cards
  }

  fetchDecks = () => {
    const { API_ENDPOINT } = config;
    fetch(`${API_ENDPOINT}/language`, (req, res) => {
      // fetch info here
      // this.setState({ languages: data})
    });
  };

  renderCommunityDeck(deck) {
    return (
      <div className='languageDeckBox'>
        <img src={deck.icon} alt={deck.icon} />
        <button>+Add {deck.language}</button>
        <p>{deck.numCards} Cards in deck</p>
      </div>
    );
  }

  render() {
    return (
      <div className='userDecksWrapper'>
        <h1>Add Community Decks</h1>
        {/* this will take you to my decks */}
        <button>
          <a href='/'>My Decks</a>
        </button>
        {/* This will be the container for all community decks */}
        <div className='deck-box'>
          {this.state.languages.map((deck) => this.renderCommunityDeck(deck))}
        </div>
      </div>
    );
  }
}

export default CommunityDecks;
