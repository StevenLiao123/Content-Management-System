import React, { Component } from 'react';
import macbook from '../../assets/images/product/macbook1.jpeg';
/*
    The component for product's details
*/
import {
    Card,
    Icon,
    List
} from 'antd';
import LinkButton from '../../components/link-button';
const Item = List.Item;

export default class ProductDetails extends Component {
    render() {
        const {name, description, price} = this.props.location.state
        
        const title = (
            <span>
                <LinkButton>
                    <Icon 
                        className="arrow-left" 
                        type="arrow-left" 
                        onClick={() => this.props.history.goBack()}
                        />
                </LinkButton>
                <span>Product's details</span>
            </span>
        );

        return (
            <Card title={title} className="product-details">
                <List>
                    <Item>
                        <span className="product product-name">Product's name</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="product product-description">Product's description</span>
                        <span>{description}</span>
                    </Item>
                    <Item>
                        <span className="product product-price">Product's price</span>
                        <span>${price}</span>
                    </Item>
                    <Item>
                        <span className="product product-category">Product's category</span>
                        <span>Computer --> Laptop</span>
                    </Item>
                    <Item>
                        <span className="product product-images">Product's images</span>
                        <span>
                            <img className="product-image" src={macbook} alt="macbook"/>
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}