// All Solution Quote related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios';
import { SOLUTION_QUOTE_URL } from "./CONSTANTS";


var accessToken = localStorage.getItem("access_token");
const headersData = {
    'content-type': 'application/json',
    'Accept': 'application/json',
    'Authorization': accessToken != undefined ? accessToken : ''
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