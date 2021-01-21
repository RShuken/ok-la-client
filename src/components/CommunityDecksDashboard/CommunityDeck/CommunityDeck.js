import React, { Component } from 'react';
import config from '../../../config';
import './CommunityDeck.css';

class CommunityDecks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.language,
    };
  }

    // need a fetch request to activate when Add deck button is pressed to add the deck ID to the user ID, it will be a PUT request to update the user's list of language id's 
  fetchDecks = () => {
    const { API_ENDPOINT } = config;
    fetch(`${API_ENDPOINT}/language`, (req, res) => {
// no return
    });
  };

    handleClickAddDecks = () => {
        console.log('the add deck function has been clicked', this.state.language)
    }
    
  renderCommunityDeck() {
    return (
      <div className='languageDeckBox'>
        <img src={this.state.language.icon} alt={this.state.language.icon} />
        <button onClick={this.handleClickAddDecks}>+Add {this.state.language.language}</button>
        <p>{this.state.language.numCards} Cards in deck</p>
      </div>
    );
  }

  render() {
      return (
          <>
              {this.renderCommunityDeck()}
          </>
     
    );
  }
}

export default CommunityDecks;
