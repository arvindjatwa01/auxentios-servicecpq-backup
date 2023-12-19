import $ from "jquery";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Select from "react-select";

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { isEmpty, isEmptySelect } from "../utilities/textUtilities";
import { getValidateCoverage, machineSearch } from "services/searchServices";

import {
  createCoverage,
  // getSearchQueryCoverage,
  updateCoverage,
} from "../../../../services/index";

import { dataTableCustomStyle } from "../itemConstant";
import { successMessage } from "../utilities/toastMessage";
import { getApiCall } from "services/searchQueryService";
import { GET_SEARCH_COVERAGE } from "services/CONSTANTS";

const CoveragePaginationTable = (props) => {
  const {
    tableData,
    isSelectAble,
    setCheckedCoverageData,
    className,
    handleUpdateCoverageData,
    handlePortfolioCoverageIds,
    setTableData,
  } = props;
  const [showCoverageEditModal, setShowCoverageEditModal] = useState(false);
  const [searchedModalList, setSearchedModalList] = useState([]);
  const [modalPrefixKeyValuePair, setModalPrefixKeyValuePair] = useState([]);
  const [selectedCoverageIndex, setSelectedCoverageIndex] = useState(null);
  const [editCoverageData, setEditCoverageData] = useState({
    coverageId: "",
    make: "",
    family: "",
    modelNo: "",
    serialNoPrefix: "",
    startSerialNo: "",
    endSerialNo: "",
    fleet: "",
    fleetSize: "",
    serialNo: "",
  });

  const [showIncludedSerialNoModal, setShowIncludedSerialNoModal] =
    useState(false);
  const [includedCoverageSerialOptions, setIncludedCoverageSerialOptions] =
    useState([]);
  const [showSerialNoSearchModal, setShowSerialNoSearchModal] = useState(false);

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
  const handleSelectSearchModel = (e, currentItem) => {
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
  const handleEditCoverage = (i, row) => {
    var editSerialNo = "";
    const _tableData = [...tableData];
    const objMaster = _tableData[i];
    if (objMaster.includedSerialNoModalData) {
      editSerialNo = objMaster.includedSerialNoModalData[0].serialNumber?.value;
    }

    let obj = {
      coverageId: row.id,
      make: row.make,
      family: row.family,
      modelNo: row.model,
      serialNoPrefix: isEmpty(row.prefix)
        ? ""
        : { label: row.prefix, value: row.prefix },
      startSerialNo: row.startSerialNo,
      endSerialNo: row.endSerialNo,
      fleet: row.fleet,
      fleetSize: row.fleetSize,
      serialNo: editSerialNo,
    };

    let prefixKeyValuePair = isEmpty(row.prefix)
      ? []
      : [{ label: row.prefix, value: row.prefix }];
    setModalPrefixKeyValuePair([...prefixKeyValuePair]);
    setEditCoverageData(obj);
    setSelectedCoverageIndex(i);
    handleCoverageEditModal();
  };

  // delete selected coverage
  const handleDeleteCoverage = (row) => {
    const updatedDate = tableData.filter((obj) => {
      if (obj.id !== row.id) return obj;
    });
    handleUpdateCoverageData(updatedDate, true);
  };

  // Show included serial no list modal
  const handleShowIncludeSerialNoModelBox = async (i, row) => {
    const _tableData = [...tableData];
    const obj = _tableData[i];

    if (!obj.includedSerialNoModalData) {
      const tempObj = {
        ...obj,
        includedSerialNoModalData: [
          {
            family: row.family,
            model: row.model,
            noSeriese: "",
            location: "",
            startDate: new Date(),
            endDate: new Date(),
            serialNumber: "",
          },
        ],
      };
      _tableData[i] = tempObj;
      handleUpdateCoverageData(_tableData);
    }
    var searchQueryMachine = row.model ? "model~" + row.model : "";
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
        const _tableData = [...tableData];
        const selectedCoverage = _tableData[selectedCoverageIndex];

        const coverageReqObj = {
          coverageId: editCoverageData?.coverageId,
          serviceId: 0,
          modelNo: editCoverageData?.modelNo,
          serialNumber: editCoverageData?.serialNo,
          startSerialNumber: editCoverageData?.startSerialNo,
          endSerialNumber: editCoverageData?.endSerialNo,
          serialNumberPrefix: isEmptySelect(
            editCoverageData?.serialNoPrefix?.value
          )
            ? ""
            : editCoverageData?.serialNoPrefix?.value,
          family: editCoverageData?.family,
          make: editCoverageData?.make,
          fleet: editCoverageData?.fleet,
          fleetSize: editCoverageData?.fleetSize,
          location: editCoverageData?.location,
          startDate: "",
          endDate: "",
          actions: "",
        };

        const coverageRes = await updateCoverage(
          editCoverageData.coverageId,
          coverageReqObj
        );
        if (coverageRes.status === 200) {
          successMessage("Coverage data updated successfully");
          const tempObj = {
            ...selectedCoverage,
            make: coverageRes.data.make,
            model: coverageRes.data.modelNo,
            prefix: coverageRes.data.serialNumberPrefix,
            family: coverageRes.data.family,
          };
          _tableData[selectedCoverageIndex] = tempObj;
          handleUpdateCoverageData(_tableData);
          handleCoverageEditModal();
        }
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
      includedSerialNoModalData: [
        ...obj.includedSerialNoModalData,
        {
          family: obj.family,
          model: obj.model,
          noSeriese: "",
          location: "",
          startDate: new Date(),
          endDate: new Date(),
          serialNumber: "",
        },
      ],
    };
    _tableData[selectedCoverageIndex] = obj;
    handleUpdateCoverageData(_tableData);
  };

  // text change included serial no row fields
  const handleIncludeSerialNoTextChange = (e, i, keyName) => {
    let _tableData = [...tableData];
    let tempObj =
      _tableData[selectedCoverageIndex].includedSerialNoModalData[i];
    tempObj = { ...tempObj, [keyName]: e };
    _tableData[selectedCoverageIndex].includedSerialNoModalData[i] = tempObj;
    setTableData(_tableData);
  };

  // update included serial no
  const handleUpdateIncludedSerialNo = async (data) => {
    try {
      let _tableData = [...tableData];
      let selectedRowObj = _tableData[selectedCoverageIndex];
      let cvgIds = [];
      if (selectedRowObj.includedSerialNoModalData.length !== 0) {
        for (
          let i = 0;
          i < selectedRowObj.includedSerialNoModalData.length;
          i++
        ) {
          if (i !== 0) {
            let reqObj = {
              coverageId: 0,
              serviceId: 0,
              modelNo: selectedRowObj.model,
              // serialNumber: selectedRowObj.includedSerialNoModalData[i].serialNumber?.value ? selectedRowObj.includedSerialNoModalData[i].serialNumber?.value : "",
              serialNumber: selectedRowObj.includedSerialNoModalData[i]
                .serialNumber
                ? selectedRowObj.includedSerialNoModalData[i].serialNumber
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
      model: tableData[selectedCoverageIndex].model,
      prefix: tableData[selectedCoverageIndex].prefix,
      searchString: e.target.value,
    };
    const searchedSerialNo = await getValidateCoverage(reqObj);
    console.log("searchedSerialNo ========= ", searchedSerialNo);
  };

  // select serial no for select coverage row for model
  const handleSelectIncludedModelSerialNo = (e, i, row) => {
    const _tableData = [...tableData];
    let tempObj =
      _tableData[selectedCoverageIndex].includedSerialNoModalData[i];

    tempObj = { ...tempObj, serialNumber: e };
    _tableData[selectedCoverageIndex].includedSerialNoModalData[i] = tempObj;
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
            <div className="col-md-4 col-sm-4">
              <div className="form-group w-100">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Coverage ID
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  disabled
                  placeholder="(AUTO GENERATE)"
                  value={editCoverageData.coverageId}
                />
              </div>
            </div>
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
                  name="model"
                  placeholder="Model(Required*)"
                  value={editCoverageData.modelNo}
                  onChange={(e) => handleModelSearchInput(e)}
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
                  value={editCoverageData.startSerialNo}
                  onChange={(e) =>
                    handleCoverageInputChange(e, "startSerialNo", "text")
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
                  value={editCoverageData.endSerialNo}
                  onChange={(e) =>
                    handleCoverageInputChange(e, "endSerialNo", "text")
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
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  placeholder="(Optional)"
                  value={editCoverageData.fleetSize}
                  onChange={(e) =>
                    handleCoverageInputChange(e, "fleetSize", "text")
                  }
                />
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
        size="lg"
        centered
      >
        <Modal.Header className="align-items-center">
          <div>
            {" "}
            <Modal.Title>Included Serial No</Modal.Title>
          </div>
          <div>
            <Link
              className=" btn bg-primary text-white cursor"
              onClick={handleAddMoreSerialNoDataList}
            >
              Add New
            </Link>
          </div>
        </Modal.Header>
        <Modal.Body className="included_table">
          <DataTable
            className=""
            title=""
            columns={includedSerialNoColumns}
            data={tableData[selectedCoverageIndex]?.includedSerialNoModalData}
            customStyles={dataTableCustomStyle}
            // pagination
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleIncludedSerialNoModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateIncludedSerialNo}>
            Save changes
          </Button>
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
      selector: (row) => row.model,
      wrap: true,
      sortable: true,
      format: (row) => row.model,
    },
    {
      name: <div>Prefix</div>,
      selector: (row) => row.prefix,
      wrap: true,
      sortable: true,
      format: (row) => row.prefix,
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
            onClick={() => handleEditCoverage(i, row)}
            className="btn-svg text-white cursor mx-2 cursor"
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
            onClick={() => handleDeleteCoverage(row)}
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
            onClick={() => handleShowIncludeSerialNoModelBox(i, row)}
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

  // included serial no modal list columns
  const includedSerialNoColumns = [
    {
      name: <div>Family</div>,
      selector: (row) => row.family,
      wrap: true,
      sortable: true,
      format: (row) => row.family,
    },
    {
      name: <div>Model</div>,
      selector: (row) => row.model,
      wrap: true,
      sortable: true,
      format: (row) => row.model,
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
            value={row.serialNumber}
            options={includedCoverageSerialOptions}
            // isOptionDisabled={(e) => handleDisableSerialNoChangesOptions(e,i,row)}
          />
        </div>
      ),
    },
    {
      name: <div>Location</div>,
      selector: (row) => row.location,
      wrap: true,
      sortable: true,
      format: (row) => (isEmpty(row.location) ? "NA" : row.location),
    },
    {
      name: <div>Start Date</div>,
      selector: (row) => row.startDate,
      wrap: true,
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
              onChange={(e) =>
                handleIncludeSerialNoTextChange(e, i, "endDate")
              }
            />
          </MuiPickersUtilsProvider>
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
