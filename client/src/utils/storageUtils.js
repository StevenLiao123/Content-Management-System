/*
    used to save data in local storage
*/
import store from 'store';

const USER_KEY = 'user_key';
const TOKEN_KEY = 'token_key';

export default {
    // save user
    saveUser(user) {
        //localStorage.setItem(USER_KEY, JSON.stringify(user));
        store.set(USER_KEY, user);
    },

    // read user
    getUser() {
        //return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return store.get(USER_KEY) || {};
    },

    // delete user
    removeUser() {
        //localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    },

    // save token
    saveToken(token) {
        store.set(TOKEN_KEY, token);
    },

    // read token
    getToken() {
        return store.get(TOKEN_KEY) || "";
    },

    // remove token
    removeToken() {
        store.remove(TOKEN_KEY);
    }
}