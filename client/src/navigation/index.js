import Loadable from "react-loadable";

import LoaderLinear from "~/components/LoaderLinear";
import Drawer from "~/components/Drawer";
import Page404 from "~/views/Page404";

import * as paths from "~/constants/paths";

const LoginContainer = Loadable({
  loader: () => import(/* webpackChunkName: 'login' */ "~/views/Login"),
  loading: LoaderLinear
});

const TodosContainer = Loadable({
  loader: () => import(/* webpackChunkName: 'todos' */ "~/views/Todos"),
  loading: LoaderLinear
});

const GoalsContainer = Loadable({
  loader: () => import(/* webpackChunkName: 'goals' */ "~/views/Goals"),
  loading: LoaderLinear
});

const ResultsContainer = Loadable({
  loader: () => import(/* webpackChunkName: 'results' */ "~/views/Results"),
  loading: LoaderLinear
});

export const routes = [
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
    key: 3,
    path: paths.RESULTS,
    Drawer,
    Main: ResultsContainer,
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

export default routes;
