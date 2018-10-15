import React, { Component } from 'react';
import ResourceTable from './ResourceTable';
import { makeSelectors } from 'sematable';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api';

class ResourceAccess extends Component {
  constructor(props) {
    super(props);
    this.setInitialResources();
  }

  setInitialResources = async () => {
    const endpoints = await this.getEndpoints();
    const resources = await this.getResources();
    this.props.dispatch({
      type: 'SET_INITIAL_ENDPOINTS',
      value: endpoints
    });
    this.props.dispatch({
      type: 'SET_INITIAL_RESOURCES',
      value: resources
    });
  }

  getResources = async () => {
    const endpoints = await this.getEndpoints();
    return this.extractResources(endpoints);
  }

  getEndpoints = async () => {
    return await api.getArray('/builder/endpoints');
  }

  extractResources = endpoints => {
    const resources = [];
    let index = 0;
    endpoints.forEach(endpoint => {
      endpoint.resources.forEach(resource => {
        const extendedResource = {
          ...endpoint,
          ...resource
        };
        delete extendedResource.resources;
        extendedResource.index = index;
        index += 1;
        resources.push(extendedResource);
      })
    })
    return resources;
  }

  reload = () => {
    this.setInitialResources();
  }

  render = () => (
    <div className="ApiBuilder">
      <ResourceTable data={this.props.resources} selectable />
      <Button onClick={this.reload} style={{ marginRight: '5px' }} bsStyle="danger">Reload resources</Button>
    </div>
  );
}

const selectors = makeSelectors('resourceTable');

const mapStateToProps = state => ({
  resources: state.resources.resources
});

export default connect(mapStateToProps)(ResourceAccess);
