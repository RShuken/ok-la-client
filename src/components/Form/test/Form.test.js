import React from 'react';
import {Label} from '../Form';

test('expect Label function to create a label with className that is passed in', () => {
  expect(Label({ className: 'test' })).toStrictEqual(
    <label className='Label test' />
  );
});
