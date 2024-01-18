import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import penIcon from "../../assets/images/pen.png";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import $ from "jquery";
import {
  SOLUTION_QUOTE_DETAILS,
  STANDARD_JOB_DETAIL,
  WITHOUT_SPARE_PARTS_DETAILS,
  WITH_SPARE_PARTS,
} from "navigation/CONSTANTS";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { PORTFOLIO_SEARCH_OPTIONS } from "pages/Repair/CONSTANTS";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getQuoteSearchDropdown,
  portfolioSearch,
  portfolioSearchDropdownList,
  portfolioSearchTableDataList,
} from "services";
import { GET_SEARCH_FAMILY_COVERAGE } from "services/CONSTANTS";
import { createBuilder } from "services/repairBuilderServices";
import { getApiCall } from "services/searchQueryService";
import { uploadItemsToSolutionQuote } from "services/solutionQuoteServices";
import {
  TEMPLATE_OPTIONS,
  UPLOAD_OPTIONS,
  WITHOUT_PARTS,
  WITH_PARTS,
} from "./CONSTANTS";
import { UploadQuoteItems } from "./UploadQuoteItems";
const CardWrapper = (props) => (
  <Card
    sx={{
      textAlign: "center",
      borderRadius: 5,
      height: 400,
      paddingBlock: 3,
      border: 1,
      borderColor: "#00000050",
    }}
    variant="outlined"
  >
    {props.children}
  </Card>
);

const CardWithEvalWrapper = (props) => (
  <Card
    variant="outlined"
    sx={{
      margin: "auto",
      textAlign: "left",
      width: "50%",
      borderRadius: 2,
      marginBlock: 1,
      paddingBlock: 1,
      cursor: "pointer",
      ":hover": { fontWeight: "bold", borderColor: "#872ff7" },
    }}
    onClick={props.onClick}
  >
    {props.children}
  </Card>
);
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
      borderRight: "1px solid rgba(0,0,0,.12)",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      borderRight: "1px solid rgba(0,0,0,.12)",
    },
  },
};

