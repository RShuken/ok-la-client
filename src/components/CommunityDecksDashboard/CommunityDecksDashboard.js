import React, { Component } from 'react';
import config from '../../config';
import './CommunityDecksDashboard.css';
import CommunityDeck from './CommunityDeck/CommunityDeck'
import TokenService from '../../services/token-service';


class CommunityDecksDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
    };
  }

  componentDidMount() {
    this.fetchDecks();
    // fetch request to get all of the community CommunityDecks ## it would be good to add a backend function that returns true or false if the user already has the deck in their deck library. that way the users can get feedback on if they already added a deck and it gives a way to only show decks they don't already own. 
    // needs language name, and number of cards
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
              console.log(data);
              this.setState({ languages: data.language });
            })
            .catch((err) => console.log(err.message));
  };

  render() {
    console.log(this.state.language);
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
