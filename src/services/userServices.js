// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_ALL_USERS, GET_USER_DETAILS, USER_SERVICE_SIGNUP_URL, USER_SERVICE_SIGNIN_URL } from "./CONSTANTS";
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
 * Function to register the users.
 */
export const signup = (data) => {
  console.log("userServices > signup called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .post(USER_SERVICE_SIGNUP_URL(), data, { headers: headersData })
        .then((res) => {
          console.log("signup > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("signup > axios err=", err);
          reject("Error in signup axios!");
        });
    } catch (error) {
      console.error("in userServices > signup, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to login the users.
 */
export const signIn = (data) => {
  console.log("userServices > signIn called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .post(USER_SERVICE_SIGNIN_URL(), data, { headers: headersData })
        .then((res) => {
          console.log("signIn > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("signIn > axios err=", err);
          reject("Error in signIn axios!");
        });
    } catch (error) {
      console.error("in userServices > signIn, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};



/**
 * Function to fetch all the users.
 */
export const getAllUsers = () => {
  console.log("userServices > getAllUsers called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .get(GET_ALL_USERS(), { headers: headersData })
        .then((res) => {
          console.log("getAllUsers > axios res=", res);
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
        .get(GET_USER_DETAILS(id), { headers: headersData })
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

