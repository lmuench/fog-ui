import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
import EditableCell from './EditableCell.js';

const NameCell = props => (
  <EditableCell {...props} actionType="SET_CONNECTION_VALUE" column="name" />
);

const HostCell = props => (
  <EditableCell {...props} actionType="SET_CONNECTION_VALUE" column="host" />
);

const RdCell = props => (
  <EditableCell {...props} actionType="SET_CONNECTION_VALUE" column="rd" />
);

const columns = [
  { key: 'index', primaryKey: true, header: 'Index', sortable: true },
  { key: 'name', header: 'Name', searchable: true, sortable: true, Component: NameCell },
  { key: 'host', header: 'Gateway Host (e.g. http://127.0.0.1:8080)', searchable: true, sortable: true, Component: HostCell },
  { key: 'rd', header: 'Resource Directory Host', searchable: true, sortable: true, Component: RdCell }
];

class ConnectionTable extends Component {
  render = () => (
    <Table {...this.props} columns={columns} />
  );
}

export default sematable('connectionTable', ConnectionTable, columns, { defaultPageSize: 10 });
