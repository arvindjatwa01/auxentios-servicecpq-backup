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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { MuiMenuComponent } from "pages/Operational";
import { CommanComponents } from "components";

function PriceSetting(){
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
          <h5 className="font-weight-600 mb-0">Pricing Setting </h5>
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
        <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Price Method" value="1" />
                <Tab label="Reference Prices" value="2" />
                <Tab label="Price editable options" value="3" />
                <Tab label="Visualisation options" value="4" />
                <Tab label="Manual price indicator" value="5" />
                <Tab label="Margin or Markup" value="6" />
                <Tab label=" Exclusion indicator" value="7" />
              </TabList>
            </Box>
            <TabPanel value="1">
            <div className="card">
          <div className="add-new-recod">
         <div>
        <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
        <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br/> or</h6>
        <Link to="/PriceConfiguration" style={{cursor: 'pointer'}} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</Link>
         </div>
         </div>
          </div>
            <div className="card border mt-4">
            <div className="d-flex align-items-center justify-content-between px-3">
          <div className="">
          <div className="d-flex ">
          <h5 className=" mb-0"><span>Price Method Version And Rules</span></h5>
          <p className=" mb-0">
            <a href="#" className="ml-3 "><img src={editIcon}></img></a>
            <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
          </p>
          </div>
          </div>
            <div className="d-flex align-items-center ">
              <div className=" text-center border-left py-4 pl-3">
              <a  onClick={()=>handleOpen()} className=" ">+ Add Calculation rules</a>
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
        
            </TabPanel>
            <TabPanel value="2">
              <div className="row">
                <div className="col-md-3 col-sm-3">
                  <div className="card p-3 h-100">
                    <p className="font-size-18">Spare Parts / component</p>
                  <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Cost Price" />
                  <FormControlLabel control={<Checkbox />} label="List Price" />
                  <FormControlLabel control={<Checkbox />} label="Contract Price" />
                </FormGroup>
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="card p-3 h-100">
                    <p className="font-size-18">Spare Parts / component</p>
                  <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Labor Rates" />
                  <FormControlLabel control={<Checkbox />} label="List Price" />
                  <FormControlLabel control={<Checkbox />} label="Contract Price" />
                  <FormControlLabel control={<Checkbox />} label="Falt rate" />
                </FormGroup>
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="card p-3 h-100">
                    <p className="font-size-18">Misc</p>
                  <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="% of Total (On Labor)" />
                  <FormControlLabel control={<Checkbox />} label="% of Total (On Total price)" />
                  <FormControlLabel control={<Checkbox />} label="Flat rate" />
                </FormGroup>
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="card p-3 h-100">
                    <p className="font-size-18">Portfolio/Bundles/Services</p>
                  <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Option price" />
                  <FormControlLabel control={<Checkbox />} label="List price" />
                  <FormControlLabel control={<Checkbox />} label="Manual price" />
                </FormGroup>
                  </div>
                </div>
              </div>
              <div className="mt-4 card p-3">
              <div className="row">
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="13222-Cost Price"
              />
            </div>
              </div>
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CALCULATION TYPE</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Quantity based/Fixed amount"
              />
            </div>
              </div>
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MARK UP ALLOWED</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="yes"
              />
            </div>
              </div>
              
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">EXCHANGE RATE</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="USD to INR"
              />
            </div>
              </div>
              
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DECIMAL ROUND UP</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="2 places"
              />
            </div>
              </div>
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ROUND OFF</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Up"
              />
            </div>
              </div>
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ALLOW PRICE METHOD CHANGE</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Yes"
              />
            </div>
              </div>
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DELETION ALLOWED</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Yes"
              />
            </div>
              </div>
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">RETRO PRICE ACTIVE INDICATOR</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Yes"
              />
            </div>
              </div>
              <div className="col-md-4 col-sm-4">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">OVER-WRITE ALLOWED</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Yes"
              />
            </div>
              </div>
              
              
              </div>
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div className="row">
                <div className="col-md-3 col-sm-3">
                  <div className="card p-3">
                      <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DELETION ALLOWED</label>
                      <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        placeholder="Yes"
                      />
                    </div>
                    <div>
                    <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Overwrite price" />
                  <FormControlLabel control={<Checkbox />} label="Overwrite header price" />
                  <FormControlLabel control={<Checkbox />} label="maintain manual price" />
                  <FormControlLabel control={<Checkbox />} label="Overwrite net value" />
                  <FormControlLabel control={<Checkbox />} label="Overwrite discounts" />
                  <FormControlLabel control={<Checkbox />} label="maintain flat rate" />
                  <FormControlLabel control={<Checkbox />} label="Overwrite item price" />
                  <FormControlLabel control={<Checkbox />} label="price recommendation active" />
                  <FormControlLabel control={<Checkbox />} label="switch to past date price
" />
                </FormGroup>
                    </div>
                      
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="4"></TabPanel>
            <TabPanel value="5"></TabPanel>
            <TabPanel value="6">
            <div className=" mt-4 card p-3">
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <div className="row">
                    <div className="col-md-6 col-sm-6">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER GROUP</label>
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
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Material/Customer"
              />
            </div>
              </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="row">
              <div className="col-md-4 col-sm-4">
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
              <div className="col-md-4 col-sm-4">
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
              <div className=" mt-4 border card p-3">
                <div className="row">
                  <div className="col-md-3 col-sm-3">
                    <div className="row">
              <div className="col-md-12 col-sm-12">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER GROUP</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Material/Customer"
              />
            </div>
              </div>
                    </div>
                  </div>
                  <div className="col-md-9 col-sm-9">
                    <div className="row">
              <div className="col-md-3 col-sm-3">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1"></label>
              <div className="mt-2 pt-2">
              <a href="#" className=" font-size-14 border p-2 border-radius-10 text-center">Add filter +</a>
              </div>
              </div>
              </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" mt-4 border card p-3">
              <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3" style={{whiteSpace:'pre'}}>Discount Detail</span>
              <a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
              <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a> 
              <a href="#" className="btn-sm"><img style={{width:'14px'}} src={folderaddIcon}></img></a></div>
              {/* <div class="hr"></div> */}
              <div class="input-group icons border-radius-10 border" style={{overflow:'hidden'}}>
            <div class="input-group-prepend">
              <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
              <SearchIcon/></span>
              </div>
              <input type="search" class="form-control search-form-control"  aria-label="Search Dashboard"/>
            </div>
              </h5>
              <div className="row mt-5">
              <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">DISCOUNTS TYPE</p>
              <h6 class="font-weight-600">PS01</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">DISCOUNTS TYPE</p>
              <h6 class="font-weight-600">PS01</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TABLE</p>
              <h6 class="font-weight-600">TABD01-Customer Group Discount</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CONNECTION</p>
              <div><span className="customerlable">Mining</span></div>
              </div>
            </div>
              </div>
              </div>
              <div className=" mt-4 border card p-3">
              <div className="row mt-5">
              <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PART NUMBER</p>
              <h6 class="font-weight-600">1X2358</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER</p>
              <h6 class="font-weight-600">NA</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER GROUP</p>
              <h6 class="font-weight-600">Mining</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER GROUP</p>
              <h6 class="font-weight-600">Mining</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SEGMENT</p>
              <h6 class="font-weight-600">Low propensity</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">DISCOUNT</p>
              <h6 class="font-weight-600">8%</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">RECOMMENDED</p>
              <h6 class="font-weight-600">6%</h6>
              </div>
            </div>

              </div>
              </div>
              <div className=" mt-4 border card p-3">
              <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3" style={{whiteSpace:'pre'}}>Limit</span>
              <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a> 
              <a href="#" className="btn-sm"><img style={{width:'14px'}} src={folderaddIcon}></img></a></div>
              <div class="hr"></div>
              </h5>
              <p>Users can add minimum 8% discount or maximum 15% discount.For more discount approval must be obtained.</p>
              <div className="row align-items-center">
              <div className="col-md-5 col-sm-5">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MIN DISCOUNT</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="8%"
              />
            </div>
              </div>
              <div className="col-md-5 col-sm-5">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MAX DISCOUNT</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="15%"
              />
            </div>
              </div>
              <div className="col-md-2 col-sm-2">
              <div className="form-group mb-0">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1"></label>
              <a href="#" className=""><DeleteIcon/></a>
              </div>
              </div>
              </div>
              </div>
              <div className=" mt-4 border card p-3">
                <div className="row">
              <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">START DATE</p>
              <h6 class="font-weight-600">28.10.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">END DATE</p>
              <h6 class="font-weight-600">3.11.24</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">EFFECTIVE DATE</p>
              <h6 class="font-weight-600">3.11.24</h6>
              </div>
            </div>
            <div class="col-md-12 col-sm-12">
              <a href="#" className="btn bg-primary text-white">Save</a>
            </div>
            </div>
              </div>
              <div className="mt-3">
                <a href="#" className="btn bg-primary text-white">Next</a>
              </div>
            </TabPanel>
            <TabPanel value="7">
              <div className="card p-4">
              <div className="row">
              <div className="col-md-3 col-sm-3">
                  <div className="card p-3 h-100">
                    <p className="font-size-18">Set exclusion rules spare parts</p>
                  <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Rule A" />
                  <FormControlLabel control={<Checkbox />} label="Rule B" />
                  <FormControlLabel control={<Checkbox />} label="Rule C" />
                </FormGroup>
                  </div>
                </div>
              </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
        </div>

        </div>
        </>
    )
}


export default PriceSetting