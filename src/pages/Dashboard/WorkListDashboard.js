import { Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Select from "react-select";
import PartIcons from "../../assets/icons/png/PartIcons.png";
import Buttonarrow from "../../assets/icons/svg/Button-arrow.svg";
import Portfoliosicon from "../../assets/icons/svg/Portfolios-icon.svg";
import contract from "../../assets/icons/svg/contract.svg";
import { NewWorkList } from "./NewWorkList";

const data = [
  {
    id: 0,
    caseId: "13322",
    source: "Sales",
    description: "Solution for model 797F",
    customer: "13322",
    progress: "Pending",
    status: "Open",
    consistencyStatus: "Inconsistent",
    requester: "Ashok Mohanty",
    reason: "Sales Quote"
  },
  {
    id: 1,
    caseId: "23972",
    source: "Marketing",
    description: "Solution for Kumatsu 675 truck",
    customer: "23972",
    progress: "Not relevent",
    status: "Open",
    consistencyStatus: "Consistent",
    requester: "Ashok M",
    reason: "Planning forecast"
  },
  {
    id: 2,
    caseId: "23924",
    source: "Salesforce",
    description: "ESF with LCP",
    customer: "23924",
    progress: "Not relevant",
    status: "Open",
    consistencyStatus: "Inconsistent",
    requester: "Ashok M",
    reason: "Sales promotion"
  },
];

const GRID_STYLE = {
  "& .MuiDataGrid-columnHeaders": {
    // backgroundColor: "#872ff7",
    color: "gray",
    fontSize: 14,
  },
  "& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
    marginTop: "1em",
    marginBottom: "1em",
  },
  "& .MuiTablePagination-select": {
    marginTop: "1.5em",
    marginBottom: "1.5em",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    // borderRight: `1px solid rgba(0,0,0,.12)`,
    paddingLeft: "8px",
    paddingRight: "8px",
    minHeight: "72px",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  // minHeight: 300,
  "& .MuiDataGrid-cellContent": {
    fontSize: 12,
  },
  "& .MuiInputBase-root": {
    fontSize: 12,
    marginInline: 2,
    paddingInline: 1,
  },
  "& .super-app-value": {
    backgroundColor: "#dabffd",
    fontWeight: "600",
  },
  "& .disable-value": {
    backgroundColor: "#f2f2f2",
  },
  marginInline: "auto",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 4,
  height: 400,
};
export function WorkListDash(props) {
  const [openSearchService, setOpenSearchService] = useState(false);
  const [openAddBundleItem, setOpenAddBundleItem] = useState(false);
  const [createNewBundle, setCreateNewBundle] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("");
  const [typeOfSearchColumn, setTypeOfSearchColumn] = useState(null);
  const [show, setShow] = useState(false);
  const [openSearchSolution, setOpenSearchSolution] = useState(false);
  const [typeOfSearch, setTypeOfSearch] = useState(null);
  const [columnSearchText, setColumnSearchText] = useState("");
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
  const columns1 = [
    {
      field: "caseId",
      headerName: "Case#",
      flex: 1,
    },
    {
      field: "requester",
      headerName: "Requester",
      flex: 1,
    },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1,
    },
    {
      field: "progress",
      headerName: "Progress",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "consistencyStatus",
      headerName: "Consistent",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Desc.",
      flex: 1,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div className="cursor">
                <Tooltip title="Assign">
                  <img className="m-1" src={PartIcons} alt="Assign" />
                </Tooltip>
              </div>
            }
            label="Assign"
            className="bg-primary textPrimary"
            onClick={() => setShow(true)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleBundleServiceContinue = () => {
    setOpenSearchService(true);
    setShow(false);
  };

  const handleShowSearch = (data) => {
    setOpenSearchSolution(true);
    setShow(!show);
  };

  const handleCloseExplore = () => {
    setShowExplore(false);
  };

  const handleTypeOfSearchChange = (e) => {
    setTypeOfSearch(e);
    if (e == null) {
      setColumnSearchText("");
    }
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
    setOpenSearchSolution(false);
    setShowExplore(true);
  };

  const handleCreateNewServiceBundle = () => {
    setOpenAddBundleItem(true);
    setOpenSearchSolution(false);
    setCreateNewBundle(false);
    setOpenAddBundleItemHeader("Add New Service");
  };

  const handleCantFound = () => {
    setOpenSearchSolution(false);
    setShowExplore(false);
    setShow(true);
  };
  const [createWorklistShow, setCreateWorlistShow] = useState(false);
  const handleContinueClick = (data) => {
    // if (data) {
    //   setTypeOfSolutionBuild(0)
    //   setOpenSolutionSelector(true)
    //   setOpen(false)
    // } else {
    //   setTypeOfSolutionBuild(1)
    //   setOpenSolutionSelector(false)
    //   setOpen(true)
    //   setTypeOfSolutionSelector(1)
    // }
    // setSolutionBuilderShow(false);
    // setModalComponent(null)
    // setOpenSearchSolution(false)
    // setShowExplore(false)
  };

  const handleTypeOfSearchColumnChange = (e) => {
    setTypeOfSearchColumn(e);
    if (e == null) {
      setColumnSearchText("");
    }
  };

  return (
    <>
      <div class="container-fluid">
        <div className="row justify-content-end mr-2">
          <a
            href={undefined}
            className="pb-2 text-primary cursor"
            onClick={() => setCreateWorlistShow(true)}
          >
            + Create Worklist
          </a>
        </div>
        <div className="row mt-1 mb-5">
          {/* <DataTable
              title=""
              // selectableRows
              columns={columns}
              data={data}
              customStyles={customStyles}
              pagination
            /> */}
          <DataGrid
            sx={{...GRID_STYLE}}
            paginationMode="client"
            rows={data}
            columns={columns1}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // autoHeight
          />
        </div>
      </div>
      <Modal
        show={createWorklistShow}
        onHide={() => setCreateWorlistShow(!createWorklistShow)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body></Modal.Body>
        <NewWorkList />
      </Modal>
      <Modal
        show={show}
        onHide={() => setShow(!show)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h5 class="">Choose what solution you want to build</h5>
            </div>
            <div onClick={handleShowSearch}>
              <a
                href="#"
                className="btn border-light font-weight-500 bg-light-grey font-size-18"
              >
                Explore available solution
              </a>
            </div>
          </div>
          <div className="card mt-4 p-4">
            <div className="row">
              <div className="col-md-6 my-3 ">
                <div className="d-flex">
                  <div className="mr-2">
                    <img src={Portfoliosicon}></img>
                  </div>
                  <div>
                    <h5 className="text-light">
                      Portfolios or Service Programs
                    </h5>
                    <p>
                      <b>You build Portfolios or Service Programs here. </b>
                      Examples of Portfolios are Premium Maintenance Plan, Value
                      added plan etc. A service program is a marketing or
                      product improvement program.
                    </p>
                    <div className="">
                      <Link
                        to="/portfolio/summary"
                        className="btn bg-primary text-white"
                      >
                        Continue <img className="ml-2" src={Buttonarrow}></img>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="d-flex">
                  <div className="mr-2">
                    <img src={contract}></img>
                  </div>
                  <div>
                    <h5 className="text-light">Bundles & Services</h5>
                    <p>
                      <b>
                        You build pre-configured repair & maintenance solutions
                        for your customer segment here.{" "}
                      </b>
                      Examples of pre-built template are Level I contracts like
                      subscriptions or Level IV contract for Total Maintenance
                      and Repair.
                    </p>
                    <div className="">
                      <a
                        onClick={handleBundleServiceContinue}
                        className="btn bg-primary text-white"
                      >
                        Continue <img className="ml-2" src={Buttonarrow}></img>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openSearchSolution}
        onHide={() => setOpenSearchSolution(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body className="">
          Search Solution
          <div className="maintableheader bg-white mt-3 border-radius-10">
            <div className="d-flex justify-content-between align-items-center pl-2">
              <div className="d-flex align-items-center">
                <div className="customselect d-flex ml-3">
                  {/* <span>
                                        <a href="#" className="btn-sm">+</a>
                                    </span> */}
                  <Select
                    onChange={handleTypeOfSearchChange}
                    isClearable={true}
                    value={typeOfSearch}
                    options={columnSearchKeyValue}
                    placeholder="Add by"
                  />
                </div>
                {typeOfSearch != null ? (
                  <div className="customselect d-flex ml-3">
                    <span>
                      <a href="#" className="btn-sm">
                        +
                      </a>
                    </span>
                    <Select
                      onChange={handleTypeOfSearchColumnChange}
                      isClearable={true}
                      value={typeOfSearchColumn}
                      options={typeOfSearchColumnKeyValue}
                      placeholder="Select"
                    />
                    {typeOfSearchColumn != null ? (
                      // <></>
                      <input
                        type="email"
                        class=""
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter text"
                        style={{
                          border: "none",
                          background: "transparent",
                          width: "80px",
                          fontWeight: "600",
                          paddingLeft: "10px",
                        }}
                        value={columnSearchText}
                        onChange={(e) => setColumnSearchText(e.target.value)}
                      ></input>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <div className="">
                  <a
                    href="#"
                    style={{ cursor: "pointer" }}
                    className="btn border-left"
                  >
                    <span>+</span> Add
                  </a>
                  <a href="#" className="btn border-left">
                    Cancel
                  </a>
                </div>
              </div>
            </div>
            {columnSearchText.trim() != "" && typeOfSearchColumn != null ? (
              <div className="tableheader">
                <ul class="submenu accordion mt-0" style={{ display: "block" }}>
                  <li>
                    <a className="cursor result">RESULTS</a>
                  </li>
                  <li>
                    <a
                      className="cursor"
                      onClick={handleBundleItemSaveAndContinue}
                    >
                      PM125
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor"
                      onClick={handleBundleItemSaveAndContinue}
                    >
                      PM2
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor lastOption text-violet"
                      onClick={handleCreateNewServiceBundle}
                    >
                      <span className="mr-2">+</span>Create New{" "}
                      {typeOfSearch != null
                        ? typeOfSearch.value == "bundle"
                          ? "Bundle"
                          : typeOfSearch.value == "service"
                          ? "Service"
                          : typeOfSearch.value == "portfolioItem"
                          ? "Portfolio Item"
                          : ""
                        : ""}
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openSearchService}
        onHide={() => setOpenSearchService(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body className="">
          Search Service
          <div className="maintableheader bg-white mt-3 border-radius-10">
            <div className="d-flex justify-content-between align-items-center pl-2">
              <div className="d-flex align-items-center">
                <div className="customselect d-flex ml-3">
                  {/* <span>
                                        <a href="#" className="btn-sm">+</a>
                                    </span> */}
                  <Select
                    onChange={handleTypeOfSearchChange}
                    isClearable={true}
                    value={typeOfSearch}
                    options={columnSearchKeyValue}
                    placeholder="Add by"
                  />
                </div>
                {typeOfSearch != null ? (
                  <div className="customselect d-flex ml-3">
                    <span>
                      <a href="#" className="btn-sm">
                        +
                      </a>
                    </span>
                    <Select
                      onChange={handleTypeOfSearchColumnChange}
                      isClearable={true}
                      value={typeOfSearchColumn}
                      options={typeOfSearchColumnKeyValue}
                      placeholder="Select"
                    />
                    {typeOfSearchColumn != null ? (
                      // <></>
                      <input
                        type="email"
                        class=""
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter text"
                        style={{
                          border: "none",
                          background: "transparent",
                          width: "80px",
                          fontWeight: "600",
                          paddingLeft: "10px",
                        }}
                        value={columnSearchText}
                        onChange={(e) => setColumnSearchText(e.target.value)}
                      ></input>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <div className="">
                  <a
                    href="#"
                    style={{ cursor: "pointer" }}
                    className="btn border-left"
                  >
                    <span>+</span> Add
                  </a>
                  <a href="#" className="btn border-left">
                    Cancel
                  </a>
                </div>
              </div>
            </div>
            {columnSearchText.trim() != "" && typeOfSearchColumn != null ? (
              <div className="tableheader">
                <ul class="submenu accordion mt-0" style={{ display: "block" }}>
                  <li>
                    <a className="cursor result">RESULTS</a>
                  </li>
                  <li>
                    <a
                      className="cursor"
                      onClick={() => (window.location.href = "/service/new")}
                    >
                      PM125
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor"
                      onClick={() => (window.location.href = "/service/new")}
                    >
                      PM2
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor lastOption text-violet"
                      onClick={() => (window.location.href = "/service/new")}
                    >
                      <span className="mr-2">+</span>Create New{" "}
                      {typeOfSearch != null
                        ? typeOfSearch.value == "bundle"
                          ? "Bundle"
                          : typeOfSearch.value == "service"
                          ? "Service"
                          : typeOfSearch.value == "portfolioItem"
                          ? "Portfolio Item"
                          : ""
                        : ""}
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showExplore}
        onHide={handleCloseExplore}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-0">
          <div className="bg-white border-bottom">
            <div className="d-flex align-items-center justify-content-between">
              <div></div>
              <div>
                <a href="#" className="btn border-left">
                  + Add
                </a>
                <a href="#" className="btn border-left">
                  Cancel
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-2">
            <h5>Available portfolios</h5>
            <h6>
              Baed on your choosen search criteria following portfolios are
              available,and you may click on choose to add the portfolio to the
              solution
            </h6>
            <div>
              <div class="contain-slider mt-3">
                <OwlCarousel
                  items={3}
                  className="owl-theme"
                  loop
                  margin={10}
                  nav
                >
                  <div class="item">
                    <a href="#" className="bg-yellow text-white btn">
                      CV agreement
                    </a>
                    <h4 className="text-red mt-3">
                      <b>$20,000</b>
                    </h4>
                    <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                      <li className="mt-3" style={{ listStyle: "disc" }}>
                        Cover for all models of the fleet starting from the base
                        model
                      </li>
                      <li className="mt-3" style={{ listStyle: "disc" }}>
                        Periodic maintenace triggered every 3 months
                      </li>
                    </ul>
                    <a href="#" class="btn bg-primary text-white Choose-btn">
                      Choose
                    </a>
                  </div>
                  <div class="item">
                    <a href="#" className="bg-primary  text-white btn">
                      Repair Service
                    </a>
                    <h4 className="text-red mt-3">
                      <b>$20,000</b>
                    </h4>
                    <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                      <li className="mt-3" style={{ listStyle: "disc" }}>
                        Cover for all models of the fleet starting from the base
                        model
                      </li>
                      <li className="mt-3" style={{ listStyle: "disc" }}>
                        Periodic maintenace triggered every 3 months
                      </li>
                    </ul>
                    <a href="#" class="btn bg-primary text-white Choose-btn">
                      Choose
                    </a>
                  </div>
                  <div class="item">
                    <a href="#" className="bg-green-light text-white btn">
                      Maintenence service
                    </a>
                    <h4 className="text-red mt-3">
                      <b>$20,000</b>
                    </h4>
                    <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                      <li className="mt-3" style={{ listStyle: "disc" }}>
                        Cover for all models of the fleet starting from the base
                        model
                      </li>
                      <li className="mt-3" style={{ listStyle: "disc" }}>
                        Periodic maintenace triggered every 3 months
                      </li>
                    </ul>
                    <a href="#" class="btn bg-primary text-white Choose-btn">
                      Choose
                    </a>
                  </div>
                  <div class="item">
                    <h4 className="text-light">
                      <b>Repair Service</b>
                    </h4>
                    <h4 className="text-red mt-3">
                      <b>$20,000</b>
                    </h4>
                    <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                      <li className="mt-3" style={{ listStyle: "disc" }}>
                        Cover for all models of the fleet starting from the base
                        model
                      </li>
                      <li className="mt-3" style={{ listStyle: "disc" }}>
                        Periodic maintenace triggered every 3 months
                      </li>
                    </ul>
                    <a href="#" class="btn bg-primary text-white Choose-btn">
                      Choose
                    </a>
                  </div>
                </OwlCarousel>
              </div>
              <div>
                <a href="#" onClick={handleCantFound} className="btn">
                  I can't find what i need
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
