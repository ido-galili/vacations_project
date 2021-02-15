import {vacationsConstants} from "_constants/vacations.constants";

const initial_state = {
};

export const vacations = (state = initial_state, action) => {
    switch (action.type) {
        case vacationsConstants.GET_VACATIONS_SUCCESS:
            return {
                ...state,
                [vacationsConstants.VACATIONS]: action.vacations,
            };
        default:
            return state;
    }
};
