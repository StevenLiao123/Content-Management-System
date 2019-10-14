import React, { Component } from 'react';

// asdasdas
export default class Admin extends Component {
    fetchData = () => {
        fetch('http://localhost:4000/user/')
            .then((res) => {
                console.log(res.json());
            })
    };

    render() {
        const fetchData = this.fetchData();
        return <div>
            <button onClick={fetchData}>click me!</button>
        </div>;
    }
}