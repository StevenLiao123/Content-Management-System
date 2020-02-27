import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import LinkButton from '../../components/link-button';
import { Modal } from 'antd';
import menuList from '../../config/menuConfig';
import { reqWeather } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { formatDate } from '../../utils/dateUtils';
import './index.less';
import { setInterval } from 'timers';

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

    getTitle = () => {
        // get the current path
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            // the title of item of menulist is the title that should be display on the main page if the key of item totally equal to the current path
            if(item.key === path) {
                title = item.title;
            } else if(item.children) {
                // use the same login in children to find the key of item equal to path and then get the corresponding title
                item.children.find(subItem => {
                    if(subItem.key === path) {
                        title = subItem.title;
                    }
                });
            }
        });
        return title;
    }

    logout = () => {
       Modal.confirm({
        title: 'Do you Want to logout?',
        onOk: () => {
          // console.log('ok',this);
          // delete the data of user in localStorage
          storageUtils.removeUser();
          memoryUtils.user = {};

          // jump to the login page
          this.props.history.replace('/login');
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
        const username = memoryUtils.user[0].username;
        const title = this.getTitle();

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

export default withRouter(Header);