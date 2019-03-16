import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';
import './lib/jquery';
import './lib/bootstrap';
import './lib/font-awesome';
import { HashRouter, Route } from 'react-router-dom';
import { Home } from './app/layout/home.component';

ReactDOM.render(
    <IntlProvider locale="en">
        <HashRouter>
            <div className="main">
                <Route exact path='/' component={Home} />
            </div>
        </HashRouter>
    </IntlProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
