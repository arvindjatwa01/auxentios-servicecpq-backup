import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ProgressBar from './ProgressBar'; // Assuming ProgressBar component is in a separate file


const columns = [
    {
         field: 'service', 
         headerName: 'Name of Services', 
         width: 200 ,
         renderCell:(params)=>{
             return(
                <span className='text-light'>
                    {params.value}
                </span>
             );
         }    
    },
    {
        field: 'progress', headerName: 'Buying Chances (%)', width: 300,
        renderCell: (params) => {
            return (
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '100%', marginRight: '8px' }}>
                        <ProgressBar percentage={params.value} />
                    </div>
                </div>
            );
        }
    },
    {
        field: 'chances',
        headerName: 'Probability',
        width: 200,
        renderCell: (params) => {
            let chanceLabel = '';
            let color = '';
            if (params.row.progress === 100) {
                chanceLabel = 'Already Bought';
                color = 'green';
            } else if (params.row.progress >= 50) {
                chanceLabel = 'High';
                color = 'purple';
            } else {
                chanceLabel = 'Low';
                color = 'red';
            }
            return (
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '75%', color: color, padding: '2px' }}>
                        {chanceLabel}
                    </div>
                </div>
            );
        },
    }
];


const ServiceTable = ({setCurrentService,serviceRow,setCurrentSelectedService}) => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={serviceRow}
                columns={columns}
                pageSize={8}
                disableColumnSelector
                autoHeight
                headerHeight={50}
                rowHeight={50} 
                onRowClick={(params) => {
                    setCurrentService(params.row);
                    setCurrentSelectedService({value:params.row.id,label:params.row.service})
                  }}
                hideFooter
                hideFooterPagination
                disableMultipleSelection
                density="compact"
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-cell': {
                        border: 'none',
                    },
                }}
            />
        </div>
    )
}

export default ServiceTable;
