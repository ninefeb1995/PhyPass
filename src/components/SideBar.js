import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SideBar extends Component {
    displayName = SideBar.name;

    render () {
        return (
            <div className="sidebar sidebar-dark sidebar-main sidebar-fixed sidebar-expand-md">

                <div className="sidebar-mobile-toggler text-center">
                    <a href="#" className="sidebar-mobile-main-toggle">
                        <i className="icon-arrow-left8"></i>
                    </a>
                    Navigation
				<a href="#" className="sidebar-mobile-expand">
                        <i className="icon-screen-full"></i>
                        <i className="icon-screen-normal"></i>
                    </a>
                </div>

                <div className="sidebar-content">
                    <div className="card card-sidebar-mobile">
                        <ul className="nav nav-sidebar" data-nav-type="accordion">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">
                                    <i className="icon-home4"></i>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/report'} className="nav-link">
                                    <i className="icon-home4"></i>
                                    <span>Report</span>
                                </Link>
                            </li>
                            <li className="nav-item nav-item-submenu">
                                <a href="#" className="nav-link"><i className="icon-copy"></i> <span>Options</span></a>
                                <ul className="nav nav-group-sub" data-submenu-title="Layouts">
                                    <li className="nav-item"><Link to={'/staff'} className="nav-link">Staff</Link></li>
                                    <li className="nav-item"><Link to={'/category'} className="nav-link">Categories</Link></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}