import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import React, { useEffect, useState } from "react";
import {
  AddOperation,
  fetchOperations,
  fetchPartlistFromOperation,
  FetchServiceHeader,
  updatePartlistActive,
} from "services/repairBuilderServices";
import {
  getComponentCodeSuggetions,
  jobCodeSearch,
} from "services/searchServices";
import SearchBox from "./components/SearchBox";
import { NEW_OPERATION } from "./CONSTANTS";
import LoadingProgress from "./components/Loader";
import {
  FormControlLabel,
  FormGroup,
  Radio,
  Switch,
  Tooltip,
} from "@mui/material";
import { ReadOnlyField } from "./components/ReadOnlyField";
import EditIcon from "@mui/icons-material/EditOutlined";

function ServiceOnlyTemplateOperation(props) {
  const { activeElement, setActiveElement } = props.templateDetails;
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [searchJobCodeResults, setSearchJobCodeResults] = useState([]);
  const [searchCompCodeResults, setSearchCompCodeResults] = useState([]);
  const [operationViewOnly, setOperationViewOnly] = useState(false);
  const [operations, setOperations] = useState([]);
  const [noOptionsCompCode, setNoOptionsCompCode] = useState(false);
  const [noOptionsJobCode, setNoOptionsJobCode] = useState(false);
  const [showAddNewButton, setShowAddNewButton] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const newOperation = {
    header: NEW_OPERATION,
    operationNumber: "",
    jobCode: "",
    componentCode: "",
    componentCodeDescription: "",
    jobCodeDescription: "",
    modifier: "",
    id: "",
    description: "",
    required: true,
    partlists: [],
    serviceEstimation: "",
  };
  const [operationData, setOperationData] = useState(newOperation);
  useEffect(() => {
    fetchOperationsOfSegment();
  }, []);

  const [opIndex, setOpIndex] = useState(0);
  const fetchOperationsOfSegment = async () => {
    setOperationLoading(true);
    if (activeElement.sId) {
      await fetchOperations(activeElement.sId)
        .then(async (result) => {
          let operationsFetched = result?.operations;
          if (operationsFetched?.length > 0) {
            setOperations(operationsFetched);
            setOperationViewOnly(true);
            // Default last operation or selected operation for back traverse from service estimate
            let opToLoad = operationData?.id
              ? operationsFetched.filter((x) => x.id === operationData.id)[0]
              : activeElement.oId
                ? operationsFetched.filter((x) => x.id === activeElement.oId)[0]
                : operationsFetched[operationsFetched.length - 1];
            setOpIndex(
              operationsFetched.findIndex((obj) => {
                return obj.id === opToLoad.id;
              })
            );
            let groupedPartList = "";
            let serviceEstimate = "";
            await fetchPartlistFromOperation(opToLoad.id).then(
              (resultPartlists) => {
                groupedPartList = groupBy(resultPartlists, "partlistId");
                // console.log(groupedPartList);
              }
            );
            await FetchServiceHeader(opToLoad.id)
              .then((resServiceEstimation) => {
                serviceEstimate = resServiceEstimation;
              })
              .catch((err) => {
                console.log(err);
              });
            setOperationData({
              ...opToLoad,
              partlists: groupedPartList,
              serviceEstimation: serviceEstimate,
              header:
                "Operation " +
                formatOperationNum(opToLoad.operationNumber) +
                " - " +
                opToLoad.jobCodeDescription +
                " " +
                opToLoad.componentCodeDescription, //Rename after modifications in UI
            });
            setOperationLoading(false);
          } else {
            loadNewOperationUI();
            setOperationLoading(false);
          }
        })
        .catch((err) => {
          loadNewOperationUI();
          handleSnack(
            "error",
            "Error occurred while fetching the existing operations!"
          );
          setOperationLoading(false);
        });
    } else {
      setOperationLoading(false);
      handleSnack("error", "Not a valid segment!");
    }
  };

  function formatOperationNum(num) {
    return String(num).padStart(3, "0");
  }

  function groupBy(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
      if (!hash[array[i][property]]) hash[array[i][property]] = [];
      hash[array[i][property]].push(array[i]);
    }
    return hash;
  }
  // To indicate whether segment price will be included in total price
  const handleChangeSwitch = (event) => {
    let sid = activeElement?.sId;
    AddOperation(sid, {
      id: operationData.id,
      required: event.target.checked,
    })
      .then((result) => {
        setOperationData({ ...operationData, required: result.required });
        handleSnack("success", "Operation updated successfully!");
      })
      .catch((e) => {
        handleSnack("error", "Error occured while updating the details!");
      });
  };

  // Search Job Code
  const handleJobCodeSearch = async (searchText) => {
    setSearchJobCodeResults([]);
    operationData.jobCode = searchText;
    if (searchText) {
      await jobCodeSearch("jobCode~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchJobCodeResults(result);
            setNoOptionsJobCode(false);
          } else {
            setNoOptionsJobCode(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the customer!");
        });
    }
  };
  // Select the job code from search result
  const handleJobCodeSelect = (type, currentItem) => {
    setOperationData({
      ...operationData,
      jobCode: currentItem.jobCode,
      jobCodeDescription: currentItem.description,
      description:
        currentItem.description && operationData.componentCodeDescription
          ? currentItem.description +
          " " +
          operationData.componentCodeDescription
          : "",
    });
    setSearchJobCodeResults([]);
  };

  const handleChange = async (id) => {
    await updatePartlistActive(id)
      .then((result) => {
        if (result) {
          fetchPartlistFromOperation(operationData.id).then(
            (resultPartlists) => {
              let groupedPartList = groupBy(resultPartlists, "partlistId");
              // console.log(groupedPartList);
              setOperationData({
                ...operationData,
                partlists: groupedPartList,
                header:
                  "Operation " +
                  formatOperationNum(operationData.operationNumber) +
                  " - " +
                  operationData.jobCodeDescription +
                  " " +
                  operationData.componentCodeDescription, //Rename after modifications in UI
              });
            }
          );
          handleSnack(
            "success",
            "This partlist has been activated for the builder!"
          );
        }
      })
      .catch((e) => {
        // console.log(e);
        handleSnack(
          "error",
          "Error occurred while making the partlist version active!"
        );
      });
  };

  // Search component code
  const handleComponentCodeSearch = async (searchText) => {
    setSearchCompCodeResults([]);
    operationData.componentCode = searchText;
    if (searchText) {
      await getComponentCodeSuggetions("componentCode~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchCompCodeResults(result);
            setNoOptionsCompCode(false);
          } else {
            setNoOptionsCompCode(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the component!");
        });
    }
  };
  // Select the job code from search result
  const handleCompCodeSelect = (type, currentItem) => {
    setOperationData({
      ...operationData,
      componentCode: currentItem.componentCode,
      componentCodeDescription: currentItem.description,
      // description: currentItem.componentCode + " - " + currentItem.description,
      description:
        operationData.jobCodeDescription && currentItem.description
          ? operationData.jobCodeDescription + " " + currentItem.description
          : "",
    });
    setSearchCompCodeResults([]);
  };

  // To display the notifications
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  const handleAnchors = async (direction, index) => {
    if (direction === "backward") {
      if (opIndex > 0) setOpIndex(opIndex - 1);
      let groupedPartList = "";
      let serviceEstimate = "";
      await fetchPartlistFromOperation(operations[index].id).then(
        (resultPartlists) => {
          groupedPartList = groupBy(resultPartlists, "partlistId");
          // console.log(groupedPartList);
        }
      );
      await FetchServiceHeader(operations[index].id)
        .then((resServiceEstimation) => {
          serviceEstimate = resServiceEstimation;
        })
        .catch((err) => {
          console.log(err);
        });

      setOperationData({
        ...operations[index],
        header:
          "Operation " +
          formatOperationNum(operations[index]?.operationNumber) +
          " - " +
          operations[index]?.description, //Rename once changed in API
        partlists: groupedPartList,
        serviceEstimation: serviceEstimate,
      });
    } else if (direction === "forward") {
      if (
        operations[operations.length - 1].header === NEW_OPERATION &&
        operations.length - 1 === index
      ) {
        setOperationData({ ...operations[index] });
        setOperationViewOnly(false);
      } else {
        if (operations.length - 1 > opIndex) setOpIndex(opIndex + 1);
        let groupedPartList = "";
        let serviceEstimate = "";
        await fetchPartlistFromOperation(operations[index].id).then(
          (resultPartlists) => {
            groupedPartList = groupBy(resultPartlists, "partlistId");
            // console.log(groupedPartList);
          }
        );
        await FetchServiceHeader(operations[index].id)
          .then((resServiceEstimation) => {
            serviceEstimate = resServiceEstimation;
          })
          .catch((err) => {
            console.log(err);
          });
        setOperationData({
          ...operations[index],
          header:
            "Operation " +
            formatOperationNum(operations[index].operationNumber) +
            " - " +
            operations[index].description, //Rename
          serviceEstimation: serviceEstimate,
          partlists: groupedPartList,
        });
      }
    }
  };

  const handleCreateOperation = () => {
    let sid = activeElement?.sId;
    let data = {
      ...(operationData.id && { id: operationData.id }),
      jobCode: operationData.jobCode,
      jobCodeDescription: operationData.jobCodeDescription,
      componentCode: operationData.componentCode,
      componentCodeDescription: operationData.componentCodeDescription,
      // modifier: operationData.modifier,
      description: operationData.description,
    };
    AddOperation(sid, data)
      .then((result) => {
        fetchOperationsOfSegment();
        setOperationData({
          ...operationData,
          operationNumber: result.operationNumber,
          id: result.id,
          header:
            "Operation " +
            formatOperationNum(result.operationNumber) +
            " - " +
            result.description, //Rename to description once API is changed
        });
        // console.log(operationData)
        operations[opIndex] = result;
        setShowAddNewButton(true);
        setOperationViewOnly(true);
        handleSnack(
          "success",
          `Successfully added Operation ${result.operationNumber} details!`
        );
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while saving the operation data!");
      });
  };
  const loadNewOperationUI = () => {
    setOperationViewOnly(false);
    setOperationData(newOperation);
    operations.push(newOperation);
    setOpIndex(operations.length - 1);
    setShowAddNewButton(false);
  };
  const makeHeaderEditable = () => {
    if (operationViewOnly) setOperationViewOnly(false);
  };

  const handleCancelOperation = () => {
    if (operations.length > 1) {
      if (operationData.header === NEW_OPERATION) {
        operations.splice(
          operations.findIndex((a) => a.header === NEW_OPERATION),
          1
        );
        setOpIndex(operations.length - 1);
        setOperationData({
          ...operations[operations.length - 1],
          header:
            "Operation " +
            formatOperationNum(
              operations[operations.length - 1].operationNumber
            ) +
            " - " +
            operations[operations.length - 1].description,
        });
      } else {
        setOperationData(operations[opIndex]);
      }
      setShowAddNewButton(true);
      setOperationViewOnly(true);
    } else {
      if (operationData.header === NEW_OPERATION) {
        setActiveElement({ ...activeElement, name: "segment" });
      } else {
        setOperationData({
          ...operations[0],
          header:
            "Operation " +
            formatOperationNum(operations[0].operationNumber) +
            " - " +
            operations[0].description,
        });
        setOperationViewOnly(true);
        setShowAddNewButton(true);
      }
    }
  };

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="card p-4 mt-5">
        <div className="row align-items-center mb-0">
          <div
            className="col-md-6 col-sm-6"
            style={{ fontSize: "1rem", fontWeight: 600, color: "black" }}
          >
            <span className="mr-3 white-space">{operationData.header}</span>
            {operationViewOnly && (
              <span className="btn-sm cursor">
                <Tooltip title="Edit">
                  <EditIcon
                    onClick={() =>
                      ["DRAFT", "REVISED"].indexOf(
                        activeElement?.templateStatus
                      ) > -1
                        ? makeHeaderEditable()
                        : handleSnack(
                          "info",
                          "Set revised status to modify active builders"
                        )
                    }
                  />
                </Tooltip>
              </span>
            )}
          </div>
          <div className="col-md-6 col-sm-6 align-items-center mb-0 ">
            <div className="justify-content-end text-right">
              <button
                onClick={() => handleAnchors("backward", opIndex - 1)}
                className="btn-no-border"
                disabled={
                  !(
                    opIndex > 0 ||
                    (operationData.header === NEW_OPERATION &&
                      operations.length > 1)
                  )
                }
              >
                <KeyboardArrowLeftIcon />
              </button>
              <span className="text-primary">{operationData.header}</span>
              <button
                onClick={() => handleAnchors("forward", opIndex + 1)}
                className="btn-no-border"
                disabled={
                  opIndex === operations.length - 1 ||
                  operationData.header === NEW_OPERATION
                }
              >
                <KeyboardArrowRightIcon />
              </button>
              {showAddNewButton &&
                ["DRAFT", "REVISED"].indexOf(activeElement?.templateStatus) >
                -1 && (
                  <button
                    className="btn-no-border ml-2"
                    onClick={loadNewOperationUI}
                  >
                    <span className="ml-2">
                      <AddIcon />
                    </span>
                    Add New Operation
                  </button>
                )}
            </div>
          </div>
        </div>
        <div className="hr"></div>

        {operationLoading ? (
          <LoadingProgress />
        ) : !operationViewOnly ? (
          <>
            <div className="row mt-4 input-fields">
              <div className="col-md-6 col-sm-6">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    TITLE
                  </label>
                  <input
                    type="text"
                    class="form-control border-radius-10"
                    value={operationData.description}
                    onChange={(e) =>
                      setOperationData({
                        ...operationData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Auto Filled"
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6"></div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    JOB CODE
                  </label>
                  <SearchBox
                    value={operationData.jobCode}
                    onChange={(e) => handleJobCodeSearch(e.target.value)}
                    type="jobCode"
                    result={searchJobCodeResults}
                    onSelect={handleJobCodeSelect}
                    noOptions={noOptionsJobCode}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    JOB CODE DESCRIPTION
                  </label>
                  <input
                    type="text"
                    class="form-control border-radius-10"
                    value={operationData.jobCodeDescription}
                    disabled
                    placeholder="Auto Filled"
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    COMPONENT CODE
                  </label>
                  <SearchBox
                    value={operationData.componentCode}
                    onChange={(e) => handleComponentCodeSearch(e.target.value)}
                    type="componentCode"
                    result={searchCompCodeResults}
                    onSelect={handleCompCodeSelect}
                    noOptions={noOptionsCompCode}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    COMPONENT CODE DESCRIPTION
                  </label>
                  <input
                    type="text"
                    class="form-control border-radius-10"
                    value={operationData.componentCodeDescription}
                    placeholder="Auto Filled"
                    disabled
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
            </div>

            <div className=" text-right">
              {operations.length > 0 && (
                <button
                  className="btn border bg-primary text-white mr-2"
                  onClick={handleCancelOperation}
                >
                  Cancel
                </button>
              )}
              <button
                className="btn border bg-primary text-white"
                onClick={handleCreateOperation}
                disabled={
                  !(
                    operationData.componentCode &&
                    operationData.componentCodeDescription &&
                    operationData.jobCode &&
                    operationData.jobCodeDescription &&
                    operationData.description
                  ) ||
                  noOptionsCompCode ||
                  noOptionsJobCode
                }
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <React.Fragment>
            <div className="row mt-4">
              <div className="col-md-12 col-sm-12 mb-4">
                <div className=" d-flex justify-content-between align-items-center">
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={operationData.required}
                            onChange={handleChangeSwitch}
                            name="operationRequired"
                          />
                        }
                        label="REQUIRED"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <ReadOnlyField
                label="OPERATION #"
                value={String(operationData.operationNumber).padStart(3, "0")}
                className="col-md-6 col-sm-6"
              />

              <ReadOnlyField
                label="TITLE"
                value={operationData.description}
                className="col-md-6 col-sm-6"
              />

              <ReadOnlyField
                label="JOB CODE"
                value={
                  operationData.jobCode +
                  " - " +
                  operationData.jobCodeDescription
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="COMPONENT CODE"
                value={
                  operationData.componentCode +
                  " - " +
                  operationData.componentCodeDescription
                }
                className="col-md-4 col-sm-4"
              />
            </div>
            {((operationData.partlists &&
              Object.entries(operationData.partlists).length > 0) ||
              operationData.serviceEstimation?.netPrice > 0) && (
                <>
                  <h5 className="d-flex align-items-center  mx-2">
                    <div className="" style={{ display: "contents" }}>
                      <span className="mr-3 white-space">Summary</span>
                    </div>
                    <div className="hr"></div>
                  </h5>
                  <div className="row">
                    {operationData.partlists &&
                      Object.entries(operationData.partlists).length > 0 &&
                      Object.entries(operationData.partlists)?.map((partList) => {
                        return (
                          <div className="col-md-6">
                            <div
                              className="card border"
                              style={{ overflow: "hidden" }}
                            >
                              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
                                <div className="" style={{ display: "contents" }}>
                                  <span className="mr-3 white-space font-size-14 text-white">
                                    {partList[1][0].partlistId} - Part list
                                  </span>
                                </div>
                                <div className="d-flex"></div>
                              </div>
                              {partList[1].map(
                                (partlistVersion, indexPartList) => (
                                  <div className="bg-white px-3 pt-4 pb-2">
                                    <div className="d-flex align-items-center justify-content-between mb-0">
                                      <div className="">
                                        <span className="mr-2 font-size-14 font-weight-500 mr-2">
                                          {partlistVersion.description}
                                        </span>
                                        <a
                                          href="#"
                                          className="btn-sm text-white bg-primary"
                                        >
                                          Version {partlistVersion.versionNumber}
                                        </a>
                                      </div>
                                      <div style={{ textAlign: "right" }}>
                                        {/* <a href="#" class="text-light-black font-size-12">
                          Go to Version{" "}
                          <span className="text-light-black">
                            <ArrowForwardIosOutlinedIcon />
                          </span>
                        </a> */}
                                        <Radio
                                          checked={partlistVersion.activeVersion}
                                          onChange={() =>
                                            handleChange(partlistVersion.id)
                                          }
                                          value="a"
                                          name="radio-buttons"
                                          inputProps={{ "aria-label": "A" }}
                                        />
                                      </div>
                                    </div>
                                    {/* <hr></hr> */}
                                    <div className="row my-4">
                                      <div className="col-7">
                                        <div className="d-flex">
                                          <p className="mr-2 font-size-14 font-weight-500 mr-2">
                                            Total Parts
                                          </p>
                                          <p className=" font-size-14 font-weight-600 text-primary">
                                            {partlistVersion.totalParts}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-5">
                                        <div class="d-flex justify-content-end">
                                          <p class="mr-2 font-size-14 font-weight-500 mr-2">
                                            Total Cost
                                          </p>
                                          <p className=" font-size-14 font-weight-600 text-primary">
                                            $ {partlistVersion.totalPrice ? parseFloat(partlistVersion.totalPrice).toFixed(2) : 0.00}
                                          </p>
                                        </div>
                                      </div>
                                    </div><div className="row mb-4">
                                      <div className="col-4">
                                        <div class="d-flex">
                                          <p className="mr-2 font-size-14 font-weight-500">
                                            New
                                          </p>
                                          <p className="font-size-14 font-weight-600 text-primary align-items-center">
                                            {partlistVersion.totalNewParts}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-4">
                                        <div class="d-flex">
                                          <p className="mr-2 font-size-14 font-weight-500 mr-2">
                                            Refurbished
                                          </p>
                                          <p className="font-size-14 font-weight-600 text-primary">
                                            {
                                              partlistVersion.totalRefurbishedParts
                                            }
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-4">
                                        <div class="d-flex justify-content-end">
                                          <p className="mr-2 font-size-14 font-weight-500 mr-2">
                                            Reman
                                          </p>
                                          <p className="font-size-14 font-weight-600 text-primary">
                                            {partlistVersion.totalRemanParts}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    {partList[1].length - 1 > indexPartList && (
                                      <div className="hr"></div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        );
                      })}
                    {/* </div>
                <div className="row"> */}
                    {operationData.serviceEstimation?.netPrice > 0 && (
                      <div className="col-md-6">
                        <div
                          className="card border"
                          style={{ overflow: "hidden" }}
                        >
                          <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
                            <div className="" style={{ display: "contents" }}>
                              <span className="mr-3 white-space font-size-14 text-white">
                                {
                                  operationData.serviceEstimation
                                    .serviceEstimateId
                                }
                                - Service Estimation
                              </span>
                            </div>
                            <div className="d-flex"></div>
                          </div>

                          <div className="bg-white px-3 pt-4 pb-2">
                            <div className="d-flex align-items-center justify-content-between mb-0">
                              <div className="">
                                <span className="mr-2 font-size-14 font-weight-500 mr-2">
                                  {operationData.serviceEstimation.jobOperation}
                                </span>
                                <a
                                  href="#"
                                  className="btn-sm text-white bg-primary"
                                >
                                  Version 1
                                </a>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                {/* <a href="#" class="text-light-black font-size-12">
                          Go to Version{" "}
                          <span className="text-light-black">
                            <ArrowForwardIosOutlinedIcon />
                          </span>
                        </a> */}
                                <Radio
                                  checked={true}
                                  // onChange={() =>
                                  //   handleChange(
                                  //     operationData.serviceEstimation.id
                                  //   )
                                  // }
                                  value="a"
                                  name="radio-buttons"
                                  inputProps={{ "aria-label": "A" }}
                                />
                              </div>
                            </div>
                            {/* <hr></hr> */}
                            <div className="row my-4">
                              <div className="col-6">
                                <div className="d-flex">
                                  <p className="mr-2 font-size-14 font-weight-500 mr-2">
                                    Estimated Hours
                                  </p>
                                  <p className=" font-size-14 font-weight-600 text-primary">
                                    {operationData.serviceEstimation.totalParts}
                                  </p>
                                </div>
                              </div>
                              <div className="col-6">
                                <div class="d-flex d-flex justify-content-end">
                                  <p class="mr-2 font-size-14 font-weight-500 mr-2">
                                    Total Cost
                                  </p>
                                  <p className=" font-size-14 font-weight-600 text-primary">
                                    $ {operationData.serviceEstimation.netPrice}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="row my-4">
                              <div className="col-4">
                                <div class="d-flex">
                                  <p className="mr-2 font-size-14 font-weight-500 mr-2">
                                    Labor
                                  </p>
                                  <p className="font-size-14 font-weight-600 text-primary">
                                    ${" "}
                                    {operationData.serviceEstimation.labourPrice}
                                  </p>
                                </div>
                              </div>
                              <div className="col-4">
                                <div class="d-flex">
                                  <p className="mr-2 font-size-14 font-weight-500 mr-2">
                                    Consumables
                                  </p>
                                  <p className="font-size-14 font-weight-600 text-primary">
                                    ${" "}
                                    {
                                      operationData.serviceEstimation
                                        .consumablePrice
                                    }
                                  </p>
                                </div>
                              </div>
                              <div className="col-4">
                                <div class="d-flex justify-content-end">
                                  <p className="mr-2 font-size-14 font-weight-500 mr-2">
                                    Misc
                                  </p>
                                  <p className="font-size-14 font-weight-600 text-primary ">
                                    ${" "}
                                    {
                                      operationData.serviceEstimation
                                        .extraMiscellaneous
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            <div className="Add-new-segment-div p-3 border-radius-10 mb-3">
              <button
                className="btn bg-primary text-white"
                onClick={() =>
                  setActiveElement({ ...activeElement, name: "segment" })
                }
              >
                Back
              </button>
              <button
                // to="/RepairServiceEstimate"
                onClick={() =>
                  setActiveElement({
                    ...activeElement,
                    name: "service",
                    oId: operationData.id,
                  })
                }
                className="btn bg-primary text-white ml-2"
              >
                {operationData.serviceEstimation?.netPrice ? (
                  <span className="mr-1">View</span>
                ) : (
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                )}
                Service Estimate
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </>
  );
}

export default ServiceOnlyTemplateOperation;
