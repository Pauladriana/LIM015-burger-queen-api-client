import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', { scope: '/' })
    .then((reg) => console.info('Registro de SW exitoso', reg))
    .catch((err) => console.warn('Error al tratar de registrar el sw', err));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
