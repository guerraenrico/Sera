import React from "react";
import PropTypes from "prop-types";

import { menuItems } from "~/constants/drawer";
import { DrawerContainer, Drawer, NavLink, ButtonItem, Space } from "./style";

const ItemComponent = ({ pathTo, exact, children }) => (
  <NavLink
    className="item align-items-center"
    to={pathTo}
    activeClassName="selected"
    exact={exact}
  >
    {children}
  </NavLink>
);

ItemComponent.propTypes = {
  exact: PropTypes.bool,
  pathTo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

ItemComponent.defaultProps = {
  exact: false
};

const DrawerComponent = ({ logout }) => (
  <DrawerContainer>
    <Drawer>
      {menuItems.map(item => (
        <ItemComponent key={item.id} pathTo={item.path} exact={item.exact}>
          <i className={item.iconClass} />
        </ItemComponent>
      ))}
      <Space />
      <ButtonItem onClick={logout}>
        <i className="icon-logout" />
      </ButtonItem>
    </Drawer>
  </DrawerContainer>
);

DrawerComponent.propTypes = {
  logout: PropTypes.func.isRequired
};

export default DrawerComponent;
