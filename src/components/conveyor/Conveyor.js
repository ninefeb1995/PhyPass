import React, { Component } from 'react';
import * as DashBoardService from '../../app/services/dashboard';
import * as EmployeeService from '../../app/services/options/employee';
import * as CategoryService from '../../app/services/options/category';
import BtnNumber from '../../app/constants/constants';
import { toast } from 'react-toastify';
import Message from '../../app/constants/message';
import Select from 'react-select';

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
            <div className="card custom-card">
                <div className={"card-body " + this.getBgColorClassName(information.status)} data-toggle="modal" data-target={"#popupModal"+information.id} style={{cursor : 'pointer'}}>
                    <div className="d-flex jc-center">
                        <div className="btn rounded-round btn-xl bg-white">
                            {Number((information.stats * 100).toFixed(0))}%
                        </div>
                    </div>
                    <div className="card-content custom-card-content bg-white">
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

    handleClickBtn(id, reason) {
        let status = 0;
        if ([BtnNumber.CANCEL, BtnNumber.FINISH].some((x) => x === id)) {
            status = 1;
        } else if ([BtnNumber.RESUME].some((x) => x === id)) {
            status = 2;
        }
        let data = {
            code: this.state.conveyorDetail.code,
            conveyor_id: this.state.conveyorDetail.conveyor.id,
            staff_id: this.state.conveyorDetail.staff.id,
            truck_number: this.state.conveyorDetail.truck_number,
            status,
            reason
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
                <ButtonField buttonId={this.state.conveyorDetail.id} status={this.state.conveyorDetail.status} onClick={this.handleClickBtn} />
            </div>
            : <div></div>
        );
    }
}

export class ButtonField extends Component {
    displayName = ButtonField.name;

    constructor(props) {
        super(props);
        this.state = {
            cancelReason: '',
            isToggle: false
        }
    }

    onToggle() {
        let isToggle = !this.state.isToggle;
        this.setState({isToggle});
    }

    onClickBtn(id) {
        this.props.onClick(id, this.state.cancelReason);
    }

    renderButtonField(status, btnId) {
        switch (status)
        {
            default:
                return (
                    <div className="">                   
                    </div>
                );
            case 2:
                return (
                   <div>
                        <button /*disabled={this.state.isToggle}*/ onClick={() => this.onToggle()} className="btn btn-danger">
                            <span style={{marginRight:"5px"}}>Cancel</span>
                            <span><i className="fa fa-caret-down"></i></span>
                        </button>
                        <ul className={this.state.isToggle ? "cancelReason display-block" : "cancelReason"} id={"cancelReason"+btnId}>
                            <li className="margin-bottom-5">
                                <span>Are you sure you want to cancel the progress of this conveyor?</span>
                            </li>
                            <li>
                                <form name="calcelReasonForm">
                                    <textarea onChange={(e) => this.setState({cancelReason:e.target.value})} className="form-control" rows="3" placeholder="Please input your reason here..."></textarea>
                                </form>
                            </li>
                            <li style={{textAlign: "right", paddingTop: "10px"}}>
                                <button onClick={() => this.onClickBtn(BtnNumber.CANCEL)} disabled={this.state.cancelReason.trim() === ''} className="btn btn-primary" data-dismiss="modal" style={{ margin: "0.25rem", marginLeft: 0 }}>OK</button>
                                {/* <button onClick={() => this.onToggle()} className="btn btn-default" style={{ margin: "0.25rem", marginRight: 0 }}>Close</button> */}
                            </li>
                        </ul>
                   </div>
                );
            case 4:
                return (
                    <div className="">
                        <button onClick={() => this.onToggle()} className="btn btn-danger" style={{ margin: "0.25rem", marginLeft: 0 }}>
                            <span style={{marginRight:"5px"}}>Cancel</span>
                            <span><i className="fa fa-caret-down"></i></span>
                        </button>
                        <button disabled={this.state.isToggle} onClick={() => this.onClickBtn(BtnNumber.RESUME)} className="btn btn-success" data-dismiss="modal" style={{ margin: "0.25rem", marginRight: 0 }}>Resume</button>
                        <ul className={this.state.isToggle ? "cancelReason display-block" : "cancelReason"} id={"cancelReason"+btnId}>
                            <li className="margin-bottom-5">
                                <span>Are you sure you want to cancel the progress of this conveyor?</span>
                            </li>
                            <li>
                                <form name="calcelReasonForm">
                                    <textarea onChange={(e) => this.setState({cancelReason:e.target.value})} className="form-control" rows="3" placeholder="Please input your reason here..."></textarea>
                                </form>
                            </li>
                            <li style={{textAlign: "right", paddingTop: "10px"}}>
                                <button onClick={() => this.onClickBtn(BtnNumber.CANCEL)} disabled={this.state.cancelReason.trim() === ''} className="btn btn-primary" data-dismiss="modal" style={{ margin: "0.25rem", marginLeft: 0 }}>OK</button>
                                {/* <button onClick={() => this.onToggle()} className="btn btn-default" style={{ margin: "0.25rem", marginRight: 0 }}>Close</button> */}
                            </li>
                        </ul>
                    </div>
                );
            case 8:
                return (
                    <button onClick={() => this.onClickBtn(BtnNumber.FINISH)} className="btn btn-success" data-dismiss="modal">Finish</button>
                );
        }
    }

