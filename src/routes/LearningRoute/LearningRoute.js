import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './LearningRoute.css';

class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextWord: '',
      totalScore: 0,
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
      answer: '',
      guessData: { correct: null },
    };
  }

  componentDidMount = () => {
    this.fetchHead();
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
      .then((data) => {})
      .catch((err) => console.log(err.message));
  };

  fetchHead = () => {
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };

    fetch(`${API_ENDPOINT}/language/head`, fetchHeaders)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          nextWord: data.nextWord,
          totalScore: data.totalScore,
          wordCorrectCount: data.wordCorrectCount,
          wordIncorrectCount: data.wordIncorrectCount,
        });
      })
      .catch((err) => console.log(err.message));
  };

  updateAnswer = (e) => {
    this.setState({ answer: e.target.value });
  };

  checkGuess = (e) => {
    e.preventDefault();
    const { API_ENDPOINT } = config;
    fetch(`${API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ guess: this.state.answer }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ guessData: data });
      });
  };

  renderGuess = () => {
    if (this.state.guessData.isCorrect === true) {
      return (
        <div className='translateWordContainer'>
          <h1>{this.state.nextWord}</h1>
          <h2>You translated the word correctly!</h2>
          <h2>
            {' '}
            The correct translation for the word: {this.state.nextWord} is{' '}
            {this.state.guessData.answer}
          </h2>
          <button>
            <a href='/learn'>Try another word!</a>
          </button>
          <p>Your total score is: {this.state.guessData.totalScore}</p>
          <h3>
            {' '}
            You have answered this word correctly{' '}
            {this.state.guessData.wordCorrectCount} times
          </h3>
          <h3>
            {' '}
            You have answered this word incorrectly{' '}
            {this.state.guessData.wordIncorrectCount} times
          </h3>
        </div>
      );
    }
    if (this.state.guessData.isCorrect === false) {
      return (
        <div className='translateWordContainer'>
          <h1>{this.state.nextWord}</h1>
          <h2>You translated the word incorrectly...</h2>
          <h2>
            {' '}
            The correct translation for the word: {this.state.nextWord} is{' '}
            {this.state.guessData.answer}
          </h2>
          <button>
            <a href='/learn'>Try another word!</a>
          </button>
          <p>Your total score is: {this.state.guessData.totalScore}</p>
          <h3>
            {' '}
            You have answered this word correctly {
              this.state.wordCorrectCount
            }{' '}
            times
          </h3>
          <h3>
            {' '}
            You have answered this word incorrectly{' '}
            {this.state.wordIncorrectCount} times
          </h3>
        </div>
      );
    }
    return '';
  };

  renderTranslate() {
    return (
      <div className='translateWordContainer'>
        <form className='translateWordContainer' onSubmit={(e) => this.checkGuess(e)}>
          <h1>Translate the word:</h1>
          <h1>{this.state.nextWord}</h1>
          <p>Your total score is: {this.state.totalScore}</p>
          <label htmlFor='answer'>
            <h2>What is the correct translation in English?</h2>
          </label>
          <input
            type='text'
            id='answer'
            name='answer'
            required
            onChange={this.updateAnswer}
            placeholder='Guess Here'
          />
          <button id='guessBtn' type='submit'>
            Submit
          </button>
          <h3>
            {' '}
            You have answered this word correctly {
              this.state.wordCorrectCount
            }{' '}
            times
          </h3>
          <h3>
            {' '}
            You have answered this word incorrectly{' '}
            {this.state.wordIncorrectCount} times
          </h3>
        </form>
      </div>
    );
  }

  chooseRender = () => {
    if (this.state.guessData.correct === null) {
      return this.renderTranslate();
    }
    return this.renderGuess();
  };

  render() {
    return (
      <div className='translateWrapper'>
        <section>{this.chooseRender()}</section>
      </div>
    );
  }
}

export default LearningRoute;
