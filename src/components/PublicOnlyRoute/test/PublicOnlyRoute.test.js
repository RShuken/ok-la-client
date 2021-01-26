import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import PublicOnlyRoute from '../PublicOnlyRoute';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('PublicOnlyRoute component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <PublicOnlyRoute></PublicOnlyRoute>
    </RenderWithRouter>
  );
});
