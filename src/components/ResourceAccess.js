import React, { Component } from 'react';
import ResourceAccessTable from './ResourceAccessTable';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api';

class ResourceAccess extends Component {

  componentDidMount = async () => {
    await this.fetchApi();
    this.fetchAllResources();
  }

  fetchApi = async () => {
    const fetchedApi = await api.get('/mappings/api');
    this.props.dispatch({
      type: 'SET_API',
      value: fetchedApi
    });
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
    console.log(this.props.api);
    this.props.api.forEach(key => {
      this.fetchResource(key)
    })
  }

  render = () => (
    <div>
      <ResourceAccessTable data={this.props.resources} fetchResource={this.fetchResource} />
      <Button onClick={this.fetchAllResources} style={{ marginRight: '5px' }}>GET all</Button>
    </div>
  );
}

const mapStateToProps = state => ({
  api: state.resourceAccess.api,
  resources: state.resourceAccess.resources
});

export default connect(mapStateToProps)(ResourceAccess);
