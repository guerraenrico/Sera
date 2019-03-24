import styled from "styled-components";

import {} from "../../../styles/common";
import { commonColors } from "../../../styles/colors";
import { commonSizes } from "../../../styles/sizes";

export const Dialog = styled.div`
  height: calc(100vh - 2.5em * 2);
  width: 100%;
  margin: 2.5em 0;
  background-color: ${commonColors.backgroundNight};
  border-radius: ${commonSizes.containerBorderRadius};
  -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  text-align: right;
  display: block;
`;

export const Container = styled.div`
  position: relative;
  height: calc(100% - 200px);
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -ms-flex-line-pack: center;
  -webkit-align-content: center;
  align-content: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  flex-direction: column;
  opacity: 1;
`;
