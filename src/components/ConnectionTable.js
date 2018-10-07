import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
import EditableCell from './EditableCell.js';

const NameCell = props => (
  <EditableCell {...props} column="name" />
);

const HostCell = props => (
  <EditableCell {...props} column="host" />
);

const DescriptionCell = props => (
  <EditableCell {...props} column="description" />
);

const columns = [
  { key: 'index', primaryKey: true, header: 'Index', sortable: true },
  { key: 'name', primaryKey: true, header: 'Name', searchable: true, sortable: true, Component: NameCell },
  { key: 'host', header: 'Host (e.g. http://127.0.0.1:8080)', searchable: true, sortable: true, Component: HostCell },
  { key: 'description', header: 'Description', searchable: true, sortable: true, Component: DescriptionCell }
];

class ConnectionTable extends Component {
  render = () => (
    <Table
      {...this.props}
      columns={columns}
    />
  );
}

export default sematable('connectionTable', ConnectionTable, columns, { defaultPageSize: 10 });
