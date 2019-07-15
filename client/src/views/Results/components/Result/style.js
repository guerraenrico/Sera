import styled from "styled-components";

import { commonColors } from "~/styles/colors";
import { commonSizes, resultItemSize } from "~/styles/sizes";

export const Content = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${commonColors.background};
  box-sizing: border-box;
  border-radius: ${commonSizes.containerBorderRadius};
  transition: height 500ms ease-in;
  padding: ${resultItemSize.padding};

  &:nth-child(odd) {
    margin-right: ${commonSizes.containerMargin};
  }
`;

export const Title = styled.p`
  font-size: ${resultItemSize.title};
  color: ${commonColors.textSecondary};
  font-weight: 700;
  padding: 0;
  text-align: center;
  text-transform: uppercase;
  padding: ${resultItemSize.padding};
  margin-bottom: ${resultItemSize.innerMargin};
`;

export const ContainerStats = styled.div`
  position: relative;
  width: 100%;
`;

export const ContentChart = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ContentCaption = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const Caption = styled.div`
  background-image: linear-gradient(rgba(31, 34, 38, 0.7), rgba(31, 34, 38, 1));
  border-radius: 5rem;
  padding: ${resultItemSize.captionPadding};
`;

export const CaptionText = styled.p`
  color: #fff;
  font-size: ${resultItemSize.captionTextSize};
  font-weight: 700;
`;

export const SmallText = styled.span`
  color: #fff;
  font-size: ${resultItemSize.smallTextSize};
  font-weight: 700;
`;
