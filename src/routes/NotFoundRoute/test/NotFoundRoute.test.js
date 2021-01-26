import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import NotFoundRoute from '../NotFoundRoute';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('NotFoundRoute component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <NotFoundRoute></NotFoundRoute>
    </RenderWithRouter>
  );
});
