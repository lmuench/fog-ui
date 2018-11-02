import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api';
const JSON5 = require('json5');

class AccessTableActions extends Component {
  post = () => {
    const json = this.safeJsonParse(this.props.newValues[this.props.row.index]);
    api.post('/gateway' + this.props.row.customPath, json);
  }

  get = async () => {
    const resource = {
      customPath: this.props.row.customPath,
      lastValue: JSON.stringify(await api.get('/gateway' + this.props.row.customPath), null, 1)
    };

    this.props.dispatch({
      type: 'UPDATE_RESOURCE',
      index: this.props.row.index,
      value: resource
    });
  }

  put = () => {
    const json = this.safeJsonParse(this.props.newValues[this.props.row.index]);
    api.put('/gateway' + this.props.row.customPath, json);
  }

  safeJsonParse = (str) => str ? JSON5.parse(str) : {};

  render() {
    return (
      <div>
        <Button onClick={this.post} style={{ marginRight: '5px' }}>POST</Button>
        <Button onClick={this.get} style={{ marginRight: '5px' }}>GET</Button>
        <Button onClick={this.put} style={{ marginRight: '5px' }}>PUT</Button>
        <Button onClick={this.delete} style={{ marginRight: '5px' }}>DELETE</Button>        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newValues: state.resources.newValues
});

export default connect(mapStateToProps)(AccessTableActions);
