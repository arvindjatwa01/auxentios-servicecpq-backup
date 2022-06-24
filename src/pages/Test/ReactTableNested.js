import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CommanComponents } from "../../components/index"
import ReactTable from "react-table-6";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from 'react-select';
import LoadingSpinner from "./LoadingSpinner.js";
import RecordCount from "./RecordCount.js";
import { requestData, getTableDataFromJSONObject } from "../../services/TestCommonFunctions";
import Posts from "./Posts.js";
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import shareIcon from '../../assets/icons/svg/share.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
export function ReactTableNested() {
    const _isMounted = useRef(false);
    const userTableRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(null);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(null);
    const sort = [{ "id": "id", "desc": false }];

    function getUsers() {
        return requestData(
            "https://jsonplaceholder.typicode.com/users",
            {},
            "get"
        );
    }
    const [age, setAge] = React.useState('5');
    const handleChangedrop = (event) => {
        setAge(event.target.value);
    };
    useEffect(() => {

        _isMounted.current = true;
        fetchData();

        return () => {
            _isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData(state) {

        let pageSize = state === undefined ? 5 : state.pageSize;
        let page = state === undefined ? 0 : state.page;
        let sorted = state === undefined ? sort : state.sorted;
        setLoading(true);

        getUsers()
            .then(res => {
                getTableDataFromJSONObject(res.data, pageSize, page, sorted, "users")
                    .then(result => {
                        if (_isMounted.current) {
                            setLoading(false);
                            setPages(result.pages === undefined ? 0 : result.pages);
                            setData(result.rows[0].users);
                            setTotalRecords(result.totalRecords);
                        }
                    })
                    .catch(error => {
                        console.warn(error);
                        if (_isMounted.current) {
                            setLoading(false);
                        }
                    });
            })
            .catch(error => {
                console.warn(error);
                if (_isMounted.current) {
                    setLoading(false);
                }
            });
    }

    return (
        <>
            {/* <CommanComponents /> */}
            {/* <div className="content-body" style={{ minHeight: '884px' }}>
                <div className="container-fluid ">
                    <div className="card mt-5 pt-0"> */}
            <div className="row align-items-center">
                <div className="col-3">
                    <div className="d-flex pl-3">
                        <h5 className="mr-4 mb-0"><span>Bundle Item</span></h5>
                        <p className="ml-4 mb-0">
                            <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                            <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                        </p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex align-items-center" style={{ background: '#F9F9F9', padding: '10px 15px', borderRadius: '10px' }}>
                        <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                            <img src={searchstatusIcon}></img>
                        </div>
                        <div className="w-100 mx-2">
                            <div className="machine-drop d-flex align-items-center">
                                {/* <div><lable className="label-div">Search By</lable></div> */}
                                <FormControl className="" sx={{ m: 1, }}>
                                    <Select
                                        placeholder="Search By"
                                        id="demo-simple-select-autowidth"
                                        value={age}
                                        onChange={handleChangedrop}
                                        autoWidth
                                    >
                                        <MenuItem value="5">
                                            <em>Engine</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Twenty</MenuItem>
                                        <MenuItem value={21}>Twenty one</MenuItem>
                                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="col-3">
                    <div className="d-flex align-items-center">
                        <div className="col-8 text-center">
                            <a href="#" className="p-1 more-btn">+ 3 more
                                <span className="c-btn">C</span>
                                <span className="b-btn">B</span>
                                <span className="a-btn">A</span>
                            </a>
                        </div>
                        <div className="col-4 text-center border-left py-4">
                            <a href="#" className="p-1 ">+ Add Part</a>
                        </div>
                    </div>
                </div>
            </div>
            <React.Fragment>
                <div className="maltipaltablecustom" style={{ textAlign: "center", }}>
                    <ReactTable
                        ref={userTableRef}
                        columns={[
                            {
                                Header: "Id",
                                accessor: "id",
                                width: 70,
                                headerClassName: "BoldText ColoredText"
                            },
                            {
                                Header: "Email",
                                accessor: "email",
                                className: "LeftAlignedText",
                                headerClassName: "BoldText ColoredText"
                            },
                            {
                                Header: "Name",
                                accessor: "name",
                                className: "LeftAlignedText",
                                headerClassName: "BoldText ColoredText"
                            },
                            {
                                Header: "Username",
                                accessor: "username",
                                className: "LeftAlignedText",
                                headerClassName: "BoldText ColoredText"
                            }
                        ]}
                        defaultSorted={[
                            {
                                id: "id",
                                desc: false
                            }
                        ]}
                        // manual
                        data={data}
                        pages={pages}
                        loading={loading}
                        onFetchData={fetchData}
                        defaultPageSize={5}
                        className="-striped -highlight"
                        SubComponent={row => {
                            return (
                                <div style={{ padding: "10px" }}>
                                    <Posts
                                        userId={row.original.id}
                                    />
                                </div>
                            );
                        }}
                    >
                        {(state, makeTable) => {
                            return (
                                <RecordCount
                                    state={state}
                                    makeTable={makeTable}
                                    totalRecords={totalRecords}
                                />
                            );
                        }}
                    </ReactTable>
                </div>
            </React.Fragment>
            {/* </div>
                </div>
            </div> */}
            <ToastContainer />
        </>

    )
}
