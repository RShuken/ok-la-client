import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import RegistrationRoute from '../RegistrationRoute';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('RegistrationRoute component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <RegistrationRoute></RegistrationRoute>
    </RenderWithRouter>
  );
});
