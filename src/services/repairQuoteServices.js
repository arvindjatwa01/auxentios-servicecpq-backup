import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { ADD_PL_QUOTE_ITEM, ADD_QUOTE_PRICE_SUMMARY, ADD_REPAIR_QUOTE_ITEM, CREATE_PART_QUOTE_FROM_KIT, CREATE_QUOTE_PAYER, CREATE_QUOTE_VERSION, CREATE_REPAIR_QUOTE, CREATE_REPAIR_QUOTE_FROM_SJ, CREATE_SPARE_PART_QUOTE, FETCH_BILLING_FREQ, FETCH_BILLING_TYPE, FETCH_DEL_PRIORITY, FETCH_DEL_TYPE, FETCH_PAYMENT_TERMS, FETCH_QUOTE_SUMMARY, FETCH_REPAIR_QUOTE_DETAILS, FETCH_REPAIR_QUOTE_VERSIONS, RECENT_QUOTES, SEARCH_REPAIR_QUOTES, UPDATE_PL_QUOTE_ITEM, UPDATE_QUOTE_PAYER, UPDATE_QUOTE_PRICE_SUMMARY, UPDATE_REPAIR_QUOTE, UPDATE_REPAIR_QUOTE_ITEM, UPLOAD_ITEMS_TO_PARTS_QUOTE, UPLOAD_ITEMS_TO_REP_QUOTE } from "./CONSTANTS";
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
          else reject(res.data);
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


