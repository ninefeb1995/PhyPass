import React, { Component } from 'react';
import * as CategoryServices from '../../app/services/options/category';
import { toast } from 'react-toastify';
import Message from '../../app/constants/message';
import Select from 'react-select';

export class CategoryList extends Component {
    displayName = CategoryList.name;

    constructor(props) {
        super(props);
        this.state = {
            listSkusRaw: [],
            parents: [],
            children: []
        }
        this.onCategoryCreated = this.onCategoryCreated.bind(this);
        this.handleUpdatingSkuList = this.handleUpdatingSkuList.bind(this);
    }

    componentDidMount() {
        CategoryServices.getListSku(1, 50, (res) => {
            if (res.data.err === 0) {
                this.setState({ listSkusRaw: res.data.data }, () => {
                    this.handleRawData();
                });
            }
        });
    }

    onCategoryCreated(data) {
        if (data) {
            const temp = this.state.listSkusRaw.slice();
            temp.push(data);
            this.setState({ listSkusRaw: temp });
            toast(Message.CATEGORY.ADD_SUCCESS, {
                type: toast.TYPE.SUCCESS,
                autoClose: 2000
            });
            this.handleRawData();
        }
    }

    handleUpdatingSkuList(data) {
        const temp = this.state.listSkusRaw.filter((item) => item.id !== data.id);
        temp.push(data);
        this.setState({ listSkusRaw: temp }, () => {
            this.handleRawData();
        });
    }

