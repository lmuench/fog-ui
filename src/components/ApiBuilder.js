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
    await this.mergeWithPersistedMappings(mappings);
    this.props.dispatch({
      type: 'SET_INITIAL_MAPPINGS',
      value: mappings
    });
  }

  mergeWithPersistedMappings = async mappings => {
    const fetchedApi = await api.getArray('/mappings/api');
    fetchedApi.forEach(persistedCustomPath => {
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

  save = async () => {
    const mappings = {};
    try {
      this.props.selectedRows.forEach(row => {
        if (!row.customPath.startsWith('/') || row.customPath.startsWith('//')) {
          throw new Error('Custom paths must start with "/"');
        }
        if (undefined !== mappings[row.customPath]) {
          throw new Error(`Paths must be unique ("${row.customPath}" is used more than once)`);
        }
        mappings[row.customPath] = row.base + row.path;
      });
      await api.putAsync('/mappings', mappings);
      this.setMappings(await api.get('/mappings'));
      this.setApi(await api.getArray('/mappings/api'));
      this.setInitialMappings();
    } catch (error) {
      alert(error.message);
    }
  }

  setMappings = fetchedMappings => {
    this.props.dispatch({
      type: 'SET_MAPPINGS',
      value: fetchedMappings
    });
  }

  setApi = fetchedApi => {
    this.props.dispatch({
      type: 'SET_API',
      value: fetchedApi
    });
  }

  render = () => (
    <div>
      <ApiBuilderTable data={this.props.mappings} selectable />
      <Button onClick={this.setInitialMappings} style={{ marginRight: '5px' }} bsStyle="danger">Reload resources</Button>
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
