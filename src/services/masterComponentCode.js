// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { SEARCH_COMPONENT_CODE } from "./CONSTANTS";
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
 * Function to get suggetions for component Codes
 */
export const getComponentCodeSuggetions = (query) => {
  console.log("coverageService > getComponentCodeSuggetions called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_COMPONENT_CODE(query), { headers: headersData })
        .then((res) => {
          console.log("getComponentCodeSuggetions > axios res=", res);
          if(res.status === 200){
            resolve(res.data);
          }else{
            resolve([]);
          }
        })
        .catch((err) => {
          console.log("getComponentCodeSuggetions > axios err=", err);
          reject("Error in getComponentCodeSuggetions axios!");
        });
    } catch (error) {
      console.error("in coverageService > getComponentCodeSuggetions, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};