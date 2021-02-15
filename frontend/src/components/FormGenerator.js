import React, {Component} from 'react';
import {connect} from "react-redux";
import {validation} from "_helpers";
import {uiActions, formsActions} from "_actions";
import {formsConstants, uiConstants} from "_constants";

class FormGenerator extends Component {

    componentWillMount() {
        const {form, updateForm} = this.props;
        let inputNames = [];

        form.formInputs.forEach(input => {
            inputNames.push(input.name);
            if(updateForm){
                this.setState({[input.name]: updateForm[input.name]})
            }
        });

        this.setState({inputNames: inputNames})
    }

    componentDidMount() {
        const {dispatch, form, updateForm} = this.props;
        const {formName} = form;

        if(updateForm){
            for(let [key, value] of Object.entries(updateForm)){
                dispatch(formsActions.saveFormInputField(formName, key, value));
            }
        }
    }

    handleChange = (event) => {
        const {formName} = this.props.form;
        const {dispatch} = this.props;
        const {name, value} = event.target;

        this.setState({[name]: value});
        console.log("HANDLE")

        dispatch(formsActions.saveFormInputField(formName, name, value));
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const {onSubmitSuccess} = this.props;
        const {formName} = this.props.form;


        const formValid = validation.formValidator(formName, this.state.inputNames);

        if (!formValid[formsConstants.FORM_VALID]) {
            formValid[formsConstants.FORM_ALERTS].forEach(alert => {
                this.props.dispatch(uiActions.showAlert(alert, uiConstants.ALERT_ERROR));
            });
            return;
        }

        onSubmitSuccess()
    };

    render() {
        const {forms, updateForm} = this.props;
        const {formName, formInputs} = this.props.form;

        return (
            <form
                className={'form-generator'}
                onSubmit={this.handleSubmit}>
                <div className={'columns is-multiline'}>
                    {formInputs.map((input, index) => {
                        return (
                            <div key={index} className={`field column ${input.columnSize}`}>
                                <label className="label has-text-info">{input.label}</label>
                                <div className="control has-icons-left has-icons-right is-expanded">
                                    <input
                                        onChange={this.handleChange}
                                        name={input.name}
                                        value={this.state[input.name]}
                                        className={
                                            `input is-medium ${
                                                !(forms.hasOwnProperty(formName) && forms[formName].hasOwnProperty(input.name))
                                                || !forms[formName][input.name][formsConstants.FORM_INPUT_FIELD_VALUE]
                                                    ?
                                                    'is-info'
                                                    :
                                                    !forms[formName][input.name][formsConstants.FORM_INPUT_FIELD_VALID]
                                                        ? 'is-danger'
                                                        : 'is-success'}`
                                        }
                                        type={input.type}
                                        placeholder={input.placeholder}/>
                                    <span className="icon is-small is-left">
                                        <i className={input.leftIcon}/>
                                    </span>
                                    <span className="icon is-small is-right">
                                        {forms.hasOwnProperty(formName)
                                            && forms[formName].hasOwnProperty(input.name)
                                            && forms[formName][input.name][formsConstants.FORM_INPUT_FIELD_VALID] &&
                                            <i className="fas fa-check"/>}
                                    </span>
                                </div>
                                <p className="help has-text-grey-light">{input.helpText}</p>
                            </div>
                        )
                    })}
                </div>
                <div className={'columns'}>
                    <div className={'column has-text-centered is is-full'}>
                        <button
                            className="button is-medium is-info is-outlined submit-button">
                            <span>{updateForm ? 'Update' : 'Submit'}</span>
                            <span className="icon is-small">
                            <i className="far fa-paper-plane"/>
                        </span>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

function mapStateToProps({forms}) {
    return {
        forms,
    }
}

const connectedPage = connect(mapStateToProps)(FormGenerator);
export {connectedPage as FormGenerator};
