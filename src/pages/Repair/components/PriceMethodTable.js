import * as React from "react";
import penIcon from "../../../assets/images/pen.png";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEditSingleSelectCell,
  useGridApiContext,
  GridEditInputCell,
} from "@mui/x-data-grid";
import { GRID_STYLE } from "../CONSTANTS";
import { Button, Tooltip } from "@mui/material";
import { useState } from "react";

const PART_PRICE_METHOD = [
  { value: "LIST", label: "List Price" },
  { label: "Cost Price", value: "COST_PLUS" },
  { value: "SPECIAL", label: "Special Price" },
  { value: "FLAT_RATE", label: "Flat Rate" },
  { value: "EMPTY", label: "" },
];
const LABOR_PRICE_METHOD = [
  { value: "LIST", label: "Sell Price" },
  { value: "COST_PLUS", label: "Cost Price" },
  { value: "FLAT_RATE", label: "Flat Rate" },
  { value: "VALUE_BASED", label: "Value Based" },
  { value: "EMPTY", label: "" },
];
const CONSUMABLE_PRICE_METHOD = [
  { value: "LIST", label: "List Price" },
  { value: "FLAT_RATE", label: "Flat Rate" },
  { value: "PER_ON_TOTAL", label: "% on Total" },
  { value: "PER_ON_LABOR", label: "% on Labour" },
  { value: "EMPTY", label: "" },
];
const EXTERNALWORK_PRICE_METHOD = [
  { value: "LIST", label: "List Price" },
  { value: "FLAT_RATE", label: "Flat Rate" },
  { value: "PER_ON_TOTAL", label: "% on Total" },
  { value: "EMPTY", label: "" },
];
const MISC_PRICE_METHOD = [
  { value: "PER_ON_TOTAL", label: "% on Total" },
  { value: "PER_ON_LABOR", label: "% on Labour" },
  { value: "EMPTY", label: "" },
];

function ToolBar(props) {
  return (
    <GridToolbarContainer className="row">
      <div className="col-md-6 col-lg-8 font-weight-500 my-1">PRICE METHODS</div>      
    </GridToolbarContainer>
  );
}
function CustomTypeEditComponent(props) {
  const apiRef = useGridApiContext();
  const handleValueChange = async () => {
    console.log(props)
    await apiRef.current.setEditCellValue({
      id: props.id,
      field: "calculationType",
      value: "",
    });
    await apiRef.current.setEditCellValue({
      id: props.id,
      field: "adjustedPrice",
      value: 0,
    });

  };

  return (
    <GridEditSingleSelectCell onValueChange={handleValueChange} {...props}/>
  );
}

function CustomAdjustedPrice(params) {
  const { id, field } = params;
  const apiRef = useGridApiContext();
  const row = apiRef.current.unstable_getRowWithUpdatedValues(id, field);
  return (
    <GridEditInputCell {...params} disabled={row.pricingMethod !== 'FLAT_RATE'}/>
  );
}

function CustomAmountPercentage(params) {
  const { id, field } = params;
  const apiRef = useGridApiContext();
  const row = apiRef.current.unstable_getRowWithUpdatedValues(id, field);
  return (
    <GridEditInputCell {...params} disabled={row.pricingMethod !== 'PER_ON_TOTAL' && row.pricingMethod !== 'PER_ON_LABOR'}/>
  );
}

