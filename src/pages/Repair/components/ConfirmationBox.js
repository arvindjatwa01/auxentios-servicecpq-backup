import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button } from "react-bootstrap";

export const RenderConfirmDialog = (props) => {

    return (
      <Dialog
        maxWidth="sm"
        // TransitionProps={{ onEntered: handleEntered }}
        open={props.confimationOpen}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {props.message}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleNo}>No</Button>
          <Button onClick={props.handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };