import { Box, Menu, MenuItem, Paper } from "@mui/material";
import * as React from "react";
import jobOpIcon from "../../../assets/icons/svg/JobOperation.svg";
import segIcon from "../../../assets/icons/svg/Segment.svg";

function formatSegmentHeader(convertSegment) {
  return (
    "Segment " +
    String(convertSegment.segmentNumber).padStart(2, "0") +
    " - " +
    convertSegment.jobCodeDescription +
    " " +
    convertSegment.description
  );
}
function formatOperationHeader(convertOperation) {
  return (
    "Operation " +
    String(convertOperation.operationNumber).padStart(3, "0") +
    " - " +
    convertOperation.jobCodeDescription +
    " " +
    convertOperation.componentCodeDescription
  );
}
export default function ListComp(props) {
  const { content } = props;
  return (
    <Box >
      <Menu
        anchorEl={props.anchorEl}
        id="account-menu"
        open={props.open}
        onClose={props.handleClose}
        onClick={props.handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            padding:1,
            border: 20,
            borderColor: '#BEBEBE',
            maxHeight: 20,
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {content?.map((indSegment, index) => {
          return (
            
              <MenuItem >
                <img src={segIcon} height={15} style={{ marginInline: 15 }} alt="Segment"/>
                <span style={{ color: "grey", fontSize: 13 }} onClick={() =>
                props.loadSegmentOnSelect(indSegment.id)
                  }>
                  {formatSegmentHeader(indSegment)}
                </span>
              
              {indSegment.operations?.map((indOperation, indexOp) => {
                return <MenuItem
                  style={{ paddingLeft: 20 }}
                  onClick={() =>
                    props.setActiveElement({
                      ...props.activeElement,
                      name: "operation",
                      sId: indSegment.id,
                      oId: indOperation.id,
                    })
                  }
                >
                  <img
                    src={jobOpIcon}
                    height={15}
                    style={{ marginInline: 15 }}
                    alt="Job Operation"
                  />
                  <span style={{ color: "grey", fontSize: 13 }}>
                    {formatOperationHeader(indOperation)}
                  </span>
                </MenuItem>
        })}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}
