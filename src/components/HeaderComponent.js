import React from "react";
import logoIcon from '../assets/icons/png/logo.png'
import shearchIcon from '../assets/icons/svg/search.svg'
import notificationIcon from '../assets/icons/svg/notification-bing.svg'
import profileIcon from '../assets/icons/svg/profile.svg'
import messageIcon from '../assets/icons/svg/message-text.svg'
import supportIcon from '../assets/icons/svg/24-support.svg'

export function HeaderComponent(props) {


  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(true)
  }
  return (
    <>
      <div class="header">
        <div class="header-content clearfix">

          {/* <div class="nav-control">
                    <div class="hamburger">
                        <span class="toggle-icon"><i class="icon-menu"></i></span>
                    </div>
                </div> */}
          <div class="header-left">
            <div class="input-group icons">
              <div class="input-group-prepend">
                <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1"><img src={shearchIcon}></img></span>
              </div>
              <input type="search" class="form-control search-form-control" placeholder="Search" aria-label="Search Dashboard" />
              <div class="drop-down animated flipInX d-md-none">
                <form action="#">
                  <input type="text" class="form-control" placeholder="Search" />
                </form>
              </div>
            </div>
          </div>
          <div class="header-right">
            <ul class="clearfix">

              <li class="icons dropdown"><a className="header-li-text" href="javascript:void(0)" data-toggle="dropdown">
                <img src={notificationIcon}></img>
                {/* <span class="badge badge-pill gradient-2">3</span> */}
                <div className="li-contant">Notifications</div>
              </a>
                <div class="drop-down animated fadeIn dropdown-menu dropdown-notfication">
                  <div class="dropdown-content-heading d-flex justify-content-between">
                    <span class="">2 New Notifications</span>
                    <a href="javascript:void()" class="d-inline-block">
                      <span class="badge badge-pill gradient-2">5</span>
                    </a>
                  </div>
                  <div class="dropdown-content-body">
                    <ul>
                      <li>
                        <a href="javascript:void()">
                          <span class="mr-3 avatar-icon bg-success-lighten-2"><i class="icon-present"></i></span>
                          <div class="notification-content">
                            <h6 class="notification-heading">Events near you</h6>
                            <span class="notification-text">Within next 5 days</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <span class="mr-3 avatar-icon bg-danger-lighten-2"><i class="icon-present"></i></span>
                          <div class="notification-content">
                            <h6 class="notification-heading">Event Started</h6>
                            <span class="notification-text">One hour ago</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <span class="mr-3 avatar-icon bg-success-lighten-2"><i class="icon-present"></i></span>
                          <div class="notification-content">
                            <h6 class="notification-heading">Event Ended Successfully</h6>
                            <span class="notification-text">One hour ago</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <span class="mr-3 avatar-icon bg-danger-lighten-2"><i class="icon-present"></i></span>
                          <div class="notification-content">
                            <h6 class="notification-heading">Events to Join</h6>
                            <span class="notification-text">After two days</span>
                          </div>
                        </a>
                      </li>
                    </ul>

                  </div>
                </div>
              </li>
              <li class="icons dropdown"><a className="header-li-text" href="javascript:void(0)" data-toggle="dropdown">
                <img src={messageIcon}></img>
                {/* <span class="badge badge-pill gradient-1">3</span> */}
                <div className="li-contant">Messages</div>
              </a>
                <div class="drop-down animated fadeIn dropdown-menu">
                  <div class="dropdown-content-heading d-flex justify-content-between">
                    <span class="">3 New Messages</span>
                    <a href="javascript:void()" class="d-inline-block">
                      <span class="badge badge-pill gradient-1">3</span>
                    </a>
                  </div>
                  <div class="dropdown-content-body">
                    <ul>
                      <li class="notification-unread">
                        <a href="javascript:void()">
                          <img class="float-left mr-3 avatar-img" src="images/avatar/1.jpg" alt="" />
                          <div class="notification-content">
                            <div class="notification-heading">Saiful Islam</div>
                            <div class="notification-timestamp">08 Hours ago</div>
                            <div class="notification-text">Hi Teddy, Just wanted to let you ...</div>
                          </div>
                        </a>
                      </li>
                      <li class="notification-unread">
                        <a href="javascript:void()">
                          <img class="float-left mr-3 avatar-img" src="images/avatar/2.jpg" alt="" />
                          <div class="notification-content">
                            <div class="notification-heading">Adam Smith</div>
                            <div class="notification-timestamp">08 Hours ago</div>
                            <div class="notification-text">Can you do me a favour?</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img class="float-left mr-3 avatar-img" src="images/avatar/3.jpg" alt="" />
                          <div class="notification-content">
                            <div class="notification-heading">Barak Obama</div>
                            <div class="notification-timestamp">08 Hours ago</div>
                            <div class="notification-text">Hi Teddy, Just wanted to let you ...</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <img class="float-left mr-3 avatar-img" src="images/avatar/4.jpg" alt="" />
                          <div class="notification-content">
                            <div class="notification-heading">Hilari Clinton</div>
                            <div class="notification-timestamp">08 Hours ago</div>
                            <div class="notification-text">Hello</div>
                          </div>
                        </a>
                      </li>
                    </ul>

                  </div>
                </div>
              </li>

              {/* <li class="icons dropdown d-none d-md-flex">
                            <a href="javascript:void(0)" class="log-user" data-toggle="dropdown">
                                <span>English</span>  <i class="fa fa-angle-down f-s-14" aria-hidden="true"></i>
                            </a>
                            <div class="drop-down dropdown-language animated fadeIn  dropdown-menu">
                                <div class="dropdown-content-body">
                                    <ul>
                                        <li><a href="javascript:void()">English</a></li>
                                        <li><a href="javascript:void()">Dutch</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li> */}

              <li class="icons dropdown">
                <div class="header-li-text c-pointer position-relative" data-toggle="dropdown">

                  {/* <span class="activity active"></span> */}
                  <img src={profileIcon}></img>

                  <div className="li-contant"><span className="mr-2 ">Profile</span><i class="fa fa-angle-down f-s-14" aria-hidden="true"></i></div>

                </div>
                <div class="drop-down dropdown-profile animated fadeIn dropdown-menu">
                  <div class="dropdown-content-body">
                    <ul>
                      <li>
                        <a href="app-profile.html"><i class="icon-user"></i> <span>Profile</span></a>
                      </li>
                      <li>
                        <a href="javascript:void()">
                          <i class="icon-envelope-open"></i> <span>Inbox</span> <div class="badge gradient-3 badge-pill gradient-1">3</div>
                        </a>
                      </li>

                      <hr class="my-2" />
                      <li>
                        <a href="page-lock.html"><i class="icon-lock"></i> <span>Lock Screen</span></a>
                      </li>
                      <li><a className="cursor" onClick={handleLogout}><i class="icon-key"></i> <span>Logout</span></a></li>
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
      </div>
    </>
  );
}
