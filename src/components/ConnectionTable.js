import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
// import AppsTableActions from './AppsTableActions';
import EditableCell from './EditableCell.js';
import { Button } from 'react-bootstrap';

export const CONNECTION_TABLE = 'connectionTable';

const SaveButton = () => (
  <Button bsStyle="primary" onClick={save}>Save</Button>
);

const save = () => {

}

const columns = [
  { key: 'name', primaryKey: true, header: 'Name', searchable: true, sortable: true, Component: EditableCell },
  { key: 'api', header: 'API URL', searchable: true, sortable: true, Component: EditableCell },
  { key: 'webConsole', header: 'Web Console URL', searchable: true, sortable: true, Component: EditableCell }
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
