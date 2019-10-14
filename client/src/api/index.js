/*
    This module is providing API functions for different requests.
*/

import ajax from './ajax';

// Login
export const reqLogin = (username, password) => ajax('/user/login', {username, password}, 'POST');

// Add an user
export const addUser = (user) => ajax('/user/register', user, 'POST');
