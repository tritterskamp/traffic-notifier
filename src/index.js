import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const Root = (props) => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

render(<Root />, document.getElementById('root'));
