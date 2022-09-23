import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";
import { ROOT, RESET, VERIFY_EMAIL, WORK_LIST_NEW, SOLUTION_BUILDER_NEW, PERMISSION, PERMISSION_SETTING, SERVICE_NEW, WITHOUT_REPAIR_OPTION01, LOGIN, PORTFOLIO_SUMMARY, ANALYTICS, WORK_LIST, REPORTS, PROFILE, DASHBOARD, PAGE1, AUTH_PAGE1, TEST_REACT_TABLE_NESTED, GUIDED_SOLUTION_BUILDER, SOLUTION_TEMPLATES, PORTFOLIO_AND_BUILDER_NEW, SOLUTION_BUILDER_ANALYTICS, SOLUTION_BUILDER_SERVICE_PORTFOLIO, SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO, SOLUTION_BUILDER_PORRTFOLIO_TEMP, ACCOUNT, BULID_REPAIR_OPTION, RIPAIR_SEGMENT01_TRANSMISSION, RIPAIR_SEGMENT01_DISASSEMBLE, RIPAIR_OPTION01, RIPAIR_SERVICE_ESTIMATE, WITHOUTSPARE_REPAIR_OPTION, PART_LIST, REPAIR_PARTLIST, REPAIR_WITH_SPARE_PARTS, REPAIR_WITHOUT_SPARE_PARTS, WITH_SPARE_PARTS, REPAIR_STANDARD_JOBS, REPAIR_KITS, ADD_PARTLIST, STANDARD_JOBS, WITHOUT_SPARE_PARTS_HEADER, QUOTE_SPARE_PARTS, QUOTE_SEARCH_QUOTE, QUOTE_CONFIGURATION, QUOTE_REPAIR_OPTION, QUOTE_REPAIR_QUOTE, QUOTE_REPAIR_SEARCH, QUOTE_REPAIR_CONFIGURATION, KITS, } from "navigation/CONSTANTS";
import { Analytics, ServicePortfolio, SolutionBuilderCreate, CustomizedPortfolio, PortfolioTemplatesResult } from "../pages/SolutionModules/index"
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
import AddPartlist from "pages/Repair/AddPartlist";
import WithSpareParts from "pages/Repair/WithSpareParts";
import WithoutSparePartsHeader from "pages/Repair/WithoutSparePartsHeader";
import WithoutRepairOption01 from "pages/Repair/WithoutRepairOption01";
import SolutionTemplates from "pages/SolutionModules/SolutionTemplates";
import QuoteSpareParts from "pages/SolutionModules/QuoteSpareParts";
import QuoteSearchQuote from "pages/SolutionModules/QuoteSearchQuote";
import QuoteConfiguration from "pages/SolutionModules/QuoteConfiguration";
import QuoteRepairOption from "pages/SolutionModules/QuoteRepairOption";
import QuoteRepairQuote from "pages/SolutionModules/QuoteRepairQuote";
import QuoteRepairSearch from "pages/SolutionModules/QuoteRepairSearch";
import QuoteRepairConfiguration from "pages/SolutionModules/QuoteRepairConfiguration";

// alert(window.location.pathname)
export const RouterConfig = () => {

  return (
    <div id="main-wrapper" className="show">
      {window.location.pathname !== LOGIN ? <><CommanComponents /></> : <></> }
      {/* <CommanComponents /> */}
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
        <Route exact path={SOLUTION_TEMPLATES} component={SolutionTemplates} />
        <Route exact path={PORTFOLIO_AND_BUILDER_NEW} component={CreatePortfolio} />
        <Route exact path={SERVICE_NEW} component={CreateService} />
        <Route exact path={TEST_REACT_TABLE_NESTED} component={ReactTableNested} />
        <Route exact path={SOLUTION_BUILDER_SERVICE_PORTFOLIO} component={ServicePortfolio} />
        <Route exact path={SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO} component={CustomizedPortfolio} />
        <Route exact path={SOLUTION_BUILDER_PORRTFOLIO_TEMP} component={PortfolioTemplatesResult} />
        <Route exact path={PROFILE} component={Profile} />
        <Route exact path={ACCOUNT} component={Account} />
        <Route exact path={RIPAIR_SEGMENT01_TRANSMISSION} component={Segment01Transmission} />
        <Route exact path={RIPAIR_SEGMENT01_DISASSEMBLE} component={Segment01Disassemble} />
        <Route exact path={RIPAIR_OPTION01} component={RepairOption01} />
        <Route exact path={WITHOUT_REPAIR_OPTION01} component={WithoutRepairOption01} />
        <Route exact path={RIPAIR_SERVICE_ESTIMATE} component={RepairServiceEstimate} />
        <Route exact path={WITHOUTSPARE_REPAIR_OPTION} component={WithoutSpareParts} />
        <Route exact path={WITH_SPARE_PARTS} component={WithSpareParts} />
        <Route exact path={PART_LIST} component={PartList} />
        <Route exact path={REPAIR_PARTLIST} component={RepairPartlist} />
        <Route exact path={WITHOUT_SPARE_PARTS_HEADER} component={WithoutSparePartsHeader} />
        <Route exact path={REPAIR_WITH_SPARE_PARTS} component={RepairWithSpareParts} />
        <Route exact path={REPAIR_WITHOUT_SPARE_PARTS} component={RepairWithoutSpareParts} />
        <Route exact path={REPAIR_STANDARD_JOBS} component={RepairStandardJobs} />
        <Route exact path={ADD_PARTLIST} component={AddPartlist} />
        <Route exact path={REPAIR_KITS} component={RepairKits} />
        <Route exact path={STANDARD_JOBS} component={StandardJobs} />
        <Route exact path={KITS} component={Kits} />
        <Route exact path={QUOTE_SPARE_PARTS} component={QuoteSpareParts} />
        <Route exact path={QUOTE_SEARCH_QUOTE} component={QuoteSearchQuote} />
        <Route exact path={QUOTE_CONFIGURATION} component={QuoteConfiguration} />
        <Route exact path={QUOTE_REPAIR_OPTION} component={QuoteRepairOption} />
        <Route exact path={QUOTE_REPAIR_QUOTE} component={QuoteRepairQuote} />
        <Route exact path={QUOTE_REPAIR_SEARCH} component={QuoteRepairSearch} />
        <Route exact path={QUOTE_REPAIR_CONFIGURATION} component={QuoteRepairConfiguration} />
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
