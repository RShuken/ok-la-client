import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './MakeNewDeck.css';
import { withRouter } from 'react-router';

// this component creates a new deck and post to the server the title of the deck. The backend endpoint handles everything from there. 

class CreateNewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isTooLong: false
    };
  }

  // this will be a POST request to create a whole new deck.
  addNewLanguage = (e) => {
    e.preventDefault();
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ name: this.state.title }),
    };

    fetch(`${API_ENDPOINT}/language`, fetchHeaders)
      .then((res) => res.json())
      .then((data) => {
        this.props.history.push('/')
      })
      .catch((err) => console.log(err.message));
  };

  handleInput = (e) => {
    if (e.target.value.length >= 9) {
      this.setState({ isTooLong: true})
    } else {
            this.setState({ isTooLong: false });

    }
    const inputs = { [e.target.name]: e.target.value };
    this.setState(inputs);
  };


  renderAddNewDeck = () => {
    return (
      <form onSubmit={this.addNewLanguage} className='addNewLanguageForm'>
        <h1>Title of Deck</h1>
        <label>
          <input
            placeholder='new deck title'
            maxLength="9"
            name='title'
            id='title'
            required
            onChange={this.handleInput}
          />
          {this.state.isTooLong ? (
            <p>You can only have 9 or less characters in this input</p>
          ) : (
            <button type='submit'>Submit</button>
          )}
        </label>
      </form>
    );
  };

  render() {
    return <div className="addNewLanguageWrapper">{this.renderAddNewDeck()}</div>;
  }
}

export default withRouter(CreateNewDeck);
