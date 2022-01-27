
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { app } from "./firebase";


import GenLayout from './components/GenLayout.jsx';
import Home from './views/main/home.jsx';
import Internships from './views/Internships/internships';
import NewInternship from './views/Internships/newInternship';
import Login from "./views/Authentication/login";

import './custom.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store/requests';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.el = this.el.bind(this);
    this.renderWithLayout = this.renderWithLayout.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.el);
    console.log("React Environment", process.env.NODE_ENV);
  }

  el = (event) => {
    this.props.persistor.purge();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.el);
  }

  renderWithLayout(Component, Layout, props) {
    return (
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    );
  }

  render() {
    return (
      <Switch>
        <Route 
          path='/'
          render={(props) => this.renderWithLayout(Home, GenLayout, props)}
        />

        <Route 
          exact path='/internships'
          render={(props) => this.renderWithLayout(Internships, GenLayout, props)}
        />

        <Route 
          exact path='/internships/new'
          render={(props) => this.renderWithLayout(NewInternship, GenLayout, props)}
        />
      </Switch>
    );
  }
}
export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(App);
