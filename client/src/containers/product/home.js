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
        products: [],
    }

    initialColumns = () => {
        this.columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
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
                    dataSource={products} 
                    columns={this.columns} 
                />;
            </Card>
        )
    }
}