/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import Routes from '../routes/Routes';

test('renders learn react link', () => {
  render(<Routes />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
