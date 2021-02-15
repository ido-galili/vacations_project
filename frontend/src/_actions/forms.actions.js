import {formsConstants, uiConstants} from "_constants";
import {validation} from "_helpers";

export const formsActions = {
    saveFormInputField
};

function saveFormInputField(form, name, value) {
    const valid = validation.inputValidator(name, value);
    let alert = '';

    if(!valid){
        alert = uiConstants.alertMessages[name]
    }

    return {
        type: formsConstants.SAVE_FORM_FIELD,
        form,
        name,
        value,
        valid,
        alert
    }
}
