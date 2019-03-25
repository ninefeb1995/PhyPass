import React, { Component } from 'react';

export class Login extends Component {
    displayName = Login.name;
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    onLogin() {
        if (this.state.username === 'thinhle' && this.state.password === 'thinhle') {
            this.props.login();
        }
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4">
                        <div className="card">
                            <div className="card-header bg-blue">Login</div>
                            <div className="card-body">
                                <div className="form">
                                    <div className="position-relative form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-user"></i>
                                                </span>
                                            </div>
                                            <input onChange={(e) => this.setState({username:e.target.value})} className="form-control" type="text" placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="position-relative form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-key"></i>
                                                </span>
                                            </div>
                                            <input onChange={(e) => this.setState({password:e.target.value})} className="form-control" type="password" placeholder="Password" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => this.onLogin()} className="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4"></div>
                </div>
            </div>
        );
    }
}