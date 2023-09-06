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
} from "@mui/x-data-grid";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { Tooltip } from "@mui/material";
import {
    addQuotePayer,
    removePayer,
    updatePayerData,
} from "services/repairQuoteServices";
import { useState } from "react";
import { CREATE_QUOTE_PAYER } from "services/CONSTANTS";

function EditToolbar(props) {
    const { setRows, setRowModesModel, rows } = props;
    console.log(rows);

    const handleClick = () => {
        const payerId = "new";
        setRows((oldRows) => [
            ...oldRows,
            { payerId, payerName: "", billingSplit: "", price: 0, isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [payerId]: { mode: GridRowModes.Edit, fieldToFocus: "payerName" },
        }));
    };

    return (
        <GridToolbarContainer className="row">
            <div className="col-md-6 col-lg-8 font-weight-500">
                PAYERS
            </div>
            <div
                className="row col-md-6 col-lg-4"
                style={{ justifyContent: "right" }}
            >
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add Payer
                </Button>
            </div>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function SolutionQuotePayerGridTable(props) {
    const [rows, setRows] = React.useState(props.dataRows);
    console.log(rows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [loading, setLoading] = useState(false);

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (payerId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [payerId]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (payerId) => () => {
        console.log("rows", rows);
        setRowModesModel({
            ...rowModesModel,
            [payerId]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (payerId) => () => {
        removePayer(payerId)
            .then((success) => {
                console.log(success);
                props.handleSnack("success", "Payer has been removed!");
                setRows(rows.filter((row) => row.payerId !== payerId));
            })
            .catch((e) => {
                props.handleSnack("error", "Payer couldn't be removed!");
                throw e;
            });
    };

    const handleCancelClick = (payerId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [payerId]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.payerId === payerId);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.payerId !== payerId));
        }
    };

    const processRowUpdate = React.useCallback(
        (newRow, oldRow) =>
            new Promise((resolve, reject) => {
                const updatedRow = { ...newRow, isNew: false };
                if (updatedRow.payerId === "new") {
                    console.log(oldRow, newRow, rows);
                    addQuotePayer(props.quoteId, {
                        ...updatedRow,
                        payerId: undefined,
                        isNew: undefined,
                    })
                        .then((savedPayer) => {
                            props.handleSnack("success", `Payer has been added!`);
                            setRows(
                                rows.map((row) =>
                                    row.payerId === newRow.payerId ? savedPayer : row
                                )
                            );
                            resolve(savedPayer);
                        })
                        .catch((e) => {
                            props.handleSnack("error", "Payer details could not be added");
                            resolve(oldRow);
                        });
                } else {
                    updatePayerData(newRow.payerId, updatedRow)
                        .then((savedPayer) => {
                            props.handleSnack("success", "Payer has been updated!");
                            setRows(
                                rows.map((row) =>
                                    row.payerId === savedPayer.data.payerId
                                        ? savedPayer.data
                                        : row
                                )
                            );
                            resolve(savedPayer.data);
                        })
                        .catch((e) => {
                            props.handleSnack("error", "Payer details could not be updated");
                            resolve(oldRow);
                        });
                }
            }),
        [rows]
    );

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { headerName: "Payer", field: "payerName", editable: true, flex: 1 },
        {
            headerName: "Billing Split",
            field: "billingSplit",
            editable: true,
            flex: 1,
        },
        { headerName: "Price", field: "price", flex: 1 },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            flex: 1,
            cellClassName: "actions",
            getActions: ({ row }) => {
                const isInEditMode =
                    rowModesModel[row.payerId]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={
                                <Tooltip title="Save">
                                    <SaveIcon />
                                </Tooltip>
                            }
                            label="Save"
                            onClick={handleSaveClick(row.payerId)}
                        />,
                        <GridActionsCellItem
                            icon={
                                <Tooltip title="Cancel">
                                    <CancelIcon />
                                </Tooltip>
                            }
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(row.payerId)}
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
                        onClick={handleEditClick(row.payerId)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Remove">
                                <DeleteIcon />
                            </Tooltip>
                        }
                        label="Delete"
                        onClick={handleDeleteClick(row.payerId)}
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
            getRowId={(row) => row.payerId}
            autoHeight
            columns={columns}
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
