import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import Select from '@mui/material/Select';
import Select2 from 'react-select';
import { FileUploader } from "react-drag-drop-files";
import { MuiMenuComponent } from '../Operational/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Buttonarrow from '../../assets/icons/svg/Button-arrow.svg'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { SolutionSelector } from './index'
import { CommanComponents } from "../../components/index"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { SolutionBuilderModal } from "../../pages/SolutionModules/index"

import SelectFilter from 'react-select';
import QuerySearchComp from "../PortfolioAndBundle/QuerySearchComp";
import SearchIcon from '@mui/icons-material/Search';
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
import DataTable from "react-data-table-component";

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
         backgroundColor: "#872ff7",
         color: "#fff",
      },
   },
   cells: {
      style: {
         paddingLeft: "8px", // override the cell padding for data cells
         paddingRight: "8px",
      },
   },
};

export const Analytics = () => {
   const [value, setValue] = React.useState('1');
   const [openSolutionSelector, setOpenSolutionSelector] = useState(false)
   const [solutionBuilderShow, setSolutionBuilderShow] = useState(false)
   const [showExplore, setShowExplore] = useState(false);
   const [modalComponent, setModalComponent] = useState(null)
   const [openAddBundleItem, setOpenAddBundleItem] = useState(false)
   const [createNewBundle, setCreateNewBundle] = useState(false)
   const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("")

   const [openSearchSolution, setOpenSearchSolution] = useState(false)
   const [typeOfSearch, setTypeOfSearch] = useState(null)
   const [typeOfSolutionSelector, setTypeOfSolutionSelector] = useState(-1)
   const [typeOfSearchColumn, setTypeOfSearchColumn] = useState(null)
   const [columnSearchKeyValue, setColumnSearchKeyValue] = useState([{ label: "Bundle", value: 'bundle' }, { label: "Service", value: 'service' }, { label: "Portfolio Item", value: 'portfolioItem' }])
   const [typeOfSearchColumnKeyValue, setTypeOfSearchColumnKeyValue] = useState([{ label: "Make", value: 'make' }, { label: "Model", value: 'model' }, { label: "Prefix", value: 'prefix' }])
   const [columnSearchText, setColumnSearchText] = useState('');
   const [typeOfSolutionBuild, setTypeOfSolutionBuild] = useState(-1)
   const [buildSolutionValue, setBuildSolutionValue] = useState(-1)

   const [columnTextSearch, setColumnTextSearch] = useState([])

   const [age, setAge] = React.useState('5');
   const [age1, setAge1] = React.useState('5');
   const [age2, setAge2] = React.useState('5');
   const [show, setShow] = React.useState(false);

   const [responseSearchItem, setResponseSearchItem] = useState([])
   const [querySearchSelectItem, setQuerySearchSelectItem] = useState([])

   const ItemSearchResponseFun = (data, searchData) => {
      console.log("itemSerach Response Data : ", data)
      console.log("querySearchSelectItem :=> ", searchData)
      // console.log("item type : ", querySearchSelectItem[0].itemType.label)
      if (data.length > 0) {
         setResponseSearchItem(data)
         setQuerySearchSelectItem(searchData)
         // setShowExplore(true)
         // setOpenSearchSolution(false)
      } else {
         toast("😐" + "No Record Found ", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }

   }


   const handleChangedrop = (event) => {
      setAge(event.target.value);
   };
   const handleChangedrop1 = (event) => {
      setAge1(event.target.value);
   };
   const handleChangedrop2 = (event) => {
      setAge2(event.target.value);
   };


   const handleRowClick = (e) => {
      setShow(true)
   }

   const [filterMasterData, setFilterMasterData] = useState([])
   const [selectedMasterData, setSelectedMasterData] = useState([])
   const [masterData, setMasterData] = useState([])
   const [flagIs, setFlagIs] = useState(false)
   const [count, setCount] = useState(1)

   const rows = [
      { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Inconsistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
      { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
      { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Created: 'Created On', Total: '25', Status: 'Status', Actions: 'Action', },
      // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
      // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
      // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
      // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
      // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
      // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
   ];

   const columns1 = [
      {
         name: (
            <>
               <div>
                  <Checkbox className="text-white" />
               </div>
            </>
         ),
         selector: (row) => row.id,
         wrap: true,
         sortable: true,
         maxWidth: "300px",
         cell: (row) => <Checkbox
            className="text-black"
            onChange={(e) => handleMasterCheck(e, row)}
         />,
      },
      {
         name: (
            <>
               <div>Id#</div>
            </>
         ),
         selector: (row) => row.id,
         wrap: true,
         sortable: true,
         format: (row) => row.id,
      },
      {
         name: (
            <>
               <div>Description</div>
            </>
         ),
         selector: (row) => row.modelDescription,
         wrap: true,
         sortable: true,
         format: (row) => row.modelDescription,
      },
      {
         name: (
            <>
               <div>Customer#</div>
            </>
         ),
         selector: (row) => row?.customer,
         wrap: true,
         sortable: true,
         format: (row) => row?.customer,
      },
      {
         name: (
            <>
               <div>Make#</div>
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
               <div>Serial#</div>
            </>
         ),
         selector: (row) => row?.serial,
         sortable: true,
         maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
         // cell: row => row.bundleId,
         // cell: (row) => <button onClick={() => alert()}>1</button>,
         // cell: (row) => <Checkbox className="text-black" {...label} />,
         format: (row) => row?.serial,
      },
      {
         name: (
            <>
               <div>
                  Created by
               </div>
            </>
         ),
         selector: (row) => row.createdBy,
         wrap: true,
         sortable: true,
         format: (row) => row.createdBy,
      },
      {
         name: (
            <>
               <div> Created On</div>
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
               <div>Total</div>
            </>
         ),
         selector: (row) => row?.total,
         wrap: true,
         sortable: true,
         format: (row) => row?.total,
      },
      {
         name: (
            <>
               <div>Status</div>
            </>
         ),
         selector: (row) => row.status,
         wrap: true,
         sortable: true,
         format: (row) => row.status,
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
         cell: (row) => (
            <div>
               Action
            </div>
         ),
      },
   ];
   const columns = [
      { field: 'GroupNumber', headerName: 'ID#', flex: 1, width: 70 },
      { field: 'Type', headerName: 'Description', flex: 1, width: 130 },
      { field: 'Partnumber', headerName: 'Customer#', flex: 1, width: 130 },
      { field: 'PriceExtended', headerName: 'Make', flex: 1, width: 130 },
      { field: 'Pricecurrency', headerName: 'Model', flex: 1, width: 130 },
      { field: 'Usage', headerName: 'Family', flex: 1, width: 130 },
      { field: 'TotalPrice', headerName: 'Serial#', flex: 1, width: 130 },
      { field: 'Comments', headerName: 'Created by', flex: 1, width: 130 },
      { field: 'Created', headerName: 'Created On', flex: 1, width: 130 },
      { field: 'Total', headerName: 'Total $', flex: 1, width: 130 },
      { field: 'Status', headerName: 'Status', flex: 1, width: 130 },
      { field: 'Actions', headerName: 'Actions', flex: 1, width: 130 },
      // { field: 'Actions', headerName: 'Total $',  flex:1, width: 130 },
      // { field: 'Actions', headerName: 'Status',  flex:1, width: 130 },
      // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
      // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
      //   `${params.getValue(params.id, 'firstName') || ''} ${
      //       params.getValue(params.id, 'DocumentType') || ''
      //     }`,

   ];

   const handleBuildSolution = (e) => {
      setBuildSolutionValue(e.target.value)
   }

   const handleCallbackClose = (data) => {
      if (solutionBuilderShow) {
         setSolutionBuilderShow(false);
      } else {
         setSolutionBuilderShow(true);
      }
   }

   const handleContinueCallback = (data) => {
      if (data) {
         setTypeOfSolutionBuild(0)
         setOpenSolutionSelector(true)
         setOpen(false)
      } else {
         setTypeOfSolutionBuild(1)
         setOpenSolutionSelector(false)
         setOpen(true)
         setTypeOfSolutionSelector(1)
      }
      setSolutionBuilderShow(false);
      setModalComponent(null)
      setOpenSearchSolution(false)
      setShowExplore(false)
   }

   const handleNextSolutionSelector = () => {
      if (buildSolutionValue == "0") {
         window.location.href = "/solutionBuilder/guide"
      } else {
         setTypeOfSolutionBuild(0)
         setOpenSolutionSelector(false)
         setOpen(true)
         setSolutionBuilderShow(false);
         setModalComponent(null)
         setOpenSearchSolution(false)
         setShowExplore(false)
         setTypeOfSolutionSelector(0)
      }
   }

   const handleShowSearchParentCallback = (data) => {
      setOpenSearchSolution(true)
      setOpenSolutionSelector(false)
      setSolutionBuilderShow(false);
      setModalComponent(null)
      setShowExplore(false)
   }

   const handleBundleItemSaveAndContinue = () => {
      // toast('👏 Item Added', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      setOpenSolutionSelector(false)
      setSolutionBuilderShow(false);
      setModalComponent(null)
      setOpenSearchSolution(false)
      setShowExplore(true)
   }

   const handleCloseExplore = () => {
      setShowExplore(false);
   }

   const handleShow = () => {
      if (solutionBuilderShow) {
         setModalComponent(<SolutionBuilderModal showSearchParentCallback={handleShowSearchParentCallback} continueParentCallback={handleContinueCallback} parentCallback={handleCallbackClose} open={false} />)
      } else {
         setModalComponent(<SolutionBuilderModal showSearchParentCallback={handleShowSearchParentCallback} continueParentCallback={handleContinueCallback} parentCallback={handleCallbackClose} open={true} />)
      }
   }


   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   const fileTypes = ["JPG", "PNG", "GIF"];


   const activityOptions = [
      'None',
      'Atria',
      'Callisto'
   ];


   const handleTypeOfSearchChange = (e) => {
      setTypeOfSearch(e)
      if (e == null) {
         setColumnSearchText("")
      }
   }
   const handleTypeOfSearchColumnChange = (e) => {
      setTypeOfSearchColumn(e)
      if (e == null) {
         setColumnSearchText("")
      }
   }



   const handleCreateNewServiceBundle = () => {
      if (typeOfSearch.value == 'bundle') {
         setOpenAddBundleItem(false)
         setOpenSearchSolution(false)
         setCreateNewBundle(true)
         setOpenAddBundleItemHeader("Add New Bundle")
      } else if (typeOfSearch.value == 'service') {
         setOpenAddBundleItem(true)
         setOpenSearchSolution(false)
         setCreateNewBundle(false)
         setOpenAddBundleItemHeader("Add New Service")
      } else if (typeOfSearch.value == 'portfolioItem') {
         setOpenAddBundleItem(true)
         setOpenSearchSolution(false)
         setCreateNewBundle(false)
         setOpenAddBundleItemHeader("Add New Portfolio Item")
      }

   }

   const handleOperator = (e, id) => {
      let tempArray = [...querySearchSelector]
      let obj = tempArray[id]
      obj.selectOperator = e
      tempArray[id] = obj
      setQuerySearchSelector([...tempArray])
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
   const handleFamily = (e, id) => {
      let tempArray = [...querySearchSelector]
      console.log("handleFamily e:", e)
      let obj = tempArray[id]
      obj.selectFamily = e
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
   const handleDeletQuerySearch = () => {
      setQuerySearchSelector([])
      setCount(0)
      setMasterData([])
      setFilterMasterData([])
      setSelectedMasterData([])
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
   const handleMasterCheck = (e, row) => {
      if (e.target.checked) {
         var _masterData = [...masterData]
         const updated = _masterData.map((currentItem, i) => {
            if (row.id == currentItem.id) {
               return { ...currentItem, ["check1"]: e.target.checked }
            } else return currentItem
         })
         setMasterData([...updated])

         const isFound = filterMasterData.some((element) => {
            if (element.id === row.id) {
               return true;
            }

            return false;
         });

         if (!isFound) {
            const _filterMasterData = [...filterMasterData, { ...row }];
            const updatedItems = _filterMasterData.map((currentItem, i) => {
               return { ...currentItem };
            });
            setFilterMasterData(updatedItems);
            // setFilterMasterData([...filterMasterData, { ...row }])
         }

         // setFilterMasterData([...filterMasterData, { ...row }])
      } else {
         // var _filterMasterData = [...filterMasterData]
         // const updated = _filterMasterData.filter((currentItem, i) => {
         //    if (row.id !== currentItem.id)
         //       return currentItem
         // })
         // setFilterMasterData(updated)

         var _masterData = [...masterData];
         const updated1 = _masterData.map((currentItem, i) => {
            if (row.id == currentItem.id) {
               return { ...currentItem, ["check1"]: e.target.checked };
            } else return currentItem;
         });
         setMasterData([...updated1]);
         var _filterMasterData = [...filterMasterData];
         const updated = _filterMasterData.filter((currentItem, i) => {
            if (row.id !== currentItem.id) return currentItem;
         });
         setFilterMasterData(updated);
      }

   }

   const myFun = (e, row) => {
      if (e.target.checked) {
         setShowExplore(true)
         setOpenSearchSolution(false)
      }
   }


   useEffect(() => {
      if (masterData.some((masterDataitem) => masterDataitem.check1 === true)) {
         setFlagIs(true);
      } else {
         setFlagIs(false);
      }
   }, [masterData]);

   const handleDeleteIncludeSerialNo = (e, row) => {
      const updated = selectedMasterData.filter((obj) => {
         if (obj.id !== row.id)
            return obj
      })
      setSelectedMasterData(updated)
   }

   const CantFindgoback = () => {
      // alert("hello")
      handleCloseExplore()
      handleShow()
   }

   const columns2 = [
      { field: 'GroupNumber', headerName: 'ID#', flex: 1, width: 70 },
      { field: 'Type', headerName: 'Description', flex: 1, width: 130 },
      { field: 'Partnumber', headerName: 'Customer#', flex: 1, width: 130 },
      { field: 'PriceExtended', headerName: 'Make', flex: 1, width: 130 },
      { field: 'Pricecurrency', headerName: 'Model', flex: 1, width: 130 },
      { field: 'Usage', headerName: 'Family', flex: 1, width: 130 },
      { field: 'TotalPrice', headerName: 'Serial#', flex: 1, width: 130 },
      { field: 'Comments', headerName: 'Created by', flex: 1, width: 130 },
      { field: 'Created', headerName: 'Created On', flex: 1, width: 130 },
      { field: 'Total', headerName: 'Total $', flex: 1, width: 130 },
      { field: 'Status', headerName: 'Status', flex: 1, width: 130 },
      // { field: 'Actions', headerName: 'Actions',  flex:1, width: 130 },
      // { field: 'Actions', headerName: 'Total $',  flex:1, width: 130 },
      // { field: 'Actions', headerName: 'Status',  flex:1, width: 130 },
      // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
      // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
      //   `${params.getValue(params.id, 'firstName') || ''} ${
      //       params.getValue(params.id, 'DocumentType') || ''
      //     }`,

   ];

   const columns4 = [
      {
         name: (
            <>
               <div>Select</div>
            </>
         ),
         selector: (row) => row.itemId,
         wrap: true,
         sortable: true,
         // format: (row) => row.itemId,
         cell: (row) => (
            <Checkbox
               className="text-black"
            // checked={row.check1}
            // onChange={(e) => myFun(e, row)}
            />
         ),
      },
      {
         name: (
            <>
               <div>ID</div>
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
         selector: (row) => row.itemHeaderModel.itemHeaderDescription,
         wrap: true,
         sortable: true,
         format: (row) => row.itemHeaderModel.itemHeaderDescription,
      },
      {
         name: (
            <>
               <div>Solution Code</div>
            </>
         ),
         selector: (row) => row.itemBodyModel.solutionCode,
         wrap: true,
         sortable: true,
         format: (row) => row.itemBodyModel.solutionCode,
      },
      // {
      //    name: (
      //       <>
      //          <div>Item Header Id</div>
      //       </>
      //    ),
      //    selector: (row) => row.strategyTask,
      //    wrap: true,
      //    sortable: true,
      //    format: (row) => row.strategyTask,
      // },
      {
         name: (
            <>
               <div>Repair Option</div>
            </>
         ),
         selector: (row) => row.itemBodyModel.repairOption,
         wrap: true,
         sortable: true,
         format: (row) => row.itemBodyModel.repairOption,
      },
      {
         name: (
            <>
               <div>Frequency</div>
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
               <div>Total $</div>
            </>
         ),
         selector: (row) => row.itemBodyModel.totalPrice,
         wrap: true,
         sortable: true,
         format: (row) => row.itemBodyModel.totalPrice,
      },
   ];





   return (
      <>
         {/* <CommanComponents /> */}
         <div className="content-body" style={{ minHeight: '884px' }}>
            <div class="container-fluid ">
               <div className="d-flex align-items-center justify-content-between mt-2">
                  <h5 className="font-weight-600 mb-0">Solution Builder</h5>
                  <div>
                     <a href="#" onClick={handleShow} style={{ cursor: 'pointer' }} className="btn bg-primary text-white">
                        <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create New<span className="ml-2"></span>
                     </a>
                  </div>
               </div>
               <div className="card p-4 mt-5">
                  <div className="mt-1">
                     <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6>
                     <div className="recent-div p-3">
                        <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                        <div className="row">
                           <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Portfolio Solution </span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Portfolio Solution</p>
                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Service Bundles</p>
                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Service Bundles</p>
                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Portfolio Solution </span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Portfolio Solution</p>
                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Service Bundles</p>
                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Strategy Task</span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Strategy Task</p>
                              </div>
                           </div>

                        </div>

                     </div>
                     <div className="recent-div p-3">
                        <h6 className="font-weight-600 text-grey mb-0">SERVICE BUNDLES</h6>
                        <div className="row">
                           <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Service Bundles</p>
                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Service Bundles</p>
                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Strategy Task</span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Strategy Task</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="bg-primary px-3 mb-3">
                  <div className="row align-items-center">

                     <div className="col-11 mx-2">

                        <div className="d-flex align-items-center bg-primary w-100">
                           <div className="d-flex mr-3" style={{ whiteSpace: 'pre' }}>
                              <h5 className="mr-2 mb-0 text-white"><span>Search</span></h5>
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
                           <Link to="#" className="p-1 text-white" data-toggle="modal" data-target="#Datatable"  >
                              <SearchIcon /><span className="ml-1">Search</span>
                           </Link>

                        </div>

                     </div>
                     {/* <div className="col-auto">
           <div className="d-flex align-items-center justify-content-center">
             <div className="text-center border-left pl-3 py-3">
             <Link to="/repairOptions" className="p-1 text-white">+ Add Part</Link>
             
             </div>
           </div>
         </div> */}
                  </div>
               </div>
               <div className="card">

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


               <Modal show={open} onHide={handleClose} size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered>
                  <Modal.Header>
                     <Modal.Title>Solution Selector</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="p-0 pt-4 bg-white">
                     <SolutionSelector defaultValue={typeOfSolutionSelector} />
                  </Modal.Body>
               </Modal>

               <Modal show={openSolutionSelector} onHide={() => setOpenSolutionSelector(false)} size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered>
                  <Modal.Header className="bg-white">
                     <Modal.Title>Solution Selector</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="p25 pt-4" style={{ backgroundColor: '#F8F8F8 !important' }}>
                     <div>
                        <h5 className='text-black'>How do you want to build the solution ?</h5>
                        <RadioGroup className=''
                           row
                           aria-labelledby="demo-form-control-label-placement"
                           name="position"
                           defaultValue="top"
                           value={buildSolutionValue}
                           onChange={handleBuildSolution}
                        >
                           <div className="col-md-6 ">

                              <FormControlLabel
                                 className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart"
                                 value="0"
                                 control={<Radio />}
                                 label="Guided Solution"
                                 labelPlacement="bottom"
                              />
                           </div>
                           <div className="col-md-6 ">
                              <FormControlLabel
                                 className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart"
                                 value="1"
                                 control={<Radio />}
                                 label="Non-guided solution"
                                 labelPlacement="bottom"
                              />
                           </div>
                        </RadioGroup>
                        <div>
                           <button onClick={handleNextSolutionSelector} className="btn btn-primary w-100">Next  <img className='ml-2' src={Buttonarrow}></img></button>
                        </div>
                     </div>
                  </Modal.Body>
               </Modal>


               <Modal show={openSearchSolution} onHide={() => setOpenSearchSolution(false)} size="xl"
                  aria-labelledby="contained-modal-title-vcenter">
                  <Modal.Body className="">
                     Search Solution
                     <div className="maintableheader bg-white mt-3 border-radius-10">
                        <QuerySearchComp
                           compoFlag="itemSearch1"
                           options={[
                              { label: "Make", value: "itemHeaderMake" },
                              { label: "Family", value: "itemHeaderFamily" },
                              { label: "Model", value: "model" },
                              { label: "Prefix", value: "prefix" },
                           ]}
                           ItemSearchResponseFun={ItemSearchResponseFun}
                           setResponseSearchItem={setResponseSearchItem}
                        // setQuerySearchSelectItem={setQuerySearchSelectItem}
                        // setTempBundleService1={setTempBundleService1}
                        // setLoadingItem={setLoadingItem} 
                        />
                        {/* <div className="d-flex justify-content-between align-items-center pl-2">
                           <div className="d-flex align-items-center">
                              <div className="customselect d-flex ml-3"> */}
                        {/* <span>
                                        <a href="#" className="btn-sm">+</a>
                                    </span> */}
                        {/* <Select2
                                    onChange={handleTypeOfSearchChange}
                                    isClearable={true}
                                    value={typeOfSearch}
                                    options={[{ label: "Bundle", value: 'bundle' }, { label: "Service", value: 'service' }, { label: "Portfolio Item", value: 'portfolioItem' }]}
                                    placeholder="Add by"
                                 /> */}
                        {/* </div>
                              {typeOfSearch != null
                                 ?
                                 <div className="customselect d-flex ml-3">
                                    <span>
                                       <a href="#" className="btn-sm">+</a>
                                    </span>
                                    <Select2
                                       onChange={handleTypeOfSearchColumnChange}
                                       isClearable={true}
                                       value={typeOfSearchColumn}
                                       options={typeOfSearchColumnKeyValue}
                                       placeholder="Select"
                                    />
                                    {typeOfSearchColumn != null
                                       ?
                                       // <></>
                                       <input type="email" class="" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter text" style={{ border: 'none', background: 'transparent', width: '80px', fontWeight: '600', paddingLeft: '10px' }} value={columnSearchText} onChange={(e) => setColumnSearchText(e.target.value)}></input>
                                       : <></>
                                    }
                                 </div>
                                 : <></>
                              }

                           </div> */}
                        {/* <div>
                              <div className="">
                                 <a href="#" style={{ cursor: 'pointer' }} className="btn border-left"><span>+</span> Add</a>
                                 <a href="#" className="btn border-left">Cancel</a>
                              </div>
                           </div> */}
                        {/* </div> */}
                        {columnSearchText.trim() != "" && typeOfSearchColumn != null
                           ?
                           <div className="tableheader">
                              <ul class="submenu accordion mt-0" style={{ display: 'block' }}>
                                 <li><a className="cursor result" >RESULTS</a></li>
                                 <li><a className="cursor" onClick={handleBundleItemSaveAndContinue}>PM125</a></li>
                                 <li><a className="cursor" onClick={handleBundleItemSaveAndContinue}>PM2</a></li>
                                 <li><a className="cursor lastOption text-violet" onClick={handleCreateNewServiceBundle}><span className="mr-2">+</span>Create New {typeOfSearch != null ? typeOfSearch.value == 'bundle' ? "Bundle" : typeOfSearch.value == 'service' ? "Service" : typeOfSearch.value == 'portfolioItem' ? "Portfolio Item" : "" : ""}</a></li>
                              </ul>
                           </div>
                           :
                           <></>}
                        {responseSearchItem.length > 0 ?
                           <>
                              <div className="tableheader">
                                 <ul class="submenu accordion mt-0" style={{ display: 'block' }}>
                                    <li><a className="cursor result" >RESULTS</a></li>
                                 </ul>
                                 <DataTable
                                    className=""
                                    title=""
                                    columns={columns4}
                                    data={responseSearchItem}
                                    customStyles={customStyles}
                                 // pagination
                                 />
                              </div>
                              {/* {console.log("querySearchSelectItem :=> ", querySearchSelectItem)} */}
                           </> : <></>
                        }
                     </div>
                  </Modal.Body>
                  <Modal.Footer>
                     {responseSearchItem.length > 0 ?
                        <div>
                           <button className="btn btn-primary w-100" onClick={handleBundleItemSaveAndContinue}>Save & Continue</button>
                        </div>
                        : <></>}
                  </Modal.Footer>
               </Modal>

               <Modal show={showExplore} onHide={handleCloseExplore} size="xl"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered>
                  <Modal.Body className='p-0'>
                     <div className='bg-white border-bottom'>
                        <div className='d-flex align-items-center justify-content-between'>
                           <div></div>
                           <div>
                              <a href='#' className='btn border-left'>+ Add</a>
                              <a href='#' className='btn border-left'>Cancel</a>
                           </div>
                        </div>
                     </div>
                     <div className='bg-white p-2'>
                        <h5>Available portfolios</h5>
                        <h6>Baed on your choosen search criteria following portfolios are available,and you may click on choose to add the portfolio to the solution</h6>
                        <div>

                           <div class="contain-slider mt-3">
                              <OwlCarousel items={3} className='owl-theme' loop margin={10} nav>
                                 <div class='item'>
                                    <a href='#' className='bg-yellow text-white btn'>CV agreement</a>
                                    <h4 className='text-red mt-3'><b>$20,000</b></h4>
                                    <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                                    </ul>
                                    <Link to="/service/new" className="btn bg-primary text-white Choose-btn">Choose</Link>
                                    {/* <a href="#" class="btn bg-primary text-white Choose-btn">Choose</a> */}
                                 </div>
                                 <div class='item'>
                                    <a href='#' className='bg-primary  text-white btn'>Repair {querySearchSelectItem.length > 0 ? querySearchSelectItem[0].itemType.label : ""}</a>
                                    <h4 className='text-red mt-3'><b>$20,000</b></h4>
                                    <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                                    </ul>
                                    <Link to="/service/new" className="btn bg-primary text-white Choose-btn">Choose</Link>
                                    {/* <a href="#" class="btn bg-primary text-white Choose-btn">Choose</a> */}
                                 </div>
                                 <div class='item'>
                                    <a href='#' className='bg-green-light text-white btn'>Maintenence {querySearchSelectItem.length > 0 ? querySearchSelectItem[0].itemType.label : ""}</a>
                                    <h4 className='text-red mt-3'><b>$20,000</b></h4>
                                    <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                                    </ul>
                                    <Link to="/service/new" className="btn bg-primary text-white Choose-btn">Choose</Link>
                                    {/* <a href="#" class="btn bg-primary text-white Choose-btn">Choose</a> */}
                                 </div>
                                 <div class='item'>
                                    <h4 className='text-light'><b>Repair {querySearchSelectItem.length > 0 ? querySearchSelectItem[0].itemType.label : ""}</b></h4>
                                    <h4 className='text-red mt-3'><b>$20,000</b></h4>
                                    <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                                    </ul>
                                    <Link to="/service/new" className="btn bg-primary text-white Choose-btn">Choose</Link>
                                    {/* <a href="#" class="btn bg-primary text-white Choose-btn">Choose</a> */}
                                 </div>

                              </OwlCarousel>

                           </div>

                           <div>
                              <a href='#' onClick={CantFindgoback} className='btn'>I can't find what i need</a>
                           </div>
                        </div>
                     </div>

                  </Modal.Body>
               </Modal>


               <ToastContainer />
            </div>
            {modalComponent}
            <div class="modal fade" id="Datatable" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: '1200' }}>
               <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                  <div class="modal-content">

                     <div class="modal-header p-3">
                        <div className="d-flex" >
                           <h5>Search Result</h5>

                        </div>
                     </div>
                     <div>
                        <div className="card w-100 p-2">

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
                        <div className="m-2 text-right">
                           <input className="btn text-white bg-primary" value="+ Add Selected" disabled={!flagIs} />
                           {/* <a href="#" className="btn text-white bg-primary">+ Add Selected</a> */}

                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
};
