import {
    RENDER_CHART
} from '../actionTypes';

const initialState = {};

export default function renderChart (state = initialState, {type, payload})  {
    switch (type) {

        case RENDER_CHART:
            return payload;

        default:
            return state
    }
}