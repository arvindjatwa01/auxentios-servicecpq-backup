import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";

// import { ROOT, RESET, VERIFY_EMAIL, WORK_LIST_NEW, SOLUTION_BUILDER_NEW, PERMISSION, PERMISSION_SETTING, SERVICE_NEW, WITHOUT_REPAIR_OPTION01, LANDING_PAGE_LOGIN, LOGIN, PORTFOLIO_SUMMARY, ANALYTICS, WORK_LIST, REPORTS, PROFILE, DASHBOARD, PAGE1, AUTH_PAGE1, TEST_REACT_TABLE_NESTED, GUIDED_SOLUTION_BUILDER, SOLUTION_TEMPLATES, PORTFOLIO_AND_BUILDER_NEW, SOLUTION_BUILDER_ANALYTICS, SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE, SOLUTION_BUILDER_SERVICE_PORTFOLIO, SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO, SOLUTION_BUILDER_PORRTFOLIO_TEMP,SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT, ACCOUNT, BULID_REPAIR_OPTION, RIPAIR_SEGMENT01_TRANSMISSION, RIPAIR_SEGMENT01_DISASSEMBLE, RIPAIR_OPTION01, RIPAIR_SERVICE_ESTIMATE, WITHOUTSPARE_REPAIR_OPTION, PART_LIST, REPAIR_PARTLIST, REPAIR_WITH_SPARE_PARTS, REPAIR_WITHOUT_SPARE_PARTS, WITH_SPARE_PARTS, REPAIR_STANDARD_JOBS, REPAIR_KITS, ADD_PARTLIST, STANDARD_JOBS, WITHOUT_SPARE_PARTS_DETAILS, QUOTE_SPARE_PARTS, QUOTE_SEARCH_QUOTE, QUOTE_CONFIGURATION, QUOTE_REPAIR_OPTION, SPARE_PARTS_QUOTE_TEMPLATE, QUOTE_REPAIR_QUOTE, QUOTE_REPAIR_SEARCH, QUOTE_REPAIR_CONFIGURATION, SPARE_PARTS_QUOTE_REVIEWED, TERMS_CONDITIONS, REPAIR_QUOTE_CONFIGURATION, SOLUTION_QUOTE, SOLUTION_QUOTE_SEARCH, SOLUTION_QUOTE_CONFIG, SOLUTION_SERVICE_PORTFOLIO, KITS, } from "navigation/CONSTANTS";
// import { Analytics, ServicePortfolio, SolutionBuilderCreate, CustomizedPortfolio, PortfolioTemplatesResult, SolutionTemplateResult,CreateCustomPortfolio } from "../pages/SolutionModules/index"

