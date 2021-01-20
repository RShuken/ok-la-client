import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [], language: {},
    }
  }

  componentDidMount = () => {
    this.fetchLanguage();
  }

  fetchLanguage = () => {
        const { API_ENDPOINT } = config;
        const fetchHeaders = {
          method: 'GET',
          headers: {
            authorization: `Bearer ${TokenService.getAuthToken()}`,
          }
    };
    
    fetch(`${API_ENDPOINT}/language`, fetchHeaders)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ words: data.words, language: data.language })
      })
      .catch((err) => console.log(err.message));
  }

  renderCard = (word) => {
    return (
      <div className='wordCard' key={word.id}>
        <h2>{word.original}</h2>
        <div className='answerCountWrapper'>
      <p>correct word count: {word.correct_count}</p>
          <p>incorrect word count: {word.incorrect_count}</p>
        </div>
      </div>
      
    )
  }


  render() {
    return (
      <section className='wordCardsContainer'>
        <h1>{this.state.language.name}</h1>
        <button><a href='/learn'>Start learning</a></button>
        {this.state.words.map((word) => this.renderCard(word))}
      </section>
    );
  }
}

export default DashboardRoute;
