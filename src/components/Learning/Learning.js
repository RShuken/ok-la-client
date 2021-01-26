import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './Learning.css';

class Learning extends Component {
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
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };

    fetch(
      `${API_ENDPOINT}/language/${this.props.match.params.id}`,
      fetchHeaders
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err.message));
  };

  fetchHead = () => {
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };

    fetch(
      `${API_ENDPOINT}/language/${this.props.match.params.id}/head`,
      fetchHeaders
    )
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
    fetch(`${API_ENDPOINT}/language/${this.props.match.params.id}/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ guess: this.state.answer }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ guessData: data });
      });
  };

  renderGuess = () => {
    if (this.state.guessData.isCorrect === true) {
      return (
        <div className='guessContainer'>
          <h1>{this.state.nextWord}</h1>
          <h2>You translated the word correctly!</h2>
          <h2>
            {' '}
            The correct translation for the word: {this.state.nextWord} is{' '}
            {this.state.guessData.answer}
          </h2>
          <button>
            <a href={`/learn/${this.props.match.params.id}`}>
              Try another word!
            </a>
          </button>
          <p>Your total score is: {this.state.guessData.totalScore + 1}</p>
        </div>
      );
    }
    if (this.state.guessData.isCorrect === false) {
      return (
        <div className='guessContainer'>
          <h1>{this.state.nextWord}</h1>
          <h2>You translated the word incorrectly...</h2>
          <h2>
            {' '}
            The correct translation for the word: {this.state.nextWord} is{' '}
            {this.state.guessData.answer}
          </h2>
          <button>
            <a href={`/learn/${this.props.match.params.id}`}>
              Try another word!
            </a>
          </button>
          <p>Your total score is: {this.state.guessData.totalScore}</p>
        </div>
      );
    }
    return '';
  };

  renderTranslate() {
    return (
      <div className='translateWordContainer'>
        <form
          className='translateWordContainer'
          onSubmit={(e) => this.checkGuess(e)}
        >
          <h1 className='translateTitle'>Translate the Word</h1>
          <h1 className='translate-prompt'>{this.state.nextWord}</h1>
          <div className='inputBox'>
            <label htmlFor='answer'>
              <input
                type='text'
                id='answer'
                name='answer'
                className='answerBox'
                required
                onChange={this.updateAnswer}
                placeholder='enter your answer...'
              />
            </label>
            <button id='guessBtn' type='submit'>
              Submit
            </button>
          </div>
          <h3 className='incorrect'> INCORRECT: {this.state.wordIncorrectCount}</h3>
          <h3 className='correct'> CORRECT: {this.state.wordCorrectCount} </h3>
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

export default Learning;
