import React, { Component } from 'react';
import ConnectionTable from './ConnectionTable';
// import Checkbox from './Checkbox';
import store from '../store';

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

  render = () => (
    <div>
      <ConnectionTable
        selectable
        data={store.getState().connections.connections}
      // CheckboxComponent={Checkbox}
      />
    </div>
  );
}

export default Connections;
