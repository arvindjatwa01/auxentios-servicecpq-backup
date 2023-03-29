import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { CREATE_REPAIR_QUOTE, CREATE_SPARE_PART_QUOTE, FETCH_REPAIR_QUOTE_DETAILS, RECENT_QUOTES, SEARCH_REPAIR_QUOTES, UPDATE_REPAIR_QUOTE } from "./CONSTANTS";
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

//Create Repair Quotes
export const createRepairQuote = (builderId, quoteDescription, quoteReference) => {
  console.log("RepairQuote > createRepairQuote called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CREATE_REPAIR_QUOTE(builderId, quoteDescription, quoteReference), config)
        .then((res) => {
          console.log("quoteSearch  > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while creating repair quotes");
        })
        .catch((err) => {
          console.log("RepairQuote > axios err=", err);
          reject("Error in createRepairQuote axios!");
        });
    } catch (error) {
      console.error("in RepairQuote > createRepairQuote, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update Quote data
export const updateQuoteHeader = (quoteId, data) => {
  console.log("service Repair > updateQuoteHeader called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_REPAIR_QUOTE(quoteId), data, config)
        .then((res) => {
          console.log("updateQuoteHeader > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in updateQuoteHeader axios!");
          }
        })
        .catch((err) => {
          console.log("updateQuoteHeader axios err :", err);
          reject("Error in updateQuoteHeader axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateBuilderCustomer : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Fetch Quote Details
export const fetchQuoteDetails = (quoteId) => {
  console.log("RepairBuilder > fetchQuoteDetails called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_REPAIR_QUOTE_DETAILS(quoteId), config)
        .then((res) => {
          console.log("fetchQuoteDetails > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while calling fetchQuoteDetails");
        })
        .catch((err) => {
          console.log("fetchQuoteDetails > axios err=", err);
          reject("Error in fetchQuoteDetails axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchQuoteDetails, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Create Spare Part Quote
export const createSparePartQuote = (builderId, quoteDescription, quoteReference) => {
  console.log("RepairQuote > createSparePartQuote called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CREATE_SPARE_PART_QUOTE(builderId, quoteDescription, quoteReference), config)
        .then((res) => {
          console.log("createSparePartQuote  > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while creating spare part quotes");
        })
        .catch((err) => {
          console.log("RepairQuote > axios err=", err);
          reject("Error in createSparePartQuote axios!");
        });
    } catch (error) {
      console.error("in RepairQuote > createSparePartQuote, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};