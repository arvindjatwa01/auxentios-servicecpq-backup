//  Warraty relates servics

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from "axios";
import { Warranty_Component_GetById_GET } from "./CONSTANTS";
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
  "content-type": "application/json",
  Accept: "application/json",
  // 'Authorization': accessToken != undefined ? accessToken : ''
  Authorization:
    CookiesSetData != undefined ? getCookiesJsonData?.access_token : "",
  // 'Authorization': url.Auth_Token
};

/* ------------------------------------------------------------ */

//Fetch Work List
export const getWarratyComponentData = (id) => {
  console.log("warrantyServices > getWarratyComponentData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${Warranty_Component_GetById_GET}/${id}`, {
          headers: headersData,
        })
        .then((res) => {
          console.log("getWarratyComponentData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getWarratyComponentData > axios err=", err);
          reject("Error in getWarratyComponentData axios!");
        });
    } catch (error) {
      console.error(
        "in warrantyServices > getWarratyComponentData, Err===",
        error
      );
      reject(SYSTEM_ERROR);
    }
  });
};
