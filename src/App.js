import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Report } from './components/report/Report';
import { StaffList } from './components/staff/Staff';
import { CategoryList } from './components/category/Category';

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/report' component={Report} />
        <Route exact path='/staff' component={StaffList} />
        <Route exact path='/category' component={CategoryList} />
      </Layout>
    );
  }
}
