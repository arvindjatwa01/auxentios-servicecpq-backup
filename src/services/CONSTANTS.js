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
const SOLUTION_BASE_URL = "http://35.200.157.237/";
const USER_SERVICE_BASE_URL = "http://35.200.157.237/";
const SOLUTION_BUILDER_URI = SOLUTION_BASE_URL + "solution-builder-svc/v1/"
const USER_SERVICE_URI = USER_SERVICE_BASE_URL + "user-svc/v1/user/"
// Local endpoints. Uncomment below section to use dummy local data.
export const GET_ALL_USERS = () => `/data/users`;
export const GET_USER_DETAILS = (id) => `/data/user`;

//User Service
export const USER_SERVICE_SIGNUP_URL = () => USER_SERVICE_URI + "signup"
export const USER_SERVICE_SIGNIN_URL = () => USER_SERVICE_URI + "root-login"

//Soltion Builder URLS
export const GET_ALL_SOLUTION_PORTFOLIOS = () => SOLUTION_BUILDER_URI + `portfolio?orderBY=ASC`

//Service Portfolio

export const PORTFOLIO_URL = () => SOLUTION_BUILDER_URI + "portfolio"
export const Common_SOLUTION_BUILDER_URL = () => SOLUTION_BUILDER_URI + "common-config"
export const COVERAGE_REST = () => SOLUTION_BUILDER_URI + "coverage"
export const GET_STRATEGY_TASK = () => SOLUTION_BUILDER_URI + "common-config/strategy-task"
export const GET_TASK_TYPE = () => SOLUTION_BUILDER_URI + "common-config/task-type"
export const GET_CATEGORY_USAGE = () => SOLUTION_BUILDER_URI + "common-config/usage-category"
export const GET_RESPONSE_TIME = () => SOLUTION_BUILDER_URI + "common-config/response-time"
export const GET_PRODUCT_HIERARCHY = () => SOLUTION_BUILDER_URI + "common-config/product-hierarchy"
export const GET_GEOGRAPHIC = () => SOLUTION_BUILDER_URI + "common-config/geographic"

//Schema Config
export const SCHEMA_CONFIG = () => SOLUTION_BUILDER_URI + "schema"
export const GUIDED_SOLUTIONS = () => SOLUTION_BUILDER_URI + "/guided-solution"