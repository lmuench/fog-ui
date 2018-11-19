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
    this.state = {
      pathsStartWithSlash: false
    }
  }

  setInitialMappings = async () => {
    const mappings = await this.getResources();
    this.mergeWithPersistedMappings(mappings);
    this.props.dispatch({
      type: 'SET_INITIAL_MAPPINGS',
      value: mappings
    });
  }

  mergeWithPersistedMappings = mappings => {
    Object.keys(this.props.persistedMappings).forEach(persistedCustomPath => {
      const persistedPath = this.props.persistedMappings[persistedCustomPath];
      for (const mapping of mappings) {
        if (mapping.base + mapping.path === persistedPath) {
          mapping.customPath = persistedCustomPath;
          mapping.status = 'persisted';
          break;
        }
      }
    })
  }

  getResources = async () => {
    // const endpoints = await this.getEndpoints();
    // return this.extractResources(endpoints);
    return (await api.getArray('/rd/resources')).map((resource, index) => {
      if (resource.if && resource.rt) {
        resource.customPath = `/${resource.if}s/${resource.rt}`
      } else {
        resource.customPath = resource.path;
      }
      resource.index = index;
      resource.status= 'new';
      return resource;
    });
  }

  // getEndpoints = async () => {
  //   return await api.getArray('/rd/endpoints');
  // }

  // extractResources = endpoints => {
  //   const resources = [];
  //   let index = 0;
  //   endpoints.forEach(endpoint => {
  //     endpoint.resources.forEach(resource => {
  //       const extendedResource = {
  //         ...endpoint,
  //         ...resource
  //       };
  //       delete extendedResource.resources;
  //       extendedResource.customPath = extendedResource.path;
  //       extendedResource.index = index;
  //       extendedResource.status = 'new';
  //       index += 1;
  //       resources.push(extendedResource);
  //     })
  //   })
  //   return resources;
  // }

  reload = () => {
    this.setInitialMappings();
  }

  save = () => {
    const map = {};
    this.props.selectedRows.forEach(row => {
      if (!row.customPath.startsWith('/') || row.customPath.startsWith('//')) {
        alert('Custom paths must start with "/"');
        return;
      }
      map[row.customPath] = row.base + row.path;
    });
    api.put('/mappings', map);
    this.setMappings(map);
  }

  setMappings = mappings => {
    this.props.dispatch({
      type: 'SET_MAPPINGS',
      value: mappings
    });
  }

  render = () => (
    <div>
      <ResourceTable data={this.props.mappings} selectable />
      <Button onClick={this.reload} style={{ marginRight: '5px' }} bsStyle="danger">Reload resources</Button>
      <Button onClick={this.save}>Save selected</Button>
    </div>
  );
}

const selectors = makeSelectors('resourceTable');

const mapStateToProps = state => ({
  mappings: state.mappings.mappings,
  persistedMappings: state.resources.mappings,
  selectedRows: selectors.getSelectedRows(state)
});

export default connect(mapStateToProps)(ApiBuilder);
