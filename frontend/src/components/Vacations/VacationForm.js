import React, {Component} from 'react';
import {formsConstants, socketConstants, uiConstants} from "../../_constants";
import {formsHelpers} from "../../_helpers";
import {authActions, formsActions, uiActions, vacationsActions} from "../../_actions";
import {FormGenerator} from "../FormGenerator";
import {connect} from "react-redux";
import {generalService} from "../../_services";

class VacationForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            form: {
                formName: formsConstants.VACATION_FORM_NAME,
                formInputs: [
                    {
                        label: 'Destination',
                        name: formsConstants.DESTINATION_INPUT_NAME,
                        type: 'text',
                        placeholder: 'Winterfell',
                        leftIcon: 'fas fa-globe-americas',
                        helpText: '',
                        columnSize: 'is-full'
                    },
                    {
                        label: 'Description',
                        name: formsConstants.DESCRIPTION_INPUT_NAME,
                        type: 'text',
                        placeholder: 'Enter vacation details',
                        leftIcon: 'fas fa-hotel',
                        helpText: '',
                        columnSize: 'is-full',
                    },


                    {
                        label: 'Photo',
                        name: formsConstants.PHOTO_INPUT_NAME,
                        type: 'text',
                        placeholder: 'https://picsum.photos/640/480',
                        leftIcon: 'far fa-image',
                        helpText: 'Only photo url is valid',
                        columnSize: 'is-full',
                    },
                    {
                        label: 'Price',
                        name: formsConstants.PRICE_INPUT_NAME,
                        type: 'text',
                        placeholder: '200',
                        leftIcon: 'far fa-money-bill-alt',
                        helpText: 'Only numbers from 0-9',
                        columnSize: 'is-full'
                    },
                    {
                        label: 'Start Date',
                        name: formsConstants.START_DATE_INPUT_NAME,
                        type: 'text',
                        placeholder: '01.01.19',
                        leftIcon: 'far fa-calendar-alt',
                        helpText: '',
                        columnSize: 'is-half'
                    },
                    {
                        label: 'End Date',
                        name: formsConstants.END_DATE_INPUT_NAME,
                        type: 'text',
                        placeholder: '10.01.19',
                        leftIcon: 'far fa-calendar-alt',
                        helpText: '',
                        columnSize: 'is-half'
                    },
                ],
            },
        };
    }

    handleSubmit = () => {
        const {forms, dispatch, formDetails} = this.props,
            {formName} = this.state.form,
            {vacationId} = this.state,
            vacationObject = formsHelpers.getFormValues(forms[formName]);

        if(formDetails){
            generalService.sendSocketMessage(socketConstants.UPDATE_VACATION_EVENT ,{
                id: vacationId,
                ...vacationObject
            });
            dispatch(uiActions.showAlert('Vacation Updated Successfully', uiConstants.ALERT_SUCCESS));
        } else {
            generalService.sendSocketMessage(socketConstants.ADD_VACATION_EVENT , vacationObject);
            dispatch(uiActions.showAlert('Vacation Created Successfully', uiConstants.ALERT_SUCCESS));
        }

        this.props.dispatch(uiActions.hideVacationForm());
    };

    handleCloseButton = () => {
        this.props.dispatch(uiActions.hideVacationForm());
    };


    render() {
        const {showForm, formDetails} = this.props;
        return (
            showForm ?
            <div className={'vacation-form'}>
                <div onClick={this.handleCloseButton}>
                    <i className="far fa-window-close close-btn fa-2x"/>
                </div>
                <FormGenerator form={this.state.form} updateForm={formDetails} onSubmitSuccess={this.handleSubmit}/>
            </div>
                :
                ''
        )
    }
}

function mapStateToProps({ui, forms}) {
    return {
        showForm: ui[uiConstants.VACATION_FORM_VISIBLE],
        formDetails: ui[uiConstants.VACATION_FORM_DETAILS],
        forms
    }
}

const connectedPage = connect(mapStateToProps)(VacationForm);
export {connectedPage as VacationForm};
