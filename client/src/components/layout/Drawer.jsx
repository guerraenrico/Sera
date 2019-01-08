import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { menuItems } from '../../constants/drawer';

const Item = ({ pathTo, exact, children }) => (
  <NavLink
    className="item align-items-center"
    to={pathTo}
    activeClassName="selected"
    {...exact}
  >
    {children}
  </NavLink>
);

Item.propTypes = {
  exact: PropTypes.bool,
  pathTo: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

Item.defaultProps = {
  exact: false,
};


const Drawer = ({ logout }) => (
  <div id="drawer-container">
    <div id="drawer-fixed">
      {
        menuItems.map(item => (
          <Item
            key={item.id}
            pathTo={item.path}
            exact={item.exact}
          >
            <i className={item.iconClass} />
          </Item>
        ))
      }
      <div className="space" />
      <button
        onClick={logout}
        className="item align-items-center"
      >
        <i className="icon-logout" />
      </button>
    </div>
  </div>
);

Drawer.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Drawer;