export default function PriceMethodTable(props) {
  const [rowModesModel, setRowModesModel] = React.useState({});

  const priceMethodOptons = (itemType) => {
    return itemType === "PART"?
      PART_PRICE_METHOD :
      itemType === "LABOR"
      ? LABOR_PRICE_METHOD
      : itemType === "CONSUMABLE"
      ? CONSUMABLE_PRICE_METHOD
      : itemType === "EXTERNALWORK"
      ? EXTERNALWORK_PRICE_METHOD
      : itemType === "OTHERMISC"
      ? MISC_PRICE_METHOD
      : [];
  };

  const calculationTypes = (priceMethod) => {
    return (priceMethod === "PER_ON_TOTAL" ||
            priceMethod === "PER_ON_LABOR")
          ? [
              { label: "%", value: "PERCENTAGE" },
              { label: "", value: "EMPTY" },
            ]
          : [
              { label: "List", value: "LIST" },
              { label: "Net", value: "NET" },
              { label: "", value: "EMPTY" },
            ]
  }
  const handleRowEditStart = (params, event) => {
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

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = props.rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      props.setRows(props.rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        console.log("rows", props.rows);
        const updatedRow = { ...newRow, isNew: false };

        props.setRows(
          props.rows.map((row) =>
            row.id === updatedRow.id ? { ...updatedRow, isNew: undefined } : row
          )
        );

        resolve(updatedRow);
      }),
    [props.rows]
  );

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const priceMethodColumns = [
    {
      field: "itemType",
      headerName: "Item Type",
      width: 150,
    },
    {
      field: "pricingMethod",
      headerName: "Price Method",
      flex: 1,
      editable: true,
      width: 150,
      type: "singleSelect",
      valueOptions: ({ row }) => priceMethodOptons(row.itemType),

      renderEditCell: (params) => <CustomTypeEditComponent {...params} />,
      valueFormatter: (params) => {
        const options = priceMethodOptons(
          params.api.getRow(params.id).itemType
        );
        const option = options.find(
          ({ value: optionValue }) => params.value === optionValue
        );

        if (option) return option.label;
      },
    },
    // {
    //   field: "editable",
    //   headerName: "Price Editable",
    //   flex: 1,
    //   minWidth: 80,
    //   renderCell: (params) => <span>{params.value ? "Yes" : "No"}</span>,
    // },
    {
      field: "calculationType",
      headerName: "Calculation Type",
      flex: 1,
      // minWidth: 80,
      type: "singleSelect",
      editable: true,
      valueOptions: ({ row }) => calculationTypes(row.pricingMethod),
        
      valueFormatter: (params) => {
        const options = calculationTypes(
          params.api.getRow(params.id).pricingMethod
        );
        const option = options.find(
          ({ value: optionValue }) => params.value === optionValue
        );

        if (option) return option.label;
      },
    },
    {
      field: "percentageAmount",
      headerName: "Percentage Amount",
      editable: true,
      flex: 1,
      minWidth: 80,
      renderEditCell: (params) => <CustomAmountPercentage {...params} />
    },
    {
      field: "adjustedPrice",
      headerName: "Adjusted $",
      editable: true,
      flex: 1,
      minWidth: 80,
      renderEditCell: (params) => <CustomAdjustedPrice {...params} />,
      cellClassName: (params) => {

        console.log(params.value)
        // if (params.value == null && params.value === 0 && params.value === '') {
        //   return '';
        // }
        if(params.value > 0){
        return 'super-app-value'
        }
      },
    },
    {
      field: "netItemLevelPrice",
      headerName: "Estimated $",
      renderCell: (params) => <span style={{fontSize: 12}}>{params.value? parseFloat(params.value).toFixed(2): <></>}</span>,
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
          // <GridActionsCellItem
          //   icon={
          //     <Tooltip title="Remove">
          //       <DeleteIcon />
          //     </Tooltip>
          //   }
          //   label="Delete"
          //   onClick={handleDeleteClick(row.id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];

  return (
    

    <DataGrid
      sx={GRID_STYLE}
      rows={props.rows}
      autoHeight
      columns={priceMethodColumns}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStart={handleRowEditStart}
      onRowEditStop={handleRowEditStop}
      experimentalFeatures={{ newEditingApi: true }}
      onProcessRowUpdateError={(error) => console.log(error)}
      processRowUpdate={processRowUpdate}
      components={{ Toolbar: ToolBar }}
      // componentsProps={{ toolbar: { setRows, setRowModesModel } }}
    />
  );
}
