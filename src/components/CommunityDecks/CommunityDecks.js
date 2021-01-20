import React, { Component } from 'react';
import config from '../../config';

class CommunityDecks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        { language: 'french', numCards: 42, icon: 'french flag' },
        { language: 'french2', numCards: 45, icon: 'french flag2' },
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
            <div>
                <img src={deck.icon} alt={deck.icon} />
                <h3>{deck.language}</h3>
                <p>{deck.numCards}</p>
            </div>
        )
    }

  render() {
      return (
          <div>
              <h1>Add Community Decks</h1>
              {/* this will take you to my decks */}
              <button>My Decks</button>
              {/* This will be the container for all community decks */}
               <div className="decks-container">{this.state.languages.map(deck => this.renderCommunityDeck(deck))}</div>
             
          </div>
      );
  }
}

export default CommunityDecks;
