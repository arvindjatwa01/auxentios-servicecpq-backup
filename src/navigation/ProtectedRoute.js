import Cookies from 'js-cookie';
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom';

var CookiesSetData = Cookies.get("loginTenantDtl");
let planName = "";
if (CookiesSetData != undefined) {
  var getCookiesJsonData = JSON.parse(CookiesSetData);
  planName = getCookiesJsonData.user_planName;
}
export const ProtectedRoute = ({ plan, plans = [], ...props }) => {

    console.log(plan, plans, plans.length && plans.includes(planName))

    return plans.length && plans.includes(planName) ? (
      <Route exact {...props} />
    ) : (
      <Redirect to="/" />
    );
  };
  // Check of user is logged in
  // If yes, show route
  // Otherwise, redirect to login page

//   const isLoggedIn = Boolean(localStorage.getItem('access_token'));

//   return (
//     <Route {...props} />
//   )
// }
