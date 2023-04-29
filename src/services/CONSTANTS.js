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
const QUOTE_SERVICE_BASE_URL = "http://35.200.157.237/";

const PRICING_URI = PRICING_BASE_URL + "pricing-svc/v1/";
const SOLUTION_BUILDER_URI = SOLUTION_BASE_URL + "solution-builder-svc/v1/";

const QUOTE_REST_SERVICE = SOLUTION_BASE_URL + "quote-svc/v1/quote";
const QUOTE_COMMON_REST_SERVICE = QUOTE_SERVICE_BASE_URL + "quote-svc/v1";

const USER_SERVICE_URI = USER_SERVICE_BASE_URL + "user-svc/v1/user/";
const SEARCH_COVERAGE = DATA_SERVICE_BASE_URL + "data-svc/api/v1/coverage/"
const DATA_SERVICE_URI = DATA_SERVICE_BASE_URL + "data-svc/api/v1/";
const REPAIR_BUILDER_URI = "http://35.200.157.237/repair-builder-svc/v1/";

// search for coverage

export const GET_SEARCH_COVERAGE = SEARCH_COVERAGE + "search?search="
export const GET_SEARCH_FAMILY_COVERAGE = SEARCH_COVERAGE
export const GET_SEARCH_FAMILY_CUSTOM_COVERAGE = SEARCH_COVERAGE + "custom/"
// Local endpoints. Uncomment below section to use dummy local data.
export const GET_ALL_USERS = () => `/data/users`;
export const GET_USER_DETAILS = (id) => `/data/user`;

//Pricing URLS
export const PRICING_COMMON_CONFIG = PRICING_URI + "common-config/";
export const SOLUTION_PRICING_COMMON_CONFIG = SOLUTION_BUILDER_URI + "common-config/";
export const PRICE_TYPE = SOLUTION_BUILDER_URI + "common-config/";
export const PRICE_LIST = SOLUTION_BUILDER_URI + "common-config/price-list";
export const PRICE_HEAD_TYPE = PRICING_COMMON_CONFIG + "common-config/price-head-type";

export const ADDITIONAL_PRICE_GET = () => SOLUTION_BUILDER_URI + "additional/price";
export const ESCALATION_PRICE_GET = () => SOLUTION_BUILDER_URI + "escalation/price"

//Soltion Builder URLS
export const GET_ALL_SOLUTION_PORTFOLIOS = () =>
  SOLUTION_BUILDER_URI + `portfolio?orderBY=ASC`;

// export const SOLUTION_BUILDER_PRICE_CONFIG = PRICING_URI + "common-config/";

// Template Search
export const GET_SEARCH_KIT_ID = REPAIR_BUILDER_URI + "kit/search?search=kitId~";
export const GET_SEARCH_STANDARD_JOB_ID = REPAIR_BUILDER_URI + "standard-job/search?search=standardJobId~";

//User Service
export const USER_SERVICE_SIGNUP_URL = () => USER_SERVICE_URI + "signup";
export const USER_SERVICE_SIGNIN_URL = () => USER_SERVICE_URI + "root-login";

// Audit Service

export const GET_AUDIT_SERVICE_DATA = SOLUTION_BUILDER_URI + "audit/";

//Service Portfolio

export const PORTFOLIO_URL = () => SOLUTION_BUILDER_URI + "portfolio";
export const RECENT_PORTFOLIO_URL = SOLUTION_BUILDER_URI + "portfolio";
export const PORTFOLIO_PRICE_CREATE = () => SOLUTION_BUILDER_URI + "portfolio/price";
export const PORTFOLIO_SEARCH_URL = SOLUTION_BUILDER_URI + "portfolio/search?search=";
export const PORTFOLIO_SEARCH_DROPDOWN_LIST_URL = SOLUTION_BUILDER_URI + "portfolio/";
export const PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL = SOLUTION_BUILDER_URI + "portfolio/consolidated-portfolio-details?";
export const PORTFOLIO_ITEM_PRICE_HIERARCHY_SEARCH = SOLUTION_BUILDER_URI + "portfolio/portfolio-item-price-hierarchy?portfolio_id=";

//Service Portfolio PRice Agreement
export const PORTFOLIO_PRICE_AGREEMENT_URL = () => SOLUTION_BUILDER_URI + "price-agreement";
export const PORTFOLIO_PRICE_AGREEMENT_BY_ID_GET = SOLUTION_BUILDER_URI + "price-agreement/";
export const PORTFOLIO_PRICE_AGREEMENT_UPDATE_PUT = SOLUTION_BUILDER_URI + "price-agreement/";
export const PORTFOLIO_PRICE_AGREEMENT_DELETE_BY_ID_DELETE = SOLUTION_BUILDER_URI + "price-agreement/";


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
export const GET_SOLUTION_TYPE = () =>
  SOLUTION_BUILDER_URI + "common-config/solution-type";
