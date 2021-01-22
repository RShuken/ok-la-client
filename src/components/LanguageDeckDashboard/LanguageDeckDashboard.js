import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './LanguageDeckDashboard.css';
import LanguageCard from './LanguageCard/LanguageCard';

//This needs a fetch request to work.

class LanguageDeckDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original: '',
      translation: '',
      isToggled: false,
      words: [],
      language: {}
    };
  }

  componentDidMount = () => {
    const { location, history } = this.props;
    // const destination = (location.state || {}).from || '/';
    // history.push(destination);
    console.log('this is the location and the history', location, history, this.props)
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

    fetch(`${API_ENDPOINT}/language/${this.props.match.params.id}`, fetchHeaders)
      .then((res) => res.json())
      .then((data) => {
        console.log('this is the server response data', data)
        this.setState({ words: data.words, language: data.language  });
      })
      .catch((err) => console.log(err.message));
  };

  handleInput = (e) => {
    const inputs = { [e.target.name]: e.target.value };
    this.setState(inputs);
  };

  handleAddingCard = (e) => {
    e.preventDefault();
    this.setState({
      words: [
        {
          original: this.state.original,
          translation: this.state.translation,
          correct_count: 0,
          id: 99,
          incorrect_count: 0,
          language_id: 2,
          memory_value: 1,
          next: 12,
        },
        ...this.state.words,
      ],
      isToggled: !this.state.isToggled,
    });
    // this should be a POST request that adds a new card to the id of the language at the end of the linked list.
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
    // fetch request to delete the deck based on the deck ID.
    //window.location.push('/') need to move the user to the '/' page
  };

  handleAddCard = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  render() {
    const { words } = this.state;
    console.log('this is the state from langugaedeck Dashboard', this.state);
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
        {words.map((word, y) => (
          <LanguageCard word={word} key={y} />
        ))}
      </section>
    );
  }
}

export default LanguageDeckDashboard;
