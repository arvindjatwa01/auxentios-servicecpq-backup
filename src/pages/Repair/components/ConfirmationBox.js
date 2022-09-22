const { Dialog, DialogTitle, DialogContent, DialogActions } = require("@material-ui/core");
const { Button } = require("react-bootstrap");

export const RenderConfirmDialog = (props) => {

    return (
      <Dialog
        maxWidth="xs"
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