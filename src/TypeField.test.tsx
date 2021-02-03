import React from 'react';
import { render, screen } from '@testing-library/react';
import TypeField from './TypeField';

test('renders given text', () => {
  render(<TypeField text="Hello World"/>);
  const textElement = screen.getByTestId('field');
  expect(textElement).toBeInTheDocument();
});
