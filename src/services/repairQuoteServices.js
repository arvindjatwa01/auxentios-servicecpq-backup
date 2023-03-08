import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { RECENT_QUOTES, SEARCH_REPAIR_QUOTES } from "./CONSTANTS";
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
//Fetch Recent Quotes
export const quoteRecent = (quoteType) => {
  console.log("RepairQuote > quoteRecent called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(RECENT_QUOTES(quoteType), config)
        .then((res) => {
          console.log("RepairQuote Recent > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while fetching quotes");
        })
        .catch((err) => {
          console.log("RepairQuote > axios err=", err);
          reject("Error in builderSearch axios!");
        });
    } catch (error) {
      console.error("in RepairQuote > recentQuote, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Search Quotes
export const quoteRepairSearch = (searchStr) => {
  console.log("RepairQuote > quoteSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_REPAIR_QUOTES(searchStr), config)
        .then((res) => {
          console.log("quoteSearch  > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while searching repair quotes");
        })
        .catch((err) => {
          console.log("RepairQuote > axios err=", err);
          reject("Error in quoteSearch axios!");
        });
    } catch (error) {
      console.error("in RepairQuote > quoteSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
