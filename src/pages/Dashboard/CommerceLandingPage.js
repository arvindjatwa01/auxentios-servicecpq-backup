import {
    faFileAlt,
    faFolderPlus,
    faPlus,
    faShareAlt,
    faUpload,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
  import SearchIcon from "@mui/icons-material/Search";
  import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
  import Checkbox from "@mui/material/Checkbox";
  import FormControlLabel from "@mui/material/FormControlLabel";
  import FormGroup from "@mui/material/FormGroup";
  import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
  import EastIcon from '@mui/icons-material/East';
  import $ from "jquery";
  import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
  import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
  import OwlCarousel from 'react-owl-carousel';
  import CabinIcon from '@mui/icons-material/Cabin';
  import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
  import "owl.carousel/dist/assets/owl.carousel.css";
  import "owl.carousel/dist/assets/owl.theme.default.css";
  import React, { useEffect, useState } from "react";
  import { Link, useHistory } from "react-router-dom";
  import EditIcon from "@mui/icons-material/EditTwoTone";
  import Portfoliosicon from '../../assets/icons/svg/Portfolios-icon.svg'
  import SelectFilter from "react-select";
  import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
  import CustomizedSnackbar from "pages/Common/CustomSnackBar";
  import Buttonarrow from '../../assets/icons/svg/Button-arrow.svg'
  import contract from '../../assets/icons/svg/contract.svg'
  import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
  import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
  import {
    addPartlist,
    builderSearch,
    createBuilder,
  } from "services/repairBuilderServices";
  import moment from "moment-timezone";
  import Moment from "react-moment";
  import { Typography } from "@mui/material";
  import Loader from "react-js-loader";
  
  export const CommerceLandingPage = () => {
    const [show, setShow] = React.useState(false);
    const [recentPartlists, setRecentPartlists] = useState([]);
    // Snack Bar State
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
  
    const searchBuilderColumns = [
      { field: "builderId", headerName: "ID#", flex: 1, width: 70 },
      { field: "description", headerName: "Description", flex: 1, width: 130 },
      { field: "customerId", headerName: "Customer#", flex: 1, width: 130 },
      { field: "make", headerName: "Make", flex: 1, width: 130 },
      { field: "model", headerName: "Model", flex: 1, width: 130 },
      { field: "family", headerName: "Family", flex: 1, width: 130 },
      { field: "serialNo", headerName: "Serial#", flex: 1, width: 130 },
      { field: "createdBy", headerName: "Created by", flex: 1, width: 130 },
      {
        field: "createdAt",
        headerName: "Created On",
        flex: 1,
        width: 130,
        renderCell: (params) => (
          <Moment format="DD MMM YY HH:MM a" style={{ fontSize: 12 }}>
            {params.value}
          </Moment>
        ),
      },
      { field: "totalPrice", headerName: "Total $", flex: 1, width: 130 },
      { field: "status", headerName: "Status", flex: 1, width: 130 },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: (params) => {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => makePartlistEditable(params.row)}
              color="inherit"
            />,
          ];
        },
      },
    ];
  
    const handleQuerySearchClick = async () => {
      $(".scrollbar").css("display", "none");
      // console.log("handleQuerySearchClick", querySearchSelector);
      var searchStr = "";
      querySearchSelector.map(function (item, i) {
        if (i === 0 && item.selectCategory.value && item.inputSearch) {
          searchStr = item.selectCategory.value + ":" + item.inputSearch;
        } else if (
          item.selectCategory.value &&
          item.inputSearch &&
          item.selectOperator.value
        ) {
          searchStr =
            searchStr +
            " " +
            item.selectOperator.value +
            " " +
            item.selectCategory.value +
            ":" +
            item.inputSearch;
        }
        return searchStr;
      });
  
      try {
        if (searchStr) {
          const res = await builderSearch(`builderType:PARTLIST&${searchStr}`);
          setMasterData(res);
        } else {
          handleSnack("info", "Please fill the search criteria!");
        }
      } catch (err) {
        handleSnack("error", "Error occurred while fetching spare parts!");
      }
    };
  
    const [querySearchSelector, setQuerySearchSelector] = useState([
      {
        id: 0,
        selectCategory: "",
        selectOperator: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      },
    ]);
  
    const [masterData, setMasterData] = useState([]);
  
    const history = useHistory();
    const createNewBuilder = () => {
      let builderDetails = {
        builderId: "",
        bId: "",
        partListNo: "",
        partListId: "",
        type: "new",
      };
      createBuilder({
        builderType: "PARTLIST",
        activeVersion: true,
        versionNumber: 1,
        status: "DRAFT",
      })
        .then((result) => {
          builderDetails.builderId = result.builderId;
          builderDetails.bId = result.id;
  
          addPartlist(result.id, {
            activeVersion: true,
            versionNumber: 1,
          })
            .then((partlistResult) => {
              builderDetails.partListNo = partlistResult.id;
              builderDetails.partListId = partlistResult.partlistId;
              history.push({
                pathname: "/RepairPartList/PartList",
                state: builderDetails,
              });
            })
            .catch((err) => {
              console.log("Error Occurred", err);
              handleSnack("error", "Error occurred while creating partlist!");
            });
        })
        .catch((err) => {
          console.log("Error Occurred", err);
          handleSnack("error", "Error occurred while creating builder!");
        });
    };
  
    const makePartlistEditable = (selectedBuilder) => {
      let builderDetails = {
        builderId: "",
        bId: "",
        partListNo: "",
        partListId: "",
        type: "fetch",
      };
      builderDetails.builderId = selectedBuilder.builderId;
      builderDetails.bId = selectedBuilder.id;
      // builderDetails.partListNo = builderDetails.;
      builderDetails.partListId = selectedBuilder.estimationNumber;
      builderDetails.versionNumber = selectedBuilder.versionNumber;
      history.push({
        pathname: "/RepairPartList/PartList",
        state: builderDetails,
      });
    };
  
    // Once opetion has been selected clear the search results
    const clearFilteredData = () => {
      setMasterData([]);
    };
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
                                        <Link className='btn bg-primary text-white py-2'>Explore</Link>
                                        <p className="py-2">Our self-service option helps your customers browse products, aftermarket services and solution online.</p>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 my-3 '>
                                <div className='d-flex'>
                                    <div className='mr-2'><img src={contract}></img></div>
                                    <div>
                                        <h5 className='text-light'> Solutions</h5>
                                        <Link className='btn bg-primary text-white py-2'>Explore</Link>
                                        <p className="py-2">Our platform is built to create templates and kits. It has twin builder functionality.</p>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 my-3 '>
                                <div className='d-flex'>
                                    <div className='mr-2'><DesignServicesOutlinedIcon style={{fontSize: "66px"}}/></div>
                                    <div>
                                        <h5 className='text-light'> Services</h5>
                                        <Link className='btn bg-primary text-white py-2'>Explore</Link>
                                        <p className="py-2">Our inbuilt price engine helps you price spare parts, labor, miscellaneous, and consumables.</p>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 my-3 '>
                                <div className='d-flex'>
                                    <div className='mr-2'><DesignServicesOutlinedIcon style={{fontSize: "66px"}}/></div>
                                    <div>
                                        <h5 className='text-light'> Bundles</h5>
                                        <Link className='btn bg-primary text-white py-2'>Explore</Link>
                                        <p className="py-2">The quotes and follow up orders that your sales reps build using our preconfigured solution.</p>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
            <div>
            <Link className='btn bg-primary text-white py-2'>Guided Solution</Link>
            </div>
            </div>
            <div className="p-4 mt-2">
            <h4 className="font-weight-600 mb-0">Accessory Products</h4>
            <p className="mb-0"><b>Amet minim molit non deserunt ullamco est sit alique dolor do amet sint. Velit officia consequat duis enim velit molit. Exercitation</b></p>
            </div>
            <div class="contain-slider my-3">
                    <OwlCarousel items={4} className='owl-theme' loop margin={10} nav>
                        <div class='item border-none'>
                            <a href='#' className='bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>For Cabin</a>
                            <h4 className='text-red mt-3'><b>$4,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with AC</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                            <h4 className='text-red mt-3'><b>$6,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Safety</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Two rear view cameras</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Two fog lamps</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            {/* <a href='#' className='bg-yellow text-white btn'>CV agreement</a> */}
                            <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Comprehensive</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Covers solution for cabin,<br />safety and frame</li>

                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                            <h4 className='text-red mt-3'><b>$6,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>

                    </OwlCarousel>
            </div>
            <div className="p-4 mt-4">
            <h4 className="font-weight-600 mb-0">Services</h4>
            <p className="mb-0"><b>Amet minim molit non deserunt ullamco est sit alique dolor do amet sint. Velit officia consequat duis enim velit molit. Exercitation</b></p>
            </div>
            <div class="contain-slider my-3">
                    <OwlCarousel items={4} className='owl-theme' loop margin={10} nav>
                        <div class='item border-none'>
                            <a href='#' className='bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>For Cabin</a>
                            <h4 className='text-red mt-3'><b>$4,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with AC</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                            <h4 className='text-red mt-3'><b>$6,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Safety</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Two rear view cameras</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Two fog lamps</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            {/* <a href='#' className='bg-yellow text-white btn'>CV agreement</a> */}
                            <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Comprehensive</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Covers solution for cabin,<br />safety and frame</li>

                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                            <h4 className='text-red mt-3'><b>$6,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>

                    </OwlCarousel>
            </div>
          </div>
        </div>
      </>
    );
  };
  