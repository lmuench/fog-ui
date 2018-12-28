import React, { Component } from 'react';
import ApiBuilderTable from './ApiBuilderTable';
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

  reload = () => {
    this.setInitialMappings();
  }

  save = () => {
    const map = {};
    try {
      this.props.selectedRows.forEach(row => {
        if (!row.customPath.startsWith('/') || row.customPath.startsWith('//')) {
          throw new Error('Custom paths must start with "/"');
        }
        if (undefined !== map[row.customPath]) {
          throw new Error(`Paths must be unique ("${row.customPath}" is used more than once)`);
        }
        map[row.customPath] = row.base + row.path;
      });
      api.put('/mappings', map);
      this.setMappings(map);
      this.setApi(map);
    } catch (error) {
      alert(error.message);
    }
  }

  setMappings = mappings => {
    this.props.dispatch({
      type: 'SET_MAPPINGS',
      value: mappings
    });
  }

  setApi = mappings => {
    const api = Object.keys(mappings).filter(mapping => !mapping.includes(':'));
    this.props.dispatch({
      type: 'SET_API',
      value: api
    });
  }

  render = () => (
    <div>
      <ApiBuilderTable data={this.props.mappings} selectable />
      <Button onClick={this.reload} style={{ marginRight: '5px' }} bsStyle="danger">Reload resources</Button>
      <Button onClick={this.save}>Save selected</Button>
    </div>
  );
}

const selectors = makeSelectors('apiBuilderTable');

const mapStateToProps = state => ({
  mappings: state.apiBuilder.mappings,
  persistedMappings: state.resourceAccess.mappings,
  selectedRows: selectors.getSelectedRows(state)
});

export default connect(mapStateToProps)(ApiBuilder);
