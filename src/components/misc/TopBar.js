import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = props => (
  props.items.map((item, index) =>
    <span key={index}><Link to={`/${props.path}/${item}`}>{item}</Link></span>
  )
);

export default TopBar;
