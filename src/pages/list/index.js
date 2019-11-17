import React, { Component } from 'react';
import qs from 'querystring';
import { request } from 'utils/request';
import './index.scss'
import { Link } from 'react-router-dom';

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: 1,
            cid: ''
        }
    }

    async componentDidMount() {
        const cid = qs.parse(this.props.location.search.split('?')[1]).cid;
        const { page } = this.state;

        const data = await request({
            url: '/index.php',
            params: {
                r: 'class/cyajaxsub',
                page,
                cid,
                px: 't',
                cac_id: ''
            }
        });
        // console.log(data.data.data.content);

        this.setState({
            data: data.data.data.content,
            page: page,
            cid
        });
    }

    renderItem = () => {
        const { page, cid } = this.state;
        return this.state.data.map(item => (
            <li key={item.id}>
                <Link to={{
                    pathname: '/detail',
                    search: `id=${item.id}&page=${page}&cid=${cid}`
                }}>
                    <div className="left-item">
                        <img src={item.pic} />
                    </div>
                    <div className="right-item">
                        <h4>{item.d_title}</h4>
                        <p>券后￥{item.jiage}</p>
                        <p>券{item.quan_jine}元</p>
                        <span>已售{item.xiaoliang} | 评论{item.comment}</span>
                    </div>
                </Link>
            </li>
        ))
    }

    render() {
        // console.log(qs.parse(this.props.location.search.split('?')[1]).cid);
        return (<div className="content" style={{ overflow: 'auto' }}>
            <ul className="list">
                {this.renderItem()}
            </ul>
        </div>);
    }
}