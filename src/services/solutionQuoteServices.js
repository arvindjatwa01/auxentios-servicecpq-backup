// All Solution Quote related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios';
import { SOLUTION_QUOTE_CREATION, SOLUTION_QUOTE_URL, RECENT_QUOTES_COMMON_PATH, SEARCH_SOLUTION_QUOTE } from "./CONSTANTS";
import Cookies from "js-cookie";


var accessToken = localStorage.getItem("access_token");
var CookiesSetData = Cookies.get("loginTenantDtl");
var getCookiesJsonData;
if (CookiesSetData != undefined) {
    getCookiesJsonData = JSON.parse(CookiesSetData);
}
//  else {
//   getCookiesJsonData = {
//     access_token: "Bearer null",
//   }
// }
// var getCookiesJsonData = JSON.parse(CookiesSetData);
const headersData = {
    'content-type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': accessToken != undefined ? accessToken : ''
    'Authorization': CookiesSetData != undefined ? getCookiesJsonData?.access_token : ''
    // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */

/**
 * Function to fetch the Recent Solution Quote Data.
 */

export const getRecentSolutionQuotes = () => {
    console.log("solutionQuoteServices > getRecentSolutionQuotes called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(`${SOLUTION_QUOTE_URL()}?pageSize=10&sortColumn=updatedAt&orderBY=DESC`, { headers: headersData })
                .then((res) => {
                    console.log("getRecentSolutionQuotes > axios res=", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("getRecentSolutionQuotes > axios err=", err);
                    reject("Error in getRecentSolutionQuotes axios!");
                });
        } catch (error) {
            console.error("in solutionQuoteServices > getRecentSolutionQuotes, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

/**
 * Function to Create Solution Quote Data.
 */

export const solutionQuoteCreation = (payLoad) => {
    console.log("solutionQuoteServices > solutionQuoteCreation called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(SOLUTION_QUOTE_CREATION(), payLoad, { headers: headersData })
                .then((res) => {
                    console.log("solutionQuoteCreation > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("solutionQuoteCreation > axios err=", err);
                    reject("Error in solutionQuoteCreation axios!");
                });
        } catch (error) {
            console.error("in solutionQuoteServices > solutionQuoteCreation, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

/**
 * Function to Create Solution Quote Data.
 */

export const updateSolutionQuoteData = (id, payLoad) => {
    console.log("solutionQuoteServices > updateSolutionQuoteData called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .put(`${SOLUTION_QUOTE_CREATION()}/${id}`, payLoad, { headers: headersData })
                .then((res) => {
                    console.log("updateSolutionQuoteData > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("updateSolutionQuoteData > axios err=", err);
                    reject("Error in updateSolutionQuoteData axios!");
                });
        } catch (error) {
            console.error("in solutionQuoteServices > updateSolutionQuoteData, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

/**
 * Function to fetch the Recent Solution Quote Data.
 */

export const getRecentQuotes = (quoteType) => {
    console.log("solutionQuoteServices > getRecentQuotes called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(RECENT_QUOTES_COMMON_PATH() + quoteType, { headers: headersData })
                .then((res) => {
                    console.log("getRecentQuotes > axios res=", res);
                    if(res.status === 200){
                        resolve(res.data);
                    }else {
                        resolve([]);
                    }
                })
                .catch((err) => {
                    console.log("getRecentQuotes > axios err=", err);
                    reject("Error in getRecentQuotes axios!");
                });
        } catch (error) {
            console.error("in solutionQuoteServices > getRecentQuotes, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};


/**
 * Function to Search the Solution Quote Data.
 */

export const searchSolutionQuotes = (searchText) => {
    console.log("solutionQuoteServices > searchSolutionQuotes called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(SEARCH_SOLUTION_QUOTE() + searchText, { headers: headersData })
                .then((res) => {
                    console.log("searchSolutionQuotes > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("searchSolutionQuotes > axios err=", err);
                    reject("Error in searchSolutionQuotes axios!");
                });
        } catch (error) {
            console.error("in solutionQuoteServices > searchSolutionQuotes, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};