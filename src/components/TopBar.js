import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

const gateways = localStorage.getItem('gateways') || [];
const selectedGateway = localStorage.getItem('selectedGateway') || {};

const GatewayMenuItems = () => (
  gateways.map(gateway => (
    <MenuItem eventKey={gateway.name}>gateway.name</MenuItem>
  ))
);


const TopBar = props => {
  return props.links.map((link, index) =>
    // <span key={index}><Link to={link}>{link}</Link></span>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={'/'}>Fog Manager</Link>
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
          Web Console
        </NavItem>
        <NavDropdown eventKey={2} title={selectedGateway.name} id="basic-nav-dropdown">
          <GatewayMenuItems />
          <MenuItem divider />
          <MenuItem eventKey={3}>Connect to new gateway</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
};

export default TopBar;
