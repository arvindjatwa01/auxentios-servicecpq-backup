import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { CREATE_CUSTOM_PORTFOLIO_ITEM, CUSTOM_PORTFOLIO_ITEM_PRICE_RKID, CREATE_CUSTOM_PRICE, CUSTOM_PORTFOLIO_SEARCH_QUERY } from "./CONSTANTS";

export const customitemCreation = (payLoad) => {
    console.log("customPortfolioItemService > customitemCreation called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(CREATE_CUSTOM_PORTFOLIO_ITEM(), payLoad)
                .then((res) => {
                    console.log("cusomitemCreation > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("customitemCreation > axios err=", err);
                    reject("Error in customitemCreation axios!");
                });
        } catch (error) {
            console.error("in customPortfolioItemService > customitemCreation, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const getCustomItemData = (id) => {
  console.log("customportfolioItemService > getcustomItemData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${id}`)
        .then((res) => {
          console.log("getcustomItemData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getcustomItemData > axios err=", err);
          reject("Error in getcustomItemData axios!");
        });
    } catch (error) {
      console.error("in customportfolioItemService > getcustomItemData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getSearchCustomPortfolio = (searchStr) => {
  console.log("Query customPortfolio > getSearchCustomPortfolio called...");
  console.log("new search str is :",searchStr);
  console.log("padth : ", CUSTOM_PORTFOLIO_SEARCH_QUERY);

  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CUSTOM_PORTFOLIO_SEARCH_QUERY+searchStr)
        .then((res) => {
          console.log("getSearchCustomPortfolio > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSearchCustomPortfolio > axios err=", err);
          reject("Error in getSearchCustomPortfolio axios!");
        });
    } catch (error) {
      console.error("in Query customPortfolio > getSearchCustomPortfolio, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getcustomItemPriceById = (id) => {
  console.log("customportfolioItemService > getcustomItemPriceById called...");
  return new Promise((resolve, reject) => {
      try {
          axios
              .get(`${CREATE_CUSTOM_PRICE()}/${id}`)
              .then((res) => {
                  console.log("getcustomItemPriceById > axios res=", res);
                  resolve(res.data);
              })
              .catch((err) => {
                  console.log("getcustomItemPriceById > axios err=", err);
                  reject("Error in getcustomItemPriceById axios!");
              });
      } catch (error) {
          console.error("in customportfolioItemService > getcustomItemPriceById, Err===", error);
          reject(SYSTEM_ERROR);
      }
  });
};

export const getcustomItemPrice = (payLoad) => {
    console.log("customportfolioItemService > getcustomItemPrice called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .put(CUSTOM_PORTFOLIO_ITEM_PRICE_RKID(), payLoad)
                .then((res) => {
                    console.log("getcustomItemPrice > axios res=", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("getcustomItemPrice > axios err=", err);
                    reject("Error in getcustomItemPrice axios!");
                });
        } catch (error) {
            console.error("in customportfolioItemService > getcustomItemPrice, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const updateCustomItemData = (id,payLoad) => {
    console.log("customportfolioItemService > updatecustomItemData called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(`${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${id}`,payLoad)
          .then((res) => {
            console.log("updatecustomItemData > axios res=", res);
            resolve(res);
          })
          .catch((err) => {
            console.log("updatecustomItemData > axios err=", err);
            reject("Error in updatecustomItemData axios!");
          });
      } catch (error) {
        console.error("in customportfolioItemService > updatecustomItemData, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };

  export const deleteCustomItem = (id) => {
    console.log("customportfolioItemService > deletecustomItem called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .delete(`${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${id}`)
          .then((res) => {
            console.log("deletecustomItem > axios res=", res);
            resolve(res);
          })
          .catch((err) => {
            console.log("deletecustomItem > axios err=", err);
            reject("Error in deletecustomItem axios!");
          });
      } catch (error) {
        console.error("in customportfolioItemService > deletecustomItem, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };

  export const customPriceCreation = (payLoad) => {
    console.log("customPortfolioItemService > customProiceCreation called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(CREATE_CUSTOM_PRICE(), payLoad)
                .then((res) => {
                    console.log("customProiceCreation > axios res=", res);
                    resolve(res);
                })
                .catch((err) => {
                    console.log("customProiceCreation > axios err=", err);
                    reject("Error in customProiceCreation axios!");
                });
        } catch (error) {
            console.error("in customPortfolioItemService > customProiceCreation, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};

export const updateCustomPriceData = (id,payLoad) => {
  console.log("customportfolioItemService > updateCustomPriceData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${CREATE_CUSTOM_PRICE()}/${id}`,payLoad)
        .then((res) => {
          console.log("updateCustomPriceData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updateCustomPriceData > axios err=", err);
          reject("Error in updateCustomPriceData axios!");
        });
    } catch (error) {
      console.error("in customportfolioItemService > updateCustomPriceData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};