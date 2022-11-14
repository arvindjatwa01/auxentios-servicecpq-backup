import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { CREATE_CUSTOM_PORTFOLIO_ITEM, CUSTOM_PORTFOLIO_ITEM_PRICE_RKID, CREATE_CUSTOM_PRICE, CUSTOM_PORTFOLIO_SEARCH_QUERY, QUOTE_CREATION, SEARCH_QUOTE_URL } from "./CONSTANTS";

/* ----------------- Authorization ------------------- */

var accessToken = localStorage.getItem("access_token");
const headersdata = {
  'content-type': 'application/json',
  'Accept': 'application/json',
  'Authorization': accessToken != undefined ? accessToken : ''
  // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */


export const quoteCreation = (payLoad) => {
    console.log("QuoteService > quoteCreation called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(QUOTE_CREATION(), payLoad, { headers: headersdata })
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
                .get(`${QUOTE_CREATION()}/${id}`, { headers: headersdata })
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
                .get(SEARCH_QUOTE_URL + searchStr, { headers: headersdata })
                .then((res) => {
                    console.log("getSearchQuoteData > axios res=", res);
                    resolve(res.data);
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

export const updateMasterQuoteData = (id, payLoad) => {
    console.log("QuoteService > updateMasterQuoteData called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .put(`${QUOTE_CREATION()}/${id}`, payLoad, { headers: headersdata })
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
                .delete(`${QUOTE_CREATION()}/${id}`, { headers: headersdata })
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
