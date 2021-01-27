import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../LandingPage';

it('LandingPage component renders without crashing', () => {
  shallow(<LandingPage></LandingPage>);
});
