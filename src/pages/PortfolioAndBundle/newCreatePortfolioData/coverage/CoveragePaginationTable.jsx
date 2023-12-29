import React, { useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import $ from "jquery";

import { isEmpty, isEmptySelect } from "../utilities/textUtilities";
import { getValidateCoverage, machineSearch } from "services/searchServices";

import { getApiCall } from "services/searchQueryService";
import {
  COVERAGE_REST,
  CUSTOM_COVERAGE_REST,
  GET_SEARCH_COVERAGE,
} from "services/CONSTANTS";

import {
  createCoverage,
  createCustomCoverage,
  updateCoverage,
  updateCustomCoverage,
} from "../../../../services/index";

import { errorMessage, successMessage } from "../utilities/toastMessage";
import {
  coverageFleetSizeOptions,
  dataTableCustomStyle,
} from "pages/Common/PortfolioAndSolutionConstants";
import { API_SUCCESS } from "services/ResponseCode";
import { callDeleteApi, callGetApi } from "services/ApiCaller";
import LoadingProgress from "pages/Repair/components/Loader";

const CoveragePaginationTable = (props) => {
  const {
    tableData,
    isSelectAble,
    setCheckedCoverageData,
    className,
    handleFilterUpdateCoverageData,
    handlePortfolioCoverageIds,
    setTableData,
    useCase4 = false,
    setCoverageIds = null,
  } = props;
  const [showCoverageEditModal, setShowCoverageEditModal] = useState(false);
  const [searchedModalList, setSearchedModalList] = useState([]);
  const [modalPrefixKeyValuePair, setModalPrefixKeyValuePair] = useState([]);
  const [selectedCoverageIndex, setSelectedCoverageIndex] = useState(null);
  const [editCoverageData, setEditCoverageData] = useState({
    // coverageId: "",
    make: "",
    family: "",
    modelNo: "",
    serialNoPrefix: "",
    startSerialNumber: "",
    endSerialNumber: "",
    fleet: "",
    fleetSize: "",
    serialNumber: "",
  });

  const [showIncludedSerialNoModal, setShowIncludedSerialNoModal] =
    useState(false);
  const [includedCoverageSerialOptions, setIncludedCoverageSerialOptions] =
    useState([]);
  const [showSerialNoSearchModal, setShowSerialNoSearchModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // show hide coverage edit modal
  const handleCoverageEditModal = () => {
    setShowCoverageEditModal(!showCoverageEditModal);
  };

  // modal input search
  const handleModelSearchInput = (e) => {
    // setEditSerialNo({ ...editSerialNo, modelNo: e.target.value })
    var searchStr = "model~" + e.target.value;
    let loading, data, failure;
    getApiCall(GET_SEARCH_COVERAGE + searchStr, loading, data, failure)
      // getSearchQueryCoverage(searchStr)
      .then((res) => {
        $(`.scrollbar-model`).css("display", "block");
        setSearchedModalList(res);
        var preArr = [];
        for (var n = 0; n < res.length; n++) {
          preArr.push({ label: res[n].prefix, value: res[n].prefix });
        }
        setModalPrefixKeyValuePair(preArr);
      })
      .catch((err) => {
        return;
      });
  };

  // select search modal
  const handleSelectSearchModel = (currentItem) => {
    setEditCoverageData({
      ...editCoverageData,
      modelNo: currentItem.model,
      make: currentItem.make,
      family: currentItem.family,
    });
    $(`.scrollbar-model`).css("display", "none");
  };

  // edit coverage model text change
  const handleCoverageInputChange = (e, keyName, type) => {
    if (type === "text") {
      setEditCoverageData({ ...editCoverageData, [keyName]: e.target.value });
    } else if (type === "number") {
      setEditCoverageData({
        ...editCoverageData,
        [keyName]: parseInt(e.target.value),
      });
    } else if (type === "select") {
      setEditCoverageData({ ...editCoverageData, [keyName]: e });
    }
  };

  // coverage edit icons click action
  const handleEditCoverage = async (row, i) => {
    // handleCoverageEditModal();
    setLoading(true);
    let keyName = useCase4 ? "customCoverageId" : "coverageId";
    // const reqUrl = `${useCase4 ? CUSTOM_COVERAGE_REST() : COVERAGE_REST()}/${
    //   row[keyName]
    // }`;
    // callGetApi(
    //   null,
    //   reqUrl,
    //   (response) => {
    //     if (response.status === API_SUCCESS) {
    //       const responseData = response.data;

    //       // selected fleet Size
    //       const _fleetSize = coverageFleetSizeOptions.find(
    //         (obj) => obj.value === responseData.fleetSize
    //       );

    //       // Serial number prefix
    //       const _serialNumberPrefix = isEmpty(responseData?.serialNumberPrefix)
    //         ? ""
    //         : {
    //             label: responseData?.serialNumberPrefix,
    //             value: responseData?.serialNumberPrefix,
    //           };

    //       let prefixKeyValuePair = isEmpty(responseData.serialNumberPrefix)
    //         ? []
    //         : [_serialNumberPrefix];
    //       setModalPrefixKeyValuePair([...prefixKeyValuePair]);
    //       setEditCoverageData({
    //         ...responseData,
    //         serialNoPrefix: _serialNumberPrefix || "",
    //         fleetSize: _fleetSize || "",
    //       });
    //       setSelectedCoverageIndex(i);
    //       setLoading(false);
    //     } else {
    //       setLoading(false);
    //       errorMessage(response.data?.message);
    //     }
    //   },
    //   (error) => {
    //     setLoading(false);
    //     return;
    //   }
    // );
    var editSerialNo = "";
    const _tableData = [...tableData];
    const objMaster = _tableData[i];
    if (objMaster.coverageSubDetails) {
      editSerialNo = objMaster.coverageSubDetails[0].serialNumber?.value;
    }

    const _fleetSize = coverageFleetSizeOptions.find(
      (obj) => obj.value === row.fleetSize
    );
    const _serialNumberPrefix = isEmpty(row?.serialNumberPrefix)
      ? ""
      : {
          label: row?.serialNumberPrefix,
          value: row?.serialNumberPrefix,
        };
    let obj = {
      // coverageId: row.coverageId,
      ...row,
      serialNoPrefix: _serialNumberPrefix || "",
      fleetSize: _fleetSize || "",
    };

    let prefixKeyValuePair = isEmpty(row.serialNumberPrefix)
      ? []
      : [_serialNumberPrefix];
    setModalPrefixKeyValuePair([...prefixKeyValuePair]);
    setEditCoverageData(obj);
    setSelectedCoverageIndex(i);
    handleCoverageEditModal();
  };

  // delete selected coverage
  const handleDeleteCoverage = async (row, i) => {
    try {
      let keyName = useCase4 ? "customCoverageId" : "coverageId";
      for (let coverage of row["coverageSubDetails"]) {
        const reqUrl = `${
          useCase4 ? CUSTOM_COVERAGE_REST() : COVERAGE_REST()
        }/${coverage["coverageId"]}`;
        // }/${coverage[keyName]}`;
        callDeleteApi(
          null,
          reqUrl,
          (response) => {
            if (response.status === API_SUCCESS) {
              const updatedDate = tableData.filter((obj) => {
                if (obj["coverageId"] !== row["coverageId"]) return obj;
                // if (obj[keyName] !== row[keyName]) return obj;
              });
              // handleFilterUpdateCoverageData(updatedDate, true);
              setCoverageIds(
                (prev) =>
                  prev.filter(
                    (obj) => obj.coverageId !== coverage["coverageId"]
                  )
                // prev.filter((obj) => obj.coverageId !== coverage[keyName])
              );
            } else {
              errorMessage(response.data?.message);
            }
          },
          (error) => {
            return;
          }
        );
      }
      setTableData((prev) =>
        prev.filter((coverage) => coverage.uuid === row.uuid)
      );
    } catch (error) {
      return;
    }
  };

  // Show included serial no list modal
  const handleShowIncludeSerialNoModelBox = async (row, i) => {
    const _tableData = [...tableData];
    const obj = _tableData[i];
    if (!!obj.coverageSubDetails) {
      const _coverageSubDetails =
        obj.coverageSubDetails.length !== 0 &&
        obj.coverageSubDetails.map((coverage) => {
          if (isEmpty(coverage.startDate)) coverage.startDate = new Date();
          if (isEmpty(coverage.endDate)) coverage.endDate = new Date();
          return coverage;
        });

      const tempObj = { ...obj, coverageSubDetails: _coverageSubDetails || [] };
      _tableData[i] = tempObj;
      handleFilterUpdateCoverageData(_tableData);
    }
    var searchQueryMachine = row.modelNo ? "model~" + row.modelNo : "";
    var serialArr = [];
    await machineSearch(searchQueryMachine).then((result) => {
      for (let i = 0; i < result.length; i++) {
        serialArr.push({
          label: result[i].equipmentNumber,
          value: result[i].equipmentNumber,
        });
      }
    });
    setIncludedCoverageSerialOptions(serialArr);
    setSelectedCoverageIndex(i);
    handleIncludedSerialNoModal();
  };

  // update coverage
  const handleUpdateCoverage = async () => {
    try {
      if (!selectedCoverageIndex) {
        let keyName = useCase4 ? "customCoverageId" : "coverageId";
        const _tableData = [...tableData];
        const selectedCoverage = _tableData[selectedCoverageIndex];

        for (let coverage of selectedCoverage["coverageSubDetails"]) {
          const coverageReqObj = {
            // [keyName]: coverage[keyName],
            [keyName]: coverage["coverageId"],
            serviceId: 0,
            modelNo: editCoverageData?.modelNo,
            serialNumber:
              coverage?.serialNumber?.value || coverage?.serialNumber || "",
            startSerialNumber: editCoverageData?.startSerialNumber,
            endSerialNumber: editCoverageData?.endSerialNumber,
            serialNumberPrefix: editCoverageData?.serialNoPrefix?.value || "",
            family: editCoverageData?.family,
            make: editCoverageData?.make,
            fleet: editCoverageData?.fleet,
            fleetSize: editCoverageData?.fleetSize?.value || "EMPTY",
            location: coverage?.location.value || coverage?.location || "",
            startDate: coverage?.startDate || "",
            endDate: coverage?.endDate || "",
            actions: "",
          };

          if (!useCase4) {
            const coverageRes = await updateCoverage(
              // coverage[keyName],
              coverage["coverageId"],
              coverageReqObj
            );
            if (coverageRes.status === 200) {
              successMessage("Coverage data updated successfully");
              const tempObj = {
                ...selectedCoverage,
                make: coverageRes.data.make,
                modelNo: coverageRes.data.modelNo,
                serialNumberPrefix: coverageRes.data.serialNumberPrefix,
                family: coverageRes.data.family,
                startSerialNumber: editCoverageData?.startSerialNumber,
                endSerialNumber: editCoverageData?.endSerialNumber,
                fleet: editCoverageData?.fleet,
                fleetSize: editCoverageData?.fleetSize?.value || "EMPTY",
              };
              _tableData[selectedCoverageIndex] = tempObj;
              handleFilterUpdateCoverageData(_tableData);
            }
          } else {
            const coverageRes = await updateCustomCoverage(
              // coverage[keyName],
              coverage["coverageId"],
              coverageReqObj
            );
            if (coverageRes.status === API_SUCCESS) {
              successMessage("Coverage data updated successfully");
              const tempObj = {
                ...selectedCoverage,
                make: coverageRes.data.make,
                modelNo: coverageRes.data.modelNo,
                serialNumberPrefix: coverageRes.data.serialNumberPrefix,
                family: coverageRes.data.family,
                startSerialNumber: editCoverageData?.startSerialNumber,
                endSerialNumber: editCoverageData?.endSerialNumber,
                fleet: editCoverageData?.fleet,
                fleetSize: editCoverageData?.fleetSize?.value || "EMPTY",
              };
              _tableData[selectedCoverageIndex] = tempObj;
              handleFilterUpdateCoverageData(_tableData);
            }
          }
        }
        handleCoverageEditModal();
      }
    } catch (error) {
      return;
    }
  };

  // show-hide included serial no modal box
  const handleIncludedSerialNoModal = () => {
    setShowIncludedSerialNoModal(!showIncludedSerialNoModal);
  };

  // add new row in included serial no modal list
  const handleAddMoreSerialNoDataList = () => {
    let _tableData = [...tableData];
    let obj = _tableData[selectedCoverageIndex];
    obj = {
      ...obj,
      coverageSubDetails: [
        ...obj.coverageSubDetails,
        {
          id: Date.now(),
          coverageId: 0,
          // serviceId: 0,
          // modelNo: obj.modelNo,
          // startSerialNumber: obj.startSerialNumber,
          // endSerialNumber: obj.endSerialNumber,
          // serialNumberPrefix: obj.serialNumberPrefix,
          // family: obj.family,
          // make: obj.make,
          // fleet: obj.fleet,
          // fleetSize: obj.fleetSize,
          // actions: obj?.actions || "",
          serialNumber: "",
          location: "",
          startDate: new Date(),
          endDate: new Date(),
          noSeriese: "",
        },
      ],
    };
    _tableData[selectedCoverageIndex] = obj;
    handleFilterUpdateCoverageData(_tableData);
  };

  // text change included serial no row fields
  const handleIncludeSerialNoTextChange = (e, i, keyName) => {
    let _tableData = [...tableData];
    let tempObj = _tableData[selectedCoverageIndex].coverageSubDetails[i];
    tempObj = {
      ...tempObj,
      [keyName]: e.target.name === "location" ? e.target.value : e,
    };
    _tableData[selectedCoverageIndex].coverageSubDetails[i] = tempObj;
    setTableData(_tableData);
  };

  // update included serial no
  const handleUpdateIncludedSerialNo = async (data) => {
    try {
      let _tableData = [...tableData];
      let selectedRowObj = _tableData[selectedCoverageIndex];
      let cvgIds = [];
      if (selectedRowObj.coverageSubDetails.length !== 0) {
        for (let i = 0; i < selectedRowObj.coverageSubDetails.length; i++) {
          if (i !== 0) {
            if (!useCase4) {
              let reqObj = {
                coverageId: 0,
                serviceId: 0,
                modelNo: selectedRowObj.modelNo,
                serialNumber: selectedRowObj.coverageSubDetails[i].serialNumber
                  ? selectedRowObj.coverageSubDetails[i].serialNumber
                  : "",
                startSerialNumber: "",
                endSerialNumber: "",
                serialNumberPrefix: "",
                family: selectedRowObj.family,
                make: selectedRowObj.make,
                fleet: "",
                fleetSize: "SMALL",
                location: "",
                // startDate: selectedRowObj.associatedIncludedModelData[i].startDate,
                // endDate: selectedRowObj.associatedIncludedModelData[i].endDate,
                startDate: "",
                endDate: "",
                actions: "",
                createdAt: "",
              };
              const cvgRes = await createCoverage(reqObj);
              cvgIds.push({ coverageId: cvgRes.coverageId });
            } else {
              let reqObj = {
                customCoverageId: 0,
                serviceId: 0,
                modelNo: selectedRowObj.modelNo,
                serialNumber: selectedRowObj.coverageSubDetails[i].serialNumber
                  ? selectedRowObj.coverageSubDetails[i].serialNumber
                  : "",
                startSerialNumber: "",
                endSerialNumber: "",
                serialNumberPrefix: "",
                family: selectedRowObj.family,
                make: selectedRowObj.make,
                fleet: "",
                fleetSize: "SMALL",
                location: "",
                // startDate: selectedRowObj.associatedIncludedModelData[i].startDate,
                // endDate: selectedRowObj.associatedIncludedModelData[i].endDate,
                startDate: "",
                endDate: "",
                actions: "",
                createdAt: "",
              };
              const cvgRes = await createCustomCoverage(reqObj);
              cvgIds.push({ coverageId: cvgRes.customCoverageId });
            }
          }
        }
        handlePortfolioCoverageIds(cvgIds);
      }
      handleIncludedSerialNoModal();
    } catch (error) {
      return;
    }
  };

  // show search serial no modal
  const handleShowSerialNoSearchModal = () => {
    setShowSerialNoSearchModal(!showSerialNoSearchModal);
    setShowIncludedSerialNoModal(!showIncludedSerialNoModal);
  };

  // search serial no by customer id
  const handleSerialNoSearch = async (e) => {
    let reqObj = {
      family: tableData[selectedCoverageIndex].family,
      make: tableData[selectedCoverageIndex].make,
      modelNo: tableData[selectedCoverageIndex].modelNo,
      prefix: tableData[selectedCoverageIndex].prefix,
      searchString: e.target.value,
    };
    const searchedSerialNo = await getValidateCoverage(reqObj);
  };

  // select serial no for select coverage row for model
  const handleSelectIncludedModelSerialNo = (e, i, row) => {
    const _tableData = [...tableData];
    let tempObj = _tableData[selectedCoverageIndex].coverageSubDetails[i];

    tempObj = { ...tempObj, serialNumber: e.value };
    _tableData[selectedCoverageIndex].coverageSubDetails[i] = tempObj;
    setTableData(_tableData);
  };

  // coverage data edit modal box
  const editCoverageDataModel = () => {
    return (
      <Modal
        show={showCoverageEditModal}
        onHide={handleCoverageEditModal}
        centered
        size="lg"
      >
        <Modal.Header className="align-items-center">
          <div>
            <Modal.Title>Edit Coverage</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="included_table">
          <div className="row input-fields">
            {/* <div className="col-md-4 col-sm-4">
              <div className="form-group w-100">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Coverage ID
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  disabled
                  placeholder="(AUTO GENERATE)"
                  // value={editCoverageData.coverageId}
                  value={
                    editCoverageData[
                      !useCase4 ? "coverageId" : "customCoverageId"
                    ]
                  }
                  data={
                    editCoverageData[
                      !useCase4 ? "coverageId" : "customCoverageId"
                    ]
                  }
                />
              </div>
            </div> */}
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Make
                </label>
                <input
                  type="text"
                  className="form-control text-primary border-radius-10"
                  name="make"
                  placeholder="Auto Fill Search Model...."
                  value={editCoverageData.make}
                  disabled
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Family
                </label>
                <input
                  type="text"
                  className="form-control text-primary border-radius-10"
                  name="family"
                  placeholder="Auto Fill Search Model...."
                  value={editCoverageData.family}
                  disabled
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Model No
                </label>
                <input
                  type="text"
                  className="form-control text-primary border-radius-10"
                  name="modelNo"
                  placeholder="Model(Required*)"
                  value={editCoverageData.modelNo}
                  onChange={(e) => {
                    handleModelSearchInput(e);
                    handleCoverageInputChange(e, "modelNo", "text");
                  }}
                  readOnly
                />
                {
                  <ul
                    className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                    id="style"
                  >
                    {searchedModalList.map((currentItem, j) => (
                      <li
                        className="list-group-item"
                        key={j}
                        onClick={() => handleSelectSearchModel(currentItem)}
                      >
                        {currentItem.model}
                      </li>
                    ))}
                  </ul>
                }
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Serial No Prefix
                </label>
                <Select
                  options={modalPrefixKeyValuePair}
                  placeholder="Select..."
                  value={editCoverageData.serialNoPrefix}
                  className="text-primary"
                  onChange={(e) =>
                    handleCoverageInputChange(e, "serialNoPrefix", "select")
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Start Serial No
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  placeholder="(Optional)"
                  value={editCoverageData.startSerialNumber}
                  onChange={(e) =>
                    handleCoverageInputChange(e, "startSerialNumber", "text")
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  End Serial No
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  placeholder="(Optional)"
                  value={editCoverageData.endSerialNumber}
                  onChange={(e) =>
                    handleCoverageInputChange(e, "endSerialNumber", "text")
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Fleet
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  placeholder="(Optional)"
                  value={editCoverageData.fleet}
                  onChange={(e) =>
                    handleCoverageInputChange(e, "fleet", "text")
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  {" "}
                  Fleet Size
                </label>
                <Select
                  options={coverageFleetSizeOptions}
                  placeholder="Select..."
                  value={editCoverageData.fleetSize}
                  className="text-primary"
                  onChange={(e) =>
                    handleCoverageInputChange(e, "fleetSize", "select")
                  }
                />
                {/* <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    placeholder="(Optional)"
                    value={editCoverageData.fleetSize}
                    onChange={(e) =>
                      handleCoverageInputChange(e, "fleetSize", "text")
                    }
                  /> */}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="btn border w-100"
            onClick={handleCoverageEditModal}
          >
            Close{" "}
          </Button>
          <Button
            variant="primary"
            className="btn btn-primary w-100"
            onClick={handleUpdateCoverage}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // included serial no modal box
  const viewIncludedSerialNoModal = () => {
    return (
      <Modal
        show={showIncludedSerialNoModal}
        onHide={handleIncludedSerialNoModal}
        size="xl"
        centered
      >
        <Modal.Header className="align-items-center">
          <div>
            {" "}
            <Modal.Title>Included Serial No</Modal.Title>
          </div>
          <div>
            <button
              className=" btn bg-primary text-white cursor"
              onClick={handleAddMoreSerialNoDataList}
              disabled={
                tableData[selectedCoverageIndex]?.coverageSubDetails.length !==
                  0 &&
                isEmpty(
                  tableData[selectedCoverageIndex]?.coverageSubDetails[
                    tableData[selectedCoverageIndex]?.coverageSubDetails
                      .length - 1
                  ]?.serialNumber
                )
              }
            >
              Add New
            </button>
          </div>
        </Modal.Header>
        <Modal.Body className="included_table">
          <DataTable
            className=""
            title=""
            columns={includedSerialNoColumns}
            data={tableData[selectedCoverageIndex]?.coverageSubDetails}
            customStyles={dataTableCustomStyle}
            // pagination
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleIncludedSerialNoModal}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleUpdateIncludedSerialNo}>
            Save changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    );
  };

  // search serial no modal box
  const viewSearchSerialNoModal = () => {
    return (
      <Modal
        show={showSerialNoSearchModal}
        onHide={handleShowSerialNoSearchModal}
        centered
      >
        <Modal.Header className="align-items-center">
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body className="included_table">
          <div className="w-100">
            <div className="d-flex align-items-center bg-light-dark w-100 border-radius-10">
              <div className="d-flex justify-content-between align-items-center p-3 border-radius-10 w-100 border-right">
                <div className="w-100">
                  <input
                    className="p-2 w-100"
                    type="text"
                    placeholder="Search by Customer Id"
                    autoComplete="off"
                    onChange={(e) => handleSerialNoSearch(e)}
                    // id={"inputSearch-" + i}
                    // value={(props.compoFlag === "bundleSearch") ? obj.inputSearch === "" ? "" : obj.inputSearch.split("#")[1] : obj.inputSearch}
                  />
                </div>
              </div>
            </div>
            <div className="searched-serial-number"></div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  // coverage columns
  const columns = [
    {
      name: <div>Make</div>,
      selector: (row) => row.make,
      wrap: true,
      sortable: true,
      format: (row) => row.make,
    },
    {
      name: <div>Family</div>,
      selector: (row) => row.family,
      wrap: true,
      sortable: true,
      format: (row) => row.family,
    },
    {
      name: <div>Model</div>,
      selector: (row) => (isSelectAble ? row.model : row.modelNo),
      wrap: true,
      sortable: true,
      format: (row) => (isSelectAble ? row.model : row.modelNo),
    },
    {
      name: <div>Prefix</div>,
      selector: (row) => (isSelectAble ? row.prefix : row.serialNumberPrefix),
      wrap: true,
      sortable: true,
      format: (row) => (isSelectAble ? row.prefix : row.serialNumberPrefix),
    },
    {
      name: <div>Action</div>,
      selector: (row) => row.action,
      wrap: true,
      sortable: true,
      format: (row) => row.action,
      omit: isSelectAble,
      cell: (row, i) => (
        <div>
          <Link
            onClick={() => handleEditCoverage(row, i)}
            className="btn-svg text-white cursor mx-2 cursor"
            title="Edit"
          >
            <svg
              version="1.1"
              viewBox="0 0 1696.162 1696.143"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnslgink="http://www.w3.org/1999/lgink"
            >
              <g id="pen">
                <path d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z" />
              </g>
              <g id="Layer_1" />
            </svg>
          </Link>
          <Link
            className="btn-svg text-white cursor mr-2 "
            onClick={() => handleDeleteCoverage(row, i)}
            title="Delete"
          >
            <svg
              data-name="Layer 41"
              id="Layer_41"
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
          </Link>
          <Link
            className="btn-svg text-white cursor"
            onClick={() => handleShowIncludeSerialNoModelBox(row, i)}
          >
            <svg
              data-name="Layer 1"
              id="Layer_1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                fill: "none",
                width: "18px",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2px",
              }}
            >
              <title />
              <g data-name="&lt;Group&gt;" id="_Group_">
                <path
                  className="cls-1"
                  d="M13.38,10.79h0a3.5,3.5,0,0,1,0,5L10.52,18.6a3.5,3.5,0,0,1-5,0h0a3.5,3.5,0,0,1,0-5l.86-.86"
                  data-name="&lt;Path&gt;"
                  id="_Path_"
                />
                <path
                  className="cls-1"
                  d="M11,13.21h0a3.5,3.5,0,0,1,0-5L13.81,5.4a3.5,3.5,0,0,1,5,0h0a3.5,3.5,0,0,1,0,5l-.86.86"
                  data-name="&lt;Path&gt;"
                  id="_Path_2"
                />
              </g>
            </svg>
          </Link>
        </div>
      ),
    },
  ];

  // Save or Update the Coverage as including serial Number
  const handleSaveSerialNoRow = async (row, i) => {
    try {
      if (isEmpty(row.serialNumber)) {
        errorMessage("Please Selecte any Serial no, then you can save it.");
        return;
      }
      let keyName = useCase4 ? "customCoverageId" : "coverageId";
      const coverageReqObj = {
        // [keyName]: row[keyName],
        [keyName]: row["coverageId"],
        serviceId: 0,
        modelNo: tableData[selectedCoverageIndex]?.modelNo,
        serialNumber: row?.serialNumber?.value || row?.serialNumber || "",
        startSerialNumber: tableData[selectedCoverageIndex]?.startSerialNumber,
        endSerialNumber: tableData[selectedCoverageIndex]?.endSerialNumber,
        serialNumberPrefix:
          tableData[selectedCoverageIndex]?.serialNumberPrefix,
        family: tableData[selectedCoverageIndex]?.family,
        make: tableData[selectedCoverageIndex]?.make,
        fleet: tableData[selectedCoverageIndex]?.fleet,
        fleetSize: tableData[selectedCoverageIndex]?.fleetSize || "EMPTY",
        location: row?.location.value || row?.location || "",
        startDate: row?.startDate || "",
        endDate: row?.endDate || "",
        actions: "",
      };

      if (!useCase4) {
        if (isEmpty(row[keyName])) {
          const cvgRes = await createCoverage(coverageReqObj);
          handlePortfolioCoverageIds([{ coverageId: cvgRes.coverageId }]);
        } else {
          const cvgRes = await updateCoverage(row[keyName], coverageReqObj);
        }
      } else {
        // if (isEmpty(row[keyName])) {
        if (isEmpty(row["coverageId"])) {
          const cvgRes = await createCustomCoverage(coverageReqObj);
          handlePortfolioCoverageIds([{ coverageId: cvgRes.coverageId }]);
        } else {
          const cvgRes = await updateCustomCoverage(
            // row[keyName],
            row["coverageId"],
            coverageReqObj
          );
        }
      }
    } catch (error) {
      return;
    }
  };

  // Delete the included Serial Number serial Number row
  const handleDeleteSerialNumberRow = (row) => {
    try {
      let keyName = useCase4 ? "customCoverageId" : "coverageId";
      let _tableData = [...tableData];
      let selectedCoverage = _tableData[selectedCoverageIndex];
      // if (isEmpty(row[keyName])) {
      if (isEmpty(row["coverageId"])) {
        selectedCoverage = {
          ...selectedCoverage,
          coverageSubDetails: selectedCoverage["coverageSubDetails"].filter(
            (obj) => obj.id !== row.id
          ),
        };
        _tableData[selectedCoverageIndex] = selectedCoverage;
        handleFilterUpdateCoverageData(_tableData);
      } else {
        const reqUrl = `${
          useCase4 ? CUSTOM_COVERAGE_REST() : COVERAGE_REST()
        }/${row["coverageId"]}`;
        // }/${row[keyName]}`;
        callDeleteApi(
          null,
          reqUrl,
          (response) => {
            if (response.status === API_SUCCESS) {
              selectedCoverage = {
                ...selectedCoverage,
                coverageSubDetails: selectedCoverage[
                  "coverageSubDetails"
                ].filter((obj) => {
                  // if (obj[keyName] !== row[keyName]) return obj;
                  if (obj["coverageId"] !== row["coverageId"]) return obj;
                }),
              };
              const updatedDate = tableData.filter((obj) => {
                if (obj["coverageId"] !== row["coverageId"]) return obj;
                // if (obj[keyName] !== row[keyName]) return obj;
              });
              setCoverageIds((prev) =>
                prev.filter((obj) => obj.coverageId !== row["coverageId"])
                // prev.filter((obj) => obj.coverageId !== row[keyName])
              );
              _tableData[selectedCoverageIndex] = selectedCoverage;
              handleFilterUpdateCoverageData(_tableData);
              // handleFilterUpdateCoverageData(updatedDate, true);
            } else {
              errorMessage(response.data?.message);
            }
          },
          (error) => {
            return;
          }
        );
      }
    } catch (error) {}
  };

  // included serial no modal list columns
  const includedSerialNoColumns = [
    {
      name: <div>Family</div>,
      // selector: (row) => row.family,
      selector: (row) => tableData[selectedCoverageIndex]?.family,
      wrap: true,
      sortable: true,
      // format: (row) => row.family,
      format: (row) => tableData[selectedCoverageIndex]?.family,
    },
    {
      name: <div>Model</div>,
      // selector: (row) => row.modelNo,
      selector: (row) => tableData[selectedCoverageIndex]?.modelNo,
      wrap: true,
      sortable: true,
      // format: (row) => row.modelNo,
      format: (row) => tableData[selectedCoverageIndex]?.modelNo,
    },
    {
      name: <div>Serial Number</div>,
      selector: (row) => row.noSeriese,
      wrap: true,
      sortable: true,
      format: (row) => row.noSeriese,
      cell: (row, i) => (
        <div>
          {/* <span className="cursor" onClick={handleShowSerialNoSearchModal}>{row.serialNumber ? row.serialNumber : "Click to Add"}</span> */}
          <Select
            className="customselect"
            maxMenuHeight={80}
            onChange={(e) => handleSelectIncludedModelSerialNo(e, i, row)}
            value={
              isEmpty(row.serialNumber)
                ? ""
                : { label: row.serialNumber, value: row.serialNumber }
            }
            options={includedCoverageSerialOptions}
            styles={{
              control: (provided) => ({
                ...provided,
                width: 150, // Set the width as needed
              }),
            }}
            // isOptionDisabled={(e) => handleDisableSerialNoChangesOptions(e,i,row)}
          />
        </div>
      ),
      minWidth: "100px",
      maxWidth: "200px",
    },
    {
      name: <div>Location</div>,
      selector: (row) => row.location,
      wrap: true,
      sortable: true,
      format: (row) => (isEmpty(row.location) ? "NA" : row.location),
      cell: (row, i) => (
        <div>
          <input
            type="text"
            placeholder="location"
            name="location"
            value={row.location}
            onChange={(e) => handleIncludeSerialNoTextChange(e, i, "location")}
          />
        </div>
      ),
    },
    {
      name: <div>Start Date</div>,
      selector: (row) => row.startDate,
      wrap: true,
      maxWidth: "127px",
      minWidth: "127px",
      sortable: true,
      format: (row) => row.startDate,
      cell: (row, i) => (
        <div className="date-box tabledate-box">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              format="dd/MM/yyyy"
              className="form-controldate border-radius-10 mr-3"
              label=""
              value={row.startDate}
              onChange={(e) =>
                handleIncludeSerialNoTextChange(e, i, "startDate")
              }
            />
          </MuiPickersUtilsProvider>
        </div>
      ),
    },
    {
      name: <div>End Date</div>,
      selector: (row) => row.endDate,
      wrap: true,
      maxWidth: "127px",
      minWidth: "127px",
      sortable: true,
      format: (row) => row.endDate,
      cell: (row, i) => (
        <div className="date-box tabledate-box">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              format="dd/MM/yyyy"
              className="form-controldate border-radius-10"
              label=""
              value={row.endDate}
              onChange={(e) => handleIncludeSerialNoTextChange(e, i, "endDate")}
            />
          </MuiPickersUtilsProvider>
        </div>
      ),
    },
    {
      name: "Action",
      wrap: true,
      sortable: true,
      cell: (row, i) => (
        <div>
          <Link
            className="btn-svg text-white cursor mr-2 "
            title="Save"
            onClick={() => handleSaveSerialNoRow(row, i)}
          >
            <SaveIcon />
          </Link>

          <Link
            className="btn-svg text-white cursor mr-2 "
            onClick={() => handleDeleteSerialNumberRow(row, i)}
            title="Delete"
          >
            <svg
              data-name="Layer 41"
              id="Layer_41"
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
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        className={className}
        title=""
        columns={columns}
        data={tableData}
        customStyles={dataTableCustomStyle}
        selectableRows={isSelectAble}
        onSelectedRowsChange={(state) =>
          setCheckedCoverageData(state.selectedRows)
        }
        pagination
      />
      {editCoverageDataModel()}
      {viewIncludedSerialNoModal()}
      {viewSearchSerialNoModal()}
    </>
  );
};

export default CoveragePaginationTable;
