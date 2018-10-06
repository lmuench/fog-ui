import React, { Component } from 'react';
import { connect } from 'react-redux';

require('./EditableCell.css');

class EditableCell extends Component {

  constructor(props) {
    super(props);
    this.sematable = this.props.sematable;
    this.row = this.props.row;
    this.state = { value: '' };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      value: event.target.value
    });
    // TODO if necessary: dispatch cell state change
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
    sematable: state.sematable
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableCell);
