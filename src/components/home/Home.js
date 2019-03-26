import React, { Component } from 'react';
import { Layout } from '../Layout';
import { Login } from '../login/Login';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { Report } from '../../components/report/Report';
import { StaffList } from '../../components/staff/Staff';
import { CategoryList } from '../../components/category/Category';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login = () => {
        this.props.auth.login(this.props.match);
    }

    logout = () => {
        this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return isAuthenticated() ?
            <Layout logout={this.logout}>
                <Switch>
                    <Route exact path='/report' component={Report} />
                    <Route exact path='/staff' component={StaffList} />
                    <Route exact path='/category' component={CategoryList} />
                    <Route component={Dashboard} />
                </Switch>
                <ToastContainer />
            </Layout>:
            <Login login={this.login}></Login>;
    }
}
