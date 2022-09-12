import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Slide } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref}  {...props} />;
});

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export default function CustomizedSnackbar(props) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.open} autoHideDuration={5000} onClose={props.handleClose} 
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      TransitionComponent={TransitionLeft}>
        <Alert onClose={props.handleClose} severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
