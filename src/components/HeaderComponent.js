import React from "react";
import logoIcon from "../assets/icons/png/logo.png";
import shearchIcon from "../assets/icons/svg/search.svg";
import notificationIcon from "../assets/icons/svg/notification-bing.svg";
import profileIcon from "../assets/icons/svg/profile.svg";
import messageIcon from "../assets/icons/svg/message-text.svg";
import supportIcon from "../assets/icons/svg/24-support.svg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export function HeaderComponent(props) {
  const [age, setAge] = React.useState("5");

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <>
      <div className="header">
        <div className="header-content clearfix" style={{ display: "none" }}>
          {/* <div className="nav-control">
                    <div className="hamburger">
                        <span className="toggle-icon"><i className="icon-menu"></i></span>
                    </div>
                </div> */}
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
                  {/* <span className="badge badge-pill gradient-2">3</span> */}
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
                  {/* <span className="badge badge-pill gradient-1">3</span> */}
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

              <li className="icons dropdown">
                <div
                  className="header-li-text c-pointer position-relative"
                  data-toggle="dropdown"
                >
                  {/* <span className="activity active"></span> */}
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
        </div>
        <div className="header-content clearfix">
          <div className="header-right">
            <ul className="clearfix">
              <li className="icons" style={{ border: "none" }}>
                <div
                  className="input-group"
                  style={{ border: "1px solid #cfcfcf", borderRadius: "50px" }}
                >
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-transparent border-0 pr-0 "
                      id="basic-addon1"
                    >
                      <img src={shearchIcon}></img>
                    </span>
                  </div>

                  <div className="">
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
                      className="dropdown-menu search-drop-div"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li className="dropdown-item">Repair With Spare Parts</li>
                      <li className="dropdown-item">Repair Without Spare Parts</li>
                      <li className="dropdown-item">Part List</li>
                      <li className="dropdown-item">Standard Job</li>
                      <li className="dropdown-item">Kit</li>
                      <li className="dropdown-item">Portfolio and bundle</li>
                      <li className="dropdown-item">Solution builder</li>
                      <li className="dropdown-item">Quote</li>
                    </div>
                  </div>
                  <div className="input-group-prepend align-items-center d-none">
                    <div className="w-100 mx-2">
                      <div className="machine-droped d-flex align-items-center bg-white">
                        <div>
                          <lable
                            className="label-div"
                            style={{ whiteSpace: "pre" }}
                          >
                            Quote Type
                          </lable>
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
                    fill="#9226ff"
                    width="24px"
                    viewBox="0 0 137.07438 145.84033"
                  >
                    <path
                      className="cls-1"
                      d="M136.35156,120.63428l-14.707-21.04566c-.04882-.07031-.11132-.12475-.16406-.19116V69.679A53.02648,53.02648,0,0,0,83.24169,18.82983a15.16182,15.16182,0,1,0-29.41162.00049A53.02533,53.02533,0,0,0,15.59374,69.679V101.6333L.85107,120.459a4.00523,4.00523,0,0,0,3.15429,6.47486H45.98193a22.90637,22.90637,0,0,0,45.10888,0h41.978a4.00533,4.00533,0,0,0,3.28272-6.29956ZM61.38574,15.16382a7.15064,7.15064,0,1,1,14.00878,2.03149,51.45851,51.45851,0,0,0-13.706-.00122A7.16574,7.16574,0,0,1,61.38574,15.16382ZM23.605,69.679a44.93213,44.93213,0,0,1,89.86426,0V97.87671H23.605Zm44.93164,68.1499a14.91582,14.91582,0,0,1-14.33837-10.895H82.87451A14.91524,14.91524,0,0,1,68.53661,137.82886Zm-56.30712-18.9065L22.438,105.88818h93.8374l9.10743,13.03418Z"
                    />
                  </svg>
                  <div className="li-contant">Notifications</div>
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
                    fill="#9226ff"
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
                    fill="#9226ff"
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
                  <div className="li-contant">Worklist</div>
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
                    fill="#9226ff"
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

                  <div className="li-contant">
                    <span className="mr-2 ">Settings</span>
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
                        <Link to="#">
                          <i className="icon-user"></i> <span>Help</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/account">
                          <i className="icon-user"></i> <span>Account</span>
                        </Link>
                      </li>
                      {/* <li>
                        <a href="page-lock.html"><i className="icon-lock"></i> <span>Lock Screen</span></a>
                      </li> */}
                      <li>
                        <a className="cursor" onClick={handleLogout}>
                          <i className="icon-key"></i> <span>Logout</span>
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
        tabindex="-1"
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
