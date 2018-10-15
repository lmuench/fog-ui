import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

class TopBar extends Component {
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
        >
          {this.props.resources.map((resource, i) => (
            <MenuItem eventKey={resource.index} key={i}>{resource.name}</MenuItem>
          ))}
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
  resources: state.resources.resources,
  connections: state.connections.connections,
  selected: state.connections.selected  
});

export default withRouter(connect(mapStateToProps)(TopBar));
