import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

it('Button component renders without crashing', () => {
  shallow(<Button></Button>);
});
