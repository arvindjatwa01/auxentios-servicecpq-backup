import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";
import { ROOT, RESET, VERIFY_EMAIL, WORK_LIST_NEW, SOLUTION_BUILDER_NEW, PERMISSION, PERMISSION_SETTING, SERVICE_NEW, LOGIN, PORTFOLIO_SUMMARY, ANALYTICS, WORK_LIST, REPORTS, PROFILE, DASHBOARD, PAGE1, AUTH_PAGE1, TEST_REACT_TABLE_NESTED, GUIDED_SOLUTION_BUILDER, PORTFOLIO_AND_BUILDER_NEW, SOLUTION_BUILDER_ANALYTICS, SOLUTION_BUILDER_SERVICE_PORTFOLIO, ACCOUNT } from "navigation/CONSTANTS";
import { Analytics, ServicePortfolio, SolutionBuilderCreate } from "../pages/SolutionModules/index"
import { Profile } from '../pages/User/index'
import { CreatePortfolio, WorkList, CreateWorkList, PortfolioSummary } from "../pages/PortfolioAndBundle/index"
import { CreateService } from "../pages/Service/index"
import { ReactTableNested } from '../pages/Test/index'
import { AuthorizedPage1 } from "pages/AuthorizedPage1";
import {PrivateRoute} from "../components/Common";
import { Startup, ResetPassword } from './../pages/LoginSignUp/index'
import { GuidedSolution } from "pages/SolutionModules/GuidedSolution";
import { AnalyticsDashboard, ReportDashboard } from "../pages/Dashboard/index"
import { AccountActivated, Permissions, PermissionsSetting } from "../pages/Profile/index"
import { VerifyEmail } from "../pages/LoginSignUp/index"
import { Account } from "pages/User/Account";

export const RouterConfig = () => {

  return (
    <div id="main-wrapper" className="show">
      <Switch>
        {/* List all public routes here */}
        <Route exact path={LOGIN} component={Startup} />
        <Route exact path={VERIFY_EMAIL} component={VerifyEmail} />
        <Route exact path={ROOT} component={Dashboard} />
        <Route exact path={PERMISSION} component={Permissions} />
        <Route exact path={PERMISSION_SETTING} component={PermissionsSetting} />
        <Route exact path={WORK_LIST} component={WorkList} />
        <Route exact path={WORK_LIST_NEW} component={CreateWorkList} />
        <Route exact path={RESET} component={ResetPassword} />
        <Route exact path={ANALYTICS} component={AnalyticsDashboard} />
        <Route exact path={REPORTS} component={ReportDashboard} />
        <Route exact path={SOLUTION_BUILDER_ANALYTICS} component={Analytics} />
        <Route exact path={SOLUTION_BUILDER_NEW} component={SolutionBuilderCreate} />
        <Route exact path={PORTFOLIO_SUMMARY} component={PortfolioSummary} />
        <Route exact path={GUIDED_SOLUTION_BUILDER} component={GuidedSolution} />
        <Route exact path={PORTFOLIO_AND_BUILDER_NEW} component={CreatePortfolio} />
        <Route exact path={SERVICE_NEW} component={CreateService} />
        <Route exact path={TEST_REACT_TABLE_NESTED} component={ReactTableNested} />
        <Route exact path={SOLUTION_BUILDER_SERVICE_PORTFOLIO} component={ServicePortfolio} />
        <Route exact path={PROFILE} component={Profile} />
        <Route exact path={ACCOUNT} component={Account} />
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
