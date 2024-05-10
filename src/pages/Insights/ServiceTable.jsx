import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ProgressBar from './ProgressBar'; // Assuming ProgressBar component is in a separate file


const columns = [
    {
         field: 'service', 
         headerName: 'Service Name', 
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
        field: 'progress', headerName: 'Chances %', width: 300,
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
        headerName: 'Chances',
        width: 200,
        renderCell: (params) => {
            let chanceLabel = '';
            let color = '';
            if (params.row.progress === 100) {
                chanceLabel = 'ALREADY BOUGHT';
                color = 'green';
            } else if (params.row.progress >= 50) {
                chanceLabel = 'HIGH';
                color = 'purple';
            } else {
                chanceLabel = 'LOW';
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
    // {
    //     field: 'action', headerName: 'Action', width: 150,
    //     renderCell: (params) => (
    //         <Button onClick={() => alert(`Clicked on ${params.row.service}`)}>Click me</Button>
    //     )
    // },
];

// const serviceRow = [
//     {
//         id: 0,
//         service: "250 hr PM1",
//         progress: 71,
//         chances: null
//     },
//     {
//         id: 1,
//         service: "250 hr PM1 Kits",
//         progress: 100,
//         chances: null
//     },
//     {
//         id: 2,
//         service: "500 hr PM2",
//         progress: 99,
//         chances: null
//     },
//     {
//         id: 3,
//         service: "500 hr PM2 Kits",
//         progress: 44,
//         chances: null
//     },
//     {
//         id: 4,
//         service: "1000 hr PM3",
//         progress: 100,
//         chances: null
//     },
//     {
//         id: 5,
//         service: "2000 hr PM4",
//         progress: 100,
//         chances: null
//     },
//     {
//         id: 6,
//         service: "General Services",
//         progress: 69,
//         chances: null
//     },
//     {
//         id: 7,
//         service: "Technical Assessments",
//         progress: 2,
//         chances: null
//     },
// ];

const ServiceTable = ({setCurrentService,serviceRow}) => {
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
