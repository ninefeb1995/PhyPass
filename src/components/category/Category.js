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
                this.setState({listSkusRaw: res.data.data});
                this.handleRawData();
            }
        });
    }

    onCategoryCreated(data) {
        if (data) {
            const temp = this.state.listSkusRaw.slice();
            temp.push(data);
            this.setState({listSkusRaw: temp});
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
        this.setState({listSkusRaw: temp});
        this.handleRawData();
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
            this.setState({parents, children});
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header header-elements-inline">
                    <div className="header-elements">
                        <button className="btn btn-success btn-sm" data-toggle="modal" data-target="#popupModal">New Category</button>
                        <div className="modal fade" id="popupModal" tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
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
            this.state.toggle? this.setState({toggle: false}) : this.setState({toggle: true});
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
            <li className={this.state.toggle? "nav-item nav-item-submenu nav-item-open" : "nav-item nav-item-submenu"}>
                <span onClick={(e) => this.toggle(e)} style={{cursor: "pointer"}} className="nav-link bg-blue">
                    {information.name}
                    <i onClick={(e) => this.onEditSku(e)} data-toggle="modal" data-target={"#popupEditModal"+information.id} className="fa fa-edit margin-left-10"></i>                   
                </span>
                <div className="modal fade" id={"popupEditModal"+information.id} tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-sm" role="document">
                        <EditCategoryFormModal listParents={this.props.listParents} baseData={information} onEditedCategory={this.onCategoryEdited} />
                    </div>
                </div>
                <ul className="nav nav-group-sub" style={{display: this.state.toggle? "block" : ""}}>
                    {information.children.map((item) => {
                        return <SubCategory key={item.id} information={item} />;
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
    }

    render() {
        const { information } = this.props;

        return (
            <li className="nav-item">
                <a className="nav-link">{information.name}</a>
            </li>
        );
    }
}

export class NewCategoryFormModal extends Component {
    displayName = NewCategoryFormModal.name;

    constructor(props) {
        super(props);
        this.state = {
            categoryName: '',
            parentId: 0,
            selectedOption: []
        }
    }

    updateNameValue(event) {
        this.setState({categoryName: event.target.value});
    }

    updateParenIDValue = (selectedOption) => {
        this.setState({
            parentId: selectedOption.value,
            selectedOption
        })
    }

    onCreateNewCategory() {
        let data = {
            name: this.state.categoryName,
            parent_id: this.state.parentId
        }
        CategoryServices.addNewSku(data, (res) => {
            if (res.data.err === 0) {
                this.props.onCreatedCategory(res.data.data);
            }
        });
    }

    render() {
        const { selectedOption } = this.state;
        const { listParents } = this.props;
        let options = [];

        options.push({
            value: '0',
            label: 'None'
        })

        listParents.map((item) => {
            let option = {
                value: item.id,
                label: item.name
            }

            options.push(option);
        })

        return (
            <div className="modal-content">
                <div className="modal-header bg-blue">
                    <h4 className="modal-title" style={{paddingTop: "0.3em"}}>NEW CATEGORY</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div> 
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div className="position-relative row">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Category Name:</label>
                            <div className="col-6">
                                <input onChange={(event) => this.updateNameValue(event)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative form-group row">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Parent Category (Optional):</label>
                            <div className="col-6">
                                <Select value={selectedOption} options={options} onChange={this.updateParenIDValue}
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
                    <button onClick={() => this.onCreateNewCategory()} data-dismiss="modal" className="btn btn-success btn-sm">Done</button>
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
            categoryName: '',
            parentId: 0,
            selectedOption: []
        }
    }

    componentWillMount() {
        this.setState({
            categoryName: this.props.baseData.name,
            parentId: this.props.baseData.parentId,
        });
    }

    updateNameValue(event) {
        this.setState({categoryName: event.target.value});
    }

    updateParenIDValue = (selectedOption) => {
        this.setState({
            parentId: selectedOption.value,
            selectedOption
        })
    }

    onEditCategory() {
        let data = {
            id: this.props.baseData.id,
            name: this.state.categoryName,
            parent_id: this.state.parentId
        }

        CategoryServices.updateSku(data, (res) => {
            if (res.data.err === 0) {
                this.props.onEditedCategory(data);
            }
            // else if (res.data.err === 0) {
            //     toast("Internal server error", {
            //         type: toast.TYPE.ERROR,
            //         autoClose: 2000
            //     });
            // }else if (res.data.err === 0) {
            //     toast("Internal server error", {
            //         type: toast.TYPE.ERROR,
            //         autoClose: 2000
            //     });
            // }else if (res.data.err === 0) {
            //     toast("Internal server error", {
            //         type: toast.TYPE.ERROR,
            //         autoClose: 2000
            //     });
            // }
        });
    }

    render() {
        const { selectedOption } = this.state;
        const { listParents } = this.props;
        let options = [];

        options.push({
            value: '0',
            label: 'None'
        })

        listParents.map((item) => {
            let option = {
                value: item.id,
                label: item.name
            };
            
            options.push(option);
        })

        return (
            <div className="modal-content">
                <div className="modal-header bg-blue">
                    <h4 className="modal-title" style={{paddingTop: "0.3em"}}>EDIT CATEGORY</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div> 
                <div className="modal-body">
                    <div className="form-horizontal">
                        <div className="position-relative row">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Category Name:</label>
                            <div className="col-6">
                                <input onChange={(event) => this.updateNameValue(event)} type="text" value={this.state.categoryName} className="form-control" />
                            </div>
                        </div>
                        <div className="position-relative form-group row">
                            <label className="col-6 col-sm-6 col-md-6 col-xl-6 col-form-label">Parent Category (Optional):</label>
                            <div className="col-6">
                                <Select value={selectedOption} options={options} onChange={this.updateParenIDValue}
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
                    <button onClick={() => this.onEditCategory()} data-dismiss="modal" className="btn btn-success btn-sm">Done</button>
                </div>             
            </div>
        );
    }
}