export const GET_SOLUTION_LEVEL = () =>
  SOLUTION_BUILDER_URI + "common-config/solution-level";

export const CREATE_PORTFOLIO_ITEM = () => SOLUTION_BUILDER_URI + "item";
export const GET_RECENT_BUNDLE_SERVICE_URL = SOLUTION_BUILDER_URI + "item";
export const GET_RECENT_ITEMS_LIST_URL = SOLUTION_BUILDER_URI + "item/recent?bundle_flag=";
export const PORTFOLIO_ITEM_PRICE_RKID = () => CREATE_PORTFOLIO_ITEM() + "/get-RB-price-update-item-rkid";
export const PORTFOLIO_ITEM_PRICE_SJID = () => CREATE_PORTFOLIO_ITEM() + "/get-RB-price-update-item-sjid";
export const PORTFOLIO_ITEM_SEARCH = () => CREATE_PORTFOLIO_ITEM() + "/search?search=";
export const PORTFOLIO_ITEM_PRICE_BY_ITEM_ID = () => CREATE_PORTFOLIO_ITEM() + "/price";
export const PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE = CREATE_PORTFOLIO_ITEM() + "/portfolio-service-bundle-item-prices?";

// Custom Portfolio 

export const CUSTOM_PORTFOLIO_URL = () => SOLUTION_BUILDER_URI + "portfolio/custom";
export const CUSTOM_PORTFOLIO_SEARCH_QUERY = SOLUTION_BUILDER_URI + "portfolio/custom/search?search=";
export const CUSTOM_PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL = SOLUTION_BUILDER_URI + "portfolio/custom/consolidated-portfolio-details?";
export const GET_RECENT_SOLUTION_PORTFOLIO_LIST = SOLUTION_BUILDER_URI + "portfolio/custom";
export const SOLUTION_PORTFOLIO_ITEM_PRICE_HIERARCHY_SEARCH = SOLUTION_BUILDER_URI + "portfolio/custom/portfolio-item-price-hierarchy?portfolio_id=";



// Custom Portfolio Item
export const CREATE_CUSTOM_PORTFOLIO_ITEM = () => SOLUTION_BUILDER_URI + "item/custom";
export const DELETE_CUSTOM_PORTFOLIO_ITEM = SOLUTION_BUILDER_URI + "item/custom/price/";
export const GET_CUSTOM_PORTFOLIO_ITEM_PRICE_DATA = SOLUTION_BUILDER_URI + "item/custom/price/";
export const GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE = SOLUTION_BUILDER_URI + "item/custom/portfolio-service-bundle-item-prices?";


export const COPY_PORTFOLIO_ITEMS_TO_CUSTOM_PORTFOLIO = SOLUTION_BUILDER_URI + "portfolio/custom/copy-portfolios-items-to-custom-portfolio?"
export const COPY_MATER_TO_CUSTOM_PORTFOLIO = SOLUTION_BUILDER_URI + "portfolio/custom/copy-mater-to-custom-portfolio?"
export const GET_RECENT_SOLUTION_BUNDLE_SERVICE_URL = SOLUTION_BUILDER_URI + "item/custom";
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
export const CREATE_BUILDER_VERSION = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/version`;
export const CREATE_PARTLIST_BUILDER_VERSION = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/partlist-version`;
export const PARTLIST_VERSION = (partListId) => REPAIR_BUILDER_URI + `partlist/${partListId}/version`;
export const FETCH_BUILDER_DETAILS = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}`;
export const FETCH_PARTS_OF_PARTLIST = (partListId, query) => REPAIR_BUILDER_URI + `partlist/${partListId}/sparepart?${query}`;
export const BUILDER_SEGMENT = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/segment`;
export const SEGMENT_OPERATION = (segmentId) => REPAIR_BUILDER_URI + `segment/${segmentId}/operation`;
export const OPERATION_SERVICE = (operationId) => REPAIR_BUILDER_URI + `operation/${operationId}/service-estimate`;
export const OPERATION_SERVICE_EST_DETAILS = (operationId) => REPAIR_BUILDER_URI + `operation/${operationId}/service-estimate`;
export const SEGMENT_REMOVE = (segmentId) => REPAIR_BUILDER_URI + `/segment/${segmentId}`;
export const OPERATION_REMOVE = (operationId) => REPAIR_BUILDER_URI + `/operation/${operationId}`;
export const PARTLIST_OPERATION = (operationId) => REPAIR_BUILDER_URI + `operation/${operationId}/partlist`;

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
export const FETCH_BASE_PRICE = (serviceId) => REPAIR_BUILDER_URI + `service-estimate/${serviceId}/base-price`;


