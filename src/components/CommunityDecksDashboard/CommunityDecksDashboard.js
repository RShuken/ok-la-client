import React, { Component } from 'react';
import config from '../../config';
import './CommunityDecksDashboard.css';
import CommunityDeck from './CommunityDeck/CommunityDeck'
import TokenService from '../../services/token-service';

// this component handles the community dashboard where all public decks are shown. The fetch call loads on mount and receives all PUBLIC decks. A deck card is rendered then mapped through to create the deck container. The child component Community Deck, renders the card that is mapped over. 

class CommunityDecksDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
    };
  }

  componentDidMount() {
    this.fetchDecks();
  }

  fetchDecks = () => {
          const { API_ENDPOINT } = config;
          const fetchHeaders = {
            method: 'GET',
            headers: {
              authorization: `Bearer ${TokenService.getAuthToken()}`,
            },
          };

          fetch(`${API_ENDPOINT}/language`, fetchHeaders)
            .then((res) => res.json())
            .then((data) => {
              this.setState({ languages: data.language });
            })
            .catch((err) => console.log(err.message));
  };

  render() {
    return (
      <div className='userDecksWrapper'>
        <h1>Add Community Decks</h1>
        {/* this will take you to my decks */}
        
          <a href='/'><button className='userDecksBtn'>My Decks</button></a>
        
        {/* This will be the container for all community decks */}
        <div className='deck-box'>
          {this.state.languages.map((deck, y) => <CommunityDeck language={deck} key={y}/>)}
        </div>
      </div>
    );
  }
}

export default CommunityDecksDashboard;
