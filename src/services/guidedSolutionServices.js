// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GUIDED_SOLUTIONS } from "./CONSTANTS";
import Cookies from "js-cookie";

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


/**
 * Function to fetch the Portfolio Schema.
 */
export const getGuidedSolution = () => {
  console.log("Schema Config Service > getGuidedSolution called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GUIDED_SOLUTIONS(), { headers: headersData })
        .then((res) => {
          // console.log("getGuidedSolution > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getGuidedSolution > axios err=", err);
          reject("Error in getGuidedSolution axios!");
        });
    } catch (error) {
      console.error("in servicePortfolio > getGuidedSolution, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
