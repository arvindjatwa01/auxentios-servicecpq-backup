import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";
import { ROOT, RESET, VERIFY_EMAIL, WORK_LIST_NEW, SOLUTION_BUILDER_NEW, PERMISSION, PERMISSION_SETTING, SERVICE_NEW, LANDING_PAGE_LOGIN, LOGIN, PORTFOLIO_SUMMARY, ANALYTICS, WORK_LIST, REPORTS, PROFILE, AUTH_PAGE1, GUIDED_SOLUTION_BUILDER, SOLUTION_TEMPLATES, PORTFOLIO_AND_BUILDER_NEW, SOLUTION_BUILDER_ANALYTICS, SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE, SOLUTION_BUILDER_SERVICE_PORTFOLIO, SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO, CREATED_CUSTOM_PORTFOLIO_DETAILS, SOLUTION_BUILDER_PORRTFOLIO_TEMP, SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT, RIPAIR_SERVICE_ESTIMATE, PART_LIST, REPAIR_PARTLIST, REPAIR_WITH_SPARE_PARTS, REPAIR_WITHOUT_SPARE_PARTS, WITH_SPARE_PARTS, REPAIR_KITS, WITHOUT_SPARE_PARTS_DETAILS, QUOTE_SPARE_PARTS, SPARE_PARTS_QUOTE_TEMPLATE, QUOTE_RECENT_REPAIR, QUOTE_REPAIR_SEARCH, TERMS_CONDITIONS, SOLUTION_QUOTE, SOLUTION_QUOTE_SEARCH, SOLUTION_QUOTE_CONFIG, SOLUTION_SERVICE_PORTFOLIO, SPARE_PARTS_QUOTE_DETAILS, QUOTE_SOLUTION_BUILDER, SOLUTION_SEARCH_TEMPLATE, KITS, COMMERCE_PAGE_OPEN, ADD_TO_CART, REVIEW_ORDER, COMMERCE_GUIDED, COMMERCE_GUIDED_QUESTIONS, SHOPPING_CART_LIST, QUOTE_SOLUTION_CONFIGURATION, PRICE_SETTING, COMMERCE_LANDING_PAGE, PRICE_CONFIGURATION, PRICE_GLOBAL_SETTING, PRICE_DETERMINATION, PRICE_MAINTENANCE, PRICE_COMPUTATION, STANDARD_JOB_DETAIL, QUOTE_REPAIR_CREATE, REPAIR_QUOTE_WITH_EVALUATION, TEMPLATE, QUOTE_SPARE_PARTS_SEARCH, QUOTE_SPARE_PART_CONFIGURATION, REPAIR_QUOTE_DETAILS, OVERVIEW, INSIGHTS, EQUIPMENT_MASTER, PARTS_360, FORGOT_PASSWORD, SERVICE_MASTER, CONSUMABLE_MASTER, CUSTOMER_MASTER, AUX_ADMIN_PROVISION, AUX_ADMIN_ACCOUNT, ACCOUNT_SETTINGs, ACCOUNT_CONFIGURATION, ACCOUNT_RENEWAL_BILLING, ACCOUNT_PACKAGES, ACCOUNT_SUPPORT, PLAN_ENTERPRISE, PLAN_MOMENTUM, PLAN_GROWTH, SOLUTION_QUOTE_CREATE } from "navigation/CONSTANTS";
import { Analytics, ServicePortfolio, SolutionBuilderCreate, CustomizedPortfolio, PortfolioTemplatesResult, CreatedCustomPortfolioTemplate, SolutionTemplateResult, CreateCustomPortfolio } from "../pages/SolutionModules/index"
import { Profile } from '../pages/User/index'
import { CreatePortfolio, PortfolioSummary } from "../pages/PortfolioAndBundle/index"
import { CreateService } from "../pages/Service/index"
import { AuthorizedPage1 } from "pages/AuthorizedPage1";
import { PrivateRoute } from "../components/Common";
import { Startup, ForgotPassword, VerifyEmail } from '../pages/LoginSignUp/index'
import { GuidedSolution } from "pages/SolutionModules/GuidedSolution";
import { AnalyticsDashboard, ReportDashboard } from "../pages/Dashboard/index"
import { Permissions, PermissionsSetting } from "../pages/Profile/index"
import { AccountSettings } from "pages/User/AccountSettings";
import RepairServiceEstimate from "pages/Repair/RepairServiceEstimate";
import PartList from "pages/Repair/PartList";
import { RepairPartlist } from "pages/Repair/RepairPartlist";
import { RepairWithSpareParts } from "pages/Repair/RepairWithSpareParts";
import { RepairWithoutSpareParts } from "pages/Repair/RepairWithoutSpareParts";
import { RepairKits } from "pages/Repair/RepairKits";
import Kits from "pages/Repair/Kits";
import { CommanComponents } from "../components/CommanComponents";
import WithSpareParts from "pages/Repair/WithSparePartsHeader";
import WithoutSparePartsHeader from "pages/Repair/WithoutSparePartsHeader";
import SolutionTemplates from "pages/SolutionModules/SolutionTemplates";
import RecentSparePartQuote from "pages/Repair/quote/RecentSparePartQuote";
import SearchSparePartQuote from "pages/Repair/quote/SearchSparePartQuote";
import RecentRepairQuote from "pages/Repair/quote/RecentRepairQuote";
import QuoteRepairSearch from "pages/Repair/quote/QuoteRepairSearch";
import { LandingPageLogin } from "pages/Dashboard/LandingPageLogin";
import SolutionQuote from "pages/SolutionModules/SolutionQuote";
import SolutionQuoteSearch from "pages/SolutionModules/SolutionQuoteSearch";
import SolutionQuoteConfiguration from "pages/SolutionModules/SolutionQuoteConfiguration";
import { SolutionServicePortfolio } from "pages/SolutionModules/SolutionServicePortfolio";
import { QuoteSolutionBuilder } from "pages/SolutionModules/QuoteSolutionBuilder";
import QuoteWithEvaluation from "pages/Repair/quote/QuoteWithEvaluation";
import RepairQuoteDetails from "pages/Repair/quote/RepairQuoteDetails";
import SolutionSearchTemplate from "pages/SolutionModules/SolutionSearchTemplate";
import ShoppingCartList from "pages/Dashboard/ShoppingCartList";
import QuoteSolutionConfiguration from "pages/SolutionModules/QuoteSolutionConfiguration ";
import PriceSetting from "pages/Price/PriceSetting";
import PriceConfiguration from "pages/Price/PriceConfiguration";
import PriceGlobalSetting from "pages/Price/PriceGlobalSetting";
import PriceDetermination from "pages/Price/PriceDetermination";
import PriceMaintenance from "pages/Price/PriceMaintenance";
import PriceComputation from "pages/Price/PriceComputation";
import { RepairServiceOnlyTemplate } from "pages/Repair/RepairServiceOnlyTemplate";
import ServiceOnlyTemplatesHeader from "pages/Repair/ServiceOnlyTemplatesHeader";
import { SparePartsQuoteDetails } from "pages/Repair/quote/SparePartsQuoteDetails";
import { CreateRepairQuote } from "pages/Repair/quote/CreateRepairQuote";
import { HomePage } from "pages/Dashboard/Home";
import Insights from "pages/Insights/Insights";
import EquipmentMaster from "pages/MasterData/EquipmentMaster";
import Parts360 from "pages/MasterData/Parts360";
import { ResetPassword } from "pages/LoginSignUp/ResetPassword";
import ServiceMaster from "pages/MasterData/ServiceMaster";
import ConsumableMaster from "pages/MasterData/ConsumableMaster";
import CustomerMaster from "pages/MasterData/CustomerMaster";
import { AuxAdmin } from "pages/User/AuxAccount";
import { TenantProvision } from "pages/User/TenantProvision";
import { AccountConfig } from "pages/User/AccountConfig";
import { AccountBilling } from "pages/User/Billing";
import { AccountPackage } from "pages/User/AccountPackage";
import { AccountSupport } from "pages/User/AccountSupport";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuidedSolutionQuote } from "pages/SolutionModules/GuidedSolutionQuote";
import { WorkList } from "pages/Dashboard/WorkList";
import { CreateWorkList } from "pages/Dashboard/CreateWorkList";
import SolutionAnalytics from "pages/SolutionModules/use-case-4/SolutionAnalytics";
import CustomPortfolioAddUpdate from "pages/SolutionModules/use-case-4/CustomPortfolioAddUpdate";
import CreatePartQuote from "pages/Repair/quote/CreateSparepartQuote";
import { CreateSolutionQuote } from "pages/SolutionModules/CreateSolutionQuote";


