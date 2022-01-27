import React, { Component } from 'react';

// import {
//     Card,
//     CardBody,
//     CardHeader,
//     CardFooter,
//     CardTitle,
//     CardText,
//     Button,
//     Row,
//     Col,
//     InputGroup,
//     InputGroupText,
//     Input,
//     ButtonGroup
// } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/requests.js';

import Login from '../Authentication/login';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="container">
                <Login {...this.props} />
            </div>
        );
    }
};

export default connect(
	(state) => state,
	(dispatch) => bindActionCreators(actionCreators, dispatch)
)(Home);