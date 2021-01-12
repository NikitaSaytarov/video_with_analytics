import {combineReducers} from 'redux'
import analyticsReducer from "./analytics/analyticsSlice";

const rootReducer = () => {
    return combineReducers({
        analytics: analyticsReducer,
    });
};

export default rootReducer