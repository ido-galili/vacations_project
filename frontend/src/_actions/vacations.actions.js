import {uiConstants, vacationsConstants} from "_constants";
import {authService, vacationService} from "../_services";
import {authConstants} from "../_constants";
import {uiActions} from "./ui.actions";

export const vacationsActions = {
    getVacations,
    createVacation,
    updateVacation,
    deleteVacation
};

function getVacations() {
    return (dispatch) => {
        dispatch(request());

        vacationService.getVacations()
            .then(vacations => {
                dispatch(success(vacations));
            })
            .catch(error => {
                dispatch(failure(error))
            })

    };

    function request() {
        return {type: vacationsConstants.GET_VACATIONS_REQUEST}
    }

    function success(vacations) {
        return {type: vacationsConstants.GET_VACATIONS_SUCCESS, vacations}
    }

    function failure(error) {
        return {type: vacationsConstants.GET_VACATIONS_FAILURE, error}
    }
}

function createVacation(vacation) {
    return (dispatch) => {
        dispatch(request());

        vacationService.createVacation(vacation)
            .then(response => {
                dispatch(uiActions.showAlert('Vacation Created Successfully', uiConstants.ALERT_SUCCESS))
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(uiActions.showAlert('Create vacation failed. Please try again...', uiConstants.ALERT_ERROR))
                dispatch(failure(error))
            })

    };

    function request() {
        return {type: vacationsConstants.CREATE_VACATION_REQUEST}
    }

    function success(response) {
        return {type: vacationsConstants.CREATE_VACATION_SUCCESS, response}
    }

    function failure(error) {
        return {type: vacationsConstants.CREATE_VACATION_FAILURE, error}
    }
}

function updateVacation(vacationId) {
    return (dispatch) => {
        dispatch(request());

        vacationService.updateVacation(vacationId)
            .then(response => {
                dispatch(uiActions.showAlert('Vacation Updated Successfully', uiConstants.ALERT_SUCCESS));
                dispatch(uiActions.hideVacationForm());
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(uiActions.showAlert('Update vacation failed. Please try again...', uiConstants.ALERT_ERROR));
                dispatch(failure(error))
            })

    };

    function request() {
        return {type: vacationsConstants.UPDATE_VACATION_REQUEST}
    }

    function success(response) {
        return {type: vacationsConstants.UPDATE_VACATION_SUCCESS, response}
    }

    function failure(error) {
        return {type: vacationsConstants.UPDATE_VACATION_FAILURE, error}
    }
}

function deleteVacation(vacationId) {
    return (dispatch) => {
        dispatch(request());

        vacationService.deleteVacation(vacationId)
            .then(response => {
                dispatch(uiActions.showAlert('Vacation Deleted Successfully', uiConstants.ALERT_INFO));
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(uiActions.showAlert('Delete vacation failed. Please try again...', uiConstants.ALERT_ERROR));
                dispatch(failure(error))
            })

    };

    function request() {
        return {type: vacationsConstants.DELETE_VACATION_REQUEST}
    }

    function success(response) {
        return {type: vacationsConstants.DELETE_VACATION_SUCCESS, response}
    }

    function failure(error) {
        return {type: vacationsConstants.DELETE_VACATION_FAILURE, error}
    }
}
