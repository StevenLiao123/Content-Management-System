import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'react-redux';

import { setHeaderTitle } from '../../redux/actions';
import './not-found.less';

/*
    404 Not Found Page
*/
class NotFound extends Component {

    goHomePage = () => {
        this.props.setHeaderTitle('Home');
        this.props.history.replace('/home');
    }

    render() {
        return (
            <Row className="not-found">
                <Col span={12} className="left"></Col>
                <Col span={12} className="right">
                    <h1>404 Error</h1>
                    <h2>Sorry, the page you are looking for is not found.</h2>
                    <div>
                        <Button type="primary" onClick={this.goHomePage}>
                            Back to Home
                        </Button>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default connect(
    null,
    { setHeaderTitle }
)(NotFound);