import {formsConstants} from "../_constants";

export const formsHelpers = {
    getFormValues
};

function getFormValues(form){
    let valuesObj = {};

    for(let [key, value] of Object.entries(form)){
        valuesObj[key] = value[formsConstants.FORM_INPUT_FIELD_VALUE];
    }

    return valuesObj;
}
