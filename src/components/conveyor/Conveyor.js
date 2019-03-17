import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Conveyor extends Component {
    displayName = Conveyor.name;
    
    render() {
        return (
            <div className="card">
                <div className="card-body bg-danger-800">
                    <div className="d-flex jc-center">
                        <Link to={'/conveyor/details'} className="btn rounded-round btn-xl bg-white">
                            100%
                        </Link>
                    </div>
                    <div className="card-content">
                        <div className="text-center">
                            <Link to={'/conveyor/details'} className="font-xx-large">
                                Conveyor 1
                            </Link>
                            <br />
                            <Link to={'/staff/details'} className="font-small">
                                Nguyễn Viết Hùng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}