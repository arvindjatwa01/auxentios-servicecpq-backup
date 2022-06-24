import React from "react";
import logoIcon from '../assets/icons/png/logo.png'
import shearchIcon from '../assets/icons/svg/search.svg'
import notificationIcon from '../assets/icons/svg/notification-bing.svg'
import profileIcon from '../assets/icons/svg/profile.svg'
import messageIcon from '../assets/icons/svg/message-text.svg'
import supportIcon from '../assets/icons/svg/24-support.svg'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from "react-router-dom";

export function HeaderComponent(props) {


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"
  }
  return (
    <>
      <div className="header">
        <div className="header-content clearfix" style={{display:"none"}}>

          {/* <div className="nav-control">
                    <div className="hamburger">
                        <span className="toggle-icon"><i className="icon-menu"></i></span>
                    </div>
                </div> */}
          <div className="header-left">
            <div className="input-group icons">
              <div className="input-group-prepend">
                <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1"><img src={shearchIcon}></img></span>
              </div>
              <input type="search" className="form-control search-form-control" placeholder="Search" aria-label="Search Dashboard" />
              <div className="drop-down animated flipInX d-md-none">
                <form action="#">
                  <input type="text" className="form-control" placeholder="Search" />
                </form>
              </div>
            </div>
          </div>
          <div className="header-right">
            <ul className="clearfix">

              <li className="icons dropdown"><a className="header-li-text" href="javascript:void(0)" data-toggle="dropdown">
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
                          <span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span>
                          <div className="notification-content">
                            <h6 className="notification-heading">Events near you</h6>
                            <span className="notification-text">Within next 5 days</span>
                          </div>
                        </a>
                      </li>
                      <li>
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
                      </li>
                    </ul>

                  </div>
                </div>
              </li>
              <li className="icons dropdown"><a className="header-li-text" href="javascript:void(0)" data-toggle="dropdown">
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
                          <img className="float-left mr-3 avatar-img" src="images/avatar/1.jpg" alt="" />
                          <div className="notification-content">
                            <div className="notification-heading">Saiful Islam</div>
                            <div className="notification-timestamp">08 Hours ago</div>
                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-unread">
                        <a href="javascript:void()">
                          <img className="float-left mr-3 avatar-img" src="images/avatar/2.jpg" alt="" />
                          <div className="notification-content">
                            <div className="notification-heading">Adam Smith</div>
                            <div className="notification-timestamp">08 Hours ago</div>
                            <div className="notification-text">Can you do me a favour?</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img className="float-left mr-3 avatar-img" src="images/avatar/3.jpg" alt="" />
                          <div className="notification-content">
                            <div className="notification-heading">Barak Obama</div>
                            <div className="notification-timestamp">08 Hours ago</div>
                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img className="float-left mr-3 avatar-img" src="images/avatar/4.jpg" alt="" />
                          <div className="notification-content">
                            <div className="notification-heading">Hilari Clinton</div>
                            <div className="notification-timestamp">08 Hours ago</div>
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
                <div className="header-li-text c-pointer position-relative" data-toggle="dropdown">

                  {/* <span className="activity active"></span> */}
                  <img src={profileIcon}></img>

                  <div className="li-contant"><span className="mr-2 ">Profile</span><i className="fa fa-angle-down f-s-14" aria-hidden="true"></i></div>

                </div>
                <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
                  <div className="dropdown-content-body">
                    <ul>
                      <li>
                        <a href="/profile"><i className="icon-user"></i> <span>Profile</span></a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <i className="icon-envelope-open"></i> <span>Inbox</span> <div className="badge gradient-3 badge-pill gradient-1">3</div>
                        </a>
                      </li>

                      <hr className="my-2" />
                      <li>
                        <a href="page-lock.html"><i className="icon-lock"></i> <span>Lock Screen</span></a>
                      </li>
                      <li><a className="cursor" onClick={handleLogout}><i className="icon-key"></i> <span>Logout</span></a></li>
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
            <li className="icons" style={{border:'none'}}>
            <div className="input-group" style={{border:'1px solid #cfcfcf', borderRadius:'50px', overflow:'hidden', width:'500px'}}>
              <div className="input-group-prepend">
                <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1"><img src={shearchIcon}></img></span>
              </div>
              <input type="search" className="form-control search-form-control" placeholder="Search" aria-label="Search Dashboard" />
              <div className="drop-down animated flipInX d-md-none">
                <form action="#">
                  <input type="text" className="form-control" placeholder="Search" />
                </form>
              </div>
            </div>
            </li>
              <li className="icons dropdown"><a className="header-li-text" href="javascript:void(0)" data-toggle="dropdown">
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
                          <span className="mr-3 avatar-icon bg-success-lighten-2"><i className="icon-present"></i></span>
                          <div className="notification-content">
                            <h6 className="notification-heading">Events near you</h6>
                            <span className="notification-text">Within next 5 days</span>
                          </div>
                        </a>
                      </li>
                      <li>
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
                      </li>
                    </ul>

                  </div>
                </div>
              </li>
              {/* <li className="icons dropdown"><a className="header-li-text" href="javascript:void(0)" data-toggle="dropdown"></a> */}
              <li className="icons dropdown"><a className="header-li-text" href="javascript:void(0)" data-toggle="modal" data-target="#messegespopup">
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
                          <img className="float-left mr-3 avatar-img" src="images/avatar/1.jpg" alt="" />
                          <div className="notification-content">
                            <div className="notification-heading">Saiful Islam</div>
                            <div className="notification-timestamp">08 Hours ago</div>
                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-unread">
                        <a href="javascript:void()">
                          <img className="float-left mr-3 avatar-img" src="images/avatar/2.jpg" alt="" />
                          <div className="notification-content">
                            <div className="notification-heading">Adam Smith</div>
                            <div className="notification-timestamp">08 Hours ago</div>
                            <div className="notification-text">Can you do me a favour?</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img className="float-left mr-3 avatar-img" src="images/avatar/3.jpg" alt="" />
                          <div className="notification-content">
                            <div className="notification-heading">Barak Obama</div>
                            <div className="notification-timestamp">08 Hours ago</div>
                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img className="float-left mr-3 avatar-img" src="images/avatar/4.jpg" alt="" />
                          <div className="notification-content">
                            <div className="notification-heading">Hilari Clinton</div>
                            <div className="notification-timestamp">08 Hours ago</div>
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
                <img src={profileIcon}></img>
                  <div className="li-contant">Worklist</div>
                </Link>
              </li>
              <li className="icons dropdown">
                <div className="header-li-text c-pointer position-relative" data-toggle="dropdown">

                  <span className="activity active"></span>
                  <i class="fa"><SettingsOutlinedIcon style={{color:'#bec0d0'}} /></i>

                  <div className="li-contant"><span className="mr-2 ">Settings</span><i className="fa fa-angle-down f-s-14" aria-hidden="true"></i></div>

                </div>
                <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
                  <div className="dropdown-content-body">
                    <ul>
                      <li>
                        <a href="/profile"><i className="icon-user"></i> <span>Profile</span></a>
                      </li>
                      <li>
                        <a href="#"><i className="icon-user"></i> <span>Help</span></a>
                      </li>
                      <li>
                        <a href="/account"><i className="icon-user"></i> <span>Account</span></a>
                      </li>
                      {/* <li>
                        <a href="page-lock.html"><i className="icon-lock"></i> <span>Lock Screen</span></a>
                      </li> */}
                      <li><a className="cursor" onClick={handleLogout}><i className="icon-key"></i> <span>Logout</span></a></li>
                    </ul>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
