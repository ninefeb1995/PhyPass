import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
    displayName = NavMenu.name;

    constructor(props) {
        super(props);
        this.onLoggedOut = this.onLoggedOut.bind(this);
    }

    onLoggedOut() {
        this.props.logout();
    }

    render() {
        return (
            <div className="navbar navbar-expand-md navbar-light fixed-top">
                <div className="navbar-header navbar-dark d-none d-md-flex align-items-md-center">
                    <div className="navbar-brand navbar-brand-md">
                        <Link to={'/'} className="d-inline-block">
                            <img src="global_assets/images/logo_light.png" alt="" />
                        </Link>
                    </div>
                    <div className="navbar-brand navbar-brand-xs">
                        <Link to={'/'} className="d-inline-block">
                            <img src="global_assets/images/logo_icon_light.png" alt="" />
                        </Link>
                    </div>
                </div>
                <div className="d-flex flex-1 d-md-none">
                    <div className="navbar-brand mr-auto">
                        <Link to={'/'} className="d-inline-block">
                            <img src="global_assets/images/logo_dark.png" alt="" />
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                        <i className="icon-tree5"></i>
                    </button>
                    <button className="navbar-toggler sidebar-mobile-main-toggle" type="button">
                        <i className="icon-paragraph-justify3"></i>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbar-mobile">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#" className="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
                                <i className="icon-paragraph-justify3"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="navbar-mobile">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown dropdown-user">
                            <a href="#" className="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
                                <img src="global_assets/images/placeholders/placeholder.jpg" className="rounded-circle mr-2" height="34" alt="" />
                                <span>User Name</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <button onClick={this.onLoggedOut} className="dropdown-item"><i className="icon-switch2"></i> Logout</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
