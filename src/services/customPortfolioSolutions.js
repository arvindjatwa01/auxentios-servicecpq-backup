// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_ALL_SOLUTION_PORTFOLIOS, GET_ALL_USERS, GET_USER_DETAILS, PORTFOLIO_URL, CUSTOM_PORTFOLIO_URL, PRICING_COMMON_CONFIG } from "./CONSTANTS";

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
    console.log("Custom portfolio > createCustomPortfolio called...");
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
    console.log("service Service Portfolio > updatePortfolio called...");
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
    console.log("service Service Portfolio > getPortfolio called...");
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
    console.log("userServices > getAllUsers called...");
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