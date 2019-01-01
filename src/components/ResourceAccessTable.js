import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
import EditableCell from './EditableCell.js';
import ResourceAccessTableActions from './ResourceAccessTableActions';

const NewValueCell = props => (
  <EditableCell {...props} actionType="SET_NEW_VALUE" column="newValue" />
);

const columns = [
  { key: 'customPath', primaryKey: true, header: 'Published As', searchable: true, sortable: true },
  { key: 'lastStatus', header: 'Last Status', searchable: true, sortable: true },
  { key: 'lastValue', header: 'Last Value', searchable: true, sortable: true },
  { key: 'newValue', header: 'New Value', searchable: true, sortable: true, Component: NewValueCell },
  { key: 'actions', header: 'Actions', Component: ResourceAccessTableActions }
];

class ResourceAccessTable extends Component {
  render = () => (
    <Table {...this.props} columns={columns} />
  );
}

export default sematable('resourceAccessTable', ResourceAccessTable, columns, { defaultPageSize: 50 });
