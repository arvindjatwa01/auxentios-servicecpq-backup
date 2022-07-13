import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import {PRICING_COMMON_CONFIG } from "./CONSTANTS";


//To get portfolio common config -"item-type","customer-segment","price-method"
// value of endpath= "item-type","customer-segment","price-method"

export const getPortfolioCommonConfig = (endpath) => {
    console.log("pricingCommonConfig > getPortfolioCommonConfig called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(PRICING_COMMON_CONFIG+endpath)
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