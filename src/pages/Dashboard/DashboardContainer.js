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

import { getAllUsers } from "services";

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
    setIsLoading(true);
    getAllUsers()
      .then((res) => {
        console.log("Dashboard > getAllUsers > res=", res);
        setUsers(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("axios err=", err);
        setUsers([]);
        setIsLoading(false);
      });

    return () => {
      console.log("axios cleanup.");
    };
  }, []);

  const NoUserList = <Typography variant="body2">No users found!</Typography>;

  return (
    <div>
      <CommanComponents />
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid mt-3">
          <h5 className="">Operational Dashboard</h5>
          <div className="row mt-4">
            <div className="col-md-4 col-sm-6">
              <div className="card overflow-hidden">
                <div className="activity-div bg-light-pink p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="font-weight-500 text-dark-black mb-0">Activity</h6>
                    <MuiMenuComponent options={activityOptions} />
                  </div>
                </div>
                <div className="p-3">
                  <div className="d-flex justify-content-between ">
                    <div>
                      <p className="font-weight-500 text-violet ">Solution 12920-2</p>
                    </div>
                    <p className="mb-0">5:45PM</p>
                  </div>
                  <div class="span4 collapse-group">
                    <div className="collapse show" id="viewless">
                      <p >Discount has been changed from 797 to 700 for <span className="text-violet">SB12930</span></p>
                      <p>Discount has been changed from 797 to 700 for </p>
                    </div>
                    <a href="#" className="font-size-12" data-toggle="collapse" data-target="#viewless"><span><i class="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span>View less</a>

                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="font-weight-500 text-violet ">Solution 12920-2</p>
                    </div>
                    <p className="mb-0">5:45PM</p>
                  </div>
                  <div class="span4 collapse-group">
                    <div>
                      <p >Discount has been changed from 797 to 700 for </p>
                      <p class="collapse" id="viewmore"> Discount has been changed from 797 to 700 for</p>
                      <a href="#" data-toggle="collapse" data-target="#viewmore"><span><i class="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span>view more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="card overflow-hidden">
                <div className="activity-div bg-light-dark p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="font-weight-500 text-dark-black mb-0">Workflow Tasks</h6>
                    <MuiMenuComponent options={workFlowOptions} />
                  </div>
                </div>
                <div className="p-3">
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className=""><span className="font-weight-500 text-violet">PL456</span> requires your approval</p>
                      </div>
                      <p className="mb-0">5:45PM</p>
                    </div>
                    <div>
                      <a href="#" className="text-dark-black font-weight-500 btn-sm">Approve</a>
                      <a href="#" className="btn-sm">Reject</a>
                      <a href="#" className=" btn-sm">Review</a>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className=""><span className="font-weight-500 text-violet">PL456</span> requires your approval</p>
                      </div>
                      <p className="mb-0">5:45PM</p>
                    </div>
                    <div>
                      <a href="#" className="text-dark-black font-weight-500 btn-sm">Approve</a>
                      <a href="#" className="btn-sm">Reject</a>
                      <a href="#" className=" btn-sm">Review</a>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className=""><span className="font-weight-500 text-violet">PL456</span> requires your approval</p>
                      </div>
                      <p className="mb-0">5:45PM</p>
                    </div>
                    <div>
                      <a href="#" className="text-dark-black font-weight-500 btn-sm">Approve</a>
                      <a href="#" className="btn-sm">Reject</a>
                      <a href="#" className=" btn-sm">Review</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div>
                <Accordion className="Accordion-div">
                  <AccordionSummary className="Accordion-btn"
                    expandIcon={<ExpandMoreIcon sx={{ color: '#54ACA7' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><CottageOutlinedIcon className="home-icon" />Accordion 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="Accordion-div">
                  <AccordionSummary className="Accordion-btn2"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography><CottageOutlinedIcon className="home-icon" />Accordion 2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="Accordion-div" >
                  <AccordionSummary className="Accordion-btn3"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography><CottageOutlinedIcon className="home-icon" />Accordion 3</Typography>
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
          <div className="card overflow-hidden">
            <div className="activity-div bg-light-dark p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="font-weight-500 text-dark-black mb-0">No of transactions</h6>
                <MuiMenuComponent options={transOptions} />
              </div>
            </div>
            <div className="row m-0 mt-4">
              <div className="col-md-6 col-sm-12">
                <div className="card overflow-hidden border p-2">
                  <div class="span4 collapse-group">
                    <div>
                      <a href="#" data-toggle="collapse" data-target="#bysoluction"><span><i class="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span><span className="font-weight-500">By Soluction</span></a>
                      <p class="collapse show" id="bysoluction"> Discount has been changed from 797 to 700 for</p>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="card overflow-hidden border p-2">
                  <div class="span4 collapse-group">
                    <div>
                      <a href="#" data-toggle="collapse" data-target="#bystatus"><span><i class="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span><span className="font-weight-500">By Status</span></a>
                      <p class="collapse show" id="bystatus"> Discount has been changed from 797 to 700 for</p>

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
