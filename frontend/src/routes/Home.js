import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

import {Vacations, VacationForm} from "components";
import {authConstants, generalConstants, socketConstants, uiConstants} from "../_constants";
import socketIOClient from "socket.io-client";
import {authActions, vacationsActions} from "../_actions";

class Home extends Component {
    componentDidMount() {
        const {dispatch, isLoggedIn, history} = this.props;

        if(!isLoggedIn){
            history.push(`/`)
        }

        const socket = socketIOClient(generalConstants.STATIC_ENDPOINT);

        socket.on(socketConstants.ADD_VACATION_EVENT, () => {
            dispatch(vacationsActions.getVacations())
        });

        socket.on(socketConstants.UPDATE_VACATION_EVENT, () => {
            dispatch(vacationsActions.getVacations())
        });

        socket.on(socketConstants.DELETE_VACATION_EVENT, () => {
            dispatch(vacationsActions.getVacations())
        });

        socket.on(socketConstants.ADD_FOLLOWER_EVENT, (vacationId) => {
            dispatch(vacationsActions.getVacations());
            dispatch(authActions.addVacationFollowed(vacationId))
        });

        socket.on(socketConstants.REMOVE_FOLLOWER_EVENT, (vacationId) => {
            dispatch(vacationsActions.getVacations());
            dispatch(authActions.removeVacationFollowed(vacationId))

        });
    }

    render() {
        const {showVacationForm} = this.props;

        return (
            <div className={'home'}>
                <Vacations/>
                {
                    showVacationForm &&
                    <VacationForm/>
                }
            </div>
        )
    }
}

function mapStateToProps({ui, auth}) {
    return {
        showVacationForm: ui[uiConstants.VACATION_FORM_VISIBLE],
        isLoggedIn: auth[authConstants.USER_AUTHENTICATED]
    }
}

const connectedPage = withRouter(connect(mapStateToProps)(Home));
export {connectedPage as Home};
