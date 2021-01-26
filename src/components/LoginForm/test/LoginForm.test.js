import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('LoginForm component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <LoginForm></LoginForm>
    </RenderWithRouter>
  );
});
