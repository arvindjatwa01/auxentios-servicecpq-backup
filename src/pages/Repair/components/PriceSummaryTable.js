import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import penIcon from "../../../assets/images/pen.png";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEditInputCell,
  useGridApiContext,
} from "@mui/x-data-grid";
import { GRID_STYLE } from "../CONSTANTS";
import { Tooltip } from "@mui/material";
import { addQuotePayer } from "services/repairQuoteServices";
import { useState } from "react";

function SummaryAdjustedPrice(params) {
  const { id, field } = params;
  const apiRef = useGridApiContext();
  const row = apiRef.current.unstable_getRowWithUpdatedValues(id, field);
  return (
    <GridEditInputCell {...params} disabled={row.priceSummaryType !== 'FLAT_RATE'}/>
  );
}

function EditToolbar(props) {
  const { setRows, setRowModesModel, rows } = props;

  const handleClick = () => {
    const id = "new";
    setRows([
      ...rows,
      {
        id: "new",
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
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "priceBreakup" },
    }));
  };

  return (
    <GridToolbarContainer className="row">
      <div className="col-md-6 col-lg-8 font-weight-500">
        PRICE / ESTIMATE SUMMARY
      </div>
      <div
        className="row col-md-6 col-lg-4"
        style={{ justifyContent: "right" }}
      >
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Price Summary
        </Button>
      </div>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function PriceSummaryTable(props) {
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

  const handleEditClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (id) => () => {
    // console.log("rows", rows);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const updatedRow = { ...newRow, isNew: false };
        if (updatedRow.id === "new") {
          console.log(oldRow, newRow, rows);
          addQuotePayer(props.quoteId, {
            ...updatedRow,
            id: undefined,
            isNew: undefined,
          })
            .then((savedPayer) => {
              props.handleSnack("success", `Payer has been added!`);
              setRows(
                rows.map((row) => (row.id === newRow.id ? savedPayer : row))
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
              row.id === updatedRow.id
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
      width: 150,
      // type: 'singleSelect',
      // valueOptions: [ 'A - Parts','B - Labor', 'C - Consumable', 'D - External work', 'E - Other Misc']
    },
    {
      field: "priceSummaryType",
      headerName: "Price Summary type",
      flex: 1,
      width: 150,
      // editable: true,
      type: "singleSelect",
      valueOptions: [
        { label: "Estimated Labor", value: "ESTIMATED_LABOR" },
        { label: "Estimated Parts", value: "ESTIMATED_PARTS" },
        { label: "Estimated Misc.", value: "ESTIMATED_MISC" },
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
      field: "estimatedPrice",
      headerName: "Estimated $",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "adjustedPrice",
      headerName: "Adjusted $",
      // editable: true,
      flex: 1,
      minWidth: 80,
      // renderEditCell: (params) => <SummaryAdjustedPrice {...params} />,
      cellClassName: (params) => {
        if(params.value > 0){
          return 'super-app-value'
        }
      },
    },
    {
      field: "percentageDiscount",
      headerName: "Header Discount (%)",
      editable: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "fixedDiscount",
      headerName: "Total Discount ($)",
      editable: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "netPrice",
      headerName: "Net $",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "Actions",
      headerName: "Actions",
      type: "actions",
      cellClassName: "actions",
      getActions: ({ row }) => {
        const isInEditMode = rowModesModel[row.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <Tooltip title="Save">
                  <SaveIcon />
                </Tooltip>
              }
              label="Save"
              onClick={handleSaveClick(row.id)}
            />,
            <GridActionsCellItem
              icon={
                <Tooltip title="Cancel">
                  <CancelIcon />
                </Tooltip>
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row.id)}
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
            onClick={handleEditClick(row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Remove">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            onClick={handleDeleteClick(row.id)}
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
      // getRowId={(row) => row? row.id : 'new'}
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
