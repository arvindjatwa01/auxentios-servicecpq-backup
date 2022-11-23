/**
 * All API urls and other constants will reside here.
 * It is always a good idea to keep a local copy of all API response to
 * keep your app working for UI changes and
 * make it independent of network requirements.
 *
 * They need to be categorised and grouped together as:
 *  - Actual endpoints url.
 *  - Local data .json file path.
 * At a moment only one group should be uncommented.
 *
 * Other way to deal with this is to name every json file as per your service endpoint and use a basepath variable.
 * Toggle this basePath variable between "actual-domain.com/" or "/data/".
 */

// const SOLUTION_BASE_URL = "http://13.58.83.209:8080/";
const PRICING_BASE_URL = "http://35.200.157.237/";
const SOLUTION_BASE_URL = "http://35.200.157.237/";
const USER_SERVICE_BASE_URL = "http://35.200.157.237/";
const DATA_SERVICE_BASE_URL = "http://35.200.157.237/";

const PRICING_URI = PRICING_BASE_URL + "pricing-svc/v1/";
const SOLUTION_BUILDER_URI = SOLUTION_BASE_URL + "solution-builder-svc/v1/";
const USER_SERVICE_URI = USER_SERVICE_BASE_URL + "user-svc/v1/user/";
const SEARCH_COVERAGE = DATA_SERVICE_BASE_URL + "data-svc/api/v1/coverage/"
const DATA_SERVICE_URI = DATA_SERVICE_BASE_URL + "data-svc/api/v1/";
const REPAIR_BUILDER_URI = "http://35.200.157.237/repair-builder-svc/v1/";

// search for coverage

export const GET_SEARCH_COVERAGE=SEARCH_COVERAGE+"search?search="
export const GET_SEARCH_FAMILY_COVERAGE=SEARCH_COVERAGE
// Local endpoints. Uncomment below section to use dummy local data.
export const GET_ALL_USERS = () => `/data/users`;
export const GET_USER_DETAILS = (id) => `/data/user`;

//Pricing URLS
export const PRICING_COMMON_CONFIG = PRICING_URI + "common-config/";

//Soltion Builder URLS
export const GET_ALL_SOLUTION_PORTFOLIOS = () =>
SOLUTION_BUILDER_URI + `portfolio?orderBY=ASC`;
// export const SOLUTION_BUILDER_PRICE_CONFIG = PRICING_URI + "common-config/";

//User Service
export const USER_SERVICE_SIGNUP_URL = () => USER_SERVICE_URI + "signup";
export const USER_SERVICE_SIGNIN_URL = () => USER_SERVICE_URI + "root-login";

//Service Portfolio

export const PORTFOLIO_URL = () => SOLUTION_BUILDER_URI + "portfolio";
export const PORTFOLIO_SEARCH_URL = SOLUTION_BUILDER_URI + "portfolio/search?search=";

export const Common_SOLUTION_BUILDER_URL = () =>
  SOLUTION_BUILDER_URI + "common-config";
export const COVERAGE_REST = () => SOLUTION_BUILDER_URI + "coverage";
export const CUSTOM_COVERAGE_REST = () => SOLUTION_BUILDER_URI + "coverage/custom";

export const GET_STRATEGY_TASK = () =>
  SOLUTION_BUILDER_URI + "common-config/strategy-task";
export const GET_TASK_TYPE = () =>
  SOLUTION_BUILDER_URI + "common-config/task-type";
export const GET_CATEGORY_USAGE = () =>
  SOLUTION_BUILDER_URI + "common-config/usage-category";
export const GET_RESPONSE_TIME = () =>
  SOLUTION_BUILDER_URI + "common-config/response-time";
export const GET_PRODUCT_HIERARCHY = () =>
  SOLUTION_BUILDER_URI + "common-config/product-hierarchy";
export const GET_GEOGRAPHIC = () =>
  SOLUTION_BUILDER_URI + "common-config/geographic";

