import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { PRICING_COMMON_CONFIG, SOLUTION_PRICING_COMMON_CONFIG, PRICE_HEAD_TYPE, PORTFOLIO_PRICE_CREATE, PRICE_LIST, PRICE_TYPE, ADDITIONAL_PRICE_GET, ESCALATION_PRICE_GET, PORTFOLIO_ITEM_PRICE_SJID } from "./CONSTANTS";

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

export const getPortfolioCommonConfig = (endpath) => {
  console.log("pricingCommonConfig > getPortfolioCommonConfig called...");
  console.log("PRICING_COMMON_CONFIG + endpath : ", PRICING_COMMON_CONFIG + endpath);
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

export const getSolutionPriceCommonConfig = (endpath) => {
  console.log("pricingCommonConfig > getSolutionPriceCommonConfig called...");
  console.log("SOLUTION_PRICING_COMMON_CONFIG + endpath : ", SOLUTION_PRICING_COMMON_CONFIG + endpath)
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


// export const escalationPriceCreation = (payLoad) => {
//   console.log("pricingCommonConfig > escalationPriceCreation called...");
//   return new Promise((resolve, reject) => {
//     try {
//       axios
//         .post(ESCALATION_PRICE_GET(), payLoad, { headers: headersdata })
//         .then((res) => {
//           console.log("escalationPriceCreation > axios res=", res);
//           resolve(res);
//         })
//         .catch((err) => {
//           console.log("escalationPriceCreation > axios err=", err);
//           reject("Error in escalationPriceCreation axios!");
//         });
//     } catch (error) {
//       console.error("in pricingCommonConfig > escalationPriceCreation, Err===", error);
//       reject(SYSTEM_ERROR);
//     }
//   });
// };

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