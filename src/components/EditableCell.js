import React, { Component } from 'react';
import store from '../store';

require('./EditableCell.css');

class EditableCell extends Component {

  handleChange = event => {
    event.preventDefault();
    store.dispatch({
      type: 'SET_CONNECTION_VALUE',
      index: this.props.row.index,
      column: this.props.column,
      value: event.target.value
    });
  }

  render = () => {
    return (
      <div className="editableCellContainer">
        <input className="editableCell" type="text" value={this.props.children} onChange={this.handleChange} />
      </div>
    )
  }
}

export default EditableCell;
