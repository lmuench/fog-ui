import React, { Component } from 'react';
import ConnectionTable from './ConnectionTable';
import { makeSelectors } from 'sematable';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Connections extends Component {
  componentDidMount = () => {
    this.getAllRDs();
  }

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
    this.putAllRDs();
    this.props.dispatch({
      type: 'SAVE_CONNECTIONS'
    });
  }

  getAllRDs = async () => {
    this.props.connections.forEach(async row => {
      let rdUrl = '';
      let rdUrlResource = row.host + '/services/rd/url';
      try {
        if (row.host && row.host.startsWith('http')) {
          const res = await fetch(rdUrlResource);
          if (res.status === 200) {
            const json = await res.json();
            rdUrl = json.url;
          }
        }
      } catch (e) {
        console.log('Error! Could not fetch RD URL from ' + rdUrlResource);
      }
      this.props.dispatch({
        type: 'SET_CONNECTION_VALUE',
        index: row.index,
        column: 'rd',
        value: rdUrl || ''
      })
    });
  }

  putAllRDs = () => {
    this.props.connections.forEach(async row => {
      if (row.host && row.host.startsWith('http')) {
        const res = await fetch(row.host + '/services/rd/url', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({ url: row.rd })
        });
        if (res.status === 200) {
          try {
            const json = await res.json();
            if (json === false) {
              alert(`Gateway ${row.host} could not connect to RD ${row.rd}`);
            }
          } catch (e) {
            console.log(`Error! Could not parse response from PUT ${row.rd} to ${row.host} as JSON.`);
          }
        } else {
          console.log(`Error! Could not PUT ${row.rd} to ${row.host}! Response status: ${res.status}`);
        }
      }
    });
  }

  render = () => (
    <div>
      <ConnectionTable data={this.props.connections} selectable />
      <Button onClick={this.delete} style={{ marginRight: '30px' }} bsStyle="danger">Delete selected</Button>
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
