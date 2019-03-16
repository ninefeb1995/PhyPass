import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

export class Layout extends Component {
    displayName = Layout.name;

    render() {
        return(
            <div class="app">
                <nav class="app-header navbar navbar-expand navbar-dark bg-dark navbar-fixed-top">
                    <Link class="navbar-brand" to={'/'}>
                    </Link>
                </nav>
                <div class="container-fluid">
                    <div class="app-body row">
                        <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 bg-dark">
                            <ul class="sidebar navbar-nav">
                                <li class="nav-item active">
                                    <Link class="nav-link" to={'/'}>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to={'/'}>
                                        <span>Report</span>
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to={'/'}>
                                        <span>Options</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}