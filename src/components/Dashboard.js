import React, { Component } from 'react';
import { Conveyor } from './conveyor/Conveyor';

export class Dashboard extends Component {
    displayName = Dashboard.name;

    render() {
        return (
            <div className="row">
                <div className="col-lg-4">
                    <Conveyor />
                </div>

                <div className="col-lg-4">
                    <Conveyor />
                </div>

                <div className="col-lg-4">
                    <Conveyor />
                </div>
            </div>
        );
    }
}