import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export class Report extends Component {
    displayName = Report.name;
    state = {
        open: false
    }

    onOpenModal = () => {
        this.setState({open: true});
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

    render() {
        const {open} = this.state;

        return (
            <div className="card">
                <div className="card-header header-elements-inline">
                    <div className="header-elements-inline">
                        <button className="btn btn-success btn-sm btn-block" onClick={this.onOpenModal}>New Report Template</button>
                        <Modal open={open} onClose={this.onCloseModal} center classNames={{overlay: "overlay-div-modal", modal: "modal-div-modal-xl", closeButton: "close-button-modal"}}>
                            <NewReportTemplateModal />
                        </Modal>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table text-nowrap">
                            <thead>
                                <th>Report Subject</th>
                                <th>Visualization</th>
                                <th>Metric</th>
                                <th>Period</th>
                                <th>Granularity</th>
                            </thead>
                            <tbody>
                                <DataRow />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export class DataRow extends Component {
    displayName = DataRow.name;

    render () {
        return (
            <tr>
                <td>Sale Invoice</td>
                <td>Pie Chart</td>
                <td>Unit</td>
                <td>Daily</td>
                <td>Hourly</td>
            </tr>
        );
    }
}

export class NewReportTemplateModal extends Component {
    displayName = NewReportTemplateModal.name;

    render() {
        return (
            <div>
                <div className="card-header header-elements-sm-inline">
                    <h4 className="card-title">REPORT TEMPLATE</h4>
                </div>
                <div className="table-reponsive">
                    <div>
                        <input type="text" className="form-control" defaultValue="Sale Invoice" />
                    </div>
                    <div>
                        <input type="text" className="form-control" defaultValue="Type" />
                    </div>
                    <div>
                        <input type="text" className="form-control" defaultValue="Store" />
                    </div>
                    <div className="card">
                        <div className="card-header header-elements-sm-inline">
                            <h6 className="card-title">Date Range</h6>
                        </div>
                        <div className="card-body">
                            <div>
                                <select className="form-control">
                                    <option>Yearly</option>
                                    <option>Monthly</option>
                                    <option>Weekly</option>
                                    <option>Daily</option>
                                    <option>Hourly</option>
                                </select>
                            </div>
                            <div>
                                <select className="form-control">
                                    <option>Yearly</option>
                                    <option>Monthly</option>
                                    <option>Weekly</option>
                                    <option>Daily</option>
                                    <option>Hourly</option>
                                </select>
                            </div>
                            <div className="card-footer row">
                                <div className="col-sm-6">
                                </div>
                                <div className="col-sm-3">
                                    <button className="btn btn-danger btn-sm btn-block">Previous Step</button>
                                </div>
                                <div className="col-sm-3">
                                    <button className="btn btn-success btn-sm btn-block">Next Step</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="text" className="form-control" defaultValue="Metrics" />
                    </div>
                    <div>
                        <input type="text" className="form-control" defaultValue="Visualization" />
                    </div>
                    <div className="card-footer row">
                        <div className="col-sm-6">
                        </div>
                        <div className="col-sm-3">
                            <button className="btn btn-sm btn-block">Cancel</button>
                        </div>
                        <div className="col-sm-3">
                            <button className="btn btn-success btn-sm btn-block">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
