import React, { Component } from 'react';
import './UserDeck.css';
import config from '../../../config';
import TokenService from '../../../services/token-service';

//Question: window.location is not working for me, it says that it is not a function.
//Question: issue after editing the title of a deck. the app crashes when trying to click through to the new title

class UserDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.language,
      isToggled: false,
      name: '',
    };
  }

  // this takes the id of the language and does a delete request on the language deck.
  handleDeleteDeck = () => {
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
        this.setState({ language: null });
      })
      .catch((err) => console.log(err.message));
  };

  // when clicking edit deck it will take the user to the dynamic path of the language deck based on the Id of the language.
  handleEditDeckTitle = (e) => {
    e.preventDefault();
    console.log(
      'the edit title has started and this is the new title',
      this.state.name
    );
    const { API_ENDPOINT } = config;
    const fetchHeaders = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        name: this.state.name,
      }),
    };

    fetch(
      `${API_ENDPOINT}/language/${this.state.language.id}/title`,
      fetchHeaders
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // issue happens here after adding a new name when clicking into the new deck it crashes.
        this.setState({
          language: { name: data.name },
          isToggled: !this.state.isToggled,
        });
      })
      .catch((err) => console.log(err.message));
  };

  handleClickEditTitle = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  handleInput = (e) => {
    const inputs = { [e.target.name]: e.target.value };
    this.setState(inputs);
  };

  editTitleForm = () => {
    return (
      <form onSubmit={this.handleEditDeckTitle}>
        <input type='text' name='name' id='name' onChange={this.handleInput} />
        <button type='submit'>Submit</button>
      </form>
    );
  };

  renderUserDeck = () => {
    return (
      <div className='userDeckWrapper'>
        {/* this icon button will take the user to the edit deck page */}
        <div className='languageBox'>
          <img src={this.state.language.icon} alt={this.state.language.icon} />
          <h3>
            {/* need to be able to pass the language.id to the next page from clicking this component */}
            {this.state.isToggled === false ? (
              <a href={`/language-dashboard/${this.state.language.id}`}>
                {this.state.language.name.toUpperCase()}
              </a>
            ) : (
              this.editTitleForm()
            )}
          </h3>
          <p>Highest Score: {this.state.language.total_score}</p>
        </div>
        <div className='btnBox'>
          <button className='deleteBtn' onClick={this.handleDeleteDeck}>delete</button>
          <button className='editBtn' onClick={this.handleClickEditTitle}>edit title</button>
        </div>
      </div>
    );
  };

  render() {
    return <>{this.state.language !== null ? this.renderUserDeck() : <></>}</>;
  }
}

export default UserDeck;
