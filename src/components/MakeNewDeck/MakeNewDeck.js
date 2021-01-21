import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './MakeNewDeck.css';

class CreateNewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  // this will be a POST request to create a whole new deck.
  addNewLanguage = (e) => {
    e.preventDefault();
    console.log('the submit button has been clicked', this.state.title);
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(this.state.title),
    };

    fetch(`${API_ENDPOINT}/language`, fetchHeaders)
      .then((res) => res.json())
      .then((data) => {
        //redirect here to the new deck id
      })
      .catch((err) => console.log(err.message));
  };

  handleInput = (e) => {
    const inputs = { [e.target.name]: e.target.value };
    this.setState(inputs);
  };


  renderAddNewDeck = () => {
    return (
      <form onSubmit={this.addNewLanguage} className="addNewLanguageForm">
        <h1>Title of Deck</h1>
        <input name='title' id='title' onChange={this.handleInput} />
        <button type='submit'>Submit</button>
      </form>
    );
  };

  render() {
    return <div className="addNewLanguageWrapper">{this.renderAddNewDeck()}</div>;
  }
}

export default CreateNewDeck;
