import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

const TopBar = props => (
  props.links.map((link, index) =>
    // <span key={index}><Link to={link}>{link}</Link></span>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={'/'}>Fog Node</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem
          eventKey={1}
          componentClass={Link}
          href="/apibuilder"
          to="/apibuilder"
          active={window.location.hash === '#/apibuilder'}
        >
          API Builder
        </NavItem>
        <NavItem eventKey={2} href="http://localhost:8080/system/console/bundles">
          Felix Web Console
        </NavItem>
        <NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={2.1}>Action</MenuItem>
          <MenuItem eventKey={2.2}>Another action</MenuItem>
          <MenuItem eventKey={2.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={2.4}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
);

export default TopBar;
