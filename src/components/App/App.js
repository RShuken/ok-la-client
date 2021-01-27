import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import LanguageDeckDashboard from '../LanguageDeckDashboard/LanguageDeckDashboard';
import Learning from '../Learning/Learning'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import CommunityDecksDashboard from '../CommunityDecksDashboard/CommunityDecksDashboard';
import UserDecksDashboard from '../UserDecksDashboard/UserDecksDashboard';
import MakeNewDeck from '../MakeNewDeck/MakeNewDeck';
import LandingPage from '../LandingPage/LandingPage';
import './App.css';

// this component renders they switch and route for the react dom router. Components are called when a path exactly matches and helps the user traverse the app. 

export default class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    return (
      <div className='App'>
        <Header />
        <main>
          {hasError && <p>There was an error! Oh no!</p>}
          <Switch>
            <PrivateRoute exact path={'/'} component={UserDecksDashboard} />
            <PrivateRoute exact path={'/learn/:id'} component={Learning} />
            <PrivateRoute
              exact
              path={'/community-dashboard'}
              component={CommunityDecksDashboard}
            />
            <PrivateRoute
              exact
              path={'/make-new-deck'}
              component={MakeNewDeck}
            />
            <PrivateRoute
              exact
              path={'/language-dashboard/:id'}
              component={LanguageDeckDashboard}
            />
            <PublicOnlyRoute
              exact
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute exact path={'/login'} component={LoginRoute} />
            <PublicOnlyRoute exact path={'/index'} component={LandingPage} />

            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
