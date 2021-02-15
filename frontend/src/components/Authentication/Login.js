import React, {Component} from 'react';
import {connect} from "react-redux";
import {formsConstants} from "_constants";

import {FormGenerator} from "components/FormGenerator";
import {authActions} from "_actions";
import {formsHelpers} from "../../_helpers";


class Login extends Component {
    state = {
        form: {
            formName: formsConstants.LOGIN_FORM_NAME,
            formInputs: [
                    {
                        label: 'Username',
                        name: formsConstants.USERNAME_INPUT_NAME,
                        type: 'text',
                        placeholder: 'Jon',
                        leftIcon: 'fas fa-user',
                        helpText: 'ex. Jon',
                        columnSize: 'is-half'
                    },
                    {
                        label: 'Password',
                        name: formsConstants.PASSWORD_INPUT_NAME,
                        type: 'password',
                        placeholder: 'jonsnow$theking@winterfell',
                        leftIcon: 'fas fa-lock',
                        helpText: 'password must be at least 6 characters',
                        columnSize: 'is-half'
                    },
            ],
        }
    };

    handleSubmit = () => {
        const {forms, dispatch} = this.props,
            {formName} = this.state.form,
            loginObject = formsHelpers.getFormValues(forms[formName]);

        dispatch(authActions.login(loginObject))
    };

    render() {
        return (
            <div className={'auth-form-container'}>
                <div className={'auth-form-headline has-text-info'}>
                    Login
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

const connectedPage = connect(mapStateToProps)(Login);
export {connectedPage as Login};

