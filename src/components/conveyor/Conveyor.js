import React, { Component } from 'react';
import * as DashBoardService from '../../app/services/dashboard';
import * as EmployeeService from '../../app/services/options/employee';
import * as CategoryService from '../../app/services/options/category';
import BtnNumber from '../../app/constants/constants';
import { toast } from 'react-toastify';
import Message from '../../app/constants/message';

export class Conveyor extends Component {
    displayName = Conveyor.name;
 
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

    render() {
        const { information } = this.props;
        
        return (
            <div className="card" style={{minWidth: "100%"}}>
                <div className={"card-body " + this.getBgColorClassName(information.status)} data-toggle="modal" data-target={"#popupModal"+information.id} style={{cursor : 'pointer'}}>
                    <div className="d-flex jc-center">
                        <div className="btn rounded-round btn-xl bg-white">
                            {Number((information.stats * 100).toFixed(0))}%
                        </div>
                    </div>
                    <div className="card-content custom-card-content-xl custom-card-content-sm custom-card-content bg-white">
                        <div className="ta-center">
                            <h4 className="font-xx-large">
                                Conveyor {information.id}
                            </h4>
                            <p className="font-small">
                                {information.staff ? information.staff.name : ''}
                            </p>
                            <p className="font-small">
                                {information.truckNumber ? information.truckNumber : ''}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id={"popupModal"+information.id} tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-lg" role="document">
                        <Modal information = {information}/>
                    </div>
                </div>
            </div>
        );
    }
}

export class Modal extends Component {
    displayName = Modal.name;

    render() {
        const { information } = this.props;

        if (information.status === 1)
        {
            return (
                <NewInvoiceModal baseConveyorInfo={information} />
            );
        }
        else {
            return (
                <ConveyorDetailModal baseConveyorInfo={information} />
            );
        }
    }
}

export class ConveyorDetailModal extends Component {
    displayName = ConveyorDetailModal.name;

    constructor(props) {
        super(props);     
        this.state = {
            conveyorDetail: null
        };
        this.handleClickBtn = this.handleClickBtn.bind(this);
    }

    componentDidMount() {
        const { baseConveyorInfo } = this.props;
        DashBoardService.getInvoiceDetail(baseConveyorInfo.invoiceCode, (res) => {
            if (res.data.err === 0) {
                this.setState({
                    conveyorDetail: res.data.data
                });
            }
        });
    }

