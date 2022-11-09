import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import {
  addPartlist,
  builderSearch,
  createBuilder,
} from "services/repairBuilderServices";

export const CommerceProfile = () => {
  const [show, setShow] = React.useState(false);
  const [recentPartlists, setRecentPartlists] = useState([]);
  // Snack Bar State
  const [value, setValue] = React.useState('1');
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [recentBuildersLoading, setRecentBuildersLoading] = useState(false);
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {
    fetcheRecentPartlists();
  }, []);

  const fetcheRecentPartlists = () => {
    setRecentBuildersLoading(true);

    builderSearch(
      `builderType:PARTLIST&pageSize=10&sortColumn=updatedAt&orderBY=DESC`
    )
      .then((result) => {
        setRecentPartlists(result);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while fetching recent partlists");
      });
    setRecentBuildersLoading(false);
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
        <div className="my-3">
                      <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Profile" value="1" />
                                <Tab label="Orders" value="2" />
                              </TabList>
                            </Box>
                            <TabPanel value="1">
                             <div className="card p-4">
                                <div className="d-flex align-items-center">
                                    <div className="" style={{width:"10%", height:"auto", marginRight:"200px"}}>
                                        <img className="profile-img" src="./assets/images/user_profile.png"></img>
                                    </div>
                                    <div style={{marginRight:"200px"}}>
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">USER NAME</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}>Jane Doe</h6>
                                        </div>
                                    </div>
                                    <div style={{marginRight:"200px"}}>
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">EMAIL</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}>Jane Doe</h6>
                                        </div>
                                    </div>
                                    <div style={{marginRight:"300px"}}>
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">PASSWORD</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}>********</h6>
                                        </div>
                                    </div>
                                    <div style={{marginRight:"30px"}}>
                                      <div className="btn bg-primary text-white">Edit</div>
                                    </div>
                                </div>

                             </div>
                             <div className="card" style={{overflow: "hidden"}}>
                                 <div className="bg-primary p-4">
                                      <h5 class="font-weight-500 mb-0 text-white">Account Settings</h5>
                                 </div>
                                 <div className="row p-4">
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">ACCOUNT NO</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}>203045</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">ACCOUNT NAME</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}>L & T Construction</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">CONTACT NO</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}>91-XXXXXXXXXX</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">ALTERNATE CONTACT</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}>91-XXXXXXXXXX</h6>
                                        </div>
                                    </div>
                                 </div>
                             </div>
                             <div className="card" style={{overflow: "hidden"}}>
                                 <div className="bg-primary p-4">
                                      <h5 class="font-weight-500 mb-0 text-white">Account Details</h5>
                                 </div>
                                 <div className="row p-4">
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">CUSTOMER TYPE</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}>Large</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">INDUSTRY</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}>Construction</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <p class="font-size-12 font-weight-500 mb-2">FLEET SIZE</p>
                                            <h6 class="font-weight-600 text-primary" style={{fontSize:"20px"}}> 50 equipment</h6>
                                        </div>
                                    </div>
                                 </div>
                             </div>
                             <div className="Add-new-segment-div p-3 border-radius-10 mb-3 mt-3">
                            <Link className="btn bg-primary text-white mr-3">
                              <span className="mr-2"><AddIcon /></span>Enroll Equipment
                            </Link>
                          </div>
                            </TabPanel>
                            <TabPanel value="2">Item Two</TabPanel>
                          </TabContext>
                      </div>
                      
        </div>
        
      </div>
    </>
  );
};
