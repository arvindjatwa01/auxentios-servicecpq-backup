import React, { useEffect, useState } from "react";
import peopleIcon from '../assets/icons/svg/people.svg'
import repeateIcon from '../assets/icons/svg/repeate-music.svg'
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import searchIcon from '../assets/icons/svg/search.svg'
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { MuiMenuComponent } from "../pages/Operational/index";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Select from 'react-select';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux'
// import { signUpActions } from "../../src/features/auth/authSlice";
import { authActions } from "../../src/features/auth/authSlice";

import Clock from 'react-live-clock';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { signup } from './../services/userServices';

export function SubHeaderComponent(props) {

  // const dispatch = useDispatch();
  const result = useSelector((state) => state.loginSuccess);
  // console.log("result is : ", result)
  const [loginUserId, setLoginUserId] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  // console.log("result of user subheader component : ", result.currentUser)

  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState('1');
  const [dateObj, setDateObj] = useState({
    day: '0',
    month: "0",
    year: "0"
  })

  const [state, setState] = React.useState({
    top: false,
  });
  const [isShareSideBar, setIsShareSideBar] = useState(false)

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
    setIsShareSideBar(type)
    console.log("====")
    console.log(anchor)
    setState({ ...state, [anchor]: open });
  };
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];
  const list = (anchor) => (
    <>
      {isShareSideBar ?
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
          <div className="modal-header d-block"><button type="button" className="close" onClick={toggleDrawer(anchor, false, true)}><span aria-hidden="true">×</span></button><h4 className="modal-title" id="myModalLabel2">Share</h4></div>
          <Divider />
          <div className="p-3">
            <div>
              <a href="#" className="btn border" >Internal</a>
              <a href="#" className="btn bg-primary text-white">Customer</a>
            </div>
            <h6 className="mt-3">MEMBERS</h6>
            <p>Amet minim mollit non deserunt ullamco est sit Viewer</p>

            <div className=" d-flex">
              <div className="input-group icons approvesearch mr-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                    <img src={searchIcon} />
                  </span>
                </div>
                <input type="search" className="form-control" placeholder="" aria-label="Search Dashboard" />
                <div className="customselect d-flex align-items-center" style={{ position: 'absolute', right: '10px', top: '10px' }}>
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
                <a href="#" className="btn bg-primary text-white" data-toggle="modal" data-target="#Assingmodal">Invite</a>
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
                  <a href="#" className="btn text-light">Can Approve <span><KeyboardArrowDownIcon /></span></a>
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
                  <a href="#" className="btn text-light">Can Approve <span><KeyboardArrowDownIcon /></span></a>
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
                  <a href="#" className="btn text-light">Can Approve <span><KeyboardArrowDownIcon /></span></a>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className=" col-md-6">
                <a href="#" className="btn border d-block">Cancel</a>
              </div>
              <div className=" col-md-6">
                <a href="#" className="btn d-block bg-primary text-white"><ShareOutlinedIcon className="mr-2 font-size-18" />Share</a>
              </div>
            </div>

          </div>
        </Box>
        :
        <div className="modal-content">
          <div className="modal-header ">
            <h4 className="modal-title" id="myModalLabel2">Version history</h4>
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
              <button type="button" className="close" onClick={toggleDrawer(anchor, false, false)}><span aria-hidden="true">&times;</span></button>
            </div>
          </div>
          <div className="modal-body" style={{ background: 'white' }}>
            <div className="card border p-3 bg-primary ">
              <h5 className="d-flex align-items-center justify-content-between mb-0">
                <div className="text-white" style={{ display: 'contents' }}><span className="mr-3">Service Estimate 01</span>
                  <div>
                    <a href="#" className="btn-sm text-white"><i className="fa fa-pencil" aria-hidden="true"></i></a>
                    <a href="#" className="btn-sm text-white"><i className="fa fa-bookmark-o" aria-hidden="true"></i></a>
                    <a href="#" className="btn-sm text-white"><i className="fa fa-folder-o" aria-hidden="true"></i></a></div>
                </div>
              </h5>
            </div>
            <div className="card border p-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">5 Aug 21, 1:38 pm
                  <a href="#" className="p-1 more-btn " style={{ marginLeft: '35px' }}>+ 2
                    <span className="c-btn">J</span>
                  </a>
                </p>
                <p className="mb-0"><a href="#" className=""><MuiMenuComponent options={activityOptions} /></a></p>

              </div>

              <div className="mt-3">
                <small>MAKE</small>
              </div>
              <p className="text-black mb-2" style={{ textDecoration: 'line-through' }}>Chinalco Sa,Beijing,Chaina(code 302037)</p>
              <p className="text-black mb-2">Chinalco Sa,Beijing,Chaina(code 302037)</p>
              <div className="mt-3">
                <small>FAMILY</small>
              </div>
              <p className="text-black mb-2" style={{ textDecoration: 'line-through' }}>Alberto Franco,Head of Purchase</p>
              <p className="text-black mb-2">Alberto Franco,Head of Purchase</p>
              <div className="mt-3">
                <small>RECOMMENDED FREQUENCY</small>
              </div>
              <p className="text-black mb-2" style={{ textDecoration: 'line-through' }}>SFI234</p>
              <p className="text-black mb-2">SFI234</p>
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
                          <div><span className="c-btn" style={{ position: 'unset' }}>J</span></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card border p-3 bg-primary ">
              <h5 className="d-flex align-items-center justify-content-between mb-0">
                <div className="text-white" style={{ display: 'contents' }}><span className="mr-3">Service Estimate 02</span>
                  <div>
                    <a href="#" className="btn-sm text-white"><i className="fa fa-pencil" aria-hidden="true"></i></a>
                    <a href="#" className="btn-sm text-white"><i className="fa fa-bookmark-o" aria-hidden="true"></i></a>
                    <a href="#" className="btn-sm text-white"><i className="fa fa-folder-o" aria-hidden="true"></i></a></div>
                </div>
              </h5>
            </div>
            <div className="card border p-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">5 Aug 21, 1:38 pm
                  <a href="#" className="p-1 more-btn " style={{ marginLeft: '35px' }}>+ 2
                    <span className="c-btn">J</span>
                  </a>
                </p>
                <p className="mb-0"><a href="#" className=""><MuiMenuComponent options={activityOptions} /></a></p>

              </div>

              <div className="mt-3">
                <small>MAKE</small>
              </div>
              <p className="text-black mb-2" style={{ textDecoration: 'line-through' }}>Chinalco Sa,Beijing,Chaina(code 302037)</p>
              <p className="text-black mb-2">Chinalco Sa,Beijing,Chaina(code 302037)</p>
              <div className="mt-3">
                <small>FAMILY</small>
              </div>
              <p className="text-black mb-2" style={{ textDecoration: 'line-through' }}>Alberto Franco,Head of Purchase</p>
              <p className="text-black mb-2">Alberto Franco,Head of Purchase</p>
              <div className="mt-3">
                <small>RECOMMENDED FREQUENCY</small>
              </div>
              <p className="text-black mb-2" style={{ textDecoration: 'line-through' }}>SFI234</p>
              <p className="text-black mb-2">SFI234</p>
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
                          <div><span className="c-btn" style={{ position: 'unset' }}>J</span></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
      }

    </>
  );

  const [time, setTime] = useState("")


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
  useEffect(() => {
    var now = new Date();
    var day = new Date().getDate();
    var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = monthArray[new Date().getMonth()];
    var year = new Date().getFullYear()
    setDateObj({
      day: day,
      month: month,
      year: year
    })
    // if (result.isLoggedIn) {
    //   setLoginUserId(result.currentUser.userId)
    // }
    var userLoginStatus = localStorage.getItem('user_logIn_Status');
    // var currentUserId = 
    if (userLoginStatus) {
      setLoginStatus(true)
      setLoginUserId(localStorage.getItem('user_tenantId'))
      // console.log("localStorage.getItem('user_tenantId') : ", localStorage.getItem('user_tenantId'))
      // setLoginUserId(result.currentUser.userId)
    } else {
      setLoginStatus(false)
    }
    // setLoginStatus(result.isLoggedIn)
    // setLoginUserId(result.currentUser.userId)
  }, [])
  return (
    <>


      {/* Other Component */}
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <div className="headerbottom">
              <div className="header-content clearfix" >
                <div className="row h-100">
                  <div className="col-6 h-100">
                    <ul className=" ">
                      {/* <li className="cursor"><a href="#" data-toggle="modal" data-target="#Versionhistory"><img src={repeateIcon}></img></a></li> */}
                      {/* <li className="cursor"><a href="#" onClick={toggleDrawer(anchor, true, false)}><img src={repeateIcon}></img></a></li>
                      <li className="cursor"><a href="#" data-original-title="" title="" onClick={toggleDrawer(anchor, true, true)}><img src={peopleIcon}></img></a></li> */}
                      <li className="cursor"><a href="#" onClick={toggleDrawer(anchor, true, false)}>
                      <span className="mr-2">
                      <svg style={{width:"27px"}} id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.44455 158.21163"><defs></defs><g><path class="cls-2" d="M50.15975,122.41183H30.58119c-3.19789,0-5.78966-2.59178-5.78966-5.78966s2.59178-5.78966,5.78966-5.78966h19.57856c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"/><path class="cls-2" d="M50.15975,97.40093H30.58119c-3.19789,0-5.78966-2.59178-5.78966-5.78966s2.59178-5.78966,5.78966-5.78966h19.57856c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"/><path class="cls-2" d="M50.15975,72.39003H30.58119c-3.19789,0-5.78966-2.59178-5.78966-5.78966s2.59178-5.78966,5.78966-5.78966h19.57856c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"/><path class="cls-2" d="M50.15975,47.378H30.58119c-3.19789,0-5.78966-2.59178-5.78966-5.78966s2.59178-5.78966,5.78966-5.78966h19.57856c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"/></g><path class="cls-2" d="M114.15138,158.21163H12.99734c-7.16697,0-12.99734-5.8315-12.99734-12.99848V12.99848C0,5.8315,5.83037,0,12.99734,0H114.15138c7.16697,0,12.99734,5.8315,12.99734,12.99848V145.21315c0,7.16697-5.83037,12.99848-12.99734,12.99848ZM12.99734,11.57933c-.78251,0-1.41802,.63664-1.41802,1.41915V145.21315c0,.78251,.63551,1.41915,1.41802,1.41915H114.15138c.78251,0,1.41802-.63664,1.41802-1.41915V12.99848c0-.78251-.63551-1.41915-1.41802-1.41915H12.99734Z"/><g><circle class="cls-1" cx="121.35872" cy="79.10553" r="49.296"/><path class="cls-2" d="M121.35906,134.19131c-30.37312,0-55.08549-24.71124-55.08549-55.08549s24.71237-55.08549,55.08549-55.08549,55.08549,24.71124,55.08549,55.08549-24.71237,55.08549-55.08549,55.08549Zm0-98.59165c-23.98866,0-43.50616,19.51637-43.50616,43.50616s19.5175,43.50616,43.50616,43.50616,43.50616-19.51637,43.50616-43.50616-19.5175-43.50616-43.50616-43.50616Z"/></g><g><polyline class="cls-1" points="121.35872 58.0879 121.35872 79.10553 147.3426 79.10553"/><path class="cls-2" d="M147.34244,84.89548h-25.98338c-3.19789,0-5.78966-2.59178-5.78966-5.78966v-21.01807c0-3.19789,2.59178-5.78966,5.78966-5.78966s5.78966,2.59178,5.78966,5.78966v15.2284h20.19372c3.19789,0,5.78966,2.59178,5.78966,5.78966s-2.59178,5.78966-5.78966,5.78966Z"/></g></svg>
                      </span>
                      Version history</a></li>
                      <li className="cursor"><a href="#" data-original-title="" title="" onClick={toggleDrawer(anchor, true, true)}>
                      <span className="mr-2">
                      <svg style={{width:"27px"}} id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182.79509 172.72537"><defs></defs><g><circle class="cls-1" cx="92.89864" cy="100.88062" r="66.05457"/><path class="cls-2" d="M92.89924,172.72537c-39.61397,0-71.84386-32.22989-71.84386-71.84499S53.28527,29.03652,92.89924,29.03652s71.84386,32.22876,71.84386,71.84386-32.22989,71.84499-71.84386,71.84499Zm0-132.10952c-33.22951,0-60.26453,27.03502-60.26453,60.26453s27.03502,60.26566,60.26453,60.26566,60.26453-27.03502,60.26453-60.26566-27.03502-60.26453-60.26453-60.26453Z"/></g><g><circle class="cls-1" cx="92.89864" cy="34.82605" r="29.03653"/><path class="cls-2" d="M92.89924,69.65238c-19.20314,0-34.82619-15.62305-34.82619-34.82619S73.6961,0,92.89924,0s34.82619,15.62305,34.82619,34.82619-15.62305,34.82619-34.82619,34.82619Zm0-58.07305c-12.81868,0-23.24686,10.42818-23.24686,23.24686s10.42818,23.24686,23.24686,23.24686,23.24686-10.42818,23.24686-23.24686-10.42818-23.24686-23.24686-23.24686Z"/></g><g><circle class="cls-1" cx="34.82558" cy="135.471" r="29.03653"/><path class="cls-2" d="M34.82619,170.29755c-19.20314,0-34.82619-15.62305-34.82619-34.82619s15.62305-34.82619,34.82619-34.82619,34.82619,15.62305,34.82619,34.82619-15.62305,34.82619-34.82619,34.82619Zm0-58.07305c-12.81868,0-23.24686,10.42818-23.24686,23.24686s10.42818,23.24686,23.24686,23.24686,23.24686-10.42818,23.24686-23.24686-10.42818-23.24686-23.24686-23.24686Z"/></g><g><circle class="cls-1" cx="147.96849" cy="135.471" r="29.03653"/><path class="cls-2" d="M147.9689,170.29755c-19.20314,0-34.82619-15.62305-34.82619-34.82619s15.62305-34.82619,34.82619-34.82619,34.82619,15.62305,34.82619,34.82619-15.62305,34.82619-34.82619,34.82619Zm0-58.07305c-12.81868,0-23.24686,10.42818-23.24686,23.24686s10.42818,23.24686,23.24686,23.24686,23.24686-10.42818,23.24686-23.24686-10.42818-23.24686-23.24686-23.24686Z"/></g></svg>
                      </span>
                      Collaborators</a></li>
                      <li className="cursor"><a href="#" data-original-title="" title=""><BarChartOutlinedIcon className="mr-2" style={{ fontSize: '21px', color: '#000' }} />Insights </a></li>
                      <li className="cursor"><a href="#" data-original-title="" title="Note" data-toggle="modal" data-target="#notemodal"><EventNoteOutlinedIcon className="mr-2" style={{ fontSize: '21px', color: '#000' }} />Notes </a></li>
                      <li className="cursor"><a href="#" data-toggle="modal" data-target="#myModal2"><WarningAmberIcon className="mr-2" style={{ fontSize: '21px', color: '#000' }} />Errors</a></li>
                    </ul>
                  </div>
                  <div className="col-6 h-100 ">
                    <ul className="   justify-content-end">
                      <li>Date:{dateObj.day}-{dateObj.month}-{dateObj.year}</li>
                      <li>Time:<Clock
                        format={'h:mm:ssa'}
                        ticking={true} /></li>
                      {/* {LoginStatus ? <></>} */}
                      <li>{loginStatus ? <>User ID: {loginUserId}</> : <>Login</>}</li>
                      {/* <li>User ID:{"loginData?.userId"}</li> */}
                      {/* <li>User ID:{loginUserId}</li> */}
                      {/* <li>User ROLE:{"loginData?.role"}</li>
                      <li>User SUB-ROLE:{"loginData?.userSubRole"}</li> */}

                    </ul>
                  </div>
                </div >
              </div >
            </div >
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

      <div className="modal fade" id="Assingmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ zIndex: '1201' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Assing to</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body bg-white">
              <p>Are you sure that you want to invite{/*<email />*/} to edit the soluytion</p>
            </div>
            <div className="modal-footer d-block">
              <div className="row">
                <div className="col-6">
                  <a href="#" className="btn border d-block">No</a>
                </div>
                <div className="col-6">
                  <a href="#" className="btn bg-primary text-white d-block">Yes</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal right fade" id="Versionhistory" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header ">
              <h4 className="modal-title" id="myModalLabel2">Version history</h4>
              <div className="d-flex">
                <div className="headerdropdown">
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
                  </Box></div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
            </div>
            <div className="modal-body" style={{ background: 'white' }}>
              <div className="card border p-3">
                <h5 className="d-flex align-items-center mb-0">
                  <div className="" style={{ display: 'contents' }}><span className="mr-3">Service Estimate 01</span><a href="#" className="btn-sm"><i className="fa fa-pencil" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i className="fa fa-bookmark-o" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i className="fa fa-folder-o" aria-hidden="true"></i></a></div>
                </h5>
                <div className="mt-3">
                  <small>MAKE</small>
                </div>
                <p className="text-black mb-2" style={{ textDecoration: 'line-through' }}>Chinalco Sa,Beijing,Chaina(code 302037)</p>
                <p className="text-black mb-2">Chinalco Sa,Beijing,Chaina(code 302037)</p>
                <div className="mt-3">
                  <small>FAMILY</small>
                </div>
                <p className="text-black mb-2" style={{ textDecoration: 'line-through' }}>Alberto Franco,Head of Purchase</p>
                <p className="text-black mb-2">Alberto Franco,Head of Purchase</p>
                <div className="mt-3">
                  <small>RECOMMENDED FREQUENCY</small>
                </div>
                <p className="text-black mb-2" style={{ textDecoration: 'line-through' }}>SFI234</p>
                <p className="text-black mb-2">SFI234</p>
              </div>
              <div className="">
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
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className="modal fade" id="notemodal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel2">Add Notes</h4>
              <div className="d-flex">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>

            </div>
            <div className="bg-light p-4">
              <a href="#" className="mr-4"><EditOutlinedIcon className="mr-2" />Edit</a>
              <a href="#" className="mr-2"><ShareOutlinedIcon className="mr-2" />Share</a>
            </div>


            <div className="modal-body" style={{ background: 'white' }}>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-600" htmlFor="exampleInputEmail1">NOTE FOR</label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder="1000-ENGINE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-600" htmlFor="exampleInputEmail1">NOTE TYPE</label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder="1000-ENGINE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="d-block align-items-center date-box">
                    <label
                      className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                      htmlFor="exampleInputEmail1"
                    >
                      <span className=" mr-2">DATE</span>
                    </label>
                    <div className="form-group w-100">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          variant="inline"
                          format="dd/MM/yyyy"
                          className="form-controldate border-radius-10"
                          label=""
                          value={validityData.fromDate}
                          onChange={(e) =>
                            setValidityData({
                              ...validityData,
                              fromDate: e,
                            })
                          }
                        />
                      </MuiPickersUtilsProvider>
                      {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" /> */}
                    </div>
                  </div>
                </div>

              </div>
              <div className="mt-4">
                <h6 className="mt-3">NOTE</h6>
              </div>
              <div className="d-flex float-left mr-2 pb-2 pt-2">
                <div><button type="button" className="btn-sm btn-warning  mr-3 border-none" style={{ borderRadius: '15px' }}>External</button></div>
                <div><button type="button" className="btn-sm btn-success" style={{ borderRadius: '15px' }}>Recommendations</button></div>

              </div>
              <div className="form-group">
                <textarea name="comments" className="w-100 p-2 border rounded-5" rows="5" id="comments" placeholder="Reply">
                </textarea>
                <div className="bg-primary p-3 cardradi">
                  <a href="#" className="mr-2"><EditOutlinedIcon className="text-white font-size-18" /></a>
                  <a href="#" className="mr-2"><AttachFileOutlinedIcon className="text-white font-size-18" /></a>
                  <a href="#" className="mr-2"><CreateNewFolderOutlinedIcon className="text-white font-size-18" /></a>
                  <a href="#" className="mr-2"><ShareOutlinedIcon className="text-white font-size-18" /></a>
                </div>
              </div>
              <div className="modal-footer mr-auto">
                <button type="button" className="btn border bg-white" data-dismiss="modal">Cancel</button>
                <a href="/TermsConditions" className="btn btn-primary">Save</a>
              </div>
              {/* <h6 className="  font-size-14">NOTE</h6> */}
              {/* <div style={{borderBottom: '1px solid #cfcece'}}> */}
              {/* <ul className="nav internalexternaltabs intexttab">
                      <li className="active"><a data-toggle="tab" href="#internal1" className="btn active show">Internal</a></li>
                      <li><a data-toggle="tab" href="#external1" className="btn">External</a></li>
                    </ul> */}
              {/* </div> */}

              {/* <div className="tab-content">
                      <div id="internal1" className="tab-pane fade in active show">

                      
                       <div className="mt-4">
                         <a href="#" className="d-block text-left font-size-15 text-violet"><span  className="font-size-20 mr-2">+</span>Comment</a>
                       </div>
                       <div>
                       <textarea name="comments" className="w-100 p-2 border rounded-5" id="comments"placeholder="Reply">
                        </textarea>
                        <div className="d-flex float-right mr-2">
                          <div><a href="#" className="btn-sm border mr-3">Cancel</a></div>
                          <div><a href="#" className="btn-sm text-white bg-primary">Save</a></div>
                        </div>
                       </div>
                      
                      <div className="d-flex justify-content-between align-items-center mt-5">
                        <p className="mb-0"><strong> Engine Partlist</strong></p>
                        <div>
                          <a href="#" className="mr-3 "><EditOutlinedIcon  className="font-size-18"/></a>
                          <a href="#" className="mr-3"><AttachmentOutlinedIcon className="font-size-18"/></a>
                          <a href="#" className="mr-3"><CreateNewFolderOutlinedIcon className="font-size-18"/></a>
                          <a href="#"><ShareOutlinedIcon className="font-size-18"/></a>
                        </div>
                      </div>
                      <div className="border p-3 rounded mt-3">
                       <p className="mb-0">Amit minim mollit non deserunt ullamco est sit aliqua dolor do amet sont. Velit officia consequat duis enim velit mollit.Exercitation veniam consequat sunt nostrud amet</p>
                      </div>
                      <p className="text-grey  mb-0 font-size-12 mt-2 float-right"><b>2:38pm, 19 Aug 21</b></p>
                      </div>

                      <div id="external1" className="tab-pane fade">
                      <div className="mt-4">
                         <a href="#" className=" d-block text-left font-size-15 text-violet"><span  className="font-size-20 mr-2">+</span>Comment</a>
                       </div>
                       <div>
                       <textarea name="comments" className="w-100 p-2 border rounded-5" id="comments"placeholder="Reply">
                        </textarea>
                        <div className="d-flex float-right mr-2">
                          <div><a href="#" className="btn-sm border mr-3">Cancel</a></div>
                          <div><a href="#" className="btn-sm text-white bg-primary">Save</a></div>
                        </div>
                       </div>
                      
                      <div className="d-flex justify-content-between align-items-center mt-5">
                        <p className="mb-0"><strong> Engine Partlist</strong></p>
                        <div>
                          <a href="#" className="mr-3 "><EditOutlinedIcon  className="font-size-18"/></a>
                          <a href="#" className="mr-3"><AttachmentOutlinedIcon className="font-size-18"/></a>
                          <a href="#" className="mr-3"><CreateNewFolderOutlinedIcon className="font-size-18"/></a>
                          <a href="#"><ShareOutlinedIcon className="font-size-18"/></a>
                        </div>
                      </div>
                      <div className="border p-3 rounded mt-3">
                       <p className="mb-0">Amit minim mollit non deserunt ullamco est sit aliqua dolor do amet sont. Velit officia consequat duis enim velit mollit.Exercitation veniam consequat sunt nostrud amet</p>
                      </div>
                      <p className="text-grey  mb-0 font-size-12 mt-2 float-right"><b>2:38pm, 19 Aug 21</b></p>
                      <div className="mt-4">
                         <a href="#" className="btn bg-light-blue d-block text-left font-size-18 text-violet"><span  className="font-size-24 mr-2">+</span>Comment</a>
                       </div>
                       <div>
                       <textarea name="comments" className="w-100 p-2 border" id="comments"placeholder="Reply">
                        </textarea>
                        <div className="d-flex justify-content-between">
                          <div><a href="#" className="btn border">Cancel</a></div>
                          <div><a href="#" className="btn text-white bg-primary">Save</a></div>
                        </div>
                       </div>
                       <hr/>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="mb-0">Engine Partlist</p>
                        <div>
                          <a href="#" className="mr-3 "><EditOutlinedIcon  className="font-size-18"/></a>
                          <a href="#" className="mr-3"><AttachmentOutlinedIcon className="font-size-18"/></a>
                          <a href="#" className="mr-3"><CreateNewFolderOutlinedIcon className="font-size-18"/></a>
                          <a href="#"><ShareOutlinedIcon className="font-size-18"/></a>
                        </div>
                      </div>
                      <div className="border p-3 rounded mt-3">
                       <p className="mb-0">Amit minim mollit non deserunt ullamco est sit aliqua dolor do amet sont. Velit officia consequat duis enim velit mollit.Exercitation veniam consequat sunt nostrud amet</p>
                      </div>
                      <p className="text-grey  mb-0 font-size-12 mt-2"><b>2:38pm, 19 Aug 21</b></p>
                      </div>
                    </div> */}
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn border w-100 bg-white" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary w-100">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel2"><ErrorOutlineIcon className="mr-2" style={{ fontSize: '32px' }} />Errors</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className='d-flex justify-content-between align-items-center px-3 border-bottom'>
                <h6 className='mb-0'>3 errors found in line items</h6>
                <div>
                  <a href='#' className='btn'><ClearIcon className="mr-2" style={{ color: '#000' }} />Clear All</a>
                </div>
              </div>
              <div className=' mt-2'>
                <h6 className="px-3">FILTER</h6>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box className="custom-tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
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
                        <h6 className="mb-0"> Part list header component code</h6>
                        <p className="mb-0">Fix <a href="#" className="btn">Go to field</a></p>
                      </div>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                  </TabContext>
                </Box>
                <hr className="mb-0" />
                <div className="p-3">
                  <a href='#' className='btn text-light border-light px-2'>Go Back to Solution</a>
                  <a href='#' className='btn btn-primary float-right px-2'>Choose the correct portfolio</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>







    </>
  );
}
