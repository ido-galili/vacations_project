import {authConstants, formsConstants, uiConstants} from '_constants';
import {authService} from '_services';
import {uiActions} from "./ui.actions";

export const authActions = {
    login,
    logout,
    register,
    checkAuthenticated,
    setLoggedIn,
    setLoggedOut,
    addVacationFollowed,
    removeVacationFollowed
};

function login(userCredentials) {
    return (dispatch) => {
        dispatch(request());

        authService.login(userCredentials)
            .then(user => {
                dispatch(setLoggedIn());
                dispatch(success(user));
            })
            .catch(error => {
                dispatch(uiActions.showAlert('Incorrect Username or Password', uiConstants.ALERT_ERROR));
                dispatch(failure(error))
            })

    };

    function request() {
        return {type: authConstants.LOGIN_REQUEST}
    }

    function success(user) {
        return {type: authConstants.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        return {type: authConstants.LOGIN_FAILURE, error}
    }
}

function logout() {
    return (dispatch) => {
        dispatch(request());
        dispatch(setLoggedOut());

        // authService.logout()
        //     .then(response => {
        //         dispatch(setLoggedOut());
        //         dispatch(success(response));
        //     })
        //     .catch(error => {
        //         dispatch(failure(error))
        //     })

    };

    function request() {
        return {type: authConstants.LOGOUT_REQUEST}
    }

    function success(response) {
        return {type: authConstants.LOGOUT_SUCCESS, response}
    }

    function failure(error) {
        return {type: authConstants.LOGOUT_FAILURE, error}
    }
}

function register(registerObject) {
    return (dispatch) => {
        dispatch(request());

        authService.register(registerObject)
            .then(response => {
                const userCredentials = {
                    [formsConstants.USERNAME_INPUT_NAME]: registerObject[formsConstants.USERNAME_INPUT_NAME],
                    [formsConstants.PASSWORD_INPUT_NAME]: registerObject[formsConstants.PASSWORD_INPUT_NAME],
                };

                dispatch(login(userCredentials));
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(uiActions.showAlert('User already registered', uiConstants.ALERT_ERROR));
                dispatch(failure(error))
            })

    };

    function request() {
        return {type: authConstants.REGISTER_REQUEST}
    }

    function success(response) {
        return {type: authConstants.REGISTER_SUCCESS, response}
    }

    function failure(error) {
        return {type: authConstants.REGISTER_FAILURE, error}
    }
}

function checkAuthenticated() {
    return (dispatch) => {
        dispatch(request());

        authService.checkAuthenticated()
            .then(response => {
                dispatch(success(response));
            })
            .catch(error => {
                dispatch(failure(error))
            })

    };

    function request() {
        return {type: authConstants.CHECK_AUTHENTICATED_REQUEST}
    }

    function success(response) {
        return {type: authConstants.CHECK_AUTHENTICATED_SUCCESS, response}
    }

    function failure(error) {
        return {type: authConstants.CHECK_AUTHENTICATED_FAILURE, error}
    }
}

function setLoggedIn(){
    return {
        type: authConstants.SET_LOGGED_IN
    }
}

function setLoggedOut(){
    return {
        type: authConstants.SET_LOGGED_OUT
    }
}

function addVacationFollowed(vacationId){
    return {
        type: authConstants.ADD_VACATION_FOLLOWED,
        vacationId
    }
}

function removeVacationFollowed(vacationId){
    return {
        type: authConstants.REMOVE_VACATION_FOLLOWED,
        vacationId
    }
}


