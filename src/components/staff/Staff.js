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
        this.onDeleteStaff = this.onDeleteStaff.bind(this);
    }

    componentWillMount() {
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
        if (data) {
            const temp = this.state.listStaff.slice();
            temp.push(data);
            this.setState({listStaff: temp});
            this.onCloseModal();
        }
    }

    onDeleteStaff(id) {
        let listStaffTemp = this.state.listStaff.filter((item) => item.id !== id);
        this.setState({listStaff: listStaffTemp});
        this.onCloseModal();
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
                        <Modal open = {open} onClose={this.onCloseModal} center classNames={{overlay: "overlay-div-modal", modal: "modal-div-modal-xl", closeButton: "close-button-modal"}}>
                            <CreateUserModal onClose={this.onCloseModal} onCreateUser={this.userCreated} />
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
                              return <Staff onUserDeleted={this.onDeleteStaff} key={item.id} information={item} />
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
            openEditUserModal: false,
            openRemoveUserModal: false,
            information: undefined
        }
        this.onUserEdited = this.onUserEdited.bind(this);
        this.onDeleteEmit = this.onDeleteEmit.bind(this);
    }

    componentWillMount() {
        const { information } = this.props;
        this.setState({information});
    }

    onOpenEditUserModal = () => {
        this.setState({openEditUserModal: true});
    }

    onCloseEditUserModal = () => {
        this.setState({openEditUserModal: false});
    }

    onOpenRemoveUserModal = () => {
        this.setState({openRemoveUserModal: true});
    }

    onCloseRemoveUserModal = () => {
        this.setState({openRemoveUserModal: false});
    }

    onUserEdited(data) {
        this.setState({information:data});
        this.onCloseEditUserModal();
    }

    onDeleteEmit() {
        this.props.onUserDeleted(this.state.information.id);
        this.onCloseRemoveUserModal();
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
        const { openEditUserModal, openRemoveUserModal, information } = this.state;
        
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
                    <button className="btn bg-transparent border-success text-success rounded-round border-2 btn-icon" onClick={this.onOpenEditUserModal} title="Edit User">
                        <i className="icon-pencil"></i>
                    </button>
                    <i style={{marginLeft: "1px"}}></i>
                    <button className="btn bg-transparent border-warning-400 text-warning-400 rounded-round border-2 btn-icon" onClick={this.onOpenRemoveUserModal} title="Remove User">
                        <i className="icon-bin"></i>
                    </button>
                    <Modal open={openEditUserModal} onClose={this.onCloseEditUserModal} center classNames={{overlay: "overlay-div-modal", modal: "modal-div-modal-xl", closeButton: "close-button-modal"}}>
                        <EditUserModal onClose={this.onCloseEditUserModal} baseData={information} onEditUser={this.onUserEdited} />
                    </Modal>
                    <Modal open={openRemoveUserModal} onClose={this.onCloseRemoveUserModal} center classNames={{overlay: "overlay-div-modal", modal: "modal-div-modal-sm", closeButton: "close-button-modal"}}>
                        <RemoveUserModal onClose={this.onCloseRemoveUserModal} onDelete={this.onDeleteEmit} />
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
            if (res.data.err === 0) {
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
                                            <button onClick={() => this.props.onClose()} className="btn btn-secondary btn-lg btn-block">Cancel</button>
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
            <div>
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title">Edit Staff</h4>
                </div>
                <div className="table-responsive">
                    <table className="table text-nowrap">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input onChange={(e) => this.setState({employeeName:e.target.value})} value={this.state.employeeName} type="text" className="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>
                                <input onChange={(e) => this.setState({phoneNumber:e.target.value})} value={this.state.phoneNumber} type="number" className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>
                                    <select onChange={(e) => this.setState({role:e.target.value})} value={this.state.role} className="form-control">
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
                                            <button onClick={() => this.props.onClose()} className="btn btn-secondary btn-lg btn-block">Cancel</button>
                                        </div>
                                        <div className="col-xl-3">
                                            <button onClick={() => this.onClickEditUser()} className="btn btn-success btn-lg btn-block">Edit User</button>
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

export class RemoveUserModal extends Component {
    displayName = RemoveUserModal.name;

    render () {
        return (
            <div>
                <div className="card-header header-elements-sm-inline">
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6 text-center">
                            <h5 className="card-title">Are you sure to remove this user?</h5>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-2">
                            <button onClick={() => this.props.onClose()} className="btn btn-sm btn-block">No</button>
                        </div>
                        <div className="col-sm-2">
                            <button onClick={() => this.props.onDelete()} className="btn btn-primary btn-sm btn-block">Yes</button>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                </div>
            </div>
        );
    }
}
