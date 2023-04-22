import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { ADD_REPAIR_QUOTE_ITEM, CREATE_REPAIR_QUOTE, CREATE_SPARE_PART_QUOTE, FETCH_BILLING_FREQ, FETCH_BILLING_TYPE, FETCH_DEL_PRIORITY, FETCH_DEL_TYPE, FETCH_PAYMENT_TERMS, FETCH_REPAIR_QUOTE_DETAILS, FETCH_REPAIR_QUOTE_VERSIONS, RECENT_QUOTES, SEARCH_REPAIR_QUOTES, UPDATE_REPAIR_QUOTE, UPDATE_REPAIR_QUOTE_ITEM } from "./CONSTANTS";
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

//Update Quote Item data
export const updateQuoteItem = (quoteItemId, data) => {
  console.log("service Repair > updateQuoteItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_REPAIR_QUOTE_ITEM(quoteItemId), data, config)
        .then((res) => {
          console.log("updateQuoteItem > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in updateQuoteItem axios!");
          }
        })
        .catch((err) => {
          console.log("updateQuoteItem axios err :", err);
          reject("Error in updateQuoteItem axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateQuoteItem : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Add Quote Item data
export const addQuoteItem = (data) => {
  console.log("service Repair > addQuoteItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADD_REPAIR_QUOTE_ITEM(), data, config)
        .then((res) => {
          console.log("addQuoteItem > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in addQuoteItem axios!");
          }
        })
        .catch((err) => {
          console.log("addQuoteItem axios err :", err);
          reject("Error in addQuoteItem axios!");
        });
    } catch (error) {
      console.error("Genreal Exception addQuoteItem : ", error);
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


//Fetch Quote Versions
export const fetchQuoteVersions = (quoteName) => {
  console.log("RepairBuilder > fetchQuoteVersions called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_REPAIR_QUOTE_VERSIONS(quoteName), config)
        .then((res) => {
          console.log("fetchQuoteVersions > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while calling fetchQuoteVersions");
        })
        .catch((err) => {
          console.log("fetchQuoteVersions > axios err=", err);
          reject("Error in fetchQuoteVersions axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchQuoteVersions, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Fetch Billing Type
export const fetchBillingType = () => {
  console.log("Quote > fetchBillingType called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_BILLING_TYPE(), config)
        .then((res) => {
          console.log("fetchBillingType > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while calling fetchBillingType");
        })
        .catch((err) => {
          console.log("fetchBillingType > axios err=", err);
          reject("Error in fetchBillingType axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchBillingType, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Fetch Billing Frequency
export const fetchBillingFreq = () => {
  console.log("Quote > fetchBillingFreq called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_BILLING_FREQ(), config)
        .then((res) => {
          console.log("fetchBillingFreq > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while calling fetchBillingFreq");
        })
        .catch((err) => {
          console.log("fetchBillingFreq > axios err=", err);
          reject("Error in fetchBillingFreq axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchBillingFreq, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Fetch Delivery Type
export const fetchDeliveryType = () => {
  console.log("Quote > fetchDeliveryType called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_DEL_TYPE(), config)
        .then((res) => {
          console.log("fetchDeliveryType > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while calling fetchDeliveryType");
        })
        .catch((err) => {
          console.log("fetchDeliveryType > axios err=", err);
          reject("Error in fetchDeliveryType axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchDeliveryType, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Fetch Delivery Priority
export const fetchDeliveryPriority = () => {
  console.log("Quote > fetchDeliveryPriority called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_DEL_PRIORITY(), config)
        .then((res) => {
          console.log("fetchDeliveryPriority > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while calling fetchDeliveryPriority");
        })
        .catch((err) => {
          console.log("fetchDeliveryPriority > axios err=", err);
          reject("Error in fetchDeliveryPriority axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchDeliveryPriority, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Fetch Payment Terms
export const fetchPaymentTerms = () => {
  console.log("Quote > fetchPaymentTerms called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_PAYMENT_TERMS(), config)
        .then((res) => {
          console.log("fetchPaymentTerms > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while calling fetchPaymentTerms");
        })
        .catch((err) => {
          console.log("fetchPaymentTerms > axios err=", err);
          reject("Error in fetchPaymentTerms axios!");
        });
    } catch (error) {
      console.error("in Quote > fetchPaymentTerms, Err===", error);
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