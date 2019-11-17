import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Content = props => {
    const renderItem = () => {
        // console.log(props.list);
        return props.list.map(item => (<li key={item.api_cid}>
            <Link to={{
                pathname: `/list/${item.api_cid}`,
                search: `cid=${item.api_cid}&name=${item.name}`
            }}>
                <img src={item.img} />
                <span>{item.name}</span>
            </Link>
        </li>));
    }

    return (<div className="category">
        <h3>{props.name}</h3>
        <ul>
            {renderItem()}
        </ul>
    </div>);
}


export default Content;