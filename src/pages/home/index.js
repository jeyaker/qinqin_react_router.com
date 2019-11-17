import React, { Component } from 'react';
import './index.scss';
import Nav from './Nav';
import { Route, Redirect } from 'react-router-dom';
import Hot from './Hot';
import Comming from './Comming';

export default class Home extends Component {
    render() {
        return (<div className="content">
            <Nav />
            {/* <Redirect from="/home" to="/home/hot" exact /> 有问题 */}
            <Route path="/home/hot" component={Hot} />
            <Route path="/home/comming" component={Comming} />
        </div>);
    }
}