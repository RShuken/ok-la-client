import React, { Component } from 'react';
//import config from '../../config';
//import TokenService from '../../services/token-service';
//import './LanguageCard.css';

class LanguageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: this.props.word,
      isToggled: false,
      original: '',
      translation: '',
    };
  }

  // make a function that returns a form and another function that takes the input on change and updates it then another function that is a PATCH request to update the card. don't forget to have it in state.

  // write the edit card function

  // write the delete card function

  handleInput = (e) => {
    const inputs = { [e.target.name]: e.target.value };
    this.setState(inputs);
  };

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
  };

    handleEditBtn = () => {
      this.setState({isToggled: !this.state.isToggled});
  }

  renderEditCard = () => {
    return (
      <form className='editCard' onSubmit={this.handlePatchCard}>
        <h2>Edit Card</h2>
        <p>Original</p>
        <input
          type='text'
          id='original'
          name='original'
          onChange={this.handleInput.bind(this)}
          placeholder={this.state.word.original}
        ></input>
        <p>Translation</p>
        <input
          type='text'
          id='translation'
          name='translation'
          onChange={this.handleInput.bind(this)}
          placeholder={this.state.word.translation}
        ></input>
        <button type='submit'>Submit</button>
      </form>
    );
  };

  renderCard = (word) => {
    return (
      <div className='wordCard'>
        <h2>{word.original}</h2>
        <div className='answerCountWrapper'>
          <button onClick={this.handleEditBtn}>Edit Card</button>
          <button>Delete Card</button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.renderCard(this.state.word)}
        {this.state.isToggled ? this.renderEditCard() : ''}
      </>
    );
  }
}

export default LanguageCard;
