import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Link } from 'react-router-dom'
import TabPanel from '@mui/lab/TabPanel';
// import Select from '@mui/material/Select';
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

const animatedComponents = makeAnimated();

export function SolutionSelector(props) {

    const [value, setValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [searchByVisible, setSearchByVisible] = React.useState(false);
    const [buildEnable, setBuildEnable] = React.useState(true);
    const [searchOptions, setSearchOptions] = React.useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [age, setAge] = React.useState('5');
    const [age1, setAge1] = React.useState('5');
    const [age2, setAge2] = React.useState('5');

    const [activeStep, setActiveStep] = useState(1)

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

    const handleSearch = (e) => {
        if (e.value == 2) {
            setBuildEnable(false)
            setSearchByVisible(false)
        } else {
            setBuildEnable(true)
            setSearchByVisible(true)
        }
        setSearchOptions(e)
    }


    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label} onClick={() => handleStep(index)}>
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
                        >

                            <FormControlLabel
                                className="col-md-6 m-0 card py-4 align-itemsstart"
                                value="top"
                                control={<Radio />}
                                label="Portfolio"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                className="col-md-6 m-0 card py-4 align-itemsstart"
                                value="bottom"
                                control={<Radio />}
                                label="Maintenance and Repair Tamplatesttom"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                        <div>
                            <button onClick={() => setActiveStep(2)} className="btn btn-primary w-100">Next  <img className='ml-2' src={Buttonarrow}></img></button>
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

                        {searchByVisible ?
                            <div className='card border mt-4 p-3'>
                                <div className="mt-3" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
                                    <DataGrid
                                        sx={{
                                            '& .MuiDataGrid-columnHeaders': {
                                                backgroundColor: '#7380E4', color: '#fff'
                                            }
                                        }}
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection


                                    />
                                </div>
                                <div className='mt-3 row'>
                                    {/* <div className="col-md-6">
                                <button className="btn btn-primary w-100" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>Error<img className='ml-2' src={Buttonarrow}></img></button>
                            </div> */}
                                    <div className="col-md-12">
                                        <button className="btn btn-primary w-100" >Add<img className='ml-2' src={Buttonarrow}></img></button>
                                    </div>
                                </div>
                            </div>
                            :
                            <></>
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
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
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
