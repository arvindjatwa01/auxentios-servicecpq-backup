import React,{useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import boxicon from '../../assets/icons/png/box.png'
import { useTheme } from '@mui/material/styles';
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import OwlCarousel from 'react-owl-carousel';
import CabinIcon from '@mui/icons-material/Cabin';
import {
  createPortfolio,
  itemPriceDataId,
  updateItemPriceData
} from "../../services/index";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const CommercePageQuestion = () => {
  const [age, setAge] = React.useState('');
  const [open1, setOpen1] = React.useState(false);
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');
  const [show, setShow] = React.useState(false);
  
  const handleOpen=()=>setShow(true)
  
  const handleChangedrop = (event) => {
    setAge(event.target.value);
};
const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
};
const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
};
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleClose1 = () => {
    setShow(false)
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };
  
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  
  
  const [value, setValue] = React.useState('1');
  const steps = [
    'Register',
    'Shop/Configure',
    'Add to cart',
    'Payment',
    
  ];
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 

  const handleOption2 = (e) => {
    setValue2(e)
  }
  const handleOption3 = (e) => {
    setValue3(e)
  }

  const [value2, setValue2] = useState({ value: 'Archived', label: 'Archived' });
  const [value3, setValue3] = useState({ value: 'Gold', label: 'Gold' });
  const [miscRequired, setMiscRequired] = useState(true);
  const handleWithMiscCheckBox = (e) => {
    setMiscRequired(e.target.checked)
  }
  const [editAblePriceData, setEditAblePriceData] = useState([]);
  const handleWithSparePartsCheckBox = (e) => {
    setPartsRequired(e.target.checked)
  }
  const [serviceRequired, setServiceRequired] = useState(true);
  const [partsRequired, setPartsRequired] = useState(true);
  const [labourRequired, setlabourRequired] = useState(true);
  const handleWithLabourCheckBox = (e) => {
    setlabourRequired(e.target.checked)
  }
  const handleWithServiceCheckBox = (e) => {
    setServiceRequired(e.target.checked)
  }
  return (
    <>
      {/* <CommanComponents/> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div className="container-fluid mt-4">
        <Box className="mt-5" sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    <div className=" mt-3 p-3">
      <div className="d-flex">
        <div className="col-12">
          <p>QUESTION 01/10</p>
          <h4>Here are the avilable options</h4>
        </div>
      </div>
    </div>
    <div className="mt-4 p-4">
       <h4 className="mb-0">Services</h4>
       <p className="mb-2">Based on your search criteria we propose following options for your repair needs</p>
    </div>
    <div class="contain-slider my-4">
                    <OwlCarousel items={4} className='owl-theme' loop margin={10} nav>
                        <div class='item border-none' style={{height:"400px"}}>
                            <a href='#' className='bg-gray text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Repair Services - Silver</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Reconditioning of Alternator</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>It has new and remanufactured spare</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Rebuilding at our specialised component rebuilding center</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Built by experienced engineers</li>
                            </ul>
                            <a href="/AddToCart" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none' style={{height:"400px"}}>
                            <a href='#' className='bg-yellow text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Repair Solution - Gold</a>
                            <h4 className='text-red mt-3'><b>$25,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Reconditioning of Alternator</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>It has new and remanufactured spare</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Rebuilding at our specialised component rebuilding center</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Built by experienced engineers</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none' style={{height:"400px"}}>
                            <a href='#' className='bg-yellow text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Repair Solution - Bronze</a>
                            <h4 className="text-primary mt-3">Repair Service</h4>
                            <h4 className='text-red mt-3'><b>$16,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Reconditioning of Alternator</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>It has new and remanufactured spare</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Rebuilding at our specialised component rebuilding center</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Built by experienced engineers</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none' style={{height:"400px"}}>
                            <BuildCircleOutlinedIcon style={{fontSize:"90px"}}/>
                            <h4 className='text-primary mt-3'><b>Repair Service</b></h4>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenance triggered every 3 months</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none' style={{height:"400px"}}>
                            <a href='#' className='bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>Repair Services</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenance triggered every 3 months</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div> 

                    </OwlCarousel>
            </div>
        

        </div>
      </div>

    </>
  )
}

export default CommercePageQuestion