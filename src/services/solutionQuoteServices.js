// All Solution Quote related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios';
import { SOLUTION_QUOTE_CREATION, SOLUTION_QUOTE_URL } from "./CONSTANTS";
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