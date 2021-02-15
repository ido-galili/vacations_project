import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import socketIOClient from "socket.io-client";

import {Home} from './Home'
import {Auth} from './Auth'
import {Chart} from './Chart'
import {TopNav} from "components/Permanents/TopNav";
import Footer from "components/Permanents/Footer";
import {authConstants} from "../_constants";

class MainRoute extends Component {
    render() {
        const {match, isLoggedIn} = this.props;

        return (
            <Fragment>
                {isLoggedIn && <TopNav/>}
                <main>
                        <Switch>
                            <Route exact path={`${match.url}`} render={() => (
                                isLoggedIn ? (
                                    <Redirect to={`${match.url}home`}/>
                                ) : (
                                    <Auth/>
                                )
                            )}/>
                            <Route path={`${match.url}home`} component={Home}/>
                            <Route path={`${match.url}chart`} component={Chart}/>
                        </Switch>
                </main>
                {isLoggedIn && <Footer/>}
            </Fragment>
        );
    }
}

function mapStateToProps({auth}) {
    return {
        isLoggedIn: auth[authConstants.USER_AUTHENTICATED]
    }
}

const connectedPage = connect(mapStateToProps)(MainRoute);
export {connectedPage as MainRoute};

