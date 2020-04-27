import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";

import {
  reqProducts,
  reqSearchProdcutsByName,
  reqSearchProdcutsByDescription,
  reqUpdateProdcutsStatus,
  reqDeleteProduct
} from "../../api";
import { PRODUCT_PAGE_SIZE } from "../../utils/constants";

import LinkButton from "../../components/link-button";
/*
    The component for product's home page
*/

const Option = Select.Option;

export default class ProductHome extends Component {
  state = {
    products: [],
    loading: false, // used to determine whether it is in the process of getting data,
    searchName: "", // keywords need to search
    searchType: "name" // search by type
  };

  deleteProduct = async _id => {
    // show loading before send the request
    this.setState({ loading: true });

    const result = await reqDeleteProduct(_id);
    if (result) {
      message.success(result.data.message);
      this.getProducts();
    }
  };

  initialColumns = () => {
    this.columns = [
      {
        title: "Name",
        dataIndex: "name"
      },
      {
        title: "Description",
        dataIndex: "description"
      },
      {
        title: "Price",
        dataIndex: "price",
        render: price => "$" + price
      },
      {
        width: 100,
        title: "Status",
        render: products => {
          const { _id, status } = products;
          const newStatus = status === "1" ? "0" : "1";
          return (
            <span>
              <Button
                type="primary"
                onClick={() => this.updateProdcutsStatus(_id, newStatus)}
              >
                {status === "1" ? "Off the market" : "On the market"}
              </Button>
              <span>{status === "1" ? "Available" : "Off store"}</span>
            </span>
          );
        }
      },
      {
        width: 100,
        title: "Function",
        render: products => {
          const { _id } = products;
          return (
            <span>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/product/details", products)
                }
              >
                Details
              </LinkButton>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/product/add-update", products)
                }
              >
                Edit
              </LinkButton>
              <LinkButton onClick={() => this.deleteProduct(_id)}>
                Delete
              </LinkButton>
            </span>
          );
        }
      }
    ];
  };

  // get a list of products by ajax
  getProducts = async () => {
    // show loading before send the request
    this.setState({ loading: true });

    const { searchName, searchType } = this.state;

    // get products based on name or description
    let results;
    if (searchType === "name") {
      results = await reqSearchProdcutsByName(searchName);
    } else if (searchType === "description") {
      results = await reqSearchProdcutsByDescription(searchName);
    } else {
      results = await reqProducts();
    }

    // get the products and update the state and then display the
    this.setState({ loading: false });
    if (results) {
      this.setState({
        products: results.data.products
      });
    } else {
      message.error("failed to get products!");
    }
  };

  updateProdcutsStatus = async (_id, status) => {
    const result = await reqUpdateProdcutsStatus(_id, status);
    if (result) {
      message.success(result.data.message);
      this.getProducts();
    }
  };

  UNSAFE_componentWillMount() {
    this.initialColumns();
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const { products, loading, searchName, searchType } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 130 }}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value="name">By name</Option>
          <Option value="description">By description</Option>
        </Select>
        <Input
          placeholder="key words"
          style={{ width: 150, margin: "0 15px" }}
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type="primary" onClick={() => this.getProducts()}>
          Search
        </Button>
      </span>
    );

    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/product/add-update")}
      >
        <Icon type="plus" />
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
          pagination={{
            defaultPageSize: PRODUCT_PAGE_SIZE,
            showQuickJumper: true
          }}
        />
      </Card>
    );
  }
}
