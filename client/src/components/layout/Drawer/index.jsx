// @flow
import React from "react";
import type { Node } from "react";

import { menuItems } from "../../../constants/drawer";
import { DrawerContainer, Drawer, NavLink, ButtonItem, Space } from "./style";

type ItemProps = {
  exact?: boolean,
  pathTo: string,
  children: Node
};

const ItemComponent = ({ pathTo, exact, children }: ItemProps) => (
  <NavLink
    className="item align-items-center"
    to={pathTo}
    activeClassName="selected"
    exact={exact}
  >
    {children}
  </NavLink>
);

ItemComponent.defaultProps = {
  exact: false
};

type DrawerProps = {
  logout: () => void
};

const DrawerComponent = ({ logout }: DrawerProps) => (
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

export default DrawerComponent;
