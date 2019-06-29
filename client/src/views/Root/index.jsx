// @flow

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Loadable from "react-loadable";
import { connect } from "react-redux";

import ReplaceAnim from "~/components/anims/ReplaceAnim";
import LoaderLinear from "~/components/layout/LoaderLinear";
import LoaderTip from "~/components/layout/LoaderTip";
import Drawer from "~/components/layout/Drawer";
import Page404 from "~/components/layout/Page404";
import * as paths from "~/constants/paths";

import * as authActions from "~/actions/authActions";
import * as authSelector from "~/selectors/authSelector";

import { Container, FlexContainer } from "./style";

const LoginContainer = Loadable({
  loader: () => import(/* webpackChunkName: 'login' */ "../Login"),
  loading: LoaderLinear
});

const TodosContainer = Loadable({
  loader: () => import(/* webpackChunkName: 'todos' */ "../Todos"),
  loading: LoaderLinear
});

const GoalsContainer = Loadable({
  loader: () => import(/* webpackChunkName: 'goals' */ "../Goals"),
  loading: LoaderLinear
});

const routes = [
  {
    key: 0,
    path: paths.LOGIN,
    Drawer: undefined,
    Main: LoginContainer,
    needAuth: false,
    redirectTo: paths.TODOS
  },
  {
    key: 1,
    path: paths.TODOS,
    Drawer,
    Main: TodosContainer,
    needAuth: true,
    redirectTo: paths.LOGIN
  },
  {
    key: 2,
    path: paths.GOALS,
    Drawer,
    Main: GoalsContainer,
    needAuth: true,
    redirectTo: paths.LOGIN
  },
  {
    key: 404,
    path: "/*",
    Drawer: undefined,
    Main: Page404,
    needAuth: false,
    redirectTo: paths.LOGIN
  }
];

type Props = {
  initAuth: () => void,
  isAuthenticated: boolean,
  // eslint-disable-next-line
  isFetchingAuthentication: boolean,
  logout: () => void
};

type State = {
  shouldShowLoading: boolean,
  showLoading: boolean,
  shouldShowRoute: boolean,
  showRoute: boolean
};

class Root extends Component<Props, State> {
  state = {
    shouldShowLoading: true,
    showLoading: true,
    shouldShowRoute: false,
    showRoute: false
  };

  componentDidMount() {
    const { initAuth } = this.props;
    initAuth();
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.isFetchingAuthentication && !state.showLoading) {
      return {
        ...state,
        shouldShowLoading: true,
        showLoading: true,
        shouldShowRoute: false,
        showRoute: false
      };
    }
    if (props.isAuthenticated && !state.showRoute) {
      return {
        ...state,
        shouldShowLoading: false,
        showLoading: false,
        shouldShowRoute: true,
        showRoute: false
      };
    }
    if (!props.isFetchingAuthentication && !props.isAuthenticated) {
      return {
        shouldShowLoading: false,
        showLoading: false,
        shouldShowRoute: false,
        showRoute: true
      };
    }
    return null;
  }

  onAnimationEnd = (node: Object, done: () => void) => {
    const handleAnimationEnd = () => {
      done();
      const { shouldShowLoading, shouldShowRoute } = this.state;
      if (shouldShowLoading) {
        this.setState({
          shouldShowLoading: false,
          showLoading: true,
          shouldShowRoute: false,
          showRoute: false
        });
      }
      if (shouldShowRoute) {
        this.setState({
          shouldShowLoading: false,
          showLoading: false,
          shouldShowRoute: false,
          showRoute: true
        });
      }
      node.removeEventListener("transitionend", handleAnimationEnd);
    };

    node.addEventListener("transitionend", handleAnimationEnd, false);
  };

  contentToRender = () => {
    const { isAuthenticated, logout } = this.props;
    const { showLoading, showRoute } = this.state;
    if (showLoading || !showRoute) {
      return (
        <LoaderTip
          phrase="Learn to work harder on yourself than you do on your job"
          author="Jim Rohn"
        />
      );
    }

    const nextPath = isAuthenticated ? paths.TODOS : paths.LOGIN;
    return (
      <Router>
        <Container>
          <FlexContainer>
            <Route exact path="/" render={() => <Redirect to={nextPath} />} />
            {routes.map(route => {
              if (route.Drawer !== undefined) {
                return (
                  <Route
                    key={route.key}
                    path={route.path}
                    exact
                    render={() => <route.Drawer logout={logout} />}
                  />
                );
              }
              return undefined;
            })}
            <Switch>
              {routes.map(route => (
                <Route
                  key={route.key}
                  path={route.path}
                  exact
                  render={() =>
                    isAuthenticated === route.needAuth ? (
                      <route.Main />
                    ) : (
                      <Redirect to={route.redirectTo} />
                    )
                  }
                />
              ))}
            </Switch>
          </FlexContainer>
        </Container>
      </Router>
    );
  };

  render() {
    const { showLoading, showRoute } = this.state;
    const duration = showRoute ? 250 : 1500;
    return (
      <ReplaceAnim
        in={showLoading || showRoute}
        endListener={this.onAnimationEnd}
        duration={duration}
      >
        {this.contentToRender()}
      </ReplaceAnim>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: authSelector.isAuthenticated(state),
  isFetchingAuthentication: authSelector.isFetchingAuthentication(state)
});

const mapDispatchToProps = dispatch => ({
  initAuth: () => {
    dispatch(authActions.initAuth());
  },
  logout: () => {
    dispatch(authActions.logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
