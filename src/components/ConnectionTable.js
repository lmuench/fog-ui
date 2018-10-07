import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
import EditableCell from './EditableCell.js';

const NameCell = props => (
  <EditableCell {...props} column="name" />
);

const ApiCell = props => (
  <EditableCell {...props} column="api" />
);

const WebConsoleCell = props => (
  <EditableCell {...props} column="webConsole" />
);

const columns = [
  { key: 'index', primaryKey: true, header: 'Index', sortable: true },
  { key: 'name', primaryKey: true, header: 'Name', searchable: true, sortable: true, Component: NameCell },
  { key: 'api', header: 'API Host', searchable: true, sortable: true, Component: ApiCell },
  { key: 'webConsole', header: 'Web Console Host', searchable: true, sortable: true, Component: WebConsoleCell }
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
