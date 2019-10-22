import React, { Component } from 'react';
import { Card, Table, Button, Icon } from 'antd';

import LinkButton from '../../components/link-button';
import { reqCategories } from '../../api';

export default class Category extends Component {

    state = {
        categories: [], // first level category
        loading: false, // used to determine whether it is in the process of getting data
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
                render: () => ( // return the tags for actions
                    <span>
                        <LinkButton>Edit</LinkButton>
                        <LinkButton>Check sub-categories</LinkButton>
                    </span>
                )
            },
        ]
    }

    // get a list of the first level category by ajax 
    getCategories = async () => {
        // show loading before send the request
        this.setState({ loading: true });

        const categories = await reqCategories("0");

        this.setState({ loading: false });

        if(categories) {
            this.setState({
                categories
            });
        }
       
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

        const { categories, loading } = this.state;

        // setup the left side of card
        const title = "Product's categories";

        // setup the right side of card
        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                Add
            </Button>
        );

        const dataSource = [
            {
                "_id": "5dad4a88fd19020bd325914b",
                "parentId": 0,
                "name": "Household Appliances",
                "__v": 0
            },
            {
                "_id": "5dad4fa6a53d070c44054b76",
                "parentId": 0,
                "name": "Books",
                "__v": 0
            },
            {
                "_id": "5dad5083a53d070c44054b77",
                "parentId": 0,
                "name": "Computers",
                "__v": 0
            },
            {
                "_id": "5dad5098a53d070c44054b78",
                "parentId": 0,
                "name": "Foods",
                "__v": 0
            }
        ];


        return (
            <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={categories}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 6, showQuickJumper: true }}
                />
            </Card>
        )
    }
}