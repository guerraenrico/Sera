import styled from "styled-components";
import { contentApp } from "../../../styles/common";
import { page404Sizes } from "../../../styles/sizes";

export const ContentApp = styled.div`
  ${contentApp}
`;

export const Page404 = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
  font-weight: 300;
  font-size: ${page404Sizes.titleFontSize};
  color: #ffffff;
  text-align: center;
`;

export const Description = styled.p`
  font-weight: 500;
  font-size: ${page404Sizes.descriptionFontSize};
  text-align: center;
`;
