import React, { Component } from 'react';
import * as EmployeeServices from '../../app/services/options/employee';

export class StaffList extends Component {
    displayName = StaffList.name;

    constructor(props) {
        super(props);
        this.state = {
            listStaff: []
        }
        this.userCreated = this.userCreated.bind(this);
        this.onDeleteStaff = this.onDeleteStaff.bind(this);
    }

    componentWillMount() {
        EmployeeServices.getListEmployee(1, 50, (res) => {
            if (res.data.err === 0) {
                this.setState({listStaff: res.data.data});
            }
        });
    }

    userCreated(data) {    
        if (data) {
            const temp = this.state.listStaff.slice();
            temp.push(data);
            this.setState({listStaff: temp});
        }
    }

    onDeleteStaff(id) {
        let listStaffTemp = this.state.listStaff.filter((item) => item.id !== id);
        this.setState({listStaff: listStaffTemp});
    }

    render() {
        const { listStaff } = this.state;

        return (
            <div className="card">
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title"><i className="icon-user-tie"></i><span> Staff Info</span></h4>
                </div>
                <div className="card-body d-sm-flex align-items-sm-center justify-content-sm-between flex-sm-wrap">
                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                        <button className="btn btn-success btn-sm btn-block" data-toggle="modal" data-target="#popupModal">Create</button>
                        <div className="modal fade" id="popupModal" tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg" role="document">
                                <CreateUserModal onCreateUser={this.userCreated}/>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                        
                    </div>
                    <div className="form-horizontal">
                        <div className="form-group form-group-feedback form-group-feedback-right">
                            <input type="search" className="form-control wmin-xl-300" placeholder="Search" />
                            <div className="form-control-feedback text-black-50">
                                <i className="icon-search4 font-size-lg"></i>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
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
                                    return <Staff onUserDeleted={this.onDeleteStaff} key={item.id} information={item} />
                                })}
                            </tbody>
                        </table>
                    </div>
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
            information: undefined
        }
        this.onUserEdited = this.onUserEdited.bind(this);
        this.onDeleteEmit = this.onDeleteEmit.bind(this);
    }

    componentWillMount() {
        const { information } = this.props;
        this.setState({information});
    }

    onUserEdited(data) {
        this.setState({information:data});
    }

    onDeleteEmit() {
        this.props.onUserDeleted(this.state.information.id);
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
        const { information } = this.state;
        
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
                    <button className="btn bg-transparent border-success text-success rounded-round border-2 btn-icon" data-toggle="modal" data-target="#popupEditModal" title="Edit User">
                        <i className="icon-pencil"></i>
                    </button>
                    <span style={{marginLeft: "2px"}}></span>
                    <button className="btn bg-transparent border-warning-400 text-warning-400 rounded-round border-2 btn-icon" data-toggle="modal" data-target="#popupRemoveModal" title="Remove User">
                        <i className="icon-bin"></i>
                    </button>
                    <div className="modal fade" id="popupEditModal" tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <EditUserModal baseData={information} onEditUser={this.onUserEdited} />
                        </div>
                    </div>
                    <div className="modal fade" id="popupRemoveModal" tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-sm modal-notify modal-danger" role="document">
                            <RemoveUserModal onDelete={this.onDeleteEmit} />
                        </div>
                    </div>
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
            if (res.data.err === 0) {
                this.props.onCreateUser(res.data.data);
            }
        });
    }

    render() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" style={{paddingTop: "0.3em"}}>CREATE STAFF</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div> 
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div className="position-relative row">
                            <label className="col-4 col-sm-2 col-form-label">Staff Name:</label>
                            <div className="col-6">
                                <input onChange={(e) => this.setState({employeeName:e.target.value})} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative row">
                            <label className="col-4 col-sm-2 col-form-label">Phone:</label>
                            <div className="col-6">
                                <input onChange={(e) => this.setState({phoneNumber:e.target.value})} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative form-group row">
                            <label className="col-4 col-sm-2 col-form-label">Role:</label>
                            <div className="col-6">
                                <select onChange={(e) => this.setState({ role: e.target.value })} className="form-control">
                                    <option value="1">Worker</option>
                                    <option value="2">Supervisor</option>
                                    <option value="3">Manager</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div>
                        <button data-dismiss="modal" className="btn btn-secondary btn-sm">Cancel</button>
                    </div>
                    <div>
                        <button onClick={() => this.onClickCreateUser()} data-dismiss="modal" className="btn btn-success btn-sm">Create User</button>
                    </div>
                </div>             
            </div>
        );
    }
}

export class EditUserModal extends Component {
    displayName = EditUserModal.name;

    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            phoneNumber: '',
            role: 1
        };
    }

    componentWillMount() {
        this.setState({
            employeeName: this.props.baseData.name,
            phoneNumber: this.props.baseData.phone,
            role: this.props.baseData.role
        });
    }

    onClickEditUser() {
        let data = {
            id: this.props.baseData.id,
            name: this.state.employeeName,
            phone: this.state.phoneNumber,
            role: this.state.role
        }
        EmployeeServices.updateEmployee(data, (res) => {
            if (res.data.err === 0) {
                this.props.onEditUser(res.data.data);
            }
        });
    }

    render() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" style={{paddingTop: "0.3em"}}>Edit Staff</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div> 
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div className="position-relative row">
                            <label className="col-4 col-sm-2 col-form-label">Staff Name:</label>
                            <div className="col-6">
                                <input onChange={(e) => this.setState({employeeName:e.target.value})} value={this.state.employeeName} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative row">
                            <label className="col-4 col-sm-2 col-form-label">Phone:</label>
                            <div className="col-6">
                                <input onChange={(e) => this.setState({phoneNumber:e.target.value})} value={this.state.phoneNumber} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative form-group row">
                            <label className="col-4 col-sm-2 col-form-label">Role:</label>
                            <div className="col-6">
                                <select onChange={(e) => this.setState({ role: e.target.value })} className="form-control">
                                    <option value="1">Worker</option>
                                    <option value="2">Supervisor</option>
                                    <option value="3">Manager</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div>
                        <button data-dismiss="modal" className="btn btn-secondary">Cancel</button>
                    </div>
                    <div>
                        <button onClick={() => this.onClickEditUser()} data-dismiss="modal" className="btn btn-success">Edit User</button>
                    </div>
                </div>             
            </div>
        );
    }
}

export class RemoveUserModal extends Component {
    displayName = RemoveUserModal.name;

    render () {
        return (
            <div class="modal-content text-center">
                <div class="modal-header d-flex justify-content-center bg-danger">
                    <h4 className="modal-title">Are you sure?</h4>
                </div>
                <div class="modal-body">
                    <button class="btn bg-transparent border-warning-400 text-warning-400 rounded-round border-2 btn-icon"><i class="icon-bin"></i></button>
                </div>
                <div class="modal-footer flex-center">
                    <div>
                        <button onClick={() => this.props.onDelete()} data-dismiss="modal" className="btn btn-outline-danger waves-effect waves-light">Yes</button>
                    </div>
                    <a type="button" class="btn btn-danger waves-effect" data-dismiss="modal">No</a>
                </div>
            </div>
        );
    }
}
