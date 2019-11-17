import React from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [{
                id: 1,
                path: '/home',
                text: '首页',
                iconName: 'fa-home'
            }, {
                id: 2,
                path: '/recommond',
                text: '推荐',
                iconName: 'fa-heart'
            }, {
                id: 3,
                path: '/category',
                text: '分类',
                iconName: 'fa-lemon'
            }, {
                id: 4,
                path: '/shopcar',
                text: '购物车',
                iconName: 'fa-shopping-cart'
            }, {
                id: 5,
                path: '/mine',
                text: '我的',
                iconName: 'fa-user'
            }]
        }
    }

    reactItem = () => {
        const { lists } = this.state;
        return lists.map(item => <li key={item.id}>
            <NavLink to={item.path} activeClassName="active">
                <i className={"fas " + item.iconName}></i>
                <span>{item.text}</span>
            </NavLink>
        </li>);
    }

    render() {
        return (<footer>
            <ul>
                {this.reactItem()}
            </ul>
        </footer>);
    }
}