import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import PrivateRoute from '../PrivateRoute';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('PrivateRoute component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <PrivateRoute></PrivateRoute>
    </RenderWithRouter>
  );
});
