import React, { Component } from 'react';
import { reqWeather } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import { formatDate } from '../../utils/dateUtils';
import './index.less';
import { setInterval } from 'timers';

export default class Header extends Component {
    
    state = {
        currentTime: formatDate(Date.now()),
        name: '',
        temp: '',
        icon: '',
    }

    getCurrentTime = () => {
        // get the current time per 1 second and then update the state of currentTime
        setInterval(() => {
            const currentTime = formatDate(Date.now());
            this.setState({currentTime});
        }, 1000);
    }

    getWeather = async () => {
        // get the weather data by invoking the asynchronus API
        const { name, temp, icon } = await reqWeather('Sydney');

        // update the state
        this.setState({ name, temp, icon });
    }

    convertKelvinToCelsius = (temp) => {
        if (temp < (0)) {
            return 'below absolute zero (0 K)';
        } else {
            return (temp-273.15);
        }
    }

    componentDidMount() {
        // get the current time
        this.getCurrentTime();

        // get the current weather
        this.getWeather();

        // get the 
        this.convertKelvinToCelsius();
    }

    render() {
        const { currentTime, name, temp, icon } = this.state;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        const username = memoryUtils.user[0].username;

        return (
            <div className="header">
                <div className="header-top">
                    <span>Hello, {username}</span>
                    <a href="javascript:">Logout</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">Main Page</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <span>{name}</span>
                        <img src={iconUrl} alt="weather"/>
                        <span>{this.convertKelvinToCelsius(temp).toFixed(1)+`°C`}</span>
                    </div>
                </div>
            </div>
        )
    }
}