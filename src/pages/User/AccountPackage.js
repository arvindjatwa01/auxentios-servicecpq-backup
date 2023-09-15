import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Box, Tab, Radio, RadioGroup, Tooltip, Checkbox, FormGroup, FormControlLabel, FormControl, TextareaAutosize, Card, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
import TabPanel from '@mui/lab/TabPanel';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import smalldeleteicon from '../../assets/icons/png/small-delete.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Users } from "./Users";
import { PACKAGES, PLANS } from "./CONSTANTS";

export function AccountPackage(props) {

    return (
        <div className="content-body" style={{ minHeight: "884px" }}>
            <div class="container-fluid mt-3">
                <h4>Package Details</h4>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                    <div class="mt-5 justify-content-center">
                        <div className="card p-3">
                            {PACKAGES.map(packageInd =>
                                <Accordion disabled={packageInd.value !== 'STARTER'}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{packageInd.label}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>)}
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    )
}
