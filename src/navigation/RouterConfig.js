import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";
import { ROOT, DASHBOARD, PAGE1, AUTH_PAGE1, SOLUTION_BUILDER_ANALYTICS, SOLUTION_BUILDER_SERVICE_PORTFOLIO } from "navigation/CONSTANTS";
import { Analytics, ServicePortfolio } from "../pages/SolutionModules/index"
import { AuthorizedPage1 } from "pages/AuthorizedPage1";
import PrivateRoute from "./Auth/PrivateRoute";
import { Startup } from './../pages/LoginSignUp/index'

export const RouterConfig = () => {

  return (
    <div id="main-wrapper" className="show">
      <Switch>
        {/* List all public routes here */}
        {/* <Route exact path={ROOT} component={Home} /> */}
        <Route exact path={ROOT} component={Dashboard} />
        <Route exact path={SOLUTION_BUILDER_ANALYTICS} component={Analytics} />
        <Route exact path={SOLUTION_BUILDER_SERVICE_PORTFOLIO} component={ServicePortfolio} />
        {/* <Route exact path={PAGE1} component={Page1} /> */}
        <Route path="/gettingStart">
          <Startup />
        </Route>

        {/* List all private/auth routes here */}
        <PrivateRoute path={AUTH_PAGE1}>
          <AuthorizedPage1 />
        </PrivateRoute>
        {/* <PrivateRoute path={DASHBOARD}>
          <Dashboard />
        </PrivateRoute> */}

        {/* List a generic 404-Not Found route here */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};
