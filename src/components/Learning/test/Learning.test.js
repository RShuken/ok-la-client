import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import Learning from '../Learning';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('Learning component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <Learning></Learning>
    </RenderWithRouter>
  );
});
