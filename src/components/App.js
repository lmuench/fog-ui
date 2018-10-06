import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import config from '../config';
import TopBar from './TopBar';
import ApiBuilder from './ApiBuilder';

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
    </div>
  );
}

export default App;
