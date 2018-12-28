import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
import EditableCell from './EditableCell.js';

const CustomPathCell = props => (
  <EditableCell {...props} actionType="SET_MAPPING_VALUE" column="customPath" />
);

const getFilterClassName = value => `col-${value.toLowerCase()}`;

const columns = [
  { key: 'index', primaryKey: true, hidden: true },
  { key: 'status', header: 'Status', filterable: true, filterValues: ['new', 'persisted'], getFilterClassName, sortable: true },
  { key: 'base', header: 'Base URI', searchable: true, sortable: true },
  { key: 'path', header: 'Original Path', searchable: true, sortable: true },
  { key: 'customPath', header: 'Custom Path', searchable: true, sortable: true, Component: CustomPathCell },
  { key: 'rt', header: 'Resource Type', searchable: true, sortable: true},
  { key: 'if', header: 'Interface Description', searchable: true, sortable: true, filterable: true, filterValues: ['actuator', 'sensor'], getFilterClassName },
  { key: 'ep', header: 'Endpoint', searchable: true, sortable: true },
  { key: 'd', header: 'Sector', searchable: true, sortable: true },
  { key: 'protocol', header: 'Protocol', sortable: true, filterable: true, filterValues: ['CoAP', 'HTTP', 'MQTT'], getFilterClassName }
  // { key: 'gp', header: 'Group', searchable: true, sortable: true }
];

class  ApiBuilderTable extends Component {
  render = () => (
    <Table {...this.props} columns={columns} />
  );
}

export default sematable('apiBuilderTable', ApiBuilderTable, columns, { defaultPageSize: 50 });
