import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import Cookies from "js-cookie";
import {
    PORTFOLIO_COVERAGE_SEARCH_DROPDOWN,
    SOLUTION_COVERAGE_SEARCH_DROPDOWN
} from "./CONSTANTS";

/* ----------------- Authorization ------------------- */

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

/* +++++++++++++ Coverage Master for use case 3 ++++++++++++++ */

/*** Function to fetch the Coverage Search Dropdown List.*/

export const portfolioCoverageDropdownList = (searchStr) => {
    console.log("portfolioSolutionCoverageService > portfolioCoverageDropdownList called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(PORTFOLIO_COVERAGE_SEARCH_DROPDOWN + "/" + searchStr, { headers: headersData })
                .then((res) => {
                    console.log("portfolioCoverageDropdownList > axios res=", res);
                    // resolve(res.data);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("portfolioCoverageDropdownList > axios err=", err);
                    reject("Error in portfolioCoverageDropdownList axios!");
                });
        } catch (error) {
            console.error("in portfolioSolutionCoverageService > portfolioCoverageDropdownList, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};


/* +++++++++++++ Coverage Master for use case 3 ++++++++++++++ */

/*** Function to fetch the Coverage Search Dropdown List.*/

export const solutionCoverageDropdownList = (searchStr) => {
    console.log("portfolioSolutionCoverageService > solutionCoverageDropdownList called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(SOLUTION_COVERAGE_SEARCH_DROPDOWN + "/" + searchStr, { headers: headersData })
                .then((res) => {
                    console.log("solutionCoverageDropdownList > axios res=", res);
                    // resolve(res.data);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("solutionCoverageDropdownList > axios err=", err);
                    reject("Error in solutionCoverageDropdownList axios!");
                });
        } catch (error) {
            console.error("in portfolioSolutionCoverageService > solutionCoverageDropdownList, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};