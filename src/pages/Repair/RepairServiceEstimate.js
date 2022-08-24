import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Select from 'react-select';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MuiMenuComponent } from "pages/Operational";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { CommanComponents } from "components";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import SelectFilter from 'react-select';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import $ from "jquery"
import {
  createPortfolio,
  getPortfolio,
  getPortfolioSchema,
  getMakeKeyValue,
  getModelKeyValue,
  getPrefixKeyValue,
  updatePortfolio,
  getUsageCategoryKeyValue,
  getTaskTypeKeyValue,
  getResponseTimeTaskKeyValue,
  getValidityKeyValue,
  getStrategyTaskKeyValue,
  getProductHierarchyKeyValue,
  getGergraphicKeyValue,
  getMachineTypeKeyValue,
  getTypeKeyValue,
  getPortfolioCommonConfig,
  getSearchQueryCoverage,
  getSearchCoverageForFamily,
  itemCreation
} from "../../services/index";

function RepairServiceEstimate() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [show, setShow] = React.useState(false);
  const [count, setCount] = useState(1)
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];
  const handleRowClick = (e) => {
    setShow(true)
  }

  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    obj.inputSearch = currentItem
    obj.selectedOption = currentItem
    tempArray[id] = obj
    setQuerySearchSelector([...tempArray])
    $(`.scrollbar-${id}`).css("display", "none")
  }
  const addSearchQuerryHtml = () => {
    setQuerySearchSelector([...querySearchSelector, {
      id: count,
      selectOperator: "",
      selectFamily: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: ""
    }])
    setCount(count + 1)
  }
  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    obj.selectOperator = e
    tempArray[id] = obj
    setQuerySearchSelector([...tempArray])
  }
  const [querySearchSelector, setQuerySearchSelector] = useState([{
    id: 0,
    selectFamily: "",
    selectOperator: "",
    inputSearch: "",
    selectOptions: [],
    selectedOption: ""
  }])
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector]
    console.log("handleFamily e:", e)
    let obj = tempArray[id]
    obj.selectFamily = e
    tempArray[id] = obj
    setQuerySearchSelector([...tempArray])
  }
  const handleMasterCheck = (e, row) => {
    if (e.target.checked) {
      var _masterData = [...masterData]
      const updated = _masterData.map((currentItem, i) => {
        if (row.id == currentItem.id) {
          return { ...currentItem, ["check1"]: e.target.checked }
        } else return currentItem
      })
      setMasterData([...updated])
      setFilterMasterData([...filterMasterData, { ...row }])
    } else {
      var _filterMasterData = [...filterMasterData]
      const updated = _filterMasterData.filter((currentItem, i) => {
        if (row.id !== currentItem.id)
          return currentItem
      })
      setFilterMasterData(updated)
    }

  }
  const [filterMasterData, setFilterMasterData] = useState([])
  const [selectedMasterData, setSelectedMasterData] = useState([])
  const [masterData, setMasterData] = useState([])
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([])
    setCount(0)
    setMasterData([])
    setFilterMasterData([])
    setSelectedMasterData([])
  }
  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value).then((res) => {
      obj.selectOptions = res
      tempArray[id] = obj
      setQuerySearchSelector([...tempArray]);
      $(`.scrollbar-${id}`).css("display", "block")
    }).catch((err) => {
      console.log("err in api call", err)
    })
    obj.inputSearch = e.target.value

  }



  const rows = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Inconsistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
    { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
  ];

  const columns = [
    { field: 'GroupNumber', headerName: 'Charge Code', flex: 1, width: 70 },
    { field: 'Type', headerName: 'Labor Type', flex: 1, width: 130 },
    { field: 'Partnumber', headerName: 'Service Type', flex: 1, width: 130 },
    { field: 'PriceExtended', headerName: 'Unit of neasure', flex: 1, width: 130 },
    { field: 'Pricecurrency', headerName: 'Estimated hours', flex: 1, width: 130 },
    { field: 'Usage', headerName: 'Unit Price/H', flex: 1, width: 130 },
    { field: 'TotalPrice', headerName: 'Extended Price', flex: 1, width: 130 },
    { field: 'Comments', headerName: 'Net Price', flex: 1, width: 130 },
    { field: 'Created', headerName: 'Currency', flex: 1, width: 130 },
    { field: 'Total', headerName: 'Adjusted Price', flex: 1, width: 130 },
  ];

  const rowsConsumables = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Inconsistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
    { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
  ];

  const columnsConsumables = [
    { field: 'GroupNumber', headerName: 'Consumable ID', flex: 1, width: 70 },
    { field: 'Type', headerName: 'Description', flex: 1, width: 130 },
    { field: 'Partnumber', headerName: ' Quantity', flex: 1, width: 130 },
    { field: 'PriceExtended', headerName: 'Unit of measure', flex: 1, width: 130 },
    { field: 'Pricecurrency', headerName: 'Type', flex: 1, width: 130 },
    { field: 'Usage', headerName: 'Vendor', flex: 1, width: 130 },
    { field: 'TotalPrice', headerName: 'Unit price', flex: 1, width: 130 },
    { field: 'Comments', headerName: 'Extended price', flex: 1, width: 130 },
    { field: 'Created', headerName: 'Flat rate', flex: 1, width: 130 },
  ];

  const rowsExternal = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Inconsistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
    { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
  ];

  const columnsExternal = [
    { field: 'GroupNumber', headerName: 'Activity code', flex: 1, width: 70 },
    { field: 'Type', headerName: 'Activity name', flex: 1, width: 130 },
    { field: 'Partnumber', headerName: ' description', flex: 1, width: 130 },
    { field: 'PriceExtended', headerName: 'quantity', flex: 1, width: 130 },
    { field: 'Pricecurrency', headerName: 'unit', flex: 1, width: 130 },
    { field: 'Usage', headerName: 'List price', flex: 1, width: 130 },
    { field: 'TotalPrice', headerName: 'supplying vendor', flex: 1, width: 130 },
    { field: 'Comments', headerName: 'Total price', flex: 1, width: 130 },
    { field: 'Created', headerName: 'currency', flex: 1, width: 130 },
    { field: 'Total', headerName: 'actions', flex: 1, width: 130 },
  ];
  return (
    <>
      {/* <CommanComponents/> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Service Estimate</h5>
            <div className="d-flex justify-content-center align-items-center">
              <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
              <a href="#" className="ml-3 font-size-14" title="Item to Review"><img src={folderaddIcon}></img></a>
              <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
              {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
              <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
              <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
              <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>

            </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Header</span></div>
              <div className="hr"></div>
            </h5>
            <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">CUSTOMER</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">MODEL</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">SERIAL #</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">REFERENCE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">SEGMENT #</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">OPERATION #</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">COMPONENT CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">PRICE METHOD</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">PRICE DATE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">CURRENCY</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>

            </div>
            <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">CUSTOMER</p>
                  <h6 className="font-weight-600">Chinalco SA, Beijing,China (code 203027)</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">MODEL </p>
                  <h6 className="font-weight-600">Alberto Franco, Head of purchase</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">SERIAL#</p>
                  <h6 className="font-weight-600">SF1234 </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">REFERENCE</p>
                  <h6 className="font-weight-600">Sales Opportunity for Chinalco for recondition </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">DESCRIPTION</p>
                  <h6 className="font-weight-600">LAJ00t6t31</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">SEGMENT #</p>
                  <h6 className="font-weight-600">CAT</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">OPERATION #</p>
                  <h6 className="font-weight-600">Customer 50%, Insurer 50%</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">JOB CODE</p>
                  <h6 className="font-weight-600">30days</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">COMPONENT CODE </p>
                  <h6 className="font-weight-600">Standard</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">PRICE METHOD</p>
                  <h6 className="font-weight-600">Standard</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">PRICE DATE</p>
                  <h6 className="font-weight-600">01.10.2021 to 01.02.2022</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">CURRENCY</p>
                  <h6 className="font-weight-600">Employee responsible</h6>
                </div>
              </div>
              {/* <div className="col-md-12">
                <div class="form-group mt-3">
                <a href="#" className="btn bg-primary text-white"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add New</a>
                </div>
                </div> */}
            </div>
            {/* <div className="Add-new-segment-div p-3 border-radius-10">
              <Link onClick={() => setOpen1(true)} className="btn bg-primary text-white mr-3">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Labor
                </Link>
              <a onClick={() => setOpen2(true)} href="#" className="btn bg-primary text-white mr-3">
                <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Labor
              </a>

            </div> */}
          </div>
          <div className="card p-4 mt-5">
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Labor" value="1" />
                    <Tab label="Consumables" value="2" />
                    <Tab label="External Work" value="3" />
                    <Tab label="Other misc." value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="row mt-2">
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE DESCRIPTION</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="form-group  mt-3">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">LABOR CODE</label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="form-group  mt-3">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">RATE PER HOUR / DAY</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">TOTAL PRICE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div class="form-group mt-3 mb-0">
                        <a href="#" className="btn bg-primary text-white">Save</a>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="">
                    <div className="bg-primary px-3 mb-3">
                      <div className="row align-items-center">

                        <div className="col-11 mx-2">

                          <div className="d-flex align-items-center bg-primary w-100">
                            <div className="d-flex mr-3" style={{ whiteSpace: 'pre' }}>
                              <h5 className="mr-2 mb-0 text-white"><span>Labor</span></h5>
                              <p className="ml-4 mb-0">
                                <a href="#" className="ml-3 text-white"><EditOutlinedIcon /></a>
                                <a href="#" className="ml-3 text-white"><ShareOutlinedIcon /></a>
                              </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center w-100 ">
                              <div className="row align-items-center m-0">
                                {
                                  querySearchSelector.map((obj, i) => {
                                    return (
                                      <>

                                        <div className="customselect d-flex align-items-center mr-3 my-2">
                                          {
                                            i > 0 ?
                                              <SelectFilter
                                                isClearable={true}
                                                defaultValue={{ label: "And", value: "AND" }}
                                                options={[
                                                  { label: "And", value: "AND", id: i },
                                                  { label: "Or", value: "OR", id: i },
                                                ]}
                                                placeholder="&amp;"
                                                onChange={(e) => handleOperator(e, i)}
                                                // value={querySearchOperator[i]}
                                                value={obj.selectOperator}

                                              /> : <></>
                                          }

                                          <div>
                                            <SelectFilter
                                              // isClearable={true}
                                              options={[
                                                { label: "Make", value: "make", id: i },
                                                { label: "Family", value: "family", id: i },
                                                { label: "Model", value: "model", id: i },
                                                { label: "Prefix", value: "prefix", id: i },
                                              ]}
                                              onChange={(e) => handleFamily(e, i)}
                                              value={obj.selectFamily}
                                            />
                                          </div>
                                          <div className="customselectsearch">
                                            <input className="custom-input-sleact"
                                              type="text"
                                              placeholder="Search string"
                                              value={obj.inputSearch}
                                              onChange={(e) => handleInputSearch(e, i)}
                                              id={"inputSearch-" + i}
                                              autoComplete="off"
                                            />

                                            {

                                              <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i}`} id="style">
                                                {obj.selectOptions.map((currentItem, j) => (
                                                  <li className="list-group-item" key={j} onClick={(e) => handleSearchListClick(e, currentItem, obj, i)}>{currentItem}</li>
                                                ))}
                                              </ul>

                                            }
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })
                                }
                                <div
                                  onClick={(e) => addSearchQuerryHtml(e)}>
                                  <Link
                                    to="#"
                                    className="btn-sm text-white border mr-2"
                                    style={{ border: "1px solid #872FF7" }}
                                  >
                                    +
                                  </Link>
                                </div>
                                <div onClick={handleDeletQuerySearch}>
                                  <Link to="#" className="btn-sm border">
                                    <svg data-name="Layer 41" id="Layer_41" fill="white" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z" /><path class="cls-1" d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z" /><path class="cls-1" d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z" /></svg>
                                    {/* <DeleteIcon className="font-size-16" /> */}
                                  </Link>
                                </div>

                              </div>
                            </div>
                            {/* <div className="px-3">
                            <Link to="#" className="btn bg-primary text-white" onClick={handleQuerySearchClick}>
                              <SearchIcon /><span className="ml-1">Search</span>
                            </Link>
                          </div> */}
                          </div>

                        </div>
                        <div className="col-auto">
                          <div className="text-center border-left pl-3 py-3">
                            <Link onClick={() => setOpen2(true)} to="#" className="p-1 text-white" data-toggle="modal" data-target="#Datatable">
                              <span className="ml-1">Add Items</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
                      <DataGrid
                        sx={{
                          '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#7380E4', color: '#fff'
                          }
                        }}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        onCellClick={(e) => handleRowClick(e)}

                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="row mt-2">
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE DESCRIPTION</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="form-group  mt-3">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">TOTAL PRICE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div class="form-group mt-3 mb-0">
                        <a href="#" className="btn bg-primary text-white">Save</a>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="">
                    <div className="bg-primary px-3 mb-3">
                      <div className="row align-items-center">

                        <div className="col-11 mx-2">

                          <div className="d-flex align-items-center bg-primary w-100">
                            <div className="d-flex mr-3" style={{ whiteSpace: 'pre' }}>
                              <h5 className="mr-2 mb-0 text-white"><span>Labor</span></h5>
                              <p className="ml-4 mb-0">
                                <a href="#" className="ml-3 text-white"><EditOutlinedIcon /></a>
                                <a href="#" className="ml-3 text-white"><ShareOutlinedIcon /></a>
                              </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center w-100 ">
                              <div className="row align-items-center m-0">
                                {
                                  querySearchSelector.map((obj, i) => {
                                    return (
                                      <>

                                        <div className="customselect d-flex align-items-center mr-3 my-2">
                                          {
                                            i > 0 ?
                                              <SelectFilter
                                                isClearable={true}
                                                defaultValue={{ label: "And", value: "AND" }}
                                                options={[
                                                  { label: "And", value: "AND", id: i },
                                                  { label: "Or", value: "OR", id: i },
                                                ]}
                                                placeholder="&amp;"
                                                onChange={(e) => handleOperator(e, i)}
                                                // value={querySearchOperator[i]}
                                                value={obj.selectOperator}

                                              /> : <></>
                                          }

                                          <div>
                                            <SelectFilter
                                              // isClearable={true}
                                              options={[
                                                { label: "Make", value: "make", id: i },
                                                { label: "Family", value: "family", id: i },
                                                { label: "Model", value: "model", id: i },
                                                { label: "Prefix", value: "prefix", id: i },
                                              ]}
                                              onChange={(e) => handleFamily(e, i)}
                                              value={obj.selectFamily}
                                            />
                                          </div>
                                          <div className="customselectsearch">
                                            <input className="custom-input-sleact"
                                              type="text"
                                              placeholder="Search string"
                                              value={obj.inputSearch}
                                              onChange={(e) => handleInputSearch(e, i)}
                                              id={"inputSearch-" + i}
                                              autoComplete="off"
                                            />

                                            {

                                              <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i}`} id="style">
                                                {obj.selectOptions.map((currentItem, j) => (
                                                  <li className="list-group-item" key={j} onClick={(e) => handleSearchListClick(e, currentItem, obj, i)}>{currentItem}</li>
                                                ))}
                                              </ul>

                                            }
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })
                                }
                                <div
                                  onClick={(e) => addSearchQuerryHtml(e)}>
                                  <Link
                                    to="#"
                                    className="btn-sm text-white border mr-2"
                                    style={{ border: "1px solid #872FF7" }}
                                  >
                                    +
                                  </Link>
                                </div>
                                <div onClick={handleDeletQuerySearch}>
                                  <Link to="#" className="btn-sm border">
                                    <svg data-name="Layer 41" id="Layer_41" fill="white" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z" /><path class="cls-1" d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z" /><path class="cls-1" d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z" /></svg>
                                    {/* <DeleteIcon className="font-size-16" /> */}
                                  </Link>
                                </div>

                              </div>
                            </div>
                            {/* <div className="px-3">
          <Link to="#" className="btn bg-primary text-white" onClick={handleQuerySearchClick}>
            <SearchIcon /><span className="ml-1">Search</span>
          </Link>
        </div> */}
                          </div>

                        </div>
                        <div className="col-auto">
                          <div className="text-center border-left pl-3 py-3">
                            <Link onClick={() => setOpen2(true)} to="#" className="p-1 text-white" data-toggle="modal" data-target="#Datatable">
                              <span className="ml-1">Add Items</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
                      <DataGrid
                        sx={{
                          '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#7380E4', color: '#fff'
                          }
                        }}
                        rows={rowsConsumables}
                        columns={columnsConsumables}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        onCellClick={(e) => handleRowClick(e)}

                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div className="row mt-2">
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE DESCRIPTION</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">SUPPLYING VENDOR</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">PRICE METHOD</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">TOTAL PRICE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="">
                    <div className="bg-primary px-3 mb-3">
                      <div className="row align-items-center">

                        <div className="col-11 mx-2">

                          <div className="d-flex align-items-center bg-primary w-100">
                            <div className="d-flex mr-3" style={{ whiteSpace: 'pre' }}>
                              <h5 className="mr-2 mb-0 text-white"><span>Labor</span></h5>
                              <p className="ml-4 mb-0">
                                <a href="#" className="ml-3 text-white"><EditOutlinedIcon /></a>
                                <a href="#" className="ml-3 text-white"><ShareOutlinedIcon /></a>
                              </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center w-100 ">
                              <div className="row align-items-center m-0">
                                {
                                  querySearchSelector.map((obj, i) => {
                                    return (
                                      <>

                                        <div className="customselect d-flex align-items-center mr-3 my-2">
                                          {
                                            i > 0 ?
                                              <SelectFilter
                                                isClearable={true}
                                                defaultValue={{ label: "And", value: "AND" }}
                                                options={[
                                                  { label: "And", value: "AND", id: i },
                                                  { label: "Or", value: "OR", id: i },
                                                ]}
                                                placeholder="&amp;"
                                                onChange={(e) => handleOperator(e, i)}
                                                // value={querySearchOperator[i]}
                                                value={obj.selectOperator}

                                              /> : <></>
                                          }

                                          <div>
                                            <SelectFilter
                                              // isClearable={true}
                                              options={[
                                                { label: "Make", value: "make", id: i },
                                                { label: "Family", value: "family", id: i },
                                                { label: "Model", value: "model", id: i },
                                                { label: "Prefix", value: "prefix", id: i },
                                              ]}
                                              onChange={(e) => handleFamily(e, i)}
                                              value={obj.selectFamily}
                                            />
                                          </div>
                                          <div className="customselectsearch">
                                            <input className="custom-input-sleact"
                                              type="text"
                                              placeholder="Search string"
                                              value={obj.inputSearch}
                                              onChange={(e) => handleInputSearch(e, i)}
                                              id={"inputSearch-" + i}
                                              autoComplete="off"
                                            />

                                            {

                                              <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i}`} id="style">
                                                {obj.selectOptions.map((currentItem, j) => (
                                                  <li className="list-group-item" key={j} onClick={(e) => handleSearchListClick(e, currentItem, obj, i)}>{currentItem}</li>
                                                ))}
                                              </ul>

                                            }
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })
                                }
                                <div
                                  onClick={(e) => addSearchQuerryHtml(e)}>
                                  <Link
                                    to="#"
                                    className="btn-sm text-white border mr-2"
                                    style={{ border: "1px solid #872FF7" }}
                                  >
                                    +
                                  </Link>
                                </div>
                                <div onClick={handleDeletQuerySearch}>
                                  <Link to="#" className="btn-sm border">
                                    <svg data-name="Layer 41" id="Layer_41" fill="white" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z" /><path class="cls-1" d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z" /><path class="cls-1" d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z" /></svg>
                                    {/* <DeleteIcon className="font-size-16" /> */}
                                  </Link>
                                </div>

                              </div>
                            </div>
                            {/* <div className="px-3">
          <Link to="#" className="btn bg-primary text-white" onClick={handleQuerySearchClick}>
            <SearchIcon /><span className="ml-1">Search</span>
          </Link>
        </div> */}
                          </div>

                        </div>
                        <div className="col-auto">
                          <div className="text-center border-left pl-3 py-3">
                            <Link onClick={() => setOpen2(true)} to="#" className="p-1 text-white" data-toggle="modal" data-target="#Datatable">
                              <span className="ml-1">Add Items</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
                      <DataGrid
                        sx={{
                          '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#7380E4', color: '#fff'
                          }
                        }}
                        rows={rowsExternal}
                        columns={columnsExternal}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        onCellClick={(e) => handleRowClick(e)}

                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="4"><div className="row mt-2">
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">DESCRIPTION</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">TYPE</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">TOTAL PRICE</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">PRICE METHOD</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">APPROVED NEEDED</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">PAYER</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                    </div>
                  </div>
                </div></TabPanel>
              </TabContext>
            </Box>
          </div>

        </div>
        <Modal show={open2} onHide={handleClose2} size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>1000-Engine|23-Replace Engine|Replace Engine</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0 bg-white">
            <div className="ligt-greey-bg p-3">
              <div>
                <span className="mr-3">
                  <i class="fa fa-pencil font-size-12" aria-hidden="true"></i><span className="ml-2">Edit</span>
                </span>
                <span className="mr-3">
                  < MonetizationOnOutlinedIcon className=" font-size-16" />
                  <span className="ml-2"> Adjust price</span>
                </span>
                <span className="mr-3">
                  <FormatListBulletedOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Related part list(s)</span>
                </span>
                <span className="mr-3">
                  <AccessAlarmOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Related service estimate(s)</span>
                </span>
                <span>
                  <SellOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Split price</span>
                </span>
              </div>
            </div>
            <div>
              <div className="p-3">
                <div className="row mt-4">
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">LABOR CODE</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="1000 ENGINE" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">LABOR TYPE</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="0123 REPLACE" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">QTY</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Replace left side of the Engine" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="List Price" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT PRICE</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$35000" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">EXTENDED PRICE</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$10000" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$5000" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">% USAGE</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="EA" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TOTAL PRICE</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$480000" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COMMENTS</label>
                      <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="PAYER TYPE" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-3 text-right">
                <a href="#" onClick={handleClose2} className="btn border mr-3 "> Cancel</a>
                <a href="#" className="btn text-white bg-primary">Save</a>
              </div>
            </div>
          </Modal.Body>


        </Modal>
      </div>
    </>
  )
}


export default RepairServiceEstimate