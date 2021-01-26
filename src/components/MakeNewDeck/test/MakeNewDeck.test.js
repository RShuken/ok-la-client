import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import MakeNewDeck from '../MakeNewDeck';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('MakeNewDeck component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <MakeNewDeck></MakeNewDeck>
    </RenderWithRouter>
  );
});
