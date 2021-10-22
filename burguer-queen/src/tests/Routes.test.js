/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Routes from '../routes/Routes';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Routes />, div);
});

// test('redirects to login page', () => {
//   const history = createMemoryHistory();
//   render(
//     <Router history={history}>
//       <Routes signedInUser={null} />
//     </Router>,
//     node,
//   );
//   expect(history.location.pathname).toBe('/');
// });

// test('renders Routes', () => {
//   const { getByTestId, container } = render(<Routes />);
//   console.log(render(<Routes />));
//   console.log(container);
//   expect(getByTestId('Route')).toHaveTextContent('Login');
// });
