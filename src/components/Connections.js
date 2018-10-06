import React, { Component } from 'react';
import ConnectionTable from './ConnectionTable';
// import Checkbox from './Checkbox';

function Gateway() {
  this.name = '';
  this.api = '';
  this.webConsole = '';
}

class Connections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gateways: []
    };
  }

  componentDidMount = async () => {
    const gateways = localStorage.getItem('gateways') || [];
    gateways.push(new Gateway());
    gateways.forEach((gateway, i) => gateway.index = i);
    this.setState({
      gateways: gateways
    });
  }

  setName = (i, name) => {
    const gateways = this.state.gateways;
    gateways[i].name = name;
    this.setState({
      gateways: gateways
    });
  }

  render = () => (
    <div>
      <ConnectionTable
        selectable
        data={this.state.gateways}
        setName={(i, name) => this.setName(i, name)}
      // CheckboxComponent={Checkbox}
      />
    </div>
  );
}

export default Connections;
