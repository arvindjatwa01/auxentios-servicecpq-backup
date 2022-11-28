// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_ALL_SOLUTION_PORTFOLIOS, GET_ALL_USERS, GET_USER_DETAILS, PORTFOLIO_URL, CUSTOM_PORTFOLIO_URL, PRICING_COMMON_CONFIG, CUSTOM_PORTFOLIO_SEARCH_QUERY, GET_RECENT_SOLUTION_PORTFOLIO_LIST, GET_RECENT_SOLUTION_BUNDLE_SERVICE_URL, COPY_PORTFOLIO_ITEMS_TO_CUSTOM_PORTFOLIO } from "./CONSTANTS";

/* ----------------- Authorization ------------------- */

var accessToken = localStorage.getItem("access_token");
const headersdata = {
    'content-type': 'application/json',
    'Accept': 'application/json',
    'Authorization': accessToken != undefined ? accessToken : ''
    // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */

/**
 * Function to create the Portfolios.
 */
export const createCustomPortfolio = (data) => {
    console.log("customPortfolioSolutions > createCustomPortfolio called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(CUSTOM_PORTFOLIO_URL(), data, { headers: headersdata })
                .then((res) => {
                    console.log("createCustomPortfolio > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("createCustomPortfolio > axios err=", err);
                    reject("Error in createCustomPortfolio axios!");
                });
        } catch (error) {
            console.error("in servicePortfolio > createPortfolio, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};
/**
 * Function to update the Portfolio.
 */
export const updateCustomPortfolio = (portfolioId, data) => {
    console.log("customPortfolioSolutions > updatePortfolio called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .put(CUSTOM_PORTFOLIO_URL() + "/" + portfolioId, data, { headers: headersdata })
                .then((res) => {
                    console.log("updatePortfolio > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("updatePortfolio > axios err=", err);
                    reject("Error in updatePortfolio axios!");
                });
        } catch (error) {
            console.error("in servicePortfolio > updatePortfolio, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};
/**
 * Function to fetch the Portfolio by portfolioId.
 */


export const getCustomPortfolio = (portfolioId) => {
    console.log("customPortfolioSolutions > getPortfolio called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(CUSTOM_PORTFOLIO_URL() + "/" + portfolioId, { headers: headersdata })
                .then((res) => {
                    console.log("getPortfolio > axios res=", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("getPortfolio > axios err=", err);
                    reject("Error in getPortfolio axios!");
                });
        } catch (error) {
            console.error("in servicePortfolio > getPortfolio, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};
/**
 * Function to update the Portfolios.
 */
export const getAllPortfolios = () => {
    console.log("customPortfolioSolutions > getAllUsers called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(GET_ALL_SOLUTION_PORTFOLIOS(), { headers: headersdata })
                .then((res) => {
                    console.log("getAllPortfolios > axios res=", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("getAllUsers > axios err=", err);
                    reject("Error in getAllUsers axios!");
                });
        } catch (error) {
            console.error("in userServices > getAllUsers, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};


/**
 * Function to fetch the details of the user based on userId.
 * @param {string} userid of the user.
 * early dev example passing Skeleton(static object) as API response.
 */
export const getUserDetails = (id) => {
    console.log("userServices > getUserDetails called...");
    return new Promise((resolve, reject) => {
        try {
            // do an SDK, DB call or API endpoint axios call here and return the promise.
            axios
                .get(GET_USER_DETAILS(id), { headers: headersdata })
                .then((res) => {
                    console.log("getUserDetails > axios res=", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("getUserDetails > axios err=", err);
                    reject("Error in getUserDetails axios!");
                });
        } catch (error) {
            console.error("in userServices > getUserDetails, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

// TODO: Dummy service - delete this.
export const getUserDetails1 = (id) => {
    console.log("userServices > getUserDetails called...");
    return new Promise((resolve, reject) => {
        try {
            // do db call or API endpoint axios call here and return the promise.
            resolve({
                "id": "30",
                "firstName": "Joel",
                "lastName": "Joseph",
                "gender": "Male",
                "age": 33,
                "isActiveEmployee": true,
                "location": "London"
            })
        } catch (error) {
            console.error("in userServices > getUserDetails1, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

/**
 * Function to get the solution Portfolios Search.
 */

export const solutionPortfolioSearch = (searchStr) => {
    console.log("customPortfolioSolutions > solutionPortfolioSearch called...");
    console.log("PAth is : ", CUSTOM_PORTFOLIO_SEARCH_QUERY + searchStr);
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(CUSTOM_PORTFOLIO_SEARCH_QUERY + searchStr, { headers: headersdata })
                .then((res) => {
                    console.log("solutionPortfolioSearch > axios res=", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("solutionPortfolioSearch > axios err=", err);
                    reject("Error in solutionPortfolioSearch axios!");
                });
        } catch (error) {
            console.error("in customPortfolioSolutions > solutionPortfolioSearch, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};


/**
 * Function to get the Recent solution Portfolios List.
 */

export const getSearchForRecentSolutionPortfolio = () => {
    console.log("customPortfolioSolutions > getSearchForRecentSolutionPortfolio called...");
    return new Promise((resolve, reject) => {
        // pageSize=10&sortColumn=updatedAt&orderBY=DESC
        // console.log("GET_RECENT_SOLUTION_PORTFOLIO_LIST", `${PORTFOLIO_SEARCH_URL}${family}~${familyValue}`)
        try {
            axios
                .get(GET_RECENT_SOLUTION_PORTFOLIO_LIST + "?pageSize=10&sortColumn=updatedAt&orderBY=DESC", { headers: headersdata })
                .then((res) => {
                    console.log("getSearchForRecentSolutionPortfolio > axios res=", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("getSearchForRecentSolutionPortfolio > axios err=", err);
                    reject("Error in getSearchForRecentSolutionPortfolio axios!");
                });
        } catch (error) {
            console.error("in Query coverageService > getSearchForRecentSolutionPortfolio, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
}

/**
 * Function to get the Recent Bundle/Service Item List.
 */

export const getSearchForRecentSolutionBundleService = () => {
    console.log("customPortfolioSolutions > getSearchForRecentSolutionBundleService called...");
    return new Promise((resolve, reject) => {
        // pageSize=10&sortColumn=updatedAt&orderBY=DESC
        // console.log("RECENT_PORTFOLIO_URL", `${PORTFOLIO_SEARCH_URL}${family}~${familyValue}`)
        try {
            axios
                .get(GET_RECENT_SOLUTION_BUNDLE_SERVICE_URL + "?pageSize=10&sortColumn=updatedAt&orderBY=DESC", { headers: headersdata })
                .then((res) => {
                    console.log("getSearchForRecentSolutionBundleService > axios res=", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("getSearchForRecentSolutionBundleService > axios err=", err);
                    reject("Error in getSearchForRecentSolutionBundleService axios!");
                });
        } catch (error) {
            console.error("in Query coverageService > getSearchForRecentSolutionBundleService, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
}


export const copyPortfolioICustomPortfolio = (data) => {
    console.log("customPortfolioSolutions > copyPortfolioICustomPortfolio called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(COPY_PORTFOLIO_ITEMS_TO_CUSTOM_PORTFOLIO + data, { headers: headersdata })
                .then((res) => {
                    console.log("copyPortfolioICustomPortfolio > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("copyPortfolioICustomPortfolio > axios err=", err);
                    reject("Error in copyPortfolioICustomPortfolio axios!");
                });
        } catch (error) {
            console.error("in customPortfolioSolutions > copyPortfolioICustomPortfolio, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};