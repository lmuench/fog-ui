import React, { Component } from 'react';
import ResourceTable from './ResourceTable';
import { makeSelectors } from 'sematable';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api';

class ApiBuilder extends Component {
  constructor(props) {
    super(props);
    this.setInitialMappings();
  }

  setInitialMappings = async () => {
    const mappings = await this.getResources();
    this.props.dispatch({
      type: 'SET_INITIAL_MAPPINGS',
      value: mappings
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
        extendedResource.customPath = extendedResource.path;
        extendedResource.index = index;
        index += 1;
        resources.push(extendedResource);
      })
    })
    return resources;
  }

  reload = () => {
    this.setInitialMappings();
  }

  save = () => {
    const map = {};
    this.props.selectedRows.forEach(m => {
      map[m.customPath] = m.base + m.path;
    });
    api.put('/builder/mapping', map);
  }

  render = () => (
    <div className="ApiBuilder">
      <ResourceTable data={this.props.mappings} selectable />
      <Button onClick={this.reload} style={{ marginRight: '5px' }} bsStyle="danger">Reload resources</Button>
      <Button onClick={this.save}>Publish selected</Button>
    </div>
  );
}

const selectors = makeSelectors('resourceTable');

const mapStateToProps = state => ({
  mappings: state.mappings.mappings,
  selectedRows: selectors.getSelectedRows(state)
});

export default connect(mapStateToProps)(ApiBuilder);
