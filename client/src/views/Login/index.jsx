// @flow

import React from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";

import Snackbar from "../../components/layout/Snackbar";
import Button from "../../components/layout/Button";
import { getCurrentBaseUrl } from "../../utils/Common";
import { SeraLogo } from "../../assets/Svgs";

import * as authActions from "../../actions/authActions";
import * as messageActions from "../../actions/messageActions";
import type { MessageState } from "../../reducers/message";

import {
  Container,
  LoginContainer,
  ContentDeclaration,
  Title,
  Description,
  ContentLogo,
  ButtonGoogleLogin,
  GoogleIcon,
  Label,
  ContentButtonGuest,
  ContentTip,
  Tip
} from "./style";

type Props = {
  message: MessageState,
  enterAsGuest: () => void,
  authenticateGoogleToken: string => void,
  hideMessage: () => void
};

const Login = ({
  message,
  enterAsGuest,
  authenticateGoogleToken,
  hideMessage
}: Props) => {
  const responseGoogle = response => {
    if (response.code !== undefined) {
      authenticateGoogleToken(response.code);
    }
  };
  return (
    <Container>
      <ContentDeclaration>
        <Title>This is an Experimental App</Title>
        <Description>
          Dont use to store your confidential data. This app is Highly
          experimental and has been created only for my personal test. Entering
          as a guest will not save any information (all data will be lost if you
          refresh this page or close your browser) and some feature may not be
          available
        </Description>
      </ContentDeclaration>
      <LoginContainer>
        <ContentLogo>{SeraLogo}</ContentLogo>
        <GoogleLogin
          clientId="489823671693-0vvlltnvkavfa37o2jl123jb57ulcphu.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          accessType="offline"
          responseType="code"
          redirectUri={getCurrentBaseUrl}
          render={renderProps => (
            <ButtonGoogleLogin onClick={renderProps.onClick}>
              <GoogleIcon className="icon-google-g">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
                <span className="path4" />
              </GoogleIcon>
              <span>Log in with Google</span>
            </ButtonGoogleLogin>
          )}
        />
        <Label>or</Label>
        <ContentButtonGuest>
          <Button onClick={() => enterAsGuest()}>Enter as Guest</Button>
        </ContentButtonGuest>
        <ContentTip>
          <Tip>“Don’t wish it was easier wish you were better”</Tip>
        </ContentTip>
      </LoginContainer>
      <Snackbar
        show={message.show}
        isError={message.isError}
        message={message.text}
        onClose={() => hideMessage()}
      />
    </Container>
  );
};

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  enterAsGuest: () => {
    dispatch(authActions.enterAsGuest());
  },
  authenticateGoogleToken: (idToken: string) => {
    dispatch(authActions.authenticateGoogleToken(idToken));
  },
  hideMessage: () => {
    dispatch(messageActions.hideMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
