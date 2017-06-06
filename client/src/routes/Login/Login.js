"use strict";

import React, {Component} from 'react';
import "./Login.less";

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    webLogin() {
        const username = this.refs.username;
        const password = this.refs.password;
    }

    render() {
        return (
            <div id="web_login">
                <h1 className="web_name">工时管理系统</h1>
                <input type="text" className="username" ref="username" placeholder="用户名"/>
                <input type="password" className="password" ref="password" placeholder="密码"/>
                <input type="button" className="login_btn" value="登录" onClick={this.webLogin}/>
            </div>
        )
    }
}

