import {
    RENDER_LOCATION_INFO
} from '../actionTypes';

const initialState = {};

export default function renderWeatherInfo (state = initialState, {type, payload})  {
    switch (type) {

        case RENDER_LOCATION_INFO:
            return payload;

        default:
            return state
    }
}