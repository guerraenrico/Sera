import styled from "styled-components";
import { loaderTipSizes } from "../../../styles/sizes";
import { commonColors } from "../../../styles/colors";

export const LoaderTip = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: ${commonColors.backgroundDark};
`;

export const H1 = styled.h1`
  max-width: 500px;
  text-align: center;
  font-size: ${loaderTipSizes.h1FontSize};
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 2rem;
`;

export const H3 = styled.h3`
  font-weight: 700;
  color: #ffffff;
  font-size: ${loaderTipSizes.h3FontSize};
`;
