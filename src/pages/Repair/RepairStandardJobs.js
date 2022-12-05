import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import { FileUploader } from "react-drag-drop-files";
import { MuiMenuComponent } from "../Operational/index";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Buttonarrow from "../../assets/icons/svg/Button-arrow.svg";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import shareIcon from "../../assets/icons/svg/share.svg";
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import cpqIcon from "../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import copyIcon from "../../assets/icons/svg/Copy.svg";
import { CommanComponents } from "../../components/index";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DataGrid } from "@mui/x-data-grid";

import { SolutionBuilderModal } from "../../pages/SolutionModules/index";
import SelectFilter from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import $ from "jquery";
import {
  createPortfolio,
  getPortfolio,
  getPortfolioSchema,
  getMakeKeyValue,
  getModelKeyValue,
  getPrefixKeyValue,
  updatePortfolio,
  getUsageCategoryKeyValue,
  getTaskTypeKeyValue,
  getResponseTimeTaskKeyValue,
  getValidityKeyValue,
  getStrategyTaskKeyValue,
  getProductHierarchyKeyValue,
  getGergraphicKeyValue,
  getMachineTypeKeyValue,
  getTypeKeyValue,
  getPortfolioCommonConfig,
  getSearchQueryCoverage,
  getSearchCoverageForFamily,
  itemCreation,
} from "../../services/index";

