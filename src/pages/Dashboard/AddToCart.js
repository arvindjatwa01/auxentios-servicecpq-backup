import React,{useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { CommanComponents } from "../../components/index"
import { MuiMenuComponent } from "pages/Operational";

const  AddToCart=()=>{

  const [age, setAge] = React.useState('5');
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
  };
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const [value, setValue] = React.useState('1');

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const handleCoveragetable = () => setOpenCoveragetable(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fileTypes = ["JPG", "PNG", "GIF"];


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
    return(
      <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
      <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">Account</h5>
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
          <div className="mt-4">
              <div className="row">
                  <div className="col-md-8 col-sm-8">
                      <div className="card p-4">
                          <h5 className="mb-0">Shopping Cart</h5>
                          <div className="row mt-5">
                             <div className="col-md-4 col-sm-4">
                                <p className="mb-0">ITEM</p>
                                <h6 className="my-2"><b>ABCDUMPMTO 1234</b></h6>
                             </div>
                             <div className="col-md-8 col-sm-8">
                                 <div className="row">
                                    <div className="col-md-7 col-sm-7">
                                        <p className="mb-0">PRICE</p>
                                        <h6 className="my-2"><b>Solution for customer ABC for 3 dumper trucks with additionals</b></h6>
                                    </div>
                                    <div className="col-md-5 col-sm-5">
                                        <p className="mb-0">QUANTITY</p>
                                        <h6 className="my-2"><b>RFQABC 345</b></h6>
                                    </div>
                                 </div>
                             </div>

                          </div>
                          <div className="row mt-5" style={{alignItems: "center"}}>
                               <div className="col-md-5">
                                   <div className="row" style={{alignItems: "center"}}>
                                    <div className="col-md-4">
                                        <img src="./assets/images/jcb-sm.png" className="w-100"></img>
                                    </div>
                                    <div className="col-md-8">
                                        <h5 className="mb-0">Copper Winding Electric Mini Crane Machine</h5>
                                        <p className="mb-0 mt-2">Model ABC1233</p>
                                    </div>
                                    </div>
                               </div>
                               <div className="col-md-7">
                               <div className="row">
                                    <div className="col-md-4">
                                        <h5 className="mb-0">$11500.00</h5>
                                    </div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <a href="#" className="border-bottom">Edit</a>
                                            </div>
                                            <div className="col-md-6">
                                                <a href="#" className="border-bottom">Remove</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                               </div>
                          </div>
                          <div className="row mt-5" style={{alignItems: "center"}}>
                               <div className="col-md-5">
                                   <div className="row" style={{alignItems: "center"}}>
                                    <div className="col-md-4">
                                        <img src="./assets/images/jcb-sm.png" className="w-100"></img>
                                    </div>
                                    <div className="col-md-8">
                                        <h5 className="mb-0">Copper Winding Electric Mini Crane Machine</h5>
                                        <p className="mb-0 mt-2">Model ABC1233</p>
                                    </div>
                                    </div>
                               </div>
                               <div className="col-md-7">
                               <div className="row">
                                    <div className="col-md-4">
                                        <h5 className="mb-0">$11500.00</h5>
                                    </div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <a href="#" className="border-bottom">Edit</a>
                                            </div>
                                            <div className="col-md-6">
                                                <a href="#" className="border-bottom">Remove</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                               </div>
                          </div>
                          <div className="row mt-5" style={{alignItems: "center"}}>
                               <div className="col-md-5">
                                   <div className="row" style={{alignItems: "center"}}>
                                    <div className="col-md-4">
                                        <img src="./assets/images/jcb-sm.png" className="w-100"></img>
                                    </div>
                                    <div className="col-md-8">
                                        <h5 className="mb-0">Copper Winding Electric Mini Crane Machine</h5>
                                        <p className="mb-0 mt-2">Model ABC1233</p>
                                    </div>
                                    </div>
                               </div>
                               <div className="col-md-7">
                               <div className="row">
                                    <div className="col-md-4">
                                        <h5 className="mb-0">$11500.00</h5>
                                    </div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <a href="#" className="border-bottom">Edit</a>
                                            </div>
                                            <div className="col-md-6">
                                                <a href="#" className="border-bottom">Remove</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                               </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                      <div className="card p-4">
                            <h5 className="mb-0">Summary</h5>
                            <div className="mt-5 card p-4 bg-primary">
                                <div className="row">
                                    <div className="col-md-5">
                                        <h6 className="mb-0 text-white">Your total price</h6>
                                        <h3 className="mb-0 mt-3 text-white">$400.80</h3>
                                        <p className="mb-0 text-white mt-5">Redeem promo code</p>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-6">
                                                 <p className="text-white mb-0">Currency</p>
                                                 <p className="text-white mt-2 mb-0">Price</p>
                                                 <p className="text-white mt-2 mb-0">Margin</p>
                                            </div>
                                            <div className="col-md-6">
                                                 <p className="text-white mb-0">USD</p>
                                                 <p className="text-white mt-2 mb-0">$300</p>
                                                 <p className="text-white mt-2 mb-0">$30</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-light-blue p-3">
                            <h5 className="font-weight-normal text-violet mb-0">CHOICE OF SPARE PARTS</h5>
                          </div>
                          <div className="bg-white p-3">
                            <FormGroup>
                              <FormControlLabel control={<Switch defaultChecked />} label="With Spare Parts" />
                              <FormControlLabel control={<Switch />} label="Without Spare Parts" />
                              <FormControlLabel control={<Switch />} label="Only Spare Parts" />
                            </FormGroup>
                          </div>
                          <div className="bg-light-blue p-3">
                            <h5 className="font-weight-normal text-violet mb-0">SERVICES</h5>
                          </div>
                          <div className="bg-white p-3">
                            <div className=" d-flex justify-content-between align-items-center">
                              <div>
                                <FormGroup>
                                  <FormControlLabel control={<Switch />} label=" Changee Oil and Filter" />
                                </FormGroup>
                              </div>
                              <div>
                                <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                              </div>
                            </div>
                            <h5 className="d-flex align-items-center mb-0"><div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Optianal services</span></div><div className="hr"></div></h5>
                            <FormGroup>
                              <FormControlLabel control={<Switch />} label="Air Filter Replacement" />
                              <FormControlLabel control={<Switch />} label="Cabin Air Filter" />
                              <FormControlLabel control={<Switch />} label="Rotete Tires" />
                            </FormGroup>
                            <h5 className="d-flex align-items-center mb-0"><div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Includes</span></div><div className="hr"></div></h5>
                            <div className="mt-3">
                              <h6><a href="#" className="btn-sm text-white mr-2" style={{ background: '#79CBA2' }}>Free</a> 50 Point Inspection</h6>
                              <h6 className="mt-3"><a href="#" className="btn-sm text-white mr-2 " style={{ background: '#79CBA2' }}>Free</a> Service Report</h6>
                            </div>
                            <div className=" d-flex justify-content-between mt-4">
                              <div>
                                <a href="#" className="btn text-violet bg-light-blue"><b><span className="mr-2">+</span>Add more services</b></a>
                              </div>
                              <div>
                                <a href="#" className="btn text-violet"><b>I Have Parts</b></a>
                              </div>
                            </div>
                          </div>
                    
                         
                      </div>
                  </div>
              </div>
              <div>
              <a href="/ReviewOrder" class="btn bg-primary text-white pull-right">Review</a>
              </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default AddToCart