import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Conveyor extends Component {
    displayName = Conveyor.name;
    
    constructor(props) {
        super(props);
    }

    render() {
        const { information } = this.props;
        console.log(information);
        return (
            <div className="card">
                <div className="card-body bg-danger-800">
                    <div className="d-flex jc-center">
                        <Link to={'/conveyor/details'} className="btn rounded-round btn-xl bg-white">
                            {information.stats * 100} %
                        </Link>
                    </div>
                    <div className="card-content">
                        <div className="ta-center">
                            <Link to={'/conveyor/details'} className="font-xx-large">
                                Conveyor {information.id}
                            </Link>
                            <br />
                            <Link to={'/staff/details'} className="font-small">
                                {information.staff ? information.staff.name : ''}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}