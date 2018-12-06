import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api';
const JSON5 = require('json5');

class AccessTableActions extends Component {
  post = async () => {
    const json = this.safeJsonParse(this.props.newValues[this.props.row.index]);
    const jsonAndStatus = await api.postWithStatus('/gateway' + this.props.row.customPath, json);
    this.dispatchToStore(jsonAndStatus);
  }

  get = async () => {
    const jsonAndStatus = await api.getWithStatus('/gateway' + this.props.row.customPath);
    this.dispatchToStore(jsonAndStatus);
  }

  put = async () => {
    const json = this.safeJsonParse(this.props.newValues[this.props.row.index]);
    const jsonAndStatus = await api.putWithStatus('/gateway' + this.props.row.customPath, json);
    this.dispatchToStore(jsonAndStatus);
  }

  dispatchToStore = async jsonAndStatus => {
    const resource = {
      customPath: this.props.row.customPath,
      lastValue: JSON.stringify(jsonAndStatus.json, null, 1),
      lastStatus: jsonAndStatus.status
    };

    this.props.dispatch({
      type: 'UPDATE_RESOURCE',
      index: this.props.row.index,
      value: resource
    });
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
