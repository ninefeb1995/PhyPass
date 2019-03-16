import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
    displayName = NavMenu.name;

    render() {
        return (
            <div class="navbar navbar-expand-md navbar-light fixed-top">
                <div class="navbar-header navbar-dark d-none d-md-flex align-items-md-center">
                    <div class="navbar-brand navbar-brand-md">
                        <Link to={'/'} class="d-inline-block">
                            <img src="global_assets/images/logo_light.png" alt="" />
                        </Link>
                    </div>

                    <div class="navbar-brand navbar-brand-xs">
                        <Link to={'/'} class="d-inline-block">
                            <img src="global_assets/images/logo_icon_light.png" alt="" />
                        </Link>
                    </div>
                </div>

                <div class="d-flex flex-1 d-md-none">
                    <div class="navbar-brand mr-auto">
                        <Link to={'/'} class="d-inline-block">
                            <img src="global_assets/images/logo_dark.png" alt="" />
                        </Link>
                    </div>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                        <i class="icon-tree5"></i>
                    </button>

                    <button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
                        <i class="icon-paragraph-justify3"></i>
                    </button>
                </div>

                <div class="collapse navbar-collapse" id="navbar-mobile">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
                                <i class="icon-paragraph-justify3"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}