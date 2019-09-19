import React, { Component } from 'react';
import './waitingList.css';
import * as WaitingListService from '../../app/services/waitingList';
import * as DashBoardService from '../../app/services/dashboard';
import $ from 'jquery';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Message from '../../app/constants/message';

export class WaitingList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            popUpToasted: false,
            listConveyorFree: []
        };
    }

    componentWillMount() {
        let oldState = sessionStorage.getItem('customerInFormState');
        if (oldState && JSON.parse(oldState).isOpen) {
            this.setState({ isOpen: true });
        }
        WaitingListService.getAllWaitingList((res) => {
            if (res.data.err === 0) {
                this.setState({ waitingList: res.data.data });
            }
        });
        WaitingListService.getListConveyorFree((res) => {
            if (res.data.err === 0) {
                this.setState({ listConveyorFree: res.data.data });
            }
        });
    }

    componentDidMount() {
        let element = $('.floating-window'),
            intervalId = setInterval(() => {
                WaitingListService.getAllWaitingList((res) => {
                    if (res.data.err === 0) {
                        this.setState({ waitingList: res.data.data });
                    }
                });
            }, 5000);
        element.click(this.openElement);
        if (this.state.isOpen) {
            element.addClass('enter');
            element.click();
        } else {
            setTimeout(() => {
                element.addClass('enter');
            }, 1000);
        }
        this.setState({ intervalId });
    }

    componentWillUnmount() {
        sessionStorage.setItem('customerInFormState', JSON.stringify({ isOpen: this.state.isOpen }));
        clearInterval(this.state.intervalId);
    }

    openElement = () => {
        let element = $('.floating-window');
        element.find('>i').hide();
        element.addClass('expand');
        element.find('.message-boxes').addClass('enter');
        element.off('click', this.openElement);
        element.find('.header button').click(this.closeElement);
        this.setState({ isOpen: true }, () => {
            sessionStorage.removeItem('customerInFormState');
            sessionStorage.setItem('customerInFormState', JSON.stringify({ isOpen: this.state.isOpen }));
        });
    }

    closeElement = () => {
        let element = $('.floating-window');
        element.find('.message-boxes').removeClass('enter').hide();
        element.find('>i').show();
        element.removeClass('expand');
        element.find('.header button').off('click', this.closeElement);
        setTimeout(() => {
            element.find('.message-boxes').removeClass('enter').show();
            element.click(this.openElement);
        }, 500);
        this.setState({ isOpen: false }, () => {
            sessionStorage.removeItem('customerInFormState');
            sessionStorage.setItem('customerInFormState', JSON.stringify({ isOpen: this.state.isOpen }));
        });
    }

    onAssigning(conveyorDetail) {
        this.setState({
            popUpToasted: true,
            conveyorDetail
        });
    }

    render() {
        return (
            <section>
                <div className="floating-window">
                    <i className="fa fa-align-justify"></i>
                    <div className="message-boxes">
                        <div className="header">
                            <span className="title">Waiting list</span>
                            <button>
                                <i className="fa fa-times-circle"></i>
                            </button>
                        </div>
                        <ul className="messages">
                            {this.state.waitingList && this.state.waitingList.map((item) => {
                                return <li className="message-item" data-toggle="modal" data-target="#popupModalConveyorAssign" onClick={() => this.onAssigning(item)}>
                                    <div>
                                        <span>Invoice {item.code}</span>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                <Modal listConveyorFree={this.state.listConveyorFree} conveyorDetail={this.state.conveyorDetail}></Modal>
            </section>
        );
    }
}

export class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conveyorDetail: null,
            listConveyorFree: [],
            selectedConveyor: null
        };
    }

    componentDidMount() {
        this.setState({
            conveyorDetail: this.props.conveyorDetail,
            listConveyorFree: this.props.listConveyorFree
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            conveyorDetail: nextProps.conveyorDetail,
            listConveyorFree: nextProps.listConveyorFree
        });
    }

    validateData() {
        return this.state.selectedConveyor !== null;
    }

    onClickAssign() {
        let invoiceData = {
            code: this.state.conveyorDetail.code,
            conveyor_id: this.state.selectedConveyor.value,
        };
        DashBoardService.assignConveyor(invoiceData, (res) => {
            if (res.data.err === 0) {
                toast(Message.DASHBOARD.ASSIGN_CONVEYOR_SUCCESS, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000
                });
            }
        });
    }

    render() {
        let options = this.state.listConveyorFree.map((item) => {
            return {
                value: item.id,
                label: 'Conveyor ' + item.id
            };
        });
        return (
            <div className="modal fade show" id="popupModalConveyorAssign" tabIndex="-1" role="diaglog" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" style={{ paddingTop: "0.3em" }}>Conveyor Assigning</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row col-12 margin-top-bottom-10 margin-top-0">
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <h6>CONVEYOR:</h6>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <Select value={this.state.selectedConveyor} options={options} onChange={(value) => this.setState({ selectedConveyor: value })}
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 0,
                                            colors: {
                                                ...theme.colors,
                                                primary: '#339966',
                                            },
                                        })}
                                    />
                                </div>
                                <div className="col-4 col-sm-6 col-md-6 col-lg-6 col-xl-8">
                                </div>
                            </div>
                            <div className="row col-12 margin-top-bottom-10">
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <h6>STATUS:</h6>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <h6 className="font-weight-semibold">{this.state.conveyorDetail && Number((this.state.conveyorDetail.stats * 100).toFixed(0))}%</h6>
                                </div>
                                <div className="col-4 col-sm-6 col-md-6 col-lg-6 col-xl-8">
                                </div>
                            </div>
                            <div className="row col-12 margin-top-bottom-10">
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <h6>INVOICE:</h6>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <h6>
                                        <span>#</span>{this.state.conveyorDetail && this.state.conveyorDetail.code}
                                    </h6>
                                </div>
                                <div className="col-4 col-sm-6 col-md-6 col-lg-6 col-xl-8">
                                </div>
                            </div>
                            <div className="row col-12 margin-top-bottom-10">
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <h6>TRUCK NUMBER:</h6>
                                </div>
                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                    <h6>{this.state.conveyorDetail && this.state.conveyorDetail.truckNumber}</h6>
                                </div>
                                <div className="col-4 col-sm-6 col-md-6 col-lg-6 col-xl-8">
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered">
                                    <thead className="theme_bar theme_bar_sm theme_bar_lg">
                                        <tr>
                                            <th>No</th>
                                            <th>Product</th>
                                            <th>Size</th>
                                            <th>Target</th>
                                            <th>Actual</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.conveyorDetail && this.state.conveyorDetail.details.map((value, index) => {
                                            return <tr key={value.skuId}>
                                                <td>{index + 1}</td>
                                                <td>{value.skuId}</td>
                                                <td>{value.sku.info}</td>
                                                <td>{value.targetQuantity}</td>
                                                <td>{value.currentQuantity}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div>
                                <button disabled={!this.validateData()} className="btn btn-success" data-dismiss="modal" onClick={() => this.onClickAssign()}>Assign</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
