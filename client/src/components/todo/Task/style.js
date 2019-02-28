import styled from "styled-components";

import { commonColors } from "../../../styles/colors";
import { taskSizes } from "../../../styles/sizes";

export const Item = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
`;

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

export const ContentDescription = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  background-color: ${commonColors.backgroundNight};
`;

export const Description = styled.p`
  font-size: ${taskSizes.descriptionFontSize};
  color: ${commonColors.textSecondary}
  font-weight: 300;
  padding: 40px 55px;
  line-height: 1.5rem;

  &.empty {
    font-style: italic;
  }
`;
