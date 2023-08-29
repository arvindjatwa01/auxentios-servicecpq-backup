import React, { useState } from 'react'
import Select from 'react-select'

// material ui import
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

// import bootstrap 
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

// import icons images
import shareIcon from "../../..//assets/icons/svg/share.svg";
import folderAddIcon from "../../..//assets/icons/svg/folder-add.svg";
import uploadIcon from "../../..//assets/icons/svg/upload.svg";
import deleteIcon from "../../..//assets/icons/svg/delete.svg";
import copyIcon from "../../..//assets/icons/svg/Copy.svg";

const PortfolioHeader = (props) => {
    const { portfolioSupportLevel, supportLevelKeyValuePair, portfolioStatus, portfolioStatusKeyValuePair,
        setIsActivePortfolio, handlePortfolioSupportLevel, handlePortfolioStatus } = props;

    const [openConvertToMenu, setOpenConvertToMenu] = useState(false);
    const [convertToMenuAnchorEl, setConvertToMenuAnchorEl] = useState(null);
    const [convertToQuoteModalShow, setConvertToQuoteModalShow] = useState(false)
    const [showNewVersionModal, setShowNewVersionModal] = useState(false)

    // handle Portfolio status disable
    const handlePortfolioStatusDisable = (e) => {
        try {
            if ((e.value === "DRAFT") && (portfolioStatus.value === "ACTIVE")) {
                setIsActivePortfolio(false)
                return true;
            }

            if (((e.value === "DRAFT") || (e.value === "ACTIVE")) && (portfolioStatus.value === "REVISED")) {
                return true;
            }

            if (((e.value === "DRAFT") || (e.value === "ACTIVE") || (e.value === "REVISED")) &&
                (portfolioStatus.value === "ARCHIVED")) {
                return true;
            }
        } catch (error) {
            return;
        }
    }

    // open convert to menu items list view
    const handleOpenConvertToMenu = (event) => {
        setConvertToMenuAnchorEl(event.currentTarget);
        setOpenConvertToMenu(true);
    };

    // close convert to menu items list view
    const handleCloseConvertToMenu = () => setOpenConvertToMenu(false);
    return (
        <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
                <h5 className="font-weight-600 mb-0">Portfolio and Bundles</h5>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="ml-3">
                        <Select
                            className="customselectbtn1"
                            onChange={handlePortfolioSupportLevel}
                            options={supportLevelKeyValuePair}
                            value={portfolioSupportLevel}
                        />
                    </div>
                    <div className="ml-3">
                        <Select
                            className="customselectbtn"
                            onChange={handlePortfolioStatus}
                            options={portfolioStatusKeyValuePair}
                            value={portfolioStatus}
                            isOptionDisabled={(option) => handlePortfolioStatusDisable(option)}
                        />
                    </div>
                    <div className="rating-star">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </div>
                </div>
            </div>
            <div className="d-flex">
                <div>
                    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", }} >
                        <IconButton className="btn bg-primary text-white font-size-14 pr-0 ml-2" style={{ borderRadius: "5px" }}
                            onClick={handleOpenConvertToMenu} size="small" aria-controls={openConvertToMenu ? "account-menu" : undefined}
                            aria-haspopup="true" aria-expanded={openConvertToMenu ? "true" : undefined}>
                            <span className="convert mx-2"> Convert to <span> <KeyboardArrowDownIcon /></span></span>
                        </IconButton>
                    </Box>
                    <Menu className="convert-top-left" anchorEl={convertToMenuAnchorEl} id="account-menu" open={openConvertToMenu} onClose={handleCloseConvertToMenu} onClick={handleCloseConvertToMenu}
                        PaperProps={{
                            elevation: 0, sx: {
                                overflow: "visible", filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))", mt: 1.5,
                                "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1, },
                                "&:before": {
                                    content: '""', display: "block", position: "absolute", top: 0, right: 14, width: 10, height: 10,
                                    bgcolor: "background.paper", transform: "translateY(-50%) rotate(45deg)", zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        {/* <MenuItem className="custommenu">Templates</MenuItem>
                <MenuItem className="custommenu">Standard Job</MenuItem>
                <MenuItem className="custommenu">Kit</MenuItem> */}
                        <MenuItem className="custommenu" onClick={() => setConvertToQuoteModalShow(true)} > Quote</MenuItem>
                        <Divider />
                    </Menu>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <a className="ml-3 font-size-14 cursor" title="Share"><img src={shareIcon} /></a>
                    <a className="ml-3 font-size-14 cursor" title="Items to Review"><img src={folderAddIcon} /></a>
                    <a className="ml-3 font-size-14" title="Upload"><img src={uploadIcon} /></a>
                    {/* <a className="ml-3 font-size-14 cursor"><img src={cpqIcon}/></a> */}
                    <a className="ml-3 font-size-14 cursor" title="Delete"><img src={deleteIcon} /></a>
                    <a className="ml-3 font-size-14 cursor" title="Copy"><img src={copyIcon} /></a>
                    <DropdownButton className="customDropdown ml-2" id="dropdown-item-button">
                        <Dropdown.Item as="button" onClick={() => setShowNewVersionModal(true)}>New Versions</Dropdown.Item>
                        <Dropdown.Item as="button" data-toggle="modal" data-target="#myModal2">Show Errors</Dropdown.Item>
                        <Dropdown.Item as="button">Review</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </div>
    )
}

export default PortfolioHeader