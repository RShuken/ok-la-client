import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import UserDeck from '../UserDeck';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('UserDeck component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <UserDeck></UserDeck>
    </RenderWithRouter>
  );
});
