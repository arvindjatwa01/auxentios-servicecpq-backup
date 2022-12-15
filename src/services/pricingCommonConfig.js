import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { PRICING_COMMON_CONFIG, SOLUTION_PRICING_COMMON_CONFIG, PRICE_HEAD_TYPE, PORTFOLIO_PRICE_CREATE, PRICE_LIST, PRICE_TYPE, ADDITIONAL_PRICE_GET, ESCALATION_PRICE_GET, PORTFOLIO_ITEM_PRICE_SJID, PORTFOLIO_ITEM_PRICE_BY_ITEM_ID, GET_CUSTOM_PORTFOLIO_ITEM_PRICE_DATA } from "./CONSTANTS";

/* ----------------- Authorization ------------------- */

var accessToken = localStorage.getItem("access_token");
const headersdata = {
  'content-type': 'application/json',
  'Accept': 'application/json',
  'Authorization': accessToken != undefined ? accessToken : ''
  // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */


//To get portfolio common config -"item-type","customer-segment","price-method"
// value of endpath= "item-type","customer-segment","price-method"

/**
 * Function to fetch the Portfolio Price Select Option List.
 */

export const getPortfolioCommonConfig = (endpath) => {
  console.log("pricingCommonConfig > getPortfolioCommonConfig called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PRICING_COMMON_CONFIG + endpath, { headers: headersdata })
        .then((res) => {
          console.log("getPortfolioCommonConfig > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getPortfolioCommonConfig > axios err=", err);
          reject("Error in getPortfolioCommonConfig axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig.js > getPortfolioCommonConfig, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch the Solution Portfolio Price Select Option List.
 */
export const getSolutionPriceCommonConfig = (endpath) => {
  console.log("pricingCommonConfig > getSolutionPriceCommonConfig called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SOLUTION_PRICING_COMMON_CONFIG + endpath, { headers: headersdata })
        .then((res) => {
          console.log("getSolutionPriceCommonConfig > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSolutionPriceCommonConfig > axios err=", err);
          reject("Error in getSolutionPriceCommonConfig axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig.js > getSolutionPriceCommonConfig, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch the Solution Portfolio Price Type Select Option List.
 */
export const getPortfolioPriceTypeCommonConfig = (endpath) => {
  console.log("pricingCommonConfig > getPortfolioPriceTypeCommonConfig called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PRICE_TYPE + endpath, { headers: headersdata })
        .then((res) => {
          console.log("getPortfolioPriceTypeCommonConfig > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getPortfolioPriceTypeCommonConfig > axios err=", err);
          reject("Error in getPortfolioPriceTypeCommonConfig axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig.js > getPortfolioPriceTypeCommonConfig, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch the Solution Portfolio Price Head-Type Select Option List.
 */
export const getPortfolioPriceHeadTypeCommonConfig = (endpath) => {
  console.log("pricingCommonConfig > getPortfolioPriceHeadTypeCommonConfig called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PRICE_HEAD_TYPE + endpath, { headers: headersdata })
        .then((res) => {
          console.log("getPortfolioPriceHeadTypeCommonConfig > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getPortfolioPriceHeadTypeCommonConfig > axios err=", err);
          reject("Error in getPortfolioPriceHeadTypeCommonConfig axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig.js > getPortfolioPriceHeadTypeCommonConfig, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to Create the Additional Price.
 */
export const additionalPriceCreation = (payLoad) => {
  console.log("pricingCommonConfig > additionalPriceCreation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADDITIONAL_PRICE_GET(), payLoad, { headers: headersdata })
        .then((res) => {
          console.log("additionalPriceCreation > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("additionalPriceCreation > axios err=", err);
          reject("Error in additionalPriceCreation axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > additionalPriceCreation, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to Create the Escalation Price.
 */
export const escalationPriceCreation = (data) => {
  console.log("pricingCommonConfig > escalationPriceCreation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ESCALATION_PRICE_GET(), data, { headers: headersdata })
        .then((res) => {
          console.log("escalationPriceCreation > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("escalationPriceCreation > axios err=", err);
          reject("Error in escalationPriceCreation axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > escalationPriceCreation, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to Create the Portfolio Price.
 */
export const portfolioPriceCreation = (data) => {
  console.log("pricingCommonConfig > portfolioPriceCreation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(PORTFOLIO_PRICE_CREATE(), data, { headers: headersdata })
        .then((res) => {
          console.log("portfolioPriceCreation > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("portfolioPriceCreation > axios err=", err);
          reject("Error in portfolioPriceCreation axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > portfolioPriceCreation, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to Create the Portfolio Item Price SJId.
 */
export const portfolioItemPriceSjid = (data) => {
  console.log("pricingCommonConfig > portfolioItemPriceSjid called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(PORTFOLIO_ITEM_PRICE_SJID(), data, { headers: headersdata })
        .then((res) => {
          console.log("portfolioItemPriceSjid > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("portfolioItemPriceSjid > axios err=", err);
          reject("Error in portfolioItemPriceSjid axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > portfolioItemPriceSjid, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch the Portfolio Item Price Data.
 */
export const getItemPriceData = (id) => {
  console.log("pricingCommonConfig > getItemPriceData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${PORTFOLIO_ITEM_PRICE_BY_ITEM_ID()}/${id}`, { headers: headersdata })
        .then((res) => {
          console.log("getItemPriceData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getItemPriceData > axios err=", err);
          reject("Error in getItemPriceData axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > getItemPriceData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch the Custom Portfolio Item Price Data.
 */
export const getCustomItemPriceData = (id) => {
  console.log("pricingCommonConfig > getCustomItemPriceData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_CUSTOM_PORTFOLIO_ITEM_PRICE_DATA + "/" + id, { headers: headersdata })
        .then((res) => {
          console.log("getCustomItemPriceData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getCustomItemPriceData > axios err=", err);
          reject("Error in getCustomItemPriceData axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > getCustomItemPriceData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


/**
 * Function to update the Additional Price Data.
 */
export const updateAdditionalPriceById = (payLoad, id) => {
  console.log("pricingCommonConfig > updateAdditionalPriceById called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${ADDITIONAL_PRICE_GET()}/${id}`, payLoad, { headers: headersdata })
        .then((res) => {
          console.log("updateAdditionalPriceById > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updateAdditionalPriceById > axios err=", err);
          reject("Error in updateAdditionalPriceById axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > updateAdditionalPriceById, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to update the Escalation Price.
 */
export const updateEscalationPriceById = (data, id) => {
  console.log("pricingCommonConfig > updateEscalationPriceById called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${ESCALATION_PRICE_GET()}/${id}`, data, { headers: headersdata })
        .then((res) => {
          console.log("updateEscalationPriceById > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updateEscalationPriceById > axios err=", err);
          reject("Error in updateEscalationPriceById axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > updateEscalationPriceById, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to update the Portfolio Price.
 */
export const updatePortfolioPrice = (data, id) => {
  console.log("pricingCommonConfig > updatePortfolioPrice called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${PORTFOLIO_PRICE_CREATE()}/${id}`, data, { headers: headersdata })
        .then((res) => {
          console.log("updatePortfolioPrice > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updatePortfolioPrice > axios err=", err);
          reject("Error in updatePortfolioPrice axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > updatePortfolioPrice, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


/**
 * Function to fetch the Portfolio Price By Id.
 */
export const getPortfolioPriceById = (id) => {
  console.log("pricingCommonConfig > getPortfolioPriceById called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${PORTFOLIO_PRICE_CREATE()}/${id}`, { headers: headersdata })
        .then((res) => {
          console.log("getPortfolioPriceById > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getPortfolioPriceById > axios err=", err);
          reject("Error in getPortfolioPriceById axios!");
        });
    } catch (error) {
      console.error("in pricingCommonConfig > getPortfolioPriceById, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};