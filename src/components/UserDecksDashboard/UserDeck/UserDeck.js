import React, { Component } from 'react';
import './UserDeck.css';
import config from '../../../config';
import TokenService from '../../../services/token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const elementTrash = <FontAwesomeIcon icon={faTrash} />;
const elementEdit = <FontAwesomeIcon icon={faEdit} />;

// this component handles the rendering of the user deck that is shown on the dashboard. It is passed props and rendered in it's parent component. 

class UserDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.language,
      isToggled: false,
      name: '',
      isTooLong: false
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
        this.setState({
          language: { ...this.state.language , name: data.name },
          isToggled: !this.state.isToggled,
        });
      })
      .catch((err) => console.log(err.message));
  };

  handleClickEditTitle = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  handleInput = (e) => {
    if (e.target.value.length >= 9) {
      this.setState({ isTooLong: true})
    } else {
            this.setState({ isTooLong: false });

    }
    const inputs = { [e.target.name]: e.target.value };
    this.setState(inputs);
  };

  editTitleForm = () => {
    return (
      <form onSubmit={this.handleEditDeckTitle}>
        <input type='text' name='name' required id='name' placeholder='edit title' onChange={this.handleInput} />
        {this.state.isTooLong ? <p>You can only have 9 or less characters in this input</p> : <button type='submit'>Submit</button>}
      </form>
    );
  };

  renderUserDeck = () => {
    return (
      <div className='userDeckWrapper'>
        {/* this icon button will take the user to the edit deck page */}
        <div className='languageBox'>
          <div>
            {/* need to be able to pass the language.id to the next page from clicking this component */}
            {this.state.isToggled === false ? (
              <a href={`/language-dashboard/${this.state.language.id}`}><h2>
                {this.state.language.name.toUpperCase()}
              </h2></a>
            ) : (
              this.editTitleForm()
            )}
          </div>
          <p>Highest Score: {this.state.language.total_score}</p>
        </div>
        <div className='btnBox'>
          <button
            className='deleteBtn'
            type='button'
            onClick={this.handleDeleteDeck}
          >
            <span style={{ display: 'none' }}>trash button icon element</span>
            {elementTrash}
          </button>
          <button
            className='editBtn'
            type='button'
            onClick={this.handleClickEditTitle}
          >
            <span style={{ display: 'none' }}>edit button icon element</span>
            {elementEdit}
          </button>
        </div>
      </div>
    );
  };

  render() {
    return <>{this.state.language !== null ? this.renderUserDeck() : <></>}</>;
  }
}

export default UserDeck;
