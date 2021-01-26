import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import LoginRoute from '../LoginRoute';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('LoginRoute component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <LoginRoute></LoginRoute>
    </RenderWithRouter>
  );
});