// KIT Service
export const CREATE_KIT = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/kit`;
export const SEARCH_KIT = (query) => REPAIR_BUILDER_URI + `kit/search?search=${query}`;
export const FETCH_KIT = (kitId) => REPAIR_BUILDER_URI + `kit/${kitId}`;
export const UPDATE_KIT_CUSTOMER = (kitId) => REPAIR_BUILDER_URI + `kit/${kitId}/customer`
export const UPDATE_KIT_ESTIMATION = (kitId) => REPAIR_BUILDER_URI + `kit/${kitId}/estimation-team`
export const UPDATE_KIT_GENERAL_DETAIL = (kitId) => REPAIR_BUILDER_URI + `kit/${kitId}/estimate`
export const UPDATE_KIT_PRICE = (kitId) => REPAIR_BUILDER_URI + `kit/${kitId}/pricing`
export const UPDATE_KIT_COVERAGE = (kitId) => REPAIR_BUILDER_URI + `kit/${kitId}/coverage`
export const UPDATE_KIT_STATUS = (kitId, status) => REPAIR_BUILDER_URI + `kit/${kitId}/status/${status}`;
export const UPDATE_KIT_RATING = (kitId, rating) => REPAIR_BUILDER_URI + `kit/${kitId}/rating/${rating}`;
export const UPDATE_KIT_VERSION = (kitId, version) => REPAIR_BUILDER_URI + `kit/${kitId}/version/${version}`;
export const KIT_PART_OF_PARTLIST = (partListId) => REPAIR_BUILDER_URI + `kit-partlist/${partListId}/sparepart`;
export const KIT_MULTI_PARTS_TO_PARTLIST = (partListId) => REPAIR_BUILDER_URI + `kit-partlist/${partListId}/spareparts`;
export const REMOVE_PARTLIST = (partListId) => REPAIR_BUILDER_URI + `partlist/${partListId}`;

//Standard Jobs or  Templates
export const CREATE_STANDARD_JOB = (builderId) => REPAIR_BUILDER_URI + `builder/${builderId}/standard-job`;
export const SEARCH_TEMPLATE = (query) => REPAIR_BUILDER_URI + `standard-job/search?search=${query}`;
export const FETCH_TEMPLATE = (templateId) => REPAIR_BUILDER_URI + `standard-job/${templateId}`;
export const UPDATE_SJ_ESTIMATION = (templateId) => REPAIR_BUILDER_URI + `standard-job/${templateId}/estimation-team`
export const UPDATE_SJ_GENERAL_DETAIL = (templateId) => REPAIR_BUILDER_URI + `standard-job/${templateId}/estimate`
export const UPDATE_SJ_PRICE = (templateId) => REPAIR_BUILDER_URI + `standard-job/${templateId}/pricing`
export const UPDATE_SJ_COVERAGE = (templateId) => REPAIR_BUILDER_URI + `standard-job/${templateId}/coverage`
export const REMOVE_SJ_COVERAGE = (templateId, coverageId) => REPAIR_BUILDER_URI + `standard-job/${templateId}/coverage/${coverageId}`
export const UPDATE_SJ_STATUS = (templateId, status) => REPAIR_BUILDER_URI + `standard-job/${templateId}/status/${status}`;
export const UPDATE_SJ_USAGE = (templateId) => REPAIR_BUILDER_URI + `standard-job/${templateId}/usage`
export const UPDATE_SJ_RATING = (templateId, rating) => REPAIR_BUILDER_URI + `standard-job/${templateId}/rating/${rating}`;
export const SJ_SEGMENT = (templateId) => REPAIR_BUILDER_URI + `standard-job/${templateId}/segment`;
export const UPDATE_SJ_VERSION = (templateId, version) => REPAIR_BUILDER_URI + `standard-job/${templateId}/version/${version}`;

/* ===================== Repair Quote Service ============================= */
export const RECENT_QUOTES =(quoteType) => QUOTE_REST_SERVICE + `/recent?quote_type=${quoteType}`;
export const SEARCH_REPAIR_QUOTES =(searchStr) => QUOTE_REST_SERVICE + `/search?search=${searchStr}`;
export const CREATE_REPAIR_QUOTE =(builderId, description, reference) => QUOTE_REST_SERVICE + `/convert-builder-rb-item-to-quote?builder_id=${builderId}&description=${description}&reference=${reference}`;
export const CREATE_SPARE_PART_QUOTE =(builderId, description, reference) => QUOTE_REST_SERVICE + `/convert-builder-pl-item-to-quote?builder_id=${builderId}&description=${description}&reference=${reference}`;
export const FETCH_REPAIR_QUOTE_DETAILS = (quoteId) => QUOTE_REST_SERVICE + `/${quoteId}`;
export const FETCH_REPAIR_QUOTE_VERSIONS = (quoteName) => QUOTE_REST_SERVICE + `/versions?quote_name=${quoteName}`;
export const UPDATE_REPAIR_QUOTE = (quoteId) => QUOTE_REST_SERVICE + `/${quoteId}`;
export const UPDATE_REPAIR_QUOTE_ITEM = (quoteItemId) => QUOTE_REST_SERVICE + `/repair-buider/${quoteItemId}`;
export const CREATE_QUOTE_VERSION = (existingQuote, existingVersion, newVersion) =>QUOTE_REST_SERVICE +`/copy-quote?existing_quote_name=${existingQuote}&existing_version=${existingVersion}&new_version=${newVersion}`
export const ADD_REPAIR_QUOTE_ITEM = (quoteId) => QUOTE_REST_SERVICE + `/repair-buider?quote_id=${quoteId}`;
export const FETCH_QUOTE_SUMMARY = (quoteId) => QUOTE_REST_SERVICE + `/summary?quote_id=${quoteId}`;
export const CREATE_QUOTE_PAYER = (quoteId) => QUOTE_REST_SERVICE + `/payer?quote_id=${quoteId}`;
export const UPDATE_QUOTE_PAYER = (quotePayerId) => QUOTE_REST_SERVICE + `/payer/${quotePayerId}`;
export const FETCH_BILLING_TYPE = () => QUOTE_COMMON_REST_SERVICE + `/common-config/billing-type`;
export const FETCH_BILLING_FREQ = () => QUOTE_COMMON_REST_SERVICE + `/common-config/billing-frequency`;
export const FETCH_DEL_TYPE = () => QUOTE_COMMON_REST_SERVICE + `/common-config/delivery-type`;
export const FETCH_DEL_PRIORITY = () => QUOTE_COMMON_REST_SERVICE + `/common-config/delivery-priority`;
export const FETCH_PAYMENT_TERMS = () => QUOTE_COMMON_REST_SERVICE + `/common-config/payment-term`;
export const FETCH_QUOTE_STATUS = () => QUOTE_COMMON_REST_SERVICE + `/common-config/quote-status`;
export const FETCH_QUOTE_VALIDITY = () => QUOTE_COMMON_REST_SERVICE + `/common-config/quote-validity`;

/* ===================== Quote Service ============================= */

export const QUOTE_CREATION = () => SOLUTION_BUILDER_URI + "/quote";
export const CONVERT_PORTFOLIO_TO_QUOTE = QUOTE_REST_SERVICE + "convert-potfolio-to-quote?portfolioId=";
export const GET_COVERT_QUOTE_DETAILS = QUOTE_REST_SERVICE;

/* ===================== Solution Quote Service ============================= */

export const SOLUTION_QUOTE_URL = () => QUOTE_REST_SERVICE + "/solution-builder";
export const SOLUTION_QUOTE_CREATION = () => QUOTE_REST_SERVICE;


// export const SEARCH_QUOTE_URL = () => SOLUTION_BUILDER_URI + "/quote/search?search=";
export const SEARCH_QUOTE_URL = () => QUOTE_REST_SERVICE + "search?search=";

export const SEARCH_QUOTE_BY_FIELDS = () => QUOTE_REST_SERVICE + "/search-by-fields?quote_type=";
export const RECENT_QUOTES_COMMON_PATH = () => QUOTE_REST_SERVICE + "/recent?quote_type=";

// Solution Quote

export const SEARCH_SOLUTION_QUOTE = () => QUOTE_REST_SERVICE + "/solution-builder/search?search=";

// Coverage Search - use case 3
export const PORTFOLIO_COVERAGE_SEARCH_DROPDOWN = SOLUTION_BUILDER_URI + "coverage";


// Coverage Search - use case 3
export const SOLUTION_COVERAGE_SEARCH_DROPDOWN = SOLUTION_BUILDER_URI + "coverage/custom";
