import React, { Component } from 'react';
import ConnectionTable from './ConnectionTable';
// import Checkbox from './Checkbox';

const nullGateway = {
  name: null,
  api: null,
  webConsole: null
}

class Connections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gateways: [],
      connectedGateway: {
        name: null,
        api: null,
        webConsole: null
      }
    };
  }

  componentDidMount = async () => {
    this.setState({
      gateways: localStorage.getItem('gateways') || [],
      selectedGateway: localStorage.getItem('selectedGateway') || nullGateway
    });
  }

  render = () => (
    <div>
      <ConnectionTable
        columns={this.state.gateways.push({nullGateway})}
        selectable
        data={this.state.gateways}
      // CheckboxComponent={Checkbox}
      />
    </div>
  );
}

export default Connections;
