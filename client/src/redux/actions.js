/*
    The module includes some functions of action creator
*/

import { 
    SET_HEADER_TITLE,
    RECEIVE_USER,
    RESET_USER 
} from './action-types';

import { reqLogin } from '../api';
import { message } from 'antd';
import storageUtils from '../utils/storageUtils';

// synchronous 
export const setHeaderTitle = (headTitle) => ({
    type: SET_HEADER_TITLE,
    data: headTitle
});

export const receiveUserSuccess = (user) => ({
    type: RECEIVE_USER,
    user
});

// logout 
export const logout = () => {
    // delete the user in the local storage
    storageUtils.removeUser();

    //return action
    return {type: RESET_USER}
};

// asynchronous
export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password);
        if (result) {
            // dispatch action with user if success
            const user = result.data[0];
            // save the user to the local storage
            storageUtils.saveUser(user);
            message.success('Login successful!'); 
            dispatch(receiveUserSuccess(user));
        }
        return null;
    }
};

