import React, {Component} from 'react';
import {connect} from 'react-redux';

class WeatherInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isGetInfo: false,
            info: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isGetInfo: true,
            info: nextProps.info
        })
    }

    checkInfo() {
        if(this.state.isGetInfo) {
            const {main, wind, clouds, name, sys, weather} = this.state.info;

            return (
                    <div className="wheather__container">
                        <div className="wheather__name">
                            <span className="wheather__city">{name}, </span>
                            <span className="wheather__country">{sys.country}</span>
                        </div>
                        <div className="wheather__temp">{parseInt(main.temp)}° C</div>
                        <div className="wheather__wheather-status">
                            <img className="wheather__wheather-ico" src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} width="30" height="30"></img>
                            <span className="wheather__wheather-status-text">{weather[0].main}</span>
                        </div>
                        <div className="wheather__info">
                            <span className="wheather__info-item wheather__pressure"><b>Pressure:</b> {main.pressure}</span>
                            <span className="wheather__info-item wheather__humidity"><b>Humidity:</b> {main.humidity}</span>
                            <span className="wheather__info-item wheather__wind-speed"><b>Wind speed:</b> {wind.speed} m/s</span>
                            <span className="wheather__info-item wheather__clouds"><b>Clouds:</b> {clouds.all}%</span>
                        </div>
                    </div>
            )
        } else {
            return false;
        }
    }

    render() {
        return this.checkInfo();
    }
}

export default connect(
    state => ({
        info: state.renderWeatherInfo
    })
)(WeatherInfo);

