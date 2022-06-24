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
import { Chart1, TinyAreaBasic, BubbleChart } from '../Common/index'

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

export const AnalyticsDashboard = () => {
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
                    <h5 className="">Analytics</h5>
                    <div className="row mt-4">
                        <div className="col-md-4 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="activity-div bg-light-dark p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="font-weight-500 text-dark-black mb-0">Total Estimations <b>$</b></h6>
                                        <MuiMenuComponent options={workFlowOptions} />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-6">

                                        </div>
                                        <div className="col-6">
                                            <TinyAreaBasic />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-6">
                            <div className="card overflow-hidden">
                                <div className="activity-div bg-light-green p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="font-weight-500 text-dark-black mb-0">Time To Build</h6>
                                        <MuiMenuComponent options={transOptions} />
                                    </div>
                                </div>
                                <div className="row m-0 mt-4">
                                    <div className="col-md-12 col-sm-12">
                                        <div className="card overflow-hidden border p-2">
                                            <div class="span4 collapse-group">
                                                <div>
                                                    {/* <a href="#" data-toggle="collapse" data-target="#bysoluction"><span><i class="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span><span className="font-weight-500">By Soluction</span></a> */}
                                                    <div class="collapse show" id="bysoluction">
                                                        <Chart1 />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card overflow-hidden">
                        <div className="activity-div bg-light-dark p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="font-weight-500 text-dark-black mb-0">Conversion</h6>
                                <MuiMenuComponent options={transOptions} />
                            </div>
                        </div>
                        <div className="row m-0 mt-4">
                            <div className="col-md-6 col-sm-12">
                                <div className="card overflow-hidden border p-2">
                                    <div class="span4 collapse-group">
                                        <div>
                                            {/* <a href="#" data-toggle="collapse" data-target="#bysoluction"><span><i class="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span><span className="font-weight-500">By Soluction</span></a> */}
                                            <div class="collapse show" id="bysoluction">
                                                {/* <p > Bars represent solutions</p> */}
                                                <BubbleChart />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="card overflow-hidden border p-2">
                                    <div class="span4 collapse-group">
                                        <div>
                                            <a href="#" data-toggle="collapse" data-target="#bystatus"><span><i class="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span><span className="font-weight-500">By Status</span></a>
                                            <div class="collapse show" id="bystatus">
                                                <p > Bars represent solutions</p>
                                            </div>
                                            <Chart1 />
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
