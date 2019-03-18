import React, { Component } from 'react';
import { Conveyor } from './conveyor/Conveyor';
import * as DashBoardService from '../app/services/dashboard';

export class Dashboard extends Component {
    displayName = Dashboard.name;

    constructor(props) {
        super(props);
        this.state = {
            listConveyors: []
        };
    }

    componentDidMount() {
        DashBoardService.getListOfConveyor(1, 50, (data) => {
            if (data.data.err === 0) {
                this.setState({listConveyors: data.data.data});
            }
        });
    }
    renderConveyor = () => {
        let conveyors = [];
        for (let i = 0; i < this.state.listConveyors.length; i++) {
            let item = 
                <div key={i} className="col-lg-3">
                    <Conveyor information = {this.state.listConveyors[i]} />
                </div>
            conveyors.push(item);
        }
        return conveyors;
    }

    render() {
        return (
            <div className="row">
                {this.renderConveyor()}
            </div>
        );
    }
}
