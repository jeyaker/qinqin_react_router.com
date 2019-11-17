import React, { Component } from 'react';
import './index.scss';
import { request } from 'utils/request';
import Slider from './Slider';

export default class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const data = await request({
            url: '/index.php',
            method: 'get',
            params: {
                r: 'class/category',
                type: 1
            }
        });


        // fetch('/index.php?r=class/category&type=1').then(data => data.json()).then(res => {
        //     console.log(res);
        // })

        // console.log(data.data.data.data);
        this.setState(() => {
            data.data.data.data.map(item => {
                item.title = item.name
            })
            return {
                data: data.data.data.data
            }
        })
    }

    render() {
        return (<div className="content">
            <Slider {...this.state} />
        </div>);
    }
}