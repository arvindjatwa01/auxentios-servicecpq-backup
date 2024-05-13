import React, { useCallback, useEffect, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { TextField, Tooltip } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import $ from "jquery";
import Select from "react-select";
import Moment from "react-moment";

import {
    FONT_STYLE,
    FONT_STYLE_SELECT,
    GRID_STYLE,
} from "pages/Common/constants";
import { claimRelatedHERequestObj } from "../warrantyManagementConstants";
import {
    callDeleteApi,
    callGetApi,
    callPostApi,
    callPutApi,
} from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import {
    RELATED_HOURS_EXPENSES_MASTER_URL,
    RELATED_PARTS_MASTER_URL,
} from "services/CONSTANTS";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { sparePartSearch } from "services/searchServices";
import SearchComponent from "pages/components/SearchComponent";
import { SPAREPART_SEARCH_Q_OPTIONS } from "pages/Repair/CONSTANTS";
import SearchPartListModal from "./SearchPartListModal";
import SupplierClaimSummaryModal from "./SupplierClaimSummaryModal";
import { useAuth } from "navigation/Auth/ProvideAuth";

const typeOptions = [
    { label: "OEM", value: "OEM" },
    { label: "Supplier", value: "SUPPLIER" },
    { label: "Dealer", value: "DEALER" },
    { label: "Channel Partner", value: "CHANNEL_PARTNER" },
];

const climentOpt = [{ label: "Partner", value: "CHANNEL_PARTNER" }];

const codeOptions = [
    // { label: "User-defined", value: "USER_DEFINED" },
    // { label: "Auto-derived", value: "AUTO_DERIVED" },
    { label: "User-defined", value: "USER_DRIVED" },
    { label: "Auto-derived", value: "AUTO_DERIVED" },
];

const coverageTypeOptions = [
    { label: "All Covered", value: "CT_04" },
    { label: "Parts & Labour", value: "CT_01" },
    { label: "Only Parts", value: "CT_02" },
    { label: "Part & Labour & Misc.", value: "CT_03" },
];

const ClaimRelatedHoursAndExpenses = ({
    handleBack,
    handleSnack,
    relatedHEId,
    setRelatedHEId,
    claimOrderId,
    claimNumber,
    coverageTypeValue,
    relatedPartsRecords = [],
    setRelatedPartsRecords,
    handleViewClaimValue,
}) => {
    const { user } = useAuth();

    console.log("usser ::: ", user);
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
    const [openClaimSuplierModal, setOpenClaimSuplierModal] = useState(false);
    const [claimSupplierRecord, setClaimSupplierRecord] = useState("");

    const [claimRelateHERecordData, setClaimRelateHERecordData] = useState({
        ...claimRelatedHERequestObj,
        type: climentOpt[0],
        name: "KOOLAN IRON ORE PTY LTD",
        claimOrderId: claimOrderId,
        coverageType: coverageTypeValue,
    });

    const [viewOnly, setViewOnly] = useState(false);

    useEffect(() => {
        if (relatedHEId) {
            setViewOnly(true);
            callGetApi(
                `${RELATED_HOURS_EXPENSES_MASTER_URL}/${relatedHEId}`,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        const responseData = response.data;

                        // set code value
                        const _code = codeOptions.find(
                            (obj) => obj.value === responseData.code
                        );

                        // // set alternate code value
                        // const _alternateCode = codeOptions.find(
                        //     (obj) => obj.value === responseData.alternateCode
                        // );

                        // set alternate code value
                        const _coverageType = coverageTypeOptions.find(
                            (obj) => obj.value === responseData.coverageType
                        );

                        setClaimRelateHERecordData({
                            ...responseData,
                            type: climentOpt[0],
                            code: _code || "",
                            // alternateCode: _alternateCode || "",
                            coverageType: _coverageType || "",
                        });
                    }
                }
            );
        }
    }, [relatedHEId]);

    // clear filter
    const clearFilteredData = () => {
        setMasterData([]);
    };

    // Consumable Search
    const handleQuerySearchClick = async (type) => {
        $(".scrollbar").css("display", "none");
        // console.log("handleQuerySearchClick", querySearchSelector);
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

    // Close SparePart search modal
    const handleSearchResClose = () => {
        setSearchResultOpen(false);
        // setSelectedMasterData([]);
    };

    const handleRowEditStart = (params, event) => {
        console.log(params);
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (relatedPartsId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [relatedPartsId]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (relatedPartsId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [relatedPartsId]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (relatedPartsId) => () => {
        callDeleteApi(
            null,
            `${RELATED_PARTS_MASTER_URL}/${relatedPartsId}`,
            (response) => {
                if (response.status === API_SUCCESS) {
                    setRelatedPartsRecords(
                        relatedPartsRecords.filter(
                            (row) => row.relatedPartsId !== relatedPartsId
                        )
                    );
                }
            }
        );
    };

    const handleCancelClick = (relatedPartsId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [relatedPartsId]: {
                mode: GridRowModes.View,
                ignoreModifications: true,
            },
        });

        const editedRow = relatedPartsRecords.find(
            (row) => row.relatedPartsId === relatedPartsId
        );
        if (editedRow.isNew) {
            setRelatedPartsRecords(
                relatedPartsRecords.filter(
                    (row) => row.relatedPartsId !== relatedPartsId
                )
            );
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleClaimSupplierOpen = (row) => {
        setClaimSupplierRecord(row);
        setOpenClaimSuplierModal(true);
    };

    const handleClaimSupplierClose = (row) => {
        setClaimSupplierRecord("");
        setOpenClaimSuplierModal(false);
    };

    const processRowUpdate = useCallback(
        (newRow, oldRow) =>
            new Promise((resolve, reject) => {
                const updatedRow = { ...newRow, isNew: true };

                callPutApi(
                    null,
                    `${RELATED_PARTS_MASTER_URL}/${newRow.relatedPartsId}`,
                    updatedRow,
                    (response) => {
                        if (response.status === API_SUCCESS) {
                            handleSnack(
                                "success",
                                "Parts updated successfully"
                            );
                            setRelatedPartsRecords(
                                relatedPartsRecords.map((row) =>
                                    row.relatedPartsId ===
                                    updatedRow.relatedPartsId
                                        ? { ...updatedRow, isNew: undefined }
                                        : row
                                )
                            );
                            resolve(response.data);
                        } else {
                            handleSnack(
                                "error",
                                "Parts details could not be updated"
                            );
                            resolve(oldRow);
                        }
                    }
                );

                resolve(updatedRow);
            }),
        [relatedPartsRecords]
    );

    // input fields value change
    const handleInputFieldChange = (e) => {
        const { name, value } = e.target;
        setClaimRelateHERecordData({
            ...claimRelateHERecordData,
            [name]: value,
        });
    };

    // select fields value change
    const handleSelectFiledChange = (e, keyName) => {
        setClaimRelateHERecordData({
            ...claimRelateHERecordData,
            [keyName]: e,
        });
    };

    // save the parts hours data
    const handleSavePartHoursData = () => {
        const rUrl = RELATED_HOURS_EXPENSES_MASTER_URL;
        const rObj = {
            ...claimRelateHERecordData,
            type: claimRelateHERecordData.type?.value || "CHANNEL_PARTNER",
            code: claimRelateHERecordData.code?.value || "USER_DRIVED",
            alternateCode: claimRelateHERecordData.alternateCode || "NA",
            // alternateCode:
            //     claimRelateHERecordData.alternateCode?.value || "USER_DRIVED",
            coverageType:
                claimRelateHERecordData.coverageType?.value || "CT_04",
        };
        if (relatedHEId) {
            callPutApi(null, `${rUrl}/${relatedHEId}`, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    handleSnack(
                        "success",
                        "Related Hours & Expenses updated successfully"
                    );
                    setViewOnly(true);
                } else {
                    handleSnack(
                        "info",
                        "Related Hours & Expenses updation failed."
                    );
                }
            });
        } else {
            callPostApi(null, `${rUrl}`, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    handleSnack(
                        "success",
                        "Related Hours & Expenses Created successfully"
                    );
                    setRelatedHEId(responseData.relatedHEId);
                    setViewOnly(true);
                } else {
                    handleSnack(
                        "info",
                        "Related Hours & Expenses creation failed."
                    );
                }
            });
        }
    };

    const partsColumns = [
        {
            field: "serialNo",
            headerName: "Part Number",
            flex: 1,
        },
        {
            field: "description",
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
            field: "unitPrice",
            headerName: "Unit Price",
            flex: 1,
        },
        {
            field: "totalPrice",
            headerName: "Total Price",
            flex: 1,
            renderCell: ({ row }) => <>{row.unitPrice * row.quantity}</>,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 150,
            cellClassName: "actions",
            getActions: ({ row }) => {
                const isInEditMode =
                    rowModesModel[row.relatedPartsId]?.mode ===
                    GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={
                                <Tooltip title="Save">
                                    <SaveIcon />
                                </Tooltip>
                            }
                            label="Save"
                            onClick={handleSaveClick(row.relatedPartsId)}
                        />,
                        <GridActionsCellItem
                            icon={
                                <Tooltip title="Cancel">
                                    <CancelIcon />
                                </Tooltip>
                            }
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(row.relatedPartsId)}
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
                        onClick={handleEditClick(row.relatedPartsId)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Remove">
                                <DeleteIcon />
                            </Tooltip>
                        }
                        label="Delete"
                        onClick={handleDeleteClick(row.relatedPartsId)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Supplier Claim">
                                <img
                                    className="m-1"
                                    src={
                                        "../../assets/images/supplierClaim.png"
                                    }
                                    alt="Supplier Claim"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        fill: "#872ff7",
                                    }}
                                />
                            </Tooltip>
                        }
                        label="Return"
                        className="textPrimary"
                        onClick={() => handleClaimSupplierOpen(row)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <div className="row d-flex justify-content-between align-items-center py-2 ">
                <h4 className="mx-3">Related Hours & Expenses</h4>
                <div className="d-flex">
                    {viewOnly && (
                        <button
                            className="btn btn-light bg-primary text-white"
                            onClick={() => setViewOnly(false)}
                        >
                            Edit
                        </button>
                    )}
                    <button
                        className="btn btn-light bg-primary text-white mx-3"
                        onClick={handleBack}
                    >
                        <ArrowBackIcon /> Back
                    </button>
                </div>
            </div>
            <div className="card border px-3 py-2 mb-2">
                {viewOnly ? (
                    <>
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="CLAIMENT"
                                value={claimRelateHERecordData.type?.label}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="PARTNER CODE"
                                value={"101211"}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="NAME"
                                value={claimRelateHERecordData.name}
                                className="col-md-3 col-sm-3"
                            />
                            {/* <ReadOnlyField
                                label="CODE"
                                value={claimRelateHERecordData.code?.label}
                                className="col-md-3 col-sm-3"
                            /> */}
                            <ReadOnlyField
                                label="ALTERNATE CODE"
                                value={claimRelateHERecordData.alternateCode}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="CLAIM NUMBER"
                                value={claimNumber}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="COVERAGE TYPE"
                                value={
                                    claimRelateHERecordData.coverageType?.label
                                }
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="REPAIR DATE"
                                value={
                                    <Moment format="DD/MM/YYYY">
                                        {claimRelateHERecordData.repairDate}
                                    </Moment>
                                }
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="WORK ORDER NUMBER"
                                value={claimRelateHERecordData.workOrder}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="HOURS ON THE JOB"
                                value={claimRelateHERecordData.jobHours}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TRAVEL TIME"
                                value={claimRelateHERecordData.travelHours}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="VEHICLE KM"
                                value={claimRelateHERecordData.vehicleKM}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="MISC. DETAILS"
                                value={claimRelateHERecordData.miscDetails}
                                className="col-md-12 col-sm-12"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row input-fields mt-2 ">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        CLAIMENT
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        disabled
                                        value={
                                            claimRelateHERecordData.type?.label
                                        }
                                        placeholder="Claiment"
                                        // onChange={handleClaimRecordDataChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        PARTNER CODE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        disabled
                                        // value={claimRelateHERecordData.name}
                                        value={"101211"}
                                        // name="claiment"
                                        placeholder="Partner Code"
                                        // onChange={handleClaimRecordDataChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        NAME
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        disabled
                                        value={claimRelateHERecordData.name}
                                        placeholder="Claiment"
                                        // onChange={handleClaimRecordDataChange}
                                    />
                                    {/* <Select
              className="text-primary"
              options={typeOptions}
              onChange={(e) => handleSelectFiledChange(e, `name`)}
              value={claimRelateHERecordData.name}
              styles={FONT_STYLE_SELECT}
            /> */}
                                </div>
                            </div>
                            {/* <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        CODE
                                    </label>
                                    <Select
                                        className="text-primary"
                                        options={codeOptions}
                                        onChange={(e) =>
                                            handleSelectFiledChange(e, `code`)
                                        }
                                        value={claimRelateHERecordData.code}
                                        styles={FONT_STYLE_SELECT}
                                    />
                                </div>
                            </div> */}
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        ALTERNATE CODE
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control border-radius-10 text-primary"
                                        name="alternateCode"
                                        value={
                                            claimRelateHERecordData.alternateCode
                                        }
                                        onChange={handleInputFieldChange}
                                    />
                                    {/* <Select
                                        className="text-primary"
                                        options={codeOptions}
                                        onChange={(e) =>
                                            handleSelectFiledChange(
                                                e,
                                                `alternateCode`
                                            )
                                        }
                                        value={
                                            claimRelateHERecordData.alternateCode
                                        }
                                        styles={FONT_STYLE_SELECT}
                                    /> */}
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        CLAIM NUMBER
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        class="form-control border-radius-10 text-primary"
                                        // value={"CO8635"}
                                        value={claimNumber}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        COVERAGE TYPE
                                    </label>
                                    <Select
                                        className="text-primary"
                                        options={coverageTypeOptions}
                                        onChange={(e) =>
                                            handleSelectFiledChange(
                                                e,
                                                "coverageType"
                                            )
                                        }
                                        value={
                                            claimRelateHERecordData.coverageType
                                        }
                                        styles={FONT_STYLE_SELECT}
                                        isDisabled={true}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        REPAIR DATE
                                    </label>
                                    <div className="align-items-center date-box">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <MobileDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                // maxDate={new Date()}
                                                closeOnSelect
                                                value={
                                                    claimRelateHERecordData.repairDate
                                                }
                                                onChange={(e) =>
                                                    handleSelectFiledChange(
                                                        e,
                                                        "repairDate"
                                                    )
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            style: FONT_STYLE,
                                                        }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-3 col-md-3 col-sm-3 col-12">
          <div className="form-group">
            <label className="text-light-dark font-size-14 font-weight-500">
              TYPE
            </label>
            <Select
              className="text-primary"
              options={typeOptions}
              onChange={(e) => handleSelectFiledChange(e, `type`)}
              value={claimRelateHERecordData.type}
              styles={FONT_STYLE_SELECT}
            />
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
          <div className="form-group">
            <label className="text-light-dark font-size-14 font-weight-500">
              CODE
            </label>
            <Select
              className="text-primary"
              options={codeOptions}
              onChange={(e) => handleSelectFiledChange(e, `code`)}
              value={claimRelateHERecordData.code}
              styles={FONT_STYLE_SELECT}
            />
          </div>
        </div> */}
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        WORK ORDER NUMBER
                                    </label>
                                    <input
                                        type="text"
                                        // disabled
                                        class="form-control border-radius-10 text-primary"
                                        name="workOrder"
                                        value={
                                            claimRelateHERecordData.workOrder
                                        }
                                        onChange={handleInputFieldChange}
                                        // value={"CO8635"}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        HOURS ON THE JOB
                                    </label>
                                    <input
                                        type="text"
                                        // disabled
                                        class="form-control border-radius-10 text-primary"
                                        name="jobHours"
                                        value={claimRelateHERecordData.jobHours}
                                        onChange={handleInputFieldChange}
                                        // value={"CO8635"}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        TRAVEL TIME
                                    </label>
                                    <input
                                        type="text"
                                        // disabled
                                        class="form-control border-radius-10 text-primary"
                                        name="travelHours"
                                        value={
                                            claimRelateHERecordData.travelHours
                                        }
                                        onChange={handleInputFieldChange}
                                        // value={"CO8635"}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        VEHICLE KM
                                    </label>
                                    <input
                                        type="text"
                                        // disabled
                                        class="form-control border-radius-10 text-primary"
                                        name="vehicleKM"
                                        value={
                                            claimRelateHERecordData.vehicleKM
                                        }
                                        onChange={handleInputFieldChange}
                                        // value={"CO8635"}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        MISC. DETAILS
                                    </label>
                                    <textarea
                                        className="form-control border-radius-10 text-primary"
                                        name="miscDetails"
                                        value={
                                            claimRelateHERecordData.miscDetails
                                        }
                                        onChange={handleInputFieldChange}
                                        cols="30"
                                        rows="3"
                                        // placeholder="causes"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="card border px-3 pb-3 mb-2">
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
                    getRowId={(row) => row.relatedPartsId}
                    rows={relatedPartsRecords}
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
            <div className="row mb-2 mx-0" style={{ justifyContent: "right" }}>
                {viewOnly ? (
                    <button
                        type="button"
                        className="btn btn-ligh save the parts hours datat bg-primary text-white mx-0"
                        onClick={() => handleViewClaimValue("adjustPrice")}
                    >
                        View Claim Value
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-ligh save the parts hours datat bg-primary text-white mx-0"
                        onClick={handleSavePartHoursData}
                    >
                        Submit Claim
                    </button>
                )}
            </div>
            {searchResultOpen && (
                <SearchPartListModal
                    show={searchResultOpen}
                    hideModal={handleSearchResClose}
                    masterData={masterData}
                    claimOrderId={claimOrderId}
                    // relatedPartsRecords
                    setRelatedPartsRecords={setRelatedPartsRecords}
                    handleSnack={handleSnack}
                />
            )}
            {openClaimSuplierModal && (
                <SupplierClaimSummaryModal
                    claimSupplierShow={openClaimSuplierModal}
                    handleClaimSupplierClose={handleClaimSupplierClose}
                    claimSupplierRecord={claimSupplierRecord}
                    handleSnack={handleSnack}
                />
            )}
        </>
    );
};

export default ClaimRelatedHoursAndExpenses;
