import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import * as CategoryServices from '../../app/services/options/category';

export class CategoryList extends Component {
    displayName = CategoryList.name;

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            listSkusRaw: [],
            parents: [],
            children: []
        }
    }

    componentDidMount() {
        CategoryServices.getListSku(1, 50, (res) => {
            if (res.data.err === 0) {
                this.setState({listSkusRaw: res.data.data});
                this.handleRawData();
            }
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
            this.setState({parents});
            this.setState({parents});
        }
    }

    onOpenModal = () => {
        this.setState({open: true});
    }

    onCloseModal = () => {
        this.setState({open: false});
    }

    render() {
        const { open } = this.state;

        return (
            <div className="card">
                <div className="card-header header-elements-inline">
                    <div className="header-elements">
                    <button className="btn btn-success btn-lg btn-block" onClick={this.onOpenModal}>New Category</button>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <NewCategoryFormModal listParents={this.state.parents} />
                    </Modal>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="nav nav-sidebar" data-nav-type="collapsible">
                        {this.state.parents.map((item) => {
                            return <Category information={item} />;
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
            <li className="nav-item nav-item-submenu">
                <a className="nav-link">{information.name}</a>
                <ul className="nav nav-group-sub">
                    {information.children.map((item) => {
                        return <SubCategory information={item} />;
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

    }

    render() {
        const { listParents } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="col-md-1">
                    </div> 
                    <div className="col-md-10">
                        <div className="form-group">
                            <label htmlFor="subCategoryName">Name</label>
                            <input type="text" id="subCategoryName" className="form-control" onChange={(event) => this.updateNameValue(event)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="parentCategoryID">Parent Category (Optional)</label>
                            <select className="form-control" id="parentCategoryName">
                                <option value="0">None</option>
                                {listParents.map((item) => {
                                    return <option value={item.id}>{item.name}</option>;
                                })}                
                            </select>
                        </div>
                    </div>
                    <div className="col-md-1">
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                    </div>
                    <div className="col-md-2">
                        <button onClick={() => this.onCreateNewCategory()} className="btn btn-success btn-sm btn-block">Done</button>
                    </div>
                    <div className="col-md-1">
                    </div>
                </div>
            </div>
        );
    }
}
