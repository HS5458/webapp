"use strict";

import React from 'react';
import ReactDom from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {Route, IndexRoute} from 'react-router';
import Login from './routes/Login/Login';
import Container from './component/public/Container';
import Home from './routes/Home/Home';
import './app.less';

function handleRouterUpdate() {
    console.log("router update: ", this.state.location.pathname);
}

const router = (
    <Router history={hashHistory} onUpdate={handleRouterUpdate}>
        <Route path="/" component={Container}>
            <IndexRoute component={Home}/>
            <Login path="/login" component={Login}/>
        </Route>
    </Router>
);

window.onload = function () {
    ReactDom.render(
        router,
        document.getElementById('root')
    )
};