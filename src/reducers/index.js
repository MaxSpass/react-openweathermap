import {combineReducers} from 'redux';

import renderWeatherInfo from './renderWeatherInfo';
import renderChart from './renderChart';

export default combineReducers({
    renderWeatherInfo,
    renderChart,
})