import React, { Component } from 'react';
import config from '../../config';
import UserDeck from './UserDeck/UserDeck';
import './UserDecksDashboard.css';
import TokenService from '../../services/token-service';

class UserDecksDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
    };
  }

  componentDidMount() {
    this.fetchUserDecks();
  }

  // for this fetch request I need to edit the backend to return the ID of the language.
  fetchUserDecks = () => {
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };

    fetch(`${API_ENDPOINT}/user`, fetchHeaders)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ languages: data });
      })
      .catch((err) => console.log(err.message));
  };


  render() {
    return (
      <div className='userDecksWrapper'>
        {/* this will take the user to a page to create a new deck */}
        <div className='dashHeader'>
          <button>
            <a href='/make-new-deck'>Make New Deck</a>
          </button>
          
            <a href='/'><h1>My Decks</h1></a>
          
          {/* this will take you to community decks */}
          <button>
            <a href='/community-dashboard'>Add Community Decks</a>
          </button>
        </div>
        {/* This will be the container for all user decks */}
        <div className='decks-container'>
          {this.state.languages.map((deck, y) => (
            <UserDeck language={deck} key={y} />
          ))}
        </div>
      </div>
    );
  }
}

export default UserDecksDashboard;
