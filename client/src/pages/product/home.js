import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";
import { connect } from "react-redux";
import {
  reqProducts,
  reqSearchProdcutsByName,
  reqSearchProdcutsByDescription,
  reqUpdateProdcutsStatus,
  reqDeleteProduct
} from "../../api";
import { PRODUCT_PAGE_SIZE } from "../../utils/constants";
import memoryUtils from "../../utils/memoryUtils";
import { logout } from "../../redux/actions";

import LinkButton from "../../components/link-button";
/*
    The component for product's home page
*/

const Option = Select.Option;

class ProductHome extends Component {
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
    if (result.data.status === "1") {
      message.success(result.data.message);
      this.getProducts();
    } else if (result.data.status === "0") {
      memoryUtils.user = {};
      memoryUtils.token = "";
      this.props.logout();
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
    let result;
    if (searchType === "name") {
      result = await reqSearchProdcutsByName(searchName);
    } else if (searchType === "description") {
      result = await reqSearchProdcutsByDescription(searchName);
    } else {
      result = await reqProducts();
    }

    // get the products and update the state and then display the
    this.setState({ loading: false });
    if (result.data.status === "1") {
      this.setState({
        products: result.data.products
      });
    } else if (result.data.status === "0") {
      memoryUtils.user = {};
      memoryUtils.token = "";
      this.props.logout();
    }
  };

  updateProdcutsStatus = async (_id, status) => {
    const result = await reqUpdateProdcutsStatus(_id, status);
    if (result.data.status === "1") {
      message.success(result.data.message);
      this.getProducts();
    } else if (result.data.status === "0") {
      memoryUtils.user = {};
      memoryUtils.token = "";
      this.props.logout();
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

export default connect(
  null, 
  { logout }
)(ProductHome);