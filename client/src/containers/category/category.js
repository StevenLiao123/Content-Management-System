import React, { Component } from 'react';
import { Card, Table, Button, Icon } from 'antd';

import LinkButton from '../../components/link-button';

export default class Category extends Component {
    render() {

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
          
          const columns = [
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
          ];

        return (
            <Card title={title} extra={extra} >
                <Table 
                    bordered
                    rowKey='_id'
                    dataSource={dataSource} 
                    columns={columns} 
                />
            </Card>
        )
    }
}