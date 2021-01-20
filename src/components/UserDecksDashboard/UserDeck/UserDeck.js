import React, { Component } from 'react';
import config from '../../../config';
import './UserDeck.css'

//Question: window.location is not working for me, it says that it is not a function. 

// I need to make a /language-decks/:id fetch path that

class UserDeck extends Component {
  constructor(props) {
    super(props);
      this.state = {
        language: this.props.language,
    };
  }

    // this takes the id of the language and does a delete request on the language deck. 
  handleDeleteDeck = () => {
    const { API_ENDPOINT } = config;
    fetch(`${API_ENDPOINT}/language-deck/${this.state.language.id}`, (req, res) => {
      // delete method for the language id.
      // at the end call this.fetchDecks to refresh the state
    });
    };

    // when clicking edit deck it will take the user to the dynamic path of the language deck based on the Id of the language. 
    handleEditDeck = () => {
        console.log('this is the deck id', this.state.language.id)
        window.location(`/language-deck/${this.state.language.id}`)
    }

  renderUserDeck = () => {
    return (
      <div className="userDeckWrapper">
        {/* this icon button will take the user to the edit deck page */}
        <button onClick={this.handleEditDeck}>edit</button>
        <div className="languageBox">
          <img src={this.state.language.icon} alt={this.state.language.icon} />
          <h3>
            <a href='/language-dashboard'>{this.state.language.language}</a>
          </h3>
          <p>{this.state.language.numCards}</p>
        </div>
        {/* this icon button will delete the user deck and refresh the page */}
        <button onClick={this.handleDeleteDeck}>delete</button>
      </div>
    );
  }

  render() {
    return (
      <>
          {this.renderUserDeck()}
      </>
    );
  }
}

export default UserDeck;
