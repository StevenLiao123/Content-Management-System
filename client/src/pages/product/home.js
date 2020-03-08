import React, { Component } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message,
} from 'antd';

import { reqProducts, reqSearchProdcutsByName, reqSearchProdcutsByDescription } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';

import LinkButton from '../../components/link-button';
/*
    The component for product's home page
*/

const Option = Select.Option;

export default class ProductHome extends Component {
    state = {
        products: [],
        loading: false, // used to determine whether it is in the process of getting data,
        searchName: "", // keywords need to search
        searchType: 'name', // search by type
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
                width: 100,
                title: 'Status',
                render: (status) => {
                    return (
                        <span>
                            { status === "1" ? <Button type="primary">Off the market</Button> : <Button type="primary">On the market</Button> }
                            { status === "1" ? <span>Available</span> : <span>Off store</span> }
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: 'Function',
                render: (products) => {
                    return (
                        <span>
                            <LinkButton>Details</LinkButton>
                            <LinkButton>Edit</LinkButton>
                        </span>
                    )
                }
            },
          ];
    }

    // get a list of products by ajax 
    getProducts = async () => {
        // show loading before send the request
        this.setState({ loading: true }); 

        const { searchName, searchType } = this.state;

        // get products based on name or description
        let products;
        if (searchType === "name") {
            products = await reqSearchProdcutsByName(searchName);
        } else if (searchType === "description") {
            products = await reqSearchProdcutsByDescription(searchName);
        } else {
            products = await reqProducts();
        }

        // get the products and update the state and then display the
        this.setState({ loading: false });  
        if (products) {
            this.setState({
                products
            })
        } else {
            message.error('failed to get products!');
        }
    }

    componentWillMount () {
        this.initialColumns();
    }

    componentDidMount () {
        this.getProducts();
    }

    render() {
        const { products, loading, searchName, searchType } = this.state;

        const title = (
            <span>
                <Select 
                    value={searchType} 
                    style={{width: 130}}
                    onChange={value => this.setState({searchType: value})}
                >
                    <Option value="name">By name</Option>
                    <Option value="description">By description</Option>
                </Select>
                <Input 
                    placeholder="key words" 
                    style={{width: 150, margin: '0 15px'}} 
                    value={searchName}
                    onChange={event => this.setState({searchName: event.target.value})}
                    />
                <Button 
                    type="primary"
                    onClick={() => this.getProducts()}
                    >Search</Button>
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
                    loading={loading}
                    bordered 
                    rowKey="_id"
                    dataSource={products} 
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }} 
                />;
            </Card>
        )
    }
}