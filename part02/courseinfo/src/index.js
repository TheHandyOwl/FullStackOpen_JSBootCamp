import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const course = {
  id: 1,
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    },
    {
      name: 'Redux',
      exercises: 11,
      id: 4
    }
  ]
}

ReactDOM.render(
  <React.StrictMode>
    <App course={course}/>
  </React.StrictMode>,
  document.getElementById('root')
);