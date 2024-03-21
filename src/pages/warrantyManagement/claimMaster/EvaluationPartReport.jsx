import React, { useCallback, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";

import $ from "jquery";

import { GRID_STYLE, SPAREPART_SEARCH_Q_OPTIONS } from "pages/Common/constants";
import SearchComponent from "pages/components/SearchComponent";
import { sparePartSearch } from "services/searchServices";
import SearchPartListModal from "./SearchPartListModal";
import { EVALUATION_PARTS_MASTER_URL } from "services/CONSTANTS";
import { callDeleteApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

const EvaluationPartReport = (props) => {
  const {
    handleSnack,
    title,
    partsRecord,
    setPartsRecord,
    claimOrderId,
    evaluationId,
    isFailedPart = false,
    handleEvaluationPartsReturn,
  } = props;
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
  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});

  // clear filter
  const clearFilteredData = () => {
    setMasterData([]);
  };

  // Close SparePart search modal
  const handleSearchResClose = () => {
    setSearchResultOpen(false);
    // setSelectedMasterData([]);
  };

  // Consumable Search
  const handleQuerySearchClick = async (type) => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    querySearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory.value && item.inputSearch) {
        searchStr =
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
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
          encodeURI('"' + item.inputSearch + '"');
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        const res = await sparePartSearch(searchStr);
        // console.log("search Query Result :", res);
        setMasterData(res);
        setSearchResultOpen(true);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  const partsColumns = [
    {
      field: "partNumber",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "partDescription",
      headerName: "Part Description",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      editable: true,
    },
    {
      field: "analysis",
      headerName: "Analysis",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        { label: "Known to be Faulty", value: "KNOWN_TO_BE_FAULTY" },
        { label: "Suspected", value: "SUSPECTED" },
        { label: "Without any Fault", value: "WITHOUT_ANY_FAULT" },
      ],
      valueFormatter: ({ api, field, value }) => {
        const options = api.getColumn(field).valueOptions;
        const option = options.find(
          ({ value: optionValue }) => value === optionValue
        );

        if (option) return option.label;
      },
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        { label: "SP0023", value: "SP0023" },
        { label: "SP1987", value: "SP1987" },
        { label: "SP4987", value: "SP4987" },
      ],
      valueFormatter: ({ api, field, value }) => {
        const options = api.getColumn(field).valueOptions;
        const option = options.find(
          ({ value: optionValue }) => value === optionValue
        );

        if (option) return option.label;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ row }) => {
        const isInEditMode =
          rowModesModel[row.partsId]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <Tooltip title="Save">
                  <SaveIcon />
                </Tooltip>
              }
              label="Save"
              onClick={handleSaveClick(row.partsId)}
            />,
            <GridActionsCellItem
              icon={
                <Tooltip title="Cancel">
                  <CancelIcon />
                </Tooltip>
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row.partsId)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="Edit">
                <EditOutlinedIcon />
              </Tooltip>
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row.partsId)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Remove">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            onClick={handleDeleteClick(row.partsId)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Return">
                <img
                  className="m-1"
                  src={"../../assets/images/returnIcon.png"}
                  alt="Return"
                  style={{ width: "20px", height: "20px", fill: "#872ff7" }}
                />
              </Tooltip>
            }
            label="Return"
            className="textPrimary"
            onClick={() => handleEvaluationPartsReturn(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStart = (params, event) => {
    console.log(params);
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (partsId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [partsId]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (partsId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [partsId]: { mode: GridRowModes.View },
    });
  };

  const handleCancelClick = (partsId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [partsId]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = partsRecord.find((row) => row.partsId === partsId);
    if (editedRow.isNew) {
      setPartsRecord(partsRecord.filter((row) => row.partsId !== partsId));
    }
  };

  const handleDeleteClick = (partsId) => () => {
    callDeleteApi(
      null,
      `${EVALUATION_PARTS_MASTER_URL}/${partsId}`,
      (response) => {
        if (response.status === API_SUCCESS) {
          setPartsRecord(partsRecord.filter((row) => row.partsId !== partsId));
        }
      }
    );
  };

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const updatedRow = { ...newRow, isNew: true };

        callPutApi(
          null,
          `${EVALUATION_PARTS_MASTER_URL}/${newRow.partsId}`,
          updatedRow,
          (response) => {
            if (response.status === API_SUCCESS) {
              handleSnack("success", "Parts updated successfully");
              setPartsRecord(
                partsRecord.map((row) =>
                  row.partsId === updatedRow.partsId
                    ? { ...updatedRow, isNew: undefined }
                    : row
                )
              );
              resolve(response.data);
            } else {
              handleSnack("error", "Parts details could not be updated");
              resolve(oldRow);
            }
          }
        );

        resolve(updatedRow);
      }),
    [partsRecord]
  );

  return (
    <>
      <div className="card border px-3 py-2">
        <div className="card border mt-4 px-3 pb-3 mb-2">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="d-flex align-items-center w-100">
                <div
                  className="d-flex mr-3 col-auto pl-0"
                  style={{ whiteSpace: "pre" }}
                >
                  <h5 className="mr-2 mb-0 text-black">
                    <span>{title}</span>
                  </h5>
                </div>
                <SearchComponent
                  querySearchSelector={querySearchSelector}
                  setQuerySearchSelector={setQuerySearchSelector}
                  clearFilteredData={clearFilteredData}
                  handleSnack={handleSnack}
                  searchAPI={sparePartSearch}
                  searchClick={handleQuerySearchClick}
                  options={SPAREPART_SEARCH_Q_OPTIONS}
                  background={"white"}
                  type=""
                  buttonText="ADD PART"
                />
              </div>
            </div>
          </div>
          <DataGrid
            sx={GRID_STYLE}
            getRowId={(row) => row.partsId}
            rows={partsRecord}
            autoHeight
            columns={partsColumns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            experimentalFeatures={{ newEditingApi: true }}
            onProcessRowUpdateError={(error) => console.log(error)}
            processRowUpdate={processRowUpdate}
            // paginationMode="server"
            // rowsPerPageOptions={[5, 10, 20]}
            // pagination
          />
        </div>
      </div>
      {searchResultOpen && (
        <SearchPartListModal
          show={searchResultOpen}
          hideModal={handleSearchResClose}
          masterData={masterData}
          claimOrderId={claimOrderId}
          // partsRecord
          setRelatedPartsRecords={setPartsRecord}
          handleSnack={handleSnack}
          evaluationPart={true}
          evaluationId={evaluationId}
          isFailedPart={isFailedPart}
        />
      )}
    </>
  );
};

export default EvaluationPartReport;
