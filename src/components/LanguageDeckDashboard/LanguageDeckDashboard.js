import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './LanguageDeckDashboard.css';
import LanguageCard from './LanguageCard/LanguageCard';

//Question: when I try to change the handlePatchCard to handleAddCard I get an error, whats up?


class LanguageDeckDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original: '',
      translation: '',
      isToggled: false,
      words: [],
      language: {},
    };
  }

  componentDidMount = () => {
    this.fetchLanguage();
  };

  fetchLanguage = () => {
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };

    fetch(`${API_ENDPOINT}/language`, fetchHeaders)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ words: data.words, language: data.language });
      })
      .catch((err) => console.log(err.message));
  };

  handleInput = (e) => {
    const inputs = { [e.target.name]: e.target.value };
    this.setState(inputs);
  };

  // when I try to change this to handleAddCard I get an error, whats up?
  handlePatchCard = (e) => {
    e.preventDefault();
    console.log(
      'this is the original',
      this.state.original,
      'this is the translation',
      this.state.translation
    );
    // this will do a PATCH request to the server to change the card. this should also take the word.id and pass it though in the body so the sever knows what word id to update.
    // fetch(`${API_ENDPOINT}/language`, )
    // when done set isToggled back to false and clear the state
    this.setState({
      word: {
        ...this.state.word,
        original: this.state.original,
        translation: this.state.translation,
      },
      original: '',
      translation: '',
      isToggled: !this.state.isToggled,
    });
    this.fetchLanguage();
  };

  renderAddCard = () => {
    return (
      <form className='editCard' onSubmit={this.handlePatchCard}>
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
    // fetch request to delete the deck based on the deck ID.
    //window.location.push('/') need to move the user to the '/' page
  };

  handleAddCard = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  render() {
    return (
      <section className='wordCardsContainer'>
        <h1>{this.state.language.name}</h1>
        <p>Total Score: {this.state.language.total_score} points</p>
        <p>{this.state.words.length} Word Cards in Deck</p>
        <div className='btnContainer'>
          <button onClick={this.handleAddCard}>
            {!this.state.isToggled ? 'Add Card' : 'Close Add Card'}
          </button>
          <button>
            <a href='/learn'>Start learning</a>
          </button>
          <button onClick={this.handleDeleteDeck}>Delete Deck</button>
        </div>
        {this.state.isToggled ? this.renderAddCard() : ''}
        {this.state.words.map((word, y) => (
          <LanguageCard word={word} key={y} />
        ))}
      </section>
    );
  }
}

export default LanguageDeckDashboard;
