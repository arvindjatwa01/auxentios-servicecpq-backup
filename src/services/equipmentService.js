import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { DATA_SVC_EQUIPMENT, FETCH_GAP_TO_ENTITLEMENT, FETCH_PARTS_SEGMENT, FETCH_PARTS_SEGMENT_DETAILS, FETCH_PROPENSITY_TO_BUY, FETCH_PROPENSITY_TO_BUY_DET } from "./CONSTANTS";
var CookiesSetData = Cookies.get("loginTenantDtl");
var getCookiesJsonData;
if (CookiesSetData != undefined) {
    getCookiesJsonData = JSON.parse(CookiesSetData);
}
const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `${getCookiesJsonData?.access_token}`,
    },
    // xsrfCookieName: "XSRF-TOKEN",
    // xsrfHeaderName: "X-XSRF-TOKEN",
};
//Search Equipment
export const getEquipmentSearch = (searchString) => {
    console.log("Equipment Service > searchEquipment called...");
    return new Promise((resolve, reject) => {
        try {
            axios
                .get(DATA_SVC_EQUIPMENT() + `/search/search=${searchString}`, config)
                .then((res) => {
                    console.log("searchEquipment > axios res=", res);
                    if (res.status === 200) resolve(res.data);
                    else reject(res.data);
                })
                .catch((err) => {
                    console.log("searchEquipment > axios err=", err);
                    reject("Error in searchEquipment axios!");
                });
        } catch (error) {
            console.error("in Equipment Service > searchEquipment, Err===", error);
            reject(SYSTEM_ERROR);
        }
    });
};