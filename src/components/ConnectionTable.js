import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
// import AppsTableActions from './AppsTableActions';
import EditableCell from './EditableCell.js';
import { Button } from 'react-bootstrap';

export const CONNECTION_TABLE = 'connectionTable';

const SaveButton = () => (
  <Button bsStyle="primary" onClick={save}>Save</Button>
);

const save = () => {};

const NameCell = props => (
  <EditableCell {...props} column="name" />
);

const apiCell = props => (
  <EditableCell {...props} column="api" />
);

const webConsoleCell = props => (
  <EditableCell {...props} column="webConsole" />
);

const columns = [
  { key: 'index', primaryKey: true, header: 'Index', sortable: true },
  { key: 'name', primaryKey: true, header: 'Name', searchable: true, sortable: true, Component: NameCell },
  { key: 'api', header: 'API URL', searchable: true, sortable: true, Component: apiCell },
  { key: 'webConsole', header: 'Web Console URL', searchable: true, sortable: true, Component: webConsoleCell }
];

class ConnectionTable extends Component {
  render = () => (
    <Table
      {...this.props}
      columns={columns}
    />
  );
}

export default sematable(CONNECTION_TABLE, ConnectionTable, columns);
