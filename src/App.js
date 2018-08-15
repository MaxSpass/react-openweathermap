import React, {Component} from 'react';
import {connect} from 'react-redux';
import LocationSearchInput from './components/LocationSearchInput';
import Logo from './components/Logo';
import DateComponent from './components/DateComponent';
import WeatherInfo from './components/WeatherInfo';
import WeatherTabs from './components/WeatherTabs';
import sun from './sun.svg';
import './App.css'

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row header__top justify-content-between align-items-center">
                        <Logo src={sun}/>
                        <LocationSearchInput />
                </div>

                <div className="date__wrap">
                    <DateComponent />
                </div>

                <WeatherInfo />
                <WeatherTabs />

            </div>
        );
    }
}


export default connect()(App);
