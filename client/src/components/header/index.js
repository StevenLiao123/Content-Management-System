import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LinkButton from '../../components/link-button';
import { Modal } from 'antd';
import { reqWeather } from '../../api';
import { formatDate } from '../../utils/dateUtils';
import './index.less';
import { setInterval } from 'timers';
import { logout } from '../../redux/actions';

class Header extends Component {
    
    state = {
        currentTime: formatDate(Date.now()),
        name: '',
        temp: '',
        icon: '',
    }

    getCurrentTime = () => {
        // get the current time per 1 second and then update the state of currentTime
        this.intervalId = setInterval(() => {
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

    logout = () => {
       Modal.confirm({
        title: 'Do you Want to logout?',
        onOk: () => {
            this.props.logout();
        }
      }); 
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

        // get the Celsius
        this.convertKelvinToCelsius();
    }

    // used to clear the timer before the component unload
    componentWillUnmount() {
        // clear the timer
        clearInterval(this.intervalId);
    }

    render() {
        const { currentTime, name, temp, icon } = this.state;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        const username = this.props.user.username;
        const title = this.props.headerTitle;

        return (
            <div className="header">
                <div className="header-top">
                    <span>Hello, {username}</span>
                    <LinkButton onClick={this.logout}>Logout</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span className="disabled">{currentTime}</span>
                        <span className="disabled">{name}</span>
                        <img src={iconUrl} alt="weather"/>
                        <span>{this.convertKelvinToCelsius(temp).toFixed(1)+`°C`}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ headerTitle: state.headerTitle, user: state.user }),
    { logout }
)(withRouter(Header));