export const CREATE_PORTFOLIO_ITEM = () => SOLUTION_BUILDER_URI + "item";
export const PORTFOLIO_ITEM_PRICE_RKID = () => CREATE_PORTFOLIO_ITEM() + "/get-RB-price-update-item-rkid";
export const PORTFOLIO_ITEM_PRICE_SJID = () => CREATE_PORTFOLIO_ITEM() + "/get-RB-price-update-item-sjid";
export const PORTFOLIO_ITEM_SEARCH = () => CREATE_PORTFOLIO_ITEM()+ "/search?search=";
export const PORTFOLIO_ITEM_PRICE_BY_ITEM_ID = () => CREATE_PORTFOLIO_ITEM()+ "/price";

// Custom Portfolio 

export const CUSTOM_PORTFOLIO_URL = () => SOLUTION_BUILDER_URI + "portfolio/custom";
export const CUSTOM_PORTFOLIO_SEARCH_QUERY = SOLUTION_BUILDER_URI +"portfolio/custom/search?search=";

// Custom Portfolio Item
export const CREATE_CUSTOM_PORTFOLIO_ITEM = () => SOLUTION_BUILDER_URI + "item/custom";
export const CUSTOM_PORTFOLIO_ITEM_PRICE_RKID = () => CREATE_CUSTOM_PORTFOLIO_ITEM() + "/get-RB-price-update-item-rkid";
export const CUSTOM_PORTFOLIO_ITEM_PRICE_SJID = () => CREATE_CUSTOM_PORTFOLIO_ITEM() + "/get-RB-price-update-item-sjid";
export const CREATE_CUSTOM_PRICE = () => CREATE_CUSTOM_PORTFOLIO_ITEM() + "/price";
export const SEARCH_CUSTOM_PORTFOLIO_SOLUTION_DATA = SOLUTION_BUILDER_URI + "item/custom";



//Schema Config
export const SCHEMA_CONFIG = () => SOLUTION_BUILDER_URI + "schema";
export const GUIDED_SOLUTIONS = () => SOLUTION_BUILDER_URI + "/guided-solution";

// Repair Builder Services
export const GET_CHARGE_CODE = () =>
  REPAIR_BUILDER_URI + "common-config/dropdown/charge-code";
export const GET_SERVICE_TYPE = () =>
  REPAIR_BUILDER_URI + "common-config/dropdown/service-type";
export const GET_LABOUR_TYPE = () =>
  REPAIR_BUILDER_URI + "common-config/dropdown/labour-type";
export const GET_LABOUR_CODE = () =>
  REPAIR_BUILDER_URI + "common-config/dropdown/labour-code";
export const GET_DIMENSION = () =>
  REPAIR_BUILDER_URI + "common-config/dropdown/dimension";
export const GET_CONSUMABLE_TYPE = () =>
  REPAIR_BUILDER_URI + "common-config/dropdown/consumable-type";
export const GET_MISC_TYPE = () =>
  REPAIR_BUILDER_URI + "common-config/dropdown/misc-type";
export const PRICING_METHODS = () => PRICING_URI + "common-config/price-method";
export const GET_ACTIVITY_ID = () => REPAIR_BUILDER_URI + "common-config/dropdown/activity";


export const CREATE_REPAIR_BUILDER = () => REPAIR_BUILDER_URI + "builder";
export const ADD_REPAIR_BUILDER_PARTLIST = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/partlist`;
export const FETCH_REPAIR_BUILDER_PARTLIST = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/partlist`;

