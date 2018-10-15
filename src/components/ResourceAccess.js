import React, { Component } from 'react';
import AccessTable from './AccessTable';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api';

class ResourceAccess extends Component {
  // setInitialResources = async () => {
  //   const endpoints = await this.getEndpoints();
  //   const resources = await this.getResources();
  //   this.props.dispatch({
  //     type: 'SET_INITIAL_ENDPOINTS',
  //     value: endpoints
  //   });
  //   this.props.dispatch({
  //     type: 'SET_INITIAL_RESOURCES',
  //     value: resources
  //   });
  // }

  // getResources = async () => {
  //   const endpoints = await this.getEndpoints();
  //   return this.extractResources(endpoints);
  // }

  // getEndpoints = async () => {
  //   return await api.getArray('/builder/endpoints');
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
  //       extendedResource.index = index;
  //       index += 1;
  //       resources.push(extendedResource);
  //     })
  //   })
  //   return resources;
  // }

  // reload = () => {
  //   this.setInitialResources();
  // }

  fetchResource = async (key, value) => {
    const resource = {
      customPath: key,
      lastValue: JSON.stringify(await api.get('/gateway' + key), null, 1)
    };
    // console.log(resource);
    this.props.dispatch({
      type: 'ADD_RESOURCE',
      value: resource
    });
  }

  fetchAllResources = () => {
    this.props.dispatch({
      type: 'CLEAR_RESOURCES'
    });
    Object.keys(this.props.mappings).forEach(key => {
      this.fetchResource(key, this.props.mappings[key])
    })
  }

  render = () => (
    <div>
      <AccessTable data={this.props.resources} />
      <Button onClick={this.fetchAllResources} style={{ marginRight: '5px' }}>GET</Button>
    </div>
  );
}

const mapStateToProps = state => ({
  mappings: state.resources.mappings,
  resources: state.resources.resources
});

export default connect(mapStateToProps)(ResourceAccess);
