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
  position: fixed;
  top: 1rem;
  left: 1rem;
  padding: 1.2rem;
  width: 40rem;
  background-color: #b71c1c;
  margin-bottom: 8rem;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1.3rem;
  color: #fff;
`;

export const Description = styled.p`
  font-weight: 400;
  font-size: 1rem;
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

export const Label = styled.span`
  font-size: 1rem;
  color: ${commonColors.textSecondary};
`;

export const ContentButtonGuest = styled.div`
  margin: 3rem 0;
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
