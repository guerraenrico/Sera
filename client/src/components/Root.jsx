import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Loadable from "react-loadable";

import ReplaceAnim from "./anims/ReplaceAnim";
import LoaderLinear from "./layout/LoaderLinear";
import LoaderTip from "./layout/LoaderTip";
import Drawer from "./layout/Drawer";
import Page404 from "./layout/Page404";
import * as paths from "../constants/paths";

const LoginContainer = Loadable({
  loader: () =>
    import("../containers/LoginContainer" /* webpackChunkName: 'login' */),
  loading: LoaderLinear
});

const TodosContainer = Loadable({
  loader: () =>
    import("../containers/TodosContainer" /* webpackChunkName: 'todos' */),
  loading: LoaderLinear
});

const GoalsContainer = Loadable({
  loader: () =>
    import("../containers/GoalsContainer" /* webpackChunkName: 'goals' */),
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

class Root extends Component {
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

  static getDerivedStateFromProps(props, state) {
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

  onAnimationEnd = (node, done) => {
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
        <div id="main-container">
          <div id="flex-container">
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
          </div>
        </div>
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

Root.propTypes = {
  initAuth: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetchingAuthentication: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default Root;
