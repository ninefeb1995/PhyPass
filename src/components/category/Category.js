import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export class CategoryList extends Component {
    displayName = CategoryList.name;
    state = {
        open: false
    }

    onOpenModal = () => {
        this.setState({open: true});
    }

    onCloseModal = () => {
        this.setState({open: false});
    }

    render() {
        const {open} = this.state;

        return (
            <div className="card">
                <div className="card-header header-elements-inline">
                    <div className="header-elements">
                    <button className="btn btn-success btn-lg btn-block" onClick={this.onOpenModal}>New Category</button>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <NewCategoryFormModal />
                    </Modal>
                    </div>
                </div>
                <div className="card-body">
                    <ul class="nav nav-sidebar" data-nav-type="collapsible">
                        <Category />
                    </ul>
                </div>
            </div>
        );
    }
}

export class Category extends Component {
    displayName = Category.name;

    render() {
        return (
            <li class="nav-item nav-item-submenu">
                <a className="nav-link">552</a>

                <ul className="nav nav-group-sub">
                    <SubCategory />
                </ul>
            </li>
        );
    }
}

export class SubCategory extends Component {
    displayName = SubCategory.name;

    render() {
        return (
            <li className="nav-item">
                <a className="nav-link">552_01</a>
            </li>
        );
    }
}

export class NewCategoryFormModal extends Component {
    displayName = NewCategoryFormModal.name;

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-1">
                    </div> 
                    <div className="col-md-10">
                        <div className="form-group">
                            <label for="subCategoryName">Name</label>
                            <input type="text" id="subCategoryName" className="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="parentCategoryID">Parent Category (Optional)</label>
                            <select className="form-control" id="parentCategoryName">
                                <option>552_1</option>
                                <option>552_1</option>
                                <option>552_1</option>
                                <option>552_1</option>
                                <option>552_1</option>
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
                        <button className="btn btn-success btn-sm btn-block">Done</button>
                    </div>
                    <div className="col-md-1">
                    </div>
                </div>
            </div>
        );
    }
}