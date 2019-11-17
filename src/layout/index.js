import React, { Component } from 'react'
import Tab from 'components/common/tab'
import TabBar from 'components/common/tabbar';
import Home from 'pages/home';
import Recommond from 'pages/recommond';
import Category from 'pages/category';
import ShopCar from 'pages/shopcar';
import Mine from 'pages/mine';
import Login from 'pages/login';
import Register from 'pages/register';
import List from 'pages/list';
import Error from 'pages/error';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './index.scss';
import Detail from 'pages/detail';

class LayOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabFlag: true,
            tabBarFlag: false,
            title: {
                '/home': '首页',
                '/recommond': '推荐',
                '/category': '分类',
                '/shopcar': '购物车',
                '/mine': '我的',
                '/home/hot': '正在热映',
                '/home/comming': '即将上映',
                '/detail': '商品详情'
            },
            backHide: ['/home/hot'],
            tabBarShow: ['/home/hot', '/category', '/recommond']
        }
    }

    componentDidMount() {
        this.changeTabFlag();
        this.switchTabBar();
        this.redir();
    }

    // 路由监听
    componentWillReceiveProps(nextProps) {
        // console.log('路由监听');
        this.changeTabFlag(nextProps);
        this.switchTabBar(nextProps);
        this.redir(nextProps);
    }

    // 返回按钮
    changeTabFlag = nextProps => {
        const { backHide } = this.state;
        const { pathname } = nextProps && nextProps.location || this.props.location;
        const f = backHide.some(item => item === pathname);
        if (f) {
            this.setState({
                tabFlag: false
            });
        } else {
            this.setState({
                tabFlag: true
            });
        }
    }

    // 底部导航
    switchTabBar = nextProps => {
        const { tabBarShow } = this.state;
        const { pathname } = nextProps && nextProps.location || this.props.location;
        const f = tabBarShow.some(item => item === pathname);

        if (f) {
            this.setState({
                tabBarFlag: true
            });
        } else {
            this.setState({
                tabBarFlag: false
            });
        }
    }

    // 重定向
    redir = nextProps => {
        const { pathname } = nextProps && nextProps.location || this.props.location;
        const { push } = nextProps && nextProps.history || this.props.history;
        if (pathname == '/home') {
            push('/home/hot');
        }
    }

    render() {
        const { tabFlag, title, tabBarFlag } = this.state;
        const { pathname } = this.props.location;
        return (
            <div id="layout">
                {/* 布局 */}
                <Tab tabFlag={tabFlag} title={title[pathname]} {...this.props} />
                <Switch>
                    <Redirect from="/" to="/home" exact />
                    <Route path="/home" component={Home} />
                    <Route path="/recommond" component={Recommond} />
                    <Route path="/category" component={Category} />
                    <Route path="/shopcar" component={ShopCar} />
                    <Route path="/detail" component={Detail} />
                    <Route path="/mine" component={Mine} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/list/:id" component={List} />
                    <Route component={Error} />
                </Switch>
                {tabBarFlag && <TabBar />}
            </div>
        )
    }
}


export default withRouter(LayOut);