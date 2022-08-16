import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";
import { ROOT, RESET, VERIFY_EMAIL, WORK_LIST_NEW, SOLUTION_BUILDER_NEW, PERMISSION, PERMISSION_SETTING, SERVICE_NEW, LOGIN, PORTFOLIO_SUMMARY, ANALYTICS, WORK_LIST, REPORTS, PROFILE, DASHBOARD, PAGE1, AUTH_PAGE1, TEST_REACT_TABLE_NESTED, GUIDED_SOLUTION_BUILDER, PORTFOLIO_AND_BUILDER_NEW, SOLUTION_BUILDER_ANALYTICS, SOLUTION_BUILDER_SERVICE_PORTFOLIO, ACCOUNT, BULID_REPAIR_OPTION, RIPAIR_SEGMENT01_TRANSMISSION, RIPAIR_SEGMENT01_DISASSEMBLE, RIPAIR_OPTION01, RIPAIR_SERVICE_ESTIMATE, WITHOUTSPARE_REPAIR_OPTION, PART_LIST, REPAIR_PARTLIST, REPAIR_WITH_SPARE_PARTS, REPAIR_WITHOUT_SPARE_PARTS, REPAIR_STANDARD_JOBS, REPAIR_KITS, STANDARD_JOBS, KITS, } from "navigation/CONSTANTS";
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
import BulidRepairOptions from "pages/Repair/BulidRepairOptions";
import Segment01Transmission from "pages/Repair/Segment01Transmission";
import Segment01Disassemble from "pages/Repair/Segment01Disassemble";
import RepairOption01 from "pages/Repair/RepairOption01";
import RepairServiceEstimate from "pages/Repair/RepairServiceEstimate";
import WithoutSpareParts from "pages/Repair/WithoutSpareParts";
import PartList from "pages/Repair/PartList";
import { RepairPartlist } from "pages/Repair/RepairPartlist";
import { RepairWithSpareParts } from "pages/Repair/RepairWithSpareParts";
import { RepairWithoutSpareParts } from "pages/Repair/RepairWithoutSpareParts";
import { RepairStandardJobs } from "pages/Repair/RepairStandardJobs";
import { RepairKits } from "pages/Repair/RepairKits";
import StandardJobs from "pages/Repair/StandardJobs";
import Kits from "pages/Repair/Kits";
import { CommanComponents } from "../components/CommanComponents";
export const RouterConfig = () => {

  return (
    <div id="main-wrapper" className="show">
      <CommanComponents />
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
        <Route exact path={BULID_REPAIR_OPTION} component={BulidRepairOptions} />
        <Route exact path={RIPAIR_SEGMENT01_TRANSMISSION} component={Segment01Transmission} />
        <Route exact path={RIPAIR_SEGMENT01_DISASSEMBLE} component={Segment01Disassemble} />
        <Route exact path={RIPAIR_OPTION01} component={RepairOption01} />
        <Route exact path={RIPAIR_SERVICE_ESTIMATE} component={RepairServiceEstimate} />
        <Route exact path={WITHOUTSPARE_REPAIR_OPTION} component={WithoutSpareParts} />
        <Route exact path={PART_LIST} component={PartList} />
        <Route exact path={REPAIR_PARTLIST} component={RepairPartlist} />
        <Route exact path={REPAIR_WITH_SPARE_PARTS} component={RepairWithSpareParts} />
        <Route exact path={REPAIR_WITHOUT_SPARE_PARTS} component={RepairWithoutSpareParts} />
        <Route exact path={REPAIR_STANDARD_JOBS} component={RepairStandardJobs} />
        <Route exact path={REPAIR_KITS} component={RepairKits} />
        <Route exact path={STANDARD_JOBS} component={StandardJobs} />
        <Route exact path={KITS} component={Kits} />
        <Route exact path="/indexing" component={CommanComponents} />
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
