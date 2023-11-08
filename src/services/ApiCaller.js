import axios from "axios";
import Cookies from "js-cookie";

// get the Authorization AuthToken data
const getHeaders = () => {
  // const authToken = Cookies.get('auxAuthToken');
  const loginTenantDtl = Cookies.get("loginTenantDtl");
  if (!loginTenantDtl || loginTenantDtl === undefined) {
    return;
  }
  // parse login tenent details cookies data in
  const cookiedJsonData = JSON.parse(loginTenantDtl);
  if (!cookiedJsonData || cookiedJsonData === undefined) {
    return;
  }

  const headerMap = {
    "content-type": "application/json",
    Accept: "application/json",
    Authorization: cookiedJsonData.access_token,
  };
  return headerMap;
};

// API Success
const handleSuccess = (result, successCallBack) => {
  if (successCallBack !== null) {
    if (result.status === 403) {
      Cookies.remove("loginTenantDtl");
      Cookies.remove("auxAuthToken");
      window.location.href = "/login";
      return;
    }
    // if(result.status !== 200){
    //     toast.
    //     return;
    // }
    successCallBack(result);
  }
};

const handleFailure = (error, failedCallBack) => {
  if (failedCallBack != null) {
    failedCallBack(error);
    return;
  }
};

export const callGetApi = (loading, url, successCallBack, failureCallBack) => {
  axios
    .get(url, { headers: getHeaders() })
    .then((res) => handleSuccess(res, successCallBack))
    .catch((error) => handleFailure(error, failureCallBack));
};

export const callPostApi = (
  loading,
  url,
  requestObj,
  successCallBack,
  failureCallBack
) => {
  axios
    .post(url, requestObj, {
      headers: getHeaders(),
    })
    .then((res) => handleSuccess(res, successCallBack))
    .catch((error) => handleFailure(error, failureCallBack));
};

export const callPutApi = (
  loading,
  url,
  requestObj,
  successCallBack,
  failureCallBack
) => {
  axios
    .put(url, requestObj, {
      headers: getHeaders(),
    })
    .then((result) => handleSuccess(result, successCallBack))
    .catch((error) => handleFailure(error, failureCallBack));
};

export const callDeleteApi = (
  loading,
  url,
  successCallBack,
  failedCallBack
) => {
  axios
    .delete(url, {
      headers: getHeaders(),
    })
    .then((result) => handleSuccess(result, successCallBack))
    .catch((error) => handleFailure(error, failedCallBack));
};
