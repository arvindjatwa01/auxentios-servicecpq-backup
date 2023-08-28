// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_ALL_USERS, GET_USER_DETAILS, USER_SERVICE_SIGNUP_URL, USER_SERVICE_SIGNIN_URL, USER_SERVICE_FORGOT_PASSWORD, USER_SERVICE_RESET_PASSWORD, FETCH_ROLES, USER_SERVICE_ADD_USER } from "./CONSTANTS";
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
 * API to send email for forgot password
 */
export const forgotPassword = (data) => {
  console.log("userServices > forgotPassword called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .post(USER_SERVICE_FORGOT_PASSWORD(), data, { headers: headersData })
        .then((res) => {
          if (res.status === 200) {
            resolve(res);          
          } else {
            reject(res);
          }
          console.log("forgotPassword > axios res=", res);
          
        })
        .catch((err) => {
          console.log("forgotPassword > axios err=", err);
          reject("Error in forgotPassword axios!");
        });
    } catch (error) {
      console.error("in userServices > forgotPassword, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


/**
 * API to reset password
 */
export const resetPassword = (data) => {
  console.log("userServices > resetPassword called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .post(USER_SERVICE_RESET_PASSWORD(), data, { headers: headersData })
        .then((res) => {
          if (res.status === 200) {
            resolve(res);          
          } else {
            reject(res);
          }
          console.log("resetPassword > axios res=", res);
          
        })
        .catch((err) => {
          console.log("resetPassword > axios err=", err);
          reject("Error in resetPassword axios!");
        });
    } catch (error) {
      console.error("in userServices > resetPassword, Err===", error);
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

/**
 * Function to add the users.
 */
export const addUser = (data) => {
  console.log("userServices > addUser called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .post(USER_SERVICE_ADD_USER(), data, { headers: headersData })
        .then((res) => {
          console.log("addUser > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject(res.data)
        })
        .catch((err) => {
          console.log("addUser > axios err=", err);
          reject("Error in addUser axios!");
        });
    } catch (error) {
      console.error("in userServices > addUser, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch roles.
 */
export const fetchRoles = () => {
  console.log("userServices > fetchRoles called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .get(FETCH_ROLES(), { headers: headersData })
        .then((res) => {
          console.log("fetchRoles > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject(res.error)
        })
        .catch((err) => {
          console.log("fetchRoles > axios err=", err);
          reject("Error in fetchRoles axios!");
        });
    } catch (error) {
      console.error("in userServices > fetchRoles, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};