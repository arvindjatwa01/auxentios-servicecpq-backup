import React, { useEffect, useState } from "react";
import { DashboardView } from "./DashboardView";
import { Link } from "react-router-dom";
import { ROOT } from "navigation/CONSTANTS";
import { UserList } from "./UserList";
import { CommanComponents } from "../../components/index"
import { MuiMenuComponent } from "../Operational/index"
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Chart1 } from '../Common/index'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { getAllUsers } from "services";
import { ChartReact } from "./ChartReact";

const activityOptions = [
  'None',
  'Atria',
  'Callisto'
];
const workFlowOptions = [
  'None',
  'Atria'
];
const transOptions = [
  'Test1',
  'Test2',
  'Test3',
  'Test4'
];

export const DashboardContainer = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    // getAllUsers()
    //   .then((res) => {
    //     console.log("Dashboard > getAllUsers > res=", res);
    //     setUsers(res);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log("axios err=", err);
    //     setUsers([]);
    //     setIsLoading(false);
    //   });

    // return () => {
    //   console.log("axios cleanup.");
    // };
  }, []);

  const NoUserList = <Typography variant="body2">No users found!</Typography>;

  return (
    <div>
      {/* <CommanComponents /> */}
      <div className="content-body bg-white" style={{ minHeight: '884px' }}>
        <div className="container-fluid p-32-60 mt-3">
          <h5 className="">Operational Dashboard</h5>
          <div className="row mt-4">
            <div className="col-md-6 col-sm-6">
              <div className="card overflow-hidden border" style={{ height: "400px" }}>
                <div className="activity-div p-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="font-weight-600 font-size-16 text-dark-black mb-0"><span className="mr-2"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#34DBD6" width="24px" viewBox="0 0 114.4347 70.16077"><path className="cls-1" d="M70.09505,70.16077c-.04851,0-.097-.00157-.14552-.00313a4.4304,4.4304,0,0,1-4.06985-2.98237L47.41278,14.92905,33.10961,53.87353a4.46456,4.46456,0,0,1-7.94881.86842L15.74428,39.96311,4.0057,39.816a4.0057,4.0057,0,0,1,0-8.0114H15.47984a8.28542,8.28542,0,0,1,7.02093,3.85392l5.55947,8.72492,15.22792-41.459A4.47271,4.47271,0,0,1,47.47849,0h.025A4.47348,4.47348,0,0,1,51.686,2.97767L70.39078,55.89829,85.29324,20.7561a4.47242,4.47242,0,0,1,4.001-2.7195A4.34362,4.34362,0,0,1,93.422,20.55894l5.64084,11.67755L110.429,32.31a4.0057,4.0057,0,1,1,0,8.0114H99.18019a8.184,8.184,0,0,1-7.33075-4.6003l-2.23756-4.63-15.41255,36.347A4.43114,4.43114,0,0,1,70.09505,70.16077Zm3.336-5.66275.00626.01722ZM50.8098,5.68152l-.00313.00939Z" /></svg></span>Activity</h6>
                    <MuiMenuComponent options={activityOptions} />
                  </div>
                </div>
                <div className="p-4">
                  <div className="d-flex justify-content-between ">
                    <div>
                      <p className="font-weight-600" style={{ color: "#34DBD6" }}>Solution 12920-2</p>
                    </div>
                    <p className="mb-0">5:45PM</p>
                  </div>
                  <div className="span4 collapse-group">
                    <div className="collapse show" id="viewless">
                      <p >Discount has been changed from 797 to 700 for <span>SB12930</span></p>
                      <p>Discount has been changed from 797 to 700 for </p>
                    </div>
                    <a className="font-size-12" href="#" data-toggle="collapse" data-target="#viewmore">View less<span><i className="fa fa-angle-right f-s-16 ml-2" aria-hidden="true"></i></span></a>

                  </div>
                  <hr />
                  <div className="d-flex justify-content-between ">
                    <div>
                      <p className="font-weight-600" style={{ color: "#34DBD6" }}>Solution 12920-2</p>
                    </div>
                    <p className="mb-0">5:45PM</p>
                  </div>
                  <div className="span4 collapse-group">
                    <div className="collapse show" id="viewless">
                      <p >Discount has been changed from 797 to 700 for <span>SB12930</span></p>
                      <p>Discount has been changed from 797 to 700 for </p>
                    </div>
                    <a className="font-size-12" href="#" data-toggle="collapse" data-target="#viewmore">View less<span><i className="fa fa-angle-right f-s-16 ml-2" aria-hidden="true"></i></span></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="card overflow-hidden border" style={{ height: "400px" }}>
                <div className="activity-div p-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="font-weight-600 text-dark-black font-size-16 mb-0"><svg className="mr-2" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#FF86AB" width="21px" viewBox="0 0 112.91406 112.91382"><path className="cls-1" d="M8.62012,32.645h3.69751V68.06885a4.00574,4.00574,0,0,0,8.01147,0V32.645h3.6958A8.62923,8.62923,0,0,0,32.645,24.0249V8.62012A8.62923,8.62923,0,0,0,24.0249,0H8.62012A8.62938,8.62938,0,0,0,0,8.62012V24.0249A8.62938,8.62938,0,0,0,8.62012,32.645ZM8.01147,8.62012a.61033.61033,0,0,1,.60865-.60865H24.0249a.61017.61017,0,0,1,.60864.60865V24.0249a.61032.61032,0,0,1-.60864.60864H8.62012a.61048.61048,0,0,1-.60865-.60864Z" /><path className="cls-1" d="M104.294,0H88.88916A8.62923,8.62923,0,0,0,80.269,8.62012v3.6958H44.84521a4.00574,4.00574,0,1,0,0,8.01147H80.269V24.0249A8.62923,8.62923,0,0,0,88.88916,32.645H104.294a8.62938,8.62938,0,0,0,8.62011-8.62012V8.62012A8.62938,8.62938,0,0,0,104.294,0Zm.60864,24.0249a.61048.61048,0,0,1-.60864.60864H88.88916a.61032.61032,0,0,1-.60864-.60864V8.62012a.61017.61017,0,0,1,.60864-.60865H104.294a.61033.61033,0,0,1,.60864.60865Z" /><path className="cls-1" d="M104.294,80.269h-3.69751V44.84521a4.00574,4.00574,0,1,0-8.01148,0V80.269h-3.6958A8.62907,8.62907,0,0,0,80.269,88.88916v15.40308a8.63048,8.63048,0,0,0,8.62012,8.62158H104.294a8.63063,8.63063,0,0,0,8.62011-8.62158V88.88916A8.62922,8.62922,0,0,0,104.294,80.269Zm.60864,24.0232a.61063.61063,0,0,1-.60864.6101H88.88916a.61047.61047,0,0,1-.60864-.6101V88.88916a.61037.61037,0,0,1,.60864-.60889H104.294a.61054.61054,0,0,1,.60864.60889Z" /><path className="cls-1" d="M68.06885,92.585H32.645v-3.6958A8.62907,8.62907,0,0,0,24.0249,80.269H8.62012A8.62922,8.62922,0,0,0,0,88.88916v15.40308a8.63063,8.63063,0,0,0,8.62012,8.62158H24.0249a8.63048,8.63048,0,0,0,8.62012-8.62158v-3.696H68.06885a4.00562,4.00562,0,1,0,0-8.01123ZM24.63354,104.29224a.61047.61047,0,0,1-.60864.6101H8.62012a.61063.61063,0,0,1-.60865-.6101V88.88916a.61054.61054,0,0,1,.60865-.60889H24.0249a.61037.61037,0,0,1,.60864.60889Z" /><path className="cls-1" d="M70.97461,36.68506H41.94092a4.00574,4.00574,0,0,0,0,8.01147H70.97461a4.00574,4.00574,0,0,0,0-8.01147Z" /><path className="cls-1" d="M70.97461,52.45117H41.94092a4.00574,4.00574,0,0,0,0,8.01148H70.97461a4.00574,4.00574,0,0,0,0-8.01148Z" /><path className="cls-1" d="M70.97461,68.21729H41.94092a4.00574,4.00574,0,0,0,0,8.01147H70.97461a4.00574,4.00574,0,0,0,0-8.01147Z" /></svg>
                      Workflow Tasks</h6>
                    <MuiMenuComponent options={workFlowOptions} />
                  </div>
                </div>
                <div className="p-4">
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="font-weight-600"><span className="font-weight-600" style={{ color: "#FF86AB" }}>Solution 12920-2</span> requires your approval</p>
                      </div>
                      <p className="mb-0">5:45PM</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <a href="#" className="btn bg-white border">Review</a>
                      </div>
                      <div className="d-flex">
                        <a href="#" className="mr-2 text-green font-weight-500">
                          <CheckCircleOutlinedIcon style={{ fontSize: "40px" }} />
                        </a>
                        <a href="#" className="text-danger font-weight-500">
                          <CancelOutlinedIcon style={{ fontSize: "40px" }} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="font-weight-600"><span className="font-weight-600" style={{ color: "#FF86AB" }}>Solution 12920-2</span> requires your approval</p>
                      </div>
                      <p className="mb-0">5:45PM</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <a href="#" className="btn bg-white border">Review</a>
                      </div>
                      <div className="d-flex">
                        <a href="#" className="mr-2 text-green font-weight-500">
                          <CheckCircleOutlinedIcon style={{ fontSize: "40px" }} />
                        </a>
                        <a href="#" className="text-danger font-weight-500">
                          <CancelOutlinedIcon style={{ fontSize: "40px" }} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="font-weight-600"><span className="font-weight-600" style={{ color: "#FF86AB" }}>Solution 12920-2</span> requires your approval</p>
                      </div>
                      <p className="mb-0">5:45PM</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <a href="#" className="btn bg-white border">Review</a>
                      </div>
                      <div className="d-flex">
                        <a href="#" className="mr-2 text-green font-weight-500">
                          <CheckCircleOutlinedIcon style={{ fontSize: "40px" }} />
                        </a>
                        <a href="#" className="text-danger font-weight-500">
                          <CancelOutlinedIcon style={{ fontSize: "40px" }} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col-md-4 col-sm-4">
              <div>
                <Accordion className="Accordion-div bg-white" onClick={() => window.location.href = "/workList"}>
                  <AccordionSummary className="Accordion-btn"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><svg className="mr-2 font-weight-600" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#00b5aa" width="14px" viewBox="0 0 93.21387 95.28394"><path className="cls-1" d="M82.88513,0H10.32721A10.33935,10.33935,0,0,0,0,10.32715V84.95679A10.33935,10.33935,0,0,0,10.32721,95.28394H82.88513A10.33963,10.33963,0,0,0,93.21387,84.95679V10.32715A10.33963,10.33963,0,0,0,82.88513,0Zm2.31738,84.95679a2.31879,2.31879,0,0,1-2.31738,2.31567H10.32721a2.31846,2.31846,0,0,1-2.3158-2.31567V10.32715a2.31857,2.31857,0,0,1,2.3158-2.3158H82.88513a2.3189,2.3189,0,0,1,2.31738,2.3158Z" /><path className="cls-1" d="M71.53149,21.17847H43.36017a4.00574,4.00574,0,1,0,0,8.01147H71.53149a4.00574,4.00574,0,0,0,0-8.01147Z" /><circle className="cls-1" cx="27.16125" cy="25.18396" r="5.47983" /><path className="cls-1" d="M71.53149,43.6355H43.36017a4.00568,4.00568,0,1,0,0,8.01135H71.53149a4.00568,4.00568,0,1,0,0-8.01135Z" /><path className="cls-1" d="M27.16125,42.162a5.4798,5.4798,0,1,0,5.4798,5.47986A5.47986,5.47986,0,0,0,27.16125,42.162Z" /><path className="cls-1" d="M71.53149,66.094H43.36017a4.00568,4.00568,0,1,0,0,8.01136H71.53149a4.00568,4.00568,0,1,0,0-8.01136Z" /><path className="cls-1" d="M27.16125,64.61987a5.4798,5.4798,0,1,0,5.4798,5.47974A5.47976,5.47976,0,0,0,27.16125,64.61987Z" /></svg>
                      Work List</Typography>
                  </AccordionSummary>
                  {/* <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails> */}
                </Accordion>
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div>
                <Accordion className="Accordion-div">
                  <AccordionSummary className="Accordion-btn2"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>
                      <svg className="mr-2" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#147CBE" width="14px" viewBox="0 0 93.21387 105.74373"><path className="cls-1" d="M60.36572,22.51,41.28369,41.5918l-8.437-8.43531a4.00527,4.00527,0,0,0-5.66431,5.66431L41.28369,52.92041l24.7461-24.74609A4.00519,4.00519,0,0,0,60.36572,22.51Z" /><path className="cls-1" d="M85.30737,0H7.905A7.91455,7.91455,0,0,0,0,7.90649V97.825a7.83534,7.83534,0,0,0,4.5376,7.15234,7.83521,7.83521,0,0,0,8.40112-1.05761l33.60083-27.863L80.272,103.918a7.905,7.905,0,0,0,12.9419-6.093V7.90649A7.916,7.916,0,0,0,85.30737,0ZM51.64209,69.88062a7.91174,7.91174,0,0,0-10.06885-.00171L8.01147,97.825,7.905,8.01123l77.29736-.10474.18482,89.845Z" /></svg>
                      Saved Tasks</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div>
                <Accordion className="Accordion-div" >
                  <AccordionSummary className="Accordion-btn3"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>
                      <svg className="mr-2" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#9226ff" width="14px" viewBox="0 0 97.30566 125.99805"><path className="cls-1" d="M69.63965,91.89331H27.66748a4.00574,4.00574,0,1,0,0,8.01148H69.63965a4.00574,4.00574,0,1,0,0-8.01148Z" /><path className="cls-1" d="M69.63965,48.02612H27.66748a4.00574,4.00574,0,1,0,0,8.01148H69.63965a4.00574,4.00574,0,1,0,0-8.01148Z" /><path className="cls-1" d="M69.63965,26.09326H27.66748a4.00574,4.00574,0,1,0,0,8.01148H69.63965a4.00574,4.00574,0,1,0,0-8.01148Z" /><path className="cls-1" d="M69.63965,69.959H27.66748a4.00562,4.00562,0,1,0,0,8.01123H69.63965a4.00562,4.00562,0,1,0,0-8.01123Z" /><path className="cls-1" d="M87.76538,0H9.54A9.5504,9.5504,0,0,0,0,9.53857V116.458a9.55071,9.55071,0,0,0,9.54,9.54H87.76538a9.55076,9.55076,0,0,0,9.54028-9.54V9.53857A9.55045,9.55045,0,0,0,87.76538,0Zm1.52881,116.458a1.52982,1.52982,0,0,1-1.52881,1.52856H9.54A1.53,1.53,0,0,1,8.01123,116.458V9.53857A1.52968,1.52968,0,0,1,9.54,8.01147H87.76538a1.52952,1.52952,0,0,1,1.52881,1.5271Z" /></svg>
                      Items to review</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="card overflow-hidden border">
            <div className="activity-div bg-white border-bottom p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="font-weight-500 font-size-16 text-dark-black mb-0 d-flex align-items-center"><span className="mr-2"><NotificationsNoneOutlinedIcon style={{ fontSize: "35px", color: "B2EAE8" }} /></span>No of transactions</h6>
                <MuiMenuComponent options={transOptions} />
              </div>
            </div>
            <div className="row m-0 mt-4">
              <div className="col-md-6 col-sm-12">
                <div className="card overflow-hidden border p-2">
                  <div className="span4 collapse-group">
                    <div>
                      <a href="#" data-toggle="collapse" data-target="#bysoluction"><span><i className="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span><span className="font-weight-500">By Solution</span></a>
                      <div className="collapse show" id="bysoluction">
                        {/* <p > Bars represent solutions</p> */}
                        {/* <Chart1 /> */}
                        <ChartReact />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="card overflow-hidden border p-2">
                  <div className="span4 collapse-group">
                    <div>
                      <a href="#" data-toggle="collapse" data-target="#bystatus"><span><i className="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span><span className="font-weight-500">By Status</span></a>
                      <div className="collapse show" id="bystatus">
                        {/* <p > Bars represent solutions</p> */}
                        {/* <Chart1 /> */}
                        <ChartReact />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

