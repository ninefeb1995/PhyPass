import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { SideBar } from './SideBar';

export class Layout extends Component {
    displayName = Layout.name;

    render() {
        return(
            <div id="page" class="navbar-top">
                <NavMenu />

                <div class="page-content">
                    <SideBar />

                    <div class="content-wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}