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
    const resource = {
      customPath: key,
      lastValue: JSON.stringify(await api.get('/gateway' + key), null, 1)
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
    Object.keys(this.props.mappings).forEach(key => {
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
  mappings: state.resources.mappings,
  resources: state.resources.resources
});

export default connect(mapStateToProps)(ResourceAccess);
