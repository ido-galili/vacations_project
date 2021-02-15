import React, {Component} from 'react';
import {connect} from "react-redux";

import {BackButton, Landing, Login, Registration} from "components";
import {authConstants} from "_constants/auth.constants";

class Auth extends Component {
    state = {
        primary: 'hsl(171, 100%, 41%)',
        info: 'hsl(204, 86%, 53%)',
        danger: 'hsl(348, 100%, 61%)',

        RenderComp: Landing,
        style:{
            boxShadow: `0 0 16px -4px ${this.danger}`,
            border: `2px solid ${this.danger}`
        }
    };

    toggleVisibleComponent = (comp) => {
        let style;

        const {primary, danger,info} = this.state;

        switch(comp){
            case authConstants.LANDING_COMP:
                style = {
                    boxShadow: `0 0 16px -4px ${danger}`,
                    border: `2px solid ${danger}`,
                };
                this.setState({RenderComp: Landing, style: style});
                break;
            case authConstants.LOGIN_COMP:
                style = {
                    boxShadow: `0 0 16px -4px ${primary}`,
                    border: `2px solid ${primary}`,
                };
                this.setState({RenderComp: Login, style: style});
                break;
            case authConstants.REGISTRATION_COMP:
                style = {
                    boxShadow: `0 0 16px -4px ${info}`,
                    border: `2px solid ${info}`,
                };
                this.setState({RenderComp: Registration, style: style});
                break;
            default:
                break;
        }
    };

    render() {
        const {RenderComp} = this.state;

        return (
            <div className={'auth-page'}>
                    <div className={'auth-content-container'} style={this.state.style}>
                        <div className={'auth-content'}>
                            {RenderComp !== Landing && <BackButton toggleVisibleComponent={this.toggleVisibleComponent}/>}
                            <RenderComp toggleVisibleComponent={this.toggleVisibleComponent}/>
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps({}) {

    return {

    }
}

const connectedPage = connect(mapStateToProps)(Auth);
export {connectedPage as Auth};

