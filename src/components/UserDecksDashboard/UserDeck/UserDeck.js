import React, { Component } from 'react';
import config from '../../config';

//Question: After a user clicks a language how do I best pass through the language id to the new page so that I know to do the right fetch request on load. Is it through passing a dynamic url like /language-deck/:id  where the :id is the language id, or is it by passing it through props so that the user does not see the change in the link? What is the best way to do this? And on the server do I make a new get request path for each url path language ID that is dynamic or do I pass the language id though as props and when the new page loads it has a component did mount that takes in the passed in prop to get the correct language data.

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
        window.location(`/language-deck/${this.state.language.id}`)
    }

  renderUserDeck = () => {
    return (
      <div>
        {/* this icon button will take the user to the edit deck page */}
        <button onClick={this.handleEditDeck}>edit</button>
        <div>
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
