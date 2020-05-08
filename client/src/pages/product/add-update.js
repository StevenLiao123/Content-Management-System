import React, { Component } from "react";
import { Card, Form, Input, Icon, Button, message } from "antd";
import { connect } from "react-redux";
import LinkButton from "../../components/link-button";
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";
import { reqAddProduct, reqUpdateProdcut } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import { logout } from "../../redux/actions";

/*
    The component for product's add and update page
*/
const { Item } = Form;
const { TextArea } = Input;

class ProductAddAndUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPictureWallModal: true
    };

    this.picturesWall = React.createRef();
    this.richTextEditor = React.createRef();
  }

  submit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log("Submit" + values.name + values.description);
        const images = this.picturesWall.current.getImages();
        const detail = this.richTextEditor.current.getContentDetail();
        // console.log("images "+images+"detail "+detail);
        const { name, description, price } = values;
        const _id = this.product._id;
        const result = this.isUpdate
          ? await reqUpdateProdcut(
              _id,
              name,
              description,
              price,
              images,
              detail
            )
          : await reqAddProduct(name, description, price, images, detail);
        if (result.data.status === "1") {
          message.success(result.data.message);
          this.props.history.goBack();
        } else if (result.data.status === "0") {
          memoryUtils.user = {};
          memoryUtils.token = "";
          this.props.logout();
        }
      }
    });
  };

  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback();
    }
    callback("The price must be larger than 0");
  };

  UNSAFE_componentWillMount() {
    const product = this.props.location.state;
    this.isUpdate = !!product;
    this.product = product || {};
  }

  render() {
    const { isUpdate, product } = this;
    const { images, detail } = product;
    const { showPictureWallModal } = this.state;

    // the antd object for setting the layout of the item of the form
    const formItemLayout = {
      labelCol: { span: 3 }, // set up the width of the left side of the label
      wrapperCol: { span: 7 } // set up the width of the input
    };

    const title = (
      <span>
        <LinkButton>
          <Icon
            className="arrow-left"
            type="arrow-left"
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>
        <span>{isUpdate ? "Update a product" : "Add a product"}</span>
      </span>
    );

    const { getFieldDecorator } = this.props.form;

    return (
      <Card title={title} className="product-add-update">
        <Form {...formItemLayout}>
          <Item label="Product's name">
            {getFieldDecorator("name", {
              initialValue: product.name,
              rules: [
                {
                  required: true,
                  message: "This field cannot be left blank"
                }
              ]
            })(<Input placeholder="please enter the name" />)}
          </Item>
          <Item label="Product's description">
            {getFieldDecorator("description", {
              initialValue: product.description,
              rules: [
                {
                  required: true,
                  message: "This field cannot be left blank"
                }
              ]
            })(
              <TextArea
                placeholder="please enter the description"
                autosize={{ minRows: 2, maxRows: 5 }}
              />
            )}
          </Item>
          <Item label="Product's price">
            {getFieldDecorator("price", {
              initialValue: product.price,
              rules: [
                {
                  required: true,
                  message: "This field cannot be left blank"
                },
                {
                  validator: this.validatePrice
                }
              ]
            })(
              <Input
                type="number"
                prefix="$"
                suffix="AU"
                placeholder="please enter the price"
              />
            )}
          </Item>
          <Item label="Product's images">
            <PicturesWall
              ref={this.picturesWall}
              images={images}
              showPictureWallModal={showPictureWallModal}
            />
          </Item>
          <Item
            label="Product's detail"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 16 }}
          >
            <RichTextEditor ref={this.richTextEditor} detail={detail} />
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit}>
              Submit
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

// export default Form.create()(ProductAddAndUpdate);
export default connect(null, { logout })(Form.create()(ProductAddAndUpdate));
