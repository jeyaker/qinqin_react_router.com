import React from 'react';
import './index.scss';
import qs from 'querystring';

export default class Tab extends React.Component {
    render() {
        const { tabFlag, title } = this.props;
        const name = qs.parse(this.props.location.search.split('?')[1]).name;
        // console.log(name);
        const { goBack, go } = this.props.history;
        return (<header>
            {/* {tabFlag && <i className="fas fa-angle-left" onClick={() => { go(-1) }}></i>} */}
            {tabFlag && <i className="fas fa-angle-left" onClick={goBack}></i>}
            <span>{title && title || name}</span>
        </header>);
    }

}