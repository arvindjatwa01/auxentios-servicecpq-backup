import React from 'react';
import { LinearProgress, Tooltip } from '@mui/material';

function ProgressBar({ percentage}) {
    const getColor = (percentage) => {
        if (percentage == 100) {
            return '#6FD4FF';
        } else if (percentage >= 50) {
            return '#6C70FE';
        } else {
            return '#D06FFF';
        }
    };
    return (
        <div  style={{ width: '100%' }}>
            <Tooltip title={`${percentage}%`} placement="right">
                <LinearProgress variant="determinate" value={percentage} sx={{
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: getColor(percentage),
                        borderRadius: '20px',
                        height: '7px'
                    },
                    backgroundColor: '#E5E5E5',
                    borderRadius: '20px',
                    height: '7px'
                }} />
            </Tooltip>
        </div>
    );
}

export default ProgressBar;
