import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import UserDecksDashboard from '../UserDecksDashboard';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('UserDecksDashboard component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <UserDecksDashboard></UserDecksDashboard>
    </RenderWithRouter>
  );
});
