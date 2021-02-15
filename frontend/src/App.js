import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {store} from '_helpers';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import './assets/scss/main.scss'

import {MainRoute} from 'routes/MainRoute'


function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" component={MainRoute}/>
                    </Switch>
                </Router>
                <ToastContainer
                    position="top-center"
                    autoClose={3500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange={false}
                    draggable
                    pauseOnHover/>
            </div>
        </Provider>
    );
}

export default App;
