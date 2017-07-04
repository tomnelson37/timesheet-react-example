import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import es6Promise from 'es6-promise';
es6Promise.polyfill();
import 'isomorphic-fetch';

ReactDOM.render(
  <App></App>,
  document.getElementById('content')
);

