import React, { useEffect, useState } from "react";
import $ from "jquery";
import logoIcon from "../assets/icons/png/logo.png";
import { SolutionBuilderModal } from "../pages/SolutionModules/index";
import PulseIcon from "../assets/icons/svg/Pulse.svg";
import homesidebarIcon from "../assets/icons/svg/Homesidebar.svg";
import VectorStrokeIcon from "../assets/icons/svg/Vector-Stroke.svg";
import starIcon from "../assets/icons/svg/Star.svg";
import searchIcon from "../assets/icons/svg/search.svg";
import TemplatesIcon from "../assets/icons/svg/RepairTemplates.svg";
import manu3lineIcon from "../assets/icons/svg/manu3line.svg";
import Disassemble from "../assets/icons/svg/Disassemble.png";
import collIcon from "../assets/icons/svg/coll.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Modal } from "react-bootstrap";
import Radio from "@material-ui/core/Radio";
import { Link, NavLink, exact } from "react-router-dom";

export function SideBarComponent(props) {
  const [solutionBuilderShow, setSolutionBuilderShow] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleCallbackClose = (data) => {
    if (solutionBuilderShow) {
      setSolutionBuilderShow(false);
    } else {
      setSolutionBuilderShow(true);
    }
  };

  const handleShow = () => {
    if (solutionBuilderShow) {
      setModalComponent(
        <SolutionBuilderModal
          parentCallback={handleCallbackClose}
          open={false}
        />
      );
    } else {
      setModalComponent(
        <SolutionBuilderModal
          parentCallback={handleCallbackClose}
          open={true}
        />
      );
    }
  };

  return (
    // <div className="nk-sidebar" onMouseEnter={handleOpenSideBar} onMouseLeave={handleCloseSideBar}>
    //      <div className="nk-sidebar">
    //     <div className="nk-nav-scroll">
    //         <ul className="metismenu" id="menu">
    //             <li className="nav-label">Dashboard</li>
    //             <li>
    //                 <a className="has-arrow" href="#" aria-expanded="false">
    //                     <i className="icon-speedometer menu-icon"></i><span className="nav-text">Dashboard</span>
    //                 </a>
    //                 <ul aria-expanded="false">
    //                     <li><a href="./index.html">Home 1</a></li>
    //                 </ul>
    //             </li>
    //             <li className="mega-menu mega-menu-sm">
    //                 <a className="has-arrow" href="#" aria-expanded="false">
    //                     <i className="icon-globe-alt menu-icon"></i><span className="nav-text">Layouts</span>
    //                 </a>
    //                 <ul aria-expanded="false">
    //                     <li><a href="./layout-blank.html">Blank</a></li>
    //                     <li><a href="./layout-one-column.html">One Column</a></li>
    //                     <li><a href="./layout-two-column.html">Two column</a></li>
    //                     <li><a href="./layout-compact-nav.html">Compact Nav</a></li>
    //                     <li><a href="./layout-vertical.html">Vertical</a></li>
    //                     <li><a href="./layout-horizontal.html">Horizontal</a></li>
    //                     <li><a href="./layout-boxed.html">Boxed</a></li>
    //                     <li><a href="./layout-wide.html">Wide</a></li>

    //                     <li><a href="./layout-fixed-header.html">Fixed Header</a></li>
    //                     <li><a href="layout-fixed-sidebar.html">Fixed Sidebar</a></li>
    //                 </ul>
    //             </li>
    //             <li className="nav-label">Apps</li>
    //             <li>
    //                 <a className="has-arrow" href="#" aria-expanded="false">
    //                     <i className="icon-envelope menu-icon"></i> <span className="nav-text">Email</span>
    //                 </a>
    //                 <ul aria-expanded="false">
    //                     <li><a href="./email-inbox.html">Inbox</a></li>
    //                     <li><a href="./email-read.html">Read</a></li>
    //                     <li><a href="./email-compose.html">Compose</a></li>
    //                 </ul>
    //             </li>
    //             <li>
    //                 <a className="has-arrow" href="#" aria-expanded="false">
    //                     <i className="icon-screen-tablet menu-icon"></i><span className="nav-text">Apps</span>
    //                 </a>
    //                 <ul aria-expanded="false">
    //                     <li><a href="./app-profile.html">Profile</a></li>
    //                     <li><a href="./app-calender.html">Calender</a></li>
    //                 </ul>
    //             </li>
    //             <li>
    //                 <a className="has-arrow" href="#" aria-expanded="false">
    //                     <i className="icon-graph menu-icon"></i> <span className="nav-text">Charts</span>
    //                 </a>
    //                 <ul aria-expanded="false">
    //                     <li><a href="./chart-flot.html">Flot</a></li>
    //                     <li><a href="./chart-morris.html">Morris</a></li>
    //                     <li><a href="./chart-chartjs.html">Chartjs</a></li>
    //                     <li><a href="./chart-chartist.html">Chartist</a></li>
    //                     <li><a href="./chart-sparkline.html">Sparkline</a></li>
    //                     <li><a href="./chart-peity.html">Peity</a></li>
    //                 </ul>
    //             </li>
    //             <li className="nav-label">UI Components</li>
    //             <li>
    //                 <a className="has-arrow" href="#" aria-expanded="false">
    //                     <i className="icon-grid menu-icon"></i><span className="nav-text">UI Components</span>
    //                 </a>
    //                 <ul aria-expanded="false">
    //                     <li><a href="./ui-accordion.html">Accordion</a></li>
    //                     <li><a href="./ui-alert.html">Alert</a></li>
    //                     <li><a href="./ui-badge.html">Badge</a></li>
    //                     <li><a href="./ui-button.html">Button</a></li>
    //                     <li><a href="./ui-button-group.html">Button Group</a></li>
    //                     <li><a href="./ui-cards.html">Cards</a></li>
    //                     <li><a href="./ui-carousel.html">Carousel</a></li>
    //                     <li><a href="./ui-dropdown.html">Dropdown</a></li>
    //                     <li><a href="./ui-list-group.html">List Group</a></li>
    //                     <li><a href="./ui-media-object.html">Media Object</a></li>
    //                     <li><a href="./ui-modal.html">Modal</a></li>
    //                     <li><a href="./ui-pagination.html">Pagination</a></li>
    //                     <li><a href="./ui-popover.html">Popover</a></li>
    //                     <li><a href="./ui-progressbar.html">Progressbar</a></li>
    //                     <li><a href="./ui-tab.html">Tab</a></li>
    //                     <li><a href="./ui-typography.html">Typography</a></li>
    //                     <li><a href="./uc-nestedable.html">Nestedable</a></li>
    //                     <li><a href="./uc-noui-slider.html">Noui Slider</a></li>
    //                     <li><a href="./uc-sweetalert.html">Sweet Alert</a></li>
    //                     <li><a href="./uc-toastr.html">Toastr</a></li>
    //                 </ul>
    //             </li>
    //             <li>
    //                 <a href="widgets.html" aria-expanded="false">
    //                     <i className="icon-badge menu-icon"></i><span className="nav-text">Widget</span>
    //                 </a>
    //             </li>
    //             <li className="nav-label">Forms</li>
    //             <li>
    //                 <a className="has-arrow" href="#" aria-expanded="false">
    //                     <i className="icon-note menu-icon"></i><span className="nav-text">Forms</span>
    //                 </a>
    //                 <ul aria-expanded="false">
    //                     <li><a href="./form-basic.html">Basic Form</a></li>
    //                     <li><a href="./form-validation.html">Form Validation</a></li>
    //                     <li><a href="./form-step.html">Step Form</a></li>
    //                     <li><a href="./form-editor.html">Editor</a></li>
    //                     <li><a href="./form-picker.html">Picker</a></li>
    //                 </ul>
    //             </li>
    //             <li className="nav-label">Table</li>
    //             <li>
    //                 <a className="has-arrow" href="#" aria-expanded="false">
    //                     <i className="icon-menu menu-icon"></i><span className="nav-text">Table</span>
    //                 </a>
    //                 <ul aria-expanded="false">
    //                     <li><a href="./table-basic.html" aria-expanded="false">Basic Table</a></li>
    //                     <li><a href="./table-datatable.html" aria-expanded="false">Data Table</a></li>
    //                 </ul>
    //             </li>
    //             <li className="nav-label">Pages</li>
    //             <li>
    //                 <a className="has-arrow" href="#" aria-expanded="false">
    //                     <i className="icon-notebook menu-icon"></i><span className="nav-text">Pages</span>
    //                 </a>
    //                 <ul aria-expanded="false">
    //                     <li><a href="./page-login.html">Login</a></li>
    //                     <li><a href="./page-register.html">Register</a></li>
    //                     <li><a href="./page-lock.html">Lock Screen</a></li>
    //                     <li><a className="has-arrow" href="#" aria-expanded="false">Error</a>
    //                         <ul aria-expanded="false">
    //                             <li><a href="./page-error-404.html">Error 404</a></li>
    //                             <li><a href="./page-error-403.html">Error 403</a></li>
    //                             <li><a href="./page-error-400.html">Error 400</a></li>
    //                             <li><a href="./page-error-500.html">Error 500</a></li>
    //                             <li><a href="./page-error-503.html">Error 503</a></li>
    //                         </ul>
    //                     </li>
    //                 </ul>
    //             </li>
    //         </ul>
    //     </div>
    // </div>
    <div>
      <nav className="main-menu">
        <ul style={{ display: "none" }}>
          <li className="">
            <Link to="/">
              <span className="span-icon">
                <img src={homesidebarIcon}></img>
              </span>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>

          <li className="has-subnav">
            <Link to="/workList">
              <span className="span-icon">
                <img src={VectorStrokeIcon}></img>
              </span>
              <span className="nav-text">Work List</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/repairBuilder">
              <span className="span-icon">
                <img src={VectorStrokeIcon}></img>
              </span>
              <span className="nav-text">Repair Builder</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/segments">
              <span className="span-icon">
                <img src={VectorStrokeIcon}></img>
              </span>
              <span className="nav-text">Segment</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/Repairoption2">
              <span className="span-icon">
                <img src={VectorStrokeIcon}></img>
              </span>
              <span className="nav-text">Repair Options</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/Partlistfileupload">
              <span className="span-icon">
                <img src={VectorStrokeIcon}></img>
              </span>
              <span className="nav-text">Play List</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="#">
              <span className="span-icon">
                <img src={starIcon}></img>
              </span>
              <span className="nav-text">Forms</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="#">
              <span className="span-icon">
                <img src={PulseIcon}></img>
              </span>
              <span className="nav-text">Pages</span>
            </Link>
          </li>
        </ul>
        <ul className="metismenu" id="menu1" style={{ display: "none" }}>
          {/* <li className="has-subnav ">
                <a href="#">
                <span className="span-icon"><img src={collIcon}></img></span>
                    <span className="nav-text">
                        <b>Standard Job</b>
                    </span>
                </a>
            </li>
            <li className="has-subnav ">
                <a href="#">
                <span className="span-icon"><img src={searchIcon}></img></span>
                    <span className="nav-text">
                        Search
                    </span>
                </a>
            </li>
            
        <li className="has-subnav sub-li">
                <a href="#">
                <span className="span-icon"><img src={manu3lineIcon}></img></span>
                    <span className="nav-text">
                        Header
                    </span>
                </a>
       
            </li> */}
          {/* <li className="has-subnav sub-li">
            <a className="has-arrow" href="#" aria-expanded="false">
                <span className="span-icon"><img src={collIcon}></img></span>
                    <span className="nav-text">
                    <span className="font-size-16 font-weight-600">01</span>
                    <span className="ml-2 " style={{display:'inline-grid'}}>
                        <span className="font-size-14 font-weight-600 text-dark">Disassemble</span>
                        <span className="d-block text-grey font-size-14">15</span>
                    </span>
                    </span>
                </a>
                  <ul aria-expanded="false">
                     <li><a href="#">
                     <span className="span-icon"><img src={Disassemble}></img></span>
                    <span className="nav-text">
                    <span className="font-size-16 font-weight-600">01</span>
                    <span className="ml-2 " style={{display:'inline-grid'}}>
                        <span className="font-size-14 font-weight-600 text-dark">BOMB Aceite Transmission</span>
                        <span className="d-block text-grey font-size-14">15</span>
                    </span>
                    </span>
                         </a></li>
                         <li><a href="#">
                     <span className="span-icon"><img src={Disassemble}></img></span>
                    <span className="nav-text">
                    <span className="font-size-16 font-weight-600">01</span>
                    <span className="ml-2 " style={{display:'inline-grid'}}>
                        <span className="font-size-14 font-weight-600 text-dark">Freno de Parqueo</span>
                        <span className="d-block text-grey font-size-14">15</span>
                    </span>
                    </span>
                         </a></li>
                         
                </ul>
             </li> */}

          <li className="has-subnav sub-li">
            <a className="has-arrow" href="#" aria-expanded="false">
              <span className="span-icon">
                <img src={homesidebarIcon}></img>
              </span>
              <span className="nav-text">
                <span className="ml-2 " style={{ display: "inline-grid" }}>
                  <span className="font-size-14 font-weight-600 text-dark">
                    Dashboard
                  </span>
                </span>
              </span>
            </a>
            <ul aria-expanded="false">
              <li>
                <a href="/">
                  <span className="span-icon">
                    <img src={Disassemble}></img>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Operational Dashboard
                      </span>
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href="/analytics">
                  <span className="span-icon">
                    <img src={Disassemble}></img>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Analytics Dashboard
                      </span>
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href="/reports">
                  <span className="span-icon">
                    <img src={Disassemble}></img>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Reports Dashboard
                      </span>
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </li>

          <li className="has-subnav sub-li">
            <a className="has-arrow" href="#" aria-expanded="false">
              <span className="span-icon">
                <img src={VectorStrokeIcon}></img>
              </span>
              <span className="nav-text">
                <span className="ml-2 " style={{ display: "inline-grid" }}>
                  <span className="font-size-14 font-weight-600 text-dark">
                    Build
                  </span>
                </span>
              </span>
            </a>
            <ul aria-expanded="false">
              <li>
                <a className="has-arrow" href="#" aria-expanded="false">
                  <span className="span-icon">
                    <img src={collIcon}></img>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Repair
                      </span>
                    </span>
                  </span>
                </a>
                <ul aria-expanded="false">
                  <li>
                    <a href="#">
                      <span className="span-icon">
                        <img src={Disassemble}></img>
                      </span>
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Repair Builder
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="span-icon">
                        <img src={Disassemble}></img>
                      </span>
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Part Lists
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="span-icon">
                        <img src={Disassemble}></img>
                      </span>
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Standard Jobs
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="span-icon">
                        <img src={Disassemble}></img>
                      </span>
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Kits
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="has-arrow" href="#" aria-expanded="false">
                  <span className="span-icon">
                    <img src={collIcon}></img>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Solution
                      </span>
                    </span>
                  </span>
                </a>
                <ul aria-expanded="false">
                  <li>
                    <a href="#">
                      <span className="span-icon">
                        <img src={Disassemble}></img>
                      </span>
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span
                            className="font-size-14 font-weight-600 text-dark"
                            onClick={() =>
                              (window.location.href = "/portfolio/summary")
                            }
                          >
                            Portfolio and Bundles
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href = "/solutionBuilder/analytics")
                      }
                    >
                      {/* <li><a style={{ cursor: 'pointer' }} onClick={handleShow}> */}
                      <span className="span-icon">
                        <img src={Disassemble}></img>
                      </span>
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Solution Builder
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  {/* <li><a href="#">
                    <span className="span-icon"><img src={Disassemble}></img></span>
                    <span className="nav-text">
                      <span className="ml-2 " style={{ display: 'inline-grid' }}>
                        <span className="font-size-14 font-weight-600 text-dark">Reports Dashboard</span>
                      </span>
                    </span>
                  </a>
                  </li> */}
                </ul>
              </li>
            </ul>
          </li>

          {/* <li className="has-subnav sub-li">
                <a className="has-arrow" href="#" aria-expanded="false">
                <span className="span-icon"><img src={collIcon}></img></span>
                    <span className="nav-text">
                        Header
                    </span>
                </a>
       
            </li> */}
        </ul>
        <ul className="metismenu scrollbamenu" id="menu">
        <li className="has-subnav sub-li">
            <a className="border-radius-50" href="/" aria-expanded="false">
              <span className="span-icon">
                <svg style={{width:"30px"}}
                  id="uuid-c284ff3d-7bb4-40a6-aa03-9e912e189278"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 88.43799 91.96899"
                >
                  <path class="st0" d="M50.2,26.3c0.1-0.2,0.1-0.3,0.1-0.5c0-2.8,0-5.5,0-8.3c0-1.2,0.7-2.2,1.8-2.6c1.1-0.4,2.4-0.1,3.1,0.7
		c0.5,0.6,0.7,1.3,0.7,2c0,4.5,0,9,0,13.5c0,0.4,0.1,0.7,0.4,1c1.2,1.1,2.4,2.2,3.6,3.4c1.6,1.5,1.1,4-1,4.7
		c-1.1,0.4-2.1,0.1-2.9-0.7c-2.8-2.6-5.5-5.3-8.3-7.9c-5.1-4.8-10.2-9.7-15.3-14.5c-0.3-0.3-0.4-0.2-0.7,0
		C24.4,24.1,17.1,31,9.9,37.9c-0.6,0.6-1.2,1.1-1.8,1.7c-1.2,1.1-3,1.1-4,0c-1.1-1.2-1-2.9,0.2-4c6.3-6,12.6-12,18.9-18
		c1.9-1.8,3.9-3.7,5.8-5.5c0.3-0.2,0.5-0.5,0.7-0.8c1.1-1.5,3.4-1.6,4.5-0.3c0.9,1.1,1.9,2,2.9,2.9c4.2,4.1,8.5,8.1,12.8,12.1
		C49.9,26.2,50,26.3,50.2,26.3z"/>
	<path class="st0" d="M19.9,39.4c0.7,0,1.4,0,2.1,0c0.4,0,0.5,0.1,0.6,0.5c0.2,3.9,2.7,7.1,6.5,8.2c4.9,1.6,10.3-1.5,11.5-6.5
		c0.2-0.6,0.3-1.2,0.3-1.9c0-0.3,0.1-0.4,0.4-0.4c1.5,0,3.1,0,4.6,0c0.4,0,0.4,0.1,0.4,0.4c-0.2,4.2-1.8,7.7-4.9,10.4
		c-3,2.7-6.6,3.9-10.7,3.6c-5.9-0.3-11.3-4.6-12.9-10.3c-0.3-1.2-0.5-2.4-0.6-3.6c0-0.4,0.1-0.6,0.5-0.6
		C18.4,39.4,19.2,39.4,19.9,39.4z"/>
                </svg>
              </span>
              <span className="nav-text">
                <span className="ml-2 " style={{ display: "inline-grid" }}>
                  <span className="font-size-14 font-weight-600 text-dark">
                    Home
                  </span>
                </span>
              </span>
            </a>
          </li>
          <li className="has-subnav sub-li">
            <a className="has-arrow border-radius-50" href="#" aria-expanded="false">
              <span className="span-icon">
                <svg
                  id="uuid-c284ff3d-7bb4-40a6-aa03-9e912e189278"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 88.43799 91.96899"
                >
                  <path
                    className="uuid-0a55bafd-419d-477c-878d-be91a3e45155"
                    d="M0,91.96899H39.2998V39.32495H0v52.64404ZM7.81592,47.14087H31.48389v37.01221H7.81592V47.14087Z"
                  />
                  <path
                    className="uuid-0a55bafd-419d-477c-878d-be91a3e45155"
                    d="M0,30.59326H39.2998V0H0V30.59326ZM7.81592,7.81592H31.48389v14.96143H7.81592V7.81592Z"
                  />
                  <path
                    className="uuid-0a55bafd-419d-477c-878d-be91a3e45155"
                    d="M49.13818,0V52.64551h39.2998V0H49.13818Zm31.48413,44.82959h-23.66821V7.81592h23.66821V44.82959Z"
                  />
                  <path
                    className="uuid-0a55bafd-419d-477c-878d-be91a3e45155"
                    d="M49.13818,91.96899h39.2998v-30.59326H49.13818v30.59326Zm7.81592-22.77734h23.66821v14.96143h-23.66821v-14.96143Z"
                  />
                </svg>
              </span>
              <span className="nav-text">
                <span className="ml-2 " style={{ display: "inline-grid" }}>
                  <span className="font-size-14 font-weight-600 text-dark">
                    Dashboard
                  </span>
                </span>
              </span>
            </a>
            <ul aria-expanded="false">
              <li>
                <NavLink exact to="/" activeClassName="active" className="border-radius-50">
                  <span className="span-icon">
                    <svg
                      id="uuid-80f962bf-0984-4652-b8d6-016aa47e6fca"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 115.09342 118.44688"
                    >
                      <path
                        className="uuid-6dddf708-4d26-4520-b06c-bac58072bbf4"
                        d="M83.27401,69.21026c.09033-.24414,.33545-.40698,.60962-.40698,4.96851,0,9.0105-4.04199,9.0105-9.00879v-.34521c0-4.96851-4.04199-9.0105-9.0105-9.0105-.27417,0-.51929-.16284-.61035-.40698-.22876-.6106-.47876-1.21118-.75049-1.80713-.11328-.24731-.05859-.5354,.13916-.73413,3.51294-3.51318,3.51294-9.22876-.00488-12.74658l-.23755-.23779c-3.40332-3.40552-9.33789-3.40381-12.74512,.00171-.19873,.19702-.48511,.2522-.74414,.13013-.58838-.26685-1.1875-.51587-1.79468-.7439-.24341-.09106-.40698-.33521-.40698-.61035,0-4.9668-4.04199-9.00903-9.00977-9.00903h-.34424c-4.96851,0-9.0105,4.04224-9.0105,9.00903,0,.27515-.16382,.51929-.40308,.60864-.61035,.22803-1.21118,.47876-1.80933,.7522-.24902,.1123-.53809,.05859-.73511-.13843-3.40137-3.40552-9.34253-3.40063-12.73755-.00488l-.24927,.24756c-3.51221,3.51294-3.5105,9.23022,.00244,12.74341,.19458,.1936,.25,.48999,.1377,.73413-.271,.59082-.52002,1.19336-.75049,1.80713-.09033,.24243-.33545,.40527-.60962,.40527-4.96851,0-9.0105,4.04199-9.0105,9.0105v.34521c0,4.9668,4.04199,9.00879,9.0105,9.00879,.27417,0,.51929,.16284,.61035,.40869,.22974,.61206,.47876,1.21265,.74976,1.80371,.11401,.24731,.05859,.53735-.14014,.73584-3.51123,3.51294-3.51123,9.22876-.00391,12.73682l.24829,.24927c1.7019,1.70264,3.96313,2.63867,6.36987,2.63867h.00244c2.40771,0,4.67065-.93921,6.37109-2.64038,.19775-.19702,.48511-.25073,.7334-.13843,.58838,.27026,1.18896,.51929,1.80933,.75195,.2417,.09131,.40381,.33545,.40381,.60889,0,4.96851,4.04199,9.01074,9.0105,9.01074h.34424c4.96777,0,9.00977-4.04224,9.00977-9.01074,0-.27344,.16284-.51758,.41602-.61206,.60889-.22949,1.20703-.47852,1.79785-.74878,.24756-.11401,.53564-.05859,.73438,.14014,3.40552,3.40552,9.33691,3.4104,12.74658-.00488l.23853-.2395c3.51294-3.51294,3.51294-9.23022-.00073-12.74341-.19702-.19678-.25171-.48511-.13525-.74072,.26855-.58765,.51855-1.18652,.74805-1.79883Zm-7.80664-2.92212c-.1604,.42822-.33545,.84814-.52173,1.25513-1.55542,3.396-.823,7.45435,1.82324,10.10132,.26294,.26367,.26294,.69189-.00488,.96045l-.23926,.23926c-.22388,.22632-.72852,.22485-.95728-.00488-2.64551-2.64209-6.70459-3.37476-10.09644-1.82007-.41431,.19067-.83667,.36475-1.25342,.52271-3.48315,1.30078-5.82397,4.68188-5.82397,8.41626,0,.3728-.30273,.67578-.6748,.67578h-.34424c-.3728,0-.67554-.30298-.67554-.67578,0-3.73438-2.34009-7.11719-5.81348-8.41309-.42798-.16113-.84814-.33521-1.26147-.52417-1.18848-.54517-2.45752-.80908-3.71997-.80908-2.34326,0-4.66138,.91162-6.38208,2.63232-.22559,.22803-.72949,.22485-.94995,.00488l-.24756-.24902c-.26294-.26367-.26196-.69189,.00244-.95728,2.6438-2.64526,3.37549-6.70215,1.8208-10.0979-.18799-.41187-.36206-.83032-.52075-1.25513-1.30249-3.48218-4.6853-5.82153-8.41724-5.82153-.3728,0-.67554-.30273-.67554-.67383v-.34521c0-.3728,.30273-.67554,.67554-.67554,3.73267,0,7.11475-2.33936,8.41626-5.81836,.15967-.42627,.33374-.84644,.52173-1.2583,1.55542-3.39404,.823-7.4541-1.82324-10.09961-.26367-.26367-.26367-.69189-.00562-.95068l.24829-.24756c.26367-.26367,.69189-.26196,.95728,.00171,2.64453,2.64526,6.70117,3.37622,10.09058,1.82495,.41187-.18726,.83179-.36304,1.26318-.52417,3.48145-1.30396,5.8208-4.6853,5.8208-8.41797,0-.37134,.30273-.67407,.67554-.67407h.34424c.37207,0,.6748,.30273,.6748,.67554,0,3.7312,2.33936,7.11255,5.82324,8.4165,.42798,.15942,.84961,.33691,1.25171,.51929,3.39502,1.55786,7.45679,.8269,10.10132-1.82178,.22461-.22607,.72754-.22607,.96045,.00488l.23853,.23779c.26294,.26367,.26196,.69336-.00244,.95728-2.64551,2.64697-3.37622,6.70532-1.82324,10.09155,.18872,.41504,.36377,.83667,.52319,1.26318,1.30249,3.48047,4.68457,5.81982,8.41724,5.81982,.3728,0,.67554,.30273,.67554,.67554v.34521c0,.37109-.30273,.67383-.67554,.67383-3.73193,0-7.11475,2.33936-8.41626,5.81982Z"
                      />
                      <path
                        className="uuid-6dddf708-4d26-4520-b06c-bac58072bbf4"
                        d="M107.28842,30.66753c-1.15918-1.98926-3.71265-2.66162-5.69946-1.49927-1.98779,1.15918-2.65918,3.71167-1.49927,5.69922,4.36279,7.47876,6.6687,16.03857,6.6687,24.75439,0,27.13428-22.07617,49.21045-49.21118,49.21045-9.04858,0-17.80811-2.45312-25.47656-7.10376l3.32544-1.07153c2.19116-.70654,3.39502-3.0542,2.68848-5.24536-.70581-2.19116-3.05664-3.39429-5.24438-2.68921l-12.40723,3.99805c-.07251,.02344-.13428,.06274-.20459,.0896-.13599,.052-.26782,.10815-.39575,.1731-.12134,.06128-.23657,.12793-.34961,.19971-.11548,.07349-.22607,.15015-.33301,.23389-.1084,.08521-.21069,.17432-.30957,.26904-.09424,.09033-.18311,.18311-.26831,.28125-.09058,.10449-.17407,.21191-.25342,.32446-.07471,.10596-.1438,.21362-.2085,.32593-.06787,.11792-.12866,.23779-.18481,.36182-.0542,.11987-.10254,.24072-.14526,.36572-.04395,.12793-.08032,.25684-.11182,.38916-.03052,.12891-.05493,.25781-.073,.38989-.01904,.13745-.02954,.27466-.03467,.41455-.00488,.13232-.00391,.26392,.00439,.39795,.00854,.14307,.02661,.28516,.05054,.42896,.01245,.07446,.00977,.14795,.02612,.22266l3.00781,13.58984c.43042,1.94385,2.15283,3.2688,4.06494,3.2688,.29858,0,.60156-.03247,.9043-.09937,2.24731-.49805,3.66602-2.72339,3.1687-4.96997l-.99536-4.49731c8.96191,5.42627,19.19189,8.28711,29.75513,8.28711,31.73145,0,57.54614-25.81396,57.54614-57.54541,0-10.18921-2.69897-20.20264-7.80493-28.95435Z"
                      />
                      <path
                        className="uuid-6dddf708-4d26-4520-b06c-bac58072bbf4"
                        d="M8.33505,59.62188c0-27.13599,22.07617-49.21216,49.21216-49.21216,8.24878,0,16.32153,2.0625,23.50586,5.97437l-4.33374,1.39038c-2.19141,.70337-3.39844,3.05078-2.69531,5.24194,.56738,1.76782,2.20435,2.896,3.96729,2.896,.42188,0,.85059-.06519,1.27393-.2002l12.41309-3.98193c.07495-.02417,.13916-.06445,.21191-.09229,.13208-.05078,.26001-.10498,.38428-.16772,.12402-.06226,.2417-.13013,.35718-.20337,.11401-.07251,.22363-.14819,.32935-.23096,.10889-.08521,.21167-.17456,.31079-.26953,.09448-.09033,.18384-.18286,.26904-.28125,.08984-.10376,.1731-.21045,.2522-.32202,.07593-.10718,.146-.21606,.21167-.32983,.06665-.11621,.12671-.23389,.18188-.35571,.05566-.12183,.10498-.24487,.14844-.37231,.04346-.12573,.07935-.25244,.11035-.38232,.03125-.13086,.05615-.26147,.07471-.39551,.01904-.13623,.02954-.27222,.03467-.41089,.00513-.13232,.00439-.26416-.00366-.39819-.00854-.14429-.02661-.28735-.05054-.43213-.01221-.07373-.00928-.14648-.02563-.22021l-2.99219-13.59326c-.4939-2.24976-2.71704-3.66919-4.96582-3.17432-2.24731,.49487-3.6687,2.71875-3.17358,4.96509l.77002,3.49878c-8.16943-4.25415-17.27588-6.48755-26.56616-6.48755C25.81552,2.07476,.00009,27.89043,.00009,59.62188,.00009,69.20049,2.40292,78.68633,6.94808,87.05401c.75513,1.39014,2.18701,2.17822,3.66602,2.17822,.67163,0,1.35352-.16284,1.98511-.50635,2.02295-1.09717,2.77173-3.62866,1.67285-5.65039-3.88428-7.1499-5.93701-15.26025-5.93701-23.45361Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Operational
                      </span>
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/analytics" activeClassName="active" className="border-radius-50">
                  <span className="span-icon">
                    <svg
                      id="uuid-c05174b0-733e-42a0-8a41-26f820ee4aba"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 107.79136 107.79136"
                    >
                      <path
                        className="uuid-aedeb60b-b298-4c08-abdd-280bb25795c7"
                        d="M45.363-.00007C43.06099-.00007,41.19551,1.86565,41.19551,4.16741v13.09741C18.12935,19.37664-.00004,38.82024-.00004,62.42766-.00004,87.4406,20.34981,107.79143,45.363,107.79143c23.60718,0,43.05151-18.13037,45.16357-41.19629h13.09741c2.30176,0,4.16748-1.86548,4.16748-4.16748C107.79146,28.00506,79.78609-.00007,45.363-.00007Zm0,99.45654c-20.41748,0-37.02808-16.61133-37.02808-37.02881,0-19.00806,14.39868-34.70825,32.8606-36.78638V62.42766c0,2.302,1.86548,4.16748,4.16748,4.16748h36.78711c-2.07837,18.46191-17.7793,32.86133-36.78711,32.86133Zm4.16748-41.19629V8.49456c26.51245,2.02832,47.73804,23.25317,49.76733,49.76562H49.53048Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Analytics
                      </span>
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" activeClassName="active" className="border-radius-50">
                  <span className="span-icon">
                    <svg
                      id="uuid-2339a07b-c6d4-4b85-897c-b6ee6a6101ee"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 110.29999 145.5706"
                    >
                      <path
                        className="uuid-e32578ab-2aa2-47d9-8df4-2b8a18d4a5e3"
                        d="M110.29996,19.605C110.29996,8.79397,101.50601,.00002,90.69571,.00002H21.81094V21.81081H-.00009v123.75977H88.48916v-21.81104h21.81079V19.605Zm-30.14575,117.63062H8.33487V30.14577H74.89273c2.90088,0,5.26147,2.3606,5.26147,5.26172v101.82812Zm21.81079-21.81104h-13.47583V35.40749c0-7.49658-6.09912-13.59668-13.59644-13.59668H30.1459V8.33498h60.5498c6.21387,0,11.26929,5.0564,11.26929,11.27002V115.42458Z"
                      />
                      <path
                        className="uuid-e32578ab-2aa2-47d9-8df4-2b8a18d4a5e3"
                        d="M63.08194,98.36257H25.40616c-2.30176,0-4.16748,1.86548-4.16748,4.16748,0,2.30176,1.86572,4.16748,4.16748,4.16748H63.08194c2.302,0,4.16748-1.86572,4.16748-4.16748,0-2.302-1.86548-4.16748-4.16748-4.16748Z"
                      />
                      <path
                        className="uuid-e32578ab-2aa2-47d9-8df4-2b8a18d4a5e3"
                        d="M63.08194,118.39895H25.40616c-2.30176,0-4.16748,1.86548-4.16748,4.16748s1.86572,4.16748,4.16748,4.16748H63.08194c2.302,0,4.16748-1.86548,4.16748-4.16748s-1.86548-4.16748-4.16748-4.16748Z"
                      />
                      <path
                        className="uuid-e32578ab-2aa2-47d9-8df4-2b8a18d4a5e3"
                        d="M44.24454,40.64919c-12.68555,0-23.00586,10.32104-23.00586,23.00586s10.32031,23.00415,23.00586,23.00415c12.68481,0,23.00488-10.31934,23.00488-23.00415s-10.32007-23.00586-23.00488-23.00586Zm-14.6709,23.00586c0-8.08911,6.58179-14.6709,14.6709-14.6709,2.53198,0,4.91577,.64526,6.99658,1.7793l-11.16406,11.16602v15.7832c-6.06421-1.80078-10.50342-7.41675-10.50342-14.05762Zm18.83838,14.05762v-12.33203l8.7229-8.72339c1.13428,2.0813,1.77954,4.46558,1.77954,6.9978,0,6.64087-4.43848,12.25684-10.50244,14.05762Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Reports
                      </span>
                    </span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="has-subnav sub-li">
            <a className="has-arrow border-radius-50" href="#" aria-expanded="false">
              <span className="span-icon">
                <svg
                  id="uuid-0b37c72c-fd44-4acc-9628-08cba1263678"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 94.25342 91.96899"
                >
                  <path
                    className="uuid-69931b71-db43-4993-b706-df8786023ed7"
                    d="M67.55908,0H26.69434V40.86499h40.86475V0Zm-8.14014,32.72485h-24.58447V8.14014h24.58447v24.58472Z"
                  />
                  <path
                    className="uuid-69931b71-db43-4993-b706-df8786023ed7"
                    d="M0,91.96899H40.8667V51.10229H0v40.8667ZM8.14014,59.24268h24.58594v24.58594H8.14014v-24.58594Z"
                  />
                  <path
                    className="uuid-69931b71-db43-4993-b706-df8786023ed7"
                    d="M53.38721,51.10229v40.8667h40.86621V51.10229H53.38721Zm32.72607,32.72632h-24.58594v-24.58594h24.58594v24.58594Z"
                  />
                </svg>
              </span>
              <span className="nav-text">
                <span className="ml-2 " style={{ display: "inline-grid" }}>
                  <span className="font-size-14 font-weight-600 text-dark">
                    Build
                  </span>
                </span>
              </span>
            </a>
            <ul aria-expanded="false">
              <li>
                <a className="has-arrow border-radius-50" href="#" aria-expanded="false">
                  <span className="span-icon">
                    <svg
                      id="uuid-cf613211-c02e-4b21-bff9-68072c5a135d"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 117.90565 117.90565"
                    >
                      <path
                        className="uuid-fb98e718-8e74-41c9-b03b-9e5f4426df9d"
                        d="M113.73813,54.78449h-13.54956c-.70239-8.38696-3.91284-16.06738-8.88184-22.29224l9.33228-9.33179c1.62793-1.62622,1.62793-4.26514,0-5.89307-1.62622-1.62964-4.26685-1.62964-5.89307,0l-9.26001,9.25952c-6.1875-5.18115-13.90308-8.59375-22.36572-9.44385V4.16755C63.12021,1.86555,61.25473,.00007,58.95273,.00007,56.65097,.00007,54.78525,1.86555,54.78525,4.16755v12.91553c-8.46191,.8501-16.17725,4.26245-22.36475,9.4436l-9.26001-9.25928c-1.62793-1.62793-4.26587-1.62793-5.8938,0-1.6272,1.62793-1.6272,4.26685,.00073,5.89307l9.33228,9.33179c-4.96899,6.22485-8.17944,13.90527-8.88184,22.29224H4.16757C1.86557,54.78449,.00009,56.65022,.00009,58.95197,.00009,61.25398,1.86557,63.11945,4.16757,63.11945h13.68701c.96143,8.19238,4.31885,15.66064,9.35913,21.68018l-9.94629,9.94556c-1.62793,1.62622-1.62793,4.26514-.00073,5.89307,.81396,.81396,1.88086,1.22095,2.94727,1.22095s2.1333-.40698,2.94653-1.22095l10.01855-10.01782c6.05542,4.83398,13.48511,8.01416,21.6062,8.82983v14.28784c0,2.302,1.86572,4.16748,4.16748,4.16748,2.302,0,4.16748-1.86548,4.16748-4.16748v-14.28784c8.12158-.81567,15.552-3.99585,21.60742-8.83008l10.01831,10.01807c.81323,.81396,1.88037,1.22095,2.94653,1.22095,1.06641,0,2.13354-.40698,2.94653-1.22095,1.62793-1.62793,1.62793-4.26514,0-5.89307l-9.94604-9.9458c5.04004-6.01953,8.39746-13.48755,9.35913-21.67993h13.68604c2.302,0,4.16748-1.86548,4.16748-4.16748,0-2.30176-1.86548-4.16748-4.16748-4.16748Zm-28.96704,24.09326l-9.31348-9.31323c-.01831-.01831-.04053-.03027-.05908-.0481,2.19946-3.20483,3.49219-7.07788,3.49219-11.24976,0-10.99341-8.9436-19.93726-19.93799-19.93726-10.99316,0-19.93701,8.94385-19.93701,19.93726s8.94385,19.93726,19.93701,19.93726c3.82422,0,7.38721-1.10107,10.42505-2.97485,.06494,.07471,.11548,.15747,.18677,.22852l9.23145,9.2312c-5.53052,4.16382-12.40283,6.63623-19.84326,6.63623-18.22778,0-33.05737-14.83057-33.05737-33.05835S40.72495,25.20832,58.95273,25.20832c18.22876,0,33.05835,14.83057,33.05835,33.05835,0,7.79028-2.71509,14.95435-7.23999,20.61108Zm-25.81836-9.00879c-6.39771,0-11.60205-5.20459-11.60205-11.60229s5.20435-11.60229,11.60205-11.60229,11.60303,5.20459,11.60303,11.60229-5.20508,11.60229-11.60303,11.60229Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Repair and Parts
                      </span>
                    </span>
                  </span>
                </a>
                <ul aria-expanded="false">
                  <li>
                    <a className="has-arrow border-radius-50" href="#" aria-expanded="false">
                      <span className="span-icon">
                        <svg
                          id="uuid-bef549ba-ad8e-4cb9-81ef-441e7c48833e"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 95.32319 94.89332"
                        >
                          <path
                            className="uuid-32946e73-e2a7-4209-a2ff-299cc331f033"
                            d="M94.10235,71.7311l-8.99902-8.99878c.46387-1.40381,.84351-2.84644,1.12964-4.32568,2.19019-11.32715-1.36597-22.95361-9.51367-31.09985-10.06128-10.06226-25.01953-12.95166-38.11206-7.35815l-5.66846,2.42065,23.81982,23.81982c.77319,.77319,1.19971,1.80225,1.19971,2.896,0,1.09399-.42651,2.1228-1.19971,2.896l-4.35474,4.35498c-1.5481,1.54639-4.24414,1.54639-5.79224,0l-23.81885-23.82153-2.4209,5.66846c-3.61963,8.47339-3.69604,18.2229-.21143,26.74829,3.58203,8.76318,10.66772,15.69653,19.9502,19.52393,3.83691,1.58228,7.95386,2.37183,12.08057,2.37183,3.77539,0,7.55859-.66235,11.1416-1.98364l8.82837,8.8291c.81396,.81396,1.8811,1.2207,2.94727,1.2207s2.13354-.40674,2.94653-1.2207c1.62793-1.62646,1.62793-4.26514,.00098-5.89307l-6.93042-6.93091c4.11841-2.73682,7.54736-6.18164,10.14478-10.16333l6.93896,6.93896c.81299,.81396,1.88013,1.22119,2.94653,1.22119,1.06616,0,2.1333-.40723,2.94653-1.22119,1.62793-1.62793,1.62793-4.26514,0-5.89307Zm-32.56836,4.86108c-5.81885,2.48096-12.46899,2.53784-18.24658,.15625-9.23608-3.80762-13.47925-10.24292-15.41162-14.97046-1.81592-4.44238-2.35889-9.32129-1.63354-14.02441l14.47632,14.47559c4.69482,4.69482,12.8833,4.69482,17.57837,0l4.35474-4.35474c2.34814-2.34741,3.6416-5.46826,3.6416-8.78931,0-3.3208-1.29346-6.44165-3.6416-8.78906l-14.49438-14.49512c8.18604-1.30396,16.60083,1.33325,22.66821,7.39893,6.1875,6.18774,8.88843,15.01929,7.22388,23.62451-1.70435,8.81348-7.72461,16.0188-16.51538,19.76782Z"
                          />
                          <path
                            className="uuid-32946e73-e2a7-4209-a2ff-299cc331f033"
                            d="M21.32744,20.9059c1.62793-1.62646,1.62793-4.26514,.00098-5.89307L11.97271,5.65541c-1.62793-1.62793-4.26587-1.62793-5.8938,0-1.62793,1.62622-1.62793,4.26514-.00098,5.89307l9.35571,9.35742c.81396,.81396,1.8811,1.2207,2.94751,1.2207,1.06616,0,2.13232-.40674,2.94629-1.2207Z"
                          />
                          <path
                            className="uuid-32946e73-e2a7-4209-a2ff-299cc331f033"
                            d="M7.11406,30.12953c-1.62793-1.62451-4.26587-1.62622-5.8938,.00171-1.6272,1.62793-1.6272,4.26685,.00073,5.89478l4.67871,4.677c.81396,.81226,1.88037,1.21924,2.94653,1.21924s2.13354-.40698,2.94751-1.22095c1.62695-1.62793,1.62695-4.2666-.00098-5.89453l-4.67871-4.67725Z"
                          />
                          <path
                            className="uuid-32946e73-e2a7-4209-a2ff-299cc331f033"
                            d="M35.65239,11.79262c.81396,.81396,1.8811,1.22095,2.94751,1.22095,1.06616,0,2.13257-.40698,2.94653-1.22095,1.62793-1.62622,1.62793-4.26514,.00073-5.89307l-4.67773-4.67871c-1.62793-1.62793-4.26611-1.62793-5.89404,0-1.62793,1.62646-1.62793,4.26514-.00073,5.89307l4.67773,4.67871Z"
                          />
                        </svg>
                      </span>
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Repair Options
                          </span>
                        </span>
                      </span>
                    </a>
                    <ul aria-expanded="false">
                      <li>
                        <NavLink
                          to="/RepairWithSpareParts"
                          activeClassName="active"
                          className="border-radius-50"
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
                          <span className="nav-text">
                            <span
                              className="ml-2 "
                              style={{ display: "inline-grid" }}
                            >
                              <span className="font-size-14 font-weight-600 text-dark">
                                With Spare Parts
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/RepairWithoutSpareParts"
                          activeClassName="active"
                          className="border-radius-50"
                        >
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
                          <span className="nav-text">
                            <span
                              className="ml-2 "
                              style={{ display: "inline-grid" }}
                            >
                              <span className="font-size-14 font-weight-600 text-dark">
                                Without Spare Parts
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <NavLink to="/RepairPartList" activeClassName="active" className="border-radius-50">
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
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Part Lists
                          </span>
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <a className="has-arrow border-radius-50" href="#" aria-expanded="false">
                      <span className="span-icon">
                        <img src={TemplatesIcon} height="28" />
                      </span>
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Templates
                          </span>
                        </span>
                      </span>
                    </a>
                    <ul aria-expanded="false">
                      <li>
                        <NavLink
                          to="/RepairStandardJobs"
                          activeClassName="active"
                          className="border-radius-50"
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
                          <span className="nav-text">
                            <span
                              className="ml-2 "
                              style={{ display: "inline-grid" }}
                            >
                              <span className="font-size-14 font-weight-600 text-dark">
                                Standard Jobs
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/RepairKits" activeClassName="active" className="border-radius-50">
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
                          <span className="nav-text">
                            <span
                              className="ml-2 "
                              style={{ display: "inline-grid" }}
                            >
                              <span className="font-size-14 font-weight-600 text-dark">
                                Kits
                              </span>
                            </span>
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a className="has-arrow border-radius-50" href="#" aria-expanded="false">
                  <span className="span-icon">
                    <svg
                      id="uuid-3abd2398-f403-4cd5-aa98-d6b336293d57"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 111.40183 111.48743"
                    >
                      <path
                        className="uuid-e8804ae8-4d50-4bb6-a060-383a01d280e8"
                        d="M83.78989,36.81138c-1.9519-1.95361-5.11963-1.95361-7.07178,0l-25.64136,25.64136-13.30103-13.30005c-1.95166-1.95361-5.1189-1.95361-7.07227,0-1.95288,1.95337-1.95288,5.11963,.00073,7.07153l20.37256,20.37183,32.71313-32.71313c1.95361-1.9519,1.95361-5.11987,0-7.07153Z"
                      />
                      <path
                        className="uuid-e8804ae8-4d50-4bb6-a060-383a01d280e8"
                        d="M23.43784,88.24058c-12.98267-12.98267-16.96533-32.38916-10.146-49.43848,1.02563-2.56396-.22217-5.47461-2.78613-6.5-2.56885-1.03076-5.47632,.21973-6.50122,2.78516-8.3064,20.76904-3.45435,44.40991,12.36182,60.2251,.78052,.78149,1.57983,1.53516,2.39526,2.25952,.95337,.84814,2.13916,1.26489,3.32178,1.26489,1.37817,0,2.75049-.56641,3.73877-1.67676,1.83545-2.06421,1.65063-5.22559-.41357-7.0603-.67065-.59741-1.32837-1.21753-1.9707-1.85913Z"
                      />
                      <path
                        className="uuid-e8804ae8-4d50-4bb6-a060-383a01d280e8"
                        d="M106.89756,55.94761c-2.74976-.26221-5.19971,1.73047-5.47388,4.47827-1.04688,10.47729-5.73193,20.354-13.19116,27.8147-7.66187,7.66113-17.81909,12.37061-28.6001,13.26123-2.7522,.22778-4.79907,2.64355-4.57202,5.39648,.21558,2.61279,2.40283,4.58911,4.97803,4.58911,.13843,0,.27759-.00488,.41772-.01636,13.13818-1.08569,25.5144-6.82422,34.84814-16.15869,9.08862-9.08691,14.79614-21.12402,16.07251-33.8916,.27417-2.74805-1.73145-5.198-4.47925-5.47314Z"
                      />
                      <path
                        className="uuid-e8804ae8-4d50-4bb6-a060-383a01d280e8"
                        d="M38.59214,13.38072c17.10229-6.93848,36.59009-2.9873,49.63867,10.06201,.8335,.83521,1.62891,1.69312,2.38428,2.57056,.98877,1.15088,2.38721,1.74023,3.79395,1.74023,1.15405,0,2.3147-.39722,3.2583-1.20947,2.09424-1.80054,2.33179-4.95874,.53052-7.05225-.9165-1.06616-1.8811-2.10645-2.89282-3.11914C79.40684,.47447,55.67002-4.3395,34.83335,4.11119c-2.55908,1.03857-3.79297,3.9541-2.75537,6.51318,1.03882,2.56079,3.95605,3.79004,6.51416,2.75635Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Solution
                      </span>
                    </span>
                  </span>
                </a>
                <ul aria-expanded="false">
                  <li>
                    <Link to="/portfolio/summary" className="border-radius-50">
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
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Portfolio and Bundles
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ cursor: "pointer" }}
                      to="/solutionBuilder/analytics"
                      className="border-radius-50"
                    >
                      {/* <li><a style={{ cursor: 'pointer' }} onClick={handleShow}> */}
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
                      <span className="nav-text">
                        <span
                          className="ml-2 "
                          style={{ display: "inline-grid" }}
                        >
                          <span className="font-size-14 font-weight-600 text-dark">
                            Solution Builder
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                  {/* <li><a href="#">
                    <span className="span-icon"><img src={Disassemble}></img></span>
                    <span className="nav-text">
                      <span className="ml-2 " style={{ display: 'inline-grid' }}>
                        <span className="font-size-14 font-weight-600 text-dark">Reports Dashboard</span>
                      </span>
                    </span>
                  </a>
                  </li> */}
                </ul>
              </li>
            </ul>
          </li>

          <li className="has-subnav sub-li">
            <a className="has-arrow border-radius-50" href="#" aria-expanded="false">
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
              <span className="nav-text">
                <span className="ml-2 " style={{ display: "inline-grid" }}>
                  <span className="font-size-14 font-weight-600 text-dark">
                    Quote
                  </span>
                </span>
              </span>
            </a>
            <ul aria-expanded="false">
              <li>
                <NavLink to="/SolutionQuote" className="border-radius-50">
                  <span className="span-icon">
                    <svg
                      id="uuid-e1f64c88-ce49-4df1-a848-c28d42dd73fb"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 125.60411 105.11994"
                    >
                      <path
                        className="uuid-ca01be9e-9dab-4294-845e-2b0def34245b"
                        d="M60.88368,37.31373c1.62793-1.62646,1.62793-4.26514,0-5.89307-1.62646-1.62793-4.26709-1.62793-5.89307,0l-18.76758,18.7666-9.58105-9.5835c-1.62793-1.62793-4.26611-1.62793-5.89404,0-1.62793,1.62622-1.62793,4.26514-.00098,5.89307l15.47607,15.47656,24.66064-24.65967Z"
                      />
                      <path
                        className="uuid-ca01be9e-9dab-4294-845e-2b0def34245b"
                        d="M121.43641,74.79664h-17.81885V14.00343h-21.98682V.00001H-.00011V78.96413C-.00011,93.386,11.73328,105.11989,26.15516,105.11989c.14355,0,.2832-.01685,.42627-.01904,.06445,.00293,.12549,.01904,.19043,.01904H99.45008c14.42139,0,26.1543-11.73389,26.1543-26.15576,0-2.302-1.86572-4.16748-4.16797-4.16748Zm-113.10156,4.16748V8.33497H73.29578V63.37819c0,2.302,1.86523,4.16772,4.16748,4.16772,2.30176,0,4.16748-1.86572,4.16748-4.16772V22.33839h13.65186v52.45825H49.03895c-2.73682,0-4.96777,2.1521-5.0791,4.90161-.38672,9.58203-8.20752,17.08667-17.80469,17.08667-9.82617,0-17.82031-7.99463-17.82031-17.8208Zm91.11523,17.8208H45.31336c3.44141-3.69922,5.83545-8.39575,6.66895-13.65332H116.75672c-1.88379,7.81885-8.91846,13.65332-17.30664,13.65332Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Solution Quote
                      </span>
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/QuoteRepairQuote" className="border-radius-50">
                  <span className="span-icon">
                    <svg
                      id="uuid-ca4af1ef-6b2a-43ba-b263-14c9653fee82"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 129.35077 128.95926"
                    >
                      <path
                        className="uuid-272d570e-c4ca-4b12-a836-c20f74794781"
                        d="M119.39194,54.31567c-.66675,0-1.26636-.40845-1.49292-1.01245-.26685-.71631-.55981-1.41968-.87573-2.10986-.27905-.61035-.14893-1.31543,.3313-1.79736,3.88184-3.88086,3.88257-10.19873,0-14.08301l-.2915-.2915c-3.88159-3.88086-10.20215-3.88428-14.08545,.00342-.47217,.47021-1.19336,.60547-1.7998,.32544-.68604-.3125-1.38525-.604-2.10059-.87256-.60815-.22632-1.01611-.8269-1.01611-1.49292,0-4.06909-2.45605-7.57178-5.96143-9.11548V14.10595C92.0997,6.32763,85.77206,0,77.99374,0H.00009V114.85327C.00009,122.63159,6.32773,128.95922,14.10605,128.95922H92.0997v-23.8689c3.50537-1.54321,5.96143-5.04517,5.96143-9.1145,0-.66724,.40796-1.26807,1.021-1.49585,.71045-.26709,1.40967-.55859,2.10156-.87427,.60791-.28003,1.31372-.1499,1.79712,.33203,3.7605,3.76367,10.32202,3.76367,14.08228,0l.2915-.29126c3.88257-3.88281,3.88184-10.20068-.00244-14.08643-.47217-.47217-.604-1.19336-.32886-1.79419,.31592-.69019,.60815-1.39185,.875-2.10645,.22729-.60718,.82788-1.01587,1.49438-1.01587,5.49121,0,9.95801-4.46704,9.95801-9.95801v-.41187c0-5.49097-4.46777-9.95801-9.95874-9.95801ZM14.10605,120.62426c-3.18188,0-5.771-2.58838-5.771-5.771V8.33496H77.99374c3.18188,0,5.771,2.58838,5.771,5.771v9.72949c-3.54346,1.5271-6.03223,5.05273-6.03223,9.14941,0,.66602-.40771,1.2666-1.01807,1.49463-.7124,.26685-1.41309,.55835-2.10596,.87402-.60156,.27856-1.32007,.1416-1.79468-.3335-3.88428-3.8811-10.20215-3.88281-14.08325,.00146l-.29297,.2915c-3.88086,3.88428-3.87842,10.20386,.00415,14.08643,.47192,.47217,.60376,1.19336,.32886,1.79395-.31592,.69019-.60889,1.39355-.875,2.10645-.22705,.60742-.82715,1.01587-1.49365,1.01587-5.49097,0-9.95898,4.46704-9.95898,9.95801v.41187c0,5.49097,4.46802,9.95801,9.95898,9.95801,.6665,0,1.2666,.40869,1.49365,1.01758,.26685,.71289,.55908,1.41455,.875,2.10474,.27905,.6106,.14893,1.31543-.3313,1.79736-3.88354,3.88257-3.88354,10.20044,0,14.08325l.29126,.29126c3.88184,3.88257,10.20215,3.88257,14.08569-.00317,.4729-.46899,1.19165-.60571,1.79883-.32568,.68628,.3125,1.38696,.604,2.10254,.87256,.60718,.22632,1.01489,.82715,1.01489,1.49438,0,4.09692,2.48877,7.62158,6.03223,9.14819v15.50024H14.10605Zm106.90967-55.93872c0,.89551-.72852,1.62305-1.62378,1.62305-4.12598,0-7.86353,2.58521-9.30103,6.43188-.19702,.52759-.41284,1.04688-.64551,1.55469-1.71826,3.75073-.90845,8.2356,2.01611,11.16113,.63232,.6333,.63232,1.66382,0,2.29688l-.2915,.2915c-.63232,.63159-1.66357,.63159-2.29932-.00317-2.92212-2.92383-7.40869-3.73291-11.15381-2.01562-.51196,.23462-1.03369,.45117-1.55859,.64795-3.84692,1.4375-6.43213,5.17676-6.43213,9.302,0,.89551-.72827,1.62305-1.62305,1.62305h-.41162c-.89551,0-1.62402-.72754-1.62402-1.62305,0-4.12524-2.58423-7.86279-6.42773-9.30029-.53003-.19849-1.05176-.41504-1.55713-.64624-1.31299-.60229-2.71631-.8938-4.11133-.8938-2.58936,0-5.1499,1.00781-7.05054,2.90747-.6333,.63501-1.66382,.6333-2.29712,.00171l-.29126-.2915c-.63257-.63306-.63159-1.66528,.00415-2.30005,2.92114-2.92383,3.73022-7.40723,2.01196-11.15796-.23267-.50781-.44849-1.0271-.64551-1.55298-1.43726-3.84839-5.17603-6.43359-9.30103-6.43359-.89551,0-1.62402-.72754-1.62402-1.62305v-.41187c0-.89526,.72852-1.62305,1.62402-1.62305,4.125,0,7.86279-2.58521,9.30176-6.43359,.19727-.52734,.41211-1.04517,.64478-1.55298,1.71826-3.75073,.90845-8.2356-2.01611-11.16113-.63257-.6333-.63257-1.66357,0-2.29688l.29126-.2915c.63257-.63159,1.66382-.63159,2.29956,.00342,2.92358,2.92358,7.40869,3.73267,11.15283,2.01514,.51196-.23438,1.03369-.45068,1.5603-.64771,3.84692-1.43921,6.43115-5.17529,6.43115-9.30054,0-.89526,.72852-1.62451,1.62402-1.62451h.41162c.89478,0,1.62305,.72925,1.62305,1.62451,0,4.12524,2.58521,7.86304,6.42725,9.29883,.52979,.19873,1.05151,.41504,1.55786,.64624,3.75146,1.7207,8.23657,.90845,11.1626-2.01538,.41357-.41357,.89697-.47534,1.14771-.47534,.25146,0,.73511,.06177,1.14844,.47534l.29004,.2915c.63379,.6333,.63306,1.66528-.00098,2.30029-2.92285,2.92212-3.73193,7.40698-2.01367,11.15771,.23267,.50781,.44775,1.02563,.64551,1.55615,1.43823,3.84521,5.17676,6.43042,9.30176,6.43042,.89453,0,1.62305,.72778,1.62305,1.62305v.41187Z"
                      />
                      <path
                        className="uuid-272d570e-c4ca-4b12-a836-c20f74794781"
                        d="M30.53256,29.07812c-2.302,0-4.16748,1.86548-4.16748,4.16748V100.51953c0,2.30176,1.86548,4.16748,4.16748,4.16748s4.16748-1.86572,4.16748-4.16748V33.2456c0-2.302-1.86548-4.16748-4.16748-4.16748Z"
                      />
                      <path
                        className="uuid-272d570e-c4ca-4b12-a836-c20f74794781"
                        d="M98.11752,60.31128h-20.44019c-2.302,0-4.16748,1.86572-4.16748,4.16748,0,2.302,1.86548,4.16748,4.16748,4.16748h20.44019c2.30176,0,4.16748-1.86548,4.16748-4.16748,0-2.30176-1.86572-4.16748-4.16748-4.16748Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Repair Quote
                      </span>
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/QuoteSpareParts" className="border-radius-50">
                  <span className="span-icon">
                    <svg
                      id="uuid-fff7022f-e3d4-42a4-9d61-a33e4511768e"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 143.57476 126.95366"
                    >
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M97.02195,33.60681l3.27295,.71948c3.31348,.72949,6.4668,2.02197,9.36768,3.83887,.75781,.4751,1.60522,.70801,2.44604,.70801,1.17871,0,2.34424-.45581,3.23389-1.34131,1.63208-1.62158,1.64014-4.26025,.01709-5.89307-.65845-.6626-1.48462-1.05664-2.34253-1.18359-2.43457-1.41797-4.9978-2.55273-7.66016-3.39429v-8.96313c0-2.302-2.04883-4.33203-4.35059-4.33203-2.302,0-4.16748,1.86572-4.16748,4.16748,0,.42651,.06421,.83838,.18311,1.22583v14.44775Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M123.01243,57.04578c.42749,1.94702,2.15137,3.27539,4.06665,3.27539,.29614,0,.59668-.03271,.89697-.09766,2.24805-.49487,3.6709-2.71704,3.17773-4.96533-.71875-3.27368-1.86475-6.42358-3.42041-9.39966l6.33203-6.33081c1.62769-1.62793,1.62769-4.52417,0-6.1521-1.62646-1.62793-4.26709-1.62793-5.89331,0-.302,.30127-.54761,.63672-.7373,.99463l-10.22754,10.22681,1.80615,2.82446c1.90649,2.979,3.25171,6.21704,3.99902,9.62427Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M139.4072,66.45178c-.42554,0-.83594,.06348-1.22241,.18237h-14.45361l-.71875,3.27368c-.72681,3.30957-2.01855,6.4646-3.8418,9.37524-1.14282,1.82983-.87427,4.16919,.6543,5.68799,.81323,.80908,1.87622,1.21289,2.93848,1.21289,1.07031,0,2.14062-.4104,2.95557-1.22925,.65186-.65601,1.04102-1.47485,1.16724-2.32446,1.41699-2.43701,2.55249-4.99951,3.39258-7.66113h8.94629c2.30176,0,4.34961-2.04785,4.34961-4.34985,0-2.30176-1.86548-4.16748-4.16748-4.16748Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M122.97019,97.04871l-10.229-10.22827-2.823,1.80713c-2.97729,1.90454-6.2146,3.25098-9.62183,3.99634-2.24805,.49341-3.6709,2.71558-3.17773,4.96362,.49268,2.24976,2.71045,3.66772,4.96362,3.1792,3.27368-.71777,6.42383-1.86548,9.39868-3.42017l6.33203,6.33105c.78125,.78296,1.97119,1.27466,3.07764,1.27466h.0105c1.10938-.00342,2.30029-.50293,3.07983-1.29102,1.61816-1.6377,1.60352-4.2749-.0332-5.89453-.29712-.29321-.62671-.53247-.97754-.71802Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M90.70628,107.79798v-14.45459l-3.27466-.71948c-3.30786-.72437-6.46118-2.01685-9.36694-3.83521-1.82983-1.14941-4.17407-.88403-5.69702,.64941-1.62305,1.63281-1.61475,4.27173,.01709,5.89307,.65698,.65283,1.47656,1.04199,2.32715,1.16724,2.43628,1.41797,4.99951,2.55249,7.65942,3.39258v18.72778H8.33494V8.33509H77.84251c2.49731,0,4.52881,2.03149,4.52881,4.52881v14.21655c-2.10669,.66577-4.15698,1.49805-6.125,2.52661l-6.34888-6.35059c-1.61816-1.59692-4.47437-1.60498-6.10059-.01611-1.646,1.6084-1.67603,4.24707-.06763,5.89307,.30933,.31738,.65674,.573,1.02808,.77002l10.22803,10.22974,2.82373-1.80688c2.97656-1.90479,6.2146-3.25098,9.62354-4,.0752-.01636,.14111-.0498,.21436-.07007,.18921-.05249,.37793-.10449,.55493-.18188,.10791-.04663,.20337-.1106,.30542-.16553,.13477-.073,.27295-.13965,.39819-.22656,.10913-.0752,.20337-.16602,.30396-.25073,.10425-.08765,.21338-.16919,.30859-.26685,.08984-.09229,.16357-.19653,.24438-.29639,.08813-.10864,.1814-.21216,.2583-.32935,.06812-.104,.1189-.21753,.17749-.32739,.06787-.12622,.14136-.24829,.19604-.38208,.05249-.12817,.08374-.26416,.12329-.39771,.03687-.12451,.08276-.24463,.10791-.37354,.03418-.17285,.04175-.35107,.05347-.52905,.0061-.0918,.02734-.1792,.02734-.27271V12.86389C90.70628,5.77112,84.93528,.00012,77.84251,.00012H-.00002V126.95374H90.70628v-16.77881c.10693-.3689,.18237-.75098,.18237-1.15454,0-.4248-.06348-.83667-.18237-1.22241Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M56.60862,94.79724c1.08252,0,2.16431-.41992,2.98071-1.25513,.28491-.2915,.51929-.61523,.70166-.95728l10.229-10.23145-1.80615-2.82275c-1.90625-2.97925-3.25171-6.21704-3.99902-9.6228-.49414-2.24805-2.72095-3.67236-4.96338-3.17773-2.24829,.49512-3.67114,2.71729-3.17773,4.96533,.71777,3.27197,1.86475,6.42212,3.42017,9.39795l-6.29834,6.29834c-.80176,.78467-1.30811,1.98779-1.30811,3.10938s.50635,2.32471,1.30811,3.10938c.81055,.79297,1.8623,1.18677,2.91309,1.18677Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M44.15256,56.33435c0,2.30176,1.86548,4.16748,4.16748,4.16748,.42578,0,.83594-.06348,1.22266-.18237h14.45337l.71875-3.27368c.72705-3.31274,2.01953-6.46606,3.84204-9.37524,1.13696-1.82007,.875-4.15283-.63745-5.67334-1.62378-1.63281-4.26172-1.64087-5.8938-.01636-.6626,.65771-1.05737,1.48462-1.18433,2.34253-1.41724,2.43555-2.55273,4.99951-3.39355,7.66113h-8.94531c-2.302,0-4.34985,2.04785-4.34985,4.34985Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M48.32005,24.96594H22.36521c-2.30176,0-4.16748,1.86548-4.16748,4.16748,0,2.30176,1.86572,4.16748,4.16748,4.16748h25.95483c2.302,0,4.16748-1.86572,4.16748-4.16748,0-2.302-1.86548-4.16748-4.16748-4.16748Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M22.36521,108.92273h25.95483c2.302,0,4.16748-1.86548,4.16748-4.16748s-1.86548-4.16748-4.16748-4.16748H22.36521c-2.30176,0-4.16748,1.86548-4.16748,4.16748s1.86572,4.16748,4.16748,4.16748Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M22.36521,90.72254h15.06152c2.302,0,4.16748-1.86548,4.16748-4.16748,0-2.30176-1.86548-4.16748-4.16748-4.16748h-15.06152c-2.30176,0-4.16748,1.86572-4.16748,4.16748,0,2.302,1.86572,4.16748,4.16748,4.16748Z"
                      />
                      <path
                        className="uuid-4208680f-df00-457f-87d6-d89dccaaeaab"
                        d="M112.62229,63.47595c0-10.34375-8.41479-18.75854-18.75854-18.75854s-18.75879,8.41479-18.75879,18.75854,8.41504,18.75854,18.75879,18.75854,18.75854-8.41455,18.75854-18.75854Zm-18.75854,10.42358c-5.74756,0-10.42358-4.67529-10.42358-10.42358s4.67603-10.42358,10.42358-10.42358,10.42358,4.67529,10.42358,10.42358-4.67627,10.42358-10.42358,10.42358Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Spare Parts Quote
                      </span>
                    </span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="has-subnav sub-li">
            <a className="has-arrow border-radius-50" href="#" aria-expanded="false">
              <span className="span-icon">
                <svg
                  id="uuid-9ce0e2a9-dce3-4e3c-9203-296e2dedc338"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 88.73024 106.83911"
                >
                  <path
                    className="uuid-eb24abed-0470-43cd-88a6-7d59d606a7f0"
                    d="M85.59424,21.24414c-2.0271-2.02563-4.6665-3.07959-7.58618-3.13379l-21.5542,.03442V4.07007c0-2.24829-1.82202-4.07007-4.07007-4.07007-2.24829,0-4.07031,1.82178-4.07031,4.07007v14.08789l-16.0293,.02563L1.19238,49.27539c-1.58984,1.58984-1.58984,4.16553,0,5.75537,1.58813,1.59009,4.16699,1.59009,5.75537,0l28.71338-28.71338,12.65234-.02002v11.2251c-3.09717,.73853-5.94507,2.30054-8.25293,4.60962-3.29199,3.29102-5.10522,7.66821-5.10522,12.32324,0,4.65527,1.81323,9.03223,5.10425,12.32324,3.29199,3.29272,7.66895,5.10522,12.32422,5.10522,4.65503,0,9.03223-1.8125,12.32397-5.10522h.00073c3.29199-3.29102,5.10449-7.66797,5.10449-12.32324,0-4.65503-1.81348-9.03223-5.10449-12.32324-2.30908-2.30908-5.15698-3.87134-8.25464-4.60986v-11.23755l21.56763-.03418h.00488c.68433,0,1.32837,.26733,1.8125,.75049,.4856,.48486,.75195,1.13037,.75122,1.81738l-.06372,42.35474-28.71729,28.71826c-1.59009,1.58984-1.59009,4.16553,0,5.75537,.79395,.79492,1.83618,1.19238,2.87744,1.19238,1.0415,0,2.08374-.39746,2.87793-1.19238l31.09741-31.09668,.06836-45.71899c.00415-2.8667-1.10889-5.55981-3.13599-7.58691Zm-23.92163,33.21118c0,2.48022-.96582,4.81274-2.72021,6.56787h-.00073c-3.50903,3.5105-9.62524,3.5105-13.13574,0-1.75439-1.75513-2.72046-4.08765-2.72046-6.56787s.96606-4.8125,2.72119-6.56787c1.75439-1.75513,4.08594-2.72021,6.56714-2.72021,2.48096,0,4.81323,.96509,6.5686,2.72021,1.75439,1.75537,2.72021,4.08765,2.72021,6.56787Z"
                  />
                  <path
                    className="uuid-eb24abed-0470-43cd-88a6-7d59d606a7f0"
                    d="M20.36011,62.68774c-1.58838-1.58984-4.16724-1.58984-5.75562,0-1.58984,1.59009-1.58984,4.16553,0,5.75562l23.79199,23.79102c.79419,.79492,1.83643,1.19238,2.87793,1.19238,1.04126,0,2.0835-.39746,2.87769-1.19238,1.58984-1.58984,1.58984-4.16553,0-5.75537l-23.79199-23.79126Z"
                  />
                </svg>
              </span>
              <span className="nav-text">
                <span className="ml-2 " style={{ display: "inline-grid" }}>
                  <span className="font-size-14 font-weight-600 text-dark">
                    Price
                  </span>
                </span>
              </span>
            </a>
            <ul aria-expanded="false">
              <li>
                <Link to="/PriceSetting" className="border-radius-50">
                  <span className="span-icon">
                    <svg
                      id="uuid-a5522de4-b158-4b69-af44-ca862042c87a"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 134.19385 134.19303"
                    >
                      <path
                        className="uuid-ac280b54-7eaa-476b-be59-35cdcfb4422d"
                        d="M120.25147,52.80656c-2.31396,0-4.40601-1.43579-5.20532-3.57642-.42651-1.13965-.8938-2.26294-1.39819-3.36353-.96143-2.09814-.50391-4.61011,1.1394-6.25269,5.43408-5.43579,5.43408-14.28003-.00073-19.71582l-.49097-.4917c-2.63306-2.63403-6.13403-4.08447-9.85767-4.08447-3.72412,0-7.22485,1.45044-9.86377,4.08936-1.6377,1.6377-4.14868,2.09692-6.24463,1.13477-1.10205-.50464-2.22461-.97192-3.36816-1.40015-2.13843-.79932-3.57568-2.89111-3.57568-5.20605C81.38575,6.25284,75.13111-.00008,67.4441-.00008h-.69507C59.06202-.00008,52.80738,6.25284,52.80738,13.93986c0,2.31494-1.43652,4.40674-3.57568,5.20605-1.14355,.42822-2.26782,.89551-3.36401,1.39844-2.09937,.95898-4.61133,.50464-6.25464-1.13794-2.63232-2.63403-6.13306-4.08447-9.85791-4.08447-3.72388,0-7.22461,1.45044-9.85693,4.08447l-.4917,.4917c-2.63403,2.63403-4.08447,6.13574-4.08374,9.85864,.00098,3.72485,1.45312,7.22656,4.08862,9.86035,1.6394,1.6394,2.09521,4.15137,1.13379,6.24951-.50366,1.10059-.97021,2.22217-1.39819,3.36353-.79932,2.13892-2.89209,3.57642-5.20557,3.57642C6.2544,52.80656,0,59.06095,0,66.74821v.69507C0,75.13029,6.2544,81.38468,13.94142,81.38468c2.31348,0,4.40625,1.4375,5.2063,3.57666,.42725,1.14282,.8938,2.2644,1.39746,3.36499,.96045,2.09839,.50464,4.60864-1.13867,6.25269-5.43652,5.43579-5.43652,14.28027,0,19.71582l.49072,.4917c2.6333,2.63403,6.13403,4.08447,9.85791,4.08447,3.72485,0,7.22559-1.45044,9.86353-4.08936,1.63867-1.64087,4.14795-2.0918,6.24414-1.13623,1.10278,.50781,2.22949,.9751,3.36963,1.3999,2.13843,.79932,3.57495,2.89111,3.57495,5.20605,0,7.68726,6.25464,13.94165,13.94165,13.94165h.69507c7.68701,0,13.94165-6.25439,13.94165-13.94165,0-2.31494,1.43726-4.40674,3.57227-5.20435,1.1438-.42651,2.26782-.8938,3.36914-1.40015,2.09668-.96362,4.60864-.5061,6.25293,1.13965,2.63306,2.63403,6.13379,4.08447,9.85791,4.08447,3.72363,0,7.22461-1.45044,9.85693-4.08447l.49243-.4917c5.43408-5.43555,5.43408-14.28003-.00562-19.7207-1.63867-1.63916-2.09424-4.14941-1.13379-6.2478,.50439-1.10229,.97168-2.22388,1.39819-3.36646,.79932-2.1377,2.89136-3.5752,5.2063-3.5752,7.68701,0,13.94141-6.25439,13.94141-13.94141v-.69507c0-7.68726-6.25439-13.94165-13.94238-13.94165Zm5.60742,14.63672c0,3.09131-2.51514,5.60645-5.60742,5.60645-5.77344,0-11.00244,3.61426-13.0127,8.99268-.35645,.95557-.74731,1.89331-1.16895,2.81323-2.40356,5.24829-1.27148,11.52222,2.82275,15.61646,2.18652,2.18652,2.18652,5.74341,.00098,7.92969l-.49268,.4917c-2.11865,2.12109-5.80518,2.11963-7.93188-.00488-4.08936-4.09106-10.36499-5.22241-15.6167-2.81787-.91821,.42163-1.85498,.81055-2.80981,1.16724-5.37866,2.01196-8.9917,7.24097-8.9917,13.01343,0,3.09155-2.51514,5.60669-5.60669,5.60669h-.69507c-3.09155,0-5.60669-2.51514-5.60669-5.60669,0-5.77246-3.61304-11.00146-8.99512-13.01514-.95239-.35498-1.88843-.7439-2.80981-1.16553-1.83618-.8418-3.79785-1.25024-5.74805-1.25024-3.62451,0-7.2085,1.40967-9.87109,4.073-2.11523,2.11792-5.80664,2.12109-7.927,0l-.4917-.4917c-2.18555-2.18628-2.18555-5.74316,.00488-7.93457,4.09009-4.08936,5.22241-10.36328,2.81885-15.61157-.42261-.92163-.8125-1.86084-1.16895-2.8147-2.01123-5.37695-7.24097-8.99121-13.01294-8.99121-3.09131,0-5.60645-2.51514-5.60645-5.60645v-.69507c0-3.09155,2.51514-5.60669,5.60645-5.60669,5.77197,0,11.00171-3.61401,13.01123-8.98926,.35815-.9541,.74805-1.89331,1.17065-2.8147,2.4043-5.25024,1.26978-11.52563-2.82373-15.6167-2.18555-2.18628-2.18555-5.74341,0-7.92969l.49243-.49146c2.11865-2.12134,5.80518-2.12305,7.93213,.00488,4.08838,4.08911,10.36255,5.2207,15.61743,2.81616,.91895-.42163,1.85742-.81079,2.80981-1.16724,5.37793-2.01221,8.99097-7.24097,8.99097-13.01367,0-3.08984,2.51514-5.60498,5.60669-5.60498h.69507c3.09155,0,5.60669,2.51514,5.60669,5.60669,0,5.771,3.61304,10.99976,8.98926,13.01025,.9541,.35815,1.89258,.74731,2.81641,1.17212,5.24829,2.40137,11.5249,1.26831,15.6167-2.82422,2.11865-2.11475,5.80835-2.12134,7.92871,0l.49072,.49146c2.18652,2.18628,2.18408,5.74487-.00391,7.93286-4.09033,4.08936-5.22241,10.36328-2.81885,15.61353,.42163,.92139,.8125,1.85913,1.16895,2.81128,2.00952,5.37866,7.23926,8.99268,13.01367,8.99268,3.09131,0,5.60645,2.51514,5.60645,5.60669v.69507Z"
                      />
                      <path
                        className="uuid-ac280b54-7eaa-476b-be59-35cdcfb4422d"
                        d="M73.70265,63.34098h-2.43848v-12.46997h7.40283c2.30176,0,4.16748-1.86572,4.16748-4.16748s-1.86572-4.16748-4.16748-4.16748h-7.40283v-7.67896c0-2.302-1.86572-4.16748-4.16772-4.16748-2.30176,0-4.16748,1.86548-4.16748,4.16748v7.67896h-2.43774c-8.03369,0-14.56982,6.53613-14.56982,14.56982s6.53613,14.57007,14.56982,14.57007h2.43774v12.46997h-10.9812c-2.30176,0-4.16748,1.86548-4.16748,4.16748,0,2.30176,1.86572,4.16748,4.16748,4.16748h10.9812v6.85498c0,2.302,1.86572,4.16748,4.16748,4.16748,2.302,0,4.16772-1.86548,4.16772-4.16748v-6.85498h2.43848c8.03369,0,14.56909-6.53613,14.56909-14.57007s-6.5354-14.56982-14.56909-14.56982Zm-19.44629-6.23511c0-3.43799,2.79663-6.23486,6.23486-6.23486h2.43774v12.46997h-2.43774c-3.43823,0-6.23486-2.79688-6.23486-6.23511Zm19.44629,27.04004h-2.43848v-12.46997h2.43848c3.4375,0,6.23413,2.79663,6.23413,6.23486s-2.79663,6.23511-6.23413,6.23511Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Price setting
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
              {/* <li><Link to="PriceConfiguration">
                         <span className="span-icon"><svg id="uuid-3337f03f-ae30-46ad-aa89-7f955beb1314" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.58682 129.58764"><path className="uuid-fa759d65-7e4f-40c6-bbf4-39ebb38c6b83" d="M110.60941,18.97823C98.37137,6.74117,82.0994-.00004,64.793-.00004S31.21464,6.73946,18.97757,18.97823C6.73954,31.21553,.00004,47.48653,.00004,64.79293s6.7395,33.57935,18.97754,45.81641c12.23706,12.23877,28.5083,18.97827,45.81543,18.97827s33.57837-6.7395,45.81641-18.97827c12.23779-12.23706,18.97754-28.51001,18.97754-45.81641s-6.73975-33.57739-18.97754-45.8147Zm10.47534,41.65332c-.01465-.00024-.02808-.00439-.04297-.00439h-13.19116c-.80103-8.35474-4.02197-16.5166-9.65381-23.34473l9.31689-9.31641c.0105-.01025,.01709-.02295,.02734-.0332,7.95703,9.19971,12.66504,20.56592,13.5437,32.69873ZM37.27884,98.20137c6.66553,5.50977,14.7373,8.85303,23.34668,9.67017v13.17114c0,.01465,.00415,.02808,.00439,.04272-12.13135-.87915-23.49683-5.5874-32.69653-13.54321,.0105-.0105,.02319-.01709,.03345-.02759l9.31201-9.31323Zm31.68164,22.84131v-13.17114c8.60938-.81714,16.6814-4.1604,23.34668-9.67017l9.31274,9.31323c.0105,.0105,.02295,.01709,.03345,.02734-9.2002,7.9563-20.56543,12.66431-32.69727,13.54346,.00024-.01465,.00439-.02808,.00439-.04272Zm20.54102-31.53955c-13.62476,13.62256-35.79468,13.62427-49.41626,0-13.62427-13.62549-13.62427-35.79297-.00073-49.4187,6.81201-6.81128,15.76074-10.21851,24.7085-10.21851s17.89648,3.40723,24.70776,10.21851c13.62427,13.62573,13.62427,35.79321,.00073,49.4187Zm2.80542-58.11719c-6.66528-5.50952-14.73706-8.85254-23.34644-9.66992V8.54512c0-.01465-.00415-.02832-.00439-.04297,12.13184,.87939,23.49731,5.5874,32.69775,13.54395-.0105,.01001-.02295,.0166-.0332,.02686l-9.31372,9.31299ZM60.62552,8.54512v13.1709c-8.60938,.81738-16.68091,4.1604-23.34644,9.66992l-9.31299-9.31299c-.01025-.01025-.02271-.01685-.0332-.0271,9.19995-7.9563,20.56567-12.66431,32.69702-13.5437-.00024,.01465-.00439,.02832-.00439,.04297ZM22.04593,27.93282c.01025,.01025,.0166,.02295,.0271,.0332l9.31641,9.31641c-5.63208,6.82812-8.85303,14.98999-9.65405,23.34473H8.54423c-.0144,0-.02759,.00415-.04199,.00415,.87866-12.13257,5.58667-23.49878,13.5437-32.69849Zm-13.54346,41.02515c.01416,0,.02734,.00415,.04175,.00415h13.19116c.80127,8.35376,4.02197,16.51465,9.65308,23.3418l-9.31616,9.31763c-.01025,.01001-.0166,.02246-.02686,.03271-7.95581-9.19995-12.66357-20.56494-13.54297-32.69629Zm99.03882,32.69629c-.01001-.01025-.0166-.02271-.02661-.03271l-9.31689-9.31763c5.63086-6.82739,8.85156-14.98828,9.65283-23.3418h13.19116c.01465,0,.02808-.00415,.04272-.00439-.87939,12.13159-5.58716,23.49658-13.54321,32.69653Z"/><path className="uuid-fa759d65-7e4f-40c6-bbf4-39ebb38c6b83" d="M70.36942,60.97383h-1.40894v-9.22705h5.6001c2.30176,0,4.16748-1.86548,4.16748-4.16748,0-2.30176-1.86572-4.16748-4.16748-4.16748h-5.6001v-5.83447c0-2.30176-1.86572-4.16748-4.16748-4.16748s-4.16748,1.86572-4.16748,4.16748v5.83447h-1.40894c-7.14014,0-12.94849,5.80859-12.94849,12.94849s5.80835,12.94849,12.94849,12.94849h1.40894v9.22876h-8.62061c-2.302,0-4.16748,1.86548-4.16748,4.16748s1.86548,4.16748,4.16748,4.16748h8.62061v5.1377c0,2.302,1.86572,4.16748,4.16748,4.16748s4.16748-1.86548,4.16748-4.16748v-5.1377h1.40894c7.14014,0,12.94849-5.80835,12.94849-12.94849s-5.80835-12.9502-12.94849-12.9502Zm-15.76636-4.61353c0-2.54443,2.06982-4.61353,4.61353-4.61353h1.40894v9.22705h-1.40894c-2.5437,0-4.61353-2.06909-4.61353-4.61353Zm15.76636,22.17725h-1.40894v-9.22876h1.40894c2.5437,0,4.61353,2.0708,4.61353,4.61523s-2.06982,4.61353-4.61353,4.61353Z"/></svg></span>
                        <span className="nav-text">
                        <span className="ml-2 " style={{display:'inline-grid'}}>
                            <span className="font-size-14 font-weight-600 text-dark">Configuration</span>
                        </span>
                        </span>
                        </Link>
                        </li> */}
              <li>
                <Link to="/PriceMaintenance" className="border-radius-50">
                  <span className="span-icon">
                    <svg
                      id="uuid-de246da4-4706-4310-b3d5-ffa9f8d22cd2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 118.97439 128.67789"
                    >
                      <path
                        className="uuid-e6a75694-9e2b-4a4c-8f31-e708d1f611e7"
                        d="M110.90729,35.26434c-1.15991-1.98608-3.71094-2.66162-5.69946-1.49927-1.98853,1.15918-2.65991,3.70996-1.50098,5.69922,3.83691,6.57764,6.12378,13.96167,6.74316,21.56348h-6.21069c-2.302,0-4.16748,1.86572-4.16748,4.16748,0,2.302,1.86548,4.16748,4.16748,4.16748h6.21582c-2.01807,24.88574-21.91504,44.78174-46.80078,46.79956v-4.9519c0-2.302-1.86572-4.16748-4.16748-4.16748-2.302,0-4.16748,1.86548-4.16748,4.16748v4.96289c-8.66724-.69971-16.96973-3.57227-24.2251-8.42236-.05811-.03857-.12183-.06055-.18115-.09595l9.38379-2.25635c2.23755-.53882,3.61548-2.78882,3.07739-5.0271-.53784-2.23682-2.78784-3.60742-5.02612-3.07666l-18.67139,4.48975c-2.23779,.53882-3.61572,2.78857-3.07764,5.0271l4.49072,18.67212c.45898,1.90967,2.1665,3.19409,4.04858,3.19409,.32227,0,.65015-.03906,.97754-.11719,2.23828-.53882,3.61548-2.78882,3.07739-5.0271l-2.01904-8.39624c9.62842,6.24194,20.77856,9.54395,32.3125,9.54395,32.80176,0,59.48755-26.68481,59.48755-59.48608,0-10.53101-2.78955-20.88135-8.06714-29.93091Z"
                      />
                      <path
                        className="uuid-e6a75694-9e2b-4a4c-8f31-e708d1f611e7"
                        d="M55.37458,65.74457c.01611,.11914,.02393,.23999,.04956,.35571,.03003,.13501,.07959,.2644,.12305,.39624,.0415,.12573,.07544,.25415,.12842,.37427,.05054,.11548,.11963,.2229,.1814,.33398,.07007,.12622,.13452,.25513,.21704,.3728,.06445,.09229,.14429,.17529,.21704,.26318,.104,.12549,.20581,.25098,.32349,.36328,.01978,.0188,.03345,.0415,.05347,.06006l19.22827,17.65967c.80005,.73584,1.8103,1.09888,2.81787,1.09888,1.12573,0,2.24829-.45435,3.07031-1.3479,1.55713-1.69629,1.44482-4.33203-.25073-5.88818l-17.87939-16.42114v-16.06738c0-2.302-1.86572-4.16748-4.16748-4.16748-2.302,0-4.16748,1.86548-4.16748,4.16748v17.89722c0,.02905,.00781,.05566,.00854,.08447,.00317,.15625,.02612,.30981,.04663,.46484Z"
                      />
                      <path
                        className="uuid-e6a75694-9e2b-4a4c-8f31-e708d1f611e7"
                        d="M17.63849,65.19525c0-2.30176-1.86548-4.16748-4.16748-4.16748h-4.9519C10.53718,36.14203,30.43366,16.24505,55.3194,14.22674v6.21533c0,2.302,1.86548,4.16748,4.16748,4.16748,2.30176,0,4.16748-1.86548,4.16748-4.16748v-6.22339c7.6123,.61816,14.98022,2.9248,21.57031,6.76855l-9.05664,1.99268c-2.24805,.49512-3.66919,2.71704-3.17432,4.96533,.42822,1.94702,2.1521,3.27368,4.06567,3.27368,.29712,0,.59839-.03247,.89941-.09937l18.75464-4.12671c2.24805-.49487,3.66919-2.71704,3.17432-4.96509l-4.12744-18.75537c-.49414-2.24976-2.72681-3.66772-4.96533-3.17432-2.24805,.49463-3.66943,2.7168-3.17432,4.96509l1.93799,8.80615c-9.09375-5.33813-19.46436-8.16162-30.07178-8.16162C26.68561,5.7077,.00007,32.39447,.00007,65.19525,.00007,75.09955,2.48346,84.90619,7.18244,93.55218c.75537,1.39014,2.18701,2.17822,3.66602,2.17822,.67163,0,1.35376-.16284,1.98608-.50635,2.02197-1.09888,2.77075-3.62866,1.67188-5.65039-3.37671-6.21436-5.40112-13.13037-5.97998-20.21094h4.94458c2.302,0,4.16748-1.86548,4.16748-4.16748Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Maintenace
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/PriceComputation" className="border-radius-50">
                  <span className="span-icon">
                    <svg
                      id="uuid-123364d5-ff3a-4fe6-9baa-8783f1001abc"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 106.47681 131.57696"
                    >
                      <path
                        className="uuid-54238ec0-141f-4fe0-b5dd-ff9ae01b5add"
                        d="M34.49565,49.60604c-8.56763,0-15.53857,6.9707-15.53857,15.53857s6.97095,15.53857,15.53857,15.53857,15.53857-6.9707,15.53857-15.53857-6.9707-15.53857-15.53857-15.53857Zm0,22.74219c-3.97217,0-7.20361-3.23145-7.20361-7.20361s3.23145-7.20361,7.20361-7.20361,7.20361,3.23145,7.20361,7.20361-3.23145,7.20361-7.20361,7.20361Z"
                      />
                      <path
                        className="uuid-54238ec0-141f-4fe0-b5dd-ff9ae01b5add"
                        d="M71.98026,49.60604c-8.56763,0-15.5376,6.9707-15.5376,15.53857s6.96997,15.53857,15.5376,15.53857,15.53857-6.9707,15.53857-15.53857-6.9707-15.53857-15.53857-15.53857Zm0,22.74219c-3.97119,0-7.20264-3.23145-7.20264-7.20361s3.23145-7.20361,7.20264-7.20361c3.97217,0,7.20361,3.23145,7.20361,7.20361s-3.23145,7.20361-7.20361,7.20361Z"
                      />
                      <path
                        className="uuid-54238ec0-141f-4fe0-b5dd-ff9ae01b5add"
                        d="M34.49565,85.41219c-8.56763,0-15.53857,6.97095-15.53857,15.53857s6.97095,15.53857,15.53857,15.53857,15.53857-6.9707,15.53857-15.53857-6.9707-15.53857-15.53857-15.53857Zm0,22.74219c-3.97217,0-7.20361-3.23145-7.20361-7.20361s3.23145-7.20361,7.20361-7.20361,7.20361,3.23145,7.20361,7.20361-3.23145,7.20361-7.20361,7.20361Z"
                      />
                      <path
                        className="uuid-54238ec0-141f-4fe0-b5dd-ff9ae01b5add"
                        d="M71.98026,85.41219c-8.56763,0-15.5376,6.97095-15.5376,15.53857s6.96997,15.53857,15.5376,15.53857,15.53857-6.9707,15.53857-15.53857-6.9707-15.53857-15.53857-15.53857Zm0,22.74219c-3.97119,0-7.20264-3.23145-7.20264-7.20361s3.23145-7.20361,7.20264-7.20361c3.97217,0,7.20361,3.23145,7.20361,7.20361s-3.23145,7.20361-7.20361,7.20361Z"
                      />
                      <path
                        className="uuid-54238ec0-141f-4fe0-b5dd-ff9ae01b5add"
                        d="M95.2808,.00008H11.19535C5.02201,.00008,.00004,5.02206,.00004,11.19686V120.38167C.00004,126.55477,5.02201,131.57699,11.19535,131.57699H95.2808c6.17383,0,11.19604-5.02222,11.19604-11.19531V11.19686C106.47685,5.02206,101.45463,.00008,95.2808,.00008Zm2.86108,120.38159c0,1.57739-1.28369,2.86035-2.86108,2.86035H11.19535c-1.57764,0-2.86035-1.28296-2.86035-2.86035V11.19686c0-1.57739,1.28271-2.86182,2.86035-2.86182H95.2808c1.57739,0,2.86108,1.28442,2.86108,2.86182V120.38167Z"
                      />
                      <path
                        className="uuid-54238ec0-141f-4fe0-b5dd-ff9ae01b5add"
                        d="M78.91606,15.05819H27.56083c-4.7439,0-8.60376,3.8584-8.60376,8.60205v12.31689c0,4.74365,3.85986,8.60352,8.60376,8.60352h51.35522c4.74365,0,8.60278-3.85986,8.60278-8.60352v-12.31689c0-4.74365-3.85913-8.60205-8.60278-8.60205Zm.26782,20.91895c0,.14819-.12036,.26855-.26782,.26855H27.56083c-.14819,0-.2688-.12036-.2688-.26855v-12.31689c0-.14648,.12061-.26709,.2688-.26709h51.35522c.14746,0,.26782,.12061,.26782,.26709v12.31689Z"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">
                    <span className="ml-2 " style={{ display: "inline-grid" }}>
                      <span className="font-size-14 font-weight-600 text-dark">
                        Computation
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        <ul className="logout" style={{ display: "none" }}>
          <div className="logout-li">
            <li>
              <a href="#" onClick={handleOpen}>
                {/* <PowerSettingsNewIcon style={{display:'table-cell'}}/> */}
                <i className="fa ">
                  <SettingsOutlinedIcon />
                </i>
                <span className="nav-text">Setting</span>
              </a>
            </li>
            <li>
              <a href="#">
                {/* <PowerSettingsNewIcon style={{display:'table-cell'}}/> */}
                <i className="fa ">
                  <MoreHorizOutlinedIcon />
                </i>
                <span className="nav-text">More</span>
              </a>
            </li>
            <li>
              <a href="#">
                {/* <PowerSettingsNewIcon style={{display:'table-cell'}}/> */}
                <i className="fa ">
                  <PowerSettingsNewIcon />
                </i>
                <span className="nav-text">Logout</span>
              </a>
            </li>
          </div>
        </ul>
      </nav>
      {modalComponent}
      <Modal
        show={open}
        onHide={() => setOpen(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body className="">
          Build,Review and update role
          <div className="maintableheader bg-white mt-3 border-radius-10">
            <div className="mt-3">
              <RadioGroup
                className="my-3"
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="top"
              >
                <div className="col-md-3 mt-5">
                  <FormControlLabel
                    className="w-100 m-0 mb-3  p-2 card py-4 align-itemscenter border"
                    value="Product expert"
                    control={<Radio color="primary" />}
                    label="Product expert"
                    labelPlacement="bottom"
                  />
                </div>
                <div className="col-md-3 mt-5">
                  <FormControlLabel
                    className="w-100 m-0 mb-3  p-2 card py-4 align-itemscenter border"
                    value="Solution expert"
                    control={<Radio color="primary" />}
                    label="Solution expert"
                    labelPlacement="bottom"
                  />
                </div>
                <div className="col-md-3 mt-5">
                  <FormControlLabel
                    className="w-100 m-0 mb-3  p-2 card py-4 align-itemscenter border"
                    value="Service expert"
                    control={<Radio color="primary" />}
                    label="Service expert"
                    labelPlacement="bottom"
                  />
                </div>
                <div className="col-md-3 mt-5">
                  <FormControlLabel
                    className="w-100 m-0 mb-3  p-2 card py-4 align-itemscenter border"
                    value="End customer"
                    control={<Radio color="primary" />}
                    label="End customer"
                    labelPlacement="bottom"
                  />
                </div>
                <div className="col-md-3 mt-5">
                  <FormControlLabel
                    className="w-100 m-0 mb-3  p-2 card py-4 align-itemscenter border"
                    value="Sales rep"
                    control={<Radio color="primary" />}
                    label="Sales rep"
                    labelPlacement="bottom"
                  />
                </div>
              </RadioGroup>
            </div>
            <div className="row justify-content-center">
              <div className=" col-md-3">
                <a
                  href="#"
                  className="btn border d-block"
                  style={{ borderColor: "#872ff7 !important" }}
                >
                  Build
                </a>
              </div>
              <div className=" col-md-3">
                <a
                  href="/permission"
                  className="btn d-block text-white bg-primary"
                >
                  Review or Update
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* <Modal show={open} onHide={() => setOpen(!open)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body className=" bg-white">
          Build,Review and update roles

        </Modal.Body>
      </Modal> */}
    </div>
  );
}
