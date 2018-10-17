import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../api';
import { tableDestroyState, tableSetFilter } from 'sematable';

class TopBar extends Component {
  componentDidMount = () => {
    this.setMappings();
  }

  resourceSelectHandler = eventKey => {
    this.props.history.push('/resources');
    if (eventKey === -1) {
      this.props.dispatch(tableDestroyState('accessTable'));
    } else {
      this.props.dispatch(tableSetFilter('accessTable', [eventKey]));
    }
  }

  setMappings = async () => {
    const mappings = await this.getMappings();
    this.props.dispatch({
      type: 'SET_MAPPINGS',
      value: mappings
    });
  }

  getMappings = async () => {
    return await api.getArray('/builder/mapping');
  }

  connectionSelectHandler = eventKey => {
    if (eventKey === -1) {
      this.props.history.push('/connections');
      return;
    }
    this.props.dispatch({
      type: 'SELECT_CONNECTION',
      index: eventKey
    });
    if (window.location.hash === '#/apibuilder') {
      window.location.reload();
    }
  }

  render = () => (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={'/'}>Fog Manager</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavDropdown
          title="Resources"
          id="basic-nav-dropdown"
          onSelect={this.resourceSelectHandler}
          active={window.location.hash === '#/resources'}
        >
          {Object.keys(this.props.mappings).map((resource, i) => (
            <MenuItem eventKey={resource} key={i}>{resource}</MenuItem>
          ))}
          <MenuItem divider />
          <MenuItem eventKey={-1}>View all</MenuItem>
        </NavDropdown>
        <NavItem
          componentClass={Link}
          href="/apibuilder"
          to="/apibuilder"
          active={window.location.hash === '#/apibuilder'}
        >
          API Builder
        </NavItem>
        <NavItem
          componentClass={Link}
          href="/webconsole"
          to="/webconsole"
          active={window.location.hash === '#/webconsole'}
        >
          Web Console
        </NavItem>
        <NavDropdown
          title={this.props.connections[this.props.selected] && this.props.connections[this.props.selected].name}
          id="basic-nav-dropdown"
          onSelect={this.connectionSelectHandler}
          active={window.location.hash === '#/connections'}
        >
          {this.props.connections.map((connection, i) => (
            <MenuItem eventKey={connection.index} key={i}>{connection.name}</MenuItem>
          ))}
          <MenuItem divider />
          <MenuItem eventKey={-1}>Edit connections...</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

const mapStateToProps = state => ({
  mappings: state.resources.mappings,
  endpoints: state.resources.endpoints,
  resources: state.resources.resources,
  connections: state.connections.connections,
  selected: state.connections.selected  
});

export default withRouter(connect(mapStateToProps)(TopBar));
