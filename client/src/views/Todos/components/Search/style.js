import styled from "styled-components";

import { commonColors } from "~/styles/colors";
import { searchSizes } from "~/styles/sizes";
import { fontFamily } from "~/styles/common";

export const itemAnimationStyle = last => ({
  paddingBottom: last ? 0 : searchSizes.suggestionMargin
});

export const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0;
`;

export const ContentSearch = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-height: ${searchSizes.contentSearchMinHeight};
  margin: 0;
`;

export const ContentSelectedCategory = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
`;

export const ContentInput = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0;
`;

export const Input = styled.input`
  font-family: ${fontFamily};
  color: ${commonColors.textPrimary};
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  font-size: 2.8em;
  font-weight: 700;

  &::placeholder {
    color: ${commonColors.inputPlaceholder};
  }

  &:-ms-input-placeholder {
    color: ${commonColors.inputPlaceholder};
  }

  &::-ms-input-placeholder {
    color: ${commonColors.inputPlaceholder};
  }
`;

export const Suggestion = styled.div`
  position: relative;
`;

export const Suggestions = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: 0;
  padding: ${searchSizes.suggestionsPadding};
  background-color: ${commonColors.backgroundNight};
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.3);
  z-index: 1;

  &.empty {
    height: 0;
    visibility: hidden;
  }
`;

export const LabelSuggestion = styled.p`
  font-size: 1em;
  font-weight: 400;
  color: ${commonColors.textSecondary};
  cursor: pointer;
`;
