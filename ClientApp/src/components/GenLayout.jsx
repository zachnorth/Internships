import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/requests';
import { NavMenu } from './NavMenu';

class GenLayout extends Component {
  static displayName = GenLayout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
export default connect(
  state => state,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(GenLayout);