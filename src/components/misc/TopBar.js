import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = props => (
  props.links.map((link, index) =>
    <span key={index}><Link to={link}>{link}</Link></span>
  )
);

export default TopBar;
