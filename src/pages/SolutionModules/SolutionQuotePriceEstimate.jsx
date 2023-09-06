import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import penIcon from "../../assets/images/pen.png";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    useGridApiContext,
    GridEditInputCell,
} from "@mui/x-data-grid";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { Tooltip } from "@mui/material";
import { addQuotePayer } from "services/repairQuoteServices";
import { useState } from "react";

function SummaryAdjustedPrice(params) {
    const { id, field } = params;
    const apiRef = useGridApiContext();
    const row = apiRef.current.unstable_getRowWithUpdatedValues(id, field);
    return (
        <GridEditInputCell {...params} disabled={row.priceSummaryType !== 'FLAT_RATE'} />
    );
}

function EditToolbar(props) {
    const { setRows, setRowModesModel, rows } = props;

    const handleClick = () => {
        const sbPriceEstimateId = "new";
        setRows([
            ...rows,
            {
                sbPriceEstimateId,
                priceBreakup: "",
                priceSummaryType: "",
                netPrice: 0,
                adjustedPrice: 0,
                percentageDiscount: 0,
                fixedDiscount: 0,
                isNew: true,
            },
        ]);
        console.log(rows);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [sbPriceEstimateId]: { mode: GridRowModes.Edit, fieldToFocus: "priceBreakup" },
        }));
    };

    return (
        <GridToolbarContainer className="row">
            <div className="col-md-6 col-lg-8 font-weight-500 py-2">
                PRICE / ESTIMATE SUMMARY
            </div>
            <div
                className="row col-md-6 col-lg-4"
                style={{ justifyContent: "right" }}
            >
                {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Price Summary
        </Button> */}
            </div>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function SolutionQuotePriceEstimate(props) {
    console.log("SolutionQuotePriceEstimate props ========= ", props);
    const { rows, setRows } = props;
    // console.log(rows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [loading, setLoading] = useState(false);

    const handleRowEditStart = (params, event) => {
        console.log(params);
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (sbPriceEstimateId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [sbPriceEstimateId]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (sbPriceEstimateId) => () => {
        // console.log("rows", rows);
        setRowModesModel({
            ...rowModesModel,
            [sbPriceEstimateId]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (sbPriceEstimateId) => () => {
        setRows(rows.filter((row) => row.sbPriceEstimateId !== sbPriceEstimateId));
    };

    const handleCancelClick = (sbPriceEstimateId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [sbPriceEstimateId]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.sbPriceEstimateId === sbPriceEstimateId);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.sbPriceEstimateId !== sbPriceEstimateId));
        }
    };

    const processRowUpdate = React.useCallback(
        (newRow, oldRow) =>
            new Promise((resolve, reject) => {
                const updatedRow = { ...newRow, isNew: false };
                if (updatedRow.sbPriceEstimateId === "new") {
                    console.log(oldRow, newRow, rows);
                    addQuotePayer(props.quoteId, {
                        ...updatedRow,
                        id: undefined,
                        isNew: undefined,
                    })
                        .then((savedPayer) => {
                            props.handleSnack("success", `Payer has been added!`);
                            setRows(
                                rows.map((row) => (row.sbPriceEstimateId === newRow.sbPriceEstimateId ? savedPayer : row))
                            );
                            resolve(savedPayer);
                        })
                        .catch((e) => {
                            props.handleSnack("error", "Payer details could not be added");
                            resolve(oldRow);
                        });
                } else {
                    setRows(
                        rows.map((row) =>
                            row.sbPriceEstimateId === updatedRow.sbPriceEstimateId
                                ? { ...updatedRow, isNew: undefined }
                                : row
                        )
                    );

                    resolve(updatedRow);
                }
            }),
        [rows]
    );

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const priceSummaryColumns = [
        {
            field: "priceBreakup",
            headerName: "Price Breakup",
            editable: true,
            width: 150,
            // type: 'singleSelect',
            // valueOptions: [ 'A - Parts','B - Labor', 'C - Consumable', 'D - External work', 'E - Other Misc']
        },
        {
            field: "priceSummaryType",
            headerName: "Price Summary type",
            flex: 1,
            width: 150,
            editable: true,
            type: "singleSelect",
            valueOptions: [
                { label: "Total Solution Price", value: "TOTAL_SOLUTION_PRICE" },
                { label: "Total Additional Price", value: "TOTAL_ADDITIONAL_PRICE" },
                { label: "Flat Rate All", value: "FLAT_RATE" },
                { label: "Environmental", value: "ENVIRONMENTAL" },
                { label: "Tax", value: "TAX" },
            ],
            valueFormatter: ({ api, field, value }) => {
                const options = api.getColumn(field).valueOptions;
                const option = options.find(
                    ({ value: optionValue }) => value === optionValue
                );

                if (option) return option.label;
                // renderCell: params => <span style={{fontSize: 12}}>{params.value+" - "+params.row.jobOperation}</span>
            },
        },
        {
            field: "adjustedPrice",
            headerName: "Adjusted $",
            editable: true,
            flex: 1,
            minWidth: 80,
            renderEditCell: (params) => <SummaryAdjustedPrice {...params} />,
            cellClassName: (params) => {
                if (params.value > 0) {
                    return 'super-app-value'
                }
            },
        },
        {
            field: "percentageDiscount",
            headerName: "Discount (%)",
            type: 'number',
            editable: true,
            flex: 1,
            minWidth: 120,
        },
        {
            field: "fixedDiscount",
            type: 'number',
            headerName: "Total Discount ($)",
            editable: true,
            flex: 1,
            minWidth: 120,
        },
        {
            field: "netPrice",
            headerName: "Net $",
            flex: 1,
            minWidth: 80,
        },
        {
            field: "Actions",
            headerName: "Actions",
            type: "actions",
            cellClassName: "actions",
            getActions: ({ row }) => {
                const isInEditMode = rowModesModel[row.sbPriceEstimateId]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={
                                <Tooltip title="Save">
                                    <SaveIcon />
                                </Tooltip>
                            }
                            label="Save"
                            onClick={handleSaveClick(row.sbPriceEstimateId)}
                        />,
                        <GridActionsCellItem
                            icon={
                                <Tooltip title="Cancel">
                                    <CancelIcon />
                                </Tooltip>
                            }
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(row.sbPriceEstimateId)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Edit">
                                <img className="m-1" src={penIcon} alt="Edit" />
                            </Tooltip>
                        }
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(row.sbPriceEstimateId)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Remove">
                                <DeleteIcon />
                            </Tooltip>
                        }
                        label="Delete"
                        onClick={handleDeleteClick(row.sbPriceEstimateId)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <DataGrid
            sx={GRID_STYLE}
            loading={loading}
            rows={rows}
            getRowId={(row) => row.sbPriceEstimateId}
            autoHeight
            columns={priceSummaryColumns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            experimentalFeatures={{ newEditingApi: true }}
            onProcessRowUpdateError={(error) => console.log(error)}
            processRowUpdate={processRowUpdate}
            components={{ Toolbar: EditToolbar }}
            componentsProps={{ toolbar: { setRows, setRowModesModel, rows } }}
        />
    );
}
