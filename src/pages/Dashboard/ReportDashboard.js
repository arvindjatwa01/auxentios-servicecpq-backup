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
import DataTable from 'react-data-table-component';
import boxicon from '../../assets/icons/png/box.png'
import PartIcons from '../../assets/icons/png/PartIcons.png'

const Actions = () => <><span className="mr-3"><i className="fa fa-eye mr-2"></i>View Details</span><span className="mr-3"><i className="fa fa-edit mr-3"></i>Edit</span><span ><i className="fa fa-ellipsis-v mr-2"></i>More actions</span></>;
const Status = () => <div><span className="mr-3 tableStatusSpan" style={{ display: 'block' }}><i className="fa fa-dot-circle-o mr-2"></i>Pending</span><span className="mr-3 mb-2" style={{ display: 'block', color: '#d6d6d6' }}>Pending by service team</span></div>;


const columns = [
    // {
    //   name: <><div>
    //     <div>
    //     <Checkbox {...label} />
    //   </div>
    //     </div></>,
    //   selector: row => row.title,
    //   sortable: true,
    //   maxWidth: '600px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
    //   cell: row => <CustomTitle row={row} />,
    // },
    {
        name: <><div><img className='mr-2' src={boxicon}></img>Quote</div></>,
        selector: row => row.caseId,
        sortable: true,
        maxWidth: '300px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        cell: row => row.caseId,
    },
    {
        name: <><div>Validity ends
        </div></>,
        selector: row => row.Source,
        wrap: true,
        sortable: true,
        format: row => row.Source,
    },
    {
        name: <><div>Customer
        </div></>,
        selector: row => row.Customer,
        wrap: true,
        sortable: true,
        format: row => row.Customer,
    },
    {
        name: <><div><img className='mr-2' src={boxicon}></img>Status</div></>,
        button: true,
        style: {
            display: 'block',
            textAlign: 'left'
        },
        minWidth: '200px',
        cell: () => <Status>Download Poster</Status>,
    },
    {
        name: <><div>Price
        </div></>,
        selector: row => row.Reason,
        wrap: true,
        sortable: true,
        format: row => row.Reason,
    },
    {
        name: 'Actions',
        button: true,
        minWidth: '300px',
        cell: () => <Actions>Download Poster</Actions>,
    },
];
const data = [
    {
        id: 0,
        caseId: "QT345",
        requester: 'amohanty',
        Source: '10 days',
        Customer: 'Hindalco',
        Reason: '$10',
        Progress: 'Pending',
        Status: 'Open',
        Consistencystatus: 'Inconsistent',
        Description: 'Solution for model 797F',
        posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
        year: '1988',
    },
    {
        id: 1,
        caseId: "QT345",
        requester: 'amohanty',
        Source: '10 days',
        Customer: 'Hindalco',
        Reason: '$10',
        Progress: 'Pending',
        Status: 'Open',
        Consistencystatus: 'Inconsistent',
        Description: 'Solution for model 797F',
        posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
        year: '1988',
    },
    {
        id: 2,
        caseId: "QT345",
        requester: 'amohanty',
        Source: '10 days',
        Customer: 'Hindalco',
        Reason: '$10',
        Progress: 'Pending',
        Status: 'Open',
        Consistencystatus: 'Inconsistent',
        Description: 'Solution for model 797F',
        posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
        year: '1988',
    },
    {
        id: 3,
        caseId: "QT345",
        requester: 'amohanty',
        Source: '10 days',
        Customer: 'Hindalco',
        Reason: '$10',
        Progress: 'Pending',
        Status: 'Open',
        Consistencystatus: 'Inconsistent',
        Description: 'Solution for model 797F',
        posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
        year: '1988',
    }
]

const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            // backgroundColor: "#000"
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};
var HTMLLi = React.createElement('li', { className: 'bar' }, 'foo');


export const ReportDashboard = () => {
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
                    <h5 className="">Reports</h5>
                    <div className="card overflow-hidden">
                        <div className="activity-div bg-light-dark p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="font-weight-500 text-dark-black mb-0">Filter Criteria</h6>
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
                    <div className="card overflow-hidden">
                        <div className="activity-div bg-white p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="font-weight-500 text-dark-black mb-0">Report type</h6>
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="custom-table card " style={{ height: 400, width: '100%', borderRadius: '0px' }}>
                                <DataTable title="" dense selectableRows columns={columns} data={data} customStyles={customStyles} pagination />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
