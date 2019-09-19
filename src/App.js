import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Home } from './components/home/Home';
import Auth from './components/authentication/Authentication';
import history from './history';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from './components/error-handler/ErrorBoundary';

const auth = new Auth();

const Routes = () => (
  <ErrorBoundary>
    <Router history={history} component={Home}>
      <Route render={(props) => <Home auth={auth} {...props} />} />
    </Router>
  </ErrorBoundary>
);

export default Routes;