    handleClickBtn(id) {
        let status = 0;
        if (id in [BtnNumber.CANCEL, BtnNumber.FINISH]) {
            status = 0;
        } else if (id in [BtnNumber.RESUME]) {
            status = 2;
        }
        let data = {
            code: this.state.conveyorDetail.code,
            conveyor_id: this.state.conveyorDetail.conveyor.id,
            staff_id: this.state.conveyorDetail.staff.id,
            truck_number: this.state.conveyorDetail.truck_number,
            status
        };
        DashBoardService.updateConveyorDetail(data, (res) => {
            if (res.data.err === 0) {
                toast(Message.DASHBOARD.UPDATE_STATUS_SUCCESS, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000
                });
            }
        });
    }

    getBgColorClassName(status) {
        switch (status) {
            default:
                return '';
            case 2:
                return 'bg-blue-800';
            case 4: 
                return 'bg-orange-800';
            case 8:
                return 'bg-green-800';
        }
    }
    
    render() {
        return (
            this.state.conveyorDetail ? 
            <div className="modal-content">
                <div className={"modal-header "  + this.getBgColorClassName(this.state.conveyorDetail.status)}>
                    <h4 className="modal-title" style={{paddingTop: "0.3em"}}>CONVEYOR {this.state.conveyorDetail.conveyor.id}</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                            <h6>STATUS:</h6>
                        </div>
                        <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                            <h6 className="font-weight-semibold">{Number((this.state.conveyorDetail.stats * 100).toFixed(0))}%</h6>
                        </div>
                        <div className="col-4 col-sm-6 col-md-6 col-lg-6 col-xl-8">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                            <h6>INVOICE:</h6>
                        </div>
                        <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                            <h6><span>#</span>{this.state.conveyorDetail.code}</h6>
                        </div>
                        <div className="col-4 col-sm-6 col-md-6 col-lg-6 col-xl-8">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                            <h6>TRUCK NUMBER:</h6>
                        </div>
                        <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                            <h6>{this.state.conveyorDetail.truckNumber}</h6>
                        </div>
                        <div className="col-4 col-sm-6 col-md-6 col-lg-6 col-xl-8">
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="theme_bar theme_bar_sm theme_bar_lg">
                                <tr>
                                    <th>Name</th>
                                    <th>Target</th>
                                    <th>In</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.conveyorDetail.details.map((value) => {
                                    return <tr key={value.skuId}>
                                        <td>{value.skuId}</td>
                                        <td>{value.targetQuantity}</td>
                                        <td>{value.currentQuantity}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ButtonField status={this.state.conveyorDetail.status} onClick={this.handleClickBtn} />
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

    onClickBtn(id) {
        this.props.onClick(id);
    }

    renderButtonField(status) {
        switch (status)
        {
            default:
                return (
                    <div className="">
                        
                    </div>
                );
            case 2:
                return (
                    <button onClick={() => this.onClickBtn(BtnNumber.CANCEL)} className="btn btn-danger" data-dismiss="modal">Cancel</button>
                );
            case 4:
                return (
                    <div className="">
                        <button onClick={() => this.onClickBtn(BtnNumber.CANCEL)} className="btn btn-danger" data-dismiss="modal" style={{ margin: "0.25rem", marginLeft: 0 }}>Cancel</button>
                        <button onClick={() => this.onClickBtn(BtnNumber.RESUME)} className="btn btn-success" data-dismiss="modal" style={{ margin: "0.25rem", marginRight: 0 }}>Resume</button>
                    </div>
                );
            case 8:
                return (
                    <button onClick={() => this.onClickBtn(BtnNumber.FINISH)} className="btn btn-success" data-dismiss="modal">Finish</button>
                );
        }
    }

    render () {
        const status = this.props.status;

        return (
            <div className="modal-footer">
                {this.renderButtonField(status)}
            </div>
        );
    }
}

export class NewInvoiceModal extends Component {
    displayName = NewInvoiceModal.name;

    constructor(props) {
        super(props);
        this.state = {
            listEmployee: [],
            listSkusRaw: [],
            parents: [],
            children: [],
            listSkuHandled: [],
            tableRow: [],
            invoiceCode: '',
            staffId: 0,
            truckNumber: 0,
            invoiceDetailData: []
        };
        this.onEmployeeSelected = this.onEmployeeSelected.bind(this);
        this.onSkuSelected = this.onSkuSelected.bind(this);
    }

    componentDidMount() {
        EmployeeService.getListEmployee(1, 50, (res) => {
            if (res.data.err === 0) {
                this.setState({listEmployee: res.data.data});               
            }
        });
        CategoryService.getListSku(1, 50, (res) => {
            if (res.data.err === 0) {
                this.setState({listSkusRaw: res.data.data});
                this.handleRawData();
            }
        });
    }

    addNewRow() {
        let listRowTemp = this.state.tableRow;
        let listRowData = this.state.invoiceDetailData;
        listRowTemp.push(this.rowTemplate(this.state.listSkuHandled, listRowTemp.length));
        listRowData.push({
            invoiceCode: '',
            skuId: 0,
            target: 0
        });
        this.setState({
            tableRow: listRowTemp,
            invoiceDetailData: listRowData
        });
    }

    handleRawData() {
        if(this.state.listSkusRaw) {
            let parents = this.state.listSkusRaw.filter((item) => item.parentId === 0);
            let children = this.state.listSkusRaw.filter((item) => item.parentId !== 0);
            parents.forEach((item) => item.children = []);
            children.forEach((child) => {
                let parentAt = 0;
                if (parents.some((parent, index) => {
                    let testResult = parent.id === child.parentId;
                    if (testResult) {
                        parentAt = index;
                    }
                    return testResult;
                })) {
                    parents[parentAt].children.push(child);
                }
            });
            let listSkuHandled = parents.concat(...children);
            this.setState({parents, children, listSkuHandled});
            this.addNewRow();
        }
    }

    rowTemplate(listSku, index) {
        return <tr scope="row">
            <td scope="col">
                <CategorySelectList onChange={this.onSkuSelected} index={index} listCategories={listSku} />
            </td>
            <td scope="col">
                <input onChange={(e) => this.onTargetSet(e.target.value, index)} type="number" className="form-control" />
            </td>
            <td scope="col"></td>
        </tr>;
    }

    onEmployeeSelected(value) {
        this.setState({staffId: Number.parseInt(value)});
    }

    onSkuSelected(value, index) {
        let listRowData = this.state.invoiceDetailData;
        listRowData.forEach((item, itemIndex) => {
            if (itemIndex === index) {
                item.skuId = Number.parseInt(value);
            }
        });
        this.setState({invoiceDetailData: listRowData});
    }

    onTargetSet(value, index) {
        let listRowData = this.state.invoiceDetailData;
        listRowData.forEach((item, itemIndex) => {
            if (itemIndex === index) {
                item.target = Number.parseInt(value);
            }
        });
        this.setState({invoiceDetailData: listRowData});
    }

    onStart() {
        let invoiceData = {
            code: this.state.invoiceCode,
            conveyor_id: this.props.information.id,
            staff_id: this.state.staffId,
            truck_number: this.state.truckNumber,
            status: 2
        };
        DashBoardService.createNewConveyorDetail(invoiceData, (res) => {
            if (res.data.err === 0) {
                let invoiceCode = res.data.data.code; // double check
                toast(Message.DASHBOARD.CREATE_CONVEYOR_DETAIL_SUCCESS, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000
                });
                this.state.invoiceDetailData.forEach((item) => {
                    if (item.sku_id && item.sku_id > 0 && item.target && item.target >= 0) {
                        item.invoiceCode = invoiceCode;
                        DashBoardService.createNewInvoiceDetail(item, (res1) => {
                            if (res1.data.err === 0) {
                                // handle success here
                            }
                        })
                    }
                });
            }
        });
    }

    validateData() {
        if (this.state.invoiceCode && this.state.invoiceCode !== ''
            && this.state.staffId && this.state.staffId > 0
            && this.state.truckNumber
            && this.state.invoiceDetailData && this.state.invoiceDetailData.length > 0
            && this.state.invoiceDetailData[0].target && this.state.invoiceDetailData[0].target >= 0
            && this.state.invoiceDetailData[0].skuId && this.state.invoiceDetailData[0].skuId > 0) {
                return true;
        }
        return false;
    }

    render() {
        const { baseConveyorInfo } = this.props;

        return (
            <div className="modal-content">
                <div className="modal-header bg-dark-alpha">
                    <h4 className="modal-title" style={{paddingTop: "0.3em"}}>CONVEYOR {baseConveyorInfo.id}</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div className="position-relative row">
                            <label className="col-4 col-form-label">STATUS:</label>
                        </div>
                        <div className="position-relative row">
                            <label className="col-4 col-form-label">INVOICE:</label>
                            <div className="col-6">
                                <input onChange={(e) => this.setState({invoiceCode: e.target.value})} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative row">
                            <label className="col-4 col-form-label">EMPLOYEE:</label>
                            <div className="col-6">
                                <EmployeeSelectList onChange={this.onEmployeeSelected} listEmployee={this.state.listEmployee} />
                            </div>
                        </div>
                        <div className="position-relative form-group row">
                            <label className="col-4 col-form-label">TRUCK NUMBER:</label>
                            <div className="col-6">
                                <input onChange={(e) => this.setState({truckNumber: e.target.value})} type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table id="table-data-contain" className="table table-hover table-bordered">
                            <thead className="theme_bar theme_bar_sm theme_bar_lg">
                                <tr>
                                    <th>Name</th>
                                    <th>Target</th>
                                    <th>In</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tableRow.map((item) => {
                                    return item;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <div>
                        <a role="button" href="#" className="btn btn-outline-dark btn-sm" onClick={() => this.addNewRow()}><i className="icon-plus2"></i> Add New</a>
                    </div>
                </div>
                <div className="modal-footer">
                    <div>
                        <button disabled={!this.validateData()} className="btn btn-success btn-sm" data-dismiss="modal" onClick={() => this.onStart()} style={{width:"10rem"}}>Done</button>
                    </div>
                </div>
            </div>
        );
    }
}

export class EmployeeSelectList extends Component {
    displayName = EmployeeSelectList.name;

    constructor(props) {
        super(props);
    }

    onSelectEmployee(value) {
        this.props.onChange(value);
    }

    render () {
        let { listEmployee } = this.props;

        return (
            <select onChange={(e) => this.onSelectEmployee(e.target.value)} className="form-control">
                <option key="0" value="0">None</option>
                {listEmployee.map((item) => {
                    return <option key={item.id} value={item.id}>{item.name}</option>;
                })}
            </select>
        );
    }
}

export class CategorySelectList extends Component {
    displayName = CategorySelectList.name;

    constructor(props) {
        super(props);
    }

    onSelectSku(value) {
        this.props.onChange(value, this.props.index);
    }

    render () {
        let { listCategories } = this.props;
        return (
            <select onChange={(e) => this.onSelectSku(e.target.value)} className="form-control">
                <option key="0" value="0">None</option>
                {listCategories.map((item) => {
                    return <option key={item.id} value={item.id}>{item.name}</option>;
                })}
            </select>
        );
    }
}
