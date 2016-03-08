
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';
localStorage.setItem('debug', 'true'); // SET TO FALSE OR DELETE THIS LINE TO PERSIST THE DATA.
persist(alt, storage, 'app');

ReactDOM.render(<App />, document.getElementById('app'));