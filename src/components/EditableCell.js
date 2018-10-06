import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeSelectors } from 'sematable';
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
      type: 'SET',
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

const mapStateToProps = state => {
  return {
    connections: state.connections
  };
}

export default connect(mapStateToProps, null)(EditableCell);
