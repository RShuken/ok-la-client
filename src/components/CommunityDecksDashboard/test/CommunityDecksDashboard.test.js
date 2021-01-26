import React from 'react';
import { shallow } from 'enzyme';
import CommunityDecksDashboard from '../CommunityDecksDashboard';

it('CommunityDecksDashboard component renders without crashing', () => {
  shallow(<CommunityDecksDashboard></CommunityDecksDashboard>);
});
