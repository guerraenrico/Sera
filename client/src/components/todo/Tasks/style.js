import styled from "styled-components";

// import { commonColors } from "../../../styles/colors";
import { taskSizes } from "../../../styles/sizes";

export const itemAnimationStyle = last => ({
  paddingBottom: last ? 0 : taskSizes.itemMargin
});

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Container;
