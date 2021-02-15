import {formsConstants} from "_constants";
import {store} from "_helpers/store"

let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// let regPhone = new RegExp('^[0-9\-]+$');

export const validation = {
    inputValidator,
    formValidator
};

function inputValidator(name, value) {
    switch (name) {
        case formsConstants.USERNAME_INPUT_NAME:
            return username(value);
        case formsConstants.PASSWORD_INPUT_NAME:
            return password(value);
        case formsConstants.FIRST_NAME_INPUT_NAME:
            return firstName(value);
        case formsConstants.LAST_NAME_INPUT_NAME:
            return lastName(value);
        case formsConstants.DESTINATION_INPUT_NAME:
            return lastName(value);
        case formsConstants.DESCRIPTION_INPUT_NAME:
            return value.length >= 1;
        case formsConstants.PHOTO_INPUT_NAME:
            return true;
        case formsConstants.PRICE_INPUT_NAME:
            return value.length >= 1;
        case formsConstants.START_DATE_INPUT_NAME:
            return date(value);
        case formsConstants.END_DATE_INPUT_NAME:
            return date(value);
        default:
            return
    }
}

function formValidator(formName, inputsNamesArray) {
    const {forms} = store.getState();

    let isValid = true;
    let alerts = [];

    if(!forms.hasOwnProperty(formName)){
        isValid = false
    } else {
        const form = forms[formName];
        inputsNamesArray.forEach(name => {
            if (form.hasOwnProperty(name)) {
                if (!form[name][formsConstants.FORM_INPUT_FIELD_VALID]) {
                    isValid = false;
                    alerts.push(form[name][formsConstants.FORM_INPUT_FIELD_ALERT_MSG])
                }
            } else {
                isValid = false;
            }
        });
    }

    return {
        [formsConstants.FORM_VALID]: isValid,
        [formsConstants.FORM_ALERTS]: alerts
    }
}

function firstName(name) {
    return name.length >= 2;
}

function lastName(name) {
    return name.length >= 2;
}

function username(username) {
    return username.length >= 5;
}

function password(password) {
    return password.length >= 5;
}

function date(date){
    // return new Date(date).getTime() >= Date.now()
    return true
}


