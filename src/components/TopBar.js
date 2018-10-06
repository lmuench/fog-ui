import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import store from '../store';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: store.getState().connections.connections,
      selectedConnection: store.getState().connections.selected || 0
    };
  }

  selectHandler = eventKey => {
    if (eventKey === -1) {
      // TODO link to /connections
      return;
    }
    this.setState({
      selectedConnection: eventKey
    })
    store.dispatch({
      type: 'SELECT_CONNECTION',
      index: eventKey
    });
    localStorage.setItem(
      'selectedConnection',
      eventKey
    );
  }

  render = () => (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={'/'}>Fog Manager</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem
          componentClass={Link}
          href="/apibuilder"
          to="/apibuilder"
          active={window.location.hash === '#/apibuilder'}
        >
          API Builder
        </NavItem>
        <NavItem href="http://localhost:8080/system/console/bundles">
          Web Console
        </NavItem>
        <NavDropdown
          title={this.state.connections[this.state.selectedConnection].name}
          id="basic-nav-dropdown"
          onSelect={this.selectHandler}
        >
          {this.state.connections.map(connection => (
            <MenuItem eventKey={connection.index}>{connection.name}</MenuItem>
          ))}
          <MenuItem divider />
          <MenuItem eventKey={-1}>Add connection...</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default TopBar;
