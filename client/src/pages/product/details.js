import React, { Component } from 'react';

/*
    The component for product's details
*/
import {
    Card,
    Icon,
    List
} from 'antd';
import LinkButton from '../../components/link-button';
import PicturesWall from './pictures-wall';
import RichTextEditor from './rich-text-editor';
const Item = List.Item;

export default class ProductDetails extends Component {
    state = {
        showTextEditorToolbar: true
    };

    render() {
        const {name, description, price, images, detail} = this.props.location.state;
        const {showTextEditorToolbar} = this.state;
        
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
                        <span className="product product-images">Product's images</span>
                        <PicturesWall images={images}/>
                    </Item>
                    <Item>
                        <span className="product product-detail">Product's details</span>
                        <RichTextEditor detail={detail} showTextEditorToolbar={showTextEditorToolbar}/>
                    </Item>
                </List>
            </Card>
        )
    }
}