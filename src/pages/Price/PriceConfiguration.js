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
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

function PriceConfiguration(){
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
          <h5 className="font-weight-600 mb-0">Price Segment 1322</h5>
          <div className="d-flex justify-content-center align-items-center">
          <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
          <a href="#" className="ml-3 font-size-14" title="Items to review"><img src={folderaddIcon}></img></a>
          <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
          {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
          <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
          <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>

          </div>
          </div>
        <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Price strategy" value="1" />
                <Tab label="Validity" value="2" />
                <Tab label="Details" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
             <div className="card p-4 ">
              <div>
           <div className="row">
           <div className="col-md-6 col-sm-6">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TABLE</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Material/Customer"
              />
            </div>
              </div>
              <div className="col-md-6 col-sm-6">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TABLE</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Material/Customer"
              />
            </div>
              </div>
              <div className="col-md-12 col-sm-12">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DESCRIPTION</label>
              <textarea class="form-control border" id="exampleFormControlTextarea1" rows="2"></textarea>
            </div>
              </div>
           </div>
           <div className="row">
           <div className="col-md-6 col-sm-6">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TABLE</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Material/Customer"
              />
            </div>
            <div><span class="customerlable" style={{display:'inline-block'}}>Mining</span></div>
              </div>
           </div>
           <div className="row mt-3">
           <div className="col-md-6 col-sm-6">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TABLE</label>
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
           <div className="mt-3">
           <div className="row">
           <div class="col-md-6 col-sm-6">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">PRICE METHOD ID</p>
               <h6 class="font-weight-600">13222</h6>
               </div>
               </div>
               <div class="col-md-6 col-sm-6">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">PRICE METHOD TYPE</p>
               <h6 class="font-weight-600">list price</h6>
               </div>
               </div>
               <div class="col-md-12 col-sm-12">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
               <h6 class="font-weight-600">List price for Industrial hevay machoinery</h6>
               </div>
               </div>
           </div>
           <div className="row">
           <div class="col-md-6 col-sm-6">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">ASSIGNED TO</p>
               <h6 class="font-weight-600">Mining-Heavy Machinery</h6>
               </div>
               </div>
           </div>
           <div className="row">
           <div class="col-md-6 col-sm-6">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">FORITEM TYPE</p>
               <h6 class="font-weight-600">Spare parts</h6>
               </div>
               </div>
           </div>
           </div>

           <div className="mt-3">
           <div className="row">
           <div class="col-md-6 col-sm-6">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">PRICE METHOD ID</p>
               <h6 class="font-weight-600">13222 V1.3</h6>
               </div>
               </div>
               <div class="col-md-12 col-sm-12">
                 <div class="form-group">
                   <p class="font-size-12 font-weight-500">DESCRIPTION</p>
                   <div>
                     <span class="customerlable">list price for industrail machinery version 3.0</span>
                    </div>
                  </div>
                </div>
           </div>
           <div className="row">
           <div class="col-md-4 col-sm-4">
                 <div class="form-group">
                   <p class="font-size-12 font-weight-500">ASSIGNED TO</p>
                   <div>
                     <span class="customerlable">heavy machinery</span>
                    </div>
                  </div>
                </div>
           </div>
           <div className="row">
           <div class="col-md-4 col-sm-4">
                 <div class="form-group">
                   <p class="font-size-12 font-weight-500">ITEM TYPE</p>
                   <div>
                     <span class="customerlable">Spare parts</span>
                    </div>
                  </div>
                </div>
           </div>
           </div>
          <div className="mt-4">
            <a href="#" className="btn bg-primary text-white">Next</a>
          </div>
             </div>
            </TabPanel>
            <TabPanel value="2">
             <div className="card p-3">
               <div className="row">
               <div className="col-md-3 col-sm-3">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">START DATE</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="02.12.2020"/>
              </div>
              </div>
              <div className="col-md-3 col-sm-3">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">END DATE</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="02.12.2023"/>
              </div>
              </div>
              <div className="col-md-3 col-sm-3">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">EFFECTIVE DATE</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="02.12.2020"/>
              </div>
              </div>
               </div>
               <div className="row">
           <div class="col-md-4 col-sm-4">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">START DATE</p>
               <h6 class="font-weight-600">02.12.2020</h6>
               </div>
               </div>
               <div class="col-md-4 col-sm-4">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">END DATE</p>
               <h6 class="font-weight-600">02.12.2023</h6>
               </div>
               </div>
               <div class="col-md-4 col-sm-4">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">EFFECTIVE DATE</p>
               <h6 class="font-weight-600">02.12.2020</h6>
               </div>
               </div>
           </div>
             </div>
            </TabPanel>
            <TabPanel value="3">
            <div className="card p-3">
               <div className="row">
               <div className="col-md-2 col-sm-2">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">STATUS</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="02.12.2020"/>
              </div>
              </div>
              <div className="col-md-2 col-sm-2">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CREATED BY</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="02.12.2023"/>
              </div>
              </div>
              <div className="col-md-2 col-sm-2">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CREATED ON</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="13.01.2020"/>
              </div>
              </div>
              <div className="col-md-2 col-sm-2">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MODIFIED BY</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="JBLINCO"/>
              </div>
              </div>
              <div className="col-md-2 col-sm-2">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MODIFIED ON</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="30.01.2020"/>
              </div>
              </div>
               </div>
               <div className="row mt-3">
               <div className="col-md-2 col-sm-2">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
               <h6 class="font-weight-600">02.12.2020</h6>
               </div>
               </div>
               <div className="col-md-2 col-sm-2">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">CREATED BY</p>
               <h6 class="font-weight-600">02.12.2023</h6>
               </div>
               </div>
               <div className="col-md-2 col-sm-2">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">CREATED ON</p>
               <h6 class="font-weight-600">02.12.2020</h6>
               </div>
               </div>
               <div className="col-md-2 col-sm-2">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">MODIFIED BY</p>
               <h6 class="font-weight-600">JBLINCO</h6>
               </div>
               </div>
               <div className="col-md-2 col-sm-2">
             <div class="form-group">
               <p class="font-size-12 font-weight-500 mb-2">MODIFIED ON</p>
               <h6 class="font-weight-600">02.12.2020</h6>
               </div>
               </div>
           </div>
             </div>
            </TabPanel>
          </TabContext>
        </Box>
        <div className=" card ">
         <h5 className="mb-0 px-3 pt-3  pb-0">Price method versions and rules <ModeEditOutlineOutlinedIcon className="ml-2"/></h5>
         <hr/>
         <div className="p-3">
         <div className="add-new-recod d-block py-3" style={{height:'auto'}}>
           <a href="#" className="font-size-18 ">
           <div><span>+</span></div>
           <div><p className="mb-0 pb-2">Add new rule</p></div>
           </a>
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
              <a   onClick={()=>handleOpen()} className=" ">+ Add Calculation rules</a>
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

          <div className="mb-5">
          <a href="/PriceGlobalSetting" className="btn bg-primary text-white mr-3">Price Globalsetting</a>
            <a href="/PriceDetermination" className="btn bg-primary text-white">Price Determination</a>
          </div>
        </div>
        <Modal show={show} onHide={()=>handleClose1()} size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered>
        <Modal.Header closeButton>
          <Modal.Title className="font-size-14">Price method 1322</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 bg-white">
          <div className="ligt-greey-bg p-3">
            <div>
              <span className="mr-3">
              <i class="fa fa-pencil font-size-12" aria-hidden="true"></i><span  className="ml-2">Edit</span>
              </span>
          
              <span className="mr-3">
                <AccessAlarmOutlinedIcon className=" font-size-16"/>
                <span className="ml-2">Share</span>
              </span>
          
            </div>
          </div>
          <div>
            <div className="p-3">
              <div className="row mt-4">
              <div class="col-md-6 col-sm-6">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">METHOD TYPE</p>
                  <h6 class="font-weight-600">List Price</h6>
                  </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">CUSTOMER SEGMENT</p>
                  <h6 class="font-weight-600">heavy machinery</h6>
                  </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">VALIDI FROM</p>
                  <h6 class="font-weight-600">23.07.2021</h6>
                  </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">VALID TO</p>
                  <h6 class="font-weight-600">23.07.2023</h6>
                  </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">CREATED BY</p>
                  <h6 class="font-weight-600">JBLINCO</h6>
                  </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                  <div class="form-group">
                   <p class="font-size-12 font-weight-500">ITEM TYPE</p>
                   <div>
                     <span class="customerlable">active</span>
                    </div>
                  </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">EFFECTIVE DATE</p>
                  <h6 class="font-weight-600">List Price</h6>
                  </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                  <div class="form-group">
                   <p class="font-size-12 font-weight-500">ITEM TYPE</p>
                   <div>
                     <span class="customerlable" style={{background:'#a5a5a5', color:'#5c5858'}}>Disabled</span>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
            <div className="m-3">
              <a href="#" onClick={()=>handleClose1()}  className="btn border mr-3 "> Cancel</a>
              <a href="#" className="btn text-white bg-primary pull-right">Save</a>
            </div>
          </div>
       
        </Modal.Body>
      </Modal>
        </div>
        </>
    )
}


export default PriceConfiguration