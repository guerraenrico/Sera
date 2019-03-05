import styled from "styled-components";

import { snackbarColors, snackbarActionColors } from "../../../styles/colors";
import { snackbarSizes, snackbarActionSizes } from "../../../styles/sizes";

export const SnackbarContainer = styled.div`
  position: fixed;
  width: ${snackbarSizes.width};
  min-height: ${snackbarSizes.minHeight};
  margin: 30px;
`;

export const Snackbar = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  vertical-align: middle;
  background-color: $snackbar-background-color;
  padding: 15px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  z-index: $snackbar-z-index;
  box-sizing: border-box;

  &.snackbar.errorbackground-color: ${snackbarColors.errorBackground};
`;

export const Message = styled.span`
  width: 100%;
  font-weight: 400;
  font-size: ${snackbarSizes.messageFontSize};
  color: ${snackbarColors.messageText};
`;

export const Action = styled.button`
  background: none;
  background-color: ${snackbarActionColors.background};
  font-weight: 700;
  font-size: ${snackbarActionSizes.fontSize}
  color: ${snackbarActionColors.color};
  padding: 5px 10px;
  outline: none;
  border: none;
  cursor: pointer;
  align-self: center;
  justify-self: end;
  border-radius: 5px;
  box-sizing: border-box;
  transition: background 200ms ease-in;

  &:hover {
    background-color: ${snackbarActionColors.backgroundHover}
    color: ${snackbarActionColors.colorHover}
  }
`;
