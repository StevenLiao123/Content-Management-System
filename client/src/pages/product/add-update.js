import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Icon,
    Upload,
    Button,
    Tooltip 
} from 'antd';
import LinkButton from '../../components/link-button';
import PicturesWall from './pictures-wall';
/*
    The component for product's add and update page
*/
const { Item } = Form;
const { TextArea } = Input;

class ProductAddAndUpdate extends Component {
    submit = () => {
        this.props.form.validateFields((err, values) => {
            if(!err) {
                alert("Submit" + values.name);
            }
        })
    };

    validatePrice = (rule, value, callback) => {
        if( value*1 > 0 ) {
            callback();
        }
        callback("The price must be larger than 0");
    };

    render() {
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
                <span>Add a product</span>
            </span>
        );

        const { getFieldDecorator } = this.props.form;

        return (
            <Card title={title} className="product-add-update">
                <Form {...formItemLayout} >
                    <Item label="Product's name">
                        { 
                            getFieldDecorator('name', {
                                initialValue: '',
                                rules: [{
                                    required: true,
                                    message: "This field cannot be left blank"
                                }]
                            })(<Input placeholder="please enter the name"/>)
                        }
                    </Item>
                    <Item label="Product's description">
                        { 
                            getFieldDecorator('description', {
                                initialValue: '',
                                rules: [{
                                    required: true,
                                    message: "This field cannot be left blank"
                                }]
                            })( <TextArea 
                                    placeholder="please enter the description" 
                                    autosize={{ minRows: 2, maxRows: 5}} 
                                />)
                        }
                    </Item>
                    <Item label="Product's price">
                        { 
                            getFieldDecorator('price', {
                                initialValue: '',
                                rules: [{
                                    required: true,
                                    message: "This field cannot be left blank",
                                }, {
                                    validator: this.validatePrice
                                }]
                            })( <Input 
                                    type="number" 
                                    prefix="$" 
                                    suffix="AU" 
                                    placeholder="please enter the price"
                                />)
                        }
                    </Item>
                    <Item label="Product's images">
                        <PicturesWall />
                    </Item>
                    <Item label="Product's detail">
                        Detail
                    </Item>
                    <Item>
                        <Button type="primary" onClick={this.submit}>
                            Submit
                        </Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddAndUpdate);