import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import 'utils/rem';
import 'assets/style/reset.scss';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector('#root')
);