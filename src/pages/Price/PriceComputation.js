import React,{useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Modal } from 'react-bootstrap';
import TabContext from '@mui/lab/TabContext';
import { DataGrid } from '@mui/x-data-grid';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Select from 'react-select';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { MuiMenuComponent } from "pages/Operational";
import { CommanComponents } from "components";

function PriceComputation(){
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState('1');
  const [show, setShow] = React.useState(false);
  const handleOpen=()=>setShow(true)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose1 = () => {
    setShow(false)
  };
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
    return(
      <>
       <CommanComponents/>
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid mt-3">
           <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">Recommended price</h5>
          <div className="d-flex justify-content-center align-items-center">
          <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Item to Review"><img src={folderaddIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
            {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a>
           
          </div>
          </div>
          <div className="card p-4 mt-5">
          <div className="border card p-3 mb-0">
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <div className="row">
                    <div className="col-md-6 col-sm-6">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">FILTER CRITERIA</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Spare Parts"
              />
            </div>
              </div>
              <div className="col-md-6 col-sm-6">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1"></label>
              <Select className="mt-2"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Last 30 days"
              />
            </div>
              </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="row">
              <div className="col-md-3 col-sm-3">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1"></label>
              <Select className="mt-2"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="By material"
              />
            </div>
              </div>
              <div className="col-md-3 col-sm-3">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1"></label>
              <Select className="mt-2"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="By Service"
              />
            </div>
              </div>
              <div className="col-md-3 col-sm-3">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1"></label>
              <Select className="mt-2"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="By Customer"
              />
            </div>
              </div>
              <div className="col-md-3 col-sm-3">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1"></label>
              <div className="mt-1 pt-1">
              <a href="#" className=" font-size-14 border p-2 border-radius-10 d-block text-center">Add filter +</a>
              </div>
              </div>
              </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="card border">
            <div className="d-flex align-items-center justify-content-between px-3">
          <div className="">
          <div className="d-flex ">
          <h5 className=" mb-0"><span>Report type</span></h5>
          <p className=" mb-0">
            <a href="#" className="ml-3 "><img src={editIcon}></img></a>
            <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
          </p>
          </div>
          </div>
            <div className="d-flex align-items-center ">
              <div className=" text-center py-4 pl-3">
              {/* <a  onClick={()=>handleOpen()} className=" ">+ Add Price</a> */}
              </div>
            </div>
          </div>
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
              
              
            />
          </div> 
          </div>
          <div>
            <a href="#" className=" btn bg-primary text-white ">Next</a>
          </div>

        </div>

        </div>
        </>
    )
}


export default PriceComputation