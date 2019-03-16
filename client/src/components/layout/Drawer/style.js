import styled from "styled-components";

import { NavLink as NavLinkBase } from "react-router-dom";
import { drawerColors } from "../../../styles/colors";
import { drawerSizes, commonSizes } from "../../../styles/sizes";
import { alignItemCenter } from "../../../styles/common";

export const DrawerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: ${drawerSizes.width};
  background-color: ${drawerColors.background};
  margin: 0 ${commonSizes.containerMargin} 0 0;
  -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

export const Drawer = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const itemStyle = `
  position: relative;
  width: ${drawerSizes.itemWidth};
  height: ${drawerSizes.itemHeight};
  color: ${drawerColors.itemIcon};
  text-decoration: none;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: background 200ms ease-in;
`;

export const NavLink = styled(NavLinkBase)`
  font-size: 1.4rem;
  ${itemStyle}

  &:hover {
    color: ${drawerColors.itemIconHover};
  }

  &.selected {
    color: ${drawerColors.itemIconSelected};
    background-color: ${drawerColors.itemSelectedBackground};
  }
`;

export const Space = styled.div`
  height: 100%;
`;

export const ButtonItem = styled.button`
  font-size: 1.4rem;
  ${alignItemCenter}
  ${itemStyle}

  &:hover {
    color: ${drawerColors.itemIconHover};
  }
`;