export const REPAIR_PART_OF_PARTLIST = (partListId) => REPAIR_BUILDER_URI + `partlist/${partListId}/sparepart`;
export const ADD_REPAIR_MULTI_PARTS_TO_PARTLIST = (partListId) => REPAIR_BUILDER_URI + `partlist/${partListId}/spareparts`;
export const UPLOAD_REPAIR_PARTS_TO_PARTLIST = (partListId) => REPAIR_BUILDER_URI + `partlist/${partListId}/upload-excel`;
export const UPDATE_REPAIR_CUSTOMER = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/customer`;
export const UPDATE_REPAIR_MACHINE = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/machine`;
export const UPDATE_REPAIR_ESTIMATION_TEAM = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/estimation-team`;
export const UPDATE_REPAIR_GENERAL_DETAILS = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/estimate`;
export const UPDATE_REPAIR_PRICE = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/pricing`;
export const UPDATE_REPAIR_STATUS = (builderId, status) => REPAIR_BUILDER_URI + `builder/${builderId}/status/${status}`;
export const CREATE_BUILDER_VERSION = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/partlist-version`;
export const FETCH_BUILDER_DETAILS = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}`;
export const FETCH_PARTS_OF_PARTLIST = (partListId, query) => REPAIR_BUILDER_URI + `partlist/${partListId}/sparepart?${query}`;
export const BUILDER_SEGMENT = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/segment`;
export const SEGMENT_OPERATION = (segmentId) => REPAIR_BUILDER_URI + `segment/${segmentId}/operation`;
export const OPERATION_SERVICE = (operationId) => REPAIR_BUILDER_URI + `operation/${operationId}/service-estimate`;
export const OPERATION_SERVICE_EST_DETAILS = (operationId) => REPAIR_BUILDER_URI + `operation/${operationId}/service-estimate`;

export const LABOR_SERVICE = (serviceId) => REPAIR_BUILDER_URI + `service-estimate/${serviceId}/labour`;
export const LABOR_ITEM = (labourId) => REPAIR_BUILDER_URI + `labour/${labourId}/labour-item`;
export const CONSUMABLE_SERVICE = (serviceId) => REPAIR_BUILDER_URI + `service-estimate/${serviceId}/consumable`;
export const CONSUMABLE_ITEM = (consumableId) => REPAIR_BUILDER_URI + `consumable/${consumableId}/consumable-item`;
export const EXTWORK_SERVICE = (serviceId) => REPAIR_BUILDER_URI + `service-estimate/${serviceId}/external-work`;
export const EXTWORK_ITEM = (extWorkId) => REPAIR_BUILDER_URI + `external-work/${extWorkId}/external-work-item`;
export const MISC_SERVICE = (serviceId) => REPAIR_BUILDER_URI + `service-estimate/${serviceId}/miscellaneous`;
export const FETCH_BUILDER_VERSION_DETAILS = (builderNo, versionNo) => REPAIR_BUILDER_URI + `builder/${builderNo}/version/${versionNo}`

export const SEARCH_CUSTOMER = (query) => DATA_SERVICE_URI + `customer/search?search=${query}`;
export const SEARCH_MACHINE = (query) => DATA_SERVICE_URI + `equipment/search?search=${query}`;
export const SEARCH_SPAREPART = (query) => DATA_SERVICE_URI + `sparepart/search?search=${query}`;
export const SEARCH_COMPONENT_CODE = (query) => DATA_SERVICE_URI + `component-code/search?search=${query}`;
export const SEARCH_VENDOR = (query) => DATA_SERVICE_URI + `vendor/search?search=${query}`;
export const SEARCH_CONSUMABLE = (query) => DATA_SERVICE_URI + `consumable/search?search=${query}`;
export const SEARCH_EXTWORK = (query) => DATA_SERVICE_URI + `external-work/search?search=${query}`;
export const SEARCH_JOB_CODE = (query) => DATA_SERVICE_URI + `job-code/search?search=${query}`;
export const SEARCH_Builder = (query) => REPAIR_BUILDER_URI + `builder/search?search=${query}`;


/* ===================== Quote Service ============================= */

export const QUOTE_CREATION = () => SOLUTION_BUILDER_URI + "/quote";
export const  SEARCH_QUOTE_URL = () => SOLUTION_BUILDER_URI + "/quote/search?search=";