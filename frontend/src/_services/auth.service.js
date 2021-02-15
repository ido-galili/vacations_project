import {generalService} from "_services";
import {generalConstants} from "../_constants";
import axios from 'axios';

export const authService = {
    login,
    logout,
    register,
    checkAuthenticated,

};

function login(userCredentials){
    return generalService.apiRequest(
        "POST",  `${generalConstants.LOGIN_ENDPOINT}` ,userCredentials
    );
}

function register(registerObject){
    return generalService.apiRequest(
        "POST",`${generalConstants.REGISTER_ENDPOINT}` ,registerObject
    );
}

function checkAuthenticated(username, password){

}

function logout(){

}
