import React, { Component } from 'react';
import * as CategoryServices from '../../app/services/options/category';

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
            this.handleRawData();
        }
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
                        <button className="btn btn-success btn-sm btn-block" data-toggle="modal" data-target="#popupModal">New Category</button>
                        <div className="modal fade" id="popupModal" tabIndex="-1" role="diaglog" aria-labelledby="popupModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-sm" role="document">
                                <NewCategoryFormModal listParents={this.state.parents} onCreateCategory={this.onCategoryCreated} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="nav nav-sidebar" data-nav-type="collapsible">
                        {this.state.parents.map((item) => {
                            return <Category key={item.id} information={item} />;
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
    }

    render() {
        const { information } = this.props;

        return (
            <li className="nav-item nav-item-submenu nav-item-open">
                <a className="nav-link bg-blue">{information.name}</a>
                <ul className="nav nav-group-sub" style={{display: "block"}}>
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
            parentId: 0
        }
    }

    updateNameValue(event) {
        this.setState({categoryName: event.target.value});
    }

    onCreateNewCategory() {
        let data = {
            name: this.state.categoryName,
            parent_id: this.state.parentId
        }
        CategoryServices.addNewSku(data, (res) => {
            if (res.data.err === 0) {
                this.props.onCreateCategory(res.data.data);
            }
        });
    }

    render() {
        const { listParents } = this.props;

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
                                <select className="form-control" id="parentCategoryName" onChange={(e) => this.setState({ parentId: e.target.value })}>
                                    <option value="0">None</option>
                                    {listParents.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.name}</option>;
                                    })}
                                </select>
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
