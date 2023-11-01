import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { CREATE_WORKLIST, WORKLIST } from "./CONSTANTS";

/* ----------------- Authorization ------------------- */

var CookiesSetData = Cookies.get("loginTenantDtl");
var getCookiesJsonData;
if (CookiesSetData != undefined) {
    getCookiesJsonData = JSON.parse(CookiesSetData);
}
const headersData = {
    'content-type': 'application/json',
    'Accept': 'application/json',
    'Authorization': CookiesSetData != undefined ? getCookiesJsonData?.access_token : ''
}

/* ------------------------------------------------------------ */


//Fetch Work List
export const fetchWorkList = (pagination) => {
    console.log(" Fetch Work List called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(WORKLIST(pagination), { headers: headersData })
                .then((res) => {
                    if (res.status === 200)
                        resolve(res.data);
                    else
                        reject('Error occurred while fetching worklist');
                })
                .catch((err) => {
                    reject("Error in fetch worklist!");
                });
        } catch (error) {
            console.error("in worklist, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};


//Create Work List
export const createWorkList = (data) => {
    console.log(" Create Work List case called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(CREATE_WORKLIST(), data, { headers: headersData })
                .then((res) => {
                    if (res.status === 200)
                        resolve(res.data);
                    else
                        reject('Error occurred while creating worklist');
                })
                .catch((err) => {
                    reject("Error in create worklist!");
                });
        } catch (error) {
            console.error("in create worklist, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};
