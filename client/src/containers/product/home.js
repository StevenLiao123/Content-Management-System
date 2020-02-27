import React, { Component } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table
} from 'antd';
/*
    The component for product's home page
*/

const Option = Select.Option;

export default class ProductHome extends Component {
    state = {
        products: [{
            "_id": "sadasdsadasdasd",
            "image": "5dae86bdbd2a2a0a462882e3sd",
            "name": "superwoman11",
            "description": "asdasdasdasdasdasdddasd",
            "price": 888,
            "pCategoryId": "adasdasdasdasda",
            "categoryId": "asdsadasdasdasdasd",
            "detail": "asdsadasfsdgdfgdfgdfgfdgdfg"
        },{
            "_id": "11sadasdsadasdasdasd",
            "image": "5dae86bdbd2a2a0a462882e3ssd",
            "name": "superman",
            "description": "asdasdasdasdasdasdasd",
            "price": 778,
            "pCategoryId": "adasdasdsdasdasda",
            "categoryId": "asdsdsadasdasdasdasd",
            "detail": "asdsassdasfsdgdfgdfgdfgfdgdfg"
        }],
    }

    initialColumns = () => {
        this.columns = [
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Description',
              dataIndex: 'description',
            },
            {
              title: 'Price',
              dataIndex: 'price',
              render: (price) => '$' + price
            },
            {
                title: 'Status',
                dataIndex: 'price',
                render: (price) => '$' + price
              },
          ];
    }

    componentWillMount () {
        this.initialColumns();
    }

    render() {
        const { products } = this.state;

        const title = (
            <span>
                <Select value="1" style={{width: 130}}>
                    <Option value="1">By name</Option>
                    <Option value="2">By description</Option>
                </Select>
                <Input placeholder="key words" style={{width: 150, margin: '0 15px'}}/>
                <Button type="primary">Search</Button>
            </span>
        );

        const extra = (
            <Button type="primary">
                <Icon type="plus"/>
                Add
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table 
                    rowKey="_id"
                    dataSource={products} 
                    columns={this.columns} 
                />;
            </Card>
        )
    }
}