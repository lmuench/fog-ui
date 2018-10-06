import React, { Component } from 'react';
// import config from '../config';
import api from '../api/api';
import ResourceTable from './ResourceTable';

class ApiBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: []
    };
  }

  componentDidMount = async () => {
    const endpoints = await api.getArray('/builder/endpoints');
    const resources = this.extractResources(endpoints);
    this.setState({
      resources: resources
    });
  }

  extractResources = endpoints => {
    const resources = [];
    endpoints.forEach(endpoint => {
      endpoint.resources.forEach(resource => {
        const extendedResource = {
          ...endpoint,
          ...resource
        };
        delete extendedResource.resources;
        extendedResource.customPath = extendedResource.path;
        resources.push(extendedResource);
      })
    })
    return resources;
  }

  render = () => (
    <div className="ApiBuilder">
      <ResourceTable data={this.state.resources} />
    </div>
  );
}

export default ApiBuilder;
