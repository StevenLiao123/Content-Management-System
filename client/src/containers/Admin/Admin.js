import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import memoryUtils from '../../utils/memoryUtils';

// asdasdas
class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        // if memory doesn't have user just redirect to login page.
        if(!user[0] || !user[0]._id) {
            return <Redirect to='/login' />
        }
        return <div>
            <p>Hello {user[0].username}</p>
        </div>;
    }
}

export default Admin;