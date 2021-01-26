import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import App from '../App';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('App component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <App></App>
    </RenderWithRouter>
  );
});

