import styled from "styled-components";

import { commonColors } from "../../../styles/colors";
import { taskSizes, commonSizes } from "../../../styles/sizes";

export const Item = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  background-color: ${commonColors.background};
  box-sizing: border-box;
  -webkit-border-radius: ${commonSizes.containerBorderRadius};
  border-radius: ${commonSizes.containerBorderRadius};
  overflow: hidden;
  transition: height 500ms ease-in;
`;

// padding-bottom: ${props => (props.last ? 0 : taskSizes.itemMargin)};

export const Header = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  padding: 30px 40px 15px 40px;
`;

export const Title = styled.p`
  flex-grow: 2;
  font-size: ${taskSizes.titleFontSize};
  color: ${commonColors.textSecondary};
  font-weight: 300;
  padding: 0;
  cursor: pointer;
  align-self: center;

  &:hover {
    color: ${commonColors.textPrimary};
  }

  ${Item}.completed & {
    text-decoration: line-through;
    color: ${commonColors.textThird};
  }

  ${Item}.completed &:hover {
    color: ${commonColors.textSecondary};
  }
`;

export const ContentDate = styled.div`
  position: relative;
  padding: 0 40px 30px 40px;
`;

export const Date = styled.p`
  font-size: ${taskSizes.dateFontSize};
  font-weight: 400;
  padding: 0;

  &.complete {
    color: ${commonColors.textThird};
  }

  &.complete-within {
    color: ${commonColors.textSecondary};
  }
`;

export const ContentCategories = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 40px 30px 40px;
`;

export const ContentDescription = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  background-color: ${commonColors.backgroundNight};
`;

export const Description = styled.p`
  font-size: ${taskSizes.descriptionFontSize};
  color: ${commonColors.textSecondary};
  font-weight: 300;
  padding: 40px 55px;
  line-height: 1.5rem;

  &.empty {
    font-style: italic;
  }
`;
