/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Routes from '../routes/Routes';

test('renders Login link', () => {
  const routes = render(<Routes />);
  // console.log(routes);
  // console.log(screen);
  // console.log(screen.queryAllByText(routes));
  const linkElement = screen.getByText(/Login/i);
  console.log(routes);
  expect(linkElement).toBeInTheDocument();
});