// alert(window.location.pathname)
export const RouterConfig = () => {
  const location = useLocation();

  return (
    <div id="main-wrapper" className="show">
      {(location.pathname === LOGIN) ? <></> : (location.pathname === RESET || location.pathname === FORGOT_PASSWORD) ? <></> : <><CommanComponents /></>}
      <Switch>
        {/* List all public routes here */}
        <Route exact path={AUX_ADMIN_PROVISION} component={TenantProvision} />
        <Route exact path={AUX_ADMIN_ACCOUNT} component={AuxAdmin} />
        <Route exact path={LOGIN} component={Startup} />
        <Route exact path={VERIFY_EMAIL} component={VerifyEmail} />
        <Route exact path={ROOT} component={HomePage} />

        {/* <Route exact path={PERMISSION} component={Permissions} /> */}
        {/* <Route exact path={PERMISSION_SETTING} component={PermissionsSetting} /> */}
        <Route exact path={WORK_LIST} component={WorkList} />
        <Route exact path={WORK_LIST_NEW} component={CreateWorkList} />
        <Route exact path={RESET} component={ResetPassword} />
        <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={ANALYTICS} component={AnalyticsDashboard} />
        <Route exact path={LANDING_PAGE_LOGIN} component={LandingPageLogin} />
        <Route exact path={SOLUTION_BUILDER_NEW} component={SolutionBuilderCreate} />
        <Route exact path={SOLUTION_TEMPLATES} component={SolutionTemplates} />
        <Route exact path={SERVICE_NEW} component={CreateService} />
        {/* <Route exact path={TEST_REACT_TABLE_NESTED} component={ReactTableNested} /> */}
        <Route exact path={SOLUTION_BUILDER_SERVICE_PORTFOLIO} component={ServicePortfolio} />
        <Route exact path={SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO} component={CustomizedPortfolio} />
        <Route exact path={SOLUTION_BUILDER_PORRTFOLIO_TEMP} component={PortfolioTemplatesResult} />
        <Route exact path={CREATED_CUSTOM_PORTFOLIO_DETAILS} component={CreatedCustomPortfolioTemplate} />
        <Route exact path={SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT} component={SolutionTemplateResult} />
        <Route exact path={PROFILE} component={Profile} />
        <Route exact path={ACCOUNT_SETTINGs} component={AccountSettings} />
        <Route exact path={ACCOUNT_CONFIGURATION} component={AccountConfig} />
        <Route exact path={ACCOUNT_RENEWAL_BILLING} component={AccountBilling} />
        <Route exact path={ACCOUNT_PACKAGES} component={AccountPackage} />
        <Route exact path={ACCOUNT_SUPPORT} component={AccountSupport} />
        <Route exact path={RIPAIR_SERVICE_ESTIMATE} component={RepairServiceEstimate} />
        {/* With Spare Parts Routes */}
        <Route exact path={REPAIR_WITH_SPARE_PARTS} component={RepairWithSpareParts} />
        <Route exact path={WITH_SPARE_PARTS} component={WithSpareParts} />
        {/* Without Spare Parts Routes */}
        <Route exact path={WITHOUT_SPARE_PARTS_DETAILS} component={WithoutSparePartsHeader} />
        <Route exact path={REPAIR_WITHOUT_SPARE_PARTS} component={RepairWithoutSpareParts} />

        <Route exact path={QUOTE_RECENT_REPAIR} component={RecentRepairQuote} />
        <Route exact path={QUOTE_REPAIR_SEARCH} component={QuoteRepairSearch} />
        <Route exact path={QUOTE_REPAIR_CREATE} component={CreateRepairQuote} />

        <Route exact path={QUOTE_SOLUTION_BUILDER} component={QuoteSolutionBuilder} />
        <Route exact path={REPAIR_QUOTE_WITH_EVALUATION} component={QuoteWithEvaluation} />
        <Route exact path={REPAIR_QUOTE_DETAILS} component={RepairQuoteDetails} />
        <Route exact path={SOLUTION_SEARCH_TEMPLATE} component={SolutionSearchTemplate} />
        <Route exact path={SHOPPING_CART_LIST} component={ShoppingCartList} />
        <Route exact path={PRICE_CONFIGURATION} component={PriceConfiguration} />
        <Route exact path={PRICE_GLOBAL_SETTING} component={PriceGlobalSetting} />
        <Route exact path={PRICE_DETERMINATION} component={PriceDetermination} />
        {/* Master Table Routes */}
        <Route exact path={EQUIPMENT_MASTER} component={EquipmentMaster} />
        <Route exact path={PARTS_360} component={Parts360} />
        <Route exact path={SERVICE_MASTER} component={ServiceMaster} />
        <Route exact path={CONSUMABLE_MASTER} component={ConsumableMaster} />
        <Route exact path={CUSTOMER_MASTER} component={CustomerMaster} />
        <Route exact path="/indexing" component={CommanComponents} />

        <ProtectedRoute path={INSIGHTS} component={Insights} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={OVERVIEW} component={Dashboard} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={REPORTS} component={ReportDashboard} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />

        {/* Part List Routes */}
        <ProtectedRoute path={PART_LIST} component={PartList} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={REPAIR_PARTLIST} component={RepairPartlist} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />

        {/* KIT Routes */}
        <ProtectedRoute path={KITS} component={Kits} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={REPAIR_KITS} component={RepairKits} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />

        {/* Standard Job Routes */}
        <ProtectedRoute path={STANDARD_JOB_DETAIL} component={ServiceOnlyTemplatesHeader} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={TEMPLATE} component={RepairServiceOnlyTemplate} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />

        {/* Spare Parts Quote Routes */}
        <ProtectedRoute path={SPARE_PARTS_QUOTE_DETAILS} component={SparePartsQuoteDetails} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={QUOTE_SPARE_PARTS_SEARCH} component={SearchSparePartQuote} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={QUOTE_SPARE_PART_CONFIGURATION} component={CreatePartQuote} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={QUOTE_SPARE_PARTS} component={RecentSparePartQuote} plans={[PLAN_GROWTH, PLAN_MOMENTUM, PLAN_ENTERPRISE]} />

        {/* Price Routes */}
        <ProtectedRoute path={PRICE_MAINTENANCE} component={PriceMaintenance} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={PRICE_COMPUTATION} component={PriceComputation} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={PRICE_SETTING} component={PriceSetting} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        {/* Portfolio Routes */}
        <ProtectedRoute path={PORTFOLIO_AND_BUILDER_NEW} component={CreatePortfolio} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={PORTFOLIO_SUMMARY} component={PortfolioSummary} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />

        {/* Solution Routes */}
        <ProtectedRoute path={SOLUTION_BUILDER_ANALYTICS} component={Analytics} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE} component={CreateCustomPortfolio} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        {/* <ProtectedRoute path={SOLUTION_BUILDER_ANALYTICS} component={SolutionAnalytics} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE} component={CustomPortfolioAddUpdate} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} /> */}

        {/* Solution Quote Routes */}
        <ProtectedRoute path={GUIDED_SOLUTION_BUILDER} component={GuidedSolution} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />

        <ProtectedRoute path={SOLUTION_QUOTE_CREATE} component={CreateSolutionQuote} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={SOLUTION_QUOTE_SEARCH} component={SolutionQuoteSearch} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={SOLUTION_QUOTE} component={SolutionQuote} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={QUOTE_SOLUTION_CONFIGURATION} component={QuoteSolutionConfiguration} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={SOLUTION_QUOTE_CONFIG} component={SolutionQuoteConfiguration} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />
        <ProtectedRoute path={SOLUTION_SERVICE_PORTFOLIO} component={SolutionServicePortfolio} plans={[PLAN_MOMENTUM, PLAN_ENTERPRISE]} />

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