// import { ROOT, HOME, RESET, VERIFY_EMAIL, WORK_LIST_NEW, SOLUTION_BUILDER_NEW, PERMISSION, PERMISSION_SETTING, SERVICE_NEW, WITHOUT_REPAIR_OPTION01, LANDING_PAGE_LOGIN, LOGIN, PORTFOLIO_SUMMARY, ANALYTICS, WORK_LIST, REPORTS, PROFILE, DASHBOARD, PAGE1, AUTH_PAGE1, TEST_REACT_TABLE_NESTED, GUIDED_SOLUTION_BUILDER, SOLUTION_TEMPLATES, PORTFOLIO_AND_BUILDER_NEW, SOLUTION_BUILDER_ANALYTICS, SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE, SOLUTION_BUILDER_SERVICE_PORTFOLIO, SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO, SOLUTION_BUILDER_PORRTFOLIO_TEMP, SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT, ACCOUNT, BULID_REPAIR_OPTION, RIPAIR_SEGMENT01_TRANSMISSION, RIPAIR_SEGMENT01_DISASSEMBLE, RIPAIR_OPTION01, RIPAIR_SERVICE_ESTIMATE, WITHOUTSPARE_REPAIR_OPTION, PART_LIST, REPAIR_PARTLIST, REPAIR_WITH_SPARE_PARTS, REPAIR_WITHOUT_SPARE_PARTS, WITH_SPARE_PARTS, REPAIR_STANDARD_JOBS, REPAIR_KITS, ADD_PARTLIST, STANDARD_JOBS, WITHOUT_SPARE_PARTS_DETAILS, QUOTE_SPARE_PARTS, QUOTE_SEARCH_QUOTE, QUOTE_CONFIGURATION, QUOTE_REPAIR_OPTION, SPARE_PARTS_QUOTE_TEMPLATE, QUOTE_REPAIR_QUOTE, QUOTE_REPAIR_SEARCH, QUOTE_REPAIR_CONFIGURATION, SPARE_PARTS_QUOTE_REVIEWED, TERMS_CONDITIONS, REPAIR_QUOTE_CONFIGURATION, SOLUTION_QUOTE, SOLUTION_QUOTE_SEARCH, SOLUTION_QUOTE_CONFIG, SOLUTION_SERVICE_PORTFOLIO, QUOTE_SOLUTION_BUILDER, QUOTE_WITH_EVALUATION, REPAIR_BUILDER_REPAIR_OPTION, SOLUTION_SEARCH_TEMPLATE, COMMERCE_LANDING_PAGE, COMMERCE_PAGE_OPEN, REVIEW_ORDER, ADD_TO_CART, COMMERCE_GUIDED, COMMERCE_GUIDED_QUESTIONS, SHOPPING_CART_LIST, COMMERCE_PROFILE, KITS, } from "navigation/CONSTANTS";
import { ROOT, HOME, RESET, VERIFY_EMAIL, WORK_LIST_NEW, SOLUTION_BUILDER_NEW, PERMISSION, PERMISSION_SETTING, SERVICE_NEW, WITHOUT_REPAIR_OPTION01, LANDING_PAGE_LOGIN, LOGIN, PORTFOLIO_SUMMARY, ANALYTICS, WORK_LIST, REPORTS, PROFILE, DASHBOARD, PAGE1, AUTH_PAGE1, TEST_REACT_TABLE_NESTED, GUIDED_SOLUTION_BUILDER, SOLUTION_TEMPLATES, PORTFOLIO_AND_BUILDER_NEW, SOLUTION_BUILDER_ANALYTICS, SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE, SOLUTION_BUILDER_SERVICE_PORTFOLIO, SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO, SOLUTION_BUILDER_PORRTFOLIO_TEMP, SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT, ACCOUNT, BULID_REPAIR_OPTION, RIPAIR_SEGMENT01_TRANSMISSION, RIPAIR_SEGMENT01_DISASSEMBLE, RIPAIR_OPTION01, RIPAIR_SERVICE_ESTIMATE, WITHOUTSPARE_REPAIR_OPTION, PART_LIST, REPAIR_PARTLIST, REPAIR_WITH_SPARE_PARTS, REPAIR_WITHOUT_SPARE_PARTS, WITH_SPARE_PARTS, REPAIR_STANDARD_JOBS, REPAIR_KITS, ADD_PARTLIST, STANDARD_JOBS, WITHOUT_SPARE_PARTS_DETAILS, QUOTE_SPARE_PARTS, QUOTE_SEARCH_QUOTE, QUOTE_CONFIGURATION, QUOTE_REPAIR_OPTION, SPARE_PARTS_QUOTE_TEMPLATE, QUOTE_REPAIR_QUOTE, QUOTE_REPAIR_SEARCH, QUOTE_REPAIR_CONFIGURATION, SPARE_PARTS_QUOTE_REVIEWED, TERMS_CONDITIONS, REPAIR_QUOTE_CONFIGURATION, SOLUTION_QUOTE, SOLUTION_QUOTE_SEARCH, SOLUTION_QUOTE_CONFIG, SOLUTION_SERVICE_PORTFOLIO, QUOTE_SOLUTION_BUILDER, QUOTE_WITH_EVALUATION, REPAIR_BUILDER_REPAIR_OPTION, SOLUTION_SEARCH_TEMPLATE, KITS, COMMERCE_PAGE_OPEN, ADD_TO_CART, REVIEW_ORDER, COMMERCE_GUIDED, COMMERCE_GUIDED_QUESTIONS, SHOPPING_CART_LIST, COMMERCE_PROFILE, COMMERCE_LANDING_PAGE } from "navigation/CONSTANTS";

import { Analytics, ServicePortfolio, SolutionBuilderCreate, CustomizedPortfolio, PortfolioTemplatesResult, SolutionTemplateResult, CreateCustomPortfolio } from "../pages/SolutionModules/index"

