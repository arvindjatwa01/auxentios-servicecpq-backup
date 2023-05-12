import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { CREATE_CUSTOM_PORTFOLIO_ITEM, CUSTOM_PORTFOLIO_ITEM_PRICE_RKID, CREATE_CUSTOM_PRICE, CUSTOM_PORTFOLIO_SEARCH_QUERY, QUOTE_CREATION, SEARCH_QUOTE_URL, CONVERT_PORTFOLIO_TO_QUOTE, GET_COVERT_QUOTE_DETAILS, SEARCH_QUOTE_BY_FIELDS, QUOTE_COMMON_CONFIG_URL } from "./CONSTANTS";
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
 * Function to fetch the Portfolio Price Select Option List.
 */

export const getQuoteCommonConfig = (endPath) => {
    console.log("QuoteService > getQuoteCommonConfig called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(QUOTE_COMMON_CONFIG_URL + endPath, { headers: headersData })
                .then((res) => {
                    console.log("getQuoteCommonConfig > axios res=", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("getQuoteCommonConfig > axios err=", err);
                    reject("Error in getQuoteCommonConfig axios!");
                });
        } catch (error) {
            console.error("in QuoteService.js > getQuoteCommonConfig, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const quoteCreation = (payLoad) => {
    console.log("QuoteService > quoteCreation called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(QUOTE_CREATION(), payLoad, { headers: headersData })
                .then((res) => {
                    console.log("quoteCreation > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("quoteCreation > axios err=", err);
                    reject("Error in quoteCreation axios!");
                });
        } catch (error) {
            console.error("in QuoteService > quoteCreation, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const getQuoteMasterData = (id) => {
    console.log("QuoteService > getQuoteMasterData called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(`${QUOTE_CREATION()}/${id}`, { headers: headersData })
                .then((res) => {
                    console.log("getQuoteMasterData > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("getQuoteMasterData > axios err=", err);
                    reject("Error in getQuoteMasterData axios!");
                });
        } catch (error) {
            console.error("in QuoteService > getQuoteMasterData, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const getSearchQuoteData = (searchStr) => {
    console.log("Query QuoteService > getSearchQuoteData called...");
    console.log("new search str is :", searchStr);
    console.log("padth : ", SEARCH_QUOTE_URL);

    return new Promise((resolve, reject) => {
        try {
            axios
                .get(SEARCH_QUOTE_URL() + searchStr, { headers: headersData })
                .then((res) => {
                    console.log("getSearchQuoteData > axios res=", res);
                    // resolve(res.data);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("getSearchQuoteData > axios err=", err);
                    reject("Error in getSearchQuoteData axios!");
                });
        } catch (error) {
            console.error("in Query customPortfolio > getSearchQuoteData, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};


export const getQuoteSearchDropdown = (searchStr) => {
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(SEARCH_QUOTE_BY_FIELDS() + searchStr, { headers: headersData })
                .then((res) => {
                    console.log("getQuoteSearchDropdown > axios res=", res);
                    // resolve(res.data);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("getQuoteSearchDropdown > axios err=", err);
                    reject("Error in getQuoteSearchDropdown axios!");
                });
        } catch (error) {
            console.error("in Quote Service > getQuoteSearchDropdown, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const updateMasterQuoteData = (id, payLoad) => {
    console.log("QuoteService > updateMasterQuoteData called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .put(`${QUOTE_CREATION()}/${id}`, payLoad, { headers: headersData })
                .then((res) => {
                    console.log("updateMasterQuoteData > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("updateMasterQuoteData > axios err=", err);
                    reject("Error in updateMasterQuoteData axios!");
                });
        } catch (error) {
            console.error("in QuoteService > updateMasterQuoteData, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const deleteMasterQuote = (id) => {
    console.log("QuoteService > deleteMasterQuote called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .delete(`${QUOTE_CREATION()}/${id}`, { headers: headersData })
                .then((res) => {
                    console.log("deleteMasterQuote > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("deleteMasterQuote > axios err=", err);
                    reject("Error in deleteMasterQuote axios!");
                });
        } catch (error) {
            console.error("in customportfolioItemService > deleteMasterQuote, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const convertPortfolioToQuoteData = (portfolioId) => {
    console.log("QuoteService > convertPortfolioToQuoteData called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(CONVERT_PORTFOLIO_TO_QUOTE + portfolioId, { headers: headersData })
                .then((res) => {
                    console.log("convertPortfolioToQuoteData > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("convertPortfolioToQuoteData > axios err=", err);
                    reject("Error in convertPortfolioToQuoteData axios!");
                });
        } catch (error) {
            console.error("in QuoteService > convertPortfolioToQuoteData, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const getConvertQuoteData = (id) => {
    console.log("QuoteService > getConvertQuoteData called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                // .get(GET_COVERT_QUOTE_DETAILS + "/" + id, { headers: headersData })
                .get(GET_COVERT_QUOTE_DETAILS + "/" + id, { headers: headersData })
                .then((res) => {
                    console.log("getConvertQuoteData > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("getConvertQuoteData > axios err=", err);
                    reject("Error in getConvertQuoteData axios!");
                });
        } catch (error) {
            console.error("in QuoteService > getConvertQuoteData, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};


// ================== Quote Payer Controller ===================== //

export const quotePayerCreation = (url, payLoad) => {
    console.log("QuoteService > quotePayerCreation called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(QUOTE_CREATION() + "/payer?" + url, payLoad, { headers: headersData })
                .then((res) => {
                    console.log("quotePayerCreation > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("quotePayerCreation > axios err=", err);
                    reject("Error in quotePayerCreation axios!");
                });
        } catch (error) {
            console.error("in QuoteService > quotePayerCreation, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};
