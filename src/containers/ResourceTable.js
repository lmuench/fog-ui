import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
// import EditableCell from './EditableCell.js';

export const RESOURCE_TABLE = 'resourceTable';

const columns = [
  { key: 'id', primaryKey: true, header: 'ID', sortable: true },
  { key: 'name', header: 'Name', searchable: true, sortable: true },
  {
    key: 'type',
    header: 'Type',
    filterable: true,
    filterValues: [
      'ACTUATOR',
      'SENSOR',
      'SENSOR:SMOKE',
      'SENSOR:TEMPERATURE',
    ],
    getFilterClassName: value => `col-${value.toLowerCase()}`,
    sortable: true
  },
];

class ResourceTable extends Component {
  render() {
    return <Table {...this.props} columns={columns} />;
  }
}

export default sematable(RESOURCE_TABLE, ResourceTable, columns);
