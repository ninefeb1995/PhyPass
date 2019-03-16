import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SideBar extends Component {
    displayName = SideBar.name;

    render () {
        return (
            <div className="sidebar sidebar-dark sidebar-main sidebar-fixed sidebar-expand-md">

                <div class="sidebar-mobile-toggler text-center">
                    <a href="#" class="sidebar-mobile-main-toggle">
                        <i class="icon-arrow-left8"></i>
                    </a>
                    Navigation
				<a href="#" class="sidebar-mobile-expand">
                        <i class="icon-screen-full"></i>
                        <i class="icon-screen-normal"></i>
                    </a>
                </div>

                <div class="sidebar-content">
                    <div class="card card-sidebar-mobile">
                        <ul class="nav nav-sidebar" data-nav-type="accordion">
                            <li class="nav-item">
                                <Link to={'/'} class="nav-link">
                                    <i class="icon-home4"></i>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/'} class="nav-link">
                                    <i class="icon-home4"></i>
                                    <span>Report</span>
                                </Link>
                            </li>
                            <li class="nav-item nav-item-submenu">
                                <a href="#" class="nav-link"><i class="icon-copy"></i> <span>Options</span></a>
                                <ul class="nav nav-group-sub" data-submenu-title="Layouts">
                                    <li class="nav-item"><Link to={'/'} class="nav-link">Staff</Link></li>
                                    <li class="nav-item"><Link to={'/'} class="nav-link">Categories</Link></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}