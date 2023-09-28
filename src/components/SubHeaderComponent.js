import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import searchIcon from "../assets/icons/svg/search.svg";
import { MuiMenuComponent } from "../pages/Operational/index";

import ClearIcon from "@mui/icons-material/Clear";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import { useSelector } from "react-redux";
// import { signUpActions } from "../../src/features/auth/authSlice";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";

// import { useLocation } from "react-router-dom";
import { getAuditRestServiceData } from "./../services/index";

export function SubHeaderComponent(props) {
  // const dispatch = useDispatch();
  // const result = useSelector((state) => state.loginSuccess);
  // const location = useLocation();
  const [editableText, setEditAbleText] = useState(0);
  // console.log("result is : ", result)
  const [loginUserId, setLoginUserId] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  const [auditResData, setAuditResData] = useState([]);
  const [exitingAuditName, setExitingAuditName] = useState("");
  // console.log("result of user subheader component : ", result.currentUser)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState("1");
  const [dateObj, setDateObj] = useState({
    day: "0",
    month: "0",
    year: "0",
  });

  const [state, setState] = React.useState({
    top: false,
  });
  const [isShareSideBar, setIsShareSideBar] = useState(false);

  const [validityData, setValidityData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    from: null,
    to: null,
    fromInput: "",
    toInput: "",
  });

  const toggleDrawer = (anchor, open, type) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsShareSideBar(type);
    console.log("====");
    console.log(anchor);
    setState({ ...state, [anchor]: open });
    const exitingType = JSON.parse(localStorage.getItem("exitingType"));

    if (exitingType != undefined) {
      if (exitingType.editable) {
        // if(exitingType.exitingType = "portfolio"){
        fetchVersionHistoryData(
          exitingType.exitingType,
          exitingType.portfolioId
        );
        // }
        setEditAbleText(editableText + 1);
      } else if (exitingType.exitingType === "repair") {
        setExitingAuditName("Repair");
        setAuditResData([]);
      }
    } else {
      setExitingAuditName("");
      setEditAbleText(1);
      setAuditResData([]);
    }
    console.log("exitingType ---- : ", exitingType);
    console.log("exitName", exitingAuditName);
  };
  const activityOptions = ["None", "Atria", "Callisto"];
  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];
  const list = (anchor) => (
    <>
      {isShareSideBar ? (
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 420 }}
          role="presentation"
          // onClick={toggleDrawer(anchor, false)}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
          {/* <List>
      {["Back"].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            <KeyboardBackspaceIcon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List> */}
          <div className="modal-header d-block">
            <button
              type="button"
              className="close"
              onClick={toggleDrawer(anchor, false, true)}
            >
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="myModalLabel2">
              Share
            </h4>
          </div>
          <Divider />
          <div className="p-3">
            <div>
              <a href="#" className="btn border">
                Internal
              </a>
              <a href="#" className="btn bg-primary text-white">
                Customer
              </a>
            </div>
            <h6 className="mt-3">MEMBERS</h6>
            <p>Amet minim mollit non deserunt ullamco est sit Viewer</p>

            <div className=" d-flex">
              <div className="input-group icons approvesearch mr-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text bg-transparent border-0 pr-0 "
                    id="basic-addon1"
                  >
                    <img src={searchIcon} />
                  </span>
                </div>
                <input
                  type="search"
                  className="form-control"
                  placeholder=""
                  aria-label="Search Dashboard"
                />
                <div
                  className="customselect d-flex align-items-center"
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                >
                  <Select
                    // onChange={handleChangeSelect}
                    isClearable={true}
                    // value={dValue}
                    options={[{ label: "One", value: "one" }]}
                    placeholder="Viewer"
                  />
                </div>
              </div>
              <div>
                <a
                  href="#"
                  className="btn bg-primary text-white"
                  data-toggle="modal"
                  data-target="#Assingmodal"
                >
                  Invite
                </a>
              </div>
            </div>
            <hr />
            <h5>ADDED APPROVERS</h5>
            <div className="card border mt-3">
              <div className="d-flex approvers-div p-3 justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="img-box mr-3">
                    <span>A</span>
                  </div>
                  <div className="contant-div">
                    <p className="m-0">Product Manager</p>
                    <h6 className="m-0">Jane Doe</h6>
                    <p className="m-0">jhondoe99@gmail.com</p>
                  </div>
                </div>
                <div>
                  <a href="#" className="btn text-light">
                    Can Approve{" "}
                    <span>
                      <KeyboardArrowDownIcon />
                    </span>
                  </a>
                </div>
              </div>
              <hr />
              <div className="d-flex approvers-div p-3 justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="img-box mr-3">
                    <span>A</span>
                  </div>
                  <div className="contant-div">
                    <p className="m-0">Product Manager</p>
                    <h6 className="m-0">Jane Doe</h6>
                    <p className="m-0">jhondoe99@gmail.com</p>
                  </div>
                </div>
                <div>
                  <a href="#" className="btn text-light">
                    Can Approve{" "}
                    <span>
                      <KeyboardArrowDownIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <h5>INVITED APPROVERS</h5>
            <div className="card border mt-3">
              <div className="d-flex approvers-div p-3 justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="img-box mr-3">
                    <span>A</span>
                  </div>
                  <div className="contant-div">
                    <p className="m-0">Product Manager</p>
                    <h6 className="m-0">Jane Doe</h6>
                    <p className="m-0">jhondoe99@gmail.com</p>
                  </div>
                </div>
                <div>
                  <a href="#" className="btn text-light">
                    Can Approve{" "}
                    <span>
                      <KeyboardArrowDownIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className=" col-md-6">
                <a href="#" className="btn border d-block">
                  Cancel
                </a>
              </div>
              <div className=" col-md-6">
                <a href="#" className="btn d-block bg-primary text-white">
                  <ShareOutlinedIcon className="mr-2 font-size-18" />
                  Share
                </a>
              </div>
            </div>
          </div>
        </Box>
      ) : (
        <div className="modal-content">
          <div className="modal-header ">
            <h4 className="modal-title" id="myModalLabel2">
              Version history
            </h4>
            <div className="d-flex">
              {/* <div className="headerdropdown">
                <Box>
                  <FormControl fullWidth>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>All</option>
                      <option value={20}>All2</option>
                      <option value={30}>All</option>
                    </NativeSelect>
                  </FormControl>
                </Box></div> */}
              <button
                type="button"
                className="close"
                onClick={toggleDrawer(anchor, false, false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div className="modal-body" style={{ background: "white" }}>
            {auditResData.length > 0 ? (
              <>
                {auditResData.map((auditData, i) => (
                  <>
                    {i == 0 ? (
                      <div className="card border p-3 bg-primary ">
                        <h5 className="d-flex align-items-center justify-content-between mb-0">
                          {/* <div className="text-white" style={{ display: 'contents' }}><span className="mr-3">{auditData.entityData.name}</span> */}
                          <div
                            className="text-white"
                            style={{ display: "contents" }}
                          >
                            <span className="mr-3">{exitingAuditName}</span>
                            <div>
                              <a href="#" className="btn-sm text-white">
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i>
                              </a>
                              <a href="#" className="btn-sm text-white">
                                <i
                                  className="fa fa-bookmark-o"
                                  aria-hidden="true"
                                ></i>
                              </a>
                              <a href="#" className="btn-sm text-white">
                                <i
                                  className="fa fa-folder-o"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </h5>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="card border p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">
                          {getFormattedDateTimeByTimeStamp(auditData.createdAt)}
                          <a
                            href="#"
                            className="p-1 more-btn "
                            style={{ marginLeft: "35px" }}
                          >
                            + 2<span className="c-btn">J</span>
                          </a>
                        </p>
                        <p className="mb-0">
                          <a href="#" className="">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </p>
                      </div>

                      <div className="mt-3">
                        <small>MAKE</small>
                      </div>
                      <p
                        className="text-black mb-2"
                        style={{ textDecoration: "line-through" }}
                      >
                        Chinalco Sa,Beijing,Chaina(code 302037)
                      </p>
                      <p className="text-black mb-2">
                        Chinalco Sa,Beijing,Chaina(code 302037)
                      </p>
                      <div className="mt-3">
                        <small>FAMILY</small>
                      </div>
                      <p
                        className="text-black mb-2"
                        style={{ textDecoration: "line-through" }}
                      >
                        Alberto Franco,Head of Purchase
                      </p>
                      <p className="text-black mb-2">
                        Alberto Franco,Head of Purchase
                      </p>
                      <div className="mt-3">
                        <small>RECOMMENDED FREQUENCY</small>
                      </div>
                      <p
                        className="text-black mb-2"
                        style={{ textDecoration: "line-through" }}
                      >
                        SFI234
                      </p>
                      <p className="text-black mb-2">SFI234</p>
                      <div className="card border">
                        <table className="table table-bordered mb-0">
                          <tbody>
                            <tr>
                              <td>365-1234</td>
                              <td>
                                <MoreHorizOutlinedIcon />
                              </td>
                              <td>
                                <MoreHorizOutlinedIcon />
                              </td>
                              <td>
                                <MoreHorizOutlinedIcon />
                              </td>
                              <td>
                                <div className="d-flex justify-content-between">
                                  <div className="mr-3">
                                    <small
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      $80
                                    </small>
                                    <p className="mb-0 mt-2">$100</p>
                                  </div>
                                  <div>
                                    <span
                                      className="c-btn"
                                      style={{ position: "unset" }}
                                    >
                                      J
                                    </span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <></>
            )}
            {exitingAuditName === "Repair" && (
              <>
                <div className="card border p-3 bg-primary ">
                  <h5 className="d-flex align-items-center justify-content-between mb-0">
                    <div className="text-white" style={{ display: "contents" }}>
                      <span className="mr-3">Service Estimate 01</span>
                      <div>
                        <a href="#" className="btn-sm text-white">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn-sm text-white">
                          <i
                            className="fa fa-bookmark-o"
                            aria-hidden="true"
                          ></i>
                        </a>
                        <a href="#" className="btn-sm text-white">
                          <i className="fa fa-folder-o" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </h5>
                </div>
                <div className="card border p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">
                      5 Aug 2021, 1:38 pm
                      <a
                        href="#"
                        className="p-1 more-btn "
                        style={{ marginLeft: "35px" }}
                      >
                        + 2<span className="c-btn">J</span>
                      </a>
                    </p>
                    <p className="mb-0">
                      <a href="#" className="">
                        <MuiMenuComponent options={activityOptions} />
                      </a>
                    </p>
                  </div>

                  <div className="mt-3">
                    <small>MAKE</small>
                  </div>
                  <p
                    className="text-black mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Chinalco Sa,Beijing,Chaina(code 302037)
                  </p>
                  <p className="text-black mb-2">
                    Chinalco Sa,Beijing,Chaina(code 302037)
                  </p>
                  <div className="mt-3">
                    <small>FAMILY</small>
                  </div>
                  <p
                    className="text-black mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Alberto Franco,Head of Purchase
                  </p>
                  <p className="text-black mb-2">
                    Alberto Franco,Head of Purchase
                  </p>
                  <div className="mt-3">
                    <small>RECOMMENDED FREQUENCY</small>
                  </div>
                  <p
                    className="text-black mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    SFI234
                  </p>
                  <p className="text-black mb-2">SFI234</p>
                  <div className="card border">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <td>365-1234</td>
                          <td>
                            <MoreHorizOutlinedIcon />
                          </td>
                          <td>
                            <MoreHorizOutlinedIcon />
                          </td>
                          <td>
                            <MoreHorizOutlinedIcon />
                          </td>
                          <td>
                            <div className="d-flex justify-content-between">
                              <div className="mr-3">
                                <small
                                  style={{ textDecoration: "line-through" }}
                                >
                                  $80
                                </small>
                                <p className="mb-0 mt-2">$100</p>
                              </div>
                              <div>
                                <span
                                  className="c-btn"
                                  style={{ position: "unset" }}
                                >
                                  J
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card border p-3 bg-primary ">
                  <h5 className="d-flex align-items-center justify-content-between mb-0">
                    <div className="text-white" style={{ display: "contents" }}>
                      <span className="mr-3">Service Estimate 02</span>
                      <div>
                        <a href="#" className="btn-sm text-white">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="btn-sm text-white">
                          <i
                            className="fa fa-bookmark-o"
                            aria-hidden="true"
                          ></i>
                        </a>
                        <a href="#" className="btn-sm text-white">
                          <i className="fa fa-folder-o" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </h5>
                </div>
                <div className="card border p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">
                      5 Aug 21, 1:38 pm
                      <a
                        href="#"
                        className="p-1 more-btn "
                        style={{ marginLeft: "35px" }}
                      >
                        + 2<span className="c-btn">J</span>
                      </a>
                    </p>
                    <p className="mb-0">
                      <a href="#" className="">
                        <MuiMenuComponent options={activityOptions} />
                      </a>
                    </p>
                  </div>

                  <div className="mt-3">
                    <small>MAKE</small>
                  </div>
                  <p
                    className="text-black mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Chinalco Sa,Beijing,Chaina(code 302037)
                  </p>
                  <p className="text-black mb-2">
                    Chinalco Sa,Beijing,Chaina(code 302037)
                  </p>
                  <div className="mt-3">
                    <small>FAMILY</small>
                  </div>
                  <p
                    className="text-black mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Alberto Franco,Head of Purchase
                  </p>
                  <p className="text-black mb-2">
                    Alberto Franco,Head of Purchase
                  </p>
                  <div className="mt-3">
                    <small>RECOMMENDED FREQUENCY</small>
                  </div>
                  <p
                    className="text-black mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    SFI234
                  </p>
                  <p className="text-black mb-2">SFI234</p>
                  <div className="card border">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <td>365-1234</td>
                          <td>
                            <MoreHorizOutlinedIcon />
                          </td>
                          <td>
                            <MoreHorizOutlinedIcon />
                          </td>
                          <td>
                            <MoreHorizOutlinedIcon />
                          </td>
                          <td>
                            <div className="d-flex justify-content-between">
                              <div className="mr-3">
                                <small
                                  style={{ textDecoration: "line-through" }}
                                >
                                  $80
                                </small>
                                <p className="mb-0 mt-2">$100</p>
                              </div>
                              <div>
                                <span
                                  className="c-btn"
                                  style={{ position: "unset" }}
                                >
                                  J
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>{" "}
              </>
            )}

            {/* <div className="">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">5 Aug 21, 1:38 pm by
                  <a href="#" className="p-1 more-btn " style={{ marginLeft: '70px' }}>+ 3 more
                    <span className="c-btn">C</span>
                    <span className="b-btn">B</span>
                    <span className="a-btn">A</span>
                  </a>
                </p>
                <p className="mb-0"><a href="#" className=""><MuiMenuComponent options={activityOptions} /></a></p>

              </div>
            </div>
            <div className="Add-new-segment-div  serviscard p-3 border-radius-10 mt-3">
              <div className="card border">
                <table className="table table-bordered mb-0">
                  <tbody>
                    <tr>
                      <td>365-1234</td>
                      <td><MoreHorizOutlinedIcon /></td>
                      <td><MoreHorizOutlinedIcon /></td>
                      <td><MoreHorizOutlinedIcon /></td>
                      <td >
                        <div className="d-flex justify-content-between">
                          <div className="mr-3">
                            <small style={{ textDecoration: 'line-through' }}>$80</small>
                            <p className="mb-0 mt-2">$100</p>
                          </div>
                          <div><span className="c-btn" style={{ position: 'unset' }}>A</span></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card border ">
                <table className="table table-bordered mb-0">
                  <tbody>
                    <tr>
                      <td>365-1234</td>
                      <td><MoreHorizOutlinedIcon /></td>
                      <td><MoreHorizOutlinedIcon /></td>
                      <td><MoreHorizOutlinedIcon /></td>
                      <td >
                        <div className="d-flex justify-content-between">
                          <div className="mr-3">
                            <small style={{ textDecoration: 'line-through' }}>$80</small>
                            <p className="mb-0 mt-2">$100</p>
                          </div>
                          <div><span className="c-btn" style={{ position: 'unset' }}>A</span></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );

  const [time, setTime] = useState("");

  // useEffect(() => {
  //   var now = new Date();
  //   var day = new Date().getDate();
  //   var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //   var month = monthArray[new Date().getMonth()];
  //   var year = new Date().getFullYear()
  //   setDateObj({
  //     day: day,
  //     month: month,
  //     year: year
  //   })
  //   console.log("---")
  //   setLoginData(reduxState.user.loginData)
  //
  //
  //   setInterval(() =>
  //     setTime(new Date().getHours() + " : " + new Date().getMinutes()),
  //     1000)
  //
  //
  //
  //
  // }, [reduxState.user]);

  const fetchVersionHistoryData = async (exitingType, portfolioId) => {
    var caseType;
    if (exitingType == "portfolio") {
      caseType = "portfolio";
    } else if (exitingType == "solution") {
      caseType = "custom portfolio";
    }

    var searchText = portfolioId + "/" + caseType;
    console.log("searchText : ", searchText);
    const auditRes = await getAuditRestServiceData(searchText);
    console.log("auditRes----- ", auditRes);
    setAuditResData(auditRes);
    setExitingAuditName(auditRes[auditRes.length - 1].entityData.name);
  };

  const getFormattedDateTimeByTimeStamp = (timeStamp) => {
    var date = new Date(timeStamp);
    var year = date.getFullYear();
    // var m = date.getMonth() + 1;
    var m = date.getMonth();
    // var month = m < 10 ? '0' + m : m;
    var month = m;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var format = "AM";
    var hour = date.getHours();
    var minutes = date.getMinutes();

    var monthName = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (hour > 11) {
      format = "PM";
    }
    if (hour > 12) {
      hour = hour - 12;
    } else if (hour === 0) {
      hour = 12;
    }

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var finalDateString =
      day +
      " " +
      monthName[month] +
      " " +
      year +
      " " +
      hour +
      ":" +
      minutes +
      " " +
      format;
    // var finalDateString = hour + ":" + minutes + "" + format + ", " + day + " " + monthName[month] + " " + year;
    return finalDateString;
  };

  useEffect(() => {
    var now = new Date();
    var day = new Date().getDate();
    var monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var month = monthArray[new Date().getMonth()];
    var year = new Date().getFullYear();
    setDateObj({
      day: day,
      month: month,
      year: year,
    });
    // if (result.isLoggedIn) {
    //   setLoginUserId(result.currentUser.userId)
    // }
    var userLoginStatus = localStorage.getItem("user_logIn_Status");
    // var currentUserId =
    if (userLoginStatus) {
      setLoginStatus(true);
      setLoginUserId(localStorage.getItem("user_tenantId"));
      // console.log("localStorage.getItem('user_tenantId') : ", localStorage.getItem('user_tenantId'))
      // setLoginUserId(result.currentUser.userId)
    } else {
      setLoginStatus(false);
    }

    // setLoginStatus(result.isLoggedIn)
    // setLoginUserId(result.currentUser.userId)
  }, []);

  useEffect(() => {
    // if (exitingType != undefined) {
    //   if (exitingType.editable) {
    //     // if(exitingType.exitingType = "portfolio"){
    //     fetchVersionHistoryData(exitingType.exitingType, exitingType.portfolioId);
    //     // }
    //     setEditAbleText(editableText+1)
    //   }
    // }else{
    //   setEditAbleText(1)
    // }
  }, []);
  return (
    <>
      {/* Other Component */}
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <div className="headerbottom" style={{width: "100%", marginLeft: 0, zIndex: 21}}>
              <div className="header-content clearfix">
                <div className="row h-100">
                  {/* <div className="col-6 h-100">
                    <ul className="justify-content-start">
                      <li className="cursor mr-2">
                        <a
                          href="#"
                          data-original-title=""
                          title=""
                        >                        
                          <span className="mr-2 collab">
                            <svg
                              style={{width: '27px'}}
                              viewBox="0 0 350 280"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M277 133C277 204.041 216.096 262 140.5 262C64.9035 262 4 204.041 4 133C4 61.9592 64.9035 4 140.5 4C216.096 4 277 61.9592 277 133Z"
                                stroke="#872FF7"
                                strokeWidth="16"
                              />
                              <path
                                d="M170.033 110.74C162.26 117.791 151.642 121.81 140.499 121.81C129.356 121.81 118.738 117.791 110.966 110.74C103.206 103.701 98.9315 94.2425 98.9315 84.4726C98.9315 74.7027 103.206 65.244 110.966 58.2049C118.738 51.1541 129.356 47.1348 140.499 47.1348C151.642 47.1348 162.26 51.1541 170.033 58.2049C177.792 65.244 182.067 74.7027 182.067 84.4726C182.067 94.2425 177.792 103.701 170.033 110.74ZM64.7559 198.894C64.7559 169.651 90.998 145.312 124.23 145.312H156.768C190 145.312 216.242 169.651 216.242 198.894C216.242 201.624 213.674 204.486 209.669 204.486H71.329C67.3242 204.486 64.7559 201.624 64.7559 198.894Z"
                                stroke="#872FF7"
                                strokeWidth="16"
                              />
                            </svg>
                          </span>
                          
                          Profile
                        </a>
                      </li>
                      <li className="cursor mr-2">
                        <a
                          href="#"
                          data-original-title=""
                          title=""
                          onClick={toggleDrawer(anchor, true, true)}
                        >
                          <span className="mr-2 collab">
                            <svg
                              style={{ width: "20px" }}
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 182.79509 172.72537"
                            >
                              <defs></defs>
                              <g>
                                <circle
                                  class="cls-1"
                                  cx="92.89864"
                                  cy="100.88062"
                                  r="66.05457"
                                />
                                <path
                                  class="cls-2"
                                  d="M92.89924,172.72537c-39.61397,0-71.84386-32.22989-71.84386-71.84499S53.28527,29.03652,92.89924,29.03652s71.84386,32.22876,71.84386,71.84386-32.22989,71.84499-71.84386,71.84499Zm0-132.10952c-33.22951,0-60.26453,27.03502-60.26453,60.26453s27.03502,60.26566,60.26453,60.26566,60.26453-27.03502,60.26453-60.26566-27.03502-60.26453-60.26453-60.26453Z"
                                />
                              </g>
                              <g>
                                <circle
                                  class="cls-1"
                                  cx="92.89864"
                                  cy="34.82605"
                                  r="29.03653"
                                />
                                <path
                                  class="cls-2"
                                  d="M92.89924,69.65238c-19.20314,0-34.82619-15.62305-34.82619-34.82619S73.6961,0,92.89924,0s34.82619,15.62305,34.82619,34.82619-15.62305,34.82619-34.82619,34.82619Zm0-58.07305c-12.81868,0-23.24686,10.42818-23.24686,23.24686s10.42818,23.24686,23.24686,23.24686,23.24686-10.42818,23.24686-23.24686-10.42818-23.24686-23.24686-23.24686Z"
                                />
                              </g>
                              <g>
                                <circle
                                  class="cls-1"
                                  cx="34.82558"
                                  cy="135.471"
                                  r="29.03653"
                                />
                                <path
                                  class="cls-2"
                                  d="M34.82619,170.29755c-19.20314,0-34.82619-15.62305-34.82619-34.82619s15.62305-34.82619,34.82619-34.82619,34.82619,15.62305,34.82619,34.82619-15.62305,34.82619-34.82619,34.82619Zm0-58.07305c-12.81868,0-23.24686,10.42818-23.24686,23.24686s10.42818,23.24686,23.24686,23.24686,23.24686-10.42818,23.24686-23.24686-10.42818-23.24686-23.24686-23.24686Z"
                                />
                              </g>
                              <g>
                                <circle
                                  class="cls-1"
                                  cx="147.96849"
                                  cy="135.471"
                                  r="29.03653"
                                />
                                <path
                                  class="cls-2"
                                  d="M147.9689,170.29755c-19.20314,0-34.82619-15.62305-34.82619-34.82619s15.62305-34.82619,34.82619-34.82619,34.82619,15.62305,34.82619,34.82619-15.62305,34.82619-34.82619,34.82619Zm0-58.07305c-12.81868,0-23.24686,10.42818-23.24686,23.24686s10.42818,23.24686,23.24686,23.24686,23.24686-10.42818,23.24686-23.24686-10.42818-23.24686-23.24686-23.24686Z"
                                />
                              </g>
                            </svg>
                          </span>
                          Collaborators
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  <div className="col-12 h-100">
                    <ul className="justify-content-start">
                      {/* <li className="cursor"><a href="#" data-toggle="modal" data-target="#Versionhistory"><img src={repeateIcon}></img></a></li> */}
                      {/* <li className="cursor"><a href="#" onClick={toggleDrawer(anchor, true, false)}><img src={repeateIcon}></img></a></li>
                      <li className="cursor"><a href="#" data-original-title="" title="" onClick={toggleDrawer(anchor, true, true)}><img src={peopleIcon}></img></a></li> */}
                      <li className="cursor mr-2 ">
                        <a href="#" onClick={toggleDrawer(anchor, true, false)}>
                          <span className="mr-2 version-history">
                            <svg
                              style={{ width: "20px" }}
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 176.44455 158.21163"
                            >
                              <defs></defs>
                              <g>
                                <path
                                  class="cls-2"
                                  d="M50.15975,122.41183H30.58119c-3.19789,0-5.78966-2.59178-5.78966-5.78966s2.59178-5.78966,5.78966-5.78966h19.57856c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"
                                />
                                <path
                                  class="cls-2"
                                  d="M50.15975,97.40093H30.58119c-3.19789,0-5.78966-2.59178-5.78966-5.78966s2.59178-5.78966,5.78966-5.78966h19.57856c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"
                                />
                                <path
                                  class="cls-2"
                                  d="M50.15975,72.39003H30.58119c-3.19789,0-5.78966-2.59178-5.78966-5.78966s2.59178-5.78966,5.78966-5.78966h19.57856c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"
                                />
                                <path
                                  class="cls-2"
                                  d="M50.15975,47.378H30.58119c-3.19789,0-5.78966-2.59178-5.78966-5.78966s2.59178-5.78966,5.78966-5.78966h19.57856c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"
                                />
                              </g>
                              <path
                                class="cls-2"
                                d="M114.15138,158.21163H12.99734c-7.16697,0-12.99734-5.8315-12.99734-12.99848V12.99848C0,5.8315,5.83037,0,12.99734,0H114.15138c7.16697,0,12.99734,5.8315,12.99734,12.99848V145.21315c0,7.16697-5.83037,12.99848-12.99734,12.99848ZM12.99734,11.57933c-.78251,0-1.41802,.63664-1.41802,1.41915V145.21315c0,.78251,.63551,1.41915,1.41802,1.41915H114.15138c.78251,0,1.41802-.63664,1.41802-1.41915V12.99848c0-.78251-.63551-1.41915-1.41802-1.41915H12.99734Z"
                              />
                              <g>
                                <circle
                                  class="cls-1"
                                  cx="121.35872"
                                  cy="79.10553"
                                  r="49.296"
                                />
                                <path
                                  class="cls-2"
                                  d="M121.35906,134.19131c-30.37312,0-55.08549-24.71124-55.08549-55.08549s24.71237-55.08549,55.08549-55.08549,55.08549,24.71124,55.08549,55.08549-24.71237,55.08549-55.08549,55.08549Zm0-98.59165c-23.98866,0-43.50616,19.51637-43.50616,43.50616s19.5175,43.50616,43.50616,43.50616,43.50616-19.51637,43.50616-43.50616-19.5175-43.50616-43.50616-43.50616Z"
                                />
                              </g>
                              <g>
                                <polyline
                                  class="cls-1"
                                  points="121.35872 58.0879 121.35872 79.10553 147.3426 79.10553"
                                />
                                <path
                                  class="cls-2"
                                  d="M147.34244,84.89548h-25.98338c-3.19789,0-5.78966-2.59178-5.78966-5.78966v-21.01807c0-3.19789,2.59178-5.78966,5.78966-5.78966s5.78966,2.59178,5.78966,5.78966v15.2284h20.19372c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"
                                />
                              </g>
                            </svg>
                          </span>
                          Version history
                        </a>
                      </li>
                      <li className="cursor mr-2">
                        <a
                          href="#"
                          data-original-title=""
                          title=""
                          onClick={toggleDrawer(anchor, true, true)}
                        >
                          <span className="mr-2 collab">
                            <svg
                              style={{ width: "20px" }}
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 182.79509 172.72537"
                            >
                              <defs></defs>
                              <g>
                                <circle
                                  class="cls-1"
                                  cx="92.89864"
                                  cy="100.88062"
                                  r="66.05457"
                                />
                                <path
                                  class="cls-2"
                                  d="M92.89924,172.72537c-39.61397,0-71.84386-32.22989-71.84386-71.84499S53.28527,29.03652,92.89924,29.03652s71.84386,32.22876,71.84386,71.84386-32.22989,71.84499-71.84386,71.84499Zm0-132.10952c-33.22951,0-60.26453,27.03502-60.26453,60.26453s27.03502,60.26566,60.26453,60.26566,60.26453-27.03502,60.26453-60.26566-27.03502-60.26453-60.26453-60.26453Z"
                                />
                              </g>
                              <g>
                                <circle
                                  class="cls-1"
                                  cx="92.89864"
                                  cy="34.82605"
                                  r="29.03653"
                                />
                                <path
                                  class="cls-2"
                                  d="M92.89924,69.65238c-19.20314,0-34.82619-15.62305-34.82619-34.82619S73.6961,0,92.89924,0s34.82619,15.62305,34.82619,34.82619-15.62305,34.82619-34.82619,34.82619Zm0-58.07305c-12.81868,0-23.24686,10.42818-23.24686,23.24686s10.42818,23.24686,23.24686,23.24686,23.24686-10.42818,23.24686-23.24686-10.42818-23.24686-23.24686-23.24686Z"
                                />
                              </g>
                              <g>
                                <circle
                                  class="cls-1"
                                  cx="34.82558"
                                  cy="135.471"
                                  r="29.03653"
                                />
                                <path
                                  class="cls-2"
                                  d="M34.82619,170.29755c-19.20314,0-34.82619-15.62305-34.82619-34.82619s15.62305-34.82619,34.82619-34.82619,34.82619,15.62305,34.82619,34.82619-15.62305,34.82619-34.82619,34.82619Zm0-58.07305c-12.81868,0-23.24686,10.42818-23.24686,23.24686s10.42818,23.24686,23.24686,23.24686,23.24686-10.42818,23.24686-23.24686-10.42818-23.24686-23.24686-23.24686Z"
                                />
                              </g>
                              <g>
                                <circle
                                  class="cls-1"
                                  cx="147.96849"
                                  cy="135.471"
                                  r="29.03653"
                                />
                                <path
                                  class="cls-2"
                                  d="M147.9689,170.29755c-19.20314,0-34.82619-15.62305-34.82619-34.82619s15.62305-34.82619,34.82619-34.82619,34.82619,15.62305,34.82619,34.82619-15.62305,34.82619-34.82619,34.82619Zm0-58.07305c-12.81868,0-23.24686,10.42818-23.24686,23.24686s10.42818,23.24686,23.24686,23.24686,23.24686-10.42818,23.24686-23.24686-10.42818-23.24686-23.24686-23.24686Z"
                                />
                              </g>
                            </svg>
                          </span>
                          Collaborators
                        </a>
                      </li>
                      {/* <li className="cursor mr-2">
                        <a href="/insights" data-original-title="" title="">
                          <span className="mr-2 insight">
                            <svg
                              class="insight"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 37 39.6"
                            >
                              <g>
                                <g>
                                  <path
                                    class="st1"
                                    d="M5.3,39.6c-2.9,0-5.3-2.4-5.3-5.3V23.8c0-2.9,2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3v10.4
                                        C10.6,37.2,8.2,39.6,5.3,39.6z M5.3,21c-1.5,0-2.8,1.3-2.8,2.8v10.4c0,1.5,1.3,2.8,2.8,2.8s2.8-1.3,2.8-2.8V23.8
                                        C8.1,22.3,6.8,21,5.3,21z"
                                  />
                                </g>
                                <g>
                                  <path
                                    class="st1"
                                    d="M18.5,39.6c-2.9,0-5.3-2.4-5.3-5.3v-29c0-2.9,2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3v29
                                        C23.8,37.2,21.4,39.6,18.5,39.6z M18.5,2.5c-1.5,0-2.8,1.3-2.8,2.8v29c0,1.5,1.3,2.8,2.8,2.8s2.8-1.3,2.8-2.8v-29
                                        C21.3,3.8,20,2.5,18.5,2.5z"
                                  />
                                </g>
                                <g>
                                  <path
                                    class="st1"
                                    d="M31.7,39.6c-2.9,0-5.3-2.4-5.3-5.3V16.6c0-2.9,2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3v17.6
                                        C37,37.2,34.6,39.6,31.7,39.6z M31.7,13.8c-1.5,0-2.8,1.3-2.8,2.8v17.6c0,1.5,1.3,2.8,2.8,2.8s2.8-1.3,2.8-2.8V16.6
                                        C34.5,15.1,33.2,13.8,31.7,13.8z"
                                  />
                                </g>
                              </g>
                            </svg>
                          </span>
                          Insights{" "}
                        </a>
                      </li> */}
                      {/* <li className="cursor"><a href="#" data-toggle="modal" data-target="#myModal2"><WarningAmberIcon className="mr-2" style={{ fontSize: '21px', color: '#000' }} />Errors</a></li> */}
                    </ul>
                  </div>
                  {/* <div className="col-6 h-100 ">
                    <ul className="   justify-content-end">
                      <li>
                        Date:{dateObj.day}-{dateObj.month}-{dateObj.year}
                      </li>
                      <li>
                        Time:
                        <Clock format={"h:mm:ssa"} ticking={true} />
                      </li>
                      <li>
                        {loginStatus ? <>User ID: {loginUserId}</> : <>Login</>}
                      </li>
                    </ul>
                  </div> */}
                   {/* <li>User ID:{"loginData?.userId"}</li> */}
                      {/* <li>User ID:{loginUserId}</li> */}
                      {/* <li>User ROLE:{"loginData?.role"}</li>
                      <li>User SUB-ROLE:{"loginData?.userSubRole"}</li> */}
                </div>
              </div>
            </div>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false, true)}
              onOpen={toggleDrawer(anchor, true, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>

      <div
        className="modal fade"
        id="Assingmodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ zIndex: "1201" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Assing to
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body bg-white">
              <p>
                Are you sure that you want to invite{/*<email />*/} to edit the
                soluytion
              </p>
            </div>
            <div className="modal-footer d-block">
              <div className="row">
                <div className="col-6">
                  <a href="#" className="btn border d-block">
                    No
                  </a>
                </div>
                <div className="col-6">
                  <a href="#" className="btn bg-primary text-white d-block">
                    Yes
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal right fade"
        id="Versionhistory"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel2"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header ">
              <h4 className="modal-title" id="myModalLabel2">
                Version history
              </h4>
              <div className="d-flex">
                <div className="headerdropdown">
                  <Box>
                    <FormControl fullWidth>
                      <NativeSelect
                        defaultValue={30}
                        inputProps={{
                          name: "age",
                          id: "uncontrolled-native",
                        }}
                      >
                        <option value={10}>All</option>
                        <option value={20}>All2</option>
                        <option value={30}>All</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                </div>
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
              <div className="card border p-3">
                <h5 className="d-flex align-items-center mb-0">
                  <div className="" style={{ display: "contents" }}>
                    <span className="mr-3">Service Estimate 01</span>
                    <a href="#" className="btn-sm">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </a>{" "}
                    <a href="#" className="btn-sm">
                      <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                    </a>{" "}
                    <a href="#" className="btn-sm">
                      <i className="fa fa-folder-o" aria-hidden="true"></i>
                    </a>
                  </div>
                </h5>
                <div className="mt-3">
                  <small>MAKE</small>
                </div>
                <p
                  className="text-black mb-2"
                  style={{ textDecoration: "line-through" }}
                >
                  Chinalco Sa,Beijing,Chaina(code 302037)
                </p>
                <p className="text-black mb-2">
                  Chinalco Sa,Beijing,Chaina(code 302037)
                </p>
                <div className="mt-3">
                  <small>FAMILY</small>
                </div>
                <p
                  className="text-black mb-2"
                  style={{ textDecoration: "line-through" }}
                >
                  Alberto Franco,Head of Purchase
                </p>
                <p className="text-black mb-2">
                  Alberto Franco,Head of Purchase
                </p>
                <div className="mt-3">
                  <small>RECOMMENDED FREQUENCY</small>
                </div>
                <p
                  className="text-black mb-2"
                  style={{ textDecoration: "line-through" }}
                >
                  SFI234
                </p>
                <p className="text-black mb-2">SFI234</p>
              </div>
              <div className="">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">
                    5 Aug 21, 1:38 pm by
                    <a
                      href="#"
                      className="p-1 more-btn "
                      style={{ marginLeft: "70px" }}
                    >
                      + 3 more
                      <span className="c-btn">C</span>
                      <span className="b-btn">B</span>
                      <span className="a-btn">A</span>
                    </a>
                  </p>
                  <p className="mb-0">
                    <a href="#" className="">
                      <MuiMenuComponent options={activityOptions} />
                    </a>
                  </p>
                </div>
              </div>
              <div className="Add-new-segment-div  serviscard p-3 border-radius-10 mt-3">
                <div className="card border">
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td>365-1234</td>
                        <td>
                          <MoreHorizOutlinedIcon />
                        </td>
                        <td>
                          <MoreHorizOutlinedIcon />
                        </td>
                        <td>
                          <MoreHorizOutlinedIcon />
                        </td>
                        <td>
                          <div className="d-flex justify-content-between">
                            <div className="mr-3">
                              <small style={{ textDecoration: "line-through" }}>
                                $80
                              </small>
                              <p className="mb-0 mt-2">$100</p>
                            </div>
                            <div>
                              <span
                                className="c-btn"
                                style={{ position: "unset" }}
                              >
                                A
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card border ">
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td>365-1234</td>
                        <td>
                          <MoreHorizOutlinedIcon />
                        </td>
                        <td>
                          <MoreHorizOutlinedIcon />
                        </td>
                        <td>
                          <MoreHorizOutlinedIcon />
                        </td>
                        <td>
                          <div className="d-flex justify-content-between">
                            <div className="mr-3">
                              <small style={{ textDecoration: "line-through" }}>
                                $80
                              </small>
                              <p className="mb-0 mt-2">$100</p>
                            </div>
                            <div>
                              <span
                                className="c-btn"
                                style={{ position: "unset" }}
                              >
                                A
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal right fade"
        id="myModal2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel2"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel2">
                <ErrorOutlineIcon
                  className="mr-2"
                  style={{ fontSize: "32px" }}
                />
                Errors
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="d-flex justify-content-between align-items-center px-3 border-bottom">
                <h6 className="mb-0">3 errors found in line items</h6>
                <div>
                  <a href="#" className="btn">
                    <ClearIcon className="mr-2" style={{ color: "#000" }} />
                    Clear All
                  </a>
                </div>
              </div>
              <div className=" mt-2">
                <h6 className="px-3">FILTER</h6>
                <Box
                  className="mt-4"
                  sx={{ width: "100%", typography: "body1" }}
                >
                  <TabContext value={value}>
                    <Box
                      className="custom-tabs"
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                    >
                      <TabList
                        className="custom-tabs-div"
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Part list" value="1" />
                        <Tab label="Service Estimates" value="2" />
                        <Tab label="Form" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel className="px-3" value="1">
                      <div className="card border p-3 mb-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">Invalid data</p>
                          <h6 className="mb-0">2 min ago</h6>
                        </div>
                        <h6 className="mb-0">
                          {" "}
                          Part list header component code
                        </h6>
                        <p className="mb-0">
                          Fix{" "}
                          <a href="#" className="btn">
                            Go to field
                          </a>
                        </p>
                      </div>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                  </TabContext>
                </Box>
                <hr className="mb-0" />
                <div className="p-3">
                  <a href="#" className="btn text-light border-light px-2">
                    Go Back to Solution
                  </a>
                  <a href="#" className="btn btn-primary float-right px-2">
                    Choose the correct portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
