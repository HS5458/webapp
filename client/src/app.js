/**
 * Created by wubo on 2017/6/1.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {Route, IndexRoute} from 'react-router';
import Login from './views/Login';
import Container from './component/public/Container';
import Home from './views/Home';

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