import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SOLUTION_BUILDER_SERVICE_PORTFOLIO } from '../../navigation/CONSTANTS'
import { SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO } from '../../navigation/CONSTANTS'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Link } from 'react-router-dom'
import TabPanel from '@mui/lab/TabPanel';
// import Select from '@mui/material/Select';


import DataTable from "react-data-table-component";
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Buttonarrow from '../../assets/icons/svg/Button-arrow.svg'
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAllPortfolios } from '../../services/index'
import { useHistory } from 'react-router-dom';


const colourOptions = [
    {
        "value": 1,
        "label": "Portfolio Solution"
    },
    {
        "value": 2,
        "label": "Custom Search"
    }
]


const customStyles = {
    rows: {
        style: {
            minHeight: "72px", // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: "8px", // override the cell padding for head cells
            paddingRight: "8px",
            backgroundColor: "#872ff7",
            color: "#fff",
        },
    },
    cells: {
        style: {
            paddingLeft: "8px", // override the cell padding for data cells
            paddingRight: "8px",
        },
    },
};

const animatedComponents = makeAnimated();

export function SolutionSelector(props) {

    const [value, setValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [searchByVisible, setSearchByVisible] = React.useState(false);
    const [buildEnable, setBuildEnable] = React.useState(true);
    const [searchOptions, setSearchOptions] = React.useState(null);

    const [selectTypeOfSolution, setSelectTypeOfSolution] = useState(-1)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [flagIs, setFlagIs] = useState(false);

    const [age, setAge] = React.useState('5');
    const [age1, setAge1] = React.useState('5');
    const [age2, setAge2] = React.useState('5');

    const [activeStep, setActiveStep] = useState(1)

    const [loadingItem, setLoadingItem] = useState("")
    const [rowData, setRowData] = useState([])
    const [portfolioSolutionData, setPortfolioSolutionData] = useState([]);
    const [portfolioSolutionFilteredData, setPortfolioSolutionFilteredData] = useState([])
    const [rows1, setRows1] = useState([])

    const [solutionValue, setSolutionValue] = useState(0)

    const handleStep = (step) => {
        setActiveStep(step);
    };

    const handleChangedrop = (event) => {
        setAge(event.target.value);
    };
    const handleChangedrop1 = (event) => {
        setAge1(event.target.value);
    };
    const handleChangedrop2 = (event) => {
        setAge2(event.target.value);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const columns = [
        { field: 'GroupNumber', headerName: 'Type Reman', flex: 1, width: 70 },
        // { field: 'Type', headerName: 'Type',  flex:1, width: 130 },
        { field: 'Partnumber', headerName: 'PARTLIST Pngine Partlist', flex: 1, width: 130 },
        { field: 'PriceExtended', headerName: 'PRICE $2,000', flex: 1, width: 130 },
        { field: 'Pricecurrency', headerName: 'STATUS ', flex: 1, width: 130 },
        { field: 'Usage', headerName: 'View details', flex: 1, width: 130 },
        { field: 'TotalPrice', headerName: 'More actions', flex: 1, width: 130 },
        // { field: 'Comments', headerName: 'Comments',  flex:1, width: 130 },
        // { field: 'Actions', headerName: 'Actions',  flex:1, width: 130 },

    ];

    const columns1 = [
        { field: 'portfolioId', headerName: 'Id', flex: 1, width: 70 },
        { field: 'description', headerName: 'Description', flex: 1, width: 130 },
        { field: 'usageCategory', headerName: 'Category', flex: 1, width: 130 },
        { field: 'strategyTask', headerName: 'Strategy ', flex: 1, width: 130 },
        { field: 'taskType', headerName: 'Task Type', flex: 1, width: 130 },
        { field: 'TotalPrice', headerName: 'More actions', flex: 1, width: 130 },
    ]

    const columns4 = [
        {
            name: (
                <>
                    <div>Select</div>
                </>
            ),
            selector: (row) => row.check1,
            wrap: true,
            sortable: true,
            // format: (row) => row.portfolioId,
            cell: (row) => (
                <Checkbox
                    className="text-black"
                    checked={row.check1}
                    onChange={(e) => handleCheckboxData(e, row)}
                />
            ),
        },
        {
            name: (
                <>
                    <div>Description</div>
                </>
            ),
            selector: (row) => row.description,
            wrap: true,
            sortable: true,
            format: (row) => row.description,
        },
        {
            name: (
                <>
                    <div>Category</div>
                </>
            ),
            selector: (row) => row.usageCategory,
            wrap: true,
            sortable: true,
            format: (row) => row.usageCategory,
        },
        {
            name: (
                <>
                    <div>Strategy</div>
                </>
            ),
            selector: (row) => row.strategyTask,
            wrap: true,
            sortable: true,
            format: (row) => row.strategyTask,
        },
        {
            name: (
                <>
                    <div>Task Type</div>
                </>
            ),
            selector: (row) => row.taskType,
            wrap: true,
            sortable: true,
            format: (row) => row.taskType,
        },
        {
            name: (
                <>
                    <div>More actions</div>
                </>
            ),
            selector: (row) => row.location,
            wrap: true,
            sortable: true,
            format: (row) => "Inconsistent",
        },
    ];






    const rows = [
        {
            id: 1,
            GroupNumber: 'Snow',
            Type: 'Jon',
            Partnumber: 35,
            PriceExtended: 'pending',
            Pricecurrency: 'Open',
            Usage: 'Inconsistent',
            TotalPrice: 'Inconsistent',
            Comments: 'Inconsistent',
            Actions: 'Inconsistent',
        },
        {
            id: 2,
            GroupNumber: 'Lannister',
            Type: 'Cersei',
            Partnumber: 42,
            PriceExtended: 'pending',
            Pricecurrency: 'Open',
            Usage: 'Consistent',
            TotalPrice: 'Inconsistent',
            Comments: 'Inconsistent',
            Actions: 'Inconsistent',
        },
        {
            id: 3,
            GroupNumber: 'Lannister',
            Type: 'Jaime',
            Partnumber: 45,
            PriceExtended: 'pending',
            Pricecurrency: 'Open',
            Usage: 'Consistent',
            TotalPrice: 'Inconsistent',
            Comments: 'Inconsistent',
            Actions: 'Inconsistent',
        },

    ];
    const steps = [
        '',
        '',
        '',
    ];
    let history = useHistory()

    const handleCheckboxData = (e, row) => {
        if (e.target.checked) {
            var _portfolioSolutionData = [...portfolioSolutionData];

            const updated = _portfolioSolutionData.map((currentItem, i) => {
                if (row.portfolioId == currentItem.portfolioId) {
                    return { ...currentItem, ["check1"]: e.target.checked };
                } else return currentItem;
            });

            setPortfolioSolutionData([...updated]);

            const isFound = portfolioSolutionFilteredData.some((element) => {
                if (element.portfolioId === row.portfolioId) {
                    return true;
                }

                return false;
            });

            if (!isFound) {
                const _portfolioSolutionFilteredData = [...portfolioSolutionFilteredData, { ...row }];
                const updatedItems = _portfolioSolutionFilteredData.map((currentItem, i) => {
                    return {
                        ...currentItem
                    };
                });
                setPortfolioSolutionFilteredData(updatedItems);
                // setFilterMasterData([...filterMasterData, { ...row }])
            }
        } else {
            var _portfolioSolutionData = [...portfolioSolutionData];
            const updated1 = _portfolioSolutionData.map((currentItem, i) => {
                if (row.portfolioId == currentItem.portfolioId) {
                    return { ...currentItem, ["check1"]: e.target.checked };
                } else return currentItem;
            });
            setPortfolioSolutionData([...updated1]);
            var _portfolioSolutionFilteredData = [...portfolioSolutionFilteredData];
            const updated = _portfolioSolutionFilteredData.filter((currentItem, i) => {
                if (row.portfolioId !== currentItem.portfolioId) return currentItem;
            });
            setPortfolioSolutionFilteredData(updated);
        }

    };

    useEffect(() => {
        if (portfolioSolutionData.some((portfolioSolutionDataItem) => portfolioSolutionDataItem.check1 === true)) {
            setFlagIs(true);
        } else {
            setFlagIs(false);
        }
    }, [portfolioSolutionData]);


    const handleSearch = (e) => {
        if (e.value == 2) {
            setBuildEnable(false)
            setSearchByVisible(false)
            setLoadingItem("")
        } else {
            setBuildEnable(true)
            setSearchByVisible(true)
            setLoadingItem("01")
            //API CALL
            const portfoliosData = getAllPortfolios()
            setTimeout(() => {
                // console.log('This will run after 1 second!')
                console.log("portfoliosData is : ", portfoliosData)
                portfoliosData.then(function (result) {
                    setPortfolioSolutionData(result);
                    result.map((data, x) => {
                        setRows1([...rows1, {
                            id: x,
                            portfolioId: data.portfolioId,
                            Type: 'Jon',
                            description: data.description,
                            usageCategory: data.usageCategory,
                            strategyTask: data.strategyTask,
                            taskType: data.taskType,
                            TotalPrice: 'Inconsistent',
                            Comments: 'Inconsistent',
                            Actions: 'Inconsistent',
                        }])
                    });
                })
                setLoadingItem("")
            }, 500);
            // portfolioSolutionData.map((data, x) => {
            //     console.log("x is : ",x)
            //     var rowwData = {
            //         id: x,
            //         portfolioId: data.portfolioId,
            //         Type: 'Jon',
            //         description: data.description,
            //         usageCategory: data.usageCategory,
            //         strategyTask: data.strategyTask,
            //         taskType: data.taskType,
            //         TotalPrice: 'Inconsistent',
            //         Comments: 'Inconsistent',
            //         Actions: 'Inconsistent',
            //     };
            //     setRows1([...rows1, rowwData])
            // });

        }



        // console.log("my RowData : ", portfolioSolutionData)
        setSearchOptions(e)
    }

    // console.log("Row data is : ", portfolioSolutionData)

    const handleTypeOfSolution = (e) => {
        setSelectTypeOfSolution(e.target.value)
        console.log("valll ", e.target.value)
        console.log("typeee ", typeof e.target.value)
        if (e.target.value === "1") {
            setSolutionValue(1)
        } else {
            setSolutionValue(0)
        }

    }



    const HandleNextStepClick = () => {
        if (solutionValue == 1) {
            setActiveStep(2)
        } else {
            // alert("Portfolio ?")
            history.push('/portfolio/new');
        }
    }




    useEffect(() => {
        setSelectTypeOfSolution(props.defaultValue)
        if (props.defaultValue == 0) {
            setSolutionValue(0)
        } else {
            setSolutionValue(1)
        }
    }, [props.defaultValue]);

    // useEffect(() => {
    //     setTimeout(() => {

    //         portfolioSolutionData.map((result, i) => {
    //             rows1.push(result.portfolioId)
    //             console.log("portfolioId : ", result.portfolioId)
    //             // rows1.push({
    //             //     id: i,
    //             //     portfolioId: result.portfolioId,
    //             //     Type: 'Jon',
    //             //     description: result.description,
    //             //     usageCategory: result.usageCategory,
    //             //     strategyTask: result.strategyTask,
    //             //     taskType: result.taskType,
    //             //     TotalPrice: 'Inconsistent',
    //             //     Comments: 'Inconsistent',
    //             //     Actions: 'Inconsistent',
    //             // })
    //             // rows1.push({
    //             //     id: 10,
    //             //     portfolioId: result.portfolioId,
    //             //     Type: 'Jon',
    //             //     description: 35,
    //             //     usageCategory: 'pending',
    //             //     strategyTask: 'Open',
    //             //     taskType: 'Inconsistent',
    //             //     TotalPrice: 'Inconsistent',
    //             //     Comments: 'Inconsistent',
    //             //     Actions: 'Inconsistent',
    //             // })
    //         })
    //     }, 500)
    // }, [portfolioSolutionData])

    // console.log("row1 : ", rows1)

    console.log("active step : ", activeStep)
    console.log("solution value : ", solutionValue)
    console.log("default value : ", props.defaultValue)

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index}  /* onClick={() => handleStep(index)} */ >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <hr />
            <div className='p-3'>
                {activeStep == 1 ?
                    <div>
                        <h5 className='text-black'>Do you want create a new solution or use an existing one?</h5>
                        <RadioGroup className='my-3'
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                            value={selectTypeOfSolution}
                            onChange={handleTypeOfSolution}
                        >

                            <FormControlLabel
                                className="col-md-6 m-0 card py-4 align-itemsstart"
                                value="0"
                                control={<Radio />}
                                label="Portfolio"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                className="col-md-6 m-0 card py-4 align-itemsstart"
                                value="1"
                                control={<Radio />}
                                label="Maintenance and Repair Templates"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                        <div>
                            {/* <button onClick={() => setActiveStep(2)} className="btn btn-primary w-100">Next  <img className='ml-2' src={Buttonarrow}></img></button> */}
                            <button onClick={() => HandleNextStepClick()} className="btn btn-primary w-100">Next  <img className='ml-2' src={Buttonarrow}></img></button>
                        </div>
                    </div>
                    :
                    <></>}

                {activeStep == 2 ?
                    <div>
                        <h5>Search existing portfolio solution</h5>
                        <div className="card border align-items-start mt-4 p-3" style={{ flexDirection: 'row' }}>
                            <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                                <img src={searchstatusIcon}></img>
                            </div>
                            <div className=" mx-2">
                                <div className="machine-drop d-flex align-items-center">
                                    <div className="ml-2 mr-2"><lable className="label-div" style={{ whiteSpace: 'pre' }}>Search by</lable></div>
                                    <Select
                                        placeholder="Select....."
                                        closeMenuOnSelect={true}
                                        onChange={handleSearch}
                                        components={animatedComponents}
                                        value={searchOptions}
                                        options={colourOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        {searchByVisible ? <></>
                            :
                            <div>
                                <button onClick={() => alert()} disabled={buildEnable} className="btn btn-primary w-100">Build<img className='ml-2' src={Buttonarrow}></img></button>
                            </div>
                        }

                        {loadingItem === "01" ? ("loading") :
                            <>
                                {searchByVisible ?
                                    <div className='card border mt-4 p-3'>
                                        {/* <div className="mt-3" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}> */}
                                        <div className="mt-3" style={{ width: '100%', backgroundColor: '#fff' }}>
                                            {/* <DataGrid
                                        sx={{
                                            '& .MuiDataGrid-columnHeaders': {
                                                backgroundColor: '#872ff7', color: '#fff'
                                            }
                                        }}
                                        rows={rows1}
                                        columns={columns1}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection


                                    /> */}
                                            <DataTable
                                                className=""
                                                title=""
                                                columns={columns4}
                                                data={portfolioSolutionData}
                                                customStyles={customStyles}
                                                // defaultSortAsc={false}
                                                // defaultSortFieldId={1}
                                                pagination
                                            />
                                            <div className="mt-2 text-right">
                                                <button
                                                    // onClick={() => window.location.href = SOLUTION_BUILDER_SERVICE_PORTFOLIO}
                                                    onClick={() => history.push(SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO)}
                                                    disabled={!flagIs}
                                                    className="btn text-white bg-primary" >Add<img className='ml-2' src={Buttonarrow}></img></button>
                                            </div>
                                        </div>
                                        {/* <div className='mt-3 row'> */}
                                        {/* <div className="col-md-6">
                                <button className="btn btn-primary w-100" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>Error<img className='ml-2' src={Buttonarrow}></img></button>
                            </div> */}
                                        {/* <div className="col-md-12">
                                        <button onClick={() => window.location.href = SOLUTION_BUILDER_SERVICE_PORTFOLIO}
                                            disabled={!flagIs} className="btn btn-primary w-100" >Add<img className='ml-2' src={Buttonarrow}></img></button>
                                    </div> */}
                                        {/* </div> */}
                                    </div>
                                    :
                                    <></>
                                }
                            </>
                        }

                    </div>
                    :
                    <></>}
                <Modal show={open} onHide={handleClose} size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Errors</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-0 bg-white">
                        <div className='d-flex justify-content-between align-items-center px-3 border-bottom'>
                            <h6 className='mb-0'>3 errors found in line items</h6>
                            <div>
                                <a href='#' className='btn'>Clear All</a>
                            </div>
                        </div>
                        <div className=' mt-2'>
                            <h6 className="px-3">FILTER</h6>
                            <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box className="custom-tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="Part list" value="1" />
                                            <Tab label="Service Estimates" value="2" />
                                            <Tab label="Form" value="3" />

                                        </TabList>
                                    </Box>
                                    <TabPanel className="px-3" value="1">
                                        <div className="card border p-3 mb-0">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-0">Invalid data</p>
                                                <h6 className="mb-0">2 min ago</h6>
                                            </div>
                                            <h6 className="mb-0"> Part list header component code</h6>
                                            <p className="mb-0">Fix <a href="#" className="btn">Go to field</a></p>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="2">Item Two</TabPanel>
                                    <TabPanel value="3">Item Three</TabPanel>
                                </TabContext>
                            </Box>
                            <hr className="mb-0" />
                            <div className="p-3">
                                <a href='#' className='btn text-light border-light'>Go Back to Solution</a>
                                <a href='#' className='btn btn-primary float-right'>Choose the correct portfolio</a>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
