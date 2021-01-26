import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';


it('Header component renders without crashing', () => {
    shallow(<Header></Header>);
})

