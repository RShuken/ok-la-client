import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './LanguageDeckDashboard.css';
import LanguageCard from './LanguageCard/LanguageCard';
import { withRouter } from 'react-router';

//Issue with the access value in state.

class LanguageDeckDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original: '',
      translation: '',
      isToggled: false,
      words: [],
      language: {},
      access: false,
    };
  }

  componentDidMount = () => {
    this.fetchLanguage();
  };

  componentDidUpdate = () => {};

  fetchLanguage = () => {
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };

    fetch(
      `${API_ENDPOINT}/language/${this.props.match.params.id}`,
      fetchHeaders
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          words: data.words,
          language: data.language,
          access: data.language.is_public,
        });
      })
      .catch((err) => console.log(err.message));
  };

  handleInput = (e) => {
    const inputs = { [e.target.name]: e.target.value };
    this.setState(inputs);
  };

  handleCheckBoxChange = () => {
    const access = !this.state.access
    console.log('after handleCheckBoxChange this is the value of access', access)
    this.handleUpdateAccess(access);
  };

  handleUpdateAccess = (access) => {
        console.log(
          'in the handleUpdateAccess function this is hte value of access',
          access
        );

    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        access: access,
      }),
    };

    fetch(
      `${API_ENDPOINT}/language/${this.props.match.params.id}/access`,
      fetchHeaders
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.setState({access: access})
      })
      .catch((err) => console.log(err.message));
  };

  handleAddingCard = (e) => {
    e.preventDefault();
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        original: this.state.original,
        translation: this.state.translation,
      }),
    };

    fetch(
      `${API_ENDPOINT}/language/${this.state.language.id}/word/`,
      fetchHeaders
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          words: [data.newWord, ...this.state.words],
          isToggled: !this.state.isToggled,
        });
      })
      .catch((err) => console.log(err.message));
  };

  renderAddCard = () => {
    return (
      <form className='editCard' onSubmit={this.handleAddingCard.bind(this)}>
        <h2>Add Card</h2>
        <p>Original Word</p>
        <input
          type='text'
          id='original'
          name='original'
          onChange={this.handleInput}
          placeholder={this.state.original}
        ></input>
        <p>Translation</p>
        <input
          type='text'
          id='translation'
          name='translation'
          onChange={this.handleInput}
          placeholder={this.state.translation}
        ></input>
        <button type='submit'>Submit</button>
      </form>
    );
  };

  handleDeleteDeck = () => {
    console.log('the delete deck button has been clicked');
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };

    fetch(`${API_ENDPOINT}/language/${this.state.language.id}`, fetchHeaders)
      .then((res) => res.json())
      .then((data) => {
        this.props.history.push('/');
      })
      .catch((err) => console.log(err.message));
  };

  handleAddCard = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  onDelete = (id) => {
    console.log('this is the id of the card being deleted', id);
    const wordsArray = this.state.words.filter((word) => word.id !== id);
    console.log('this is the words array', wordsArray);
    this.setState({ words: wordsArray });
  };

  render() {
    const { words } = this.state;
    console.log('this is access on load', this.state.access);
    return (
      <section className='wordCardsContainer'>
        <h1>{this.state.language.name}</h1>
        <p>Total Score: {this.state.language.total_score} points</p>
        <p>{this.state.words.length} Word Cards in Deck</p>
        <div className='btnContainer'>
          <button onClick={this.handleAddCard}>
            {!this.state.isToggled ? 'Add Card' : 'Close Add Card'}
          </button>
          {this.state.words.length < 3 ? (
            <p>Add more words to start learning</p>
          ) : (
            <button>
              <a href={`/learn/${this.state.language.id}`}>Start learning</a>
            </button>
          )}
          <button onClick={this.handleDeleteDeck}>Delete Deck</button>
          <div>
            {this.state.access ? (
              <input
                type='checkbox'
                checked={true}
                id='publicAccess'
                onChange={this.handleCheckBoxChange}
              />
            ) : (
              <input
                type='checkbox'
                checked={false}
                id='publicAccess'
                onChange={this.handleCheckBoxChange}
              />
            )}
            <label>
              Check this box to make the deck public to the community
            </label>
          </div>
        </div>
        {this.state.isToggled ? this.renderAddCard() : ''}
        <div className='wordMapBox'>
          {words.map((word, y) => (
            <LanguageCard
              word={word}
              key={y}
              onDelete={(id) => this.onDelete(id)}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default withRouter(LanguageDeckDashboard);