export const RepairStandardJobs = () => {
  const [value, setValue] = React.useState("1");
  const [openSolutionSelector, setOpenSolutionSelector] = useState(false);
  const [solutionBuilderShow, setSolutionBuilderShow] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [openAddBundleItem, setOpenAddBundleItem] = useState(false);
  const [createNewBundle, setCreateNewBundle] = useState(false);
  const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("");

  const [openSearchSolution, setOpenSearchSolution] = useState(false);
  const [typeOfSearch, setTypeOfSearch] = useState(null);
  const [typeOfSolutionSelector, setTypeOfSolutionSelector] = useState(-1);
  const [typeOfSearchColumn, setTypeOfSearchColumn] = useState(null);
  const [columnSearchKeyValue, setColumnSearchKeyValue] = useState([
    { label: "Bundle", value: "bundle" },
    { label: "Service", value: "service" },
    { label: "Portfolio Item", value: "portfolioItem" },
  ]);
  const [typeOfSearchColumnKeyValue, setTypeOfSearchColumnKeyValue] = useState([
    { label: "Make", value: "make" },
    { label: "Model", value: "model" },
    { label: "Prefix", value: "prefix" },
  ]);
  const [columnSearchText, setColumnSearchText] = useState("");
  const [typeOfSolutionBuild, setTypeOfSolutionBuild] = useState(-1);
  const [buildSolutionValue, setBuildSolutionValue] = useState(-1);

  const [age, setAge] = React.useState("5");
  const [age1, setAge1] = React.useState("5");
  const [age2, setAge2] = React.useState("5");
  const [show, setShow] = React.useState(false);

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
  };

  const handleRowClick = (e) => {
    setShow(true);
  };

  const rows = [
    {
      id: 1,
      GroupNumber: "Snow",
      Type: "Jon",
      Partnumber: 35,
      PriceExtended: "pending",
      Pricecurrency: "Open",
      Usage: "Inconsistent",
      TotalPrice: "Inconsistent",
      Comments: "Inconsistent",
      Created: "Created On",
      Total: "25",
      Status: "Status",
      Actions: "Action",
    },
    {
      id: 2,
      GroupNumber: "Lannister",
      Type: "Cersei",
      Partnumber: 42,
      PriceExtended: "pending",
      Pricecurrency: "Open",
      Usage: "Consistent",
      TotalPrice: "Inconsistent",
      Comments: "Inconsistent",
      Created: "Created On",
      Total: "25",
      Status: "Status",
      Actions: "Action",
    },
    {
      id: 3,
      GroupNumber: "Lannister",
      Type: "Jaime",
      Partnumber: 45,
      PriceExtended: "pending",
      Pricecurrency: "Open",
      Usage: "Consistent",
      TotalPrice: "Inconsistent",
      Comments: "Inconsistent",
      Created: "Created On",
      Total: "25",
      Status: "Status",
      Actions: "Action",
    },
    // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
    // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
    // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
    // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
    // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
    // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
  ];

  

  const handleBuildSolution = (e) => {
    setBuildSolutionValue(e.target.value);
  };

  const handleCallbackClose = (data) => {
    if (solutionBuilderShow) {
      setSolutionBuilderShow(false);
    } else {
      setSolutionBuilderShow(true);
    }
  };

  const handleContinueCallback = (data) => {
    if (data) {
      setTypeOfSolutionBuild(0);
      setOpenSolutionSelector(true);
      setOpen(false);
    } else {
      setTypeOfSolutionBuild(1);
      setOpenSolutionSelector(false);
      setOpen(true);
      setTypeOfSolutionSelector(1);
    }
    setSolutionBuilderShow(false);
    setModalComponent(null);
    setOpenSearchSolution(false);
    setShowExplore(false);
  };

  const handleNextSolutionSelector = () => {
    if (buildSolutionValue == "0") {
      window.location.href = "/solutionBuilder/guide";
    } else {
      setTypeOfSolutionBuild(0);
      setOpenSolutionSelector(false);
      setOpen(true);
      setSolutionBuilderShow(false);
      setModalComponent(null);
      setOpenSearchSolution(false);
      setShowExplore(false);
      setTypeOfSolutionSelector(0);
    }
  };

  const handleShowSearchParentCallback = (data) => {
    setOpenSearchSolution(true);
    setOpenSolutionSelector(false);
    setSolutionBuilderShow(false);
    setModalComponent(null);
    setShowExplore(false);
  };

  const handleBundleItemSaveAndContinue = () => {
    // toast('👏 Item Added', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    setOpenSolutionSelector(false);
    setSolutionBuilderShow(false);
    setModalComponent(null);
    setOpenSearchSolution(false);
    setShowExplore(true);
  };

  const handleCloseExplore = () => {
    setShowExplore(false);
  };

  const handleShow = () => {
    if (solutionBuilderShow) {
      setModalComponent(
        <SolutionBuilderModal
          showSearchParentCallback={handleShowSearchParentCallback}
          continueParentCallback={handleContinueCallback}
          parentCallback={handleCallbackClose}
          open={false}
        />
      );
    } else {
      setModalComponent(
        <SolutionBuilderModal
          showSearchParentCallback={handleShowSearchParentCallback}
          continueParentCallback={handleContinueCallback}
          parentCallback={handleCallbackClose}
          open={true}
        />
      );
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fileTypes = ["JPG", "PNG", "GIF"];

  const activityOptions = ["None", "Atria", "Callisto"];

  const handleTypeOfSearchChange = (e) => {
    setTypeOfSearch(e);
    if (e == null) {
      setColumnSearchText("");
    }
  };
  const handleTypeOfSearchColumnChange = (e) => {
    setTypeOfSearchColumn(e);
    if (e == null) {
      setColumnSearchText("");
    }
  };

  const handleCreateNewServiceBundle = () => {
    if (typeOfSearch.value == "bundle") {
      setOpenAddBundleItem(false);
      setOpenSearchSolution(false);
      setCreateNewBundle(true);
      setOpenAddBundleItemHeader("Add New Bundle");
    } else if (typeOfSearch.value == "service") {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Service");
    } else if (typeOfSearch.value == "portfolioItem") {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Portfolio Item");
    }
  };

  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value)
      .then((res) => {
        obj.selectOptions = res;
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
        $(`.scrollbar-${id}`).css("display", "block");
      })
      .catch((err) => {
        console.log("err in api call", err);
      });
    obj.inputSearch = e.target.value;
  };
  const handleQuerySearchClick = () => {
    $(".scrollbar").css("display", "none");
    console.log("handleQuerySearchClick", querySearchSelector);
    var searchStr =
      querySearchSelector[0].selectFamily.value +
      "~" +
      querySearchSelector[0].inputSearch;

    for (let i = 1; i < querySearchSelector.length; i++) {
      searchStr =
        searchStr +
        " " +
        querySearchSelector[i].selectOperator.value +
        " " +
        querySearchSelector[i].selectFamily.value +
        "~" +
        querySearchSelector[i].inputSearch;
    }

    console.log("searchStr", searchStr);
    getSearchQueryCoverage(searchStr)
      .then((res) => {
        console.log("search Query Result :", res);
        setMasterData(res);
      })
      .catch((err) => {
        console.log("error in getSearchQueryCoverage", err);
      });
  };
  const addSearchQuerryHtml = () => {
    setQuerySearchSelector([
      ...querySearchSelector,
      {
        id: count,
        selectOperator: "",
        selectFamily: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      },
    ]);
    setCount(count + 1);
  };
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", e);
    let obj = tempArray[id];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
  const handleMasterCheck = (e, row) => {
    if (e.target.checked) {
      var _masterData = [...masterData];
      const updated = _masterData.map((currentItem, i) => {
        if (row.id == currentItem.id) {
          return { ...currentItem, ["check1"]: e.target.checked };
        } else return currentItem;
      });
      setMasterData([...updated]);
      setFilterMasterData([...filterMasterData, { ...row }]);
    } else {
      var _filterMasterData = [...filterMasterData];
      const updated = _filterMasterData.filter((currentItem, i) => {
        if (row.id !== currentItem.id) return currentItem;
      });
      setFilterMasterData(updated);
    }
  };
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [count, setCount] = useState(1);
  const handleDeleteIncludeSerialNo = (e, row) => {
    const updated = selectedMasterData.filter((obj) => {
      if (obj.id !== row.id) return obj;
    });
    setSelectedMasterData(updated);
  };
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
  const masterColumns = [
    {
      name: (
        <>
          <div>Select</div>
        </>
      ),
      // selector: (row) => row.check1,
      wrap: true,
      sortable: true,
      maxWidth: "300px",
      cell: (row) => (
        <Checkbox
          className="text-black"
          // checked={row.check1}
          // onChange={(e) => handleCheckboxData(e, row)}
        />
      ),
    },
    {
      name: (
        <>
          <div>Group Number</div>
        </>
      ),
      selector: (row) => row.GroupNumber,
      wrap: true,
      sortable: true,
      format: (row) => row.GroupNumber,
    },
    {
      name: (
        <>
          <div>Type</div>
        </>
      ),
      selector: (row) => row.Type,
      wrap: true,
      sortable: true,
      format: (row) => row.Type,
    },
    {
      name: (
        <>
          <div>Part number</div>
        </>
      ),
      selector: (row) => row.Partnumber,
      wrap: true,
      sortable: true,
      format: (row) => row.Partnumber,
    },
    {
      name: (
        <>
          <div>Price Extended</div>
        </>
      ),
      selector: (row) => row.PriceExtended,
      wrap: true,
      sortable: true,
      format: (row) => row.PriceExtended,
    },
    {
      name: (
        <>
          <div>Price currency</div>
        </>
      ),
      selector: (row) => row.Pricecurrency,
      wrap: true,
      sortable: true,
      format: (row) => row.Pricecurrency,
    },
    {
      name: (
        <>
          <div>Usage</div>
        </>
      ),
      selector: (row) => row.Usage,
      wrap: true,
      sortable: true,
      format: (row) => row.Usage,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.TotalPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.TotalPrice,
    },
    {
      name: (
        <>
          <div>Comments</div>
        </>
      ),
      selector: (row) => row.Comments,
      wrap: true,
      sortable: true,
      format: (row) => row.Comments,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      selector: (row) => row.Actions,
      wrap: true,
      sortable: true,
      format: (row) => row.Actions,
    },
  ];

  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Standard Jobs</h5>
            <div>
              <Link
                to="/StandardJobs"
                style={{ cursor: "pointer" }}
                className="btn bg-primary text-white"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Create New<span className="ml-2"></span>
              </Link>
            </div>
          </div>

          <div className="card p-4 mt-5">
            <div className="mt-1">
              {/* <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Standard Jobs{" "}
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Standard Jobs</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Standard Jobs
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Standard Jobs</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Standard Jobs
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Standard Jobs</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Standard Jobs
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Standard Jobs</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Standard Jobs
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Standard Jobs</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Standard Jobs
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Standard Jobs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary px-3 mb-3 border-radius-6">
            <div className="d-md-flex d-block justify-content-between align-items-center">
              <div className=" mx-2">
                <div className="d-flex align-items-center bg-primary w-100">
                  <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                    <h5 className="mr-2 mb-0 text-white">
                      <span>Search</span>
                    </h5>
                  </div>

                  <div className="d-flex justify-content-between align-items-center w-100 ">
                    <div className="row align-items-center m-0">
                      {querySearchSelector.map((obj, i) => {
                        return (
                          <>
                            <div className="customselect d-flex align-items-center mr-3 my-2">
                              {i > 0 ? (
                                <SelectFilter
                                  isClearable={true}
                                  defaultValue={{ label: "And", value: "AND" }}
                                  options={[
                                    { label: "And", value: "AND", id: i },
                                    { label: "Or", value: "OR", id: i },
                                  ]}
                                  placeholder="Search By.."
                                  onChange={(e) => handleOperator(e, i)}
                                  // value={querySearchOperator[i]}
                                  value={obj.selectOperator}
                                />
                              ) : (
                                <></>
                              )}

                              <div>
                                <SelectFilter
                                  // isClearable={true}
                                  options={[
                                    { label: "Make", value: "make", id: i },
                                    { label: "Family", value: "family", id: i },
                                    { label: "Model", value: "model", id: i },
                                    { label: "Prefix", value: "prefix", id: i },
                                  ]}
                                  placeholder="Search By.."
                                  onChange={(e) => handleFamily(e, i)}
                                  value={obj.selectFamily}
                                />
                              </div>
                              <div className="customselectsearch customize">
                                <span className="search-icon-postn">
                                  <SearchIcon />
                                </span>
                                <input
                                  className="custom-input-sleact "
                                  style={{ position: "relative" }}
                                  type="text"
                                  placeholder="Search Parts"
                                  value={obj.inputSearch}
                                  onChange={(e) => handleInputSearch(e, i)}
                                  id={"inputSearch-" + i}
                                  autoComplete="off"
                                />
                                <div className="btn border">
                                  <span className="mr-2">
                                    <AddIcon />
                                  </span>
                                  Add Part
                                </div>

                                {
                                  <ul
                                    className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                                  >
                                    {obj.selectOptions.map((currentItem, j) => (
                                      <li
                                        className="list-group-item"
                                        key={j}
                                        onClick={(e) =>
                                          handleSearchListClick(
                                            e,
                                            currentItem,
                                            obj,
                                            i
                                          )
                                        }
                                      >
                                        {currentItem}
                                      </li>
                                    ))}
                                  </ul>
                                }
                              </div>
                            </div>
                          </>
                        );
                      })}
                      <div onClick={(e) => addSearchQuerryHtml(e)}>
                        <Link
                          to="#"
                          className="btn-sm text-white border mr-2"
                          style={{ border: "1px solid #872FF7" }}
                        >
                          +
                        </Link>
                      </div>
                      <div onClick={handleDeletQuerySearch}>
                        <Link to="#" className="btn-sm border">
                          <svg
                            data-name="Layer 41"
                            id="Layer_41"
                            fill="#ffffff"
                            viewBox="0 0 50 50"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title />
                            <path
                              className="cls-1"
                              d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                            />
                            <path
                              className="cls-1"
                              d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                            />
                            <path
                              className="cls-1"
                              d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                            />
                          </svg>
                          {/* <DeleteIcon className="font-size-16" /> */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div
              className=""
              style={{ height: 400, width: "100%", backgroundColor: "#fff" }}
            >
              <DataTable
                className=""
                title=""
                columns={masterColumns}
                data={rows}
                customStyles={customStyles}
                pagination
              />
            </div>
          </div>

          <ToastContainer />
        </div>
        <div
          class="modal fade"
          id="Datatable"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ zIndex: "1200" }}
        >
          <div
            class="modal-dialog modal-dialog-centered modal-xl"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header p-3">
                <div className="d-flex">
                  <h5>Search Result</h5>
                </div>
              </div>
              <div>
                <div className="card w-100 p-2">
                  <div
                    className=""
                    style={{
                      height: 400,
                      width: "100%",
                      backgroundColor: "#fff",
                    }}
                  >
                    <DataTable
                      className=""
                      title=""
                      columns={masterColumns}
                      data={rows}
                      customStyles={customStyles}
                      pagination
                    />
                  </div>
                </div>
                <div className="m-2 text-right">
                  <a href="#" className="btn text-white bg-primary">
                    + Add Selected
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
