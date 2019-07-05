import styled from "styled-components";

import { commonColors } from "~/styles/colors";
import { taskSizes, commonSizes } from "~/styles/sizes";

export const Item = styled.div`
  position: relative;
  display: block;
  transition: height 500ms ease-in;
  padding-bottom: ${taskSizes.itemMargin};
`;

export const Content = styled.div`
  position: relative;
  display: block;
  background-color: ${commonColors.background};
  box-sizing: border-box;
  border-radius: ${commonSizes.containerBorderRadius};
  box-shadow: ${props =>
    props.isDragging ? "0 5px 20px rgba(0,0,0, 0.2)" : "none"};
  transition: height 500ms ease-in;
`;

export const Handle = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0.5rem;
`;

export const HandleIcon = styled.i`
  margin: auto;
  font-size: 1.2em;
  color: ${commonColors.iconButton};
  transition: color 200ms ease-in;
  padding: 0;

  ${Handle}:hover & {
    color: ${commonColors.iconButtonHover};
  }
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  padding: ${props => (props.paddingTop ? "30px" : "0")} 40px 15px 40px;
`;

export const Title = styled.p`
  flex-grow: 2;
  font-size: ${taskSizes.titleFontSize};
  color: ${commonColors.textSecondary};
  font-weight: 400;
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

export const ContentCategory = styled.div`
  padding: 0 10px 0 0;
`;

export const ContentDescription = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  background-color: ${commonColors.backgroundNight};
  border-bottom-right-radius: ${commonSizes.containerBorderRadius};
  border-bottom-left-radius: ${commonSizes.containerBorderRadius};
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

// Editable

export const ContentEditItem = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContentEditInputs = styled.div`
  flex: 1;
`;

export const ContentEditDate = styled.div`
  position: relative;
  padding: 0 40px 15px 40px;
`;

export const ContentEditDescription = styled.div`
  position: relative;
  padding: 0 40px 30px 40px;
`;

export const ContentEditActions = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 0 40px;
`;
