import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { FETCH_PROPENSITY_TO_BUY } from "./CONSTANTS";
var CookiesSetData = Cookies.get("loginTenantDtl");
var getCookiesJsonData;
if (CookiesSetData != undefined) {
  getCookiesJsonData = JSON.parse(CookiesSetData);
}
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${getCookiesJsonData?.access_token}`,
  },
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
};
//Fetch Propensity To Buy
export const getPropensityToBuy = () => {
    console.log("Dashboard Service > propensity-to-buy called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(FETCH_PROPENSITY_TO_BUY, config)
          .then((res) => {
            console.log("getPropensityToBuy > axios res=", res);
            if (res.status === 200) resolve(res.data);
            else reject(res.data);
          })
          .catch((err) => {
            console.log("getPropensityToBuy > axios err=", err);
            reject("Error in getPropensityToBuy axios!");
          });
      } catch (error) {
        console.error("in DashboardService > getPropensityToBuy, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };