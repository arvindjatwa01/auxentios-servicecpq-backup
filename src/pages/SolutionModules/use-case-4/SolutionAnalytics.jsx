import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import { FormControlLabel, FormHelperText, Radio, RadioGroup, } from "@mui/material";
import { faFileAlt, faFolderPlus, faPlus, faShareAlt, faUpload, } from "@fortawesome/free-solid-svg-icons";

import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { GET_RECENT_SOLUTION_PORTFOLIO_LIST } from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import contract from "../../../assets/icons/svg/contract.svg";
import Portfoliosicon from "../../../assets/icons/svg/Portfolios-icon.svg";

import LoadingProgress from "pages/Repair/components/Loader";
import SolutionQuerySearchMaster from "./SolutionQuerySearchMaster";
import { SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE } from "navigation/CONSTANTS";
import SolutionPortfolioTemplateSearch from "./SolutionPortfolioTemplateSearch";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import { IS_PORTFOLIO, IS_SOLUTION, PORTFOLIO_SEARCH, SOLUTION_SEARCH, } from "pages/Common/PortfolioAndSolutionConstants";

const SolutionAnalytics = () => {
  const history = useHistory();
  const [recenetSolutions, setRecenetSolutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSolutionTypeSelectModel, setShowSolutionTypeSelectModel] = useState(false);
  const [showSolutionCreateModel, setShowSolutionCreateModel] = useState(false);
  const [showSolutionTemplateSearchModel, setShowSolutionTemplateSearchModel] = useState(false);
  const [selectedSolutionTemplate, setSelectedSolutionTemplate] = useState(null);
  const [searchedPortfolioList, setSearchedPortfolioList] = useState([]);
  const [searchedSolutionList, setSearchedSolutionList] = useState([]);

  useEffect(() => {
    getRecentSolutions();
  }, []);

  const getRecentSolutions = () => {
    setLoading(true);
    const rUrl = GET_RECENT_SOLUTION_PORTFOLIO_LIST + "/recent";
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          setRecenetSolutions(response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  // handle Solution Type Select Model
  const handleSolutionTypeSelectModel = () => {
    setShowSolutionTypeSelectModel(!showSolutionTypeSelectModel);
  };

  // handle choose Solution Type Modal
  const handleSolutionCreateModel = () => {
    handleSolutionTypeSelectModel();
    setShowSolutionCreateModel(true);
  };

  // Search Portfolio Template Model
  const handleShowPortfolioSearcTemplateModel = () => {
    setShowSolutionCreateModel(false);
    setShowSolutionTemplateSearchModel(true);
  };

  // Search Portfolio Template Model Hide
  const handleHidePortfolioSearcTemplateModel = () => {
    setShowSolutionTemplateSearchModel(false);
    setSelectedSolutionTemplate(null);
    setSearchedPortfolioList([]);
    setSearchedSolutionList([]);
  };

  // Solution type select Model Types are (Maintenance|Repair|Routine|Equipment)
  const solutionTypeSelectModel = () => {
    return (
      <Modal
        show={showSolutionTypeSelectModel}
        onHide={handleSolutionTypeSelectModel}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          className="align-items-center"
          style={{ background: "#F0F0F0" }}
        >
          <Modal.Title>
            <b>Select the solution you want to build</b>
          </Modal.Title>
          <button className="btn text-white bg-primary">
            Request for help!
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4">
            <div className="row">
              <div className="col-md-6 my-3">
                <div className="px-4">
                  <div className="mr-2">
                    <img src={Portfoliosicon}></img>
                  </div>
                  <h5 className="text-light mt-3">Maintenance Solutions</h5>
                  <p className="mt-2">
                    Develop solutions for maintenance including long term
                    contracts
                  </p>
                  <Button
                    className="btn bg-primary text-white py-2"
                    style={{ textTransform: "none" }}
                    onClick={handleSolutionCreateModel}
                  >
                    Continue <ArrowForwardIosIcon className="ml-2" />
                  </Button>
                </div>
              </div>
              <div className="col-md-6 my-3 ">
                <div className="px-4">
                  <div className="mr-2">
                    <img src={contract}></img>
                  </div>
                  <h5 className="text-light mt-3">Repair Solutions</h5>
                  <p className="mt-2">
                    Develop solutions for repair, overhaul and rebuild
                  </p>
                  <Button
                    className="btn bg-primary text-white py-2"
                    style={{ textTransform: "none" }}
                    onClick={handleSolutionCreateModel}
                  >
                    Continue <ArrowForwardIosIcon className="ml-2" />
                  </Button>
                </div>
              </div>
              <div className="col-md-6 my-3 ">
                <div className="px-4">
                  <div className="mr-2">
                    <DesignServicesOutlinedIcon style={{ fontSize: "66px" }} />
                  </div>
                  <h5 className="text-light mt-3">
                    {" "}
                    Routine Maintenance Tasks
                  </h5>
                  <p className="mt-2">
                    Develop solutions for routine maintenance task such as
                    preventive maintenace
                  </p>
                  <Button
                    className="btn bg-primary text-white py-2"
                    style={{ textTransform: "none" }}
                    onClick={handleSolutionCreateModel}
                  >
                    Continue <ArrowForwardIosIcon className="ml-2" />
                  </Button>
                </div>
              </div>
              <div className="col-md-6 my-3 ">
                <div className="px-4">
                  <div className="mr-2">
                    <DesignServicesOutlinedIcon style={{ fontSize: "66px" }} />
                  </div>
                  <h5 className="text-light mt-3">Equipment Solutions</h5>
                  <p className="mt-2">
                    Develop solutions for new equipments such as customisation
                    or instalation etc.
                  </p>
                  <Button
                    className="btn bg-primary text-white py-2"
                    style={{ textTransform: "none" }}
                    onClick={handleSolutionCreateModel}
                  >
                    Continue <ArrowForwardIosIcon className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  // choose the solution type (Develop New || Pre configure)
  const solutionCreateOptionChooseModel = () => {
    return (
      <Modal
        show={showSolutionCreateModel}
        onHide={() => setShowSolutionCreateModel(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          className="align-items-center"
          style={{ background: "#F0F0F0" }}
        >
          <Modal.Title>
            <b>Choose the option to create solutions</b>
          </Modal.Title>
          <button className="btn text-white bg-primary">
            Explore available solution
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4">
            <div className="row">
              <div className="col-md-6 my-3">
                <div className="px-4">
                  <div className="mr-2">
                    <img src={Portfoliosicon}></img>
                  </div>
                  <h5 className="text-light mt-3">Pre-configured solution</h5>
                  <p className="mt-2">
                    <b>
                      Get started with pre-configured solution, customise to
                      your need and convert to a quote.
                    </b>
                  </p>
                  <p className="mt-2">
                    Your product experts have built pre-configured solution for
                    your miantenance and repair needs.
                  </p>
                  <Button
                    className="btn bg-primary text-white py-2"
                    style={{ textTransform: "none" }}
                    onClick={handleShowPortfolioSearcTemplateModel}
                  >
                    Continue <ArrowForwardIosIcon className="ml-2" />
                  </Button>
                </div>
              </div>
              <div className="col-md-6 my-3 ">
                <div className="px-4">
                  <div className="mr-2">
                    <img src={contract}></img>
                  </div>
                  <h5 className="text-light mt-3">Develop new solutions</h5>
                  <p className="mt-2">
                    <b>
                      Develop a new solution with the help of the builder
                      platform
                    </b>
                  </p>
                  <p className="mt-2">
                    Collaborate with product and solution experts to built new
                    solutions.
                  </p>
                  <Button
                    className="btn bg-primary text-white py-2"
                    style={{ textTransform: "none" }}
                    onClick={handleDeployedNewSolution}
                  >
                    Continue <ArrowForwardIosIcon className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  // Portfolio || Solution Template Select & Search
  const solutionPortfolioTemplateSearchModel = () => {
    return (
      <Modal
        show={showSolutionTemplateSearchModel}
        onHide={handleHidePortfolioSearcTemplateModel}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header
          className="align-items-center"
          style={{ background: "#F0F0F0" }}
        >
          <Modal.Title>
            <b>Search Portfolio Template</b>
          </Modal.Title>
          <button className="btn text-white bg-primary">Guided Solution</button>
        </Modal.Header>
        <Modal.Body className="">
          <div className="w-100 border-radius-10 mt-3">
            <div className="d-flex">
              <div className="w-100">
                <div className="maintableheader bg-white border-radius-10 p-2 h-100">
                  <RadioGroup
                    className="my-2 row"
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue="top"
                    value={selectedSolutionTemplate}
                    onChange={handleSolutionTemplateSelect}
                  >
                    <div className="w-50 customFormControlLabel col-md-6 ">
                      <div
                        className=" m-0 mb-3 bg-light-dark p-2 card py-4 align-itemsstart"
                        style={{ height: "160px" }}
                      >
                        <FormControlLabel
                          className=" "
                          value={IS_PORTFOLIO}
                          control={
                            <Radio
                              className="mx-1"
                              checked={
                                selectedSolutionTemplate === IS_PORTFOLIO
                              }
                            />
                          }
                          label="Portfolio"
                          labelPlacement="bottom"
                        />
                        <FormHelperText
                          className="pl-5"
                          children="Portfolio is a service offering by your company or your department. Portfolio can contain service bundles or unique services or both."
                        />
                      </div>
                    </div>
                    <div className="w-50 customFormControlLabel col-md-6">
                      <div
                        className=" m-0 mb-3 bg-light-dark p-2 card py-4 align-itemsstart "
                        style={{ height: "160px" }}
                      >
                        <FormControlLabel
                          className=""
                          value={IS_SOLUTION}
                          control={
                            <Radio
                              className="mx-1"
                              checked={selectedSolutionTemplate == IS_SOLUTION}
                            />
                          }
                          label="Solution"
                          labelPlacement="bottom"
                        />
                        <FormHelperText
                          className="pl-5"
                          children="A Service Program is initiated by your markting deparrtment as compaigns or product team for improvement and safety programs."
                        />
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
          <div className="maintableheader bg-white mt-2 border-radius-10">
            <SolutionQuerySearchMaster
              searchFlag={
                selectedSolutionTemplate === IS_PORTFOLIO
                  ? PORTFOLIO_SEARCH
                  : selectedSolutionTemplate === IS_SOLUTION
                    ? SOLUTION_SEARCH
                    : ""
              }
              setSearchedResult={
                selectedSolutionTemplate === IS_PORTFOLIO
                  ? setSearchedPortfolioList
                  : selectedSolutionTemplate === IS_SOLUTION
                    ? setSearchedSolutionList
                    : null
              }
            />
            {!isEmpty(selectedSolutionTemplate) &&
              (searchedPortfolioList.length !== 0 ||
                searchedSolutionList.length !== 0) && (
                <SolutionPortfolioTemplateSearch
                  selectedSolutionTemplate={selectedSolutionTemplate}
                  searchedPortfolioList={searchedPortfolioList}
                  searchedSolutionList={searchedSolutionList}
                  searchedTemplateList={
                    selectedSolutionTemplate === IS_SOLUTION
                      ? searchedSolutionList
                      : selectedSolutionTemplate === IS_PORTFOLIO
                        ? searchedPortfolioList
                        : []
                  }
                />
              )}
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  // handle Select Template Portfolio || Solution
  const handleSolutionTemplateSelect = (e) => {
    setSelectedSolutionTemplate(e.target.value);
    if (e.target.value === IS_PORTFOLIO) {
      setSearchedSolutionList([]);
    } else if (e.target.value === IS_SOLUTION) {
      setSearchedPortfolioList([]);
    }
  };

  // hnadle click on Deployed New Solution
  const handleDeployedNewSolution = () => {
    history.push({
      pathname: SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE,
      state: {
        portfolioId: "",
        type: "new",
      },
    });
  };

  // view the selected Soltuion Details
  const handelViewSolutionDetails = (solutionRow) => {
    history.push({
      pathname: SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE,
      state: {
        portfolioId: solutionRow.customPortfolioId,
        type: "fetch",
      },
    });
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Solution Builder</h5>
            <div>
              <a
                onClick={handleSolutionTypeSelectModel}
                className="btn cursor bg-primary text-white"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Create New<span className="ml-2"></span>
              </a>
            </div>
          </div>
          <div className="card p-4 mt-5">
            <div className="mt-1">
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">
                  RECENT SOLUTIONS
                </h6>
                {loading ? (
                  <LoadingProgress />
                ) : (
                  <div className="row">
                    {recenetSolutions.length !== 0 &&
                      recenetSolutions.map((solution, i) => (
                        <div className="col-md-4">
                          <div className="recent-items mt-3">
                            <div className="d-flex justify-content-between align-items-center ">
                              <p className="mb-0 overflow-hidden white-space">
                                <FontAwesomeIcon
                                  className=" font-size-14"
                                  icon={faFileAlt}
                                />
                                <span className="font-weight-500 ml-2">
                                  {!isEmpty(solution.name)
                                    ? solution.name
                                    : solution.description}
                                </span>
                              </p>
                              <div className="d-flex align-items-center">
                                <a className="btn-sm cursor">
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    onClick={() =>
                                      handelViewSolutionDetails(solution)
                                    }
                                  />
                                </a>
                                <a className="ml-3 cursor font-size-14">
                                  <FontAwesomeIcon icon={faShareAlt} />
                                </a>
                                <a className="ml-3 cursor font-size-14">
                                  <FontAwesomeIcon icon={faFolderPlus} />
                                </a>
                                <a className="ml-3 cursor font-size-14">
                                  <FontAwesomeIcon icon={faUpload} />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <p className="font-size-12 mb-0">
                              {getFormatDateTime(solution.updatedAt, true)}
                            </p>
                            <p className="font-size-12 mb-0">
                              Portfolio Solution
                            </p>
                          </div>
                        </div>
                      ))}
                    {recenetSolutions.length === 0 && (
                      <p className="font-size-12 mb-0 ml-3">
                        No Recent Solutions
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSolutionTypeSelectModel && solutionTypeSelectModel()}
      {showSolutionCreateModel && solutionCreateOptionChooseModel()}
      {showSolutionTemplateSearchModel && solutionPortfolioTemplateSearchModel()}

    </>
  );
};

export default SolutionAnalytics;