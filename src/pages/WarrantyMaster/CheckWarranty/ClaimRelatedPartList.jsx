import React, { useCallback, useState } from "react";

import $ from "jquery";

import {
  getConsumables,
  getExtWork,
  sparePartSearch,
} from "services/searchServices";
import SearchComponent from "pages/Repair/components/SearchComponent";
import { GRID_STYLE, SPAREPART_SEARCH_Q_OPTIONS } from "pages/Repair/CONSTANTS";
import {
  DataGrid,
  GridActionsCellItem,
  getGridStringOperators,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Box, TextareaAutosize, Tooltip, debounce } from "@mui/material";
import {
  RemoveSparepart,
  fetchPartsFromPartlist,
} from "services/repairBuilderServices";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import penIcon from "../../../assets/images/pen.png";

const initialConsQuery = [
  {
    id: 0,
    selectCategory: "",
    selectOperator: "",
    inputSearch: "",
    selectOptions: [],
    selectedOption: "",
  },
];

const initialExtWorkQuery = [
  {
    id: 0,
    selectCategory: "",
    selectOperator: "",
    inputSearch: "",
    selectOptions: [],
    selectedOption: "",
  },
];

const initialPartsQuery = [
  {
    id: 0,
    selectCategory: "",
    selectOperator: "",
    inputSearch: "",
    selectOptions: [],
    selectedOption: "",
  },
];

const initialSparePart = {
  groupNumber: "",
  partType: "",
  partNumber: "",
  quantity: "",
  unitPrice: 0.0,
  extendedPrice: 0.0,
  unitOfMeasure: "",
  currency: "USD",
  usagePercentage: 0,
  totalPrice: 0.0,
  comment: "",
  description: "",
};

function CommentEditInputCell(props) {
  const { id, value, field } = props;
  // console.log(id, value, field);
  const apiRef = useGridApiContext();

  const handleCommentChange = async (event) => {
    // console.log("newValue", event);
    // Explore debounce option
    apiRef.current.setEditCellValue(
      { id, field, value: event.target.value },
      event
    );
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextareaAutosize
        // ref={handleRef}
        name="comment"
        style={{ width: "100%" }}
        value={value}
        onChange={handleCommentChange}
      />
    </Box>
  );
}

