import styled from "styled-components";

import { mainContainer, mainButton } from "../../styles/common";
import { commonColors } from "../../styles/colors";

export const Container = styled.div`
  ${mainContainer}
`;

export const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const ContentDeclaration = styled.div`
  margin-bottom: 8rem;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1.5rem;
  color: #c74747;
  text-align: center;
`;

export const Description = styled.p`
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  color: ${commonColors.textPrimary};
`;

export const ContentLogo = styled.div`
  margin-bottom: 6rem;
`;

export const ButtonGoogleLogin = styled.button`
  ${mainButton}
  display: flex;
  align-items: center;
  background-color: #ffffff;
  font-size: 1rem;
  color: #4086f4;
  border: 1px solid #ffffff;
  margin: 3rem 0;

  &:hover {
    border: 1px solid #4086f4;
  }
`;

export const GoogleIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 0.8rem;
`;

export const ContentTip = styled.div`
  margin: 3rem 0;
`;

export const Tip = styled.h2`
  color: ${commonColors.textSecondary};
  width: 200px;
  font-size: 1rem;
  text-align: center;
  color: ${commonColors.textThird};
`;
