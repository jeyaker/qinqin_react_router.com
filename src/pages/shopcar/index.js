import React, { Component } from 'react';
import './index.scss';
import { Checkbox, Button, Stepper } from 'antd-mobile';


export default class ShopCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopcar: null,
            totalPrice: 0
        }
    }

    componentDidMount() {
        this.setState({
            shopcar: JSON.parse(localStorage.getItem('shopcar')),
        }, () => {
            let { shopcar, totalPrice } = this.state;
            totalPrice = 0;
            shopcar.map(item => {
                item.flag = false;
                if (item.flag) {
                    totalPrice += item.num * item.price;
                }
            });
            totalPrice = totalPrice.toFixed(2);
            this.setState({
                totalPrice
            });
        });
    }

    renderItem = () => {
        return this.state.shopcar && this.state.shopcar.map(item => <tr key={item.id}>
            <td style={{ paddingLeft: '.1rem', width: '.5rem' }}>
                <Checkbox.CheckboxItem checked={item.flag} onChange={(e) => {
                    this.select(e, item.id)
                }}></Checkbox.CheckboxItem>
            </td>
            <td style={{ width: '1rem', fontSize: '.12rem' }}>{item.name}</td>
            <td style={{ width: '1rem' }}>
                <Stepper
                    style={{ width: '.9rem' }}
                    showNumber
                    max={100}
                    min={1}
                    defaultValue={item.num}
                    onChange={(num) => {
                        this.change(item.id, num)
                    }}
                />
            </td>
            <td>{item.price}</td>
            <td>
                <Button type="warning" inline style={{ width: '.6rem', height: '.4rem' }} onClick={() => { this.del(item.id) }}>删除</Button>
            </td>
        </tr>);
    }

    change = (id, num) => {
        let { shopcar, totalPrice } = this.state;
        shopcar.map(item => {
            if (item.id == id) {
                item.num = num
            }
        });

        totalPrice = 0;
        shopcar.map(item => {
            if (item.flag) {
                totalPrice += item.num * item.price;
            }
        });
        totalPrice = totalPrice.toFixed(2);

        localStorage.setItem('shopcar', JSON.stringify(shopcar));
        this.setState({
            shopcar,
            totalPrice
        });
    }

    del = id => {
        // console.log(id);
        let { shopcar, totalPrice } = this.state;
        shopcar.map((item, index) => {
            if (item.id == id) {
                // console.log(typeof totalPrice);
                if (item.flag) {
                    totalPrice -= item.num * item.price;
                }
                shopcar.splice(index, 1);
            }
        });

        localStorage.setItem('shopcar', JSON.stringify(shopcar));
        this.setState({
            shopcar,
            totalPrice: totalPrice.toFixed(2)
        });
    }

    select = (e, id) => {
        // console.log(e.target.checked, id);
        let { shopcar, totalPrice } = this.state;
        if (e.target.checked) {
            shopcar.map(item => {
                if (item.id == id) {
                    item.flag = e.target.checked;
                }
            })
        } else {
            shopcar.map(item => {
                if (item.id == id) {
                    item.flag = e.target.checked;
                }
            })
        }
        totalPrice = 0;
        shopcar.map(item => {
            if (item.flag) {
                totalPrice += item.num * item.price;
            }
        })

        this.setState({
            shopcar,
            totalPrice: totalPrice.toFixed(2)
        });
    }

    selectAll = e => {
        // console.log(e.target.checked);
        let { shopcar, totalPrice } = this.state;
        if (e.target.checked) {
            totalPrice = 0;
            shopcar.map(item => {
                item.flag = e.target.checked;
                totalPrice += item.num * item.price;
            })

            totalPrice = totalPrice.toFixed(2);

        } else {
            shopcar.map(item => {
                item.flag = e.target.checked;
            })

            totalPrice = 0;
        }

        this.setState({
            shopcar,
            totalPrice
        });
    }


    render() {
        return (<div className="content">
            <table style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>
                            <Checkbox.CheckboxItem onChange={this.selectAll}></Checkbox.CheckboxItem>
                        </th>
                        <th>商品名称</th>
                        <th>数量</th>
                        <th>单价/元</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderItem()}
                </tbody>
            </table>

            <div className="end">
                <span className="price">总价：{this.state.totalPrice} 元</span>
                <Button type="primary" inline style={{ width: '.6rem', height: '.4rem' }}>结算</Button>
            </div>

        </div>);
    }
}

