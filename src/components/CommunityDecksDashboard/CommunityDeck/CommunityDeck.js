import React, { Component } from 'react';
import config from '../../../config';
import './CommunityDeck.css';
import TokenService from '../../../services/token-service';


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
        <img src={this.state.language.icon} alt={this.state.language.icon} />
        {this.state.isToggled === false ? <button onClick={this.handleClickAddDecks}>
          +Add {this.state.language.name}
        </button> : <p>Language Added</p>}
        
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
