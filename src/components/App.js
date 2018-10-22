import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import TopBar from './TopBar';
import ApiBuilder from './ApiBuilder';
import Connections from './Connections';
import WebConsole from './WebConsole';
import ResourceAccess from './ResourceAccess';
import { connect } from 'react-redux';
import api from '../api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    this.setMappings();
    this.props.history.push('/resources');
  }
  
  setMappings = async () => {
    const mappings = await this.getMappings();
    this.props.dispatch({
      type: 'SET_MAPPINGS',
      value: mappings
    });
  }

  getMappings = async () => {
    return await api.getArray('/builder/mapping');
  }

  render = () => (
    <div className="App">
      <TopBar />
      <Route path="/resources" component={ResourceAccess} />
      <Route path="/apibuilder" component={ApiBuilder} />
      <Route path="/connections" component={Connections} />
      <Route path="/webconsole" component={WebConsole} />
    </div>
  );
}

export default withRouter(connect()(App));
// export default App;
