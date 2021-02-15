import {combineReducers} from 'redux';

import {auth} from './auth.reducer';
import {forms} from './forms.reducer';
import {ui} from './ui.reducer';
import {vacations} from './vacations.reducer';


const initialState = JSON.parse(localStorage.getItem('state')) || {};

function rootReducer(state = initialState, action) {
    // if (action.type === userConstants.LOGOUT)
    //     state = undefined;

    return appReducer(state, action)
}

const appReducer = combineReducers({
    auth,
    forms,
    vacations,
    ui,
});

export default rootReducer;
