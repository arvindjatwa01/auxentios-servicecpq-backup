import React, { useCallback, useEffect, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import $ from "jquery";
import Moment from "react-moment";
import Select from "react-select";
import { TextField, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import {
    FONT_STYLE,
    FONT_STYLE_SELECT,
    GRID_STYLE,
    SPAREPART_SEARCH_Q_OPTIONS,
} from "pages/Common/constants";

import { sparePartSearch } from "services/searchServices";
import {
    RELATED_HOURS_EXPENSES_MASTER_URL,
    RELATED_PARTS_MASTER_URL,
} from "services/CONSTANTS";
import {
    callDeleteApi,
    callGetApi,
    callPostApi,
    callPutApi,
} from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import SearchPartListModal from "../claimMaster/SearchPartListModal";
import SupplierClaimModal from "../claimMaster/SupplierClaimModal";
import SearchComponent from "pages/components/SearchComponent";

const coverageTypeOptions = [
    { label: "Parts & Labour", value: "CT_01" },
    { label: "Only Parts", value: "CT_02" },
    { label: "Part & Labour & Misc.", value: "CT_03" },
    { label: "All Covered", value: "CT_04" },
];

const codeOptions = [
    { label: "User-defined", value: "USER_DRIVED" },
    { label: "Auto-derived", value: "AUTO_DERIVED" },
];

const RelatedPartsAndExpenses = (props) => {
    const {
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
        claimRelateHERecordData,
        setClaimRelateHERecordData,
        climentOpt = [],
        auth,
        handleUpdateClaimOrder,
        claimStatus,
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
    const [openClaimSuplierModal, setOpenClaimSuplierModal] = useState(false);
    const [claimSupplierRecord, setClaimSupplierRecord] = useState("");
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

                        // set alternate code value
                        const _coverageType = coverageTypeOptions.find(
                            (obj) => obj.value === responseData.coverageType
                        );

                        setClaimRelateHERecordData({
                            ...responseData,
                            type: climentOpt[0],
                            code: _code || "",
                            coverageType: _coverageType || "",
                        });
                    }
                }
            );
        }
    }, [relatedHEId]);

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

    // clear filter
    const clearFilteredData = () => {
        setMasterData([]);
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
    };

    // suplier claim model open
    const handleClaimSupplierOpen = (row) => {
        setClaimSupplierRecord(row);
        setOpenClaimSuplierModal(true);
    };

    // supplier claim model close
    const handleClaimSupplierClose = (row) => {
        setClaimSupplierRecord("");
        setOpenClaimSuplierModal(false);
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

    // row edit start
    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    // row edit stop
    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    // click on row edit button
    const handleEditClick = (relatedPartsId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [relatedPartsId]: { mode: GridRowModes.Edit },
        });
    };

    // click on row save button
    const handleSaveClick = (relatedPartsId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [relatedPartsId]: { mode: GridRowModes.View },
        });
    };

    // click on row delete button
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

    // click on row cancel button
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

    // cange table row edit|delete mode change
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // row update process >> put api call
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

    // save the parts hours data
    const handleSavePartHoursData = () => {
        const rUrl = RELATED_HOURS_EXPENSES_MASTER_URL;
        const rObj = {
            ...claimRelateHERecordData,
            type: claimRelateHERecordData.type?.value || "CHANNEL_PARTNER",
            code: claimRelateHERecordData.code?.value || "USER_DRIVED",
            alternateCode: claimRelateHERecordData.alternateCode || "NA",
            // alternateCode:
            //     claimRelateHERecordData.alternateCode || "USER_DRIVED",
            coverageType: coverageTypeValue?.value || "CT_04",
            // coverageType:
            //     claimRelateHERecordData.coverageType?.value || "CT_04",
            name: auth?.customerName ? auth?.customerName : "",
        };
        if (relatedHEId) {
            callPutApi(null, `${rUrl}/${relatedHEId}`, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    handleSnack(
                        "success",
                        "Related Parts & Expenses updated successfully"
                    );
                    handleUpdateClaimOrder();
                    setViewOnly(true);
                } else {
                    handleSnack(
                        "info",
                        "Related Parts & Expenses updation failed."
                    );
                }
            });
        } else {
            callPostApi(null, `${rUrl}`, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    handleSnack(
                        "success",
                        "Related Parts & Expenses Created successfully"
                    );
                    setRelatedHEId(responseData.relatedHEId);
                    setViewOnly(true);
                    handleUpdateClaimOrder();
                } else {
                    handleSnack(
                        "info",
                        "Related Parts & Expenses creation failed."
                    );
                }
            });
        }
    };

    console.log("relatedPartsRecords :::: ", relatedPartsRecords);

    return (
        <>
            <div
                className={`row d-flex justify-content-between align-items-center py-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-2" : ""
                }`}
            >
                <h4 className="mx-3">Related Parts & Expenses</h4>
                <div className="d-flex">
                    {viewOnly && claimStatus?.value !== "ARCHIVED" && (
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
            <div
                className={`card border px-3 py-2 mb-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-3" : ""
                }`}
                style={{
                    backgroundColor: `${
                        claimStatus?.value === "ARCHIVED" ? "#f3eafe" : ""
                    }`,
                }}
            >
                {viewOnly || claimStatus?.value === "ARCHIVED" ? (
                    <>
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="CLAIMENT"
                                value={claimRelateHERecordData.type?.label}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="PARTNER CODE"
                                value={`${
                                    auth?.customerId
                                        ? `${auth?.customerId}`
                                        : ""
                                }`}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="NAME"
                                // value={claimRelateHERecordData.name}
                                value={auth?.customerName}
                                className="col-md-3 col-sm-3"
                            />
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
                                value={coverageTypeValue?.label}
                                // value={
                                //     claimRelateHERecordData.coverageType?.label
                                // }
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
                                        value={auth?.customerId}
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
                                        value={auth?.customerName}
                                        // value={claimRelateHERecordData.name}
                                        placeholder="Claiment"
                                        // onChange={handleClaimRecordDataChange}
                                    />
                                </div>
                            </div>
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
                                        // onChange={(e) =>
                                        //     handleSelectFiledChange(
                                        //         e,
                                        //         "coverageType"
                                        //     )
                                        // }
                                        // value={
                                        //     claimRelateHERecordData.coverageType
                                        // }
                                        value={coverageTypeValue}
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
                                    <div
                                        className="d-flex form-control-date"
                                        style={{
                                            overflow: "hidden",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            class="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                            name="jobHours"
                                            value={
                                                claimRelateHERecordData.jobHours
                                            }
                                            onChange={handleInputFieldChange}
                                        />
                                        <span className="hours-div text-primary">
                                            Hr
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        TRAVEL TIME
                                    </label>
                                    <div
                                        className="d-flex form-control-date"
                                        style={{
                                            overflow: "hidden",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            class="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                            name="travelHours"
                                            value={
                                                claimRelateHERecordData.travelHours
                                            }
                                            onChange={handleInputFieldChange}
                                        />
                                        <span className="hours-div text-primary">
                                            Hr
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        VEHICLE KM
                                    </label>
                                    <div
                                        className="d-flex form-control-date"
                                        style={{
                                            overflow: "hidden",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            // disabled
                                            class="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                            name="vehicleKM"
                                            value={
                                                claimRelateHERecordData.vehicleKM
                                            }
                                            onChange={handleInputFieldChange}
                                        />
                                        <span className="hours-div text-primary">
                                            Km
                                        </span>
                                    </div>
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
            <div
                className={`card border px-3 py-2 mb-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-3" : ""
                }`}
                style={{
                    backgroundColor: `${
                        claimStatus?.value === "ARCHIVED" ? "#f3eafe" : ""
                    }`,
                }}
            >
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
            <div
                className={`row mb-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-3" : "mx-0"
                }`}
                style={{ justifyContent: "right" }}
            >
                {viewOnly || claimStatus?.value === "ARCHIVED" ? (
                    <button
                        type="button"
                        className="btn btn-ligh save the parts hours datat bg-primary text-white mx-0"
                        onClick={() => handleViewClaimValue("adjustClaimValue")}
                    >
                        Go to Claim Value
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-ligh save the parts hours datat bg-primary text-white mx-0"
                        onClick={handleSavePartHoursData}
                    >
                        Save
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
                <SupplierClaimModal
                    claimSupplierShow={openClaimSuplierModal}
                    handleClaimSupplierClose={handleClaimSupplierClose}
                    claimSupplierRecord={claimSupplierRecord}
                    handleSnack={handleSnack}
                />
            )}
        </>
    );
};

export default RelatedPartsAndExpenses;
