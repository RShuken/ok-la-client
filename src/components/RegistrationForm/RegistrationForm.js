import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';
import UserContext from '../../contexts/UserContext';


class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value = '';
        AuthApiService.postLogin({
          username: username.value,
          password: password.value,
        })
          .then((res) => {
            username.value = '';
            password.value = '';
            this.context.processLogin(res.authToken);
            this.props.onLoginSuccess();
          })
          .catch((res) => {
            console.log(res);
          });
      })

      .catch((res) => {
        console.log({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <div className='registerForm'>
        <form className='registerElements' onSubmit={this.handleSubmit}>
          <div role='alert'>{error && <p>{error}</p>}</div>
          <div>
            <Label htmlFor='registration-name-input'>
              Enter your name
              <Required />
            </Label>
            <Input
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              required
            />
          </div>
          <div>
            <Label htmlFor='registration-username-input'>
              Choose a username
              <Required />
            </Label>
            <Input id='registration-username-input' name='username' required />
          </div>
          <div>
            <Label htmlFor='registration-password-input'>
              Choose a password
              <Required />
            </Label>
            <Input
              id='registration-password-input'
              name='password'
              type='password'
              required
            />
          </div>
          <footer>
            <Button type='submit'>Sign up</Button>{' '}
            <Link to='/login'>Already have an account?</Link>
          </footer>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
