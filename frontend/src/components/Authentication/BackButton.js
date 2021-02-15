import React, {Component} from 'react';
import {authConstants} from "_constants";

class BackButton extends Component {
    render() {
        const {toggleVisibleComponent} = this.props;

        return (
            <span
                onClick={() => toggleVisibleComponent(authConstants.LANDING_COMP)}
                className="icon is-medium has-text-info back-button">
                     <i className="fas fa-arrow-left fa-2x"/>
            </span>
        )
    }
}

export {BackButton};
