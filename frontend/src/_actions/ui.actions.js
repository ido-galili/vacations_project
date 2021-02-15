import {toast} from 'react-toastify'

import {uiConstants} from '_constants';

export const uiActions = {
    showAlert,
    showVacationForm,
    hideVacationForm
};

function showAlert(alertMsg, alertType) {
    return function(dispatch) {
        dispatch({
            type: uiConstants.SHOW_ALERT,
            alertMsg,
            alertType
        });
        switch (alertType) {
            case uiConstants.ALERT_ERROR:
                toast.error(alertMsg, {
                    toastId: 1,
                    className: 'error-background'
                });
                break;
            case uiConstants.ALERT_WARNING:
                toast.warn(alertMsg, {
                    toastId: 2,
                    className: 'warning-background'
                });
                break;
            case uiConstants.ALERT_INFO:
                toast.info(alertMsg, {
                    toastId: 3,
                    className: 'info-background'
                });
                break;
            case uiConstants.ALERT_SUCCESS:
                toast.success(alertMsg, {
                    toastId: 4,
                    className: 'success-background'
                });
                break;
            default:
                toast(alertMsg, {
                    toastId: 5,
                    className: 'default-background'
                });
        }
    };
}

function showVacationForm(vacation=null){
    return {
        type: uiConstants.SHOW_VACATION_FORM,
        vacation
    }
}

function hideVacationForm(){
    return {
        type: uiConstants.HIDE_VACATION_FORM,
    }
}
