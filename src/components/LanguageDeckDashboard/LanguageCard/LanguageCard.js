import React, { Component } from 'react';
import config from '../../../config';
import TokenService from '../../../services/token-service';
import './LanguageCard.css';

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

  // write the delete card function
  handleDeleteCard = () => {
    console.log('the delete card button has been clicked, and this is the card id to target', this.state.word.id)
       const { API_ENDPOINT } = config;
       const fetchHeaders = {
         method: 'DELETE',
         headers: {
           authorization: `Bearer ${TokenService.getAuthToken()}`,
         },
       };

       fetch(`${API_ENDPOINT}/language`, fetchHeaders)
         .then((res) => res.json())
         .then((data) => {
           console.log('this is the response from the delete action',data);
         })
         .catch((err) => console.log(err.message));
  }

 // this is required because when adding a new card to a language deck this component needs to check if the word passed through is still the same state, if not it needs to update and re-render the list. 
  componentDidUpdate(prevProps, newProps) {
    if (prevProps.word.original !== this.props.word.original) {
      this.setState({ word: this.props.word });
    }
  }

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
    this.setState({ isToggled: !this.state.isToggled });
  };

  renderEditCard = () => {
    return (
      <form className='editCard' onSubmit={this.handlePatchCard}>
        <h2>Edit Card</h2>
        <p>Original Word</p>
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
        <div className='translationWrapper'>
          <p>Original: </p>
          <h2>{word.original}</h2>
          <p>Translation: </p>
          <h2>{word.translation}</h2>
        </div>
        <div className='answerCountWrapper'>
          <button onClick={this.handleEditBtn}>Edit Card</button>
          <button onClick={this.handleDeleteCard}>Delete Card</button>
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
