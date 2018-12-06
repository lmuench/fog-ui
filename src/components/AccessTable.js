import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
import EditableCell from './EditableCell.js';
import AccessTableActions from './AccessTableActions';

// const SetValueCell = props => (
//   <EditableCell {...props} actionType="SET_MAPPING_VALUE" column="customPath" />
// );

// const getFilterClassName = value => `col-${value.toLowerCase()}`;

const NewValueCell = props => (
  <EditableCell {...props} actionType="SET_NEW_VALUE" column="newValue" />
);

const columns = [
  // TODO: status
  // {
  //   key: 'status',
  //   header: 'status',
  //   filterable: true,
  //   filterValues: [
  //     'NEW',
  //     'INCLUDED',
  //     'DEAD',
  //   ],
  //   getFilterClassName: value => `col-${value.toLowerCase()}`,
  //   sortable: true
  // },
  { key: 'customPath', primaryKey: true, header: 'Published As', searchable: true, sortable: true },
  // { key: 'resource', header: 'Resource', searchable: true, sortable: true, Component: CustomPathCell },
  { key: 'lastStatus', header: 'Last Status', searchable: true, sortable: true },
  { key: 'lastValue', header: 'Last Value', searchable: true, sortable: true },
  // { key: 'rt', header: 'Resource Type', searchable: true, sortable: true },
  // { key: 'if', header: 'Interface Description', searchable: true, sortable: true, filterable: true, filterValues: ['actuator', 'sensor'], getFilterClassName },
  // { key: 'ep', header: 'Endpoint', searchable: true, sortable: true },
  // { key: 'd', header: 'Sector', searchable: true, sortable: true },
  // { key: 'protocol', header: 'Protocol', sortable: true, filterable: true, filterValues: ['CoAP', 'HTTP', 'MQTT'], getFilterClassName }
  // { key: 'gp', header: 'Group', searchable: true, sortable: true }
  { key: 'newValue', header: 'New Value', searchable: true, sortable: true, Component: NewValueCell },
  { key: 'actions', header: 'Actions', Component: AccessTableActions }
];

class AccessTable extends Component {
  render = () => (
    <Table {...this.props} columns={columns} />
  );
}

export default sematable('accessTable', AccessTable, columns, { defaultPageSize: 50 });
