import { Card, Grid, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import $ from "jquery";
import { SPARE_PARTS_QUOTE_DETAILS } from "navigation/CONSTANTS";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { kitSearch } from "services/kitService";
import { addPartlist, builderSearch, createBuilder } from "services/repairBuilderServices";
import { uploadItemsToPartsQuote } from "services/repairQuoteServices";
import penIcon from "../../../assets/images/pen.png";
import { APPLICATION_OPTIONS, GRID_STYLE, KIT_SEARCH_Q_OPTIONS, UPLOAD_OPTIONS } from "../CONSTANTS";
import SearchComponent from "../components/SearchComponent";
import { repairActions } from "../dropdowns/repairSlice";
import { UploadQuoteItems } from "./UploadQuoteItems";
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
const CardWrapper = (props) => <Card sx={{ textAlign: 'center', borderRadius: 5, height: 400, paddingBlock: 3, border: 1, borderColor: '#00000050' }} variant="outlined">{props.children}</Card>

const CreatePartQuote = () => {
  const [value, setValue] = React.useState("partlist");
  const history = useHistory();
  const [showOptions, setShowOptions] = useState(true);
  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [recentPartlists, setRecentPartlists] = useState([]);
  const [recentBuildersLoading, setRecentBuildersLoading] = useState(true);
  const [selectedQuoteOption, setSelectedQuoteOption] = useState("");

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const makeKitEditable = (selectedKIT) => {
    let kitDetails = {
      kitId: "",
      kitDBId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };
    kitDetails.kitId = selectedKIT.kitId;
    kitDetails.kitDBId = selectedKIT.id;
    // kitDetails.partListNo = kitDetails.;
    // kitDetails.partListId = selectedKIT.estimationNumber;
    // kitDetails.versionNumber = selectedKIT.versionNumber;
    history.push({
      pathname: "/RepairKits/Kits",
      state: kitDetails,
    });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fileTypes = ["xls", "xlsx"];
  // Once opetion has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
  };
  const handleApplicationKIT = async (application) => {
    let searchStr = "application:" + application;
    try {
      if (searchStr) {
        const res = await kitSearch(`kitId~KT AND ${searchStr}`);
        res.map((kit) => {
          let family = [],
            model = [];
          kit.coverages.map((coverage) => {
            family.push(coverage.coverageFamily);
            model.push(coverage.coverageModel);
          });
          // return {...kit, family : family, model: model};
          kit.family = family;
          kit.model = model;
        });
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching templates!");
    }
  }
  const handleQuerySearchClick = async () => {
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
        const res = await kitSearch(`kitId~KT AND ${searchStr}`);
        res.map((kit) => {
          let family = [],
            model = [];
          kit.coverages.map((coverage) => {
            family.push(coverage.coverageFamily);
            model.push(coverage.coverageModel);
          });
          // return {...kit, family : family, model: model};
          kit.family = family;
          kit.model = model;
        });
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      console.log(err);
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(repairActions.fetchDropdowns());
    fetcheRecentPartlists();
    if (JSON.parse(localStorage.getItem("exitingType"))) {
      localStorage.removeItem("exitingType");
    }
  }, []);

  const fetcheRecentPartlists = () => {
    setRecentBuildersLoading(true);

    builderSearch(
      `builderType:PARTLIST AND saved:true&pageSize=10&sortColumn=updatedAt&orderBY=DESC`
    )
      .then((result) => {
        if (result) {
          setRecentPartlists(result);
          setRecentBuildersLoading(false);
        }
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while fetching recent partlists");
        setRecentBuildersLoading(false);
      });
  };

  const searchKitColumns = [
    { field: "kitId", headerName: "ID#", flex: 1, width: 70 },
    { field: "description", headerName: "Description", flex: 1, width: 130 },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value?.map((model) => (
            <Typography display="block" style={{ fontSize: 12 }}>
              {model}
            </Typography>
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
            <Typography display="block" style={{ fontSize: 12 }}>
              {family}
            </Typography>
          ))}
        </div>
      ),
    },
    { field: "version", headerName: "Version", flex: 1, width: 130 },
    {
      field: "source",
      headerName: "Source",
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
            onClick={() => makeKitEditable(params.row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [show, setShow] = React.useState(false);
  const [masterData, setMasterData] = useState([]);

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

  const [file, setFile] = useState(null);

  const handleReadFile = (file) => {
    // e.preventDefault();
    if (file) {
      setFile(file);
    }
  };
  //Uplaod spare parts through excel sheet
  const handleUploadFile = async () => {
    // console.log("Upload");
    const form = new FormData();
    form.append("file", file);
    await uploadItemsToPartsQuote(form)
      .then((createdQuote) => {
        handleSnack(
          "success",
          `Quote has been created successfully with the items`
        );
        let quoteDetails = {
          quoteId: "",
          type: "fetch",
        };
        quoteDetails.quoteId = createdQuote.quoteId;
        // templateDetails.templateDBId = createdQuote.id;
        history.push({
          pathname: SPARE_PARTS_QUOTE_DETAILS,
          state: quoteDetails,
        });
      })
      .catch((err) => {
        handleSnack("error", `Failed to upload the items!`);
      });
  };

  const handleClickKIT = (applicationType) => {
    setShowOptions(false);
    setSelectedQuoteOption("without_eval");
    handleApplicationKIT(applicationType)
  }
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
        handleSnack("error", "Error occurred while creating partlist!");
      });
  };
  const innerCard = (indAppOption, handleClick) => <Grid item container xs={12} md={7}
    sx={{
      border: 1,
      margin: 'auto',
      width: "70%",
      textAlign: 'left',
      borderRadius: 2,
      marginBlock: 1,
      paddingBlock: 1,
      borderColor: "#00000025",
      cursor: 'pointer',
      ':hover': { fontWeight: 'bold', borderColor: '#872ff7' },
      color: indAppOption.value === 'gsheet' || indAppOption.value === 'paste' ? 'gray' : "black",
    }}
    onClick={() => handleClick(indAppOption.value)}>
    {indAppOption.icon}{indAppOption.label}
  </Grid>
  const handleClickUpload = (val) => {
    if (val !== 'gsheet' && val !== 'paste') {
      setShowOptions(false);
      setSelectedQuoteOption("upload_excel")
    }
  }
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
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Create Sparepart Quote</h5>
            {showOptions ? <></> : <button
              className="btn bg-primary text-white mr-2"
              onClick={() => {
                setShowOptions(true);
              }}
            >
              Back
            </button>}
          </div>
          <Box className="mt-3" sx={{ width: "100%", typography: "body1" }}>
            {showOptions ?
              (<Box className="mt-3 grid-box" sx={{ width: "72%", typography: "body1" }}><Grid container columnSpacing={3} rowSpacing={5} justifyContent={'center'}>
                <Grid item xs={12} md={4} >
                  <CardWrapper>
                    <Typography variant='h6'>
                      With Evaluation
                    </Typography>
                    <Typography variant="body2" paddingY={2}>
                      Create a new quote with an evaluation.
                    </Typography>
                    <Card variant="outlined"
                      sx={{
                        margin: 'auto',
                        textAlign: 'left',
                        width: "40%",
                        borderRadius: 2,
                        marginBlock: 1,
                        paddingBlock: 1,
                        cursor: 'pointer',
                        ':hover': { fontWeight: 'bold', borderColor: '#872ff7' },
                      }}
                      onClick={() => createNewBuilder()}>
                      <PrecisionManufacturingTwoToneIcon sx={{ mx: 2, color: 'green' }} />Partlist
                    </Card>

                    {/* <Typography variant="body1" sx={{ m: 4 }}>
                      Create A Quote
                    </Typography>
                    <Typography variant="caption">
                      Go To Partlist
                    </Typography> */}
                  </CardWrapper>

                </Grid>
                <Grid item xs={12} md={4}>
                  <CardWrapper>
                    <Typography variant={"h6"}>
                      Without Evaluation
                    </Typography>
                    <Typography variant="body2" paddingY={2}>
                      Select a kit to get started and customize as you go.
                    </Typography>
                    <Grid container>
                      {APPLICATION_OPTIONS.map(indAppOption => innerCard(indAppOption, handleClickKIT))}
                    </Grid>
                  </CardWrapper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <CardWrapper>
                    <Typography variant={"h6"}>
                      Import Excel
                    </Typography>
                    <Typography variant="body2" paddingY={2}>
                      Import your existing quotes from an Excel or CSV into Servicecpq.
                    </Typography>
                    <Grid container >
                      {UPLOAD_OPTIONS.map(indAppOption =>
                        <Tooltip arrow placement='left' title={indAppOption.value === 'gsheet' || indAppOption.value === 'paste' ? "Will be available in next version" : ""}>
                          {innerCard(indAppOption, handleClickUpload)}
                        </Tooltip>)}
                    </Grid>
                  </CardWrapper>
                </Grid>
              </Grid></Box>)
              :
              (<div>
                {/* {selectedQuoteOption === "with_eval" && <QuoteWithEvaluation setShowOptions={setShowOptions} />} */}
                {selectedQuoteOption === "without_eval" &&
                  <>
                    <div className="bg-primary px-3 my-3 border-radius-6">
                      <div className="d-md-flex d-block justify-content-between align-items-center height-66">
                        <div className=" mx-2">
                          <div className="d-flex align-items-center bg-primary w-100">
                            <div
                              className="d-flex mr-3"
                              style={{ whiteSpace: "pre" }}
                            >
                              <h5 className="mr-2 mb-0 text-white">
                                <span>Search</span>
                              </h5>
                            </div>
                            <SearchComponent
                              querySearchSelector={querySearchSelector}
                              setQuerySearchSelector={setQuerySearchSelector}
                              clearFilteredData={clearFilteredData}
                              handleSnack={handleSnack}
                              searchAPI={kitSearch}
                              searchClick={handleQuerySearchClick}
                              options={KIT_SEARCH_Q_OPTIONS}
                              color="white"
                              buttonText={"SEARCH"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <DataGrid
                        sx={GRID_STYLE}
                        rows={masterData}
                        columns={searchKitColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowHeight={() => "auto"}
                        getEstimatedRowHeight={() => 200}
                        autoHeight
                      />
                      <button
                        className="btn bg-primary text-white mr-2"
                        onClick={() => {
                          setShowOptions(true);
                        }}
                      >
                        Back To Options
                      </button>
                    </div>
                  </>
                }
                {selectedQuoteOption === "upload_excel" &&
                  <UploadQuoteItems handleUploadFile={handleUploadFile} handleReadFile={handleReadFile} file={file} back={() => setShowOptions(true)} />
                }
              </div>
              )}

          </Box>
        </div>
      </div>
    </>
  );
};

export default CreatePartQuote;