const ClaimRelatedPartList = ({ selectedVersion, handleSnack }) => {
  const [partsData, setPartsData] = useState({
    id: "",
    jobCode: "",
    jobOperation: "",
    description: "",
    pricingMethod: "",
    componentCode: "",
    user: "USER1",
  });

  const [searchResultConsOpen, setSearchResultConsOpen] = useState(false);
  const [searchResultPartsOpen, setSearchResultPartsOpen] = useState(false);
  const [searchResultExtWorkOpen, setSearchResultExtWorkOpen] = useState(false);
  const [sparePart, setSparePart] = useState(initialSparePart);

  const [queryConsSearchSelector, setQueryConsSearchSelector] =
    useState(initialConsQuery);
  const [queryExtSearchSelector, setQueryExtSearchSelector] =
    useState(initialExtWorkQuery);
  const [queryPartsSearchSelector, setQueryPartsSearchSelector] =
    useState(initialPartsQuery);
  const [masterData, setMasterData] = useState([]);
  const [spareparts, setSpareparts] = useState([]);
  const [addPartModalTitle, setAddPartModalTitle] = useState("Add Part");
  const [partFieldViewonly, setPartFieldViewonly] = useState(false);
  const [addPartOpen, setAddPartOpen] = useState(false);
  const [partListId, setPartListId] = useState("");
  const [partsLoading, setPartsLoading] = useState(false);

  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [sortDetail, setSortDetail] = useState({ sortColumn: "", orderBy: "" });
  const [partsFilterQuery, setPartsFilterQuery] = useState("");
  const [totalPartsCount, setTotalPartsCount] = useState(0);
  const [bulkUpdateProgress, setBulkUpdateProgress] = useState(false);
  const [rowsToUpdate, setRowsToUpdate] = useState([]);

  const filterOperators = getGridStringOperators().filter(({ value }) =>
    ["equals", "contains"].includes(value)
  );

  const clearFilteredData = () => {
    setMasterData([]);
  };

  // Consumable Search
  const handleQuerySearchClick = async (type) => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    var querySearchSelector =
      type === "consumables"
        ? queryConsSearchSelector
        : type === "parts"
        ? queryPartsSearchSelector
        : queryExtSearchSelector;
    querySearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory?.value && item.inputSearch) {
        searchStr =
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      } else if (
        item.selectCategory?.value &&
        item.inputSearch &&
        item.selectOperator?.value
      ) {
        searchStr =
          searchStr +
          " " +
          item.selectOperator.value +
          " " +
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      } else {
        searchStr = "";
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        if (type === "consumables") {
          const res = await getConsumables(searchStr);
          setMasterData(res);
          setSearchResultConsOpen(true);
        } else if (type === "extwork") {
          const res = await getExtWork(searchStr);
          setMasterData(res);
          setSearchResultExtWorkOpen(true);
        } else if (type === "parts") {
          const res = await sparePartSearch(searchStr);
          setMasterData(res);
          setSearchResultPartsOpen(true);
        }
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching results!");
    }
  };

  // Open spare part modal to view or edit
  const openSparePartRow = (row) => {
    // console.log(row);
    setSparePart(row);
    setAddPartModalTitle(row?.groupNumber + " | " + row?.partNumber);
    setPartFieldViewonly(true);
    setAddPartOpen(true);
  };

  //Remove Spare Part
  const handleDeleteSparePart = (sparePartId) => {
    RemoveSparepart(partListId, sparePartId)
      .then((res) => {
        handleSnack("success", res);
        // fetchAllDetails(builderId, generalData.version);
        // fetchPartsOfPartlist(partListNo, page, pageSize);
      })
      .catch((e) => {
        console.log(e);
        handleSnack("error", "Error occurred while removing the spare part");
      });
  };

  const fetchPartsOfPartlist = async (partlistId, pageNo, rowsPerPage) => {
    setPartsLoading(true);
    setPage(pageNo);
    setPageSize(rowsPerPage);
    let sort = sortDetail.sortColumn
      ? `&sortColumn=${sortDetail.sortColumn}&orderBY=${sortDetail.orderBy}`
      : "";
    let filter = partsFilterQuery ? `&search=${partsFilterQuery}` : "";
    const query = `pageNumber=${pageNo}&pageSize=${rowsPerPage}${sort}${filter}`;
    await fetchPartsFromPartlist(partlistId, query)
      .then((partsResult) => {
        setTotalPartsCount(partsResult.totalRows);
        // partsResult.result.map((element, i) => {
        //   // setSlPart((pageNo*rowsPerPage - rowsPerPage) + i)
        //   console.log(pageNo,rowsPerPage, i)
        //   element.rowNum = (((pageNo+1)*rowsPerPage - rowsPerPage) + (i+1)) * 10

        // })
        setSpareparts(partsResult.result);
      })
      .catch((err) => {
        handleSnack("error", "Error occured while fetching parts");
      });
    setPartsLoading(false);
  };

  function sortPartsTable(sortEvent) {
    // console.log("sorting called");
    if (sortEvent.length > 0) {
      setSortDetail({
        sortColumn: sortEvent[0].field,
        orderBy: sortEvent[0].sort === "asc" ? "ASC" : "DESC",
      });
    } else {
      setSortDetail({ sortColumn: "", orderBy: "" });
    }
  }

  const onPartsFilterChange = useCallback((filterModel) => {
    // // console.log(filterModel);
    // filterModel.items.map((indFilter) => {
    //   if (indFilter.operatorValue === "equals")
    //     debounce(
    //       setPartsFilterQuery(indFilter.columnField + ":" + indFilter.value),
    //       200
    //     );
    //   else if (indFilter.operatorValue === "contains")
    //     setPartsFilterQuery(indFilter.columnField + "~" + indFilter.value);
    // });
  }, []);

  // Add the sparepart edited rows to the state variable to update later
  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        if (
          newRow.usagePercentage > 0 &&
          newRow.usagePercentage <= 100 &&
          newRow.unitPrice > 0
        ) {
          if (
            newRow.quantity !== oldRow.quantity ||
            newRow.usagePercentage !== oldRow.usagePercentage ||
            newRow.comment !== oldRow.comment
          ) {
            // console.log(newRow, newRow.quantity !== oldRow.quantity);
            const index = rowsToUpdate.findIndex(
              (object) => object.id === newRow.id
            );
            newRow.extendedPrice = parseFloat(
              newRow.quantity * newRow.unitPrice
            ).toFixed(2);
            newRow.totalPrice =
              newRow.usagePercentage > 0
                ? parseFloat(
                    newRow.extendedPrice * 0.01 * newRow.usagePercentage
                  ).toFixed(2)
                : parseFloat(newRow.extendedPrice).toFixed(2);
            if (index === -1) {
              // console.log("add");
              setRowsToUpdate((prevRows) => [...prevRows, newRow]);
            } else {
              rowsToUpdate[index] = newRow;
            }

            // Save the arguments to resolve or reject the promise later
            resolve(newRow);
          } else {
            // console.log(oldRow);
            resolve(oldRow); // Nothing was changed
          }
        } else {
          handleSnack("warning", "Usage percentage should be a valid value!");
          resolve(oldRow);
        }
      }),
    []
  );

  //Columns to display spare parts for the partlist
  const columnsPartListSpareParts = [
    // { headerName: 'Sl#', field: 'rowNum', flex: 1, },
    { headerName: "Group Number", field: "groupNumber", flex: 1 },
    { headerName: "Type", field: "partType", flex: 1 },
    { headerName: "Desc", field: "description", flex: 1 },
    { headerName: "Part Number", field: "partNumber", flex: 1 },
    {
      headerName: "Qty",
      field: "quantity",
      flex: 1,
      editable: true,
      filterable: false,
    },
    {
      headerName: "Sales Unit",
      field: "unitOfMeasure",
      flex: 1,
      filterable: false,
    },
    {
      headerName: "Unit Price",
      field: "unitPrice",
      flex: 1,
      filterable: false,
    },
    {
      headerName: "Extended Price",
      field: "extendedPrice",
      flex: 1,
      filterable: false,
    },
    { headerName: "Currency", field: "currency", flex: 1, filterable: false },
    {
      headerName: "% Usage",
      field: "usagePercentage",
      flex: 1,
      editable: true,
      filterable: false,
    },
    {
      headerName: "Total Price",
      field: "totalPrice",
      flex: 1,
      filterable: false,
    },
    {
      headerName: "Comment",
      field: "comment",
      flex: 1,
      editable: true,
      renderEditCell: CommentEditInputCell,
      filterable: false,
    },
    // {
    //   headerName: "Tag",
    //   field: "tag",
    //   flex: 1,
    //   editable: true,
    //   renderCell: renderTag,
    //   renderEditCell: TagComponent
    // },
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
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => openSparePartRow(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={deleteIcon} alt="Delete" />
                </Tooltip>
              </div>
            }
            label="Delete"
            onClick={() => handleDeleteSparePart(params.row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <div className="card border mt-3 px-3">
        <div className="row mt-2 input-fields">
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                JOB CODE
              </label>
              <input
                type="text"
                disabled
                class="form-control border-radius-10 text-primary"
                value={partsData.jobCode}
              />
              <div className="css-w8dmq8">*Mandatory</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                JOB OPERATION
              </label>
              <input
                type="text"
                disabled
                class="form-control border-radius-10 text-primary"
                value={partsData.jobOperation}
              />
              <div className="css-w8dmq8">*Mandatory</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                DESCRIPTION
              </label>
              <input
                type="text"
                disabled
                class="form-control border-radius-10 text-primary"
                value={partsData.description}
              />
              <div className="css-w8dmq8">*Mandatory</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                COMPONENT CODE
              </label>
              <input
                type="text"
                disabled
                class="form-control border-radius-10 text-primary"
                value={partsData.componentCode}
              />
              <div className="css-w8dmq8">*Mandatory</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                USER
              </label>
              <input
                type="text"
                disabled
                class="form-control border-radius-10 text-primary"
                value={partsData.user}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card border mt-4 px-3">
        <div className="row align-items-center">
          <div className="col-8">
            <div className="d-flex align-items-center w-100">
              <div
                className="d-flex mr-3 col-auto pl-0"
                style={{ whiteSpace: "pre" }}
              >
                <h5 className="mr-2 mb-0 text-black">
                  <span>Parts Table</span>
                </h5>
                {/* <span>{selectedVersion}</span> */}
              </div>
              <SearchComponent
                querySearchSelector={queryPartsSearchSelector}
                setQuerySearchSelector={setQueryPartsSearchSelector}
                clearFilteredData={clearFilteredData}
                handleSnack={handleSnack}
                searchAPI={sparePartSearch}
                searchClick={() => handleQuerySearchClick("parts")}
                options={SPAREPART_SEARCH_Q_OPTIONS}
                background={"white"}
                type=""
                buttonText="ADD PART"
              />
            </div>
          </div>
          {/* {["DRAFT", "REVISED"].indexOf(activeElement?.builderStatus) > -1 && (
            <div className="col-4">
              <div className="text-right pl-3 py-3">
                <button
                  onClick={() => setFileUploadOpen(true)}
                  style={{ cursor: "pointer" }}
                  className="btn bg-primary text-white mx-2"
                >
                  Upload
                </button>
              </div>
            </div>
          )} */}
        </div>
        <DataGrid
          sx={GRID_STYLE}
          rows={spareparts}
          autoHeight
          columns={columnsPartListSpareParts.map((column) => ({
            ...column,
            filterOperators,
          }))}
          editMode="row"
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) =>
            fetchPartsOfPartlist(partListId, newPage, pageSize)
          }
          onPageSizeChange={(newPageSize) =>
            fetchPartsOfPartlist(partListId, page, newPageSize)
          }
          onRowEditStart={(e) => setBulkUpdateProgress(true)}
          sortingMode="server"
          onSortModelChange={(e) => sortPartsTable(e)}
          filterMode="server"
          onFilterModelChange={onPartsFilterChange}
          onRowEditStop={(e) => setBulkUpdateProgress(false)}
          paginationMode="server"
          loading={partsLoading}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rowCount={totalPartsCount}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={(newRow, oldRow) =>
            processRowUpdate(newRow, oldRow)
          }
          // getEstimatedRowHeight={() => 200}
          // getRowHeight={() => "auto"}
          onProcessRowUpdateError={(error) => console.log(error)}
        />
        <div className=" my-3 text-right">
          {/* {["DRAFT", "REVISED"].indexOf(activeElement?.builderStatus) > -1 && (
            <button
              className="btn text-white bg-primary"
              onClick={() => setConfirmationOpen(true)}
              disabled={bulkUpdateProgress}
            >
              Save
            </button>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ClaimRelatedPartList;
