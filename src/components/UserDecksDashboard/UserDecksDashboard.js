import React, { Component } from 'react';
import config from '../../config';
import UserDeck from './UserDeck/UserDeck'
import './UserDecksDashboard.css';

//Question: Should the individual deck element that is being mapped over be converted into it's own component so that when clicking edit or delete it does not effect all items on the page?

//Question: After a user clicks a language how do I best pass through the language id to the new page so that I know to do the right fetch request on load. Is it through passing a dynamic url like /language-deck/:id  where the :id is the language id, or is it by passing it through props so that the user does not see the change in the link? What is the best way to do this? And on the server do I make a new get request path for each url path language ID that is dynamic or do I pass the language id though as props and when the new page loads it has a component did mount that takes in the passed in prop to get the correct language data. 

// I need to make a /language-decks/:id fetch path that 

class UserDecksDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        { language: 'french', numCards: 42, icon: 'french flag', id: 1 },
        { language: 'french2', numCards: 45, icon: 'french flag2', id: 2 },
        { language: 'french3', numCards: 45, icon: 'french flag3', id: 3 },
      ],
    };
  }

    componentDidMount() {
    //this.fetchUserDecks();
    // fetch request to get all of the community UserDecks
    // needs language name, and number of cards
  }

  // for this fetch request I need to edit the backend to return the ID of the language. 
  fetchUserDecks = () => {
    const { API_ENDPOINT } = config;
    fetch(`${API_ENDPOINT}/language`, (req, res) => {
      // fetch info here
      // this.setState({ languages: data})
    });
  };

  handleDeleteDecks = () => {
    const { API_ENDPOINT } = config;
    fetch(`${API_ENDPOINT}/language`, (req, res) => {
    // delete method for the language id.
    // at the end call this.fetchDecks to refresh the state
    });
  };

  render() {
    return (
      <div className="userDecksWrapper">
        {/* this will take the user to a page to create a new deck */}
        <div className="dashHeader">
        <button><a href="/make-new-deck">Make New Deck</a></button>
        <h1><a href="/">My Decks</a></h1>
        {/* this will take you to community decks */}
          <button><a href='/community-dashboard'>Add Community Decks</a></button>
        </div>
        {/* This will be the container for all user decks */}
        <div className='decks-container'>
          {this.state.languages.map((deck, y) => <UserDeck language={deck} key={y}/>)}
        </div>
      </div>
    );
  }
}

export default UserDecksDashboard;
