import React, { Component } from 'react';
import store from '../store';

require('./EditableCell.css');

class EditableCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      value: event.target.value,
    });
    store.dispatch({
      type: 'SET_CONNECTION_VALUE',
      index: this.props.row.index,
      column: this.props.column,
      value: event.target.value
    });
  }

  render = () => {
    const { value } = this.state;
    return (
      <div className="editableCellContainer">
        <input className="editableCell" type="text" value={value} onChange={this.handleChange} />
      </div>
    )
  }
}

export default EditableCell;
