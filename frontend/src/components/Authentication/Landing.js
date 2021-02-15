import React, {Component} from 'react';
import {connect} from 'react-redux'
import {authConstants} from "_constants/auth.constants";

class Landing extends Component {
    state = {
        headline: 'the flying\nelephant',
    };

    render() {
        const {toggleVisibleComponent} = this.props;

        return (
            <div className={'landing-container'}>
                <div className={'landing-headline'}>
                    {this.state.headline}
                </div>
                <div className={'buttons'}>
                    <a
                        onClick={() => toggleVisibleComponent(authConstants.LOGIN_COMP)}
                        className="button is-large is-primary is-outlined">
                        <span>Sign-in</span>
                        <span className="icon is-small">
                            <i className="fas fa-user-lock"/>
                        </span>
                    </a>
                    <a
                        onClick={() => toggleVisibleComponent(authConstants.REGISTRATION_COMP)}
                        className="button is-large is-info is-outlined">
                        <span>Register</span>
                        <span className="icon is-small">
                            <i className="fas fa-user-plus"/>
                        </span>
                    </a>
                </div>
            </div>
        )
    }
}

function mapStateToProps({}) {

    return {}
}

const connectedPage = connect(mapStateToProps)(Landing);
export {connectedPage as Landing};
