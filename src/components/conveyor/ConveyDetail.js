import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ConveyorDetail extends Component {
    displayName = ConveyorDetail.name;

    GetContentModal(status) {
        switch(status)
        {
            case '0':
                return <InvoiceModal />;
            default:
                return <DetailModal />;
        }
    }

    render() {
        let contentModal = this.GetContentModal('');
        return (
            <div>
                {contentModal}
            </div>
        );
    }
}

export class DetailModal extends Component {
    displayName = DetailModal.name;

    render() {
        return (
            <div className="card">
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title font-weight-bold">
                        CONVEYOR 1
                    </h4>
                    <div className="header-elements">
                        <Link to={'/'} className="close">
                            <span aria-hidden="true">&times;</span>
                        </Link>
                    </div>
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
                                <span className="font-weight-semibold">100%</span>
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
                                #11111111
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
                            <tr>
                                <td>551</td>
                                <td>50</td>
                                <td>15</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <ButtonField />
            </div>
        );
    }
}

export class ButtonField extends Component {
    displayName = ButtonField.name;

    renderButtonField(status) {
        switch (status)
        {
            default:
                return (
                    <div className="row">
                        <div className="col-xl-8"></div>
                        <div className="col-xl-2">
                            <button type="submit" className="btn btn-danger btn-lg btn-block">Cancel</button>
                        </div>
                        <div className="col-xl-2">
                            <button type="submit" className="btn btn-secondary btn-lg btn-block">Finish</button>
                        </div>
                    </div>
                );
            case '0':
                return (
                    <div className="row">
                        <div className="col-xl-8"></div>
                        <div className="col-xl-2">
                            <button type="submit" className="btn btn-danger btn-lg btn-block">Cancel</button>
                        </div>
                        <div className="col-xl-2">
                            <button type="submit" className="btn btn-success btn-lg btn-block">Resume</button>
                        </div>
                    </div>
                );
            case '1':
                return (
                    <div className="row">
                        <div className="col-xl-10"></div>
                        <div className="col-xl-2">
                            <button type="submit" className="btn btn-success btn-lg btn-block">Finish</button>
                        </div>
                    </div>
                );
        }
    }

    render () {
        let buttonField = this.renderButtonField('');

        return (
            <div className="card-footer">
                {buttonField}
            </div>
        );
    }
}

export class InvoiceModal extends Component {
    displayName = InvoiceModal.name;

    addNew() {

    }

    render() {
        return (
            <div className="card">
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title font-weight-bold">
                        CONVEYOR 1
                    </h4>
                    <div className="header-elements">
                        <Link to={'/'} className="close">
                            <span aria-hidden="true">&times;</span>
                        </Link>
                    </div>
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
