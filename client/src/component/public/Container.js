/**
 * Created by wubo on 2017/6/1.
 */
import {Component} from 'react';

export default class Container extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return this.props.children;
    }
}
