import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './RegistrationRoute.css';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleRegistrationSuccess = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div className='register-container'>
        <section>
          <h2>
           Sign Up
          </h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </section>
      </div>
    );
  }
}

export default RegistrationRoute;
