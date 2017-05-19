import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App';
import AdminPanel from './components/AdminPanel';
import Form from './components/Form';
import Results from './components/Results';

const Root = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={App} />
        <Route path="/new" component={Form} />
        <Route path="/saved" component={Results} />
      </div>
    </BrowserRouter>
  )
}

render(<Root />, document.getElementById('root'));