    handleRawData() {
        if (this.state.listSkusRaw) {
            let parents = this.state.listSkusRaw.filter((item) => Number.parseInt(item.parentId) === 0);
            let children = this.state.listSkusRaw.filter((item) => Number.parseInt(item.parentId) !== 0);
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
            this.setState({ parents, children });
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header header-elements-inline">
                    <div className="header-elements">
                        <button className="btn btn-success btn-sm" data-toggle="modal" data-target="#popupModal">New Category</button>
                        <div className="modal fade" id="popupModal" tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                            <div className="modal-dialog modal-sm" role="document">
                                <NewCategoryFormModal listParents={this.state.parents} onCreatedCategory={this.onCategoryCreated} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="nav nav-sidebar" data-nav-type="collapsible">
                        {this.state.parents.map((item) => {
                            return <Category key={item.id} information={item} listParents={this.state.parents} onCategoryEditedAnnouce={this.handleUpdatingSkuList} />;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export class Category extends Component {
    displayName = Category.name;

    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
        this.onCategoryEdited = this.onCategoryEdited.bind(this);
    }

    toggle(e) {
        if (e.target.tagName.toLowerCase() !== 'i') {
            this.state.toggle ? this.setState({ toggle: false }) : this.setState({ toggle: true });
        }
    }

    onEditSku(e) {
        e.preventDefault();
    }

    onCategoryEdited(data) {
        this.props.onCategoryEditedAnnouce(data);
    }

    render() {
        const { information } = this.props;

        return (
            <li className={this.state.toggle ? "nav-item nav-item-submenu nav-item-open" : "nav-item nav-item-submenu"}>
                <span onClick={(e) => this.toggle(e)} className="nav-link bg-blue cursor">
                    {information.name}
                    <i onClick={(e) => this.onEditSku(e)} data-toggle="modal" data-target={"#popupEditModal" + information.id} className="fa fa-edit margin-left-10"></i>
                </span>
                <div className="modal fade" id={"popupEditModal" + information.id} tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-sm" role="document">
                        <EditCategoryFormModal listParents={this.props.listParents} baseData={information} onEditedCategory={this.onCategoryEdited} />
                    </div>
                </div>
                <ul className="nav nav-group-sub" style={{ display: this.state.toggle ? "block" : "" }}>
                    {information.children.map((item, index) => {
                        let isOdd = true;
                        if (index % 2 === 0) {
                            isOdd = false;
                        }
                        return <SubCategory listParents={this.props.listParents} key={item.id} information={item} onCategoryEditedAnnouce={this.onCategoryEdited} isOdd={isOdd} />;
                    })}
                </ul>
            </li>
        );
    }
}

export class SubCategory extends Component {
    displayName = SubCategory.name;

    constructor(props) {
        super(props);
        this.onCategoryEdited = this.onCategoryEdited.bind(this);
    }

    onCategoryEdited(data) {
        this.props.onCategoryEditedAnnouce(data);
    }

    render() {
        const { information, isOdd } = this.props;

        return (
            <li>
                <span className={isOdd ? "nav-link" : "nav-link striped-sku-children-list"}>
                    {information.name}
                    <i data-toggle="modal" data-target={"#popupEditModal" + information.id} className="fa fa-edit margin-left-10 cursor"></i>
                </span>
                <div className="modal fade" id={"popupEditModal" + information.id} tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-sm" role="document">
                        <EditCategoryFormModal listParents={this.props.listParents} baseData={information} onEditedCategory={this.onCategoryEdited} />
                    </div>
                </div>
            </li>
        );
    }
}

export class NewCategoryFormModal extends Component {
    displayName = NewCategoryFormModal.name;

    constructor(props) {
        super(props);
        this.state = {
            categoryId: '',
            categoryName: '',
            info: 0,
            parentId: 0,
            selectedOption: {
                value: '0',
                label: 'None'
            }
        }
    }

    updateNameValue(event) {
        this.setState({ categoryName: event.target.value });
    }

    updateIdValue(event) {
        this.setState({ categoryId: event.target.value });
    }

    updateSizeValue(event) {
        this.setState({ info: event.target.value });
    }

    updateParentIdValue(selectedOption) {
        this.setState({
            parentId: selectedOption.value,
            selectedOption
        });
    }

    onCreateNewCategory() {
        let data = {
            name: this.state.categoryName,
            parent_id: this.state.parentId,
            id: this.state.categoryId,
            info: this.state.info
        }
        CategoryServices.addNewSku(data, (res) => {
            if (res.data.err === 0) {
                this.props.onCreatedCategory(res.data.data);
            }
        });
    }

    isValidData() {
        if (this.state.categoryName.trim() !== '') {
            return true;
        }
        return false;
    }

    render() {
        const { selectedOption } = this.state;
        const { listParents } = this.props;
        let options = [];
        options.push({
            value: '0',
            label: 'None'
        });
        listParents.map((item) => {
            let option = {
                value: item.id,
                label: item.name
            }
            options.push(option);
        });

        return (
            <div className="modal-content">
                <div className="modal-header bg-blue">
                    <h4 className="modal-title" style={{ paddingTop: "0.3em" }}>NEW CATEGORY</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div className="position-relative row margin-bottom-5">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">ID:</label>
                            <div className="col-6">
                                <input onChange={(event) => this.updateIdValue(event)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative row margin-bottom-5">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Category Name:</label>
                            <div className="col-6">
                                <input onChange={(event) => this.updateNameValue(event)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative row margin-bottom-5">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Size (kg):</label>
                            <div className="col-6">
                                <input onChange={(event) => this.updateSizeValue(event)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative form-group row margin-bottom-5">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Parent Category (Optional):</label>
                            <div className="col-6">
                                <Select value={selectedOption} options={options} onChange={(selectedOption) => this.updateParentIdValue(selectedOption)}
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
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={() => this.onCreateNewCategory()} disabled={!this.isValidData()} data-dismiss="modal" className="btn btn-success btn-sm">Done</button>
                </div>
            </div>
        );
    }
}

export class EditCategoryFormModal extends Component {
    displayName = EditCategoryFormModal.name;

    constructor(props) {
        super(props);
        this.state = {
            categoryId: '',
            categoryName: '',
            info: 0,
            parentId: 0,
            selectedOption: {
                value: '0',
                label: 'None'
            }
        }
    }

    componentWillMount() {
        this.setState({
            categoryName: this.props.baseData.name,
            parentId: this.props.baseData.parentId,
            categoryId: this.props.baseData.id,
            info: this.props.baseData.info
        });
        let parentInfo = this.props.listParents.find((item) => item.id === this.props.baseData.parentId);
        if (parentInfo) {
            let selectedOptionTemp = {
                value: parentInfo.id,
                label: parentInfo.name
            };
            this.setState({ selectedOption: selectedOptionTemp });
        }
    }

    updateNameValue(event) {
        this.setState({ categoryName: event.target.value });
    }

    updateIdValue(event) {
        this.setState({ categoryId: event.target.value });
    }

    updateSizeValue(event) {
        this.setState({ info: event.target.value });
    }

    updateParenIDValue(selectedOption) {
        this.setState({
            parentId: selectedOption.value,
            selectedOption
        });
    }

    onEditCategory(e) {
        if (this.props.baseData.children && this.props.baseData.children.length > 0 && this.state.parentId !== 0) {
            toast(Message.CATEGORY.UPDATE_PARENT_VIOLATION, {
                type: toast.TYPE.ERROR,
                autoClose: 2000
            });
        } else {
            let data = {
                name: this.state.categoryName,
                parent_id: this.state.parentId,
                id: this.state.categoryId,
                info: this.state.info
            }
            CategoryServices.updateSku(data, (res) => {
                if (res.data.err === 0) {
                    this.props.onEditedCategory(res.data.data);
                }
            });
        }
    }

    isValidData() {
        if (this.state.categoryName.trim() !== '') {
            return true;
        }
        return false;
    }

    render() {
        const { selectedOption } = this.state;
        const { listParents } = this.props;
        let options = [];
        let listParentsFiltered = listParents.filter((item) => item.id !== this.props.baseData.id);
        options.push({
            value: '0',
            label: 'None'
        });
        listParentsFiltered.map((item) => {
            let option = {
                value: item.id,
                label: item.name
            };
            options.push(option);
        });

        return (
            <div className="modal-content">
                <div className="modal-header bg-blue">
                    <h4 className="modal-title" style={{ paddingTop: "0.3em" }}>EDIT CATEGORY</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div className="position-relative row margin-bottom-5">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">ID:</label>
                            <div className="col-6">
                                <input onChange={(event) => this.updateIdValue(event)} value={this.state.categoryId} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative row margin-bottom-5">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Category Name:</label>
                            <div className="col-6">
                                <input onChange={(event) => this.updateNameValue(event)} value={this.state.categoryName} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative row margin-bottom-5">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Size (kg):</label>
                            <div className="col-6">
                                <input onChange={(event) => this.updateSizeValue(event)} value={this.state.info} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative form-group row">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Parent Category (Optional):</label>
                            <div className="col-6">
                                <Select value={selectedOption} options={options} onChange={(selectedOption) => this.updateParenIDValue(selectedOption)}
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
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={(e) => this.onEditCategory(e)} disabled={!this.isValidData()} data-dismiss="modal" className="btn btn-success btn-sm">Done</button>
                </div>
            </div>
        );
    }
}
