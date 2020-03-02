import React, { Component } from 'react';
import { Card, Table, Button, Icon, message, Modal } from 'antd';

import LinkButton from '../../components/link-button';
import { reqCategories, reqUpdateCategory, reqAddCategory } from '../../api';
import AddForm from './add-form';
import UpdateForm from './update-form';
import { PAGE_SIZE } from '../../utils/constants';

export default class Category extends Component {

    state = {
        categories: [], // first level category
        subCategories: [],
        loading: false, // used to determine whether it is in the process of getting data
        parentId: 'a', // the parent Id of the first level category
        parentName: '', // the name of the first level category
        showModalStatus: 0, // the status of modal, 0: both are hidden, 1: show add modal, 2: show update modal
    }

    // initiate the column of table 
    initColumns = () => {
        this.columns = [
            {
                title: 'Category',
                dataIndex: 'name',
            },
            {
                title: 'Action',
                width: 300,
                render: (category) => ( // return the tags for actions
                    <span>
                        <LinkButton onClick={() => this.showUpdateModal(category)}>Edit</LinkButton>
                        {this.state.parentId === 'a' ? <LinkButton onClick={() => this.showSubCategories(category)}>Check sub-categories</LinkButton> : null}
                    </span>
                )
            },
        ]
    }

    // get a list of categories by ajax 
    getCategories = async (parentId) => {
        // show loading before send the request
        this.setState({ loading: true });
        // const { parentId } = this.state;
        parentId = parentId || this.state.parentId;

        const categories = await reqCategories(parentId);

        this.setState({ loading: false });

        if (categories) {
            if (parentId === 'a') {
                this.setState({
                    categories
                });
            } else {
                this.setState({
                    subCategories: categories
                });
            }

        } else {
            message.error('failed to get category!');
        }

    }

    // show the sub categories based on the parent category
    showSubCategories = (category) => {
        // update the state 
        // * setState() is an asynchrnous update now, so we have to put getCategories() in callback so that we can get the new parentId!
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            // get the sub categories
            this.getCategories();
        });
    }

    // show the parent categories
    showCategories = () => {
        // set the states for showing the parent categories
        this.setState({
            parentId: 'a',
            parentName: '',
            subCategories: []
        });
    }

    // show the add modal
    showAddModal = () => {
        this.setState({
            showModalStatus: 1
        });
    }

    // show the update modal
    showUpdateModal = (category) => {
        // save a object of the category 
        this.category = category;

        // update the state
        this.setState({
            showModalStatus: 2
        });
    }

    // add a category
    addCategory = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                // hide the modal
                this.setState({
                    showModalStatus: 0
                });
                
                // collect the data form the form
                const { parentId, name } = values;

                // hide the incoming values
                this.form.resetFields();

                // make a request for adding category
                const result = await reqAddCategory(name, parentId);

                // refresh the category or sub-category list based on the parent id
                if (result) {
                    if (parentId === this.state.parentId) {
                        this.getCategories();
                    } else if (parentId === 'a') {
                        this.getCategories(parentId);
                    }
                }
            }
        });
    }

    // update a category
    updateCategory = () => {
        // Form validation
        this.form.validateFields(async (err, values) => {
            if (!err) {
                // hide the modal
                this.setState({
                    showModalStatus: 0
                });

                // get the values for updating a category
                const _id = this.category._id;
                const { name } = values;
            
                // clear the incoming values
                this.form.resetFields();

                // update the category by ajax
                const result = await reqUpdateCategory({_id, name});

                // show the new list
                if(result) {
                    this.getCategories();
                }
            }
        });
    }


    // hide the modal
    handleCancel = () => {

        // clear the incoming values
        this.form.resetFields();

        this.setState({
            showModalStatus: 0
        });
    }

    // used to load data before the first render
    componentWillMount() {
        this.initColumns();
    }

    // for ajax request 
    componentDidMount() {
        this.getCategories();
    }

    render() {
        // get the state
        const { categories, subCategories, parentId, parentName, loading, showModalStatus } = this.state;

        // get the specific category
        const category = this.category || {};

        // setup the left side of card
        const title = parentId === 'a' ? "Product's categories" : (
            <span>
                <LinkButton onClick={this.showCategories}>Product's categories</LinkButton>
                <Icon type='arrow-right' style={{ marginRight: 5 }} />
                <span>{parentName}</span>
            </span>
        );

        // setup the right side of card
        const extra = (
            <Button type="primary" onClick={this.showAddModal}>
                <Icon type="plus" />
                Add
            </Button>
        );

        return (
            <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={parentId === 'a' ? categories : subCategories}
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
                />

                <Modal
                    title="Add a Category"
                    visible={showModalStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm 
                        categories={categories} 
                        parentId={parentId}
                        setForm={(form) => {this.form = form}} 
                    />
                </Modal>

                <Modal
                    title="Update a category"
                    visible={showModalStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm 
                        name={category.name} 
                        setForm={(form) => {this.form = form}}
                    />
                </Modal>
            </Card>
        )
    }
}