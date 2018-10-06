import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
import EditableCell from './EditableCell.js';

export const RESOURCE_TABLE = 'resourceTable';

const columns = [
  { key: 'add', header: 'Add', sortable: true },
  {
    key: 'status',
    header: 'status',
    filterable: true,
    filterValues: [
      'NEW',
      'INCLUDED',
      'DEAD',
    ],
    getFilterClassName: value => `col-${value.toLowerCase()}`,
    sortable: true
  },
  { key: 'customPath', header: 'Custom Path', searchable: true, sortable: true, Component: EditableCell },
  { key: 'path', primaryKey: true, header: 'Original Path', searchable: true, sortable: true },
  { key: 'rt', header: 'Resource Type', searchable: true, sortable: true },
  { key: 'if', header: 'Interface Description', searchable: true, sortable: true },
  { key: 'protocol', header: 'Protocol', sortable: true },
  { key: 'ep', header: 'Endpoint', searchable: true, sortable: true },
  { key: 'd', header: 'Sector', searchable: true, sortable: true },
  { key: 'base', header: 'Base URI', searchable: true, sortable: true },
  { key: 'gp', header: 'Group', searchable: true, sortable: true }
];

class  ResourceTable extends Component {
  render = () => {
    return <Table {...this.props} columns={columns} />;
  }
}

export default sematable(RESOURCE_TABLE, ResourceTable, columns, { defaultPageSize: 50 });
