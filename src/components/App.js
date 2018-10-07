import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TopBar from './TopBar';
import ApiBuilder from './ApiBuilder';
import Connections from './Connections';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    this.setState({});
  }

  render = () => (
    <div className="App">
      <TopBar links={['/apibuilder']} />
      <Route path="/apibuilder" component={ApiBuilder} />
      <Route path="/connections" component={Connections} />
    </div>
  );
}

export default App;
