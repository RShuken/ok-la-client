import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import LanguageCard from '../LanguageCard';

const RenderWithRouter = ({ children }) => (
  <MemoryRouter>
    <Route>{children}</Route>
  </MemoryRouter>
);

it('LanguageCard component renders without crashing', () => {
  shallow(
    <RenderWithRouter>
      <LanguageCard></LanguageCard>
    </RenderWithRouter>
  );
});
