import React, { Component } from 'react';
import ConnectionTable from './ConnectionTable';
import { makeSelectors } from 'sematable';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Connections extends Component {

  delete = () => {
    this.props.selectedRows.forEach(row => this.props.dispatch({
      type: 'DELETE_CONNECTION',
      index: row.index
    }));
    this.save();
  }

  new = () => {
    this.props.dispatch({
      type: 'NEW_CONNECTION'
    });
  }

  save = () => {
    this.props.dispatch({
      type: 'SAVE_CONNECTIONS'
    });
  }

  render = () => (
    <div>
      <ConnectionTable
        selectable
        data={this.props.connections}
      />
      <Button onClick={this.delete} style={{ marginRight: '30px' }} bsStyle="danger">Delete selection</Button>
      <Button onClick={this.new} style={{ marginRight: '5px' }}>New</Button>
      <Button onClick={this.save}>Save</Button>
    </div>
  );
}

const selectors = makeSelectors('connectionTable');

const mapStateToProps = state => ({
  connections: state.connections.connections,
  selectedRows: selectors.getSelectedRows(state)
});

export default connect(mapStateToProps)(Connections);
