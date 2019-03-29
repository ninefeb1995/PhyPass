import React, { Component } from 'react';
import * as LoginService from '../../app/services/login';
import Message from '../../app/constants/message';

export class Login extends Component {
    displayName = Login.name;
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: Message.LOGIN.WRONG_AUTHENTICATION,
            isError: false
        };
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                document.getElementById('btnLogin').click();
            }
        });
    }

    onLogin() {
        if (this.state.username && this.state.password) {
            LoginService.basicAuthentication(this.state.username, this.state.password, (res) => {
                if (res.data.err === 0) {
                    this.setState({isError: false});
                    this.props.login();
                } else {
                    this.setState({isError: true});
                }
            });
        }
    }

    render () {
        return (
            <div className="container-fluid" style={{marginTop: '10rem', marginBottom: 'auto'}}>
                <div className="row">
                    <div className="col-1 col-sm-2 col-md-3 col-xl-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-xl-4">
                        <div className="card" style={{border: '1px solid silver'}}>
                            <div className="card-header bg-blue-700" style={{borderBottom: '1px solid silver'}}>
                                <h4 className="px-xl-5">Please login to continue...</h4>
                            </div>
                            <div className="card-body">
                                <div className="px-xl-5">
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
                                {this.state.isError ? 
                                <div className="login-error-message">
                                <span>{this.state.errorMessage}</span>
                                </div>: null}
                                
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button onClick={() => this.onLogin()} id="btnLogin" className="btn btn-primary rounded-round w-xl-50 w-md-50 w-sm-75 w-100" style={{border:'1px solid #2196f3'}}>Login</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-xl-4"></div>
                </div>
            </div>
        );
    }
}
