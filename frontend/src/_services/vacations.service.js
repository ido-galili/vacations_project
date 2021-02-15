import {generalService} from "_services";
import {generalConstants} from "_constants";

// Public Function
export const vacationService = {
    getVacations,
    createVacation,
    updateVacation,
    deleteVacation
};

function getVacations(){
    return generalService.apiRequest(
        "GET", `${generalConstants.VACATIONS_ENDPOINT}`
    );
}

function createVacation(vacation){
    return generalService.apiRequest(
        "POST", `${generalConstants.VACATIONS_ENDPOINT}` ,vacation
    );
}

function updateVacation(vacationId){
    return generalService.apiRequest(
        "PUT", `${generalConstants.VACATIONS_ENDPOINT}/${vacationId}`
    );
}

function deleteVacation(vacationId){
    return generalService.apiRequest(
        "DELETE", `${generalConstants.VACATIONS_ENDPOINT}/${vacationId}`
    );
}

