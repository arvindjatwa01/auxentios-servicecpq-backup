import React,{useEffect, useState} from "react";
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import MuiMenuComponent from "../Operational/MuiMenuComponent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { CommanComponents } from "../../components/index"
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from "react-router-dom";
import { Modal, ModalFooter } from 'react-bootstrap';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import $ from 'jquery';

const  QuoteRepairSearch=()=>{

  const [age, setAge] = React.useState('5');
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');
  const [show, setShow] = React.useState(false);
  const handleOpen=()=>setShow(true)
  const handleClose=()=>setShow(false)


  
  

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
  };
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];

  
 
  const columns = [
    { field: 'GroupNumber', headerName: 'Group Number', flex:1, width: 70 },
    { field: 'Type', headerName: 'Type',  flex:1, width: 130 },
    { field: 'Partnumber', headerName: 'Part number',  flex:1, width: 130 },
    { field: 'PriceExtended', headerName: 'Price Extended',  flex:1, width: 130 },
    { field: 'Pricecurrency', headerName: 'Price currency',  flex:1, width: 130 },
    { field: 'Usage', headerName: 'Usage',  flex:1, width: 130 },
    { field: 'TotalPrice', headerName: 'Total Price',  flex:1, width: 130 },
    { field: 'Comments', headerName: 'Comments',  flex:1, width: 130 },
    { field: 'Actions', headerName: 'Actions',  flex:1, width: 130 },
    // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
    // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'DocumentType') || ''
    //     }`,
    
  ];
  

  const rows = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended:'pending', Pricecurrency:'Open',  Usage:'Inconsistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Actions:'Inconsistent',  },
    { id: 2, GroupNumber: 'Lannister',Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency:'Open',  Usage:'Consistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Actions:'Inconsistent', },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency:'Open',  Usage:'Consistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Actions:'Inconsistent', },
    // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
    // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
    // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
    // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
    // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
    // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
  ];

  const handleRowClick=(e)=>{
    setShow(true)
  }
    return(
      <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
      <div class="container-fluid ">
          <div className="card p-4 mt-5">
          <div className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><h5 className="mr-3 mb-0" style={{whiteSpace:'pre'}}>Search Quotes</h5></div>
              <div class="input-group icons border-radius-10 border overflow-hidden">
            <div class="input-group-prepend">
              <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
              <SearchIcon/></span>
              </div>
              <input type="search" class="form-control search-form-control"  aria-label="Search Dashboard"/>
              {/* <div class="input-group-prepend align-items-center">
              <div className="w-100 mx-2">
              <div className="machine-drop d-flex align-items-center bg-white">
             <div><lable className="label-div" style={{whiteSpace:'pre'}} >Quote Type</lable></div>
            <FormControl className="" sx={{ m: 1,}}>
              <Select 
                id="demo-simple-select-autowidth"
                value={age}
                onChange={handleChangedrop}
                autoWidth
              >
                <MenuItem value="5">
                  <em>Repair Quote</em>
                </MenuItem>
                <MenuItem value={10}>Repair Quote</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
          </div>
              </div>
              </div> */}
            </div>
            <div className="ml-2">
              <Link to="/QuoteRepairConfiguration" className="btn bg-primary text-white">Create New <ChevronRightIcon className=""/></Link>
            </div>
              </div>
              </div>
           <div className="bg-primary px-3 mb-3 py-3">
           <div className="row align-items-center">
          <div className="col-3">
          <div className="d-flex ">
          <h5 className="mr-4 mb-0 text-white"><span>Quotes</span></h5>
          <p className="ml-4 mb-0">
            <a href="#" className="ml-3 text-white"><EditOutlinedIcon/></a>
            <a href="#" className="ml-3 text-white"><ShareOutlinedIcon/></a>
          </p>
          </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <div className="search-icon mr-2 text-white" style={{lineHeight:'24px'}}>
              <SearchOutlinedIcon/>
              </div>
              <div className="w-100 mx-2">
              <div className="machine-drop d-flex align-items-center bg-white">
             <div><lable className="label-div">Model</lable></div>
            <FormControl className="" sx={{ m: 1,}}>
              <Select 
                id="demo-simple-select-autowidth"
                value={age}
                onChange={handleChangedrop}
                autoWidth
              >
                <MenuItem value="5">
                  <em>797</em>
                </MenuItem>
                <MenuItem value={10}>797</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
          </div>
              </div>
              <div className="w-100 mx-2">
              <div className="machine-drop d-flex align-items-center bg-white">
             <div><lable className="label-div">Make</lable></div>
            <FormControl className="" sx={{ m: 1,}}>
              <Select 
                id="demo-simple-select-autowidth"
                value={age1}
                onChange={handleChangedrop1}
                autoWidth
              >
                <MenuItem value="5">
                  <em>2018</em>
                </MenuItem>
                <MenuItem value={10}>2018</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
          </div>
              </div>
              <div className="w-100 mx-2">
              <div className="machine-drop d-flex align-items-center bg-white">
             <div><lable className="label-div">Family </lable></div>
            <FormControl className="" sx={{ m: 1,}}>
              <Select 
                id="demo-simple-select-autowidth"
                value={age2}
                onChange={handleChangedrop2}
                autoWidth
              >
                <MenuItem value="5">
                  <em>Dozer</em>
                </MenuItem>
                <MenuItem value={10}>Twenty</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
          </div>
              </div>
              <div className="w-100" style={{display:'flex',justifyContent:'space-between',alignItems:'center',color:'#fff',border:'1px solid #fff',borderRadius:'5px',padding:'0px 15px'
}}>
                <lable>Search By</lable>
                {/* <Checkbox {...label} /> */}
                </div>
            </div>
         
          </div>
          {/* <div className="col-3">
            <div className="d-flex align-items-center">
              <div className="col-8 text-center">
              <a href="#" className="p-1 more-btn text-white">+ 3 more
              <span className="c-btn">C</span>
              <span className="b-btn">B</span>
              <span className="a-btn">A</span>
              </a>
              </div>
              <div className="col-4 text-center border-left py-3">
              <Link to="/QuoteRepairOption" className="p-1 text-white">+ Add Part</Link>
              </div>
            </div>
          </div> */}
          </div>
             </div>   
        <div className="card">
    
        <div className="" style={{ height: 400, width: '100%', backgroundColor:'#fff' }}>
            <DataGrid
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#7380E4', color:'#fff'
              }
            }}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onCellClick={(e)=>handleRowClick(e)}
              
              
            />
          </div> 
        </div>
        {/* <div className="text-right">
          <a href="/ConfigurationSolutionBuilderComponent" className="btn bg-primary text-white">Next</a>
        </div> */}
        </div>
        <Modal className="tablerowmodal" show={show} onHide={() => handleClose()} size="md"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className="">
                <div class="modal-header justify-content-unset" style={{background:'#D0E1EF', justifyContent:'unset'}}>
          {/* <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
          <h4 class="modal-title">Warning!</h4> */}
          <div><LightbulbOutlinedIcon className="text-light"/></div>
          <div>
            <p className="text-light ml-3">This standard job is created for replacement of engne belonging to 797,797F & 793 models</p>
          </div>
        </div>
                <div class="p-3 bg-white">
          <div>
            <a href="#" className="btn bg-primary text-white">Template</a>
          </div>
          <h4 className="text-light mt-3">SJ671</h4>
          <p>Your current session will expire in 5 minutes. Please Save your changes to continue your session, otherwise you
             will lose all unsaved data and your session will time out.</p>
             <h4 className=" mt-3">INCLUDES</h4>
             <ul>
               <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Spare Parts</li>
               <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Labor Hours</li>
               <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Miscellaenous</li>
               <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>External Work</li>
             
             </ul>
             <div>
               <a href="#" style={{textDecoration:'underline'}}>View Details</a>
             </div>
        </div>
        <div class="modal-footer justify-content-between bg-primary">
         <div>
        <b className="text-white">$50,000</b>
         </div>
         <div>
         <a href="#" className="text-white">Select <ArrowRightAltOutlinedIcon className=""/></a>
         </div>
        </div>
                </Modal.Body>
            </Modal>


      </div>
      
    </>
    )
}

export default QuoteRepairSearch