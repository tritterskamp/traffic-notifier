import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import App from './components/App';
import Form from './components/Form';
import Results from './components/Results';

render(
  <Router>
    <div id="container">
      <Route path="/" component={Login} />
      <Route path="/admin" component={App} />
      <Route path="/new" component={Form} />
      <Route path="/saved" component={Results} />
    </div>
  </Router>,
  document.getElementById('root')
);