import { Profile } from '../pages/User/index'
import { CreatePortfolio, WorkList, CreateWorkList, PortfolioSummary } from "../pages/PortfolioAndBundle/index"
import { CreateService } from "../pages/Service/index"
import { ReactTableNested } from '../pages/Test/index'
import { AuthorizedPage1 } from "pages/AuthorizedPage1";
import { PrivateRoute } from "../components/Common";
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
import { LandingPageLogin } from "pages/Dashboard/LandingPageLogin";
import SparePartsQuoteTemplate from "pages/SolutionModules/SparePartsQuoteTemplate";
import SparePartsQuoteReviewed from "pages/SolutionModules/SparePartsQuoteReviewed";
import TermsConditions from "pages/SolutionModules/TermsConditions";
import RepairQuoteConfiguration from "pages/SolutionModules/RepairQuoteConfiguration";
import SolutionQuote from "pages/SolutionModules/SolutionQuote";
import SolutionQuoteSearch from "pages/SolutionModules/SolutionQuoteSearch";
import SolutionQuoteConfiguration from "pages/SolutionModules/SolutionQuoteConfiguration";
import { SolutionServicePortfolio } from "pages/SolutionModules/SolutionServicePortfolio";
import { QuoteSolutionBuilder } from "pages/SolutionModules/QuoteSolutionBuilder";
import QuoteWithEvaluation from "pages/SolutionModules/QuoteWithEvaluation";
import RepairBuilderRepairOption from "pages/SolutionModules/RepairBuilderRepairOption";
import SolutionSearchTemplate from "pages/SolutionModules/SolutionSearchTemplate";
import { CommerceLandingPage } from "pages/Dashboard/CommerceLandingPage";
import CommercePageQuestion from "pages/Dashboard/CommercePageOpen";
import AddToCart from "pages/Dashboard/AddToCart";
import ReviewOrder from "pages/Dashboard/ReviewOrder";
import CommerceGuided from "pages/Dashboard/CommerceGuided";
import CommerceGuidedQuestions from "pages/Dashboard/CommerceGuidedQuestions";
import ShoppingCartList from "pages/Dashboard/ShoppingCartList";
import { CommerceProfile } from "pages/Dashboard/CommerceProfile";


// alert(window.location.pathname)
export const RouterConfig = () => {
  const location = useLocation();


  return (
    <div id="main-wrapper" className="show">
      {(location.pathname === LOGIN) ? <></> : (location.pathname === RESET) ? <></> : <><CommanComponents /></>}
      {/* {console.log("Location is : ", location.pathname)} */}
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
        <Route exact path={LANDING_PAGE_LOGIN} component={LandingPageLogin} />
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
        <Route exact path={SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE} component={CreateCustomPortfolio} />
        <Route exact path={SOLUTION_BUILDER_PORRTFOLIO_TEMP} component={PortfolioTemplatesResult} />
        <Route exact path={SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT} component={SolutionTemplateResult} />
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
        <Route exact path={WITHOUT_SPARE_PARTS_DETAILS} component={WithoutSparePartsHeader} />
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
        <Route exact path={SPARE_PARTS_QUOTE_TEMPLATE} component={SparePartsQuoteTemplate} />
        <Route exact path={SPARE_PARTS_QUOTE_REVIEWED} component={SparePartsQuoteReviewed} />
        <Route exact path={QUOTE_REPAIR_CONFIGURATION} component={QuoteRepairConfiguration} />
        <Route exact path={TERMS_CONDITIONS} component={TermsConditions} />
        <Route exact path={REPAIR_QUOTE_CONFIGURATION} component={RepairQuoteConfiguration} />
        <Route exact path={SOLUTION_QUOTE} component={SolutionQuote} />
        <Route exact path={SOLUTION_QUOTE_SEARCH} component={SolutionQuoteSearch} />
        <Route exact path={SOLUTION_QUOTE_CONFIG} component={SolutionQuoteConfiguration} />
        <Route exact path={SOLUTION_SERVICE_PORTFOLIO} component={SolutionServicePortfolio} />
        <Route exact path={QUOTE_SOLUTION_BUILDER} component={QuoteSolutionBuilder} />
        <Route exact path={QUOTE_WITH_EVALUATION} component={QuoteWithEvaluation} />
        <Route exact path={REPAIR_BUILDER_REPAIR_OPTION} component={RepairBuilderRepairOption} />
        <Route exact path={SOLUTION_SEARCH_TEMPLATE} component={SolutionSearchTemplate} />
        <Route exact path={COMMERCE_LANDING_PAGE} component={CommerceLandingPage} />
        <Route exact path={COMMERCE_PAGE_OPEN} component={CommercePageQuestion} />
        <Route exact path={ADD_TO_CART} component={AddToCart} />
        <Route exact path={REVIEW_ORDER} component={ReviewOrder} />
        <Route exact path={COMMERCE_GUIDED} component={CommerceGuided} />
        <Route exact path={COMMERCE_GUIDED_QUESTIONS} component={CommerceGuidedQuestions} />
        <Route exact path={SHOPPING_CART_LIST} component={ShoppingCartList} />
        <Route exact path={COMMERCE_PROFILE} component={CommerceProfile} />
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
