import React, { useEffect, useState } from "react";
import logoIcon from "../assets/icons/png/logo.png";
import shearchIcon from "../assets/icons/svg/search.svg";
import notificationIcon from "../assets/icons/svg/notification-bing.svg";
import profileIcon from "../assets/icons/svg/profile.svg";
import messageIcon from "../assets/icons/svg/message-text.svg";
import supportIcon from "../assets/icons/svg/24-support.svg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link, useHistory } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useSelector, useDispatch } from "react-redux";

import { history } from "utils";
import {
  WITH_SPARE_PARTS,
  WITHOUT_SPARE_PARTS_DETAILS,
  PART_LIST,
  KITS,
  PORTFOLIO_SUMMARY,
  SOLUTION_BUILDER_ANALYTICS,
  SOLUTION_QUOTE,
  REPAIR_SERVICE_PARTS_TEMPLATE,
} from "../navigation/CONSTANTS";
import Cookies from "js-cookie";
import { Divider } from "@mui/material";

export function HeaderComponent(props) {
  let history = useHistory();
  const [age, setAge] = React.useState("5");

  const result = useSelector((state) => state.loginSuccess);
  // console.log("result is : ", result)
  // const [loginUserId, setLoginUserId] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  // console.log("login status Header component : ", result)

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("loginTenantDtl");
    history.push("/login");
    // window.location.href = "/login";
  };
  useEffect(() => {
    var userLoginStatus = localStorage.getItem("user_logIn_Status");
    var CookiesSetData = Cookies.get("loginTenantDtl");

    if (CookiesSetData != undefined) {
      var getCookiesJsonData = JSON.parse(CookiesSetData);
      if (getCookiesJsonData.user_logIn_Status) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
        history.push("/login");
      }
    } else {
      setLoginStatus(false);
      history.push("/login");
    }
    // if (userLoginStatus) {
    //   setLoginStatus(true)
    // } else {
    //   setLoginStatus(false)
    //   history.push("/login");
    // }
    // setLoginStatus(result.isLoggedIn)
  }, []);
  return (
    <>
      <div
        className="header"
        style={{ backgroundColor: "#000000", zIndex: 30 }}
      >
        {/* <div className="header-content clearfix" style={{ display: "none" }}>
          <div className="nav-control">
                    <div className="hamburger">
                        <span className="toggle-icon"><i className="icon-menu"></i></span>
                    </div>
                </div>
          <div className="header-left">
            <div className="input-group icons">
              <div className="input-group-prepend">
                <span
                  className="input-group-text bg-transparent border-0 pr-0 "
                  id="basic-addon1"
                >
                  <img src={shearchIcon}></img>
                </span>
              </div>
              <input
                type="search"
                className="form-control search-form-control"
                placeholder="Search"
                aria-label="Search Dashboard"
              />
              <div className="drop-down animated flipInX d-md-none">
                <form action="#">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="header-right">
            <ul className="clearfix">
              <li className="icons dropdown">
                <a className="header-li-text" href="#" data-toggle="dropdown">
                  <img src={notificationIcon}></img>
                  <div className="li-contant">Notifications</div>
                </a>
                <div className="drop-down animated fadeIn dropdown-menu dropdown-notfication">
                  <div className="dropdown-content-heading d-flex justify-content-between">
                    <span className="">2 New Notifications</span>
                    <a href="javascript:void()" className="d-inline-block">
                      <span className="badge badge-pill gradient-2">5</span>
                    </a>
                  </div>
                  <div className="dropdown-content-body">
                    <ul>
                      <li>
                        <a href="javascript:void()">
                          <span className="mr-3 avatar-icon bg-success-lighten-2">
                            <i className="icon-present"></i>
                          </span>
                          <div className="notification-content">
                            <h6 className="notification-heading">
                              Events near you
                            </h6>
                            <span className="notification-text">
                              Within next 5 days
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <span className="mr-3 avatar-icon bg-danger-lighten-2">
                            <i className="icon-present"></i>
                          </span>
                          <div className="notification-content">
                            <h6 className="notification-heading">
                              Event Started
                            </h6>
                            <span className="notification-text">
                              One hour ago
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <span className="mr-3 avatar-icon bg-success-lighten-2">
                            <i className="icon-present"></i>
                          </span>
                          <div className="notification-content">
                            <h6 className="notification-heading">
                              Event Ended Successfully
                            </h6>
                            <span className="notification-text">
                              One hour ago
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <span className="mr-3 avatar-icon bg-danger-lighten-2">
                            <i className="icon-present"></i>
                          </span>
                          <div className="notification-content">
                            <h6 className="notification-heading">
                              Events to Join
                            </h6>
                            <span className="notification-text">
                              After two days
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="icons dropdown">
                <a
                  className="header-li-text"
                  href="javascript:void(0)"
                  data-toggle="dropdown"
                >
                  <img src={messageIcon}></img>
                  <div className="li-contant">Messages</div>
                </a>
                <div className="drop-down animated fadeIn dropdown-menu">
                  <div className="dropdown-content-heading d-flex justify-content-between">
                    <span className="">3 New Messages</span>
                    <a href="javascript:void()" className="d-inline-block">
                      <span className="badge badge-pill gradient-1">3</span>
                    </a>
                  </div>
                  <div className="dropdown-content-body">
                    <ul>
                      <li className="notification-unread">
                        <a href="javascript:void()">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="images/avatar/1.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Saiful Islam
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">
                              Hi Teddy, Just wanted to let you ...
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-unread">
                        <a href="javascript:void()">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="images/avatar/2.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Adam Smith
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">
                              Can you do me a favour?
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="images/avatar/3.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Barak Obama
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">
                              Hi Teddy, Just wanted to let you ...
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="images/avatar/4.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Hilari Clinton
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">Hello</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className="icons dropdown">
                <div
                  className="header-li-text c-pointer position-relative"
                  data-toggle="dropdown"
                >
                  <img src={profileIcon}></img>

                  <div className="li-contant">
                    <span className="mr-2 ">Profile</span>
                    <i
                      className="fa fa-angle-down f-s-14"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
                  <div className="dropdown-content-body">
                    <ul>
                      <li>
                        <Link to="/profile">
                          <i className="icon-user"></i> <span>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <i className="icon-envelope-open"></i>{" "}
                          <span>Inbox</span>{" "}
                          <div className="badge gradient-3 badge-pill gradient-1">
                            3
                          </div>
                        </a>
                      </li>

                      <hr className="my-2" />
                      <li>
                        <a href="page-lock.html">
                          <i className="icon-lock"></i> <span>Lock Screen</span>
                        </a>
                      </li>
                      <li>
                        <a className="cursor" onClick={handleLogout}>
                          <i className="icon-key"></i> <span>Logout</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="icons">
                <a className="header-li-text" href="javascript:void(0)">
                  <img src={supportIcon}></img>
                  <div className="li-contant">Help</div>
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="header-content clearfix">
          <div className="header-right">
            <ul className="clearfix">
              <li className="icons" style={{ display: "none" }}>
                <div
                  className="input-group"
                  style={{ border: "1px solid #cfcfcf", borderRadius: "5px" }}
                >
                  {/* <div className="">
                  
                    <input
                      type="search"
                      className="form-control search-form-control dropdown-toggle"
                      role="button"
                      placeholder="Search"
                      aria-label="Search Dashboard"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />

                    <div
                      className="dropdown-menu search-drop-div search-dropdown-list"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li className="dropdown-item d-flex align-items-center" onClick={() => history.push("/RepairWithSpareParts")} style={{ cursor: "pointer" }} >
                        <span className="span-icon">
                          <svg
                            id="uuid-7dbd4a75-0a07-4ebd-ae99-a9c37850cf3f"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 112.19978 112.19978"
                          >
                            <path
                              className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                              d="M70.48758,41.40459l-20.55005,20.55103-8.22607-8.22607c-1.62622-1.62793-4.2666-1.62793-5.89307,0-1.62793,1.62793-1.62793,4.26514,0,5.89307l14.11914,14.11914,26.44312-26.44409c1.62793-1.62793,1.62793-4.26685,0-5.89307-1.62622-1.62793-4.26685-1.62793-5.89307,0Z"
                            />
                            <path
                              className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                              d="M60.28445,21.57158l3.27466,.71948c3.83789,.8418,7.49561,2.33936,10.87524,4.45581,.76587,.47852,1.62134,.71289,2.47046,.71289,1.19727,0,2.38159-.46558,3.28271-1.36743,1.62793-1.62793,1.62793-4.26514,0-5.89307-.68555-.6853-1.5498-1.08252-2.44287-1.18994-2.89502-1.69629-5.94995-3.03613-9.12524-4.00317V4.35625C68.61942,2.05449,66.54642,.00005,64.24442,.00005s-4.16748,1.86548-4.16748,4.16748c0,.4541,.07251,.89209,.20752,1.30225V21.57158Z"
                            />
                            <path
                              className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                              d="M89.90872,48.64067c.42798,1.94702,2.1521,3.27539,4.06641,3.27539,.29639,0,.59668-.03247,.89795-.09912,2.24805-.49341,3.66992-2.71558,3.17676-4.96362-.83984-3.82251-2.19775-7.49341-4.04785-10.94946l7.52515-7.52588c1.62793-1.62793,1.62793-4.55981,0-6.18774-1.62622-1.62793-4.26685-1.62793-5.89307,0-.32227,.32227-.5813,.68384-.77563,1.06958l-11.39478,11.39551,1.80615,2.82275c2.20996,3.45288,3.77026,7.2085,4.63892,11.1626Z"
                            />
                            <path
                              className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                              d="M108.03226,60.07695c-.45581,0-.89453,.07324-1.30469,.20825h-16.1001l-.71875,3.27393c-.84326,3.83862-2.3418,7.49658-4.45312,10.86963-1.16162,1.85254-.89136,4.22437,.6582,5.76611,.81323,.80908,1.87646,1.21265,2.93945,1.21265,1.07031,0,2.13989-.41016,2.95459-1.22729,.68042-.68555,1.07446-1.54492,1.18188-2.43555,1.69458-2.89429,3.03442-5.94824,4.00317-9.12451h10.6311c2.30176,0,4.37573-2.07397,4.37573-4.37573,0-2.302-1.86548-4.16748-4.16748-4.16748Z"
                            />
                            <path
                              className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                              d="M88.94095,94.85918l-11.39722-11.39551-2.82349,1.80688c-3.45044,2.20923-7.20605,3.77051-11.16211,4.63965-2.24805,.49316-3.66992,2.71533-3.17676,4.96362,.49487,2.24805,2.71704,3.67896,4.96436,3.17603,3.82397-.83838,7.49414-2.19604,10.9502-4.04688l7.52588,7.52417c.81323,.81396,1.95361,1.22095,3.09375,1.22095,1.13965,0,2.28003-.40698,3.09326-1.22095,1.62793-1.62793,1.62793-4.26514,0-5.89307-.32153-.32251-.68311-.57959-1.06787-.7749Z"
                            />
                            <path
                              className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                              d="M51.91458,90.62993l-3.27295-.71973c-3.84277-.84473-7.50073-2.34424-10.87695-4.45728-1.85107-1.15894-4.22046-.88403-5.76123,.66089-1.62305,1.63281-1.6167,4.27173,.01538,5.89478,.68457,.68042,1.54565,1.07446,2.4353,1.18188,2.89282,1.69482,5.94849,3.03442,9.12549,4.00317v10.64966c0,2.302,2.073,4.35645,4.375,4.35645,2.30176,0,4.16748-1.86572,4.16748-4.16748,0-.4541-.07324-.89209-.20752-1.30225v-16.1001Z"
                            />
                            <path
                              className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                              d="M22.29031,63.55913c-.4939-2.24829-2.71362-3.66943-4.96436-3.17627-2.24805,.49341-3.67017,2.71533-3.17676,4.96362,.83984,3.82251,2.19751,7.4917,4.04761,10.94946l-7.5249,7.52588c-.78711,.78613-1.2876,2.00391-1.28198,3.11572,.00562,1.11206,.51685,2.32153,1.31128,3.09961,.81152,.79614,1.86475,1.19165,2.91724,1.19165,1.08008,0,2.16016-.41821,2.97656-1.25024,.30786-.31421,.55518-.66406,.7439-1.03687l11.39648-11.39551-1.80615-2.82446c-2.20996-3.45288-3.77051-7.20996-4.63892-11.1626Z"
                            />
                            <path
                              className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                              d="M22.29031,48.64067c.84326-3.84033,2.3418-7.49805,4.45337-10.86963,1.15576-1.84424,.89209-4.20972-.64307-5.75293-1.62402-1.62964-4.26196-1.6394-5.89404-.01465-.69019,.68701-1.08911,1.55469-1.19824,2.45166-1.69385,2.89258-3.03345,5.94824-4.0022,9.12451H4.37503C2.07327,43.57964,.00003,45.65337,.00003,47.95537s1.86572,4.16748,4.16748,4.16748c.45581,0,.89453-.07324,1.30469-.20825H21.57156l.71875-3.27393Z"
                            />
                            <path
                              className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                              d="M23.25809,17.34063l11.39624,11.39551,2.823-1.80688c3.4519-2.20923,7.20752-3.77051,11.16333-4.63965,2.24829-.49341,3.67017-2.71533,3.177-4.96362-.49487-2.24829-2.71777-3.67261-4.96436-3.17603-3.82397,.83838-7.49414,2.19604-10.95093,4.04688l-7.52515-7.52417c-1.62622-1.62622-4.56079-1.62964-6.18701,0-1.62793,1.62793-1.62793,4.26514,0,5.89307,.32153,.32251,.68286,.57959,1.06787,.7749Z"
                            />
                          </svg>
                        </span>
                        <span className="ml-2">Repair With Spare Parts</span></li>
                      <li className="dropdown-item d-flex align-items-center cursor-pointer" onClick={() => history.push("/RepairWithoutSpareParts")} style={{ cursor: "pointer" }}>
                        <span className="span-icon">
                          <svg
                            id="uuid-f3f687df-4645-4e7f-87f1-5ccb3e8264e2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 112.19978 112.19978"
                          >
                            <path
                              className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                              d="M60.2845,21.56987l3.27295,.71973c3.84277,.84473,7.50049,2.34424,10.87695,4.45728,.76587,.47852,1.62134,.71289,2.47046,.71289,1.19727,0,2.38159-.46558,3.28247-1.36743,1.62793-1.62793,1.62793-4.26514,0-5.89307-.68506-.6853-1.54956-1.08252-2.44263-1.18994-2.89282-1.69482-5.94849-3.03442-9.12524-4.00317V4.35625C68.61946,2.05449,66.54622,.00005,64.24446,.00005,61.94246,.00005,60.07698,1.86553,60.07698,4.16753c0,.4541,.07227,.89209,.20752,1.30225V21.56987Z"
                            />
                            <path
                              className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                              d="M89.90852,48.64067c.42822,1.94702,2.15234,3.27539,4.06665,3.27539,.29614,0,.59668-.03247,.89771-.09912,2.24829-.49341,3.67041-2.71558,3.177-4.96362-.84009-3.82251-2.19775-7.49341-4.04785-10.94946l7.52515-7.52588c1.62793-1.62793,1.62793-4.55981,0-6.18774-1.62646-1.62793-4.26685-1.62793-5.89307,0-.32227,.32227-.5813,.68384-.77588,1.06958l-11.39453,11.39551,1.80615,2.82275c2.20996,3.45288,3.77026,7.2085,4.63867,11.1626Z"
                            />
                            <path
                              className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                              d="M108.0323,60.07695c-.45581,0-.89453,.07324-1.30469,.20825h-16.10034l-.71875,3.27393c-.84326,3.83862-2.3418,7.49658-4.45312,10.86963-1.15576,1.84424-.89209,4.20972,.64307,5.75293,.8147,.81738,1.88428,1.22754,2.95459,1.22754,1.06299,0,2.12622-.40381,2.93945-1.21289,.69019-.68701,1.08887-1.55469,1.198-2.45166,1.69458-2.89429,3.03369-5.94824,4.0022-9.12451h10.63135c2.30176,0,4.37573-2.07397,4.37573-4.37573,0-2.302-1.86548-4.16748-4.16748-4.16748Z"
                            />
                            <path
                              className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                              d="M88.94075,94.85918l-11.39697-11.39551-2.82373,1.80688c-3.4502,2.20923-7.20605,3.77051-11.16187,4.63965-2.24805,.49316-3.67017,2.71533-3.17676,4.96362,.49487,2.24805,2.71704,3.68237,4.96436,3.17603,3.82397-.83838,7.49414-2.19604,10.9502-4.04688l7.52588,7.52417c.81323,.81396,1.95337,1.22095,3.09375,1.22095,1.13965,0,2.28003-.40698,3.09302-1.22095,1.62793-1.62793,1.62793-4.26514,0-5.89307-.32129-.32251-.68286-.57959-1.06787-.7749Z"
                            />
                            <path
                              className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                              d="M51.91438,90.62822l-3.27441-.71948c-3.83789-.8418-7.49585-2.33936-10.87549-4.45581-1.85083-1.15747-4.22021-.88232-5.76123,.66089-1.62305,1.63281-1.61646,4.27173,.01562,5.89478,.68457,.68042,1.54565,1.07446,2.4353,1.18188,2.89526,1.69629,5.94995,3.03613,9.12524,4.00317v10.64966c0,2.302,2.07324,4.35645,4.37524,4.35645,2.30176,0,4.16748-1.86572,4.16748-4.16748,0-.4541-.07324-.89209-.20776-1.30225v-16.10181Z"
                            />
                            <path
                              className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                              d="M22.29036,63.55913c-.49414-2.24829-2.71387-3.66626-4.96436-3.17627-2.24805,.49341-3.67017,2.71533-3.17676,4.96362,.83984,3.82251,2.19751,7.4917,4.04785,10.94946l-7.52515,7.52588c-1.62793,1.62793-1.62793,4.55981,0,6.18774,.81299,.81396,1.88013,1.22095,2.94653,1.22095,1.06616,0,2.1333-.40698,2.94653-1.22095,.32227-.32227,.58105-.68384,.77563-1.06958l11.39453-11.3938-1.80615-2.82446c-2.20972-3.45288-3.77002-7.20996-4.63867-11.1626Z"
                            />
                            <path
                              className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                              d="M22.29036,48.64067c.84326-3.84033,2.3418-7.49805,4.45312-10.86963,1.15576-1.84424,.89209-4.20972-.64307-5.75293-1.62378-1.62793-4.26172-1.6394-5.8938-.01465-.69019,.68701-1.08911,1.55469-1.198,2.45166-1.69409,2.89258-3.03369,5.94824-4.00244,9.12451H4.37508C2.07307,43.57964,.00008,45.65337,.00008,47.95537s1.86548,4.16748,4.16748,4.16748c.45581,0,.89453-.07324,1.30469-.20825H21.57161l.71875-3.27393Z"
                            />
                            <path
                              className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                              d="M23.25813,17.34063l11.39624,11.39551,2.823-1.80688c3.4519-2.20923,7.20752-3.77051,11.16333-4.63965,2.24829-.49341,3.67017-2.71533,3.177-4.96362-.49487-2.24829-2.71777-3.67749-4.96436-3.17603-3.82397,.83838-7.49414,2.19604-10.95117,4.04688l-7.5249-7.52417c-1.62646-1.62793-4.56079-1.62793-6.18701,0-1.62793,1.62793-1.62793,4.26514,0,5.89307,.32153,.32251,.68286,.57959,1.06787,.7749Z"
                            />
                            <path
                              className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                              d="M38.0804,74.19585c.81323,.81079,1.87695,1.21436,2.94092,1.21436,1.06958,0,2.13916-.40845,2.95312-1.22729l12.13184-12.18359,12.15747,12.15747c.81323,.81396,1.88013,1.22095,2.94653,1.22095s2.1333-.40698,2.94653-1.22095c1.62793-1.62793,1.62793-4.26514,0-5.89307l-12.17017-12.17017,12.14502-12.19653c1.62378-1.63135,1.61816-4.26855-.01221-5.89307-1.63135-1.62646-4.271-1.62158-5.89404,.01294l-12.13184,12.18359-12.15747-12.15747c-1.62622-1.62793-4.26685-1.62793-5.89307,0-1.62793,1.62793-1.62793,4.26514,0,5.89307l12.17017,12.16992-12.14502,12.19678c-1.62378,1.63135-1.61816,4.26855,.01221,5.89307Z"
                            />
                          </svg>
                        </span>
                        <span className="ml-2">Repair Without Spare Parts</span>
                      </li>
                      <li className="dropdown-item d-flex align-items-center cursor-pointer" onClick={() => history.push("/RepairPartList")} style={{ cursor: "pointer" }}>
                        <span className="span-icon">
                          <svg
                            id="uuid-ae0f5633-9fa9-459c-9052-9dfe57b47331"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 107.9045 107.90369"
                          >
                            <path
                              className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                              d="M94.36018-.00005H13.54426C6.07624-.00005,.00007,6.07539,.00007,13.54439V94.35933C.00007,101.82832,6.07624,107.90376,13.54426,107.90376H94.36018c7.46802,0,13.54419-6.07544,13.54419-13.54443V13.54439C107.90437,6.07539,101.82819-.00005,94.36018-.00005ZM8.33503,40.92769H99.5694v26.04688H8.33503v-26.04688ZM13.54426,8.33491H94.36018c2.87256,0,5.20923,2.33789,5.20923,5.20947v19.04834H8.33503V13.54439c0-2.87158,2.33691-5.20947,5.20923-5.20947ZM94.36018,99.5688H13.54426c-2.87231,0-5.20923-2.33789-5.20923-5.20947v-19.0498H99.5694v19.0498c0,2.87158-2.33667,5.20947-5.20923,5.20947Z"
                            />
                            <path
                              className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                              d="M49.25788,25.13838h34.5061c2.302,0,4.16748-1.86548,4.16748-4.16748s-1.86548-4.16748-4.16748-4.16748H49.25788c-2.302,0-4.16748,1.86548-4.16748,4.16748s1.86548,4.16748,4.16748,4.16748Z"
                            />
                            <path
                              className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                              d="M24.14045,25.13838h8.62646c2.30176,0,4.16748-1.86548,4.16748-4.16748s-1.86572-4.16748-4.16748-4.16748h-8.62646c-2.30176,0-4.16748,1.86548-4.16748,4.16748s1.86572,4.16748,4.16748,4.16748Z"
                            />
                            <path
                              className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                              d="M83.76399,84.16695H49.25788c-2.302,0-4.16748,1.86572-4.16748,4.16748s1.86548,4.16748,4.16748,4.16748h34.5061c2.302,0,4.16748-1.86572,4.16748-4.16748s-1.86548-4.16748-4.16748-4.16748Z"
                            />
                            <path
                              className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                              d="M32.76691,84.16695h-8.62646c-2.30176,0-4.16748,1.86572-4.16748,4.16748s1.86572,4.16748,4.16748,4.16748h8.62646c2.30176,0,4.16748-1.86572,4.16748-4.16748s-1.86572-4.16748-4.16748-4.16748Z"
                            />
                            <path
                              className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                              d="M58.6468,49.78511H24.14045c-2.30176,0-4.16748,1.86572-4.16748,4.16748,0,2.302,1.86572,4.16748,4.16748,4.16748H58.6468c2.302,0,4.16748-1.86548,4.16748-4.16748,0-2.30176-1.86548-4.16748-4.16748-4.16748Z"
                            />
                            <path
                              className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                              d="M83.76399,49.78511h-8.62622c-2.302,0-4.16748,1.86572-4.16748,4.16748,0,2.302,1.86548,4.16748,4.16748,4.16748h8.62622c2.302,0,4.16748-1.86548,4.16748-4.16748,0-2.30176-1.86548-4.16748-4.16748-4.16748Z"
                            />
                          </svg>
                        </span>
                        <span className="ml-2">Part List</span>
                      </li>
                      <li className="dropdown-item d-flex align-items-center cursor-pointer" onClick={() => history.push("/RepairStandardJobs")} style={{ cursor: "pointer" }}>
                        <span className="span-icon">
                          <svg
                            id="uuid-71879914-eb74-479f-b04a-3a9b28cfee15"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 151.95043 151.95043"
                          >
                            <path
                              className="uuid-9972911a-1196-4d43-af73-f34e27885483"
                              d="M139.39358,58.182c-2.84985-1.0127-5.05566-3.10938-6.21313-5.90283-1.15649-2.79346-1.07935-5.83618,.21899-8.56616,3.47559-7.31274,2.02271-15.7356-3.7019-21.46094-5.72705-5.72534-14.1499-7.17578-21.46094-3.7019-2.73071,1.29736-5.77344,1.37549-8.56616,.21826-2.79346-1.15601-4.8894-3.36328-5.90283-6.2124C91.05471,4.92761,84.0701-.00013,75.97366-.00013,67.87796-.00013,60.89407,4.92932,58.18216,12.55603c-1.01343,2.84912-3.10938,5.0564-5.90308,6.2124-2.79272,1.15894-5.83594,1.08081-8.56689-.21826-7.31421-3.47876-15.73633-2.02197-21.46021,3.7019-5.72534,5.72534-7.17822,14.1499-3.70166,21.46094,1.29736,2.72998,1.37476,5.77271,.21802,8.56616-1.15747,2.79346-3.36328,4.89014-6.21118,5.90283C4.92849,60.89416,.00003,67.8778,.00003,75.97522s4.92847,15.08105,12.55615,17.79321c2.84888,1.0127,5.05469,3.10938,6.21216,5.90283,1.15674,2.79346,1.07935,5.83618-.21802,8.56616-3.47656,7.31104-2.02368,15.7356,3.70093,21.46094,5.72632,5.72388,14.15161,7.17578,21.46167,3.7019,2.73096-1.29907,5.77344-1.37549,8.56616-.21826,2.7937,1.15601,4.88965,3.36328,5.90308,6.21216,2.71191,7.62695,9.6958,12.5564,17.7915,12.5564h.00073c8.0957,0,15.08032-4.92944,17.79321-12.5564,1.01343-2.84888,3.10938-5.05615,5.90283-6.21216,2.79346-1.15723,5.83691-1.08081,8.56616,.21826,7.31274,3.47876,15.73633,2.02344,21.46094-3.7019s7.17749-14.14819,3.7019-21.46094c-1.29834-2.72998-1.37549-5.77271-.21899-8.56616,1.15747-2.79346,3.36328-4.89014,6.21216-5.90283,7.62842-2.71216,12.55786-9.6958,12.55786-17.79321s-4.92944-15.08105-12.55688-17.79321Zm-2.7937,27.7334c-5.02539,1.78735-9.07812,5.63916-11.11938,10.56689-2.0415,4.92773-1.89819,10.51636,.39136,15.33325,2.35645,4.95703,.47705,9.4436-2.06812,11.98804-2.54614,2.54614-7.03271,4.4248-11.98901,2.06909-4.81689-2.29199-10.40796-2.43384-15.33423-.39233-4.92773,2.0415-8.77856,6.09497-10.56592,11.12036-1.8396,5.17188-6.34082,7.01489-9.94019,7.01489s-8.10059-1.84302-9.93921-7.01489c-1.78662-5.02539-5.63843-9.07886-10.56616-11.12036-2.31226-.95703-4.76978-1.43408-7.22534-1.43408-2.77734,0-5.55298,.61035-8.10962,1.82642-4.95776,2.35889-9.44434,.47705-11.98804-2.06909-2.54541-2.54443-4.4248-7.03101-2.06836-11.98804,2.28979-4.81689,2.43213-10.40552,.39062-15.33496-2.04053-4.92773-6.09399-8.77783-11.11938-10.56519-5.17188-1.8396-7.01392-6.34082-7.01392-9.94019s1.84204-8.10059,7.01465-9.94019c5.02466-1.78735,9.07812-5.63745,11.11865-10.56519,2.0415-4.92944,1.89917-10.51807-.39062-15.33496-2.35645-4.95703-.47705-9.4436,2.06738-11.98804,2.54614-2.54785,7.03369-4.42627,11.98975-2.06909,4.81714,2.29053,10.40405,2.43213,15.33423,.39233,4.92773-2.0415,8.77856-6.09497,10.56616-11.12036,1.83862-5.17188,6.33984-7.01489,9.93921-7.01489s8.10059,1.84302,9.94019,7.01489c1.78735,5.02539,5.63818,9.07886,10.56592,11.12036,4.927,2.0415,10.5166,1.89966,15.33423-.39233,4.95532-2.35718,9.44287-.47876,11.98901,2.06909,2.54517,2.54443,4.42456,7.03101,2.06812,11.98804-2.28955,4.81689-2.43286,10.40552-.39136,15.33325,2.04126,4.92773,6.09399,8.77954,11.12012,10.56689,5.17212,1.8396,7.01489,6.34082,7.01489,9.94019s-1.84277,8.10059-7.01562,9.94019Z"
                            />
                            <path
                              className="uuid-9972911a-1196-4d43-af73-f34e27885483"
                              d="M98.96804,53.23645h-4.44678v-6.35547c0-5.32007-4.32788-9.64868-9.64697-9.64868h-17.79907c-5.31909,0-9.64697,4.32861-9.64697,9.64868v6.35547h-4.44678c-7.46802,0-13.54419,6.07544-13.54419,13.54419v30.02393c0,7.46875,6.07617,13.54419,13.54419,13.54419h45.98657c7.46802,0,13.54419-6.07544,13.54419-13.54419v-30.02393c0-7.46875-6.07617-13.54419-13.54419-13.54419Zm-33.20483-6.35547c0-.72437,.58862-1.31372,1.31201-1.31372h17.79907c.72363,0,1.31201,.58936,1.31201,1.31372v6.35547h-20.4231v-6.35547Zm-12.78174,14.69043h45.98657c2.87231,0,5.20923,2.33765,5.20923,5.20923v6.48901H47.77224v-6.48901c0-2.87158,2.33691-5.20923,5.20923-5.20923Zm45.98657,40.44238H52.98147c-2.87231,0-5.20923-2.33765-5.20923-5.20923v-15.19995h56.40503v15.19995c0,2.87158-2.33691,5.20923-5.20923,5.20923Z"
                            />
                          </svg>
                        </span>
                        <span className="ml-2">Standard Job</span>
                      </li>
                      <li className="dropdown-item d-flex align-items-center cursor-pointer" onClick={() => history.push("/RepairKits")} style={{ cursor: "pointer" }}>
                        <span className="span-icon">
                          <svg
                            id="uuid-8b9cd8c2-8c40-4465-a1fa-23edb937326d"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 108.98463 118.98497"
                          >
                            <path
                              className="uuid-c202c004-106f-49a6-aa14-c5d8120b224f"
                              d="M95.44022,21.28183h-14.42578V12.68637C81.01443,5.69125,75.32327,.00009,68.32791,.00009h-27.67041C33.66214,.00009,27.97098,5.69125,27.97098,12.68637v8.59546H13.54422C6.0762,21.28183,.00003,27.35727,.00003,34.82626V105.44052C.00003,112.90951,6.0762,118.98495,13.54422,118.98495H95.44022c7.46826,0,13.54443-6.07544,13.54443-13.54443V34.82626c0-7.46899-6.07617-13.54443-13.54443-13.54443ZM36.30594,12.68637c0-2.39966,1.9519-4.35132,4.35156-4.35132h27.67041c2.39966,0,4.35156,1.95166,4.35156,4.35132v8.59546H36.30594V12.68637ZM100.64969,105.44052c0,2.87183-2.33691,5.20947-5.20947,5.20947H13.54422c-2.87231,0-5.20923-2.33765-5.20923-5.20947V34.82626c0-2.87183,2.33691-5.20947,5.20923-5.20947H95.44022c2.87256,0,5.20947,2.33765,5.20947,5.20947V105.44052Z"
                            />
                            <path
                              className="uuid-c202c004-106f-49a6-aa14-c5d8120b224f"
                              d="M72.72098,76.62314H36.26443c-2.30176,0-4.16748,1.86572-4.16748,4.16748s1.86572,4.16748,4.16748,4.16748h36.45654c2.302,0,4.16748-1.86572,4.16748-4.16748s-1.86548-4.16748-4.16748-4.16748Z"
                            />
                            <path
                              className="uuid-c202c004-106f-49a6-aa14-c5d8120b224f"
                              d="M72.72098,93.21664H36.26443c-2.30176,0-4.16748,1.86548-4.16748,4.16748,0,2.30176,1.86572,4.16748,4.16748,4.16748h36.45654c2.302,0,4.16748-1.86572,4.16748-4.16748,0-2.302-1.86548-4.16748-4.16748-4.16748Z"
                            />
                            <path
                              className="uuid-c202c004-106f-49a6-aa14-c5d8120b224f"
                              d="M48.24271,67.07382l21.24536-21.24463c1.62793-1.62622,1.62793-4.26514,0-5.89307-1.62646-1.62793-4.26685-1.62793-5.89307,0l-15.35229,15.35156-6.26733-6.26758c-1.62646-1.62793-4.26709-1.62793-5.89331,0-1.62793,1.62793-1.62793,4.26514,0,5.89307l12.16064,12.16064Z"
                            />
                          </svg>
                        </span>
                        <span className="ml-2">Kit</span>
                      </li>
                      <li className="dropdown-item d-flex align-items-center cursor-pointer" onClick={() => history.push("/portfolio")} style={{ cursor: "pointer" }}>
                        <span className="span-icon">
                          <svg
                            id="uuid-fd97eedc-9e4d-4a33-a68e-8d9f474ba343"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 119.30736 133.59966"
                          >
                            <path
                              className="uuid-e6c3fd4e-386b-4059-8b00-0f6ea13faef9"
                              d="M119.3072,35.67679c-.00098-.24805-.03125-.49072-.0752-.72974-.01123-.06348-.02441-.12573-.03857-.18799-.05225-.22827-.11768-.45239-.20703-.66675l-.021-.04858c-.09033-.20923-.20215-.40698-.3252-.59839-.03369-.05298-.06836-.10449-.10498-.15576-.13037-.18457-.27197-.36133-.43164-.52295-.00732-.00781-.01367-.0166-.02148-.02441-.16553-.16504-.3501-.31226-.54395-.44897-.0542-.03784-.10889-.073-.16455-.1084-.05908-.0376-.11377-.08057-.17529-.11548L61.71247,.54446c-1.27637-.72607-2.84082-.72607-4.11719,0L2.10895,32.06937c-.06152,.03491-.11621,.07788-.17529,.11548-.05566,.0354-.11035,.07056-.16406,.1084-.19434,.13672-.37891,.28394-.54443,.44897-.00781,.00781-.01367,.0166-.02148,.02441-.15967,.16162-.30078,.33838-.43164,.52295-.03613,.05127-.0708,.10278-.10498,.15576-.12305,.19141-.23486,.38916-.32471,.59839-.00732,.01636-.01465,.03198-.02148,.04858-.08936,.21436-.1543,.43848-.20703,.66675-.01416,.06226-.02734,.12451-.03857,.18799-.04346,.23901-.07422,.48169-.0752,.72974l.00049,.01001-.00049,.0061v63.37842l59.65381,34.52832,59.65332-34.52832V35.6929l-.00049-.0061,.00049-.01001ZM59.65387,8.96097l47.10889,26.76636-18.42969,10.66675L43.24177,18.28592l16.41211-9.32495Zm4.16748,61.25146l21.55762-12.47778v51.34448l-21.55762,12.47754v-51.34424ZM35.00007,22.96854l45.16357,28.15381-20.50977,11.87085L12.54499,35.72732l22.45508-12.75879ZM8.33503,42.92117l47.15137,27.29126v51.34424L8.33503,94.26565V42.92117Zm85.37891,61.33374V52.91043l17.2583-9.98926v51.34448l-17.2583,9.98926Z"
                            />
                          </svg>
                        </span>
                        <span className="ml-2">Portfolio and bundle</span>
                      </li>
                      <li className="dropdown-item d-flex align-items-center cursor-pointer" onClick={() => history.push("/solutionBuilder/analytics")} style={{ cursor: "pointer" }}>
                        <span className="span-icon">
                          <svg
                            id="uuid-adbb1b3a-fca6-467b-8c3d-db09204755c3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 81.62979 116.87821"
                          >
                            <path
                              className="uuid-322628f2-10a6-44ac-aa71-55f4711f8daf"
                              d="M54.9899,30.69582l-18.76758,18.76685-9.58301-9.58203c-1.62646-1.62793-4.26611-1.62793-5.89404,0-1.62695,1.62793-1.62695,4.26685,.00098,5.89307l15.47607,15.4751,24.66016-24.65991c1.62793-1.62622,1.62793-4.26514,0-5.89307-1.62598-1.62793-4.2666-1.62793-5.89258,0Z"
                            />
                            <path
                              className="uuid-322628f2-10a6-44ac-aa71-55f4711f8daf"
                              d="M68.0319,10.39748C59.39811,2.66628,47.78873-1.04539,36.17155,.25539,17.47672,2.32448,2.37662,17.39088,.26725,36.07961c-1.22119,10.81738,1.77246,21.44458,8.43164,29.92285,5.32715,6.78345,8.14355,14.52588,8.14355,22.39038v4.50439c.00098,13.22363,10.75879,23.98096,23.98096,23.98096s23.97998-10.75732,23.97998-23.98096v-4.53857c0-7.86938,2.80078-15.70142,7.8877-22.05347,5.76416-7.19873,8.93848-16.25317,8.93848-25.49341,0-11.59082-4.95605-22.677-13.59766-30.41431Zm-1.84766,50.69824c-6.26514,7.82373-9.71582,17.50684-9.71582,27.26294v4.53857c0,8.62817-7.01758,15.646-15.64502,15.646-8.62646,0-15.64502-7.01953-15.646-15.646v-4.50439c0-.10718-.00586-.21362-.00684-.3208h18.39453c2.30176,0,4.16699-1.86548,4.16699-4.16748,0-2.30176-1.86523-4.16748-4.16699-4.16748H25.01139c-.25195,0-.49609,.03149-.73633,.07422-1.4082-6.70117-4.45361-13.14014-9.02148-18.95654-5.29736-6.74438-7.67822-15.21118-6.70361-23.84082,1.67676-14.85327,13.6792-26.82983,28.53906-28.47583,9.40527-1.0271,18.41162,1.82666,25.3833,8.06812,6.87793,6.15845,10.82227,14.98169,10.82227,24.20557,0,7.46069-2.45898,14.47388-7.11035,20.28394Z"
                            />
                          </svg>
                        </span>
                        <span className="ml-2">Solution builder</span>
                      </li>
                      <li className="dropdown-item dropdown-last-item d-flex align-items-center cursor-pointer" onClick={() => history.push("/SolutionQuote")} style={{ cursor: "pointer" }}>
                        <span className="span-icon">
                          <svg
                            id="uuid-44f21729-ee7f-4ae1-a13f-50d052182172"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 79.7229 111.22266"
                          >
                            <path
                              className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                              d="M23.03735,73.64893h13.76392c2.24805,0,4.07007-1.82227,4.07007-4.07031s-1.82202-4.07007-4.07007-4.07007h-13.76392c-2.24805,0-4.07007,1.82202-4.07007,4.07007s1.82202,4.07031,4.07007,4.07031Z"
                            />
                            <path
                              className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                              d="M56.6853,83.09131H23.03735c-2.24805,0-4.07007,1.82178-4.07007,4.07007,0,2.24805,1.82202,4.07007,4.07007,4.07007H56.6853c2.24805,0,4.07007-1.82202,4.07007-4.07007,0-2.24829-1.82202-4.07007-4.07007-4.07007Z"
                            />
                            <path
                              className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                              d="M29.16724,40.16895l17.03101-17.03101c1.58984-1.59009,1.58984-4.16553,0-5.75562-1.58813-1.58984-4.16699-1.58984-5.75537,0l-11.27563,11.27563-3.52002-3.52002c-1.58813-1.58984-4.16699-1.58984-5.75537,0-1.58984,1.58984-1.58984,4.16553,0,5.75537l9.27539,9.27563Z"
                            />
                            <path
                              className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                              d="M56.6853,47.92578H23.03735c-2.24805,0-4.07007,1.82227-4.07007,4.07031s1.82202,4.07007,4.07007,4.07007H56.6853c2.24805,0,4.07007-1.82202,4.07007-4.07007s-1.82202-4.07031-4.07007-4.07031Z"
                            />
                            <path
                              className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                              d="M67.15942,0H0V111.22266H79.7229V12.56348c0-6.92725-5.63623-12.56348-12.56348-12.56348Zm4.4231,103.08252H8.14014V8.14038h59.01929c2.43896,0,4.4231,1.98413,4.4231,4.4231V103.08252Z"
                            />
                          </svg>
                        </span>
                        <span className="ml-2">Quote</span>
                      </li>
                    </div>
                  </div> */}
                  <div className="input-group-prepend align-items-center d-none">
                    <div className="w-100 mx-2">
                      <div className="machine-droped d-flex align-items-center bg-white">
                        <div>
                          <label
                            className="label-div"
                            style={{ whiteSpace: "pre" }}
                          >
                            Quote Type
                          </label>
                        </div>
                        <FormControl className="" sx={{ m: 1 }}>
                          <Select
                            id="demo-simple-select-autowidth"
                            value={age}
                            onChange={handleChangedrop}
                            autoWidth
                          >
                            <MenuItem value="5">
                              <em>Repair Quote</em>
                            </MenuItem>
                            <MenuItem value={10}>Repair Quote</MenuItem>
                            <MenuItem value={21}>Twenty one</MenuItem>
                            <MenuItem value={22}>
                              Twenty one and a half
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className="drop-down animated flipInX d-md-none">
                    <form action="#">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                    </form>
                  </div>
                </div>
              </li>
              <li className="icons dropdown custom-modal">
                <a
                  className="header-li-text"
                  href="javascript:void(0)"
                  data-toggle="dropdown"
                >
                  {/* <img src={notificationIcon}></img> */}
                  {/* <span className="badge badge-pill gradient-2">3</span> */}
                  <div>
                    <svg
                      fill="#FFFFFF"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      width="24px"
                      height="24px"
                    >
                      <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                    </svg>
                  </div>
                  {/* <div className="li-contant">Search</div> */}
                </a>
                <div
                  className="drop-down animated fadeIn dropdown-menu dropdown-notfication p-0 border-radius-1"
                  style={{ minWidth: "600px !important" }}
                >
                  {/* <div className="dropdown-content-heading ">
                    <div className="d-flex">
                      <div class="input-group icons border overflow-hidden">
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                          <SearchIcon/></span>
                        </div>
                          <input type="search" class="form-control search-form-control"  aria-label="Search Dashboard"/>
                         </div>
                    </div>
                  </div> */}
                  <div className="dropdown-content-body m-2">
                    {/* <div className="p-4 bg-light-grey">
                    <h6 className="mb-0">GO TO</h6>
                  </div> */}
                    <div className="bg-white p-3">
                      <div className="row search-dropdown-list">
                        <div className="col-md-3 col-sm-3 ">
                          <div
                            className="dropdown-item border-radius-1 bg-light-grey border cursor-pointer white-space-normal height-82"
                            onClick={() =>
                              history.push("/RepairWithSpareParts")
                            }
                            style={{
                              cursor: "pointer",
                              height: "93px !important",
                            }}
                          >
                            <span className="span-icon">
                              <svg
                                id="uuid-7dbd4a75-0a07-4ebd-ae99-a9c37850cf3f"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 112.19978 112.19978"
                              >
                                <path
                                  className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                                  d="M70.48758,41.40459l-20.55005,20.55103-8.22607-8.22607c-1.62622-1.62793-4.2666-1.62793-5.89307,0-1.62793,1.62793-1.62793,4.26514,0,5.89307l14.11914,14.11914,26.44312-26.44409c1.62793-1.62793,1.62793-4.26685,0-5.89307-1.62622-1.62793-4.26685-1.62793-5.89307,0Z"
                                />
                                <path
                                  className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                                  d="M60.28445,21.57158l3.27466,.71948c3.83789,.8418,7.49561,2.33936,10.87524,4.45581,.76587,.47852,1.62134,.71289,2.47046,.71289,1.19727,0,2.38159-.46558,3.28271-1.36743,1.62793-1.62793,1.62793-4.26514,0-5.89307-.68555-.6853-1.5498-1.08252-2.44287-1.18994-2.89502-1.69629-5.94995-3.03613-9.12524-4.00317V4.35625C68.61942,2.05449,66.54642,.00005,64.24442,.00005s-4.16748,1.86548-4.16748,4.16748c0,.4541,.07251,.89209,.20752,1.30225V21.57158Z"
                                />
                                <path
                                  className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                                  d="M89.90872,48.64067c.42798,1.94702,2.1521,3.27539,4.06641,3.27539,.29639,0,.59668-.03247,.89795-.09912,2.24805-.49341,3.66992-2.71558,3.17676-4.96362-.83984-3.82251-2.19775-7.49341-4.04785-10.94946l7.52515-7.52588c1.62793-1.62793,1.62793-4.55981,0-6.18774-1.62622-1.62793-4.26685-1.62793-5.89307,0-.32227,.32227-.5813,.68384-.77563,1.06958l-11.39478,11.39551,1.80615,2.82275c2.20996,3.45288,3.77026,7.2085,4.63892,11.1626Z"
                                />
                                <path
                                  className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                                  d="M108.03226,60.07695c-.45581,0-.89453,.07324-1.30469,.20825h-16.1001l-.71875,3.27393c-.84326,3.83862-2.3418,7.49658-4.45312,10.86963-1.16162,1.85254-.89136,4.22437,.6582,5.76611,.81323,.80908,1.87646,1.21265,2.93945,1.21265,1.07031,0,2.13989-.41016,2.95459-1.22729,.68042-.68555,1.07446-1.54492,1.18188-2.43555,1.69458-2.89429,3.03442-5.94824,4.00317-9.12451h10.6311c2.30176,0,4.37573-2.07397,4.37573-4.37573,0-2.302-1.86548-4.16748-4.16748-4.16748Z"
                                />
                                <path
                                  className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                                  d="M88.94095,94.85918l-11.39722-11.39551-2.82349,1.80688c-3.45044,2.20923-7.20605,3.77051-11.16211,4.63965-2.24805,.49316-3.66992,2.71533-3.17676,4.96362,.49487,2.24805,2.71704,3.67896,4.96436,3.17603,3.82397-.83838,7.49414-2.19604,10.9502-4.04688l7.52588,7.52417c.81323,.81396,1.95361,1.22095,3.09375,1.22095,1.13965,0,2.28003-.40698,3.09326-1.22095,1.62793-1.62793,1.62793-4.26514,0-5.89307-.32153-.32251-.68311-.57959-1.06787-.7749Z"
                                />
                                <path
                                  className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                                  d="M51.91458,90.62993l-3.27295-.71973c-3.84277-.84473-7.50073-2.34424-10.87695-4.45728-1.85107-1.15894-4.22046-.88403-5.76123,.66089-1.62305,1.63281-1.6167,4.27173,.01538,5.89478,.68457,.68042,1.54565,1.07446,2.4353,1.18188,2.89282,1.69482,5.94849,3.03442,9.12549,4.00317v10.64966c0,2.302,2.073,4.35645,4.375,4.35645,2.30176,0,4.16748-1.86572,4.16748-4.16748,0-.4541-.07324-.89209-.20752-1.30225v-16.1001Z"
                                />
                                <path
                                  className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                                  d="M22.29031,63.55913c-.4939-2.24829-2.71362-3.66943-4.96436-3.17627-2.24805,.49341-3.67017,2.71533-3.17676,4.96362,.83984,3.82251,2.19751,7.4917,4.04761,10.94946l-7.5249,7.52588c-.78711,.78613-1.2876,2.00391-1.28198,3.11572,.00562,1.11206,.51685,2.32153,1.31128,3.09961,.81152,.79614,1.86475,1.19165,2.91724,1.19165,1.08008,0,2.16016-.41821,2.97656-1.25024,.30786-.31421,.55518-.66406,.7439-1.03687l11.39648-11.39551-1.80615-2.82446c-2.20996-3.45288-3.77051-7.20996-4.63892-11.1626Z"
                                />
                                <path
                                  className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                                  d="M22.29031,48.64067c.84326-3.84033,2.3418-7.49805,4.45337-10.86963,1.15576-1.84424,.89209-4.20972-.64307-5.75293-1.62402-1.62964-4.26196-1.6394-5.89404-.01465-.69019,.68701-1.08911,1.55469-1.19824,2.45166-1.69385,2.89258-3.03345,5.94824-4.0022,9.12451H4.37503C2.07327,43.57964,.00003,45.65337,.00003,47.95537s1.86572,4.16748,4.16748,4.16748c.45581,0,.89453-.07324,1.30469-.20825H21.57156l.71875-3.27393Z"
                                />
                                <path
                                  className="uuid-094be2a2-bdd0-48f2-946c-8c4d79ac75bb"
                                  d="M23.25809,17.34063l11.39624,11.39551,2.823-1.80688c3.4519-2.20923,7.20752-3.77051,11.16333-4.63965,2.24829-.49341,3.67017-2.71533,3.177-4.96362-.49487-2.24829-2.71777-3.67261-4.96436-3.17603-3.82397,.83838-7.49414,2.19604-10.95093,4.04688l-7.52515-7.52417c-1.62622-1.62622-4.56079-1.62964-6.18701,0-1.62793,1.62793-1.62793,4.26514,0,5.89307,.32153,.32251,.68286,.57959,1.06787,.7749Z"
                                />
                              </svg>
                            </span>
                            <h6 className="mt-2">Repair Options</h6>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                          <div
                            className="dropdown-item border-radius-1 cursor-pointer bg-light-grey border white-space-normal height-82"
                            onClick={() => history.push("/RepairPartList")}
                            style={{ cursor: "pointer" }}
                          >
                            <span className="span-icon">
                              <svg
                                id="uuid-ae0f5633-9fa9-459c-9052-9dfe57b47331"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 107.9045 107.90369"
                              >
                                <path
                                  className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                                  d="M94.36018-.00005H13.54426C6.07624-.00005,.00007,6.07539,.00007,13.54439V94.35933C.00007,101.82832,6.07624,107.90376,13.54426,107.90376H94.36018c7.46802,0,13.54419-6.07544,13.54419-13.54443V13.54439C107.90437,6.07539,101.82819-.00005,94.36018-.00005ZM8.33503,40.92769H99.5694v26.04688H8.33503v-26.04688ZM13.54426,8.33491H94.36018c2.87256,0,5.20923,2.33789,5.20923,5.20947v19.04834H8.33503V13.54439c0-2.87158,2.33691-5.20947,5.20923-5.20947ZM94.36018,99.5688H13.54426c-2.87231,0-5.20923-2.33789-5.20923-5.20947v-19.0498H99.5694v19.0498c0,2.87158-2.33667,5.20947-5.20923,5.20947Z"
                                />
                                <path
                                  className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                                  d="M49.25788,25.13838h34.5061c2.302,0,4.16748-1.86548,4.16748-4.16748s-1.86548-4.16748-4.16748-4.16748H49.25788c-2.302,0-4.16748,1.86548-4.16748,4.16748s1.86548,4.16748,4.16748,4.16748Z"
                                />
                                <path
                                  className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                                  d="M24.14045,25.13838h8.62646c2.30176,0,4.16748-1.86548,4.16748-4.16748s-1.86572-4.16748-4.16748-4.16748h-8.62646c-2.30176,0-4.16748,1.86548-4.16748,4.16748s1.86572,4.16748,4.16748,4.16748Z"
                                />
                                <path
                                  className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                                  d="M83.76399,84.16695H49.25788c-2.302,0-4.16748,1.86572-4.16748,4.16748s1.86548,4.16748,4.16748,4.16748h34.5061c2.302,0,4.16748-1.86572,4.16748-4.16748s-1.86548-4.16748-4.16748-4.16748Z"
                                />
                                <path
                                  className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                                  d="M32.76691,84.16695h-8.62646c-2.30176,0-4.16748,1.86572-4.16748,4.16748s1.86572,4.16748,4.16748,4.16748h8.62646c2.30176,0,4.16748-1.86572,4.16748-4.16748s-1.86572-4.16748-4.16748-4.16748Z"
                                />
                                <path
                                  className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                                  d="M58.6468,49.78511H24.14045c-2.30176,0-4.16748,1.86572-4.16748,4.16748,0,2.302,1.86572,4.16748,4.16748,4.16748H58.6468c2.302,0,4.16748-1.86548,4.16748-4.16748,0-2.30176-1.86548-4.16748-4.16748-4.16748Z"
                                />
                                <path
                                  className="uuid-ee13792e-286e-4dc4-8c1d-5f54ef7c9559"
                                  d="M83.76399,49.78511h-8.62622c-2.302,0-4.16748,1.86572-4.16748,4.16748,0,2.302,1.86548,4.16748,4.16748,4.16748h8.62622c2.302,0,4.16748-1.86548,4.16748-4.16748,0-2.30176-1.86548-4.16748-4.16748-4.16748Z"
                                />
                              </svg>
                            </span>
                            <h6 className="mt-2">Part List</h6>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                          <div
                            className="dropdown-item border-radius-1 cursor-pointer bg-light-grey border white-space-normal height-82"
                            onClick={() =>
                              history.push(REPAIR_SERVICE_PARTS_TEMPLATE)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <span className="span-icon">
                              <svg
                                id="uuid-71879914-eb74-479f-b04a-3a9b28cfee15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 151.95043 151.95043"
                              >
                                <path
                                  className="uuid-9972911a-1196-4d43-af73-f34e27885483"
                                  d="M139.39358,58.182c-2.84985-1.0127-5.05566-3.10938-6.21313-5.90283-1.15649-2.79346-1.07935-5.83618,.21899-8.56616,3.47559-7.31274,2.02271-15.7356-3.7019-21.46094-5.72705-5.72534-14.1499-7.17578-21.46094-3.7019-2.73071,1.29736-5.77344,1.37549-8.56616,.21826-2.79346-1.15601-4.8894-3.36328-5.90283-6.2124C91.05471,4.92761,84.0701-.00013,75.97366-.00013,67.87796-.00013,60.89407,4.92932,58.18216,12.55603c-1.01343,2.84912-3.10938,5.0564-5.90308,6.2124-2.79272,1.15894-5.83594,1.08081-8.56689-.21826-7.31421-3.47876-15.73633-2.02197-21.46021,3.7019-5.72534,5.72534-7.17822,14.1499-3.70166,21.46094,1.29736,2.72998,1.37476,5.77271,.21802,8.56616-1.15747,2.79346-3.36328,4.89014-6.21118,5.90283C4.92849,60.89416,.00003,67.8778,.00003,75.97522s4.92847,15.08105,12.55615,17.79321c2.84888,1.0127,5.05469,3.10938,6.21216,5.90283,1.15674,2.79346,1.07935,5.83618-.21802,8.56616-3.47656,7.31104-2.02368,15.7356,3.70093,21.46094,5.72632,5.72388,14.15161,7.17578,21.46167,3.7019,2.73096-1.29907,5.77344-1.37549,8.56616-.21826,2.7937,1.15601,4.88965,3.36328,5.90308,6.21216,2.71191,7.62695,9.6958,12.5564,17.7915,12.5564h.00073c8.0957,0,15.08032-4.92944,17.79321-12.5564,1.01343-2.84888,3.10938-5.05615,5.90283-6.21216,2.79346-1.15723,5.83691-1.08081,8.56616,.21826,7.31274,3.47876,15.73633,2.02344,21.46094-3.7019s7.17749-14.14819,3.7019-21.46094c-1.29834-2.72998-1.37549-5.77271-.21899-8.56616,1.15747-2.79346,3.36328-4.89014,6.21216-5.90283,7.62842-2.71216,12.55786-9.6958,12.55786-17.79321s-4.92944-15.08105-12.55688-17.79321Zm-2.7937,27.7334c-5.02539,1.78735-9.07812,5.63916-11.11938,10.56689-2.0415,4.92773-1.89819,10.51636,.39136,15.33325,2.35645,4.95703,.47705,9.4436-2.06812,11.98804-2.54614,2.54614-7.03271,4.4248-11.98901,2.06909-4.81689-2.29199-10.40796-2.43384-15.33423-.39233-4.92773,2.0415-8.77856,6.09497-10.56592,11.12036-1.8396,5.17188-6.34082,7.01489-9.94019,7.01489s-8.10059-1.84302-9.93921-7.01489c-1.78662-5.02539-5.63843-9.07886-10.56616-11.12036-2.31226-.95703-4.76978-1.43408-7.22534-1.43408-2.77734,0-5.55298,.61035-8.10962,1.82642-4.95776,2.35889-9.44434,.47705-11.98804-2.06909-2.54541-2.54443-4.4248-7.03101-2.06836-11.98804,2.28979-4.81689,2.43213-10.40552,.39062-15.33496-2.04053-4.92773-6.09399-8.77783-11.11938-10.56519-5.17188-1.8396-7.01392-6.34082-7.01392-9.94019s1.84204-8.10059,7.01465-9.94019c5.02466-1.78735,9.07812-5.63745,11.11865-10.56519,2.0415-4.92944,1.89917-10.51807-.39062-15.33496-2.35645-4.95703-.47705-9.4436,2.06738-11.98804,2.54614-2.54785,7.03369-4.42627,11.98975-2.06909,4.81714,2.29053,10.40405,2.43213,15.33423,.39233,4.92773-2.0415,8.77856-6.09497,10.56616-11.12036,1.83862-5.17188,6.33984-7.01489,9.93921-7.01489s8.10059,1.84302,9.94019,7.01489c1.78735,5.02539,5.63818,9.07886,10.56592,11.12036,4.927,2.0415,10.5166,1.89966,15.33423-.39233,4.95532-2.35718,9.44287-.47876,11.98901,2.06909,2.54517,2.54443,4.42456,7.03101,2.06812,11.98804-2.28955,4.81689-2.43286,10.40552-.39136,15.33325,2.04126,4.92773,6.09399,8.77954,11.12012,10.56689,5.17212,1.8396,7.01489,6.34082,7.01489,9.94019s-1.84277,8.10059-7.01562,9.94019Z"
                                />
                                <path
                                  className="uuid-9972911a-1196-4d43-af73-f34e27885483"
                                  d="M98.96804,53.23645h-4.44678v-6.35547c0-5.32007-4.32788-9.64868-9.64697-9.64868h-17.79907c-5.31909,0-9.64697,4.32861-9.64697,9.64868v6.35547h-4.44678c-7.46802,0-13.54419,6.07544-13.54419,13.54419v30.02393c0,7.46875,6.07617,13.54419,13.54419,13.54419h45.98657c7.46802,0,13.54419-6.07544,13.54419-13.54419v-30.02393c0-7.46875-6.07617-13.54419-13.54419-13.54419Zm-33.20483-6.35547c0-.72437,.58862-1.31372,1.31201-1.31372h17.79907c.72363,0,1.31201,.58936,1.31201,1.31372v6.35547h-20.4231v-6.35547Zm-12.78174,14.69043h45.98657c2.87231,0,5.20923,2.33765,5.20923,5.20923v6.48901H47.77224v-6.48901c0-2.87158,2.33691-5.20923,5.20923-5.20923Zm45.98657,40.44238H52.98147c-2.87231,0-5.20923-2.33765-5.20923-5.20923v-15.19995h56.40503v15.19995c0,2.87158-2.33691,5.20923-5.20923,5.20923Z"
                                />
                              </svg>
                            </span>
                            <h6 className="mt-2">Template</h6>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                          <div
                            className="dropdown-item cursor-pointer border-radius-1 bg-light-grey border white-space-normal height-82"
                            onClick={() => history.push("/RepairKits")}
                            style={{ cursor: "pointer" }}
                          >
                            <span className="span-icon">
                              <svg
                                id="uuid-8b9cd8c2-8c40-4465-a1fa-23edb937326d"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 108.98463 118.98497"
                              >
                                <path
                                  className="uuid-c202c004-106f-49a6-aa14-c5d8120b224f"
                                  d="M95.44022,21.28183h-14.42578V12.68637C81.01443,5.69125,75.32327,.00009,68.32791,.00009h-27.67041C33.66214,.00009,27.97098,5.69125,27.97098,12.68637v8.59546H13.54422C6.0762,21.28183,.00003,27.35727,.00003,34.82626V105.44052C.00003,112.90951,6.0762,118.98495,13.54422,118.98495H95.44022c7.46826,0,13.54443-6.07544,13.54443-13.54443V34.82626c0-7.46899-6.07617-13.54443-13.54443-13.54443ZM36.30594,12.68637c0-2.39966,1.9519-4.35132,4.35156-4.35132h27.67041c2.39966,0,4.35156,1.95166,4.35156,4.35132v8.59546H36.30594V12.68637ZM100.64969,105.44052c0,2.87183-2.33691,5.20947-5.20947,5.20947H13.54422c-2.87231,0-5.20923-2.33765-5.20923-5.20947V34.82626c0-2.87183,2.33691-5.20947,5.20923-5.20947H95.44022c2.87256,0,5.20947,2.33765,5.20947,5.20947V105.44052Z"
                                />
                                <path
                                  className="uuid-c202c004-106f-49a6-aa14-c5d8120b224f"
                                  d="M72.72098,76.62314H36.26443c-2.30176,0-4.16748,1.86572-4.16748,4.16748s1.86572,4.16748,4.16748,4.16748h36.45654c2.302,0,4.16748-1.86572,4.16748-4.16748s-1.86548-4.16748-4.16748-4.16748Z"
                                />
                                <path
                                  className="uuid-c202c004-106f-49a6-aa14-c5d8120b224f"
                                  d="M72.72098,93.21664H36.26443c-2.30176,0-4.16748,1.86548-4.16748,4.16748,0,2.30176,1.86572,4.16748,4.16748,4.16748h36.45654c2.302,0,4.16748-1.86572,4.16748-4.16748,0-2.302-1.86548-4.16748-4.16748-4.16748Z"
                                />
                                <path
                                  className="uuid-c202c004-106f-49a6-aa14-c5d8120b224f"
                                  d="M48.24271,67.07382l21.24536-21.24463c1.62793-1.62622,1.62793-4.26514,0-5.89307-1.62646-1.62793-4.26685-1.62793-5.89307,0l-15.35229,15.35156-6.26733-6.26758c-1.62646-1.62793-4.26709-1.62793-5.89331,0-1.62793,1.62793-1.62793,4.26514,0,5.89307l12.16064,12.16064Z"
                                />
                              </svg>
                            </span>
                            <h6 className="mt-2">Kit</h6>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3 mt-4">
                          <div
                            className="dropdown-item border-radius-1 cursor-pointer bg-light-grey border white-space-normal height-82"
                            onClick={() => history.push("/portfolio")}
                            style={{ cursor: "pointer" }}
                          >
                            <span className="span-icon">
                              <svg
                                id="uuid-fd97eedc-9e4d-4a33-a68e-8d9f474ba343"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 119.30736 133.59966"
                              >
                                <path
                                  className="uuid-e6c3fd4e-386b-4059-8b00-0f6ea13faef9"
                                  d="M119.3072,35.67679c-.00098-.24805-.03125-.49072-.0752-.72974-.01123-.06348-.02441-.12573-.03857-.18799-.05225-.22827-.11768-.45239-.20703-.66675l-.021-.04858c-.09033-.20923-.20215-.40698-.3252-.59839-.03369-.05298-.06836-.10449-.10498-.15576-.13037-.18457-.27197-.36133-.43164-.52295-.00732-.00781-.01367-.0166-.02148-.02441-.16553-.16504-.3501-.31226-.54395-.44897-.0542-.03784-.10889-.073-.16455-.1084-.05908-.0376-.11377-.08057-.17529-.11548L61.71247,.54446c-1.27637-.72607-2.84082-.72607-4.11719,0L2.10895,32.06937c-.06152,.03491-.11621,.07788-.17529,.11548-.05566,.0354-.11035,.07056-.16406,.1084-.19434,.13672-.37891,.28394-.54443,.44897-.00781,.00781-.01367,.0166-.02148,.02441-.15967,.16162-.30078,.33838-.43164,.52295-.03613,.05127-.0708,.10278-.10498,.15576-.12305,.19141-.23486,.38916-.32471,.59839-.00732,.01636-.01465,.03198-.02148,.04858-.08936,.21436-.1543,.43848-.20703,.66675-.01416,.06226-.02734,.12451-.03857,.18799-.04346,.23901-.07422,.48169-.0752,.72974l.00049,.01001-.00049,.0061v63.37842l59.65381,34.52832,59.65332-34.52832V35.6929l-.00049-.0061,.00049-.01001ZM59.65387,8.96097l47.10889,26.76636-18.42969,10.66675L43.24177,18.28592l16.41211-9.32495Zm4.16748,61.25146l21.55762-12.47778v51.34448l-21.55762,12.47754v-51.34424ZM35.00007,22.96854l45.16357,28.15381-20.50977,11.87085L12.54499,35.72732l22.45508-12.75879ZM8.33503,42.92117l47.15137,27.29126v51.34424L8.33503,94.26565V42.92117Zm85.37891,61.33374V52.91043l17.2583-9.98926v51.34448l-17.2583,9.98926Z"
                                />
                              </svg>
                            </span>
                            {/* <h6 className="mt-2">Portfolio and bundle</h6> */}
                            <h6 className="mt-2">
                              Portfolio, Bundles & Services
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3 mt-4">
                          <div
                            className="dropdown-item border-radius-1 cursor-pointer bg-light-grey border white-space-normal height-82"
                            onClick={() =>
                              history.push("/solutionBuilder/analytics")
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <span className="span-icon">
                              <svg
                                id="uuid-adbb1b3a-fca6-467b-8c3d-db09204755c3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 81.62979 116.87821"
                              >
                                <path
                                  className="uuid-322628f2-10a6-44ac-aa71-55f4711f8daf"
                                  d="M54.9899,30.69582l-18.76758,18.76685-9.58301-9.58203c-1.62646-1.62793-4.26611-1.62793-5.89404,0-1.62695,1.62793-1.62695,4.26685,.00098,5.89307l15.47607,15.4751,24.66016-24.65991c1.62793-1.62622,1.62793-4.26514,0-5.89307-1.62598-1.62793-4.2666-1.62793-5.89258,0Z"
                                />
                                <path
                                  className="uuid-322628f2-10a6-44ac-aa71-55f4711f8daf"
                                  d="M68.0319,10.39748C59.39811,2.66628,47.78873-1.04539,36.17155,.25539,17.47672,2.32448,2.37662,17.39088,.26725,36.07961c-1.22119,10.81738,1.77246,21.44458,8.43164,29.92285,5.32715,6.78345,8.14355,14.52588,8.14355,22.39038v4.50439c.00098,13.22363,10.75879,23.98096,23.98096,23.98096s23.97998-10.75732,23.97998-23.98096v-4.53857c0-7.86938,2.80078-15.70142,7.8877-22.05347,5.76416-7.19873,8.93848-16.25317,8.93848-25.49341,0-11.59082-4.95605-22.677-13.59766-30.41431Zm-1.84766,50.69824c-6.26514,7.82373-9.71582,17.50684-9.71582,27.26294v4.53857c0,8.62817-7.01758,15.646-15.64502,15.646-8.62646,0-15.64502-7.01953-15.646-15.646v-4.50439c0-.10718-.00586-.21362-.00684-.3208h18.39453c2.30176,0,4.16699-1.86548,4.16699-4.16748,0-2.30176-1.86523-4.16748-4.16699-4.16748H25.01139c-.25195,0-.49609,.03149-.73633,.07422-1.4082-6.70117-4.45361-13.14014-9.02148-18.95654-5.29736-6.74438-7.67822-15.21118-6.70361-23.84082,1.67676-14.85327,13.6792-26.82983,28.53906-28.47583,9.40527-1.0271,18.41162,1.82666,25.3833,8.06812,6.87793,6.15845,10.82227,14.98169,10.82227,24.20557,0,7.46069-2.45898,14.47388-7.11035,20.28394Z"
                                />
                              </svg>
                            </span>
                            {/* <h6 className="mt-2">Solution builder Data</h6> */}
                            <h6 className="mt-2">Solutions</h6>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3 mt-4">
                          <div
                            className="dropdown-item border-radius-1 cursor-pointer bg-light-grey border white-space-normal height-82"
                            onClick={() => history.push("/SolutionQuote")}
                            style={{ cursor: "pointer" }}
                          >
                            <span className="span-icon">
                              <svg
                                id="uuid-44f21729-ee7f-4ae1-a13f-50d052182172"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 79.7229 111.22266"
                              >
                                <path
                                  className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                                  d="M23.03735,73.64893h13.76392c2.24805,0,4.07007-1.82227,4.07007-4.07031s-1.82202-4.07007-4.07007-4.07007h-13.76392c-2.24805,0-4.07007,1.82202-4.07007,4.07007s1.82202,4.07031,4.07007,4.07031Z"
                                />
                                <path
                                  className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                                  d="M56.6853,83.09131H23.03735c-2.24805,0-4.07007,1.82178-4.07007,4.07007,0,2.24805,1.82202,4.07007,4.07007,4.07007H56.6853c2.24805,0,4.07007-1.82202,4.07007-4.07007,0-2.24829-1.82202-4.07007-4.07007-4.07007Z"
                                />
                                <path
                                  className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                                  d="M29.16724,40.16895l17.03101-17.03101c1.58984-1.59009,1.58984-4.16553,0-5.75562-1.58813-1.58984-4.16699-1.58984-5.75537,0l-11.27563,11.27563-3.52002-3.52002c-1.58813-1.58984-4.16699-1.58984-5.75537,0-1.58984,1.58984-1.58984,4.16553,0,5.75537l9.27539,9.27563Z"
                                />
                                <path
                                  className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                                  d="M56.6853,47.92578H23.03735c-2.24805,0-4.07007,1.82227-4.07007,4.07031s1.82202,4.07007,4.07007,4.07007H56.6853c2.24805,0,4.07007-1.82202,4.07007-4.07007s-1.82202-4.07031-4.07007-4.07031Z"
                                />
                                <path
                                  className="uuid-fb12aa24-59f9-42ce-94c6-88f0d5606902"
                                  d="M67.15942,0H0V111.22266H79.7229V12.56348c0-6.92725-5.63623-12.56348-12.56348-12.56348Zm4.4231,103.08252H8.14014V8.14038h59.01929c2.43896,0,4.4231,1.98413,4.4231,4.4231V103.08252Z"
                                />
                              </svg>
                            </span>
                            <h6 className="mt-2">Quote</h6>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3 mt-4">
                          <div
                            className="dropdown-item border-radius-1 cursor-pointer bg-light-grey border white-space-normal height-82"
                            style={{ cursor: "pointer" }}
                          >
                            {/* <div className="dropdown-item border-radius-1 cursor-pointer bg-light-grey border white-space-normal height-82" onClick={() => history.push("/RepairWithoutSpareParts")} style={{ cursor: "pointer"}}></div> */}
                            <span className="span-icon">
                              <svg
                                id="uuid-f3f687df-4645-4e7f-87f1-5ccb3e8264e2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 112.19978 112.19978"
                              >
                                <path
                                  className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                                  d="M60.2845,21.56987l3.27295,.71973c3.84277,.84473,7.50049,2.34424,10.87695,4.45728,.76587,.47852,1.62134,.71289,2.47046,.71289,1.19727,0,2.38159-.46558,3.28247-1.36743,1.62793-1.62793,1.62793-4.26514,0-5.89307-.68506-.6853-1.54956-1.08252-2.44263-1.18994-2.89282-1.69482-5.94849-3.03442-9.12524-4.00317V4.35625C68.61946,2.05449,66.54622,.00005,64.24446,.00005,61.94246,.00005,60.07698,1.86553,60.07698,4.16753c0,.4541,.07227,.89209,.20752,1.30225V21.56987Z"
                                />
                                <path
                                  className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                                  d="M89.90852,48.64067c.42822,1.94702,2.15234,3.27539,4.06665,3.27539,.29614,0,.59668-.03247,.89771-.09912,2.24829-.49341,3.67041-2.71558,3.177-4.96362-.84009-3.82251-2.19775-7.49341-4.04785-10.94946l7.52515-7.52588c1.62793-1.62793,1.62793-4.55981,0-6.18774-1.62646-1.62793-4.26685-1.62793-5.89307,0-.32227,.32227-.5813,.68384-.77588,1.06958l-11.39453,11.39551,1.80615,2.82275c2.20996,3.45288,3.77026,7.2085,4.63867,11.1626Z"
                                />
                                <path
                                  className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                                  d="M108.0323,60.07695c-.45581,0-.89453,.07324-1.30469,.20825h-16.10034l-.71875,3.27393c-.84326,3.83862-2.3418,7.49658-4.45312,10.86963-1.15576,1.84424-.89209,4.20972,.64307,5.75293,.8147,.81738,1.88428,1.22754,2.95459,1.22754,1.06299,0,2.12622-.40381,2.93945-1.21289,.69019-.68701,1.08887-1.55469,1.198-2.45166,1.69458-2.89429,3.03369-5.94824,4.0022-9.12451h10.63135c2.30176,0,4.37573-2.07397,4.37573-4.37573,0-2.302-1.86548-4.16748-4.16748-4.16748Z"
                                />
                                <path
                                  className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                                  d="M88.94075,94.85918l-11.39697-11.39551-2.82373,1.80688c-3.4502,2.20923-7.20605,3.77051-11.16187,4.63965-2.24805,.49316-3.67017,2.71533-3.17676,4.96362,.49487,2.24805,2.71704,3.68237,4.96436,3.17603,3.82397-.83838,7.49414-2.19604,10.9502-4.04688l7.52588,7.52417c.81323,.81396,1.95337,1.22095,3.09375,1.22095,1.13965,0,2.28003-.40698,3.09302-1.22095,1.62793-1.62793,1.62793-4.26514,0-5.89307-.32129-.32251-.68286-.57959-1.06787-.7749Z"
                                />
                                <path
                                  className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                                  d="M51.91438,90.62822l-3.27441-.71948c-3.83789-.8418-7.49585-2.33936-10.87549-4.45581-1.85083-1.15747-4.22021-.88232-5.76123,.66089-1.62305,1.63281-1.61646,4.27173,.01562,5.89478,.68457,.68042,1.54565,1.07446,2.4353,1.18188,2.89526,1.69629,5.94995,3.03613,9.12524,4.00317v10.64966c0,2.302,2.07324,4.35645,4.37524,4.35645,2.30176,0,4.16748-1.86572,4.16748-4.16748,0-.4541-.07324-.89209-.20776-1.30225v-16.10181Z"
                                />
                                <path
                                  className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                                  d="M22.29036,63.55913c-.49414-2.24829-2.71387-3.66626-4.96436-3.17627-2.24805,.49341-3.67017,2.71533-3.17676,4.96362,.83984,3.82251,2.19751,7.4917,4.04785,10.94946l-7.52515,7.52588c-1.62793,1.62793-1.62793,4.55981,0,6.18774,.81299,.81396,1.88013,1.22095,2.94653,1.22095,1.06616,0,2.1333-.40698,2.94653-1.22095,.32227-.32227,.58105-.68384,.77563-1.06958l11.39453-11.3938-1.80615-2.82446c-2.20972-3.45288-3.77002-7.20996-4.63867-11.1626Z"
                                />
                                <path
                                  className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                                  d="M22.29036,48.64067c.84326-3.84033,2.3418-7.49805,4.45312-10.86963,1.15576-1.84424,.89209-4.20972-.64307-5.75293-1.62378-1.62793-4.26172-1.6394-5.8938-.01465-.69019,.68701-1.08911,1.55469-1.198,2.45166-1.69409,2.89258-3.03369,5.94824-4.00244,9.12451H4.37508C2.07307,43.57964,.00008,45.65337,.00008,47.95537s1.86548,4.16748,4.16748,4.16748c.45581,0,.89453-.07324,1.30469-.20825H21.57161l.71875-3.27393Z"
                                />
                                <path
                                  className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                                  d="M23.25813,17.34063l11.39624,11.39551,2.823-1.80688c3.4519-2.20923,7.20752-3.77051,11.16333-4.63965,2.24829-.49341,3.67017-2.71533,3.177-4.96362-.49487-2.24829-2.71777-3.67749-4.96436-3.17603-3.82397,.83838-7.49414,2.19604-10.95117,4.04688l-7.5249-7.52417c-1.62646-1.62793-4.56079-1.62793-6.18701,0-1.62793,1.62793-1.62793,4.26514,0,5.89307,.32153,.32251,.68286,.57959,1.06787,.7749Z"
                                />
                                <path
                                  className="uuid-485402e8-1ced-444e-b4d4-99c05d719b9c"
                                  d="M38.0804,74.19585c.81323,.81079,1.87695,1.21436,2.94092,1.21436,1.06958,0,2.13916-.40845,2.95312-1.22729l12.13184-12.18359,12.15747,12.15747c.81323,.81396,1.88013,1.22095,2.94653,1.22095s2.1333-.40698,2.94653-1.22095c1.62793-1.62793,1.62793-4.26514,0-5.89307l-12.17017-12.17017,12.14502-12.19653c1.62378-1.63135,1.61816-4.26855-.01221-5.89307-1.63135-1.62646-4.271-1.62158-5.89404,.01294l-12.13184,12.18359-12.15747-12.15747c-1.62622-1.62793-4.26685-1.62793-5.89307,0-1.62793,1.62793-1.62793,4.26514,0,5.89307l12.17017,12.16992-12.14502,12.19678c-1.62378,1.63135-1.61816,4.26855,.01221,5.89307Z"
                                />
                              </svg>
                            </span>
                            <h6 className="mt-2">Commerce</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="icons dropdown">
                <a
                  className="header-li-text"
                  href="javascript:void(0)"
                  data-toggle="dropdown"
                >
                  {/* <img src={notificationIcon}></img> */}
                  {/* <span className="badge badge-pill gradient-2">3</span> */}
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    width="24px"
                    viewBox="0 0 137.07438 145.84033"
                  >
                    <path
                      className="cls-1"
                      d="M136.35156,120.63428l-14.707-21.04566c-.04882-.07031-.11132-.12475-.16406-.19116V69.679A53.02648,53.02648,0,0,0,83.24169,18.82983a15.16182,15.16182,0,1,0-29.41162.00049A53.02533,53.02533,0,0,0,15.59374,69.679V101.6333L.85107,120.459a4.00523,4.00523,0,0,0,3.15429,6.47486H45.98193a22.90637,22.90637,0,0,0,45.10888,0h41.978a4.00533,4.00533,0,0,0,3.28272-6.29956ZM61.38574,15.16382a7.15064,7.15064,0,1,1,14.00878,2.03149,51.45851,51.45851,0,0,0-13.706-.00122A7.16574,7.16574,0,0,1,61.38574,15.16382ZM23.605,69.679a44.93213,44.93213,0,0,1,89.86426,0V97.87671H23.605Zm44.93164,68.1499a14.91582,14.91582,0,0,1-14.33837-10.895H82.87451A14.91524,14.91524,0,0,1,68.53661,137.82886Zm-56.30712-18.9065L22.438,105.88818h93.8374l9.10743,13.03418Z"
                    />
                  </svg>
                  {/* <div className="li-contant">Notifications</div> */}
                </a>
                <div className="drop-down animated fadeIn dropdown-menu dropdown-notfication">
                  <div className="dropdown-content-heading d-flex justify-content-between">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex  align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white mr-2"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <span className="text-white">2</span>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            <b>New Notifications</b>
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/* <span className="">2 New Notifications</span>
                    <a href="javascript:void()" className="d-inline-block">
                      <span className="badge badge-pill gradient-2">5</span>
                    </a> */}
                  </div>
                  <div className="dropdown-content-body">
                    <ul>
                      <li>
                        <a href="javascript:void()" className="d-flex">
                          <span
                            className="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white mr-2"
                            style={{ width: "12px", height: "10px" }}
                          ></span>
                          {/* <span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span> */}
                          <div className="notification-content ml-4">
                            <h6 className="notification-heading text-black">
                              Your account has been created successfully
                            </h6>
                            <span className="notification-text">
                              5 Aug 21, 1:38 pm{" "}
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()" className="d-flex">
                          <span
                            className="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white mr-2"
                            style={{ width: "12px", height: "10px" }}
                          ></span>
                          {/* <span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span> */}
                          <div className="notification-content ml-4">
                            <h6 className="notification-heading text-black">
                              Thank you for sharing this quote with us.
                            </h6>
                            <h6 className="notification-heading text-black">
                              Jhon Deo
                              <span className="notification-text ml-2 pl-2 border-left">
                                Within next 5 days
                              </span>
                            </h6>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()" className="d-flex">
                          <span
                            className="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white mr-2"
                            style={{ width: "12px", height: "10px" }}
                          ></span>
                          {/* <span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span> */}
                          <div className="notification-content ml-4">
                            <h6 className="notification-heading text-black">
                              Your account has been created successfully
                            </h6>
                            <span className="notification-text">
                              Within next 5 days
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()" className="d-flex">
                          <span
                            className="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white mr-2"
                            style={{ width: "12px", height: "10px" }}
                          ></span>
                          {/* <span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span> */}
                          <div className="notification-content ml-4">
                            <h6 className="notification-heading text-black">
                              Your account has been created successfully
                            </h6>
                            <span className="notification-text">
                              Within next 5 days
                            </span>
                          </div>
                        </a>
                      </li>
                      {/* <li>
                        <a href="javascript:void()">
                          <span className="mr-3 avatar-icon bg-danger-lighten-2"><i className="icon-present"></i></span>
                          <div className="notification-content">
                            <h6 className="notification-heading">Event Started</h6>
                            <span className="notification-text">One hour ago</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span>
                          <div className="notification-content">
                            <h6 className="notification-heading">Event Ended Successfully</h6>
                            <span className="notification-text">One hour ago</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <span className="mr-3 avatar-icon bg-danger-lighten-2"><i className="icon-present"></i></span>
                          <div className="notification-content">
                            <h6 className="notification-heading">Events to Join</h6>
                            <span className="notification-text">After two days</span>
                          </div>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </li>
              {/* <li className="icons dropdown"><a className="header-li-text" href="javascript:void(0)" data-toggle="dropdown"></a> */}
              <li className="icons dropdown">
                <a
                  className="header-li-text"
                  href="javascript:void(0)"
                  data-toggle="modal"
                  data-target="#messegespopup"
                >
                  {/* <img src={messageIcon}></img> */}
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    width="24px"
                    viewBox="0 0 114.14697 108.95508"
                  >
                    <path
                      className="cls-1"
                      d="M102.06543,0H12.08105A12.09575,12.09575,0,0,0,0,12.0813V75.14771a12.0957,12.0957,0,0,0,12.08105,12.081H37.65967L53.95313,107.4624a4.00729,4.00729,0,0,0,6.24023,0L76.48682,87.22876h25.57861a12.09581,12.09581,0,0,0,12.08154-12.081V12.0813A12.09586,12.09586,0,0,0,102.06543,0Zm4.06982,75.14771a4.0747,4.0747,0,0,1-4.06982,4.06982H74.57031a4.00656,4.00656,0,0,0-3.12011,1.49268l-14.377,17.85351L42.69678,80.71021a4.008,4.008,0,0,0-3.12012-1.49268H12.08105a4.075,4.075,0,0,1-4.06982-4.06982V12.0813a4.07486,4.07486,0,0,1,4.06982-4.06983h89.98438a4.07455,4.07455,0,0,1,4.06982,4.06983Z"
                    />
                    <path
                      className="cls-1"
                      d="M85.19336,30.71729H28.95361a4.00562,4.00562,0,0,0,0,8.01123H85.19336a4.00562,4.00562,0,0,0,0-8.01123Z"
                    />
                    <path
                      className="cls-1"
                      d="M85.19336,50.47192H28.95361a4.00562,4.00562,0,0,0,0,8.01123H85.19336a4.00562,4.00562,0,0,0,0-8.01123Z"
                    />
                  </svg>
                  {/* <span className="badge badge-pill gradient-1">3</span> */}
                  {/* <div className="li-contant">Messages</div> */}
                </a>
                <div className="drop-down animated fadeIn dropdown-menu">
                  <div className="dropdown-content-heading d-flex justify-content-between">
                    <span className="">3 New Messages</span>
                    <a href="javascript:void()" className="d-inline-block">
                      <span className="badge badge-pill gradient-1">3</span>
                    </a>
                  </div>
                  <div className="dropdown-content-body">
                    <ul>
                      <li className="notification-unread">
                        <a href="javascript:void()">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="images/avatar/1.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Saiful Islam
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">
                              Hi Teddy, Just wanted to let you ...
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-unread">
                        <a href="javascript:void()">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="images/avatar/2.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Adam Smith
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">
                              Can you do me a favour?
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="images/avatar/3.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Barak Obama
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">
                              Hi Teddy, Just wanted to let you ...
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img
                            className="float-left mr-3 avatar-img"
                            src="images/avatar/4.jpg"
                            alt=""
                          />
                          <div className="notification-content">
                            <div className="notification-heading">
                              Hilari Clinton
                            </div>
                            <div className="notification-timestamp">
                              08 Hours ago
                            </div>
                            <div className="notification-text">Hello</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* <li className="icons dropdown d-none d-md-flex">
                            <a href="javascript:void(0)" className="log-user" data-toggle="dropdown">
                                <span>English</span>  <i className="fa fa-angle-down f-s-14" aria-hidden="true"></i>
                            </a>
                            <div className="drop-down dropdown-language animated fadeIn  dropdown-menu">
                                <div className="dropdown-content-body">
                                    <ul>
                                        <li><a href="javascript:void()">English</a></li>
                                        <li><a href="javascript:void()">Dutch</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li> */}

              <li className="icons">
                <Link className="header-li-text" to="/workList">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    width="20px"
                    viewBox="0 0 93.21387 95.28394"
                  >
                    <path
                      className="cls-1"
                      d="M82.88513,0H10.32721A10.33935,10.33935,0,0,0,0,10.32715V84.95679A10.33935,10.33935,0,0,0,10.32721,95.28394H82.88513A10.33963,10.33963,0,0,0,93.21387,84.95679V10.32715A10.33963,10.33963,0,0,0,82.88513,0Zm2.31738,84.95679a2.31879,2.31879,0,0,1-2.31738,2.31567H10.32721a2.31846,2.31846,0,0,1-2.3158-2.31567V10.32715a2.31857,2.31857,0,0,1,2.3158-2.3158H82.88513a2.3189,2.3189,0,0,1,2.31738,2.3158Z"
                    />
                    <path
                      className="cls-1"
                      d="M71.53149,21.17847H43.36017a4.00574,4.00574,0,1,0,0,8.01147H71.53149a4.00574,4.00574,0,0,0,0-8.01147Z"
                    />
                    <circle
                      className="cls-1"
                      cx="27.16125"
                      cy="25.18396"
                      r="5.47983"
                    />
                    <path
                      className="cls-1"
                      d="M71.53149,43.6355H43.36017a4.00568,4.00568,0,1,0,0,8.01135H71.53149a4.00568,4.00568,0,1,0,0-8.01135Z"
                    />
                    <path
                      className="cls-1"
                      d="M27.16125,42.162a5.4798,5.4798,0,1,0,5.4798,5.47986A5.47986,5.47986,0,0,0,27.16125,42.162Z"
                    />
                    <path
                      className="cls-1"
                      d="M71.53149,66.094H43.36017a4.00568,4.00568,0,1,0,0,8.01136H71.53149a4.00568,4.00568,0,1,0,0-8.01136Z"
                    />
                    <path
                      className="cls-1"
                      d="M27.16125,64.61987a5.4798,5.4798,0,1,0,5.4798,5.47974A5.47976,5.47976,0,0,0,27.16125,64.61987Z"
                    />
                  </svg>
                  {/* <img src={profileIcon}></img> */}
                  {/* <div className="li-contant">Worklist</div> */}
                </Link>
              </li>
              <li className="icons dropdown">
                <div
                  className="header-li-text c-pointer position-relative"
                  data-toggle="dropdown"
                >
                  <span className="activity active"></span>
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    width="24px"
                    viewBox="0 0 128.98353 128.98509"
                  >
                    <path
                      className="cls-1"
                      d="M64.82505,128.98509h-.66814a13.41457,13.41457,0,0,1-13.39875-13.40031,5.34857,5.34857,0,0,0-3.4377-5.004q-1.64532-.61728-3.23273-1.34253a5.37631,5.37631,0,0,0-6.00855,1.08905,13.39911,13.39911,0,0,1-18.95509.00313l-.471-.47255a13.39722,13.39722,0,0,1,0-18.9504,5.36821,5.36821,0,0,0,1.09375-6.01012q-.72525-1.58429-1.3441-3.23272a5.34423,5.34423,0,0,0-5.00243-3.43771A13.41591,13.41591,0,0,1,0,64.82662v-.66814A13.41591,13.41591,0,0,1,13.40032,50.75816,5.34507,5.34507,0,0,0,18.40275,47.322q.61728-1.65,1.34566-3.239a5.371,5.371,0,0,0-1.09061-6.00229,13.41659,13.41659,0,0,1-.0047-18.9551l.47725-.47568a13.3972,13.3972,0,0,1,18.9457.0047,5.37966,5.37966,0,0,0,6.01012,1.09374q1.59132-.72994,3.239-1.34566a5.34745,5.34745,0,0,0,3.433-5.00243A13.41457,13.41457,0,0,1,64.15691,0h.66814A13.41591,13.41591,0,0,1,78.22537,13.40032a5.34855,5.34855,0,0,0,3.4377,5.004q1.64063.6126,3.23273,1.34254a5.37358,5.37358,0,0,0,6.00542-1.089,13.42558,13.42558,0,0,1,18.95666-.00313l.46785.46629a13.42085,13.42085,0,0,1,.00626,18.95509,5.3696,5.3696,0,0,0-1.09687,6.01012c.48506,1.06088.9357,2.14054,1.3441,3.23742a5.35023,5.35023,0,0,0,5.004,3.43457,13.41591,13.41591,0,0,1,13.40032,13.40032v.66814a13.41591,13.41591,0,0,1-13.40032,13.40031,5.34856,5.34856,0,0,0-5.004,3.43771q-.6126,1.64061-1.34254,3.23116a5.371,5.371,0,0,0,1.089,6.00855,13.41469,13.41469,0,0,1,.0047,18.95353l-.47255.47255a13.4095,13.4095,0,0,1-18.9504,0,5.366,5.366,0,0,0-6.01012-1.09375q-1.589.7276-3.23429,1.3441a5.34857,5.34857,0,0,0-3.4377,5.004A13.4159,13.4159,0,0,1,64.82505,128.98509ZM41.89712,100.75274a13.24718,13.24718,0,0,1,5.525,1.20171q1.32611.60554,2.70542,1.1219a13.39934,13.39934,0,0,1,8.642,12.50843,5.39475,5.39475,0,0,0,5.38735,5.38892h.66814a5.39508,5.39508,0,0,0,5.38892-5.38892,13.39934,13.39934,0,0,1,8.642-12.50843q1.37775-.514,2.707-1.12347a13.40618,13.40618,0,0,1,15.00416,2.70854,5.401,5.401,0,0,0,7.62648.0047l.47255-.47255a5.39631,5.39631,0,0,0,0-7.62022,13.4123,13.4123,0,0,1-2.71324-15.012c.40214-.88251.77923-1.78223,1.12034-2.69916a13.40049,13.40049,0,0,1,12.51-8.64668,5.39507,5.39507,0,0,0,5.38892-5.38891v-.66814a5.39508,5.39508,0,0,0-5.38892-5.38892,13.39931,13.39931,0,0,1-12.50842-8.642q-.514-1.37775-1.12347-2.707a13.4115,13.4115,0,0,1,2.7101-15.00416,5.39818,5.39818,0,0,0,.00313-7.62648l-.46629-.46629a5.39818,5.39818,0,0,0-7.62647-.00469,13.40481,13.40481,0,0,1-15.01042,2.71167c-.88251-.40214-1.78379-.77923-2.70072-1.12034a13.40048,13.40048,0,0,1-8.64668-12.51A5.39508,5.39508,0,0,0,64.82505,8.0114h-.66814a5.39474,5.39474,0,0,0-5.38735,5.38892,13.39931,13.39931,0,0,1-8.642,12.50842c-.92163.34268-1.82291.71977-2.707,1.12347a13.40793,13.40793,0,0,1-15.00573-2.7101,5.3659,5.3659,0,0,0-3.8148-1.58038h-.00156a5.34868,5.34868,0,0,0-3.807,1.57725l-.47881.47568a5.39394,5.39394,0,0,0,.00469,7.61708,13.41688,13.41688,0,0,1,2.7148,15.01042q-.61259,1.3308-1.125,2.70542a13.39259,13.39259,0,0,1-12.50686,8.642A5.39508,5.39508,0,0,0,8.0114,64.15848v.66814a5.39507,5.39507,0,0,0,5.38892,5.38891,13.39178,13.39178,0,0,1,12.50686,8.64355q.514,1.37305,1.12347,2.69916a13.41854,13.41854,0,0,1-2.70854,15.01042,5.38494,5.38494,0,0,0-.0047,7.62334l.47255.47412a5.51247,5.51247,0,0,0,7.61865,0A13.43523,13.43523,0,0,1,41.89712,100.75274Z"
                    />
                    <path
                      className="cls-1"
                      d="M64.49176,92.43621A27.94367,27.94367,0,1,1,92.43621,64.49176,27.97706,27.97706,0,0,1,64.49176,92.43621Zm0-47.87593A19.93227,19.93227,0,1,0,84.42482,64.49176,19.95491,19.95491,0,0,0,64.49176,44.56028Z"
                    />
                  </svg>
                  {/* <i className="fa"><SettingsOutlinedIcon style={{color:'#bec0d0'}} /></i> */}

                  {/* <div className="li-contant">
                    <span className="mr-2 ">Settings</span>
                    <i
                      className="fa fa-angle-down f-s-14"
                      aria-hidden="true"
                    ></i>
                  </div> */}
                </div>
                <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
                  <div className="dropdown-content-body">
                    <ul>
                      <li>
                        <Link to="/profile">
                          <span>Profile View</span>
                        </Link>
                      </li>
                      
                      <li>                        
                        <span >Tenant ID #: {localStorage.getItem("user_tenantId")}</span>
                      </li>
                      <Divider />
                      <li>
                        <Link to="/account">
                          <span>Account</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/account?tab=packages">
                          <span>My Packages</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/account?tab=settings">
                          <span>Account Settings</span>
                        </Link>
                      </li>
                      <Divider />
                      <li>
                        <a className="cursor" onClick={handleLogout}>
                          
                          <span>{loginStatus ? "Logout" : "Login"}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="modal right fade"
        id="messegespopup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel2"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header ">
              <h4 className="modal-title" id="myModalLabel2">
                Messages
              </h4>
              <div className="d-flex">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className="modal-body" style={{ background: "white" }}>
              {/* <div style={{borderBottom: '1px solid #cfcece'}}> */}
              <ul className="nav internalexternaltabs intexttab">
                <li className="active">
                  <a
                    data-toggle="tab"
                    href="#internal"
                    className="btn active show"
                  >
                    Internal
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" href="#external" className="btn">
                    External
                  </a>
                </li>
              </ul>
              {/* </div> */}

              <div className="tab-content">
                <div id="internal" className="tab-pane fade in active show">
                  <div className="mt-4">
                    <a
                      href="#"
                      className="bg-white d-block text-left font-size-15 text-violet"
                    >
                      <span className="font-size-20 mr-2">+</span>Comment
                    </a>
                  </div>
                  <div>
                    <textarea
                      name="comments"
                      className="w-100 p-2 border"
                      id="comments"
                      placeholder="Reply"
                    ></textarea>
                    <div className="d-flex justify-content-end">
                      <div>
                        <a href="#" className="btn-sm border mr-2">
                          Cancel
                        </a>
                      </div>
                      <div>
                        <a href="#" className="btn-sm text-white bg-primary">
                          Save
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className=" p-2 card-list mt-5">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex  align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white mr-2"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <span>J</span>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            <b>Jane Doe</b>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="border p-2 card-list mt-4 bg-primary text-white border-radius-3"
                      style={{ textAlign: "justify", borderRadius: "5px" }}
                    >
                      <p className="mt-2">
                        Amet minim mollit non deserunt ullamco est sit minim
                        mollit non deserunt ullamco est sit
                      </p>
                    </div>
                    <div className="mt-3">
                      <textarea
                        name="comments"
                        className="w-100 p-2 border"
                        id="comments"
                        placeholder="Reply"
                      ></textarea>
                    </div>
                    <p className="text-grey  mb-0 font-size-12">
                      <b>2:38pm, 19 Aug 21</b>
                    </p>
                  </div>
                  <div className=" p-2 card-list mt-5">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex  align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white mr-2"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <span>J</span>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            <b>Jane Doe</b>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="border p-2 card-list mt-4 bg-primary text-white border-radius-3"
                      style={{ textAlign: "justify", borderRadius: "5px" }}
                    >
                      <p className="mt-2">
                        Amet minim mollit non deserunt ullamco est sit minim
                        mollit non deserunt ullamco est sit
                      </p>
                    </div>

                    <div className="mt-3">
                      <textarea
                        name="comments"
                        className="w-100 p-2 border"
                        id="comments"
                        placeholder="Reply"
                      ></textarea>
                    </div>
                    <p className="text-grey  mb-0 font-size-12">
                      <b>2:38pm, 19 Aug 21</b>
                    </p>
                  </div>
                </div>
                <div id="external" className="tab-pane fade">
                  <div className="mt-4">
                    <a
                      href="#"
                      className="bg-white d-block text-left font-size-15 text-violet"
                    >
                      <span className="font-size-20 mr-2">+</span>Comment
                    </a>
                  </div>
                  <div>
                    <textarea
                      name="comments"
                      className="w-100 p-2 border"
                      id="comments"
                      placeholder="Reply"
                    ></textarea>
                    <div className="d-flex justify-content-end">
                      <div>
                        <a href="#" className="btn-sm border mr-2">
                          Cancel
                        </a>
                      </div>
                      <div>
                        <a href="#" className="btn-sm text-white bg-primary">
                          Save
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className=" p-2 card-list mt-5">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex  align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white mr-2"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <span>J</span>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            <b>Jane Doe</b>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="border p-2 card-list mt-4 bg-primary text-white border-radius-3"
                      style={{ textAlign: "justify", borderRadius: "5px" }}
                    >
                      <p className="mt-2">
                        Amet minim mollit non deserunt ullamco est sit minim
                        mollit non deserunt ullamco est sit
                      </p>
                    </div>
                    <div className="mt-3">
                      <textarea
                        name="comments"
                        className="w-100 p-2 border"
                        id="comments"
                        placeholder="Reply"
                      ></textarea>
                    </div>
                    <p className="text-grey  mb-0 font-size-12">
                      <b>2:38pm, 19 Aug 21</b>
                    </p>
                  </div>
                  <div className=" p-2 card-list mt-5">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex  align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center bg-primary rounded-circle text-white mr-2"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <span>J</span>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            <b>Jane Doe</b>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                      className="border p-2 card-list mt-4 bg-primary text-white border-radius-3"
                      style={{ textAlign: "justify", borderRadius: "5px" }}
                    >
                      <p className="mt-2">
                        Amet minim mollit non deserunt ullamco est sit minim
                        mollit non deserunt ullamco est sit
                      </p>
                    </div>

                    <div className="mt-3">
                      <textarea
                        name="comments"
                        className="w-100 p-2 border"
                        id="comments"
                        placeholder="Reply"
                      ></textarea>
                    </div>
                    <p className="text-grey  mb-0 font-size-12">
                      <b>2:38pm, 19 Aug 21</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
