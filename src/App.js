import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Report } from './components/Report';
import { Staff } from './components/staff/Staff';
import { Category } from './components/category/Category';
import { ConveyorDetail } from './components/conveyor/ConveyDetail';

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/report' component={Report} />
        <Route exact path='/staff' component={Staff} />
        <Route exact path='/category' component={Category} />
        <Route exact path='/conveyor/details' component={ConveyorDetail} />
      </Layout>
    );
  }
}
