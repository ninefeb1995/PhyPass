import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { SideBar } from './SideBar';

export class Layout extends Component {
    displayName = Layout.name;

    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout();
    }

    render() {
        return(
            <div id="page" className="navbar-top">
                <NavMenu logout={this.onLogout} />
                <div className="page-content">
                    <SideBar />
                    <div className="bg-white content-wrapper">
                        <div className="page-header">
                            <div className="page-header-content header-elements-md-inline">
                            </div>
                        </div>
                        <div className="content pt-0">
                            <div className="row">
                                <div className="col-xl-12">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}