//Update PL Quote Item data
export const updatePLQuoteItem = (quoteItemId, data) => {
  console.log("service Quote > updatePLQuoteItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_PL_QUOTE_ITEM(quoteItemId), data, config)
        .then((res) => {
          console.log("updatePLQuoteItem > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in updatePLQuoteItem axios!");
          }
        })
        .catch((err) => {
          console.log("updatePLQuoteItem axios err :", err);
          reject("Error in updatePLQuoteItem axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updatePLQuoteItem : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Create a new quote version
export const createQuoteVersion = (quoteName, existingVersion, newVersion) => {
  console.log("QuoteService > createQuoteVersion called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CREATE_QUOTE_VERSION(quoteName, existingVersion, newVersion), config)
        .then((res) => {
          console.log("createQuoteVersion > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("createQuoteVersion > axios err=", err);
          reject("Error in createQuoteVersion axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > createQuoteVersion, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add Quote Item data
export const addQuoteItem = (quoteId, data) => {
  console.log("service Repair > addQuoteItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADD_REPAIR_QUOTE_ITEM(quoteId), data, config)
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


//Add PL Quote Item data
export const addPLQuoteItem = (quoteId, data) => {
  console.log("service PLQuote > addPLQuoteItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADD_PL_QUOTE_ITEM(quoteId), data, config)
        .then((res) => {
          console.log("addPLQuoteItem > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in addPLQuoteItem axios!");
          }
        })
        .catch((err) => {
          console.log("addPLQuoteItem axios err :", err);
          reject("Error in addPLQuoteItem axios!");
        });
    } catch (error) {
      console.error("Genreal Exception addPLQuoteItem : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add Quote payer
export const addQuotePayer = (quoteId, payerData) => {
  console.log("Quote > addPayerData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CREATE_QUOTE_PAYER(quoteId), payerData, config)
        .then((res) => {
          console.log("addPayerData > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in addPayerData axios!");
          }
        })
        .catch((err) => {
          console.log("addQuoteItem axios err :", err);
          reject("Error in addPayerData axios!");
        });
    } catch (error) {
      console.error("Genreal Exception addPayerData : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update Quote payer
export const updatePayerData = (quotePayerId, payerData) => {
  console.log("Quote > updatePayerData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_QUOTE_PAYER(quotePayerId), payerData, config)
        .then((res) => {
          console.log("updatePayerData > axios res=", res);
          if (res.status === 200) {
            resolve(res);
          } else {
            console.log("Status:", res.status);
            reject("Error in updatePayerData axios!");
          }
        })
        .catch((err) => {
          console.log("addQuoteItem axios err :", err);
          reject("Error in addPayerData axios!");
        });
    } catch (error) {
      console.error("Genreal Exception addPayerData : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Remove payer
export const removePayer = (payerId) => {
  console.log("service repairQuote > removePayer called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(UPDATE_QUOTE_PAYER(payerId), config)
        .then((res) => {
          console.log("repairQuote -> removePayer response: ", res);
          if (res.status === 200) {
            resolve("Successfully removed the payer!");
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("removePayer > axios err=", err);
          reject("Error in removePayer axios!");
        });
    } catch (error) {
      console.error("removePayer general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Add Quote Price Summary item
export const addQuotePriceSummary = (quoteId, priceSummaryData) => {
  console.log("Quote > addQuotePriceSummary called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADD_QUOTE_PRICE_SUMMARY(quoteId), priceSummaryData, config)
        .then((res) => {
          console.log("addQuotePriceSummary > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in addQuotePriceSummary axios!");
          }
        })
        .catch((err) => {
          console.log("addQuotePriceSummary axios err :", err);
          reject("Error in addQuotePriceSummary axios!");
        });
    } catch (error) {
      console.error("Genreal Exception addQuotePriceSummary : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update Quote Price Summary
export const updateQuotePriceSummary = (quotePriceSumId, priceSummaryData) => {
  console.log("Quote > updateQuotePriceSummary called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_QUOTE_PRICE_SUMMARY(quotePriceSumId), priceSummaryData, config)
        .then((res) => {
          console.log("updateQuotePriceSummary > axios res=", res);
          if (res.status === 200) {
            resolve(res);
          } else {
            console.log("Status:", res.status);
            reject("Error in updateQuotePriceSummary axios!");
          }
        })
        .catch((err) => {
          console.log("updateQuotePriceSummary axios err :", err);
          reject("Error in updateQuotePriceSummary axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateQuotePriceSummary : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};
//Remove PL Quote Item
export const removePLQuoteItem = (itemId) => {
  console.log("service repairQuote > removePLQuoteItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(UPDATE_PL_QUOTE_ITEM(itemId), config)
        .then((res) => {
          console.log("repairQuote -> removePLQuoteItem response: ", res);
          if (res.status === 200) {
            resolve("Successfully removed the item!");
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("removePLQuoteItem > axios err=", err);
          reject("Error in removePLQuoteItem axios!");
        });
    } catch (error) {
      console.error("removePLQuoteItem general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Remove repair Quote Item
export const removeRepQuoteItem = (itemId) => {
  console.log("service repairQuote > removeRepQuoteItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(UPDATE_REPAIR_QUOTE_ITEM(itemId), config)
        .then((res) => {
          console.log("repairQuote -> removeRepQuoteItem response: ", res);
          if (res.status === 200) {
            resolve("Successfully removed the item!");
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("removeRepQuoteItem > axios err=", err);
          reject("Error in removeRepQuoteItem axios!");
        });
    } catch (error) {
      console.error("removeRepQuoteItem general exception", error);
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

//Fetch Quote Summary
export const fetchQuoteSummary = (quoteId) => {
  console.log("Quote > fetchQuoteSummary called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_QUOTE_SUMMARY(quoteId), config)
        .then((res) => {
          console.log("fetchQuoteSummary > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while calling fetchQuoteSummary");
        })
        .catch((err) => {
          console.log("fetchQuoteSummary > axios err=", err);
          reject("Error in fetchQuoteSummary axios!");
        });
    } catch (error) {
      console.error("in Quote > fetchQuoteSummary, Err===", error);
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


//Create Quote from KIT
export const createKITQuote = (kitId, quoteDescription, quoteReference) => {
  console.log("RepairQuote > createKITQuote called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CREATE_PART_QUOTE_FROM_KIT(kitId, quoteDescription, quoteReference), config)
        .then((res) => {
          console.log("createKITQuote  > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while creating kit quotes");
        })
        .catch((err) => {
          console.log("createKITQuote > axios err=", err);
          reject("Error in createKITQuote axios!");
        });
    } catch (error) {
      console.error("in RepairQuote > createKITQuote, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Create Quote from SJ
export const createSJQuote = (standardJobId, quoteDescription, quoteReference) => {
  console.log("RepairQuote > createKITQuote called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CREATE_REPAIR_QUOTE_FROM_SJ(standardJobId, quoteDescription, quoteReference), config)
        .then((res) => {
          console.log("createSJQuote  > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject("Error occurred while creating standa job quotes");
        })
        .catch((err) => {
          console.log("createSJQuote > axios err=", err);
          reject("Error in createSJQuote axios!");
        });
    } catch (error) {
      console.error("in RepairQuote > createSJQuote, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//upload repair quote items through the excel sheet
export const uploadItemsToRepairQuote = (file) => {
  console.log("service repairquote > upload items called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(UPLOAD_ITEMS_TO_REP_QUOTE(), file, config)
        .then((res) => {
          console.log("uploadItemsToRepairQuote response: ", res);
          if (res.status === 200 || res.status === 201) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in uploadItemsToRepairQuote axios!");
          }
        })
        .catch((err) => {
          console.log("uploadItemsToRepairQuote > axios err=", err);
          reject("Error in uploadItemsToRepairQuote axios!");
        });
    } catch (error) {
      console.error("uploadItemsToRepairQuote general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//upload spare parts quote items through the excel sheet
export const uploadItemsToPartsQuote = (file) => {
  console.log("service uploadItemsToPartsQuote called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(UPLOAD_ITEMS_TO_PARTS_QUOTE(), file, config)
        .then((res) => {
          console.log("uploadItemsToPartsQuote response: ", res);
          if (res.status === 200 || res.status === 201) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in uploadItemsToPartsQuote axios!");
          }
        })
        .catch((err) => {
          console.log("uploadItemsToPartsQuote > axios err=", err);
          reject("Error in uploadItemsToPartsQuote axios!");
        });
    } catch (error) {
      console.error("uploadItemsToPartsQuote general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};