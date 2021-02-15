import {uiConstants} from "_constants/ui.constants";

const initial_state = {
};

export const ui = (state = initial_state, action) => {
    switch (action.type) {
        case uiConstants.SHOW_ALERT:
            return {
                ...state,
                alert: {
                    type: action.alertType,
                    msg: action.alertMsg,
                }
            };
        case uiConstants.SHOW_VACATION_FORM:
            return {
                ...state,
                [uiConstants.VACATION_FORM_VISIBLE]: true,
                [uiConstants.VACATION_FORM_DETAILS]: action.vacation
            };
        case uiConstants.HIDE_VACATION_FORM:
            return {
                ...state,
                [uiConstants.VACATION_FORM_VISIBLE]: false,
                [uiConstants.VACATION_FORM_DETAILS]: null
            };
        default:
            return state;
    }
};
