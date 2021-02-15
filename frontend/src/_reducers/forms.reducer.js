import {formsConstants} from "_constants";

const initial_state = {
};

export const forms = (state = initial_state, action) => {
    switch (action.type) {
        case formsConstants.SAVE_FORM_FIELD:
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    [action.name]:
                        {
                            [formsConstants.FORM_INPUT_FIELD_VALUE]: action.value,
                            [formsConstants.FORM_INPUT_FIELD_VALID]: action.valid,
                            [formsConstants.FORM_INPUT_FIELD_ALERT_MSG]: action.alert
                        }
                }
            };
        default:
            return state;
    }
};
