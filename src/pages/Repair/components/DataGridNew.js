
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { GRID_STYLE } from '../CONSTANTS';


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const payerId = 'new';
    setRows((oldRows) => [...oldRows, { payerId, payerName: '', billingSplit: '', price: 0, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [payerId]: { mode: GridRowModes.Edit, fieldToFocus: 'payerName' },
    }));
  };

  return (
    <GridToolbarContainer sx={{flex: 1, justifyContent: 'flex-end'}}>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function FullFeaturedCrudGrid(props) {
  const [rows, setRows] = React.useState(props.dataRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (payerId) => () => {
    setRowModesModel({ ...rowModesModel, [payerId]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (payerId) => () => {
    console.log(rows);
    setRowModesModel({ ...rowModesModel, [payerId]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (payerId) => () => {
    setRows(rows.filter((row) => row.payerId !== payerId));
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

  const processRowUpdate = (newRow) => {
    console.log("abcd")
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.payerId === newRow.payerId ? updatedRow : row)));
    if(updatedRow.payerId === 'new'){
        props.createQuotePayer(updatedRow);
        return updatedRow;
    } else {
        props.updateQuotePayer(newRow.payerId, updatedRow);
        return updatedRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { headerName: "Payer", field: "payerName", editable: true,flex: 1 },
    { headerName: "Billing Split", field: "billingSplit", editable: true, flex: 1 },
    { headerName: "Price", field: "price", flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        const isInEditMode = rowModesModel[row.payerId]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(row.payerId)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row.payerId)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row.payerId)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
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
        processRowUpdate={processRowUpdate}
        components={{Toolbar : EditToolbar}}
        componentsProps={{toolbar: { setRows, setRowModesModel },}}
      />
  );
}


