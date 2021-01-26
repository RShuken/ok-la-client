import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import RegistrationForm from '../RegistrationForm';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('RegistrationForm component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <RegistrationForm></RegistrationForm>
    </RenderWithRouter>
  );
});
