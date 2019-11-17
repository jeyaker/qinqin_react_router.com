import React, { Component } from 'react';
import './index.scss';
import { request } from 'utils/request';
import qs from 'querystring';
import { Button, Stepper } from 'antd-mobile';

export default class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            val: 1,
        }
    }

    async componentDidMount() {
        const id = qs.parse(this.props.location.search.split('?')[1]).id;
        const page = qs.parse(this.props.location.search.split('?')[1]).page;
        const cid = qs.parse(this.props.location.search.split('?')[1]).cid;
        // console.log(id, page, cid);
        const data = await request({
            url: '/index.php',
            params: {
                r: 'class/cyajaxsub',
                page,
                cid,
                px: 't',
                cac_id: ''
            }
        })

        data.data.data.content.filter(item => {
            if (item.id == id)
                this.setState({
                    data: item
                });
        })
    }

    addShopcar = () => {
        const { data, val } = this.state;

        let shopcar = localStorage.getItem('shopcar');
        if (shopcar) {
            shopcar = JSON.parse(shopcar);

            const f = shopcar.some(item => item.id == data.id);
            if (f) {
                shopcar.map(item => {
                    if (item.id == data.id) {
                        item.num += val;
                    }
                })
            } else {
                shopcar.push({
                    id: data.id,
                    name: data.d_title,
                    price: data.jiage,
                    num: val,
                    flag: false
                });
            }
        } else {
            shopcar = [];
            shopcar.push({
                id: data.id,
                name: data.d_title,
                price: data.jiage,
                num: val,
                flag: false
            });
        }


        localStorage.setItem('shopcar', JSON.stringify(shopcar));
    }

    skip = () => {
        const { push } = this.props.history;
        push('/shopcar');
    }

    change = val => {
        // console.log(val);
        this.setState({
            val
        });
    }

    render() {
        const { data, val } = this.state;
        return (<div className="content">
            <img src={data && data.pic} style={{ width: '100%', height: '3.75rem' }} />
            <div className="details">
                <h4>{data && data.d_title}</h4>
                <p>券后价￥{data && data.jiage}</p>
                <p>天猫价￥{data && data.yuanjia}</p>
                <p>已售{data && data.xiaoliang}件</p>
                <Stepper
                    style={{ maxWidth: '1rem' }}
                    showNumber
                    max={10}
                    min={1}
                    defaultValue={val}
                    onChange={this.change}
                />
            </div>
            <Button type="primary" style={{ width: '.6rem', margin: '0 .05rem 0 1rem' }} inline onClick={this.skip}>
                <i className="fas fa-shopping-cart"></i>
            </Button>
            <Button type="warning" style={{ width: '2rem' }} inline onClick={this.addShopcar}>加入购物车</Button>
        </div>);
    }
}

