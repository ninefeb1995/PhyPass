import React, { Component } from 'react';

export class Report extends Component {
    displayName = Report.name;

    render() {

        return (
            <div className="card">
                <div className="card-header header-elements-inline">
                    <div className="header-elements-inline">
                        <button className="btn btn-success btn-sm btn-block" data-toggle="modal" data-target="#popupModal">New Report Template</button>
                        <div className="modal fade" id="popupModal" tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg" role="document">
                                <Modal />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table text-hover table-bordered">
                            <thead className="bg-green">
                                <tr>
                                    <th>Report Subject</th>
                                    <th>Visualization</th>
                                    <th>Metric</th>
                                    <th>Period</th>
                                    <th>Granularity</th>
                                </tr>
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

export class Modal extends Component {
    displayName = Modal.name;

    render () {
        return (
            <NewReportTemplateModal />
        );
    }
}

export class NewReportTemplateModal extends Component {
    displayName = NewReportTemplateModal.name;

    render() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" style={{paddingTop: "0.3em"}}>REPORT TEMPLATE</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div className="position-relative row">
                            <div className="col-6">
                                <input type="text" className="form-control" defaultValue="Sale Invoice" />
                            </div>
                        </div>
                        <div className="position-relative row">
                            <div className="col-6">
                                <input type="text" className="form-control" defaultValue="Type" />
                            </div>
                        </div>
                        <div className="position-relative form-group row">
                            <div className="col-6">
                                <input type="text" className="form-control" defaultValue="Store" />
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header header-elements-sm-inline">
                                <h6 className="card-title">Date Range</h6>
                            </div>
                            <div className="card-body">
                                <div className="form-horizontal">
                                    <div className="position-relative row">
                                        <div className="col-6">
                                            <select className="form-control">
                                                <option>Yearly</option>
                                                <option>Monthly</option>
                                                <option>Weekly</option>
                                                <option>Daily</option>
                                                <option>Hourly</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="position-relative row">
                                        <div className="col-6">
                                            <select className="form-control">
                                                <option>Yearly</option>
                                                <option>Monthly</option>
                                                <option>Weekly</option>
                                                <option>Daily</option>
                                                <option>Hourly</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div>
                                    <button className="btn btn-danger btn-sm">Previous Step</button>
                                </div>
                                <div>
                                    <button className="btn btn-success btn-sm">Next Step</button>
                                </div>
                            </div>
                        </div>
                        <div className="position-relative row">
                            <div className="col-6">
                                <input type="text" className="form-control" defaultValue="Metrics" />
                            </div>
                        </div>
                        <div className="position-relative row">
                            <div className="col-6">
                                <input type="text" className="form-control" defaultValue="Visualization" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div>
                                <button className="btn btn-sm">Cancel</button>
                            </div>
                            <div>
                                <button className="btn btn-success btn-sm">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
