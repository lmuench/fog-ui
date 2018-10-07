import React, { Component } from 'react';
import ConnectionTable from './ConnectionTable';
import { makeSelectors } from 'sematable';
import store from '../store';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Connections extends Component {

  delete = () => {
    this.props.selectedRows.forEach(row => store.dispatch({
      type: 'DELETE_CONNECTION',
      index: row.index
    }));
    this.save();
  }

  new = () => {
    store.dispatch({
      type: 'NEW_CONNECTION'
    });
  }

  save = () => {
    store.dispatch({
      type: 'SAVE_CONNECTIONS'
    });
  }

  render = () => (
    <div>
      <ConnectionTable
        selectable
        data={this.props.connections}
      />
      <Button bsStyle="danger" onClick={this.delete}>Delete selection</Button>
      <Button bsStyle="success" onClick={this.new}>New</Button>
      <Button bsStyle="primary" onClick={this.save}>Save</Button>
    </div>
  );
}

const selectors = makeSelectors('connectionTable');

const mapStateToProps = state => ({
  connections: state.connections.connections,
  selectedRows: selectors.getSelectedRows(state)
});

export default connect(mapStateToProps)(Connections);
