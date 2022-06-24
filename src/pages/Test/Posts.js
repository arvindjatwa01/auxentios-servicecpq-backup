import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { requestData, getTableDataFromJSONObject } from "../../services/TestCommonFunctions";

// import ReactTable from "react-table";
import ReactTable from "react-table-6";
import LoadingSpinner from "./LoadingSpinner.js";
import RecordCount from "./RecordCount.js";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import { ReactTableDefaults } from "react-table-6";
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import shareIcon from '../../assets/icons/svg/share.svg'
import editIcon from '../../assets/icons/svg/edit.svg'

// import "./index.css";
import "react-table-6/react-table.css"

//Set default values of React Table
Object.assign(ReactTableDefaults, {
    multiSort: false,
    LoadingComponent: LoadingSpinner
});

const Posts = (props) => {

    const _isMounted = useRef(false);
    const postTableRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(null);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(null);
    const sort = [{ "id": "id", "desc": false }];

    function getPosts() {

        return requestData(
            " https://jsonplaceholder.typicode.com/posts/" + props.userId,
            {},
            "get"
        );
    }

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

        getPosts()
            .then(res => {
                let dataList = [];
                dataList.push(res.data);
                getTableDataFromJSONObject(dataList, pageSize, page, sorted, "posts")
                    .then(result => {
                        if (_isMounted.current) {
                            setLoading(false);
                            setPages(result.pages === undefined ? 0 : result.pages);
                            setData(result.rows[0].posts);
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
        <React.Fragment>
            <div style={{ textAlign: "center", padding: "15px" }}>
                <div className="card pt-0 border overflow-hidden">
                    <Accordion className="Accordion-div mb-0 custom-accordion">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex pl-3">
                                <h5 className="mr-4 mb-0"><span>Bundle Item</span></h5>
                                <p className="ml-4 mb-0">
                                    <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                                    <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                                </p>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="text-center border-left p-3">
                                    <a href="#" className="p-1 ">+ Add</a>
                                </div>
                                <AccordionSummary className="border-left"
                                    expandIcon={<ExpandMoreIcon sx={{ color: '#54ACA7' }} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography></Typography>
                                </AccordionSummary>
                            </div>
                        </div>
                        <AccordionDetails>
                            <Typography>
                                <ReactTable
                                    ref={postTableRef}
                                    columns={[
                                        {
                                            Header: "Id",
                                            accessor: "id",
                                            width: 70,
                                            headerClassName: "BoldText ColoredText"
                                        },
                                        {
                                            Header: "Title",
                                            accessor: "title",
                                            className: "LeftAlignedText",
                                            headerClassName: "BoldText ColoredText"
                                        },
                                        {
                                            Header: "Body",
                                            accessor: "body",
                                            className: "LeftAlignedText",
                                            headerClassName: "BoldText ColoredText"
                                        },
                                        {
                                            Header: "UserId",
                                            accessor: "userId",
                                            headerClassName: "BoldText ColoredText"
                                        }
                                    ]}
                                    defaultSorted={[
                                        {
                                            id: "id",
                                            desc: false
                                        }
                                    ]}
                                    manual
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
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </React.Fragment>
    );
}

Posts.propTypes = {
    userId: PropTypes.number,
};

export default Posts;