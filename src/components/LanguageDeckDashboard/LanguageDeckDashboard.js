import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './LanguageDeckDashboard.css';
import LanguageCard from './LanguageCard/LanguageCard'


class LanguageDeckDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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


  render() {
    return (
      <section className='wordCardsContainer'>
        <h1>{this.state.language.name}</h1>
        <p>Total Score: {this.state.language.total_score} points</p>
        <p>{this.state.words.length} Word Cards in Deck</p>
        <button>
          <a href='/learn'>Start learning</a>
        </button>
        {this.state.words.map((word, y) => (
          <LanguageCard word={word} key={y} />
        ))}
      </section>
    );
  }
}

export default LanguageDeckDashboard;
