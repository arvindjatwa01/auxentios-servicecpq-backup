import React,{useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Select from 'react-select';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MuiMenuComponent } from "pages/Operational";
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import SearchIcon from '@mui/icons-material/Search';
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
// import {Link} from 'react-router-dom'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { CommanComponents } from "components";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import boxicon from "../../assets/icons/png/box.png";
import DataTable from "react-data-table-component";
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Link, useHistory} from 'react-router-dom'
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

function StandardJobs(){
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState('1');

  const [portfolioId, setPortfolioId] = useState();
  const [generalComponentData, setGeneralComponentData] = useState({
    name: "",
    description: "",
    serviceDescription: "",
    externalReference: "",
    customerSegment: null,
    items: []
  });
  const handleOption2 = (e) => {
    setValue2(e)
  }
  const handleOption3 = (e) => {
    setValue3(e)
  }

  const [value2, setValue2] = useState({ value: 'Archived', label: 'Archived' });
  const [value3, setValue3] = useState({ value: 'Gold', label: 'Gold' });

  const options2 = [
    { value: "chocolate", label: "Archived" },
    { value: "strawberry", label: "Draft" },
    { value: "vanilla", label: "Active" },
    { value: "Construction", label: "Revised" },
  ];
  const options3 = [
    { value: "chocolate", label: "Gold" },
    { value: "strawberry", label: "1" },
    { value: "vanilla", label: "2" },
    { value: "Construction", label: "3" },
  ];
  const [editSerialNo, setEditSerialNo] = useState({
    coverageId: "",
    make: "",
    family: "",
    modelNo: "",
    serialNoPrefix: "",
    startSerialNo: "",
    endSerialNo: "",
    fleet: "",
    fleetSize: ""

  })
  const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "#7571f9",
      color: "#fff"
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([])
    setCount(0)
    setMasterData([])
    setFilterMasterData([])
    setSelectedMasterData([])
  }
  const handleQuerySearchClick = () => {
    $(".scrollbar").css("display", "none")
    console.log("handleQuerySearchClick", querySearchSelector)
    var searchStr = querySearchSelector[0].selectFamily.value + "~" + querySearchSelector[0].inputSearch

    for (let i = 1; i < querySearchSelector.length; i++) {
      searchStr = searchStr + " " + querySearchSelector[i].selectOperator.value + " " + querySearchSelector[i].selectFamily.value + "~" + querySearchSelector[i].inputSearch
    }

    console.log("searchStr", searchStr)
    getSearchQueryCoverage(searchStr).then((res) => {
      console.log("search Query Result :", res)
      setMasterData(res)

    }).catch((err) => {
      console.log("error in getSearchQueryCoverage", err)
    })

  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const activityOptions = [
    'Create Versions',
    'Show Errors',
    'Review'
  ];
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
];
const [masterData, setMasterData] = useState([])

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
const [querySearchSelector, setQuerySearchSelector] = useState([{
  id: 0,
  selectFamily: "",
  selectOperator: "",
  inputSearch: "",
  selectOptions: [],
  selectedOption: ""
}])
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
const [showRelatedModel, setShowRelatedModel] = useState(false)
const handleDeleteIncludeSerialNo = (e, row) => {
  const updated = selectedMasterData.filter((obj) => {
    if (obj.id !== row.id)
      return obj
  })
  setSelectedMasterData(updated)
}
const [count, setCount] = useState(1)
const [selectedMasterData, setSelectedMasterData] = useState([])
const handleEditIncludeSerialNo = (e, row) => {
  console.log("handleEditIncludeSerialNo row:", row)
  let obj = {
    coverageId: row.id,
    make: row.make,
    family: row.family,
    modelNo: row.model,
    serialNoPrefix: row.prefix,
    startSerialNo: row.startSerialNo,
    endSerialNo: row.endSerialNo,
    fleet: row.fleet,
    fleetSize: row.fleetSize,
  }
  setEditSerialNo(obj)

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

const handleFamily = (e, id) => {
  let tempArray = [...querySearchSelector]
  console.log("handleFamily e:", e)
  let obj = tempArray[id]
  obj.selectFamily = e
  tempArray[id] = obj
  setQuerySearchSelector([...tempArray])
}
const handleOperator = (e, id) => {
  let tempArray = [...querySearchSelector]
  let obj = tempArray[id]
  obj.selectOperator = e
  tempArray[id] = obj
  setQuerySearchSelector([...tempArray])
}
const [filterMasterData, setFilterMasterData] = useState([])
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
const masterColumns = [
  {
    name: (
      <>
        <div>Select</div>
      </>
    ),
    selector: (row) => row.standardJobId,
    wrap: true,
    sortable: true,
    maxWidth: "300px",
    cell: (row) => <Checkbox className="text-black" checked={row.check1} onChange={(e) => handleMasterCheck(e, row)} />,
  },
  {
    name: (
      <>
        <div>Make</div>
      </>
    ),
    selector: (row) => row.make,
    wrap: true,
    sortable: true,
    format: (row) => row.make,
  },
  {
    name: (
      <>
        <div>Family</div>
      </>
    ),
    selector: (row) => row.family,
    wrap: true,
    sortable: true,
    format: (row) => row.family,
  },
  {
    name: (
      <>
        <div>Model</div>
      </>
    ),
    selector: (row) => row.model,
    wrap: true,
    sortable: true,
    format: (row) => row.model,
  },
  {
    name: (
      <>
        <div>Prefix</div>
      </>
    ),
    selector: (row) => row.prefix,
    wrap: true,
    sortable: true,
    format: (row) => row.prefix,
  },
  {
    name: (
      <>
        <div>
          Serial No
        </div>
      </>
    ),
    selector: (row) => row.bundleId,
    sortable: true,
    maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
    // cell: row => row.bundleId,
    // cell: (row) => <button onClick={() => alert()}>1</button>,
    // cell: (row) => <Checkbox className="text-black" {...label} />,
    format: (row) => row.bundleId,
  },
  {
    name: (
      <>
        <div>
          <img className="mr-2" src={boxicon}></img>Start Serial No
        </div>

      </>
    ),
    selector: (row) => row.bundleDescription,
    wrap: true,
    sortable: true,
    format: (row) => row.bundleDescription,
  },
  {
    name: (
      <>
        <div>End Serial No</div>
      </>
    ),
    selector: (row) => row.strategy,
    wrap: true,
    sortable: true,
    format: (row) => row.strategy,
  },
  // {
  //   name: (
  //     <>
  //       <div>Action</div>
  //     </>
  //   ),
  //   selector: (row) => row.action,
  //   wrap: true,
  //   sortable: true,
  //   format: (row) => row.action,
  //   cell: (row) => <div><img className="mr-2" src={penIcon} /><img className="mr-2" src={deleticon} /><img src={link1Icon} /></div>,
  // },
];
const selectedMasterColumns = [
  {
    name: (
      <>
        <div>Make</div>
      </>
    ),
    selector: (row) => row.make,
    wrap: true,
    sortable: true,
    format: (row) => row.make,
  },
  {
    name: (
      <>
        <div>Family</div>
      </>
    ),
    selector: (row) => row.family,
    wrap: true,
    sortable: true,
    format: (row) => row.family,
  },
  {
    name: (
      <>
        <div>Model</div>
      </>
    ),
    selector: (row) => row.model,
    wrap: true,
    sortable: true,
    format: (row) => row.model,
  },
  {
    name: (
      <>
        <div>Prefix</div>
      </>
    ),
    selector: (row) => row.prefix,
    wrap: true,
    sortable: true,
    format: (row) => row.prefix,
  },
  {
    name: (
      <>
        <div>
          Serial No
        </div>
      </>
    ),
    selector: (row) => row.bundleId,
    sortable: true,
    maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
    // cell: row => row.bundleId,
    // cell: (row) => <button onClick={() => alert()}>1</button>,
    // cell: (row) => <Checkbox className="text-black" {...label} />,
    format: (row) => row.bundleId,
  },
  {
    name: (
      <>
        <div>
          <img className="mr-2" src={boxicon}></img>Start Serial No
        </div>

      </>
    ),
    selector: (row) => row.bundleDescription,
    wrap: true,
    sortable: true,
    format: (row) => row.bundleDescription,
  },
  {
    name: (
      <>
        <div>End Serial No</div>
      </>
    ),
    selector: (row) => row.strategy,
    wrap: true,
    sortable: true,
    format: (row) => row.strategy,
  },
  {
    name: (
      <>
        <div>Action</div>
      </>
    ),
    selector: (row) => row.action,
    wrap: true,
    sortable: true,
    format: (row) => row.action,
    cell: (row) =>
      <div>
        <Link to="#" onClick={(e) => handleEditIncludeSerialNo(e, row)} className="btn-svg text-white cursor mx-2" data-toggle="modal" data-target="#AddCoverage">
          <svg version="1.1" viewBox="0 0 1696.162 1696.143" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="pen"><path d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z" /></g><g id="Layer_1" /></svg>
        </Link>
        <Link to="#" onClick={(e) => handleDeleteIncludeSerialNo(e, row)} className="btn-svg text-white cursor mr-2"><svg data-name="Layer 41" id="Layer_41" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z" /><path class="cls-1" d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z" /><path class="cls-1" d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z" /></svg></Link>
        <Link to="#" className="btn-svg text-white cursor " onClick={() => setShowRelatedModel(true)}><svg data-name="Layer 1" id="Layer_1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'none', width: '18px', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2px' }}><title /><g data-name="&lt;Group&gt;" id="_Group_"><path class="cls-1" d="M13.38,10.79h0a3.5,3.5,0,0,1,0,5L10.52,18.6a3.5,3.5,0,0,1-5,0h0a3.5,3.5,0,0,1,0-5l.86-.86" data-name="&lt;Path&gt;" id="_Path_" /><path class="cls-1" d="M11,13.21h0a3.5,3.5,0,0,1,0-5L13.81,5.4a3.5,3.5,0,0,1,5,0h0a3.5,3.5,0,0,1,0,5l-.86.86" data-name="&lt;Path&gt;" id="_Path_2" /></g></svg></Link>
      </div>,
  },
];
const bundleItemColumns = [
  {
    name: (
      <>
        <div>Id</div>
      </>
    ),
    selector: (row) => row.itemId,
    wrap: true,
    sortable: true,
    format: (row) => row.itemId,
  },
  {
    name: (
      <>
        <div>Description</div>
      </>
    ),
    selector: (row) => row.itemBodyModel.itemBodyDescription,
    wrap: true,
    sortable: true,
    format: (row) => row.itemBodyModel.itemBodyDescription,
  },
  {
    name: (
      <>
        <div>Strategy</div>
      </>
    ),
    selector: (row) => row.itemHeaderModel.model,
    wrap: true,
    sortable: true,
    format: (row) => row.itemHeaderModel.model,
  },
  {
    name: (
      <>
        <div>Standard Job Id</div>
      </>
    ),
    selector: (row) => row.itemBodyModel.standardJobId,
    wrap: true,
    sortable: true,
    format: (row) => row.itemBodyModel.standardJobId,
  },
  {
    name: (
      <>
        <div>
          Repair Options
        </div>
      </>
    ),
    selector: (row) => row.itemBodyModel.repairOption,
    sortable: true,
    maxWidth: "300px",
    format: (row) => row.itemBodyModel.repairOption,
  },
  {
    name: (
      <>
        <div>
          Frequency
        </div>

      </>
    ),
    selector: (row) => row.itemBodyModel.frequency,
    wrap: true,
    sortable: true,
    format: (row) => row.itemBodyModel.frequency,
  },
  {
    name: (
      <>
        <div>Quantity</div>
      </>
    ),
    selector: (row) => row.itemBodyModel.quantity,
    wrap: true,
    sortable: true,
    format: (row) => row.itemBodyModel.quantity,
  },
  {
    name: (
      <>
        <div>Parts $</div>
      </>
    ),
    selector: (row) => row.itemBodyModel.sparePartsPrice,
    wrap: true,
    sortable: true,
    format: (row) => row.itemBodyModel.sparePartsPrice,
  },
  {
    name: (
      <>
        <div>Service $</div>
      </>
    ),
    selector: (row) => row.itemBodyModel.servicePrice,
    wrap: true,
    sortable: true,
    format: (row) => row.itemBodyModel.servicePrice,
  },
  {
    name: (
      <>
        <div>Total $</div>
      </>
    ),
    selector: (row) => row.itemBodyModel.totalPrice,
    wrap: true,
    sortable: true,
    format: (row) => row.itemBodyModel.totalPrice,
  },
  {
    name: (
      <>
        <div>Actions</div>
      </>
    ),
    selector: (row) => row.itemBodyModel.type,
    wrap: true,
    sortable: true,
    format: (row) => row.itemBodyModel.type,
    cell: (row) =>
      <div>
        <Link to="#" className="btn-svg text-white cursor mx-2">
          <svg version="1.1" viewBox="0 0 1696.162 1696.143" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="pen"><path d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z" /></g><g id="Layer_1" /></svg>
        </Link>
        <Link to="#" className="btn-svg text-white cursor mr-2"><svg data-name="Layer 41" id="Layer_41" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z" /><path class="cls-1" d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z" /><path class="cls-1" d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z" /></svg></Link>
        <Link to="#" className="btn-svg text-white cursor "><svg data-name="Layer 1" id="Layer_1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'none', width: '18px', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2px' }}><title /><g data-name="&lt;Group&gt;" id="_Group_"><path class="cls-1" d="M13.38,10.79h0a3.5,3.5,0,0,1,0,5L10.52,18.6a3.5,3.5,0,0,1-5,0h0a3.5,3.5,0,0,1,0-5l.86-.86" data-name="&lt;Path&gt;" id="_Path_" /><path class="cls-1" d="M11,13.21h0a3.5,3.5,0,0,1,0-5L13.81,5.4a3.5,3.5,0,0,1,5,0h0a3.5,3.5,0,0,1,0,5l-.86.86" data-name="&lt;Path&gt;" id="_Path_2" /></g></svg></Link>
      </div>,
  },
];
const columns4 = [
  {
    name: (
      <>
        <div>Family</div>
      </>
    ),
    selector: (row) => row.family,
    wrap: true,
    sortable: true,
    format: (row) => row.family,
  },
  {
    name: (
      <>
        <div>Model</div>
      </>
    ),
    selector: (row) => row.model,
    wrap: true,
    sortable: true,
    format: (row) => row.model,
  },
  {
    name: (
      <>
        <div>Serial Number</div>
      </>
    ),
    selector: (row) => row.noSeriese,
    wrap: true,
    sortable: true,
    format: (row) => row.noSeriese,
    cell: (row) => <div><Select className="customselect" options={[{ label: "12345", value: "12345" }, { label: "12345", value: "12345" },]} /></div>,
  },
  {
    name: (
      <>
        <div>Department</div>
      </>
    ),
    selector: (row) => row.department,
    wrap: true,
    sortable: true,
    format: (row) => row.department,
  },
  {
    name: (
      <>
        <div>Start Date</div>
      </>
    ),
    selector: (row) => row.startDate,
    wrap: true,
    sortable: true,
    format: (row) => row.startDate,
    cell: (row) =>
      <div className="date-box tabledate-box">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            variant="inline"
            format="dd/MM/yyyy"
            className="form-controldate border-radius-10"
            label=""
          // value={row.startDate}
          // onChange={(e) =>
          //   setValidityData({
          //     ...validityData,
          //     startDate: e,
          //   })
          // }
          />
        </MuiPickersUtilsProvider>
      </div>
  },
  {
    name: (
      <>
        <div>End Date</div>
      </>
    ),
    selector: (row) => row.endDate,
    wrap: true,
    sortable: true,
    format: (row) => row.endDate,
    cell: (row) =>
      <div className="date-box tabledate-box">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            variant="inline"
            format="dd/MM/yyyy"
            className="form-controldate border-radius-10"
            label=""
          // value={validityData.fromDate}
          // onChange={(e) =>
          //   setValidityData({
          //     ...validityData,
          //     fromDate: e,
          //   })
          // }
          />
        </MuiPickersUtilsProvider>
      </div>
  },

];
const data4 = [
  {
    family: "MOTONIVELADORAS",
    model: 120,
    noSeriese: "0JAPA000470",
    department: "LIMA",
    startDate: "08/04/20017",
    endDate: "08/04/20017",
  },
  {
    family: "MOTONIVELADORAS",
    model: 120,
    noSeriese: "0JAPA000470",
    department: "LIMA",
    startDate: "08/04/20017",
    endDate: "08/04/20017",
  },
];
const handleClick = (event) => {
  console.log("event",event)
  setAnchorEl(event.currentTarget);
  setOpen(true)
};
const [open, setOpen] = React.useState(false);
const [anchorEl, setAnchorEl] = React.useState(null);
const handleClose = () => setOpen(false);
const handleCreate=()=>{
  history.push('/quoteTemplate')
}
const history=useHistory()
    return(
      <>
      {/* <CommanComponents/> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
      <div class="container-fluid ">
      <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
          <h5 className="font-weight-600 mb-0">Standard Jobs</h5>
          <div className="d-flex justify-content-center align-items-center">
            {/* <div className="ml-3"><a href="#" className="bg-yellow text-white btn-sm rounded-pill">* Gold <KeyboardArrowDownIcon className="font-size-14"/></a></div> */}
            <div className="ml-3">
                <Select className="customselectbtn1" onChange={(e) => handleOption3(e)} options={options3} value={value3} />
              </div>
            
              <div className="ml-3">
                <Select className="customselectbtn" onChange={(e) => handleOption2(e)} options={options2} value={value2} />
              </div>
            <div className="rating-star">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              </div>
           
          </div>
          </div>
          <div className="d-flex">
          <div className="d-flex justify-content-center align-items-center">
          <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Items to Review"><img src={folderaddIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
            {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a>
           
          </div>
          <div>
          <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      
          <IconButton className="btn bg-primary text-white font-size-14 pr-0" style={{borderRadius:'5px'}}
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
           <span>Convert to<span><KeyboardArrowDownIcon/></span></span>
          </IconButton>

      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem >
         Templates
        </MenuItem>
        <MenuItem >
         Standard Job
        </MenuItem>
        <MenuItem>
         Kit
        </MenuItem>
        <MenuItem data-toggle="modal" data-target="#quotecreat">
        Quote
        </MenuItem>
        <Divider />

      </Menu>
    </React.Fragment>
          </div>
          </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i class="fa fa-folder-o" aria-hidden="true"></i></a></div>
              <div className="hr"></div>
              </h5>
        <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Customer" value="1" />
                <Tab label="Machine " value="2" />
                <Tab label="Estimation Team" value="3" />
                <Tab label="General Details" value="4" />
                <Tab label="Price" value="5" />
                <Tab label="Coverage" value="6" />
              </TabList>
            </Box>
            <TabPanel value="1">
            <div className="row">
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOURCE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER ID</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER NAME</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CONTACT EMAIL</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CONTACT PHONE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER GROUP</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
                
              </div>
              <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SOURCE</p>
              <h6 class="font-weight-500">Koolan lran Ore pty Ltd</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER ID</p>
              <h6 class="font-weight-500">357418</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER NAME</p>
              <h6 class="font-weight-500">Damon Farrell</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER EMAIL</p>
              <h6 class="font-weight-500">08 6311 5741</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CONTACT PHONE</p>
              <h6 class="font-weight-500">Large Mining</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER GROUP</p>
              <h6 class="font-weight-500">Australia-Direct Sale</h6>
              </div>
            </div>
         </div>
         <div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Save & Next
                    </button>
                  </div>
                {/* <div class="form-group mb-0">
                  <Link to={"/WithSpareParts"} className="btn bg-primary text-white">
                 Next
                  </Link>
                </div> */}

         </div>

            </TabPanel>
            <TabPanel value="2">
            <div className="row">
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MODEL</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SERIAL #</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SMU</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT NO / FLEET NO</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REGISTRATION NO</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CHASIS NO</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                
                
              </div>
            <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">MODEL</p>
              <h6 class="font-weight-500">992K</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SERIAL NO</p>
              <h6 class="font-weight-500">H4COO450 </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SMU</p>
              <h6 class="font-weight-500">12,580</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2"> UNIT NO / FLEET NO</p>
              <h6 class="font-weight-500">WL006</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REGISTRATION NO</p>
              <h6 class="font-weight-500">LAJOOt6t31</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CHASSIS NO</p>
              <h6 class="font-weight-500">797</h6>
              </div>
            </div>
         </div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Save & Next
                    </button>
                  </div>
            </TabPanel>
            <TabPanel value="3">
            <div className="row">
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PREPARED BY</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">APPROVED BY</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PREPARED ON</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REVISED BY</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REVISED ON</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SALES OFFICE / BRANCH</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
                
                
              </div>
            <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PREPARED BY</p>
              <h6 class="font-weight-500">Dan Ham</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">APPROVED BY</p>
              <h6 class="font-weight-500">01.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PREPARED ON</p>
              <h6 class="font-weight-500">Steve Eckersley</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REVISED BY </p>
              <h6 class="font-weight-500">Dan Ham</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REVISED ON</p>
              <h6 class="font-weight-500">10.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SALES OFFICE / BRANCH</p>
              <h6 class="font-weight-500">Sales Office</h6>
              </div>
            </div>
         </div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Save & Next
                    </button>
                  </div>
            </TabPanel>
            <TabPanel value="4">
            <div className="row">
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ESTIMATION DATE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ESTIMATION #</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REFERENCE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">VALIDITY</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">VERSION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                
                
              </div>
            <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ESTIMATION DATE </p>
              <h6 class="font-weight-500">3/10/2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ESTIMATION #</p>
              <h6 class="font-weight-500">1005583 </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
              <h6 class="font-weight-500">Koolan 992k WL006(revised)</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REFERENCE </p>
              <h6 class="font-weight-500">KM1305RE</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">VALIDTITY</p>
              <h6 class="font-weight-500">30 days </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">VERSION</p>
              <h6 class="font-weight-500">2</h6>
              </div>
            </div>
         </div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Save & Next
                    </button>
                  </div>
            </TabPanel>
            <TabPanel value="5">
              <div className="row">
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">NET PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE DATE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COST PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
              <div className="col-md-4 col-sm-4">
                  <div className="form-group">
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
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ADJUSTED PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
              
              
              <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
              </div>
              <div className="row mt-3">
              <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">NET PRICE</p>
              <h6 class="font-weight-500">Mining</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PRICE DATE</p>
              <h6 class="font-weight-500">01.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">COST PRICE</p>
              <h6 class="font-weight-500">01.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PRICE METHOD</p>
              <h6 class="font-weight-500">List Price </h6>
              </div>
            </div>
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ADJUSTED PRICE </p>
              <h6 class="font-weight-500">Mining</h6>
              </div>
            </div>
            
            
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CURRENCY </p>
              <h6 class="font-weight-500">AUD</h6>
              </div>
            </div>
         </div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Next
                    </button>
                  </div>
              
            </TabPanel>
            <TabPanel value="6">
            <div
                    className="custom-table card p-3 "
                    style={{ width: "100%", backgroundColor: "#fff" }}
                  >
                    <div className="row align-items-center ">
                      {/* <div className="col-2">
                        <div className="d-flex ">
                          <h5 className="mr-4 mb-0">
                            <span>Master Data</span>
                          </h5>
                          <p className="ml-4 mb-0"><a onClick={() => handleOpen()} className=" ml-3 font-size-14"><img src={uploadIcon}></img></a><a href="#" className="ml-3 "><img src={shareIcon}></img></a></p>
                        </div>
                      </div> */}
                      <div className="col-12">
                        {/* <div className="d-flex align-items-center">
                        <div
                              className="search-icon mr-2"
                              style={{ lineHeight: "24px", cursor: "pointer" }}
                              onClick={handleQuerySearchClick}
                            >
                              <SearchIcon />
                            </div>
                                <span className="mr-3">Search</span>
                        </div> */}
                        <div className="d-flex align-items-center bg-light-dark w-100">
                          <div className="d-flex justify-content-between align-items-center p-3 border-radius-10 w-100 border-right">
                            <div className="row align-items-center m-0">
                              {
                                querySearchSelector.map((obj, i) => {
                                  return (
                                    <>

                                      <div className="customselect d-flex align-items-center mr-3 my-2">
                                        {
                                          i > 0 ?
                                            <Select
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
                                          <Select
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
                                  className="btn-sm text-violet border"
                                  style={{ border: "1px solid #872FF7" }}
                                >
                                  +
                                </Link>
                              </div>
                              <div onClick={handleDeletQuerySearch}>
                                <Link to="#" className="btn-sm">
                                  <svg data-name="Layer 41" id="Layer_41" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z" /><path class="cls-1" d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z" /><path class="cls-1" d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z" /></svg>
                                  {/* <DeleteIcon className="font-size-16" /> */}
                                </Link>
                              </div>

                            </div>
                          </div>
                          <div className="px-3">
                            <Link to="#" className="btn bg-primary text-white" onClick={handleQuerySearchClick}>
                              <SearchIcon /><span className="ml-1">Search</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <DataTable
                      className=""
                      title=""
                      columns={masterColumns}
                      data={masterData}
                      customStyles={customStyles}
                      pagination
                    />
                    <div>
                      <div className="text-right">
                        <Link to="#" onClick={() => setSelectedMasterData(filterMasterData)} className="btn bg-primary text-white">+ Add Selected</Link></div>
                    </div>
                    <hr />
                    <label htmlFor="Included-model">
                      <h6 className="font-weight-400 text-black mb-2 mt-1">
                        Included models
                      </h6>

                    </label>
                    <DataTable
                      className="mt-3"
                      title=""
                      columns={selectedMasterColumns}
                      data={selectedMasterData}
                      customStyles={customStyles}
                      pagination
                    />
                  </div>
              
            </TabPanel>
            
          </TabContext>
        </Box>
        </div>
        <div className="card p-4 mt-5 d-none">
        <h5 className="d-flex align-items-center  mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Part List</span></div>
          <div className="hr"></div>
          </h5>
          <div className="row">
            <div className="col-md-6">
              <div className="card border">
              <div className="d-flex align-items-center justify-content-between mb-0 p-3">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
         <div className="d-flex">
         <div>
          <Checkbox className="p-0" {...label} />
        </div>
           <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share"/></a>
           <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review"/></a>
           <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="bg-light-grey p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
           <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
              <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
              </div>
            </div>
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
              <h6 class="font-weight-600">$38</h6>
              </div>
            </div>
          </div>
          <div className="form-group">
          <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div>
            <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>
           
          </div>
          </div>
          <div className=" p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
              <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
              </div>
            </div>
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
              <h6 class="font-weight-600">$38</h6>
              </div>
            </div>
          </div>
          <div className="form-group">
          <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div>
            <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>
           
          </div>
          </div>
          <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
           
          </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border">
              <div className="d-flex align-items-center justify-content-between mb-0 p-3">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
         <div className="d-flex">
         <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share"/></a>
           <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review"/></a>
           <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="bg-light-grey p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
              <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
              </div>
            </div>
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
              <h6 class="font-weight-600">$38</h6>
              </div>
            </div>
          </div>
          <div className="form-group">
          <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div>
            <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>
           
          </div>
          </div>
          <div className=" p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
              <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
              </div>
            </div>
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
              <h6 class="font-weight-600">$38</h6>
              </div>
            </div>
          </div>
          <div className="form-group">
          <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div>
            <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>
           
          </div>
          </div>
          <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
           
          </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border">
              <div className="d-flex align-items-center justify-content-between mb-0 p-3">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
         <div className="d-flex">
         <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share"/></a>
           <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review"/></a>
           <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="bg-light-grey p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
              <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
              </div>
            </div>
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
              <h6 class="font-weight-600">$38</h6>
              </div>
            </div>
          </div>
          <div className="form-group">
          <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div>
            <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>
           
          </div>
          </div>
          <div className=" p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
              <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
              </div>
            </div>
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
              <h6 class="font-weight-600">$38</h6>
              </div>
            </div>
          </div>
          <div className="form-group">
          <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div>
            <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>
           
          </div>
          </div>
          <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
           
          </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border">
              <div className="d-flex align-items-center justify-content-between mb-0 p-3">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
         <div className="d-flex">
         <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share"/></a>
           <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review"/></a>
           <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="bg-light-grey p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
              <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
              </div>
            </div>
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
              <h6 class="font-weight-600">$38</h6>
              </div>
            </div>
          </div>
          <div className="form-group">
          <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div>
            <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>
           
          </div>
          </div>
          <div className=" p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
              <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
              </div>
            </div>
            <div className="col-6">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
              <h6 class="font-weight-600">$38</h6>
              </div>
            </div>
          </div>
          <div className="form-group">
          <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div>
            <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>
           
          </div>
          </div>
          <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
           
          </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Add-new-segment-div p-3 border-radius-10">
                <Link to="/Segment01Transmission" className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add New Segment
                </Link>
          
        </div>
        {/* <div className="Add-new-segment-div p-3 border-radius-10">
                <Link to="/RepairServiceEstimate" className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Service Estimates
                </Link>
          
        </div> */}
        </div>
        <div class="modal fade" id="quotecreat" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content bg-white border-none">
              <div class="modal-header border-none">
                <h5 class="modal-title" id="exampleModalLabel">Quote Create</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
               
              </div>
              <p className="d-block px-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              <hr className="my-1"/>
              <div class="modal-body">
             <div className="row">
             <div className="col-md-12 col-sm-12">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">Quote Type</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Cyclical"
              />
            </div>
              </div>
              <div className="col-md-12 col-sm-12">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">Quote ID</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              </div>
              <div className="col-md-12 col-sm-12">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
              </div>
              <div className="col-md-12 col-sm-12">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">Reference</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              </div>
             </div>

             <div className="row">
             <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-500 mb-2">QUOTE TYPE </p>
                 <h6 class="font-weight-500">Repair Quote with Spare Parts</h6>
                 </div>
                 </div>
                 <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-500 mb-2">Quote ID </p>
                 <h6 class="font-weight-500">SB12345</h6>
                 </div>
                 </div>
                 <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-500 mb-2">QUOTE DESCRIPTION</p>
                 <h6 class="font-weight-500">Holder text</h6>
                 </div>
                 </div>
                 <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-500 mb-2">REFERENCE</p>
                 <h6 class="font-weight-500">Holder text</h6>
                 </div>
                 </div>
               
             </div>
              </div>
              <div class="modal-footer"style={{display:'unset'}}>
                <div className="mb-2">
                  <a href="#" onClick={()=>handleCreate()} data-dismiss="modal" className="btn bg-primary d-block text-white">Done</a>
                </div>
                <div>
                <button class="btn  btn-primary">Create</button>
                <button type="button" class="btn pull-right border" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </>
    )
}


export default StandardJobs