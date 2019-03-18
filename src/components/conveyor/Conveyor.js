import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import * as DashBoardService from '../../app/services/dashboard';

export class Conveyor extends Component {
    displayName = Conveyor.name;
    state = {
        openConveyorDetailModal: false,
        openNewInvoiceModal: false
    }
 
    constructor(props) {
        super(props);
    }

    getBgColorClassName(status) {
        switch (status) {
            default:
                return '';
            case 1:
                return 'bg-dark-alpha';
            case 2:
                return 'bg-blue-800';
            case 4: 
                return 'bg-orange-800';
            case 8:
                return 'bg-green-800';
        }
    }

    onOpenModal(status) {
        if(status === 1)
        {
            this.setState({openNewInvoiceModal: true});
        }
        else
        {
            this.setState({openConveyorDetailModal: true});
        }
    }

    onCloseConveyorDetailModal = () => {
        this.setState({openConveyorDetailModal: false});
    }

    onCloseNewInvoiceModal = () => {
        this.setState({openNewInvoiceModal: false});
    }

    render() {
        const { information } = this.props;
        const { openConveyorDetailModal, openNewInvoiceModal } = this.state;

        return (
            <div className="card">
                <div className={"card-body " + this.getBgColorClassName(information.status)} onClick={this.onOpenModal.bind(this, information)} style={{cursor : 'pointer'}}>
                    <div className="d-flex jc-center">
                        <div className="btn rounded-round btn-xl bg-white">
                            {information.stats * 100} %
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="ta-center">
                            <h4 className="font-xx-large">
                                Conveyor {information.id}
                            </h4>
                            <Link to={'/staff/details'} className="font-small">
                                {information.staff ? information.staff.name : ''}
                            </Link>
                        </div>
                    </div>
                </div>
                <Modal open={openConveyorDetailModal} onClose={this.onCloseConveyorDetailModal} center >
                    <ConveyorDetailModal baseConveyorInfo={information} />
                </Modal>
                <Modal open={openNewInvoiceModal} onClose={this.onCloseNewInvoiceModal} center>
                    <NewInvoiceModal />
                </Modal>
            </div>
        );
    }
}

export class ConveyorDetailModal extends Component {
    displayName = ConveyorDetailModal.name;

    constructor(props) {
        super(props);     
        this.state = {
            conveyorDetail: null
        };
    }

    componentDidMount() {
        const { baseConveyorInfo } = this.props;
        DashBoardService.getInvoiceDetail(baseConveyorInfo.id, (data) => {
            if (data.data.err === 0) {         
                this.setState({conveyorDetail: data.data.data});
            }
        });
    }

    render() {
        return (
            this.state.conveyorDetail ? 
            <div>
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title font-weight-bold">
                        CONVEYOR {this.state.conveyorDetail.conveyor.id}
                    </h4>
                </div>
                <div className="card-body align-items-sm-center justify-content-sm-between flex-sm-wrap">
                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                        <div>
                            <h4 className="card-title">
                                STATUS:
                            </h4>
                        </div>
                        <div className="ml-3">
                            <h4 className="card-title">
                                <span className="font-weight-semibold">{this.state.conveyorDetail.stats * 100} %</span>
                            </h4>
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                        <div>
                            <h4 className="card-title">
                                INVOICE:
                            </h4>
                        </div>
                        <div className="ml-3">
                            <h4 className="card-title">
                                #{this.state.conveyorDetail.code}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table text-nowrap">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Target</th>
                                <th>In</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.conveyorDetail.details.map((value) => {
                                return <tr>
                                        <td>{value.skuId}</td>
                                        <td>{value.targetQuantity}</td>
                                        <td>{value.currentQuantity}</td>
                                    </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <ButtonField status={this.props.baseConveyorInfo.status} />
            </div>
            : <div></div>
        );
    }
}

export class ButtonField extends Component {
    displayName = ButtonField.name;

    constructor(props) {
        super(props);
    }

    renderButtonField(status) {
        switch (status)
        {
            default:
                return (
                    <div className="row">
                        
                    </div>
                );
            case 2:
                return (
                    <div className="row">
                        <div className="col-xl-10"></div>
                        <div className="col-xl-2">
                            <button className="btn btn-danger btn-lg btn-block">Cancel</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="row">
                        <div className="col-xl-8"></div>
                        <div className="col-xl-2">
                            <button className="btn btn-danger btn-lg btn-block">Cancel</button>
                        </div>
                        <div className="col-xl-2">
                            <button className="btn btn-success btn-lg btn-block">Resume</button>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="row">
                        <div className="col-xl-10"></div>
                        <div className="col-xl-2">
                            <button className="btn btn-success btn-lg btn-block">Finish</button>
                        </div>
                    </div>
                );
        }
    }

    render () {
        const status = this.props.status;

        return (
            <div className="card-footer">
                {this.renderButtonField(status)}
            </div>
        );
    }
}

export class NewInvoiceModal extends Component {
    displayName = NewInvoiceModal.name;

    addNew() {

    }

    render() {
        return (
            <div>
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title font-weight-bold">
                        CONVEYOR 1
                    </h4>
                </div>
                <div className="card-body align-items-sm-center justify-content-sm-between flex-sm-wrap">
                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                        <div>
                            <h4 className="card-title">
                                STATUS:
                            </h4>
                        </div>
                        <div className="ml-3">
                            <h4 className="card-title">
                                <span className="font-weight-semibold"></span>
                            </h4>
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                        <div>
                            <h4 className="card-title">
                                INVOICE:
                            </h4>
                        </div>
                        <div className="ml-3">
                            <div className="form-group">
                                <select className="form-control" id="invoiceID">
                                    <option>None</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-3 mb-sm-0">
                        <div>
                            <h4 className="card-title">
                                EMPLOYEE:
                            </h4>
                        </div>
                        <div className="ml-3">
                            <div className="form-group">
                                <select className="form-control" id="invoiceID">
                                    <option>None</option>
                                    <option>Nguyen Van A</option>
                                    <option>B</option>
                                    <option>C</option>
                                    <option>D</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table text-nowrap">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Target</th>
                                <th>In</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyID">
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <select className="form-control" id="invoiceID">
                                            <option>None</option>
                                            <option>551</option>
                                            <option>22</option>
                                            <option>333</option>
                                            <option>444</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="targetID" />
                                    </div>
                                </td>
                                <td className="bg-darken-3">0</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td align="right">
                                    <button className="btn btn-outline-dark btn-lg" onClick={this.addNew()}>Add New</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="card-footer">
                    <div className="row">
                        <div className="col-xl-10"></div>
                        <div className="col-xl-2">
                            <button className="btn btn-success btn-lg btn-block">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
