// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_ALL_SOLUTION_PORTFOLIOS, GET_ALL_USERS, GET_USER_DETAILS, CUSTOM_PORTFOLIO_URL } from "./CONSTANTS";

/* ----------------- Authorization ------------------- */

var accessToken = localStorage.getItem("access_token");
const headersdata = {
  'content-type': 'application/json',
  'Accept': 'application/json',
  'Authorization': accessToken != undefined ? accessToken : ''
  // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */


/**
 * Function to fetch the Portfolio by portfolioId.
 */


export const getSolutionPortfolioById = (portfolioId) => {
  console.log("solutionBuilderServices > getSolutionPortfolio called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${CUSTOM_PORTFOLIO_URL()}/${portfolioId}`, { headers: headersdata })
        .then((res) => {
          console.log("getSolutionPortfolio > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSolutionPortfolio > axios err=", err);
          reject("Error in getSolutionPortfolio axios!");
        });
    } catch (error) {
      console.error("in solutionBuilderServices > getSolutionPortfolio, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch all the Portfolios.
 */
export const getAllPortfolios = () => {
  console.log("userServices > getAllUsers called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_ALL_SOLUTION_PORTFOLIOS(), { headers: headersdata })
        .then((res) => {
          console.log("getAllPortfolios > axios res=", res);
          // console.log("getAllPortfolios > axios res data=", res.data);
          
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getAllUsers > axios err=", err);
          reject("Error in getAllUsers axios!");
        });
    } catch (error) {
      console.error("in userServices > getAllUsers, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch the details of the user based on userId.
 * @param {string} userid of the user.
 * early dev example passing Skeleton(static object) as API response.
 */
export const getUserDetails = (id) => {
  console.log("userServices > getUserDetails called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .get(GET_USER_DETAILS(id), { headers: headersdata })
        .then((res) => {
          console.log("getUserDetails > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getUserDetails > axios err=", err);
          reject("Error in getUserDetails axios!");
        });
    } catch (error) {
      console.error("in userServices > getUserDetails, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

// TODO: Dummy service - delete this.
export const getUserDetails1 = (id) => {
  console.log("userServices > getUserDetails called...");
  return new Promise((resolve, reject) => {
    try {
      // do db call or API endpoint axios call here and return the promise.
      resolve({
        "id": "30",
        "firstName": "Joel",
        "lastName": "Joseph",
        "gender": "Male",
        "age": 33,
        "isActiveEmployee": true,
        "location": "London"
      })
    } catch (error) {
      console.error("in userServices > getUserDetails1, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

