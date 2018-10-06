import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from '../config';
// import builderApi from '../api/builderApi';
import api from '../api/api';
import TopBar from '../components/misc/TopBar';
import ResourceTable from './ResourceTable';

const ACTUATOR = 'ACTUATOR'
const SENSOR = 'SENSOR';
const SENSOR_SMOKE = 'SENSOR:SMOKE';
const SENSOR_TEMPERATURE = 'SENSOR:TEMPERATURE';

const resources = [
  {
    id: 1,
    name: 'smk1',
    type: SENSOR_SMOKE
  },
  {
    id: 2,
    name: 'smk4',
    type: SENSOR_SMOKE
  },
  {
    id: 3,
    name: 'window_left',
    type: ACTUATOR
  }
];

class App extends Component {
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
    <div className="App">
      <ResourceTable data={this.state.resources} />
    </div>
  );
}

export default App;
