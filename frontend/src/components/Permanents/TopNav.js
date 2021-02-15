import React, {Component, Fragment} from 'react';
import {authConstants} from "../../_constants";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"
import {authActions, uiActions} from "../../_actions";

class TopNav extends Component {
    state = {
        showUserMenu: false
    };

    _handleAddClick = () => {
        const {dispatch} = this.props;

        dispatch(uiActions.showVacationForm());
    };

    _handleLogoutClick = () => {
        const {dispatch, match, history} = this.props;

        dispatch(authActions.logout());

        history.push(`${match.url}`)
    };

    _handleChartClick = () => {
        const {match, history} = this.props;

        history.push(`${match.url}chart`)
    };

    _handlePlaneClick = () => {
        const {match, history} = this.props;

        history.push(`${match.url}home`)
    };


    render() {
        const {isAdmin} = this.props;

        return (
            <div className={'top-nav-container'}>
                <nav className={'top-nav'}>
                    <div className={'top-nav__left-actions'}>
                        <div className={'top-nav__brand'}>
                            The Flying Elephant
                        </div>
                    </div>
                    <div className={'top-nav__center-actions'}>

                    </div>
                    <div className={'top-nav__right-actions'}>
                        {
                            isAdmin &&
                                <Fragment>
                                    <i onClick={this._handleAddClick} className="far fa-plus-square fa-2x top-nav__plus-icon"/>
                                    <i onClick={this._handleChartClick} className="fas fa-chart-line fa-2x top-nav__chart-icon"/>
                                    <i onClick={this._handlePlaneClick} className="fas fa-plane fa-2x top-nav__chart-icon"/>
                                </Fragment>
                        }
                        <i onClick={this._handleLogoutClick} className="far fa-id-badge fa-2x top-nav__user-icon"/>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return {
        isAdmin: auth[authConstants.USER] && auth[authConstants.USER][authConstants.USER_ADMIN],
    }
}

const connectedPage = withRouter(connect(mapStateToProps)(TopNav));
export {connectedPage as TopNav};
