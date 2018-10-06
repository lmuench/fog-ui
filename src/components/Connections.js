import React, { Component } from 'react';
import ConnectionTable from './ConnectionTable';
// import Checkbox from './Checkbox';
import store from '../store';
import { Button } from 'react-bootstrap';

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

  save = () => {
    localStorage.setItem(
      'connections',
      JSON.stringify(store.getState().connections.connections)
    );
  }

  render = () => (
    <div>
      <ConnectionTable
        // selectable
        data={store.getState().connections.connections}
        // CheckboxComponent={Checkbox}
      />
      <Button bsStyle="primary" onClick={this.save}>Save</Button>
    </div>
  );
}

export default Connections;
