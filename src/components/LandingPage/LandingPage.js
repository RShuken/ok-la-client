import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='landingPageContainer'>
        <div className='landingPageMessageBox'>
          <h1>A Language Learning Community</h1>
          <p>
            Learning a new language can be intimidating, and difficult but it
            doesn't have to be that way. Ok’la is a program which makes
            remembering new languages easy. Our flashcard method is more
            efficient than traditional study methods and can greatly increase
            the amount you learn. Based on Anki’s spaced repetition flashcards,
            creating a language deck tracks your progress and show’s you the
            cards you need to work on the most.
          </p>
          <p>
            Create an account and join our language learning community. You can
            add community decks or create your own decks and share them with
            everyone.
          </p>
        </div>
        </div>
    );
  }
}

export default LandingPage;
