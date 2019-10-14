// Encapsulating the axios that can be used to the whole project

import axios from 'axios';

export default function ajax(url, data={}, type='GET') {
    if(type === 'GET') { // for get request
        return axios.get(url, {
            params: data
        });
    } else {
        return axios.post(url, data);
    }
}

ajax('/user/register', {username: 'jason', password: '123456', email: '11111@111.com'}, 'POST');