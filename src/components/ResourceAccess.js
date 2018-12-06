import React, { Component } from 'react';
import AccessTable from './AccessTable';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api';

class ResourceAccess extends Component {

  componentDidMount = async () => {
    this.fetchAllResources();
  }

  fetchResource = async key => {
    const jsonAndStatus = await api.getWithStatus('/gateway' + key);
    const resource = {
      customPath: key,
      lastValue: JSON.stringify(jsonAndStatus.json, null, 1),
      lastStatus: jsonAndStatus.status
    };

    this.props.dispatch({
      type: 'ADD_RESOURCE',
      value: resource
    });
  }

  fetchAllResources = () => {
    this.props.dispatch({
      type: 'CLEAR_RESOURCES'
    });
    this.props.api.forEach(key => {
      this.fetchResource(key)
    })
  }

  render = () => (
    <div>
      <AccessTable data={this.props.resources} fetchResource={this.fetchResource} />
      <Button onClick={this.fetchAllResources} style={{ marginRight: '5px' }}>GET all</Button>
    </div>
  );
}

const mapStateToProps = state => ({
  api: state.resources.api,
  resources: state.resources.resources
});

export default connect(mapStateToProps)(ResourceAccess);
