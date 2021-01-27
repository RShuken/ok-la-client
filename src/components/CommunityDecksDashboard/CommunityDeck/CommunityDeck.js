import React, { Component } from 'react';
import config from '../../../config';
import './CommunityDeck.css';
import TokenService from '../../../services/token-service';

// this component renders the individual card that represents a deck that user can add on the community deck page. The values are sent through props and the card is created here. This also takes care of adding a deck to a users library. That fetch request requires the language deck id to be passed as a property of the fetch path. The backend takes care of the rest since it already has the user ID when logged in. 

class CommunityDecks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.language,
      isToggled: false,
    };
  }


    handleClickAddDecks = () => {      
      const { API_ENDPOINT } = config;
      const fetchHeaders = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
      };

      fetch(`${API_ENDPOINT}/user/deck/${this.state.language.id}`, fetchHeaders)
        .then((res) => this.setState({ isToggled: !this.state.isToggled}))
        .catch((err) => console.log(err.message));
    }
    
  handleAddSuccess = () => {
    return (
      <p>Successfully added {this.state.language.name} to your learning dashboard!</p>
    )
  }
  
  renderCommunityDeck() {
    return (
      <div className='languageDeckBox'>
        <h1 className='languageTitle'>{this.state.language.name}</h1>
        <p>Highest Score: {this.state.language.total_score}</p>
        {this.state.isToggled === false ? <button className='addLanguage' onClick={this.handleClickAddDecks}>
          + Add {this.state.language.name}
        </button> : <p className='addResponse'>Language Added</p>}
        
        
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
