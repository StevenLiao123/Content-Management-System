/*
    This module is providing API functions for different requests.
*/
import jsonp from 'jsonp';
import ajax from './ajax';
import { message } from 'antd';

const BASE = process.env.NODE_ENV === "production" ? "https://floating-beyond-26711.herokuapp.com" : "http://localhost:8080";

// Login
export const reqLogin = (username, password) => ajax(BASE + '/user/login', { username, password }, 'POST');

// Sign up
export const reqSignup = (username, password, email) => ajax(BASE + '/user/signup', { username, password, email }, 'POST');

// get a list of categories based on the parentId
export const reqCategories = (parentId) => ajax(BASE + '/category/list', {parentId}, 'POST');

// Add a category
export const reqAddCategory = (name, parentId) => ajax(BASE + '/category/add', {name, parentId}, 'POST');

// Update a category
export const reqUpdateCategory = ({_id, name}) => ajax(BASE + '/category/update', {_id, name}, 'POST');

// get a list of products
export const reqProducts = () => ajax(BASE + '/product', {}, 'GET');

// get a list of products
// export const reqSearchProdcuts = ({searchName, searchType}) => ajax(BASE + '/product/list', {searchName, searchType}, 'POST');

// get a list of products by name
export const reqSearchProdcutsByName = (searchName) => ajax(BASE + '/product/list/name', {searchName}, 'POST');

// get a list of products by description
export const reqSearchProdcutsByDescription = (searchName) => ajax(BASE + '/product/list/description', {searchName}, 'POST');

// get a list of products
export const reqUpdateProdcutsStatus = (_id, status) => ajax(BASE + '/product/update/status', {_id, status}, 'POST');

// jsonp request for weather
export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5481d01e1f55fc521a219134e8545e8e`;

        // execute jsonp request
        jsonp(url, {}, (error, data) => {
            if (!error) {
                // get the name, icon and description from openWeather API
                const name = data.name;
                const icon = data.weather[0].icon;
                const temp = data.main.temp;
                resolve({ name, temp, icon } );
            } else {
                message.error('Get weather API Failed!');
            }
        });
    });
}

reqWeather('Sydney');

// Add an user
//export const addUser = (user) => ajax('/user/register', user, 'POST');
