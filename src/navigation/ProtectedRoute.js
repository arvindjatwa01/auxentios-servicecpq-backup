import Cookies from 'js-cookie';
import React from 'react'
import { Redirect, Route } from 'react-router-dom';

var CookiesSetData = Cookies.get("loginTenantDtl");
let planName = "";
if (CookiesSetData != undefined) {
  var getCookiesJsonData = JSON.parse(CookiesSetData);
  planName = getCookiesJsonData.user_planName;
}
export const ProtectedRoute = ({ plan, plans = [], ...props }) => {
    return plans.length && plans.includes(planName) ? (
      <Route exact {...props} />
    ) : (
      <Redirect to="/" />
    );
  };

