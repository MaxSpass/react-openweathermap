import axios from 'axios';

import {
    RENDER_LOCATION_INFO,
    RENDER_CHART,
} from '../actionTypes'

// const __OPENWEATHER_API_KEY__ = 'c32f3774c6033c4a2b3f2b60f195aefa';
const __OPENWEATHER_API_KEY__ = '6637040957bc1f63889e3236419a73b5';

export const callData = (requestUrl) => {
    return axios.get(requestUrl)
        .then(res => Promise.resolve(res.data))
        .catch((e) => Promise.reject(e))
};

export const choiceCityLatLng = (data) => (dispatch) => {
    const {lat, lng} = data;
    const getWeather = callData(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lng}&APPID=${__OPENWEATHER_API_KEY__}`);
    const getForecast = callData(`https://api.openweathermap.org/data/2.5/forecast?&units=metric&lat=${lat}&lon=${lng}&APPID=${__OPENWEATHER_API_KEY__}`);

    Promise.all([getWeather,getForecast])
        .then(res => {

            dispatch({
                type: RENDER_LOCATION_INFO,
                payload: res[0]
            });

            dispatch({
                type: RENDER_CHART,
                payload: res[1].list
            });

        })
        .catch((e) => {
            console.warn(e);
        })
};


