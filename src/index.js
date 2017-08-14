import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// This should be updated to pull routes from Firebase, but we'll use this for now
const dummyRoutes = [
  {
    id: 1,
    startLocation: '2861 Salena St. St. Louis, MO 63118',
    endLocation: '8300 Maryland Ave. Clayton, MO 63105',
    departureTime: '8:30 AM',
    mode: 'DRIVING',
  },
  {
    id: 2,
    startLocation: '5223 Sutherland Ave. St. Louis, MO 63109',
    endLocation: '2861 Salena St. St. Louis, MO 63118',
    departureTime: '5:01 PM',
    mode: 'DRIVING',
  },
];

ReactDOM.render(<App routes={dummyRoutes} />, document.getElementById('root'));
registerServiceWorker();
