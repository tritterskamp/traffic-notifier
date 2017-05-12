import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

import App from './components/App';
import AdminPanel from './components/AdminPanel';
import Form from './components/Form';
import Results from './components/Results';

render(
  <Router>
    <Route path="/" component={App}>
        <IndexRoute component={AdminPanel} />
        <Route path="/new" component={Form} />
        <Route path="/saved" component={Results} />
    </Route>
  </Router>,
  document.getElementById('root')
);
