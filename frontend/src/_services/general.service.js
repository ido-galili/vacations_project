import socketIOClient from "socket.io-client";
import {generalConstants} from "../_constants";

export const generalService = {
    apiRequest,
    sendSocketMessage,
};

const socket = socketIOClient(generalConstants.STATIC_ENDPOINT);

const requestHeaders = new Headers(
    {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
);

function apiRequest(requestMethod, requestUrl, params={}){
    const requestOptions = {
        method: requestMethod,
        headers: requestHeaders,
    };

    let url = requestUrl;

    if(requestMethod === "GET"){
        const queryString = createRequestParams(params);
        url = `${requestUrl}?${queryString}`;
    } else {
        requestOptions.body = JSON.stringify(params)
    }

    return fetch(
        url,
        requestOptions
    )
        .then(handleErrors)
        .catch(error => {
            return Promise.reject(error);
        });
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}


// function handleResponse(response) {
//     if (response.status >= 200 && response.status < 300) {
//         return response.json()
//     } else {
//         const error = response.body;
//         console.log(error);
//         return Promise.reject(error);
//     }
// }


function createRequestParams(params) {
    const paramsArray = [];

    for (const param of Object.keys(params)) {
        paramsArray.push(`${param}=${params[param]}`);
    }

    return paramsArray.join('&');
}

function sendSocketMessage(event, payload) {
    socket.emit(event, payload);
}