export const CreateSolutionQuote = (props) => {
  const history = useHistory();
  const [selectedQuoteOption, setSelectedQuoteOption] = useState("");

  const clearFilteredData = () => {
    setMasterData([]);
  };
  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: { label: "And", value: "AND" },
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);

  const [masterData, setMasterData] = useState([]);
  const [searchQuoteMasterData, setSearchQuoteMasterData] = useState([]);
  const [show, setShow] = React.useState(false);
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const searchTemplateColumns = [
    { field: "standardJobId", headerName: "ID#", flex: 1, width: 70 },
    { field: "description", headerName: "Description", flex: 1, width: 130 },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value?.map((model) => (
            <Typography style={{ fontSize: 12 }}>{model}</Typography>
          ))}
        </div>
      ),
    },
    {
      field: "family",
      headerName: "Family",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value?.map((family) => (
            <Typography style={{ fontSize: 12 }}>{family}</Typography>
          ))}
        </div>
      ),
    },
    { field: "version", headerName: "Version", flex: 1, width: 130 },
    {
      field: "totalLabourPrice",
      headerName: "Labor $",
      flex: 1,
      width: 130,
    },
    {
      field: "totalMiscPrice",
      headerName: "Misc $",
      flex: 1,
      width: 130,
    },
    { field: "netPrice", headerName: "Total $", flex: 1, width: 130 },
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
            icon={
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => makeTemplateEditable(params.row)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const makeTemplateEditable = (selectedTemplate) => {
    let templateDetails = {
      templateId: "",
      templateDBId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };
    templateDetails.templateId = selectedTemplate.templateId;
    templateDetails.templateDBId = selectedTemplate.id;
    // templateDetails.partListNo = templateDetails.;
    // templateDetails.partListId = selectedTemplate.estimationNumber;
    // templateDetails.versionNumber = selectedTemplate.versionNumber;
    history.push({
      pathname: STANDARD_JOB_DETAIL,
      state: templateDetails,
    });
  };

  const handleApplicationTemplates = async (application) => {
    let searchStr = "usageCategory:" + application;
    try {
      if (searchStr) {
        const res = await portfolioSearch(`${searchStr}`);
        // res.map((template) => {
        //     let family = [],
        //         model = [];
        //     template.coverages.map((coverage) => {
        //         family.push(coverage.coverageFamily);
        //         model.push(coverage.coverageModel);
        //     });
        //     // return {...template, family : family, model: model};
        //     template.family = family;
        //     template.model = model;
        // });
        setMasterData(res);
        // setSearchQuoteMasterData(res.data);
        setPortfolioItemData(res.data);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      debugger;
      handleSnack("error", "Error occurred while fetching templates!");
    }
  };
  const handleQuoteSearchClick = () => {
    try {
      $(".scrollbar").css("display", "none");

      console.log("handleQuerySearchClick", querySearchSelector);

      if (
        querySearchSelector[0]?.selectCategory?.value == "" ||
        querySearchSelector[0]?.inputSearch == "" ||
        querySearchSelector[0]?.selectCategory?.value === undefined
      ) {
        // throw "Please fill data properly"
      }

      var searchStr = `SOLUTION_QUOTE&field_name=${querySearchSelector[0].selectCategory.value}&field_value=${querySearchSelector[0].inputSearch}`;
      // var searchText = "quoteType:SOLUTION_QUOTE AND " + querySearchSelector[0].selectFamily.value + "~" + querySearchSelector[0].inputSearch

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
      getQuoteSearchDropdown(searchStr)
        .then((res) => {
          console.log("search Quote Result :", res);
          if (res.status === 200) {
            setSearchQuoteMasterData(res.data);
          } else {
            toast("😐" + res.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          // setBundleServiceShow(true)
        })
        .catch((err) => {
          console.log("error in getSearchQueryCoverage", err);
        });
    } catch (error) {
      console.log("error in getSearchQueryCoverage", error);
      toast("😐" + error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  };

  const [file, setFile] = useState(null);

  const handleReadFile = (file) => {
    // e.preventDefault();
    if (file) {
      setFile(file);
    }
  };
  //Uplaod quote through excel sheet
  const handleUploadFile = async () => {
    // console.log("Upload");
    const form = new FormData();
    form.append("file", file);
    await uploadItemsToSolutionQuote(form)
      .then((createdQuote) => {
        handleSnack(
          "success",
          `Quote has been created successfully with the items`
        );
        let quoteDetails = {
          quoteId: "",
          // templateDBId: "",
          type: "fetch",
        };
        quoteDetails.quoteId = createdQuote.quoteId;
        // templateDetails.templateDBId = createdQuote.id;
        history.push({
          pathname: SOLUTION_QUOTE_DETAILS,
          state: quoteDetails,
        });
      })
      .catch((err) => {
        handleSnack("error", `Failed to upload the items!`);
      });
  };

  const handleClickTemplate = (applicationType) => {
    setShowOptions(false);
    setSelectedQuoteOption("Start_with_template");
    handleApplicationTemplates(applicationType);
  };
  const createNewBuilder = (e) => {
    let builderDetails = {
      builderId: "",
      bId: "",
      type: "new",
    };
    if (e === "without") {
      createBuilder({
        builderType: WITHOUT_PARTS,
        activeVersion: true,
        versionNumber: 1,
        status: "DRAFT",
      })
        .then((result) => {
          builderDetails.builderId = result.builderId;
          builderDetails.bId = result.id;

          history.push({
            pathname: WITHOUT_SPARE_PARTS_DETAILS,
            state: builderDetails,
          });
        })
        .catch((err) => {
          console.log("Error Occurred", err);
          handleSnack("error", "Error occurred while creating builder!");
        });
    } else if (e === "with") {
      createBuilder({
        builderType: WITH_PARTS,
        activeVersion: true,
        versionNumber: 1,
        status: "DRAFT",
      })
        .then((result) => {
          builderDetails.builderId = result.builderId;
          builderDetails.bId = result.id;

          history.push({
            pathname: WITH_SPARE_PARTS,
            state: builderDetails,
          });
        })
        .catch((err) => {
          console.log("Error Occurred", err);
          handleSnack("error", "Error occurred while creating builder!");
        });
    }
  };

  const innerCard = (indAppOption, handleClick) => (
    <Grid
      item
      container
      xs={12}
      md={7}
      sx={{
        border: 1,
        margin: "auto",
        width: "70%",
        textAlign: "left",
        borderRadius: 2,
        marginBlock: 1,
        paddingBlock: 1,
        borderColor: "#00000025",
        cursor: "pointer",
        ":hover": { fontWeight: "bold", borderColor: "#872ff7" },
        color:
          indAppOption.value === "gsheet" || indAppOption.value === "paste"
            ? "gray"
            : "black",
      }}
      onClick={() => handleClick(indAppOption.value)}
    >
      {indAppOption.icon}
      {indAppOption.label}
    </Grid>
  );
  const handleClickUpload = (val) => {
    if (val !== "gsheet" && val !== "paste") {
      setShowOptions(false);
      setSelectedQuoteOption("upload_excel");
    }
  };

  const [count, setCount] = useState(1);
  const [selectedItemType, setSelectedItemType] = useState("PORTFOLIO");
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [portfolioItemData, setPortfolioItemData] = useState([]);
  const addSearchQuerryHtml = () => {
    // New Updated 24 Nov 2022
    if (count !== 2) {
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
    }
  };
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", tempArray[id]);
    let obj = tempArray[id];
    obj.inputSearch = "";
    obj.selectOptions = [];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    if (selectedItemType === "PORTFOLIO") {
      var newArr = [];
      var SearchResArr = [];
      if (
        tempArray[id].selectFamily.value === "name" ||
        tempArray[id].selectFamily.value === "description"
      ) {
        portfolioSearchDropdownList(
          `${tempArray[id].selectFamily.value}/${e.target.value}`
        )
          .then((res) => {
            if (res.status === 200) {
              for (let i = 0; i < res.data.length; i++) {
                if (
                  tempArray[id].selectFamily.value === "name" ||
                  tempArray[id].selectFamily.value === "description"
                ) {
                  SearchResArr.push(res.data[i].key);
                } else {
                  SearchResArr.push(res.data[i].value);
                }
              }
            }
            obj.selectOptions = SearchResArr;
            tempArray[id] = obj;
            setQuerySearchSelector([...tempArray]);
            $(`.scrollbar-${id}`).css("display", "block");
          })
          .catch((err) => {
            console.log("err in api call", err);
          });
      } else {
        const url =
          GET_SEARCH_FAMILY_COVERAGE +
          "?" +
          tempArray[id].selectFamily.value +
          "=" +
          e.target.value;
        let loading, data, failure;
        getApiCall(url, loading, data, failure)
          .then((res) => {
            console.log("response coverage ", res);
            obj.selectOptions = res;
            tempArray[id] = obj;
            setQuerySearchSelector([...tempArray]);
            $(`.scrollbar-${id}`).css("display", "block");
          })
          .catch((err) => {
            console.log("err in api call", err);
          });
      }
    }
    obj.inputSearch = e.target.value;
    setQuerySearchSelector([...tempArray]);
  };
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch =
      selectedItemType === "PORTFOLIO"
        ? obj1.selectFamily.value === "name" ||
          obj1.selectFamily.value === "description"
          ? currentItem.split("#")[1]
          : currentItem
        : currentItem.split("#")[1];
    obj.selectedOption =
      selectedItemType === "PORTFOLIO"
        ? obj1.selectFamily.value === "name" ||
          obj1.selectFamily.value === "description"
          ? currentItem.split("#")[1]
          : currentItem
        : currentItem.split("#")[1];
    obj.selectedKeyValue =
      selectedItemType === "PORTFOLIO"
        ? obj1.selectFamily.value === "name" ||
          obj1.selectFamily.value === "description"
          ? currentItem.split("#")[0]
          : currentItem
        : currentItem.split("#")[0];
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };

  const handleLandingPageQuerySearchClick = async () => {
    try {
      if (
        selectedItemType == "" ||
        querySearchSelector[0]?.selectFamily?.value == "" ||
        querySearchSelector[0]?.inputSearch == "" ||
        querySearchSelector[0]?.selectFamily?.value === undefined
      ) {
        throw "Please fill data properly";
      }
      var searchStr;
      if (selectedItemType === "PORTFOLIO") {
        var selectedFamily =
          querySearchSelector[0]?.selectFamily.value === "name" ||
          querySearchSelector[0]?.selectFamily.value === "description"
            ? `portfolio_id=${querySearchSelector[0]?.selectedKeyValue}`
            : `${querySearchSelector[0]?.selectFamily.value}=${querySearchSelector[0]?.inputSearch}`;
        // var searchStr = `${selectedFamily}:"${(querySearchSelector[0]?.inputSearch)}"`;
        var searchStr = selectedFamily;
      }

      for (let i = 1; i < querySearchSelector.length; i++) {
        if (
          querySearchSelector[i]?.selectFamily?.value == "" ||
          querySearchSelector[i]?.inputSearch == ""
        ) {
          throw "Please fill data properly";
        }
        if (selectedItemType === "PORTFOLIO") {
          var selectedQuerySelectorFamily =
            querySearchSelector[i].selectFamily.value === "name" ||
            querySearchSelector[i].selectFamily.value === "description"
              ? `portfolio_id=${querySearchSelector[0]?.selectedKeyValue}`
              : `${querySearchSelector[i].selectFamily.value}=${querySearchSelector[i]?.inputSearch}`;

          searchStr =
            searchStr +
            "&" +
            (querySearchSelector[i].selectFamily.value === "name" ||
            querySearchSelector[i].selectFamily.value === "description"
              ? `portfolio_id=${querySearchSelector[i]?.selectedKeyValue}`
              : `${querySearchSelector[i].selectFamily.value}=${querySearchSelector[i]?.inputSearch}`);
        }
      }

      if (selectedItemType === "PORTFOLIO") {
        var newArr = [];
        const res2 = await portfolioSearchTableDataList(searchStr);
        if (res2.status === 200) {
          setPortfolioItemData(res2.data);
        } else {
          throw "No information is found for your search, change the search criteria";
        }
        console.log("set PortfolioItemData : ", res2);
      }
    } catch (error) {
      toast("😐" + error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  };
  const SearchedPortfolioColumn = [
    {
      name: (
        <>
          {/* <div>Solution Id</div> */}
          <div>Name</div>
        </>
      ),
      selector: (row) => row?.name,
      wrap: true,
      sortable: true,
      format: (row) => row?.name,
    },
    {
      name: (
        <>
          <div>Description</div>
        </>
      ),
      selector: (row) => row?.description,
      wrap: true,
      sortable: true,
      format: (row) => row?.description,
    },
    {
      name: (
        <>
          <div>Strategy</div>
        </>
      ),
      selector: (row) => row?.strategyTask,
      wrap: true,
      sortable: true,
      format: (row) => row?.strategyTask,
    },
    {
      name: (
        <>
          <div>Task Type</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Net Price</div>
        </>
      ),
      selector: (row) => row?.netPrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.netPrice,
    },
    {
      name: (
        <>
          <div>Net Additional</div>
        </>
      ),
      selector: (row) => row?.additionalPrice?.additionalPercentage,
      wrap: true,
      sortable: true,
      format: (row) => row?.additionalPrice?.additionalPercentage,
    },
    {
      name: (
        <>
          <div>Net Parts Price</div>
        </>
      ),
      // selector: (row) => row?.portfolioPrice?.sparePartsPrice,
      // wrap: true,
      // sortable: true,
      // format: (row) => row?.portfolioPrice?.sparePartsPrice,
      selector: (row) => row?.netPartsPrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.netPartsPrice,
    },
    {
      name: (
        <>
          <div>Net Service Price</div>
        </>
      ),
      selector: (row) => row?.netServicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.netServicePrice,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row?.calculatedPrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.calculatedPrice,
    },
    {
      name: (
        <>
          <div>Action</div>
        </>
      ),
      selector: (row) => row.action,
      wrap: true,
      sortable: true,
      format: (row) => row.action,
      cell: (row) => (
        <div>
          <a
            href={undefined}
            onClick={() => makePortfolioEditableEditable(row)}
            style={{ cursor: "pointer" }}
          >
            <img className="mr-2" src={penIcon} />
          </a>
        </div>
      ),
    },
  ];
  const makePortfolioEditableEditable = (portfolioData) => {
    // console.log("----------", PortfolioData);
    let portfolioDetails = {
      portfolioId: portfolioData.portfolioId,
      type: "fetch",
    };
    history.push({
      pathname: "/portfolio/new",
      state: portfolioDetails,
    });
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
        <div className="container-fluid mt-4">
          <div className="align-items-center justify-content-between mt-2">
            <h4 className="text-center font-weight-600 mb-0 ">
              Create Solution Quote
            </h4>
            {showOptions ? (
              <></>
            ) : (
              <button
                className="btn bg-primary text-white mr-2"
                onClick={() => {
                  setShowOptions(true);
                  setQuerySearchSelector([
                    {
                      id: 0,
                      selectFamily: "",
                      selectOperator: { label: "And", value: "AND" },
                      inputSearch: "",
                      selectOptions: [],
                      selectedOption: "",
                    },
                  ]);
                  setSearchQuoteMasterData([]);
                  setPortfolioItemData([]);
                }}
              >
                Back
              </button>
            )}
          </div>
          <Box className="mt-3" sx={{ width: "100%", typography: "body1" }}>
            {showOptions ? (
              <Box
                className="mt-3 grid-box"
                sx={{ width: "72%", typography: "body1" }}
              >
                <Grid
                  container
                  columnSpacing={3}
                  rowSpacing={5}
                  justifyContent={"center"}
                >
                  <Grid item xs={12} md={4}>
                    <CardWrapper>
                      <Typography variant="h6">Start from scratch</Typography>
                      <Typography variant="body2" paddingY={2}>
                        Create a new quote with an evaluation.
                      </Typography>

                      {/* <CardWithEvalWrapper
                        onClick={() => {
                          history.push({
                            pathname: "/portfolio/new",
                            state: {
                              portfolioId: "",
                              type: "new",
                            },
                          });
                        }}
                      >
                        <SettingsSuggestTwoToneIcon
                          sx={{ mx: 2, color: "green" }}
                        />
                        Portfolio
                      </CardWithEvalWrapper>

                      <CardWithEvalWrapper
                        onClick={() => {
                          history.push({
                            pathname: "/solutionBuilder/create",
                            state: {
                              portfolioId: "",
                              type: "new",
                            },
                          });
                        }}
                      >
                        <ManageAccountsTwoToneIcon
                          sx={{ mx: 2, color: "blue" }}
                        />
                        Solution
                      </CardWithEvalWrapper> */}

                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Grid container>
                          <Grid
                            item
                            container
                            xs={12}
                            md={4}
                            sx={{
                              border: 1,
                              margin: "auto",
                              width: "40%",
                              textAlign: "left",
                              fontSize: "14px",
                              borderRadius: 2,
                              marginBlock: 0.6,
                              // paddingBlock: 0.8,
                              borderColor: "#00000025",
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                              cursor: "pointer",
                              ":hover": {
                                fontWeight: "bold",
                                borderColor: "#872ff7",
                              },
                            }}
                          >
                            <Typography
                              variant="h3"
                              paddingY={1}
                              sx={{ color: "#8c8c8c" }}
                            >
                              +
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>

                      <CardActions sx={{ justifyContent: "center" }}>
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ paddingY: 3 }}
                        >
                          See all import options
                        </Typography>
                      </CardActions>

                      {/* <Card variant="outlined" onClick={() => { history.push("/solutionBuilder/analytics") }}
                                            sx={{ margin: 'auto', width: "20%", borderRadius: 5, p: 5, my: 2 }}
                                            className="border-primary mouse-pointer"
                                        >+</Card> */}
                    </CardWrapper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CardWrapper>
                      <Typography variant={"h6"}>
                        Start with template
                      </Typography>
                      <Typography variant="body2" paddingY={2}>
                        Select a template to get started and customize as you
                        go.
                      </Typography>
                      {/* <Grid container>
                                            {TEMPLATE_OPTIONS.map(indAppOption =>
                                                <Tooltip arrow placement='left' title={indAppOption.value === 'gsheet' || indAppOption.value === 'paste' ? "Will be available in next version" : ""}>
                                                    {innerCard(indAppOption, handleClickUpload)}
                                                </Tooltip>)}
                                        </Grid> */}

                      <Grid container>
                        {TEMPLATE_OPTIONS.map((indAppOption) =>
                          innerCard(indAppOption, handleClickTemplate)
                        )}
                      </Grid>
                    </CardWrapper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CardWrapper>
                      <Typography variant={"h6"}>Import Excel</Typography>
                      <Typography variant="body2" paddingY={2}>
                        Import your existing quotes from an Excel or CSV into
                        Servicecpq.
                      </Typography>
                      <Grid container>
                        {UPLOAD_OPTIONS.map((indAppOption) => (
                          <Tooltip
                            arrow
                            placement="left"
                            title={
                              indAppOption.value === "gsheet" ||
                              indAppOption.value === "paste"
                                ? "Will be available in next version"
                                : ""
                            }
                          >
                            {innerCard(indAppOption, handleClickUpload)}
                          </Tooltip>
                        ))}
                      </Grid>
                    </CardWrapper>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <div>
                {/* {selectedQuoteOption === "with_eval" && <QuoteWithEvaluation setShowOptions={setShowOptions} />} */}
                {selectedQuoteOption === "Start_with_template" && (
                  <>
                    <div className="bg-primary px-3 my-3 border-radius-6">
                      <div className="d-md-flex d-block justify-content-between align-items-center height-66">
                        <div className=" mx-2">
                          <div className="d-flex align-items-center bg-primary w-100">
                            <div
                              className="d-flex mr-3"
                              style={{ whiteSpace: "pre" }}
                            >
                              {/* <h5 className="mr-2 mb-0 text-white">
                                                                <span>Search</span>
                                                            </h5> */}
                            </div>
                            {/* <SearchComponent
                                                            querySearchSelector={querySearchSelector}
                                                            setQuerySearchSelector={setQuerySearchSelector}
                                                            clearFilteredData={clearFilteredData}
                                                            handleSnack={handleSnack}
                                                            searchAPI={portfolioSearchDropdownList}
                                                            searchClick={handleQuoteSearchClick}
                                                            options={PORTFOLIO_SEARCH_OPTIONS}
                                                            color="white"
                                                            quoteType={"SOLUTION_QUOTE"}
                                                            buttonText="SEARCH"
                                                        /> */}
                            <div className="d-flex align-items-center bg-primary w-100">
                              <div
                                className="d-flex mr-2"
                                style={{ whiteSpace: "pre" }}
                              >
                                <h5 className="mr-2 mb-0 text-white">
                                  <span>Search</span>
                                </h5>
                                <p className="ml-4 mb-0">
                                  <a
                                    href={undefined}
                                    className="ml-3 cursor text-white"
                                  >
                                    <EditOutlinedIcon />
                                  </a>
                                  <a
                                    href={undefined}
                                    className="ml-3 cursor text-white"
                                  >
                                    <ShareOutlinedIcon />
                                  </a>
                                </p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center w-100 mr-4">
                                <div className="row align-items-center m-0">
                                  {querySearchSelector.map((obj, i) => {
                                    return (
                                      <>
                                        <div
                                          className={`customselect ${
                                            i < querySearchSelector.length - 1
                                              ? "p-2"
                                              : ""
                                          } border-white d-flex align-items-center mr-3 my-2 border-radius-10`}
                                        >
                                          {i === 0 ? <></> : <></>}
                                          {i > 0 ? (
                                            <Select
                                              isClearable={true}
                                              defaultValue={{
                                                label: "AND",
                                                value: "AND",
                                              }}
                                              options={[
                                                {
                                                  label: "AND",
                                                  value: "AND",
                                                  id: i,
                                                },
                                                {
                                                  label: "OR",
                                                  value: "OR",
                                                  id: i,
                                                },
                                              ]}
                                              placeholder="AND/OR"
                                              // onChange={(e) => handleOperator(e, i)}
                                              value={obj.selectOperator}
                                            />
                                          ) : (
                                            <></>
                                          )}

                                          <div>
                                            <Select
                                              options={PORTFOLIO_SEARCH_OPTIONS}
                                              onChange={(e) =>
                                                handleFamily(e, i)
                                              }
                                              value={obj.selectFamily}
                                              // isOptionDisabled={(option) => checkForDisabled(option)}
                                            />
                                          </div>
                                          <div className="customselectsearch">
                                            <input
                                              className="custom-input-sleact pr-1"
                                              type="text"
                                              placeholder="Search string"
                                              value={obj.inputSearch}
                                              onChange={(e) =>
                                                handleInputSearch(e, i)
                                              }
                                              id={"inputSearch-" + i}
                                              autoComplete="off"
                                            />

                                            {
                                              <ul
                                                className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                                                id="style"
                                              >
                                                {obj.selectOptions.map(
                                                  (currentItem, j) => (
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
                                                      {selectedItemType ===
                                                      "PORTFOLIO"
                                                        ? obj.selectFamily
                                                            .value === "name" ||
                                                          obj.selectFamily
                                                            .value ===
                                                            "description"
                                                          ? currentItem.split(
                                                              "#"
                                                            )[1]
                                                          : currentItem
                                                        : currentItem.split(
                                                            "#"
                                                          )[1]}
                                                      {/* {(obj.selectFamily.value === "name") ||
                                          (obj.selectFamily.value === "description") ?
                                          currentItem.split("#")[1] : currentItem
                                        } */}
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            }
                                          </div>
                                          {querySearchSelector.length - 1 ===
                                          i ? (
                                            <>
                                              <Link
                                                to="#"
                                                className="btn bg-primary text-white border-radius-10"
                                                onClick={
                                                  handleLandingPageQuerySearchClick
                                                }
                                              >
                                                <SearchIcon />
                                                <span className="ml-1">
                                                  Search
                                                </span>
                                              </Link>
                                            </>
                                          ) : (
                                            <></>
                                          )}
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
                                        fill="white"
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
                              {/* <div className="pl-3 py-3">
                    <Link to="#" className="btn bg-primary text-white" onClick={handleLandingPageQuerySearchClick}>
                      <SearchIcon /><span className="ml-1">Search</span>
                    </Link>
                  </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div
                        className=""
                        style={{
                          height: 400,
                          width: "100%",
                          backgroundColor: "#fff",
                        }}
                      >
                        {/* <DataGrid
                                                    sx={GRID_STYLE}
                                                    rows={masterData}
                                                    columns={searchTemplateColumns}
                                                    pageSize={5}
                                                    rowsPerPageOptions={[5]}
                                                    autoHeight
                                                /> */}
                        <DataTable
                          className=""
                          title=""
                          columns={SearchedPortfolioColumn}
                          data={portfolioItemData}
                          customStyles={customStyles}
                          pagination
                          // onRowClicked={(e) => handleRowClick(e)}
                          // selectableRows
                        />
                      </div>
                    </div>
                  </>
                )}
                {selectedQuoteOption === "upload_excel" && (
                  <UploadQuoteItems
                    handleUploadFile={handleUploadFile}
                    handleReadFile={handleReadFile}
                    file={file}
                    back={() => setShowOptions(true)}
                  />
                )}
              </div>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};
