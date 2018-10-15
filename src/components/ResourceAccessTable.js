import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
import EditableCell from './EditableCell.js';

// const SetValueCell = props => (
//   <EditableCell {...props} actionType="SET_MAPPING_VALUE" column="customPath" />
// );

const getFilterClassName = value => `col-${value.toLowerCase()}`;

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
  { key: 'base', header: 'Base URI', searchable: true, sortable: true },
  { key: 'path', primaryKey: true, header: 'Original Path', searchable: true, sortable: true },
  // { key: 'customPath', header: 'Custom Path', searchable: true, sortable: true, Component: CustomPathCell },
  { key: 'value', header: 'Last Value', searchable: true, sortable: true },
  { key: 'rt', header: 'Resource Type', searchable: true, sortable: true },
  { key: 'if', header: 'Interface Description', searchable: true, sortable: true, filterable: true, filterValues: ['actuator', 'sensor'], getFilterClassName },
  { key: 'ep', header: 'Endpoint', searchable: true, sortable: true },
  { key: 'd', header: 'Sector', searchable: true, sortable: true },
  { key: 'protocol', header: 'Protocol', sortable: true, filterable: true, filterValues: ['CoAP', 'HTTP', 'MQTT'], getFilterClassName }
  // { key: 'gp', header: 'Group', searchable: true, sortable: true }
];

class ResourceAccessTable extends Component {
  render = () => {
    return <Table {...this.props} columns={columns} />;
  }
}

export default sematable('resourceAccessTable', ResourceAccessTable, columns, { defaultPageSize: 50 });
