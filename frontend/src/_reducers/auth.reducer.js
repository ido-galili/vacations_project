import {authConstants} from "_constants";

const initial_state = {
};

export const auth = (state = initial_state, action) => {
    switch (action.type) {
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                [authConstants.USER]: action.user
            };
        case authConstants.LOGOUT_SUCCESS:
            return {
                ...state,
                [authConstants.USER]: null
            };
        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
            };
        case authConstants.CHECK_AUTHENTICATED_SUCCESS:
            return {
                ...state,
            };
        case authConstants.SET_LOGGED_IN:
            return {
                ...state,
                [authConstants.USER_AUTHENTICATED]: true
            };
        case authConstants.SET_LOGGED_OUT:
            return {
                ...state,
                [authConstants.USER_AUTHENTICATED]: false
            };
        case authConstants.ADD_VACATION_FOLLOWED:
            return {
                ...state,
                [authConstants.USER]: {
                    ...state[authConstants.USER],
                    ['vacationsFollowed']: [...state[authConstants.USER]['vacationsFollowed'], action.vacationId]
                }
            };
        case authConstants.REMOVE_VACATION_FOLLOWED:
            return {
                ...state,
                [authConstants.USER]: {
                    ...state[authConstants.USER],
                    ['vacationsFollowed']: state[authConstants.USER]['vacationsFollowed'].filter(vacationId => vacationId !== action.vacationId)
                }
            };
        default:
            return state;
    }
};
