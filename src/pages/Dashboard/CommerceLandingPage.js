  import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
  import EastIcon from '@mui/icons-material/East';
  import $ from "jquery";
  import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
  import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
  import OwlCarousel from 'react-owl-carousel';
  import CabinIcon from '@mui/icons-material/Cabin';
  import "owl.carousel/dist/assets/owl.carousel.css";
  import "owl.carousel/dist/assets/owl.theme.default.css";
  import React, { useEffect, useState } from "react";
  import { Link, useHistory } from "react-router-dom";
  import EditIcon from "@mui/icons-material/EditTwoTone";
  import Portfoliosicon from '../../assets/icons/svg/Portfolios-icon.svg'
  import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
  import CustomizedSnackbar from "pages/Common/CustomSnackBar";
  import contract from '../../assets/icons/svg/contract.svg'
  import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
  import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
  import TextField from '@mui/material/TextField';
  import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
  import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
  import Tab from '@mui/material/Tab';
  import TabPanel from '@mui/lab/TabPanel';
  import TabContext from '@mui/lab/TabContext';
  import TabList from '@mui/lab/TabList';
  import Box from '@mui/material/Box';
  import {
    addPartlist,
    builderSearch,
    createBuilder,
  } from "services/repairBuilderServices";
  import Moment from "react-moment";
  
  export const CommerceLandingPage = () => {
    const [show, setShow] = React.useState(false);
    const [recentPartlists, setRecentPartlists] = useState([]);
    // Snack Bar State
    const [value, setValue] = React.useState('1');
    const [severity, setSeverity] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [recentBuildersLoading, setRecentBuildersLoading] = useState(false);
    const handleSnackBarClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenSnack(false);
    };
  
    useEffect(() => {
      fetcheRecentPartlists();
    }, []);
  
    const fetcheRecentPartlists = () => {
      setRecentBuildersLoading(true);
  
      builderSearch(
        `builderType:PARTLIST&pageSize=10&sortColumn=updatedAt&orderBY=DESC`
      )
        .then((result) => {
          setRecentPartlists(result);
        })
        .catch((err) => {
          handleSnack("error", "Error occurred while fetching recent partlists");
        });
      setRecentBuildersLoading(false);
    };
  
    const handleSnack = (snackSeverity, snackMessage) => {
      setSnackMessage(snackMessage);
      setSeverity(snackSeverity);
      setOpenSnack(true);
    };
  
    const [masterData, setMasterData] = useState([]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const history = useHistory();
    const rows = [
      { id: 1, GroupNumber: 'Lannister Cersei', ID: 'strong-aegis-342806', },
      { id: 2, GroupNumber: 'Lannister Jaime', ID: 'strong-aegis-342806', },
    ];
    const columns = [
      { field: 'GroupNumber', headerName: 'Name', flex:1, width: 70 },
      { field: 'ID', headerName: 'ID',  flex:1, width: 130 },
      
    ];
    const handleRowClick=(e)=>{
      setShow(true)
    }
    return (
      <>
        <CustomizedSnackbar
          handleClose={handleSnackBarClose}
          open={openSnack}
          severity={severity}
          message={snackMessage}
        />
        <div className="content-body" style={{ minHeight: "884px" }}>
          <div className="container-fluid">
            <div className="d-flex align-items-center mt-2">
              <h4 className="font-weight-600 mb-0">Recommended</h4>
            </div>
            <div class="contain-slider mt-3">
                    <OwlCarousel items={4} className='owl-theme' style={{zIndex: "0"}} loop margin={10} nav>
                        <div class='item2 border-none'>
                        <div className="card-bg p-4">
                        <a href="#" class="btn text-white custom-green-btn">Ordered Before<EastIcon className="ml-3 font-size-16"/></a>
                        </div>
                        <div className="d-flex px-3 py-2" style={{background:'#D0E1EF'}}>
                        <div><LightbulbOutlinedIcon className="text-light"/></div>
                            <div>
                                <p className="text-light ml-3">Based on your current usage that has exceeded 80% for DX8T XL </p>
                            </div>
                        </div>
                        <div className="p-3">
                            <a href='#' className='mt-3 bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Product</a>
                            <h4 className="text-light mt-3">PS7890</h4>
                                <p>This service contract covers the service of the core parts of the machine.</p>
                                  <h5 className=" mt-4">INCLUDES</h5>
                                  <ul>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Cover for all models of the fleet starting from the base model</li>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Periodic maintenance triggered every 3 months</li>
                                  </ul>
                                  <div>
                                    <a href="#" style={{textDecoration:'underline'}}>View Details</a>
                                  </div>
                                  <div className="Choose-btn2 bg-primary px-2">
                                     <h6 className="mb-0 text-white">$20,000</h6>
                                     <a href="#" class="btn text-white ">Add to Cart<EastIcon className="ml-3 font-size-16"/></a>
                                  </div>
                                 </div>
                        </div>
                        <div class='item2 border-none'>
                        <div className="d-flex px-3 py-2" style={{background:'#D0E1EF'}}>
                        <div><LightbulbOutlinedIcon className="text-light"/></div>
                            <div>
                                <p className="text-light ml-3">Based on your current usage that has exceeded 80% for DX8T XL </p>
                            </div>
                        </div>
                        <div className="p-3">
                            <a href='#' className='mt-3 bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Service Contract</a>
                            <h4 className="text-light mt-3">SCC1234</h4>
                                <p>This service contract covers the service of the core parts of the machine.</p>
                                  <h5 className=" mt-4">INCLUDES</h5>
                                  <ul>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>2 year service of core parts</li>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>4 year service of accessories</li>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>4 year service of accessories</li>
                                  </ul>
                                  <div>
                                    <a href="#" style={{textDecoration:'underline'}}>View Details</a>
                                  </div>
                                  <div className="Choose-btn2 bg-primary px-2">
                                     <h6 className="mb-0 text-white">$20,000</h6>
                                     <a href="#" class="btn text-white ">Add to Cart<EastIcon className="ml-3 font-size-16"/></a>
                                  </div>
                                 </div>
                        </div>
                        <div class='item2 border-none'>
                        <div className="d-flex px-3 py-2" style={{background:'#D0E1EF'}}>
                        <div><LightbulbOutlinedIcon className="text-light"/></div>
                            <div>
                                <p className="text-light ml-3">Based on your current usage that has exceeded 80% for DX8T XL </p>
                            </div>
                        </div>
                        <div className="p-3">
                            <a href='#' className='mt-3 bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Portfolio Solution</a>
                            <h4 className="text-light mt-3">PS7890</h4>
                                <p>This service contract covers the service of the core parts of the machine.</p>
                                  <h5 className=" mt-4">INCLUDES</h5>
                                  <ul>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>5 year CVA</li>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Cover for all models of the fleet starting from the base model</li>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Periodic maintenence triggered every 3 months</li>
                                  </ul>
                                  <div>
                                    <a href="#" style={{textDecoration:'underline'}}>View Details</a>
                                  </div>
                                  <div className="Choose-btn2 bg-primary px-2">
                                     <h6 className="mb-0 text-white">$20,000</h6>
                                     <div className="Choose-btn2 bg-primary px-2">
                                     <h6 className="mb-0 text-white">$20,000</h6>
                                     <a href="#" class="btn text-white ">Add to Cart<EastIcon className="ml-3 font-size-16"/></a>
                                  </div>
                                  </div>
                                 </div>
                        </div>
                        <div class='item2 border-none'>
                        <div className="d-flex px-3 py-2" style={{background:'#D0E1EF'}}>
                        <div><LightbulbOutlinedIcon className="text-light"/></div>
                            <div>
                                <p className="text-light ml-3">Based on your current usage that has exceeded 80% for DX8T XL </p>
                            </div>
                        </div>
                        <div className="p-3">
                            <a href='#' className='mt-3 bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Service Contract</a>
                            <h4 className="text-light mt-3">SCC1234</h4>
                                <p>This service contract covers the service of the core parts of the machine.</p>
                                  <h5 className=" mt-4">INCLUDES</h5>
                                  <ul>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>2 year service of core parts</li>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>4 year service of accessories</li>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>4 year service of accessories</li>
                                  </ul>
                                  <div>
                                    <a href="#" style={{textDecoration:'underline'}}>View Details</a>
                                  </div>
                                  <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                                 </div>
                        </div>
                        <div class='item2 border-none'>
                        <div className="d-flex px-3 py-2" style={{background:'#D0E1EF'}}>
                        <div><LightbulbOutlinedIcon className="text-light"/></div>
                            <div>
                                <p className="text-light ml-3">Based on your current usage that has exceeded 80% for DX8T XL </p>
                            </div>
                        </div>
                        <div className="p-3">
                            <a href='#' className='mt-3 bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Service Contract</a>
                            <h4 className="text-light mt-3">SCC1234</h4>
                                <p>This service contract covers the service of the core parts of the machine.</p>
                                  <h5 className=" mt-4">INCLUDES</h5>
                                  <ul>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>2 year service of core parts</li>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>4 year service of accessories</li>
                                    <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>4 year service of accessories</li>
                                  </ul>
                                  <div>
                                    <a href="#" style={{textDecoration:'underline'}}>View Details</a>
                                  </div>
                                  <div className="Choose-btn2 bg-primary px-2">
                                     <h6 className="mb-0 text-white">$20,000</h6>
                                     <a href="#" class="btn text-white ">Add to Cart<EastIcon className="ml-3 font-size-16"/></a>
                                  </div>
                                 </div>
                        </div>
                    </OwlCarousel>
                </div>
            <div className="card p-4 mt-5" style={{background:'#D0E1EF'}}>
            <h5 className="font-weight-600 mb-0">Select the solutions you want to search</h5>
            <div className='card mt-4 p-4'>
                        <div className='row'>
                            <div className='col-md-6 my-3 '>
                                <div className='d-flex'>
                                    <div className='mr-2'><img src={Portfoliosicon}></img></div>
                                    <div>
                                        <h5 className='text-light'>Portfolios</h5>
                                        <Link className='btn bg-primary text-white py-2' data-toggle="modal" data-target="#selectproject">Explore</Link>
                                        <p className="py-2">Our self-service option helps your customers browse products, aftermarket services and solution online.</p>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 my-3 '>
                                <div className='d-flex'>
                                    <div className='mr-2'><img src={contract}></img></div>
                                    <div>
                                        <h5 className='text-light'> Solutions</h5>
                                        <Link className='btn bg-primary text-white py-2' data-toggle="modal" data-target="#selectproject">Explore</Link>
                                        <p className="py-2">Our platform is built to create templates and kits. It has twin builder functionality.</p>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 my-3 '>
                                <div className='d-flex'>
                                    <div className='mr-2'><DesignServicesOutlinedIcon style={{fontSize: "66px"}}/></div>
                                    <div>
                                        <h5 className='text-light'> Services</h5>
                                        <Link className='btn bg-primary text-white py-2' data-toggle="modal" data-target="#selectproject">Explore</Link>
                                        <p className="py-2">Our inbuilt price engine helps you price spare parts, labor, miscellaneous, and consumables.</p>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 my-3 '>
                                <div className='d-flex'>
                                    <div className='mr-2'><DesignServicesOutlinedIcon style={{fontSize: "66px"}}/></div>
                                    <div>
                                        <h5 className='text-light'> Bundles</h5>
                                        <Link className='btn bg-primary text-white py-2' data-toggle="modal" data-target="#selectproject">Explore</Link>
                                        <p className="py-2">The quotes and follow up orders that your sales reps build using our preconfigured solution.</p>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
            <div>
            <a href="/CommerceGuided" className='btn bg-primary text-white py-2'>Guided Solution</a>
            </div>
            </div>
            <div className="p-4 mt-2">
            <h4 className="font-weight-600 mb-0">Accessory Products</h4>
            <p className="mb-0"><b>Amet minim molit non deserunt ullamco est sit alique dolor do amet sint. Velit officia consequat duis enim velit molit. Exercitation</b></p>
            </div>
            <div class="contain-slider my-3">
                    <OwlCarousel items={4} className='owl-theme' loop margin={10} nav>
                        <div class='item3 border-none'>
                           <div className="w-100" style={{height: "225px"}}>
                               <img src="./assets/images/tool1.png"></img>
                           </div>
                           <div className="p-4">
                               <h4 className="text-light mt-3">PS7890</h4>
                               <h4 className='text-red mt-3'><b>$20,000</b></h4>
                               <p className="mb-0 mt-2">This service contract covers the service of the core parts of the machine.</p>
                           </div>
                           <a href="#" class="btn bg-primary text-white Choose-btn3"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item3 border-none'>
                           <div className="w-100" style={{height: "225px"}}>
                               <img src="./assets/images/tool2.png"></img>
                           </div>
                           <div className="p-4">
                               <h4 className="text-light mt-3">PS7890</h4>
                               <h4 className='text-red mt-3'><b>$20,000</b></h4>
                               <p className="mb-0 mt-2">This service contract covers the service of the core parts of the machine.</p>
                           </div>
                           <a href="/AddToCart" class="btn bg-primary text-white Choose-btn3"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item3 border-none'>
                           <div className="w-100" style={{height: "225px"}}>
                               <img src="./assets/images/tool3.png"></img>
                           </div>
                           <div className="p-4">
                               <h4 className="text-light mt-3">PS7890</h4>
                               <h4 className='text-red mt-3'><b>$20,000</b></h4>
                               <p className="mb-0 mt-2">This service contract covers the service of the core parts of the machine.</p>
                           </div>
                           <a href="#" class="btn bg-primary text-white Choose-btn3"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item3 border-none'>
                           <div className="w-100" style={{height: "225px"}}>
                               <img src="./assets/images/tool4.png"></img>
                           </div>
                           <div className="p-4">
                               <h4 className="text-light mt-3">PS7890</h4>
                               <h4 className='text-red mt-3'><b>$20,000</b></h4>
                               <p className="mb-0 mt-2">This service contract covers the service of the core parts of the machine.</p>
                           </div>
                           <a href="#" class="btn bg-primary text-white Choose-btn3"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item3 border-none'>
                           <div className="w-100" style={{height: "225px"}}>
                               <img src="./assets/images/tool1.png"></img>
                           </div>
                           <div className="p-4">
                               <h4 className="text-light mt-3">PS7890</h4>
                               <h4 className='text-red mt-3'><b>$20,000</b></h4>
                               <p className="mb-0 mt-2">This service contract covers the service of the core parts of the machine.</p>
                           </div>
                           <a href="#" class="btn bg-primary text-white Choose-btn3"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>

                    </OwlCarousel>
            </div>
            <div className="p-4 mt-4">
            <h4 className="font-weight-600 mb-0">Services</h4>
            <p className="mb-0"><b>Amet minim molit non deserunt ullamco est sit alique dolor do amet sint. Velit officia consequat duis enim velit molit. Exercitation</b></p>
            </div>
            <div class="contain-slider my-4">
                    <OwlCarousel items={4} className='owl-theme' loop margin={10} nav>
                        <div class='item border-none' style={{height:"350px"}}>
                            <a href='#' className='bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Repair Services</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenance triggered every 3 months</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none' style={{height:"350px"}}>
                            <a href='#' className='bg-yellow text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>CV agreement</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenance triggered every 3 months</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none' style={{height:"350px"}}>
                            <a href='#' className='bg-green text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Maintenance Service</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenance triggered every 3 months</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none' style={{height:"350px"}}>
                            <BuildCircleOutlinedIcon style={{fontSize:"90px"}}/>
                            <h4 className='text-primary mt-3'><b>Repair Service</b></h4>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenance triggered every 3 months</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none' style={{height:"350px"}}>
                            <a href='#' className='bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Repair Services</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenance triggered every 3 months</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div> 

                    </OwlCarousel>
            </div>
          </div>
          <div className="modal fade" id="selectproject" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header border-none">
                    <h4 className="modal-title" id="myModalLabel2">Select a project</h4>
                        <div className="d-flex">
                          <h5 className="mb-0"><span><CreateNewFolderIcon className="mr-3" style={{fontSize: "37px"}}/></span>NEW PROJECT</h5>
                        </div>
                  </div>
                  <div className="modal-body" style={{ background: 'white', padding: "1rem 0" }}>
                      <div className="mx-3 my-2 searchtext" style={{position: "relative"}}>
                        <TextField id="outlined-textarea" label="Search projects and folders" placeholder="" multiline />
                        <span className="icon-search"><SearchOutlinedIcon style={{fontSize:"40px"}}/></span>
                      </div>
                      <div className="my-3">
                      <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="RECENT" value="1" />
                                <Tab label="STARRED" value="2" />
                                <Tab label="ALL" value="3" />
                              </TabList>
                            </Box>
                            <TabPanel value="1">
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
                            </TabPanel>
                            <TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                          </TabContext>
                      </div>
                    
                    
                      <div className="modal-footer border-none mr-auto">
                        <button type="button" className="btn bg-white" data-dismiss="modal"><b>CANCEL</b></button>
                        <a href="/CommercePageQuestion" className="btn bg-white">OPEN</a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </>
    );
  };
  