import React, { Component } from 'react';
import config from '../../../config';
import './CommunityDeck.css';
import TokenService from '../../../services/token-service';


class CommunityDecks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.language,
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
        .then((res) => res)
        .catch((err) => console.log(err.message));
    }
    
  renderCommunityDeck() {
    return (
      <div className='languageDeckBox'>
        <img src={this.state.language.icon} alt={this.state.language.icon} />
        <button onClick={this.handleClickAddDecks}>+Add {this.state.language.name}</button>
        <p>Total Score: {this.state.language.total_score}</p>
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
