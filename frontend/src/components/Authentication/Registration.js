import React, {Component} from 'react';
import {connect} from "react-redux";

import {formsConstants} from "_constants";
import {authActions} from "_actions";
import {formsHelpers} from "../../_helpers";

import {FormGenerator} from "components";


class Registration extends Component {
    state = {
        form: {
            formName: formsConstants.REGISTRATION_FORM_NAME,
            formInputs: [
                {
                    label: 'Name',
                    name: formsConstants.FIRST_NAME_INPUT_NAME,
                    type: 'text',
                    placeholder: 'Jon',
                    leftIcon: 'fas fa-user',
                    helpText: 'ex. Jon',
                    columnSize: 'is-half'
                },
                {
                    label: 'Last Name',
                    name: formsConstants.LAST_NAME_INPUT_NAME,
                    type: 'text',
                    placeholder: 'Snow',
                    leftIcon: 'fas fa-users',
                    helpText: 'name must be at least 2 characters',
                    columnSize: 'is-half',
                },


                {
                    label: 'Username',
                    name: formsConstants.USERNAME_INPUT_NAME,
                    type: 'text',
                    placeholder: 'jon_snow',
                    leftIcon: 'fas fa-republican',
                    helpText: 'marge#simpson',
                    columnSize: 'is-half',
                },
                {
                    label: 'Password',
                    name: formsConstants.PASSWORD_INPUT_NAME,
                    type: 'password',
                    placeholder: 'jonsnow$theking@winterfell',
                    leftIcon: 'fas fa-lock',
                    helpText: 'password must be at least 5 characters',
                    columnSize: 'is-half'
                },
            ],
        },
    };

    handleSubmit = () => {
        const {forms, dispatch} = this.props,
            {formName} = this.state.form,
            registerObject = formsHelpers.getFormValues(forms[formName]);

        dispatch(authActions.register(registerObject))
    };

    render() {
        return (
            <div className={'auth-form-container'}>
                <div className={'auth-form-headline has-text-info'}>
                    Registration
                </div>
                <FormGenerator form={this.state.form} onSubmitSuccess={this.handleSubmit}/>
            </div>
        )
    }
}

function mapStateToProps({forms}) {
    return {
        forms
    }
}

const connectedPage = connect(mapStateToProps)(Registration);
export {connectedPage as Registration};

