import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import CommunityDeck from '../CommunityDeck';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('CommunityDeck component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <CommunityDeck></CommunityDeck>
    </RenderWithRouter>
  );
});

