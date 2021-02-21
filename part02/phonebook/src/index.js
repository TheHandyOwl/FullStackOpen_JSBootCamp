import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const persons = [
  { name: 'Arto Hellas', number: '123 456 789' },
  { name: 'Ada Lovelace', number: '532 352 355' },
  { name: 'Dan Abramov', number: '124 234 345' },
  { name: 'Mary Poppendieck', number: '392 364 231' }
]

ReactDOM.render(
  <React.StrictMode>
    <App persons={persons} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
