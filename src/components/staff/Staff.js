import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import * as EmployeeServices from '../../app/services/options/employee';

export class StaffList extends Component {
    displayName = StaffList.name;

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            listStaff: []
        }
        this.userCreated = this.userCreated.bind(this);
    }

    componentDidMount() {
        EmployeeServices.getListEmployee(1, 50, (res) => {
            if (res.data.err === 0) {
                this.setState({listStaff: res.data.data});
            }
        });
    }

    onOpenModal = () => {
        this.setState({open: true});
    }

    onCloseModal = () => {
        this.setState({open: false});
    }

    userCreated(data) {
        const temp = this.state.listStaff.slice();
        temp.push(data);
        if (data) {
            this.setState({listStaff: temp});
        }
    }

    render() {
        const { open, listStaff } = this.state;

        return (
            <div className="card">
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title"><i className="icon-users4"></i>  Staff Info</h4>
                </div>
                <div className="card-body d-sm-flex align-items-sm-center justify-content-sm-between flex-sm-wrap">
                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                        <button className="btn btn-success btn-sm btn-block" onClick={this.onOpenModal}>Create</button>
                        <Modal open = {open} onClose={this.onCloseModal} center>
                            <CreateUserModal onCreateUser={this.userCreated} />
                        </Modal>
                    </div>
                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                        
                    </div>
                    <div>
                        <div className="form-group form-group-feedback form-group-feedback-right">
                            <input type="search" className="form-control bg-light-alpha wmin-xl-300" placeholder="Search" />
                            <div className="form-control-feedback text-black-50">
                                <i className="icon-search4 font-size-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table text-nowrap">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listStaff.map((item) => {
                              return <Staff information={item} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export class Staff extends Component {
    displayName = Staff.name;

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    onOpenModal = () => {
        this.setState({open: true});
    }

    onCloseModal = () => {
        this.setState({open: false});
    }

    parseRole(id) {
        switch(id) {
            case 1:
                return 'Worker';
            case 2:
                return 'Supervisor';
            case 3:
                return 'Manager';
            default:
                return 'Unknown';
        }
    }

    render() {
        const { open } = this.state;
        const { information } = this.props;

        return (
            <tr>
                <td>
                    {information.id}
                </td>
                <td>

                </td>
                <td>
                    {information.name}
                </td>
                <td>
                    {information.phone}
                </td>
                <td>
                    {this.parseRole(information.role)}
                </td>
                <td>
                    <button className="btn bg-transparent border-success text-success rounded-round border-2 btn-icon" onClick={this.onOpenModal}>
                        <i className="icon-pencil"></i>
                    </button>
                    <Modal open = {open} onClose={this.onCloseModal} center>
                        <EditUserModal />
                    </Modal>
                </td>
            </tr>
        );
    }
}

export class CreateUserModal extends Component {
    displayName = CreateUserModal.name;

    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            phoneNumber: '',
            role: 1
        };
    }

    onClickCreateUser() {
        let data = {
            name: this.state.employeeName,
            phone: this.state.phoneNumber,
            role: this.state.role
        }
        EmployeeServices.addNewEmployee(data, (res) => {
            if (res && res.data && res.data.err && res.data.err === 0) {
                this.props.onCreateUser(res.data.data);
            }
        });
    }

    render() {
        return (
            <div>
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title">Create Staff</h4>
                </div>
                <div className="table-responsive">
                    <table className="table text-nowrap">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input onChange={(e) => this.setState({employeeName:e.target.value})} type="text" className="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>
                                    <input onChange={(e) => this.setState({phoneNumber:e.target.value})} type="number" className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>
                                    <select onChange={(e) => this.setState({role:e.target.value})} className="form-control">
                                        <option value="1">Worker</option>
                                        <option value="2">Supervisor</option>
                                        <option value="3">Manager</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div className="row">
                                        <div className="col-xl-7"></div>
                                        <div className="col-xl-2">
                                            <button className="btn btn-secondary btn-lg btn-block">Cancel</button>
                                        </div>
                                        <div className="col-xl-3">
                                            <button onClick={() => this.onClickCreateUser()} className="btn btn-success btn-lg btn-block">Create User</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export class EditUserModal extends Component {
    displayName = EditUserModal.name;

    render() {
        return (
            <div>
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title">Create Staff</h4>
                </div>

                <div className="table-responsive">
                    <table className="table text-nowrap">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input type="text" className="form-control" value="Nguyen Viet Hung"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>
                                    <input type="number" className="form-control" value="0123456789"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>
                                    <select className="form-control">
                                        <option>President</option>
                                        <option>Director</option>
                                        <option>Manager</option>
                                        <option>Leader</option>
                                        <option>Staff</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div className="row">
                                        <div className="col-xl-7"></div>
                                        <div className="col-xl-2">
                                            <button className="btn btn-secondary btn-lg btn-block">Cancel</button>
                                        </div>
                                        <div className="col-xl-3">
                                            <button className="btn btn-success btn-lg btn-block">Edit User</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
