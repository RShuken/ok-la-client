import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import LanguageDeckDashboard from '../LanguageDeckDashboard';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('LanguageDeckDashboard component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <LanguageDeckDashboard></LanguageDeckDashboard>
    </RenderWithRouter>
  );
});
