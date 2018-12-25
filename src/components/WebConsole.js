import React, { Component } from 'react';
import { connect } from 'react-redux';

class WebConsole extends Component {
  createWebConsoleUrl = () => {
    const connection = this.props.connections[this.props.selected];
    if (!connection) return null;
    const host = connection.host;
    if (!host) return null;
    return host + '/system/console';
  }

  render = () => {
    const url = this.createWebConsoleUrl();
    if (url) {
      return <embed src={url} style={{ width: "100%" }} height={2000} />
    } else {
      return <div>No host defined</div>;
    }
  }
}


const mapStateToProps = state => ({
  connections: state.connections.connections,
  selected: state.connections.selected
});

export default connect(mapStateToProps)(WebConsole);