    render () {
        const { status, buttonId } = this.props;

        return (
            <div className="modal-footer">
                {this.renderButtonField(status, buttonId)}
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
            listSkuHidden: [],
            invoiceCode: '',
            staffId: 0,
            truckNumber: 0,
            invoiceDetailData: []
        };
        this.onEmployeeSelected = this.onEmployeeSelected.bind(this);
        this.onSkuSelected = this.onSkuSelected.bind(this);
    }

    componentDidMount() {
        EmployeeService.getListEmployee(1, 50, 1, (res) => {
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
        let listRowData = this.state.invoiceDetailData.slice();
        listRowData.push({
            skuId: 0,
            target: 0
        });
        this.setState({
            invoiceDetailData: listRowData
        });
    }

    onDeleteRow(deleteAt) {
        let skuPutBack = this.state.listSkuHidden.find((item) => item.id === this.state.invoiceDetailData[deleteAt].skuId);
        let listSkuOut = this.state.listSkuHidden.filter((item) => item.id !== skuPutBack.id);
        let listSkuHandled = this.state.listSkuHandled.slice();
        listSkuHandled.forEach((item) => {
            if (item.id === skuPutBack.id) {
                item.hidden = false;
            }
        });
        let listRowData = this.state.invoiceDetailData.filter((value, index) => index !== deleteAt);
        this.setState({invoiceDetailData: listRowData, listSkuHidden: listSkuOut, listSkuHandled});
    }

    handleRawData() {
        if(this.state.listSkusRaw) {
            let parents = this.state.listSkusRaw.filter((item) => item.parentId === 0);
            let children = this.state.listSkusRaw.filter((item) => item.parentId !== 0);
            parents.forEach((parent) => {
                parent.children = [];
                parent.hidden = false;
            });
            children.forEach((child) => {
                let parentAt = 0;
                child.hidden = false;
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

    rowTemplate(item, index) {
        return (
            <div key={index} className="row">
                <div className="col-4">
                    <CategorySelectList onChange={this.onSkuSelected} index={index} selectedItem={item.skuId} listCategories={this.state.listSkuHandled} />
                </div>
                <div className="col-4">
                    <input onChange={(e) => this.onTargetSet(e.target.value, index)} value={item.target} type="number" className="form-control" />
                </div>
                <div className="col-3">
                </div>
                <div className="col-1 icon-trash-center">
                    <i onClick={() => this.onDeleteRow(index)} className="fa fa-trash cursor"></i>
                </div>
            </div>
        );
    }

    onEmployeeSelected(value) {
        this.setState({staffId: Number.parseInt(value)});
    }

    onSkuSelected(value, index) {
        let listRowData = this.state.invoiceDetailData.slice();
        listRowData.forEach((item, itemIndex) => {
            if (itemIndex === index) {
                item.skuId = Number.parseInt(value);
            }
        });
        let skuOutItems = this.state.listSkuHandled.filter((item) => {
            return listRowData.some((item1) => item.id === item1.skuId);
        });
        let listSkuHandled = this.state.listSkuHandled.slice();
        listSkuHandled.forEach((item) => {
            if (listRowData.some((item1) => item.id === item1.skuId)) {
                item.hidden = true;
            } else {
                item.hidden = false;
            }
        });
        this.setState({invoiceDetailData: listRowData, listSkuHidden: skuOutItems, listSkuHandled});
    }

    onTargetSet(value, index) {
        let listRowData = this.state.invoiceDetailData.slice();
        listRowData.forEach((item, itemIndex) => {
            if (itemIndex === index) {
                item.target = Number.parseInt(value);
            }
        });
        this.setState({invoiceDetailData: listRowData});
    }

    onStart() {
        let listInvoiceDetailData = [];
        this.state.invoiceDetailData.forEach((item) => {
            if (item.skuId && item.skuId > 0 && item.target && item.target >= 0) {
                listInvoiceDetailData.push({
                    sku_id: item.skuId,
                    target: item.target
                });
            }
        });
        let invoiceData = {
            code: this.state.invoiceCode,
            conveyor_id: this.props.baseConveyorInfo.id,
            staff_id: this.state.staffId,
            truck_number: this.state.truckNumber,
            status: 2,
            listInvoiceDetailData
        };
        DashBoardService.createNewConveyorDetail(invoiceData, (res) => {
            if (res.data.err === 0) {
                toast(Message.DASHBOARD.CREATE_CONVEYOR_DETAIL_SUCCESS, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000
                });
            }
        });
    }

    validateData() {
        if (this.state.invoiceCode && this.state.invoiceCode !== ''
            && this.state.staffId && this.state.staffId > 0
            && this.state.truckNumber
            && this.state.invoiceDetailData && this.state.invoiceDetailData.length > 0
            && this.state.invoiceDetailData.every((item) => item.target && item.target >= 0 && item.skuId && item.skuId > 0)) {
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
                    <div className="container-fluid">
                        <div className="align-content-center bg-dark-alpha row" style={{height: "30px"}}>
                            <div className="col-4">
                                Name
                            </div>
                            <div className="col-4">
                                Target
                            </div>
                            <div className="col-3">
                                In
                            </div>
                            <div className="col-1">
                            </div>
                        </div>
                        {this.state.invoiceDetailData.map((item, index) => {
                            return this.rowTemplate(item, index);
                        })}
                    </div>
                </div>
                <div className="modal-footer">
                    <div>
                        <button className="btn btn-outline-dark btn-sm" onClick={() => this.addNewRow()}><i className="icon-plus2"></i> Add New</button>
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
        this.state = {
            selectedOption: null
        };
    }

    onSelectEmployee = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.onChange(selectedOption.value);
    }

    render () {
        const { selectedOption } = this.state;
        let { listEmployee } = this.props;
        let options = [];
        listEmployee.map((item) => {
            let option = {
                value: item.id,
                label: item.name
            }
            options.push(option);
        });

        return (
            <Select value={selectedOption} options={options} onChange={this.onSelectEmployee}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary: '#339966',
                    },
                })}
            />
        );
    }
}

export class CategorySelectList extends Component {
    displayName = CategorySelectList.name;

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        }
    }

    componentDidMount() {
        let itemId = this.props.selectedItem;
        let itemGot = this.props.listCategories.filter((item) => item.id === itemId);
        if (itemGot && itemGot.length > 0) {
            let defaultSelectedOption = {
                value: itemGot[0].id,
                label: itemGot[0].name
            };
            this.setState({selectedOption:defaultSelectedOption});
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.selectedItem !== newProps.selectedItem) {
            let itemGot = this.props.listCategories.filter((item) => item.id === newProps.selectedItem);
            if (itemGot && itemGot.length > 0) {
                let defaultSelectedOption = {
                    value: itemGot[0].id,
                    label: itemGot[0].name
                };
                this.setState({selectedOption:defaultSelectedOption});
            }
        }
    }

    onSelectSku = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.onChange(selectedOption.value, this.props.index);
    }

    render () {
        const { selectedOption } = this.state;
        let { listCategories } = this.props;
        let listCategoriesFiltered = listCategories.filter((item) => !item.hidden);
        let options = [];
        listCategoriesFiltered.map((item) => {
            let option = {
                value: item.id,
                label: item.name
            };
            options.push(option);
        });

        return (
            <Select value={selectedOption} options={options} onChange={this.onSelectSku}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary: '#339966',
                    },
                })}
            />
        );
    }
}
