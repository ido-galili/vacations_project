import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {vacationsActions, uiActions, formsActions} from "_actions";
import {authConstants, formsConstants, socketConstants, uiConstants} from "../../_constants";
import {generalService} from "../../_services";

class VacationCard extends Component {
    state = {
        backgroundColors: [
            'hsl(171, 100%, 41%)',
            'hsl(204, 86%, 53%)',
            'hsl(348, 100%, 61%)',
            'hsl(141, 71%, 48%)',
            'hsl(217, 71%, 53%)',
            'hsl(0, 0%, 21%)',
            'hsl(48, 100%, 67%)',
        ],
    };

    componentWillMount() {
        const {vacation, vacationsFollowed} = this.props;

        // TODO CHANGE THIS TO USER FOLLOWED VACATION PER VACATION ID
        if(vacationsFollowed) {
            this.setState({isFollowed: vacationsFollowed.includes(vacation._id)});
        }

        const borderStyle = this._generateBorderStyle();

        this.setState({borderStyle})
    }

    _handleFollowClick = () => {
        const {dispatch, vacation, isAdmin, userId} = this.props;

        if(isAdmin){
            dispatch(uiActions.showAlert('Admin can\'t follow vacations', uiConstants.ALERT_WARNING));
            return;
        }
        this.setState({isFollowed: !this.state.isFollowed, order: 1});

        if(this.state.isFollowed){
            generalService.sendSocketMessage(socketConstants.REMOVE_FOLLOWER_EVENT, {
                vacation_id: vacation._id,
                user_id: userId
            });
            this.setState({isFollowed: false})
        } else {
            generalService.sendSocketMessage(socketConstants.ADD_FOLLOWER_EVENT, {
                vacation_id: vacation._id,
                user_id: userId
            });
            this.setState({isFollowed: true})
        }
    };

    _handleEditClick = () => {
        const {dispatch, vacation} = this.props;

        dispatch(uiActions.showVacationForm(vacation));
    };

    _handleDeleteClick = () => {
        const {dispatch, vacation} = this.props;

        generalService.sendSocketMessage(socketConstants.DELETE_VACATION_EVENT, vacation._id);

        dispatch(uiActions.showAlert('Vacation Deleted Successfully', uiConstants.ALERT_INFO));
    };

    _randomColor = () => {
        const degree = Math.floor(Math.random() * 360) + 1;

        return `hsl(${degree}, 100%, 50%)`;
    }

    _generateBorderStyle = () => {
        const {backgroundColors} = this.state;
        const randomColor = this._randomColor();

        return {
            boxShadow: `0 0 16px -4px ${randomColor}`,
            border: `2px solid ${randomColor}`
        }
    };

    render() {
        const {vacation, isAdmin} = this.props;
        const {isFollowed} = this.state;

        return (
            <div className={`card vacation-card ${isFollowed ? 'followed' : ''}`} style={this.state.borderStyle}>
                <header className="card-header">
                    <p className="card-header-title">
                        {vacation.destination}
                    </p>
                    {
                        isAdmin &&
                        <Fragment>
                            <div onClick={this._handleEditClick} className="card-header-icon">
                                <i className="fas fa-edit edit-icon vacation-icon"/>
                            </div>
                            <div onClick={this._handleDeleteClick} className="card-header-icon">
                                <i className="fas fa-trash trash-icon vacation-icon"/>
                            </div>
                        </Fragment>
                    }

                </header>
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={vacation.photo} alt="vacation-image"/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">
                        {vacation.description}
                    </div>
                </div>
                <footer className="card-footer">
                    {
                        <div onClick={this._handleFollowClick} className={'card-footer-item follow-icon'}>
                            {
                                isFollowed
                                    ?
                                    <Fragment>
                                        <span className="fa-stack fa-2x vacation-icon">
                                            <i className="fas fa-heart follow-icon fa-stack-2x"/>
                                            <strong className="fa-stack-1x has-text-light follow-number">
                                                {vacation.followers}
                                            </strong>
                                        </span>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <span className="fa-stack fa-2x vacation-icon">
                                            <i className="far fa-heart follow-icon fa-stack-2x"/>
                                            <strong className="fa-stack-1x has-text-dark follow-number">
                                                {vacation.followers}
                                            </strong>
                                        </span>
                                    </Fragment>
                            }
                        </div>
                    }
                    <div className="card-footer-item">{`${vacation.startDate} - ${vacation.endDate}`}</div>
                    <div className="card-footer-item">{`${vacation.price}$`}</div>
                </footer>
            </div>
        )
    }
}

function mapStateToProps({auth}) {
    return {
        isAdmin: auth[authConstants.USER] && auth[authConstants.USER][authConstants.USER_ADMIN],
        userId: auth[authConstants.USER] && auth[authConstants.USER]._id,
        vacationsFollowed: auth[authConstants.USER] && auth[authConstants.USER][authConstants.VACATIONS_FOLLOWED]
    }
}

const connectedPage = connect(mapStateToProps)(VacationCard);
export {connectedPage as VacationCard};
