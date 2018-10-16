import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class AccessTableActions extends Component {

  render() {
    return (
      <div>
        <Button onClick={this.post} style={{ marginRight: '5px' }}>POST</Button>
        <Button onClick={this.get} style={{ marginRight: '5px' }}>GET</Button>
        <Button onClick={this.put} style={{ marginRight: '5px' }}>PUT</Button>
        <Button onClick={this.delete} style={{ marginRight: '5px' }}>DELETE</Button>        
      </div>
    );
  }
}

export default AccessTableActions;
