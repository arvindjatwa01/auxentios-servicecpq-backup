import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import shearchIcon from "../../assets/icons/svg/search.svg";
import { ToastContainer, toast } from 'react-toastify';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
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
import Button from "@material-ui/core/Button";
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

import Loader from "react-js-loader";
import LoadingProgress from "../Repair/components/Loader";

import { SolutionBuilderModal } from "../../pages/SolutionModules/index"
import { SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO, SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE, CREATED_CUSTOM_PORTFOLIO_DETAILS } from '../../navigation/CONSTANTS'
import { SOLUTION_BUILDER_PORRTFOLIO_TEMP } from "../../navigation/CONSTANTS";
import { SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT } from "../../navigation/CONSTANTS";

import Portfoliosicon from '../../assets/icons/svg/Portfolios-icon.svg'
import contract from '../../assets/icons/svg/contract.svg'
import repairicon from '../../assets/icons/svg/repair-icon.svg'

import SelectFilter from 'react-select';
import QuerySearchComp from "../PortfolioAndBundle/QuerySearchComp";
import SolutionQuerySearchComp from "./SolutionQuerySearchComp";
import { PortfolioTemplatesResult } from "./PortfolioTemplatesResult";
import CreatedCustomPortfolioTemplate from "./CreatedCustomPortfolioTemplate";
import SearchIcon from '@mui/icons-material/Search';

import penIcon from "../../assets/images/pen.png";

import $, { data } from "jquery"
import { useHistory } from 'react-router-dom';
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
   itemCreation,
   getItemPrice,
   itemPriceDataId,
   customItemCreation,
   customPriceCreation,
   createCustomPortfolio,
   updateCustomPortfolio,
   solutionPortfolioSearch,
   getSearchForRecentSolutionPortfolio,
   getSearchForRecentSolutionBundleService,
   copyPortfolioICustomPortfolio,
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

const customTableStyles = {
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
         borderRight: "1px solid rgba(0,0,0,.12)",
      },
   },
   cells: {
      style: {
         paddingLeft: "8px", // override the cell padding for data cells
         paddingRight: "8px",
         borderRight: "1px solid rgba(0,0,0,.12)",
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

   // const [selectedValue, setSelectedValue] = useState('a');


   const handleChangeRadio = (e) => {

      try {
         console.log("event is  : ", e.target.value)
         if (e.target.value === "a") {
            setSolutionValue(0);
         }

         if (e.target.value === "b") {
            setSolutionValue(1);
         }
      } catch (error) {

      }
      // event: ChangeEvent<HTMLInputElement>) => {
      // setSelectedValue(event.target.value);
   };

   const [openSearchSolution, setOpenSearchSolution] = useState(false)
   const [openTemplateSerachModelBox, setOpenTemplatesSearchModelBox] = useState(false)
   const [typeOfSearch, setTypeOfSearch] = useState(null)
   const [typeOfSolutionSelector, setTypeOfSolutionSelector] = useState(-1)
   const [typeOfSearchColumn, setTypeOfSearchColumn] = useState(null)
   const [columnSearchKeyValue, setColumnSearchKeyValue] = useState([{ label: "Bundle", value: 'bundle' }, { label: "Service", value: 'service' }, { label: "Portfolio Item", value: 'portfolioItem' }])
   const [typeOfSearchColumnKeyValue, setTypeOfSearchColumnKeyValue] = useState([{ label: "Make", value: 'make' }, { label: "Model", value: 'model' }, { label: "Prefix", value: 'prefix' }])
   const [columnSearchText, setColumnSearchText] = useState('');
   const [typeOfSolutionBuild, setTypeOfSolutionBuild] = useState(-1)
   const [buildSolutionValue, setBuildSolutionValue] = useState(-1)

   const [headerLoading, setHeaderLoading] = useState(false);

   const [columnTextSearch, setColumnTextSearch] = useState([])
   const [loadingStatus, setLoadingStatus] = useState("")

   const [bundleServiceShow, setBundleServiceShow] = useState(false)

   const [recentPortfolioSolution, setRecentPortfolioSolution] = useState([]);
   const [recentBundleService, setRecentBundleService] = useState([]);
   const [searchedPortfolioSolution, setSearchedPortfolioSolution] = useState([]);

   const [age, setAge] = React.useState('5');
   const [age1, setAge1] = React.useState('5');
   const [age2, setAge2] = React.useState('5');
   const [show, setShow] = React.useState(false);

   const [showPopup, setShowPopup] = useState(false)
   const [exploreSolutionPopup, setExploreSolutionPopup] = useState(false)
   const [creationSolutionPopup, setCreationSolutionPopup] = useState(false);
   const [searchPortfolioTemplate, setSearchPortfolioTemplate] = useState(false);
   const [solutionsPopup, setSolutionsPopup] = useState(false)

   const [querySearchSelectItem, setQuerySearchSelectItem] = useState([])

   const [exploreMasterData, setExploreMasterData] = useState([])
   const [exploreFilterMasterData, setExploreFilterMasterData] = useState([])
   const [selectedExploreMasterData, setSelectedExploreMasterData] = useState([])
   const [exploreFlagIs, setExploreFlagIs] = useState(false)

   // Portfolio Templates States

   const [portfolioTempMasterData, setPortfolioTempMasterData] = useState([])
   const [portfolioTempFilterMasterData, setPortfolioTempFilterMasterData] = useState([])
   const [selectedPortfolioTempMasterData, setSelectedPortfolioTempMasterData] = useState([])
   const [portfolioTempFlagIs, setPortfolioTempFlagIs] = useState(false)

   const [createdCustomPortfolio, setCreatedCustomPortfolio] = useState([]);
   const [isCustomPortfolioCreated, setIsCustomPortfolioCreated] = useState(false);

   // Solution Templates States 

   const [solutionTempMasterData, setSolutionTempMasterData] = useState([])
   const [selectedSolutionTempMasterData, setSelectedSolutionTempMasterData] = useState([])
   const [solutionTempFlagIs, setSolutionTempFlagIs] = useState(false)
   const [solutionLoadingStatus, setSolutionLoadingStatus] = useState("")
   const [solutionRadioCheck, setSolutionRadioCheck] = useState("");

   const [createdCustomItemsIdData, setCreatedCustomItemsIdData] = useState([])

   const [selectTypeOfSolution, setSelectTypeOfSolution] = useState(-1)
   const [solutionValue, setSolutionValue] = useState(3)

   const [portfolioToSolutionProgress, setPortfolioToSolutionProgress] = useState(false)
   const [selectedTemplateLabel, setSelectedTemplateLabel] = useState("");

   const [createdCustomItems, setCreatedCustomItems] = useState([])

   let history = useHistory()

   // const ItemSearchResponseFun = (data, searchData) => {
   //    if (data.length > 0) {
   //       // setExploreMasterData(data)
   //       setQuerySearchSelectItem(searchData)
   //       setPortfolioTempMasterData(data)
   //       // setShowExplore(true)
   //       // setOpenSearchSolution(false)
   //    }

   // }

   const handleTypeOfSolution = (e) => {
      setSelectTypeOfSolution(e.target.value)
      // console.log("valll ", e.target.value)
      // console.log("typeee ", typeof e.target.value)
      // if (e.target.value === "2") {
      //    setSolutionValue(2)

      // } else 

      if (e.target.value === "1") {
         setSolutionValue(1)
         setSelectedTemplateLabel("Solution Template");
         setPortfolioTempMasterData([])
         setSelectedPortfolioTempMasterData([])
         setPortfolioTempFilterMasterData([])

      } else if (e.target.value === "0") {
         setSolutionValue(0)
         setSelectedTemplateLabel("Portfolio Template");
         setSolutionTempMasterData([])
         setSelectedSolutionTempMasterData([])
         setSolutionRadioCheck("")
         setSolutionTempFlagIs(false)
      } else if (e.target.value === "2") {
         history.push('/solutionBuilder/guide')
         setSolutionValue(2)

      }
   }

   const handleTypeOfTemplateSolutionBtn = (e, btnValue) => {
      console.log("SolutionValue : ", btnValue)
      setSelectTypeOfSolution(btnValue)


      if (btnValue === 1) {
         setSolutionValue(1)
         setSelectedTemplateLabel("Solution Template");
         setPortfolioTempMasterData([])
         setSelectedPortfolioTempMasterData([])
         setPortfolioTempFilterMasterData([])

      } else {
         setSolutionValue(0)
         setSelectedTemplateLabel("Portfolio Template");
         setSolutionTempMasterData([])
         setSelectedSolutionTempMasterData([])
         setSolutionRadioCheck("")
         setSolutionTempFlagIs(false)
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
         history.push('/solutionBuilder/guide');
         // window.location.href = "/solutionBuilder/guide"
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

   const showBundleServices = () => {
      setBundleServiceShow(true)
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


   // Click on Portfolio Result Row
   const handleOnPortfolioResultRow = async (id, portName) => {

      try {
         const portfolioToCustomPortfolioCopy = await copyPortfolioICustomPortfolio(`portfolioIds=${id}`);
         if (portfolioToCustomPortfolioCopy.status != 200) {
            throw `Solution ${portName} already exits,Please select another Portfolio.`;
         } else {
            setPortfolioToSolutionProgress(true)
            let solutionPortfolioDetails = {
               portfolioId: portfolioToCustomPortfolioCopy.data.customPortfolioId,
               type: "fetch",
            };
            history.push({
               // pathname: CREATED_CUSTOM_PORTFOLIO_DETAILS,
               pathname: SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE,
               state: solutionPortfolioDetails,
            });
         }
      } catch (error) {
         toast("😐" + error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         return
      }
   }

   // Click on Solution Portfolio Result Row
   const handleOnSolutionPortfolioResultRow = (id) => {
      let solutionPortfolioDetails = {
         portfolioId: id,
         type: "fetch",
      };
      history.push({
         // pathname: SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT,
         pathname: "/solutionBuilder/create",
         state: solutionPortfolioDetails,
      });
   }

   const handleTemplateItemSaveAndContinue = async () => {

      // To do New API Call
      if (solutionValue == 1) {
         let solutionPortfolioDetails = {
            portfolioId: selectedSolutionTempMasterData[0].customPortfolioId,
            type: "fetch",
         };
         // alert()
         // console.log("selectedSolutionTempMasterData.customPortfolioId : ", selectedSolutionTempMasterData)
         history.push({
            pathname: SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT,
            // selectedTemplateItems: selectedSolutionTempMasterData,
            // solutionValueIs: solutionValue,
            state: solutionPortfolioDetails,
         });
         localStorage.setItem("selectedSolutionTemplateItems", JSON.stringify(selectedSolutionTempMasterData));
         localStorage.setItem("solutionValueIs", solutionValue);
      } else if (solutionValue == 0) {
         setPortfolioToSolutionProgress(true)
         var newCustomItemsId = [];

         console.log("select Portfolio Items : ", selectedPortfolioTempMasterData);
         var searchUrl = "portfolioIds=" + selectedPortfolioTempMasterData[0].portfolioId;
         for (let x = 1; x < selectedPortfolioTempMasterData.length; x++) {
            searchUrl = searchUrl + "&portfolioIds=" + selectedPortfolioTempMasterData[x].portfolioId
         }
         // console.log("searchUrl ------- - : ", searchUrl);
         const copyPortfolioCustomRes = await copyPortfolioICustomPortfolio(searchUrl);
         // console.log("copyPortfolioCustomRes : ", copyPortfolioCustomRes.data);
         localStorage.setItem("createdCustomPortfolioData", JSON.stringify(copyPortfolioCustomRes.data));
         // localStorage.setItem("solutionValueIs", solutionValue);
         setPortfolioToSolutionProgress(true)
         let solutionPortfolioDetails = {
            portfolioId: copyPortfolioCustomRes.data.customPortfolioId,
            type: "fetch",
         };
         history.push({
            // pathname: CREATED_CUSTOM_PORTFOLIO_DETAILS,
            pathname: SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE,
            state: solutionPortfolioDetails,
            // selectedTemplateItems: createdCustomItems,
            // solutionValueIs: solutionValue,
            // autocreatedcustomPortfolioData: CreatedcustomPortfolioData
         });

      }

      // if (solutionValue == 1) {
      //    history.push({
      //       pathname: SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT,
      //       selectedTemplateItems: selectedSolutionTempMasterData,
      //       solutionValueIs: solutionValue
      //    });
      //    localStorage.setItem("selectedSolutionTemplateItems", JSON.stringify(selectedSolutionTempMasterData));
      //    localStorage.setItem("solutionValueIs", solutionValue);
      //    // localStorage.setItem("autocreatedcustomPortfolioData", JSON.stringify(CreatedcustomPortfolioData));
      //    // alert("hello");
      // } else if (solutionValue == 0) {

      //    var newCustomItemsId = [];

      //    let reqData = {
      //       type: "MACHINE",
      //       name: `${ Date.now() } `,
      //       description: "",
      //       externalReference: "",
      //       customerSegment: "",
      //       strategyTask: "PREVENTIVE_MAINTENANCE",
      //       taskType: "PM1",
      //       usageCategory: "ROUTINE_MAINTENANCE_OR_TASK",
      //       productHierarchy: "END_PRODUCT",
      //       geographic: "ONSITE",
      //       availability: "AVAILABILITY_GREATER_95",
      //       responseTime: "PROACTIVE",
      //       type: "MACHINE",
      //       application: "HILL",
      //       contractOrSupport: "LEVEL_I",
      //       lifeStageOfMachine: "NEW_BREAKIN",
      //       supportLevel: "PREMIUM",
      //       serviceProgramDescription: "SERVICE_PROGRAM_DESCRIPTION",
      //    };

      //    const customPortfolioRes = await createCustomPortfolio(reqData);
      //    var CreatedcustomPortfolioData = customPortfolioRes.data;

      //    console.log("selecte Portfolio Items : ", selectedPortfolioTempMasterData);

      //    /* =============== loop for selected portfolio master Data ============ */

      //    for (let x = 0; x < selectedPortfolioTempMasterData.length; x++) {

      //       /* =============== loop for selected portfolio master Data Items ============ */

      //       for (let k = 0; k < selectedPortfolioTempMasterData[x].items.length; k++) {

      //          var customItemsIdData = [];
      //          var customPriceIdArr = [];
      //          // console.log("K is : " + k + " for X : " + x);
      //          // console.log("item is " + "K is : " + k + " for X : " + x + " : " + selectedPortfolioTempMasterData[x].items[k].itemBodyModel)

      //          /* =============== loop for selected portfolio master Data Items Price ============ */

      //          for (let j = 0; j < selectedPortfolioTempMasterData[x].items[k].itemBodyModel.itemPrices.length; j++) {


      //             /* =============== Search Custom Price Using selected Item PriceDataId ============== */

      //             var itemsPrice = await itemPriceDataId(selectedPortfolioTempMasterData[x].items[k].itemBodyModel.itemPrices[j].itemPriceDataId);

      //             // console.log("item price is before : ", itemsPrice)

      //             // itemsPrice['customPortfolio'] = {};
      //             // itemsPrice['customItemPriceDataId'] = 0;
      //             // delete itemsPrice['portfolio'];


      //             let itemPriceObj = {

      //                customItemPriceDataId: 0,
      //                quantity: parseInt(itemsPrice.quantity),
      //                startUsage: itemsPrice.startUsage,
      //                endUsage: itemsPrice.endUsage,
      //                standardJobId: itemsPrice.standardJobId,
      //                repairKitId: itemsPrice.repairKitId,
      //                templateDescription: itemsPrice.templateDescription,
      //                repairOption: itemsPrice.repairOption,
      //                frequency: itemsPrice.frequency,
      //                additional: itemsPrice.additional,
      //                recommendedValue: parseInt(itemsPrice.recommendedValue),
      //                partListId: itemsPrice.partListId,
      //                serviceEstimateId: itemsPrice.serviceEstimateId,
      //                numberOfEvents: parseInt(itemsPrice.numberOfEvents),
      //                priceMethod: itemsPrice.priceMethod,
      //                priceType: itemsPrice.priceType,
      //                listPrice: itemsPrice.listPrice,
      //                priceEscalation: itemsPrice.priceEscalation,
      //                calculatedPrice: itemsPrice.calculatedPrice,
      //                flatPrice: itemsPrice.flatPrice,
      //                discountType: itemsPrice.discountType,
      //                year: itemsPrice.year,
      //                noOfYear: itemsPrice.noOfYear,
      //                sparePartsPrice: itemsPrice.sparePartsPrice,
      //                sparePartsPriceBreakDownPercentage: itemsPrice.sparePartsPriceBreakDownPercentage,
      //                servicePrice: itemsPrice.servicePrice,
      //                labourPrice: itemsPrice.labourPrice,
      //                labourPriceBreakDownPercentage: itemsPrice.labourPriceBreakDownPercentage,
      //                miscPrice: itemsPrice.miscPrice,
      //                miscPriceBreakDownPercentage: itemsPrice.miscPriceBreakDownPercentage,
      //                totalPrice: itemsPrice.totalPrice,
      //                netService: itemsPrice.netService,
      //                customPortfolio: {
      //                   portfolioId: CreatedcustomPortfolioData.customPortfolioId
      //                },
      //                tenantId: itemsPrice.tenantId,
      //                partsRequired: itemsPrice.partsRequired,
      //                labourRequired: itemsPrice.labourRequired,
      //                serviceRequired: itemsPrice.serviceRequired,
      //                miscRequired: itemsPrice.miscRequired
      //             }

      //             customItemsIdData.push(itemPriceObj)
      //             // console.log("item price is after  : ", itemsPrice)
      //          }

      //          /* =============== loop for create custom Price with selected portfolio master Data Items Price ============ */

      //          for (let p = 0; p < customItemsIdData.length; p++) {
      //             var customPriceDataCreate = await customPriceCreation(customItemsIdData[p])

      //             // console.log("customPriceDataCreate REponse is ", customPriceDataCreate);

      //             customPriceIdArr.push({
      //                customItemPriceDataId: parseInt(customPriceDataCreate.data.customItemPriceDataId),
      //             })
      //             // var customPriceIdData = customPriceDataCreate.data.map(item => {
      //             // return {
      //             //    customItemPriceDataId: parseInt(item.itemPriceDataId),
      //             // };
      //          }

      //          let customItemObj = {
      //             customItemId: 0,
      //             itemName: selectedPortfolioTempMasterData[x].items[k].itemName,
      //             customItemHeaderModel: {
      //                customItemHeaderId: 0,
      //                itemHeaderDescription: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.itemHeaderDescription,
      //                bundleFlag: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.bundleFlag,
      //                portfolioItemId: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.portfolioItemId,
      //                reference: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.reference,
      //                itemHeaderMake: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.itemHeaderMake,
      //                itemHeaderFamily: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.itemHeaderFamily,
      //                model: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.model,
      //                prefix: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.prefix,
      //                type: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.type,
      //                additional: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.additional,
      //                currency: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.currency,
      //                netPrice: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.netPrice,
      //                itemProductHierarchy: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.itemProductHierarchy,
      //                itemHeaderGeographic: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.itemHeaderGeographic,
      //                responseTime: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.responseTime,
      //                usage: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.usage,
      //                validFrom: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.validFrom,
      //                validTo: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.validTo,
      //                estimatedTime: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.estimatedTime,
      //                servicePrice: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.servicePrice,
      //                status: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.status,
      //                componentCode: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.componentCode,
      //                componentDescription: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.componentDescription,
      //                serialNumber: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.serialNumber,
      //                itemHeaderStrategy: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.itemHeaderStrategy,
      //                variant: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.variant,
      //                itemHeaderCustomerSegment: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.itemHeaderCustomerSegment,
      //                jobCode: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.jobCode,
      //                preparedBy: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.preparedBy,
      //                approvedBy: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.approvedBy,
      //                preparedOn: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.preparedOn,
      //                revisedBy: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.revisedBy,
      //                revisedOn: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.revisedOn,
      //                salesOffice: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.salesOffice,
      //                offerValidity: selectedPortfolioTempMasterData[x].items[k].itemHeaderModel.offerValidity
      //             },
      //             customItemBodyModel: {
      //                customItemBodyId: 0,
      //                itemBodyDescription: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.itemBodyDescription,
      //                spareParts: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.spareParts,
      //                labours: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.labours,
      //                miscellaneous: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.miscellaneous,
      //                taskType: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.taskType,
      //                solutionCode: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.solutionCode,
      //                usageIn: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.usageIn,
      //                usage: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.usage,
      //                year: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.year,
      //                avgUsage: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.avgUsage,
      //                unit: selectedPortfolioTempMasterData[x].items[k].itemBodyModel.unit,
      //                // customItemPrices: selectedPortfolioTempMasterData[k].itemBodyModel.itemPrices,
      //                customItemPrices: customPriceIdArr,
      //             }
      //          }

      //          /* ========= create custom Items with selected portfoliomasterData Items ========= */

      //          const itemRes = await customItemCreation(customItemObj)

      //          console.log(" Response is : ", itemRes.data)

      //          createdCustomItems.push(itemRes.data)

      //          // console.log("create custom Item response data for index " + selectedPortfolioTempMasterData[k].itemHeaderModel.itemHeaderId + "  " + itemRes);
      //       }

      //    }


      //    const updateCreatedCutomPortfolo = {
      //       customPortfolioId: CreatedcustomPortfolioData.customPortfolioId,
      //       name: CreatedcustomPortfolioData.name,
      //       description: CreatedcustomPortfolioData.description,
      //       machineType: null,
      //       searchTerm: null,
      //       lubricant: false,
      //       customerId: 0,
      //       customerGroup: null,
      //       customerSegment: "",
      //       externalReference: "",
      //       status: null,
      //       validFrom: null,
      //       validTo: null,
      //       strategyTask: "PREVENTIVE_MAINTENANCE",
      //       taskType: "PM1",
      //       usageCategory: "ROUTINE_MAINTENANCE_OR_TASK",
      //       productHierarchy: "END_PRODUCT",
      //       geographic: "ONSITE",
      //       availability: "AVAILABILITY_GREATER_95",
      //       responseTime: "PROACTIVE",
      //       type: "MACHINE",
      //       application: "HILL",
      //       contractOrSupport: "LEVEL_I",
      //       lifeStageOfMachine: "NEW_BREAKIN",
      //       supportLevel: "PREMIUM",
      //       numberOfEvents: 0.0,
      //       itemRelations: null,
      //       rating: null,
      //       startUsage: null,
      //       endUsage: null,
      //       unit: null,
      //       additionals: null,
      //       preparedBy: null,
      //       approvedBy: null,
      //       preparedOn: null,
      //       revisedBy: null,
      //       revisedOn: null,
      //       salesOffice: null,
      //       offerValidity: null,
      //       customItems: [],
      //       customCoverages: [],
      //       portfolioPrice: null,
      //       additionalPrice: null,
      //       escalationPrice: null,
      //       saveState: false,
      //       userId: null,
      //       createdAt: "2022-11-08T05:48:54.826606",
      //       template: false,
      //       visibleInCommerce: false
      //    };



      //    const updatePortfolioRes = await updateCustomPortfolio(
      //       CreatedcustomPortfolioData.customPortfolioId,
      //       updateCreatedCutomPortfolo
      //    );

      //    console.log("createdCustomItems ", createdCustomItems);

      //    if (updatePortfolioRes.status == 200) {
      //       console.log("solutionValueIs : ", solutionValue);
      //       localStorage.setItem("selectedTemplateItems", JSON.stringify(createdCustomItems));
      //       localStorage.setItem("solutionValueIs", solutionValue);
      //       localStorage.setItem("autocreatedcustomPortfolioData", JSON.stringify(CreatedcustomPortfolioData));
      //       history.push({
      //          pathname: SOLUTION_BUILDER_PORRTFOLIO_TEMP,
      //          // selectedTemplateItems: createdCustomItems,
      //          // solutionValueIs: solutionValue,
      //          // autocreatedcustomPortfolioData: CreatedcustomPortfolioData
      //       });
      //       // console.log("Created");
      //    }

      //    // console.log("createdCustomItems is :", createdCustomItems);
      //    // let reqData = {
      //    //    type: "MACHINE",
      //    //    name: `${ Date.now() } `,
      //    //    description: "",
      //    //    externalReference: "",
      //    //    customerSegment: "",
      //    //    strategyTask: "PREVENTIVE_MAINTENANCE",
      //    //    taskType: "PM1",
      //    //    usageCategory: "ROUTINE_MAINTENANCE_OR_TASK",
      //    //    productHierarchy: "END_PRODUCT",
      //    //    geographic: "ONSITE",
      //    //    availability: "AVAILABILITY_GREATER_95",
      //    //    responseTime: "PROACTIVE",
      //    //    type: "MACHINE",
      //    //    application: "HILL",
      //    //    contractOrSupport: "LEVEL_I",
      //    //    lifeStageOfMachine: "NEW_BREAKIN",
      //    //    supportLevel: "PREMIUM",
      //    //    serviceProgramDescription: "SERVICE_PROGRAM_DESCRIPTION",
      //    // };

      //    // const customPortfolioRes = await createCustomPortfolio(reqData);
      //    // var CreatedcustomPortfolioData = customPortfolioRes.data;

      //    // console.log("customPortfolioRes customItems : ", CreatedcustomPortfolioData.customItems)

      //    // for (let k = 0; k < selectedPortfolioTempMasterData.length; k++) {

      //    //    var customItemsIdData = [];
      //    //    var customPriceIdArr = [];
      //    //    console.log("Hello " + k);
      //    //    for (let j = 0; j < selectedPortfolioTempMasterData[k].itemBodyModel.itemPrices.length; j++) {

      //    //       /* =============== Search Custom Price Using selected Item PriceDataId ============== */

      //    //       var itemsPrice = await itemPriceDataId(selectedPortfolioTempMasterData[k].itemBodyModel.itemPrices[j].itemPriceDataId);
      //    //       // console.log("item price is before : ", itemsPrice)

      //    //       delete itemsPrice['itemPriceDataId'];

      //    //       itemsPrice['customPortfolio'] = {};
      //    //       itemsPrice['customItemPriceDataId'] = 0;
      //    //       delete itemsPrice['portfolio'];


      //    //       let itemPriceObj = {

      //    //          customItemPriceDataId: 0,
      //    //          quantity: parseInt(itemsPrice.quantity),
      //    //          startUsage: itemsPrice.startUsage,
      //    //          endUsage: itemsPrice.endUsage,
      //    //          standardJobId: itemsPrice.standardJobId,
      //    //          repairKitId: itemsPrice.repairKitId,
      //    //          templateDescription: itemsPrice.templateDescription,
      //    //          repairOption: itemsPrice.repairOption,
      //    //          frequency: itemsPrice.frequency,
      //    //          additional: itemsPrice.additional,
      //    //          recommendedValue: parseInt(itemsPrice.recommendedValue),
      //    //          partListId: itemsPrice.partListId,
      //    //          serviceEstimateId: itemsPrice.serviceEstimateId,
      //    //          numberOfEvents: parseInt(itemsPrice.numberOfEvents),
      //    //          priceMethod: itemsPrice.priceMethod,
      //    //          priceType: itemsPrice.priceType,
      //    //          listPrice: itemsPrice.listPrice,
      //    //          priceEscalation: itemsPrice.priceEscalation,
      //    //          calculatedPrice: itemsPrice.calculatedPrice,
      //    //          flatPrice: itemsPrice.flatPrice,
      //    //          discountType: itemsPrice.discountType,
      //    //          year: itemsPrice.year,
      //    //          noOfYear: itemsPrice.noOfYear,
      //    //          sparePartsPrice: itemsPrice.sparePartsPrice,
      //    //          sparePartsPriceBreakDownPercentage: itemsPrice.sparePartsPriceBreakDownPercentage,
      //    //          servicePrice: itemsPrice.servicePrice,
      //    //          labourPrice: itemsPrice.labourPrice,
      //    //          labourPriceBreakDownPercentage: itemsPrice.labourPriceBreakDownPercentage,
      //    //          miscPrice: itemsPrice.miscPrice,
      //    //          miscPriceBreakDownPercentage: itemsPrice.miscPriceBreakDownPercentage,
      //    //          totalPrice: itemsPrice.totalPrice,
      //    //          netService: itemsPrice.netService,
      //    //          customPortfolio: {
      //    //             portfolioId: 26
      //    //          },
      //    //          tenantId: itemsPrice.tenantId,
      //    //          partsRequired: itemsPrice.partsRequired,
      //    //          labourRequired: itemsPrice.labourRequired,
      //    //          serviceRequired: itemsPrice.serviceRequired,
      //    //          miscRequired: itemsPrice.miscRequired
      //    //       }

      //    //       customItemsIdData.push(itemPriceObj)
      //    //       // console.log("item price is after  : ", itemsPrice)

      //    //       // console.log("My values are : ", selectedPortfolioTempMasterData[k].itemBodyModel.itemPrices[j].itemPriceDataId)

      //    //    }
      //    //    for (let p = 0; p < customItemsIdData.length; p++) {
      //    //       var customPriceDataCreate = await customPriceCreation(customItemsIdData[p])
      //    //       console.log("customPriceDataCreate REponse is ", customPriceDataCreate);

      //    //       customPriceIdArr.push({
      //    //          customItemPriceDataId: parseInt(customPriceDataCreate.data.customItemPriceDataId),
      //    //       })
      //    //       // var customPriceIdData = customPriceDataCreate.data.map(item => {
      //    //       // return {
      //    //       //    customItemPriceDataId: parseInt(item.itemPriceDataId),
      //    //       // };
      //    //    }


      //    //    console.log("customPriceIdArr : ", customPriceIdArr)

      //    //    let customItemObj = {
      //    //       customItemId: 0,
      //    //       itemName: selectedPortfolioTempMasterData[k].itemName,
      //    //       customItemHeaderModel: {
      //    //          // customItemHeaderId: selectedPortfolioTempMasterData[k].itemHeaderModel.itemHeaderId,
      //    //          customItemHeaderId: 0,
      //    //          itemHeaderDescription: selectedPortfolioTempMasterData[k].itemHeaderModel.itemHeaderDescription,
      //    //          bundleFlag: selectedPortfolioTempMasterData[k].itemHeaderModel.bundleFlag,
      //    //          portfolioItemId: selectedPortfolioTempMasterData[k].itemHeaderModel.portfolioItemId,
      //    //          reference: selectedPortfolioTempMasterData[k].itemHeaderModel.reference,
      //    //          itemHeaderMake: selectedPortfolioTempMasterData[k].itemHeaderModel.itemHeaderMake,
      //    //          itemHeaderFamily: selectedPortfolioTempMasterData[k].itemHeaderModel.itemHeaderFamily,
      //    //          model: selectedPortfolioTempMasterData[k].itemHeaderModel.model,
      //    //          prefix: selectedPortfolioTempMasterData[k].itemHeaderModel.prefix,
      //    //          type: selectedPortfolioTempMasterData[k].itemHeaderModel.type,
      //    //          additional: selectedPortfolioTempMasterData[k].itemHeaderModel.additional,
      //    //          currency: selectedPortfolioTempMasterData[k].itemHeaderModel.currency,
      //    //          netPrice: selectedPortfolioTempMasterData[k].itemHeaderModel.netPrice,
      //    //          itemProductHierarchy: selectedPortfolioTempMasterData[k].itemHeaderModel.itemProductHierarchy,
      //    //          itemHeaderGeographic: selectedPortfolioTempMasterData[k].itemHeaderModel.itemHeaderGeographic,
      //    //          responseTime: selectedPortfolioTempMasterData[k].itemHeaderModel.responseTime,
      //    //          usage: selectedPortfolioTempMasterData[k].itemHeaderModel.usage,
      //    //          validFrom: selectedPortfolioTempMasterData[k].itemHeaderModel.validFrom,
      //    //          validTo: selectedPortfolioTempMasterData[k].itemHeaderModel.validTo,
      //    //          estimatedTime: selectedPortfolioTempMasterData[k].itemHeaderModel.estimatedTime,
      //    //          servicePrice: selectedPortfolioTempMasterData[k].itemHeaderModel.servicePrice,
      //    //          status: selectedPortfolioTempMasterData[k].itemHeaderModel.status,
      //    //          componentCode: selectedPortfolioTempMasterData[k].itemHeaderModel.componentCode,
      //    //          componentDescription: selectedPortfolioTempMasterData[k].itemHeaderModel.componentDescription,
      //    //          serialNumber: selectedPortfolioTempMasterData[k].itemHeaderModel.serialNumber,
      //    //          itemHeaderStrategy: selectedPortfolioTempMasterData[k].itemHeaderModel.itemHeaderStrategy,
      //    //          variant: selectedPortfolioTempMasterData[k].itemHeaderModel.variant,
      //    //          itemHeaderCustomerSegment: selectedPortfolioTempMasterData[k].itemHeaderModel.itemHeaderCustomerSegment,
      //    //          jobCode: selectedPortfolioTempMasterData[k].itemHeaderModel.jobCode,
      //    //          preparedBy: selectedPortfolioTempMasterData[k].itemHeaderModel.preparedBy,
      //    //          approvedBy: selectedPortfolioTempMasterData[k].itemHeaderModel.approvedBy,
      //    //          preparedOn: selectedPortfolioTempMasterData[k].itemHeaderModel.preparedOn,
      //    //          revisedBy: selectedPortfolioTempMasterData[k].itemHeaderModel.revisedBy,
      //    //          revisedOn: selectedPortfolioTempMasterData[k].itemHeaderModel.revisedOn,
      //    //          salesOffice: selectedPortfolioTempMasterData[k].itemHeaderModel.salesOffice,
      //    //          offerValidity: selectedPortfolioTempMasterData[k].itemHeaderModel.offerValidity
      //    //       },
      //    //       customItemBodyModel: {
      //    //          customItemBodyId: 0,
      //    //          itemBodyDescription: selectedPortfolioTempMasterData[k].itemBodyModel.itemBodyDescription,
      //    //          spareParts: selectedPortfolioTempMasterData[k].itemBodyModel.spareParts,
      //    //          labours: selectedPortfolioTempMasterData[k].itemBodyModel.labours,
      //    //          miscellaneous: selectedPortfolioTempMasterData[k].itemBodyModel.miscellaneous,
      //    //          taskType: selectedPortfolioTempMasterData[k].itemBodyModel.taskType,
      //    //          solutionCode: selectedPortfolioTempMasterData[k].itemBodyModel.solutionCode,
      //    //          usageIn: selectedPortfolioTempMasterData[k].itemBodyModel.usageIn,
      //    //          usage: selectedPortfolioTempMasterData[k].itemBodyModel.usage,
      //    //          year: selectedPortfolioTempMasterData[k].itemBodyModel.year,
      //    //          avgUsage: selectedPortfolioTempMasterData[k].itemBodyModel.avgUsage,
      //    //          unit: selectedPortfolioTempMasterData[k].itemBodyModel.unit,
      //    //          // customItemPrices: selectedPortfolioTempMasterData[k].itemBodyModel.itemPrices,
      //    //          customItemPrices: customPriceIdArr,
      //    //       }
      //    //    }



      //    //    const itemRes = await customItemCreation(customItemObj)

      //    //    console.log(" Response is : ", itemRes.data)

      //    //    createdCustomItems.push(itemRes.data)

      //    //    // console.log("create custom Item response data for index " + selectedPortfolioTempMasterData[k].itemHeaderModel.itemHeaderId + "  " + itemRes);
      //    // }
      //    // console.log("createdCustomItems 9871 : ", createdCustomItems)
      //    // const customItemsId = createdCustomItems.map((data, i) => {
      //    //    CreatedcustomPortfolioData.customItems.push({ "customItemId": parseInt(data.customItemId) })

      //    // })


      //    // console.log("CreatedcustomPortfolioData Final : ", CreatedcustomPortfolioData);

      //    // const updatePortfolioRes = await updateCustomPortfolio(
      //    //    CreatedcustomPortfolioData.customPortfolioId,
      //    //    CreatedcustomPortfolioData
      //    // );

      //    // if (updatePortfolioRes.status == 200) {
      //    //    history.push({
      //    //       pathname: SOLUTION_BUILDER_PORRTFOLIO_TEMP,
      //    //       selectedTemplateItems: createdCustomItems,
      //    //       solutionValueIs: solutionValue,
      //    //       autocreatedcustomPortfolioData: CreatedcustomPortfolioData
      //    //    });
      //    // }


      // }

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
      let obj = tempArray[id];
      var SearchResArr = [];
      solutionPortfolioSearch(`${tempArray[id].selectFamily.value} ~${e.target.value} `)
         .then((res) => {
            if (tempArray[id].selectFamily.value === "make") {
               for (let i = 0; i < res.data.length; i++) {
                  for (let j = 0; j < res.data[i].customCoverages.length; j++) {
                     SearchResArr.push(res.data[i].customCoverages[j].make)
                  }
               }

            } else if (tempArray[id].selectFamily.value == "family") {
               for (let i = 0; i < res.data.length; i++) {
                  for (let j = 0; j < res.data[i].customCoverages.length; j++) {
                     SearchResArr.push(res.data[i].customCoverages[j].family)
                  }
               }
            } else if (tempArray[id].selectFamily.value == "modelNo") {
               for (let i = 0; i < res.data.length; i++) {
                  for (let j = 0; j < res.data[i].customCoverages.length; j++) {
                     SearchResArr.push(res.data[i].customCoverages[j].modelNo)
                  }
               }
            } else if (tempArray[id].selectFamily.value == "serialNumberPrefix") {
               for (let i = 0; i < res.data.length; i++) {
                  for (let j = 0; j < res.data[i].customCoverages.length; j++) {
                     SearchResArr.push(res.data[i].customCoverages[j].serialNumberPrefix)
                  }
               }
            } else if (tempArray[id].selectFamily.value == "name") {
               for (let i = 0; i < res.data.length; i++) {
                  SearchResArr.push(res.data[i].name)
               }
            } else if (tempArray[id].selectFamily.value == "description") {
               for (let i = 0; i < res.data.length; i++) {
                  SearchResArr.push(res.data[i].description)
               }
            }
            obj.selectOptions = SearchResArr;
            tempArray[id] = obj;
            setQuerySearchSelector([...tempArray]);
            $(`.scrollbar - ${id} `).css("display", "block");
            console.log("search Query Result :", res)

         }).catch((err) => {
            console.log("error in getSearchQueryCoverage", err)
         })

      // getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value).then((res) => {
      //    obj.selectOptions = res
      //    tempArray[id] = obj
      //    setQuerySearchSelector([...tempArray]);
      //    $(`.scrollbar - ${ id } `).css("display", "block")
      // }).catch((err) => {
      //    console.log("err in api call", err)
      // })
      // setQuerySearchSelector([...tempArray]);
      // obj.inputSearch = e.target.value
      obj.inputSearch = e.target.value;
      setQuerySearchSelector([...tempArray]);

   }
   const handleQuerySearchClick = () => {
      try {

         $(".scrollbar").css("display", "none")

         console.log("handleQuerySearchClick", querySearchSelector)

         if (
            querySearchSelector[0]?.selectFamily?.value == "" ||
            querySearchSelector[0]?.inputSearch == "" ||
            querySearchSelector[0]?.selectFamily?.value === undefined
         ) {
            throw "Please fill data properly"
         }

         var searchStr = querySearchSelector[0].selectFamily.value + ":" + querySearchSelector[0].inputSearch

         for (let i = 1; i < querySearchSelector.length; i++) {
            searchStr = searchStr + " " + querySearchSelector[i].selectOperator.value + " " + querySearchSelector[i].selectFamily.value + ":" + querySearchSelector[i].inputSearch
         }

         console.log("searchStr", searchStr)
         solutionPortfolioSearch(searchStr)
            .then((res) => {
               if (res.status === 200) {
                  setSearchedPortfolioSolution(res.data)
               } else {
                  throw "No information is found for your search, change the search criteria";
               }
            }).catch((err) => {
               console.log("error in getSearchQueryCoverage", err)
               toast("😐" + err, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               });
               return
            })
      } catch (error) {
         console.log("error in getSearchQueryCoverage", error);
         toast("😐" + error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         return
      }

   }
   const addSearchQuerryHtml = () => {
      if (count !== 2) {
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
   }
   const handleFamily = (e, id) => {
      let tempArray = [...querySearchSelector]
      console.log("handleFamily e:", e)
      let obj = tempArray[id]
      obj.selectFamily = e
      obj.inputSearch = ""
      obj.selectOptions = []
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
      $(`.scrollbar - ${id} `).css("display", "none")
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


   const handleCheckboxData = (e, row) => {
      if (e.target.checked) {
         var _searchedExploreData = [...exploreMasterData];

         const updated = _searchedExploreData.map((currentItem, i) => {
            if (row.itemId == currentItem.itemId) {
               return { ...currentItem, ["check1"]: e.target.checked };
            } else return currentItem;
         });

         setExploreMasterData([...updated]);

         const isFound = exploreFilterMasterData.some((element) => {
            if (element.itemId === row.itemId) {
               return true;
            }

            return false;
         });

         if (!isFound) {
            const _exploreFilterMasterData = [...exploreFilterMasterData, { ...row }];
            const updatedItems = _exploreFilterMasterData.map((currentItem, i) => {
               return {
                  ...currentItem
               };
            });
            setExploreFilterMasterData(updatedItems);
            // setFilterMasterData([...filterMasterData, { ...row }])
         }
      } else {
         var _exploreMasterData = [...exploreMasterData];
         const updated1 = _exploreMasterData.map((currentItem, i) => {
            if (row.itemId == currentItem.itemId) {
               return { ...currentItem, ["check1"]: e.target.checked };
            } else return currentItem;
         });
         setExploreMasterData([...updated1]);
         var _exploreFilterMasterData = [...exploreFilterMasterData];
         const updated = _exploreFilterMasterData.filter((currentItem, i) => {
            if (row.itemId !== currentItem.itemId) return currentItem;
         });
         setExploreFilterMasterData(updated);
      }
   };

   const handlePortfolioRowCheckboxData = (e, row) => {
      console.log("row is : ", row)
      // console.log("event is  : ", e)
      if (e.target.checked) {
         var _searchedPortfolioTempData = [...portfolioTempMasterData];

         const updated = _searchedPortfolioTempData.map((currentItem, i) => {
            if (row.portfolioId == currentItem.portfolioId) {
               return { ...currentItem, ["check1"]: e.target.checked };
            } else return currentItem;
         });

         // console.log("Updated data is : ", updated)

         setPortfolioTempMasterData([...updated]);

         const isFound = portfolioTempFilterMasterData.some((element) => {
            if (element.portfolioId === row.portfolioId) {
               return true;
            }

            return false;
         });

         if (!isFound) {
            const _portfolioTempFilterMasterData = [...portfolioTempFilterMasterData, { ...row }];
            const updatedItems = _portfolioTempFilterMasterData.map((currentItem, i) => {
               return {
                  ...currentItem
               };
            });
            setPortfolioTempFilterMasterData(updatedItems);
            // setFilterMasterData([...filterMasterData, { ...row }])
         }
         console.log("Portfolio Template Filter master data : ", portfolioTempFilterMasterData);
      } else {
         var _portfolioTempMasterData = [...portfolioTempMasterData];
         const updated1 = _portfolioTempMasterData.map((currentItem, i) => {
            if (row.portfolioId == currentItem.portfolioId) {
               return { ...currentItem, ["check1"]: e.target.checked };
            } else return currentItem;
         });
         setPortfolioTempMasterData([...updated1]);
         var _portfolioTempFilterMasterData = [...portfolioTempFilterMasterData];
         const updated = _portfolioTempFilterMasterData.filter((currentItem, i) => {
            if (row.portfolioId !== currentItem.portfolioId) return currentItem;
         });
         setPortfolioTempFilterMasterData(updated);
      }
   };

   const handlePortfolioTempCheckboxData = (e, row) => {
      console.log("row is : ", row)
      // console.log("event is  : ", e)
      if (e.target.checked) {
         var _searchedPortfolioTempData = [...portfolioTempMasterData];

         const updated = _searchedPortfolioTempData.map((currentItem, i) => {
            if (row.itemId == currentItem.itemId) {
               return { ...currentItem, ["check1"]: e.target.checked };
            } else return currentItem;
         });

         // console.log("Updated data is : ", updated)

         setPortfolioTempMasterData([...updated]);

         const isFound = portfolioTempFilterMasterData.some((element) => {
            if (element.itemId === row.itemId) {
               return true;
            }

            return false;
         });

         if (!isFound) {
            const _portfolioTempFilterMasterData = [...portfolioTempFilterMasterData, { ...row }];
            const updatedItems = _portfolioTempFilterMasterData.map((currentItem, i) => {
               return {
                  ...currentItem
               };
            });
            setPortfolioTempFilterMasterData(updatedItems);
            // setFilterMasterData([...filterMasterData, { ...row }])
         }
         console.log("Portfolio Template Filter master data : ", portfolioTempFilterMasterData);
      } else {
         var _portfolioTempMasterData = [...portfolioTempMasterData];
         const updated1 = _portfolioTempMasterData.map((currentItem, i) => {
            if (row.itemId == currentItem.itemId) {
               return { ...currentItem, ["check1"]: e.target.checked };
            } else return currentItem;
         });
         setPortfolioTempMasterData([...updated1]);
         var _portfolioTempFilterMasterData = [...portfolioTempFilterMasterData];
         const updated = _portfolioTempFilterMasterData.filter((currentItem, i) => {
            if (row.itemId !== currentItem.itemId) return currentItem;
         });
         setPortfolioTempFilterMasterData(updated);
      }
   };

   const handleSolutinTemoRadioData = (e, row) => {
      if (e.target.checked) {
         console.log("Checked value is : ")
         setSolutionRadioCheck(row.customPortfolioId)
         setSelectedSolutionTempMasterData([row])
         setSolutionTempFlagIs(true)
         console.log("Solution Temp Flag is :=> ", solutionTempFlagIs)

      }
   }

   const handleCoverageCheckboxData = (e, row) => {
      if (e.target.checked) {
         var _searchedData = [...masterData];

         const updated = _searchedData.map((currentItem, i) => {
            if (row.id == currentItem.id) {
               return { ...currentItem, ["check1"]: e.target.checked };
            } else return currentItem;
         });

         setMasterData([...updated]);

         const isFound = filterMasterData.some((element) => {
            if (element.id === row.id) {
               return true;
            }

            return false;
         });

         if (!isFound) {
            const _filterMasterData = [...filterMasterData, { ...row }];
            const updatedItems = _filterMasterData.map((currentItem, i) => {
               return {
                  ...currentItem,
                  items: [
                     {
                        family: currentItem.family,
                        model: currentItem.model,
                        noSeriese: "0JAPA000470",
                        location: "LIMA",
                        startDate: "08/04/20017",
                        endDate: "08/04/20017",
                     },
                  ],
               };
            });
            setFilterMasterData(updatedItems);
            // setFilterMasterData([...filterMasterData, { ...row }])
         }
      } else {
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
   };

   const handlePortfolioListCheckBoxData = () => {

      // setSelectedPortfolioTempMasterData(portfolioTempFilterMasterData);
      //    setPortfolioTempMasterData([]);
      var _selectedCoverageData = [...portfolioTempFilterMasterData];
      // console.log("_selectedBundleServiceItemData : ", _selectedBundleServiceItemData);

      let cloneArr = []
      portfolioTempFilterMasterData.map((data, i) => {
         console.log("data: ", data)
         const exist = selectedPortfolioTempMasterData.some(item => item.portfolioId === data.portfolioId)
         console.log("exist: ", exist)
         if (!exist) {
            cloneArr.push(data)
            // setSelectedMasterData([...selectedMasterData, data])
         }
      })
      setSelectedPortfolioTempMasterData([...selectedPortfolioTempMasterData, ...cloneArr])
      setPortfolioTempMasterData([])
   }

   const handleCreationSolutionPopUp = () => {
      setCreationSolutionPopup(true);
      setShowPopup(false);
   }
   const handleSearchPortfolioTemplate = () => {
      setSearchPortfolioTemplate(true);
      setCreationSolutionPopup(false);
      setShowPopup(false);
   }

   const PopupModelBoxShow = () => {
      setShowPopup(true)
      setSolutionValue(3)
   }
   const PopupExoploreSolutionShow = () => {
      setExploreSolutionPopup(true);
      setSearchPortfolioTemplate(false);
      setCreationSolutionPopup(false);
      setShowPopup(false);
   }
   const continueClickNextStep = () => {
      // alert("Hello")
      // setSolutionsPopup(true)
      setOpenTemplatesSearchModelBox(true)
      setShowPopup(false)

   }

   const handleShowSearch = () => {
      // if (solutionValue == 2) {
      //    history.push('/solutionBuilder/guide');
      // } else 
      if (solutionValue == 1) {
         setOpenTemplatesSearchModelBox(true)
         setSolutionsPopup(false)
         // console.log("this is Solution Portfolio Solution")
      } else {
         // alert("Portfolio ?")
         // history.push('/portfolio/new');
         setOpenTemplatesSearchModelBox(true)
         setSolutionsPopup(false)
      }
   }
   useEffect(() => {
      if (masterData.some((masterDataitem) => masterDataitem.check1 === true)) {
         setFlagIs(true);
      } else {
         setFlagIs(false);
      }
      var distroAbleOrNot = localStorage.getItem('distroyAble');
      if (distroAbleOrNot) {
         localStorage.removeItem("selectedTemplateItems");
         localStorage.removeItem("solutionValueIs");
         localStorage.removeItem("autocreatedcustomPortfolioData");
         localStorage.removeItem("selectedSolutionTemplateItems");
         localStorage.removeItem("createdCustomPortfolioData");
         localStorage.removeItem("distroyAble");
      }
   }, [masterData]);

   useEffect(() => {
      if (exploreMasterData.some((exploremasterDataitem) => exploremasterDataitem.check1 === true)) {
         setExploreFlagIs(true);
      } else {
         setExploreFlagIs(false);
      }
   }, [exploreMasterData]);

   useEffect(() => {
      if (portfolioTempMasterData.some((portfolioTempmasterDataitem) => portfolioTempmasterDataitem.check1 === true)) {
         setPortfolioTempFlagIs(true);
      } else {
         setPortfolioTempFlagIs(false);
      }
   }, [portfolioTempMasterData]);

   useEffect(() => {

      setHeaderLoading(true)
      getSearchForRecentSolutionPortfolio()
         .then((res) => {
            if (res.status === 200) {
               setRecentPortfolioSolution(res.data);
            } else {
               setRecentPortfolioSolution(res.data);
            }
         })
      setHeaderLoading(false)


      if (JSON.parse(localStorage.getItem('exitingType'))) {
         localStorage.removeItem('exitingType');
      }

   }, []);

   const handleLandingPageQuerySearchClick = async () => {
      try {
         console.log("hello")
         // if (selectedItemType == "" ||
         //    querySearchSelector[0]?.selectFamily?.value == "" ||
         //    querySearchSelector[0]?.inputSearch == "" ||
         //    querySearchSelector[0]?.selectFamily?.value === undefined) {
         //    throw "Please fill data properly"
         // }
         // var searchStr = `${ querySearchSelector[0]?.selectFamily?.value } ~${ querySearchSelector[0]?.inputSearch } `;
         // console.log("searchStr : ", searchStr);
         // if (selectedItemType === "PORTFOLIO") {
         //    var newArr = [];
         //    const res2 = await portfolioSearch(searchStr)
         //    for (var j = 0; j < res2.length; j++) {
         //       for (var k = 0; k < res2[j].items.length; k++) {
         //          newArr.push(res2[j].items[k]);
         //       }
         //    }

         //    var result = newArr.reduce((unique, o) => {
         //       if (!unique.some(obj => obj.itemId === o.itemId)) {
         //          unique.push(o);
         //       }
         //       return unique;
         //    }, []);
         //    setPortfolioItemData(result);

         //    console.log("setPortfolioItemData : ", portfolioItemData)
         // } else {
         //    const res1 = await itemSearch(searchStr);
         //    // console.log(res1)
         //    setBundleServiceItemData(res1)
         // }

      } catch (error) {
         toast("😐" + error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         return
      }
   }

   // Create New Custom Portfolio
   const handleCreateNewPortfolio = () => {
      let portfolioDetails = {
         portfolioId: "",
         type: "new",
      };
      // history.push("/portfolio/new")
      history.push({
         pathname: "/solutionBuilder/create",
         state: portfolioDetails,
      });
   }

   // Portfolio EditAble
   const makePortfolioEditableEditable = (portfolioData) => {
      // console.log("----------", PortfolioData);
      let portfolioDetails = {
         portfolioId: portfolioData.customPortfolioId,
         type: "fetch",
      };
      history.push({
         pathname: "/solutionBuilder/create",
         state: portfolioDetails,
      });
   }

   // useEffect(() => {

   //    console.log("selected Solution Temp Master Data is Before : ", selectedSolutionTempMasterData)
   //    console.log("selected Solution Temp Master Data is After : ", selectedSolutionTempMasterData)

   // },[selectedSolutionTempMasterData])

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
      //   `${ params.getValue(params.id, 'firstName') || '' } ${
      //       params.getValue(params.id, 'DocumentType') || ''
      //     }`,

   ];

   const exploreMasterColumn = [
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
               checked={row.check1}
               onChange={(e) => handleCheckboxData(e, row)}
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

   const SelectedExploreMasterDataColumn = [
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

   const masterColumns = [
      {
         name: (
            <>
               <div>Select</div>
            </>
         ),
         selector: (row) => row.check1,
         wrap: true,
         sortable: true,
         maxWidth: "300px",
         cell: (row) => (
            <Checkbox
               className="text-black"
               checked={row.check1}
               onChange={(e) => handleCoverageCheckboxData(e, row)}
            />
         ),
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
      // {
      //   name: (
      //     <>
      //       <div>
      //         Serial No
      //       </div>
      //     </>
      //   ),
      //   selector: (row) => row.bundleId,
      //   sortable: true,
      //   maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      //   // cell: row => row.bundleId,
      //   // cell: (row) => <button onClick={() => alert()}>1</button>,
      //   // cell: (row) => <Checkbox className="text-black" {...label} />,
      //   format: (row) => row.bundleId,
      // },
      // {
      //   name: (
      //     <>
      //       <div>
      //         <img className="mr-2" src={boxicon}></img>Start Serial No
      //       </div>

      //     </>
      //   ),
      //   selector: (row) => row.bundleDescription,
      //   wrap: true,
      //   sortable: true,
      //   format: (row) => row.bundleDescription,
      // },
      // {
      //   name: (
      //     <>
      //       <div>End Serial No</div>
      //     </>
      //   ),
      //   selector: (row) => row.strategy,
      //   wrap: true,
      //   sortable: true,
      //   format: (row) => row.strategy,
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
      // {
      //   name: (
      //     <>
      //       <div>
      //         Serial No
      //       </div>
      //     </>
      //   ),
      //   selector: (row) => row.bundleId,
      //   sortable: true,
      //   maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      //   // cell: row => row.bundleId,
      //   // cell: (row) => <button onClick={() => alert()}>1</button>,
      //   // cell: (row) => <Checkbox className="text-black" {...label} />,
      //   format: (row) => row.bundleId,
      // },
      // {
      //   name: (
      //     <>
      //       <div>
      //         <img className="mr-2" src={boxicon}></img>Start Serial No
      //       </div>

      //     </>
      //   ),
      //   selector: (row) => row.bundleDescription,
      //   wrap: true,
      //   sortable: true,
      //   format: (row) => row.bundleDescription,
      // },
      // {
      //   name: (
      //     <>
      //       <div>End Serial No</div>
      //     </>
      //   ),
      //   selector: (row) => row.strategy,
      //   wrap: true,
      //   sortable: true,
      //   format: (row) => row.strategy,
      // },
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
               {/* <Link
                  to="#"
                  onClick={(e) => handleEditIncludeSerialNo(e, row)}
                  className="btn-svg text-white cursor mx-2"
                  data-toggle="modal"
                  data-target="#AddCoverage"
               >
                  <svg
                     version="1.1"
                     viewBox="0 0 1696.162 1696.143"
                     xmlSpace="preserve"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlnslgink="http://www.w3.org/1999/lgink"
                  >
                     <g id="pen">
                        <path d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z" />
                     </g>
                     <g id="Layer_1" />
                  </svg>
               </Link> */}
               <Link
                  to="#"
                  onClick={(e) => handleDeleteIncludeSerialNo(e, row)}
                  className="btn-svg text-white cursor mr-2"
               >
                  <svg
                     data-name="Layer 41"
                     id="Layer_41"
                     viewBox="0 0 50 50"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <title />
                     <path
                        className="cls-1"
                        d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                     />
                     <path
                        className="cls-1"
                        d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                     />
                     <path
                        className="cls-1"
                        d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                     />
                  </svg>
               </Link>
               {/* <Link
                  to="#"
                  className="btn-svg text-white cursor "
                  onClick={() => ShowRelatedIncludeModelBox(row)}
               >
                  <svg
                     data-name="Layer 1"
                     id="Layer_1"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                     style={{
                        fill: "none",
                        width: "18px",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2px",
                     }}
                  >
                     <title />
                     <g data-name="&lt;Group&gt;" id="_Group_">
                        <path
                           className="cls-1"
                           d="M13.38,10.79h0a3.5,3.5,0,0,1,0,5L10.52,18.6a3.5,3.5,0,0,1-5,0h0a3.5,3.5,0,0,1,0-5l.86-.86"
                           data-name="&lt;Path&gt;"
                           id="_Path_"
                        />
                        <path
                           className="cls-1"
                           d="M11,13.21h0a3.5,3.5,0,0,1,0-5L13.81,5.4a3.5,3.5,0,0,1,5,0h0a3.5,3.5,0,0,1,0,5l-.86.86"
                           data-name="&lt;Path&gt;"
                           id="_Path_2"
                        />
                     </g>
                  </svg>
               </Link> */}
            </div>
         ),
      },
   ];

   // Portfolio Solution Templates 

   const portfolioTemplatesMasterColumn = [
      // {
      //    name: (
      //       <>
      //          <div>Select</div>
      //       </>
      //    ),
      //    selector: (row) => row.itemId,
      //    wrap: true,
      //    sortable: true,
      //    // format: (row) => row.itemId,
      //    cell: (row) => (
      //       <Checkbox
      //          className="text-black"
      //          checked={row.check1 === true}
      //          onChange={(e) => handlePortfolioRowCheckboxData(e, row)}
      //       />
      //    ),
      // },
      // {
      //    name: (
      //       <>
      //          <div>ID</div>
      //       </>
      //    ),
      //    selector: (row) => row.portfolioId,
      //    wrap: true,
      //    sortable: true,
      //    format: (row) => row.portfolioId,
      // },
      {
         name: (
            <>
               <div>Name</div>
            </>
         ),
         selector: (row) => row.name,
         wrap: true,
         sortable: true,
         format: (row) => row.name,
      },
      {
         name: (
            <>
               <div>Description</div>
            </>
         ),
         selector: (row) => row.description,
         wrap: true,
         sortable: true,
         format: (row) => row.description,
      },
      {
         name: (
            <>
               <div>Reference</div>
            </>
         ),
         selector: (row) => row.externalReference,
         wrap: true,
         sortable: true,
         format: (row) => row.externalReference,
      }, ,
      {
         name: (
            <>
               <div>Total Event</div>
            </>
         ),
         selector: (row) => row.numberOfEvents,
         wrap: true,
         sortable: true,
         format: (row) => row.numberOfEvents,
      },
      {
         name: (
            <>
               <div>Total Price</div>
            </>
         ),
         selector: (row) => row?.portfolioPrice?.totalPrice,
         wrap: true,
         sortable: true,
         format: (row) => row?.portfolioPrice?.totalPrice,
      }
   ];

   // selected POrtfolio Template Table Data 

   const SelectedPortfolioMasterDataColumn = [
      // {
      //    name: (
      //       <>
      //          <div>ID</div>
      //       </>
      //    ),
      //    selector: (row) => row.portfolioId,
      //    wrap: true,
      //    sortable: true,
      //    format: (row) => row.portfolioId,
      // },
      {
         name: (
            <>
               <div>Name</div>
            </>
         ),
         selector: (row) => row.name,
         wrap: true,
         sortable: true,
         format: (row) => row.name,
      },
      {
         name: (
            <>
               <div>Description</div>
            </>
         ),
         selector: (row) => row.description,
         wrap: true,
         sortable: true,
         format: (row) => row.description,
      },
      {
         name: (
            <>
               <div>Reference</div>
            </>
         ),
         selector: (row) => row.externalReference,
         wrap: true,
         sortable: true,
         format: (row) => row.externalReference,
      },
      {
         name: (
            <>
               <div>Total Event</div>
            </>
         ),
         selector: (row) => row.numberOfEvents,
         wrap: true,
         sortable: true,
         format: (row) => row.numberOfEvents,
      },
      {
         name: (
            <>
               <div>Total Price</div>
            </>
         ),
         selector: (row) => row?.portfolioPrice?.totalPrice,
         wrap: true,
         sortable: true,
         format: (row) => row?.portfolioPrice?.totalPrice,
      },
   ];


   const sereachPortfolioResultData = [
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
               checked={row.check1 === true}
               onChange={(e) => handlePortfolioTempCheckboxData(e, row)}
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
   ]

   const solutionTemplatesMasterColumn = [
      {
         name: (
            <>
               <div>Select</div>
            </>
         ),
         selector: (row) => row.customPortfolioId,
         wrap: true,
         sortable: true,
         // format: (row) => row.itemId,
         cell: (row) => (
            // <Checkbox
            //    className="text-black"
            //    checked={row.check1}
            //    onChange={(e) => handlePortfolioTempCheckboxData(e, row)}
            // />
            <Radio
               className="text-black"
               checked={solutionRadioCheck == row.customPortfolioId}
               onChange={(e) => handleSolutinTemoRadioData(e, row)}
            />
         ),
      },
      // {
      //    name: (
      //       <>
      //          <div>ID</div>
      //       </>
      //    ),
      //    selector: (row) => row.customPortfolioId,
      //    wrap: true,
      //    sortable: true,
      //    format: (row) => row.customPortfolioId,
      // },
      {
         name: (
            <>
               <div>Name</div>
            </>
         ),
         selector: (row) => row.name,
         wrap: true,
         sortable: true,
         format: (row) => row.name,
      },
      {
         name: (
            <>
               <div>Reference</div>
            </>
         ),
         selector: (row) => row.externalReference,
         wrap: true,
         sortable: true,
         format: (row) => row.externalReference,
      },
      {
         name: (
            <>
               <div>Response Time</div>
            </>
         ),
         selector: (row) => row.responseTime,
         wrap: true,
         sortable: true,
         format: (row) => row.responseTime,
      },
      {
         name: (
            <>
               <div>Support Level</div>
            </>
         ),
         selector: (row) => row.supportLevel,
         wrap: true,
         sortable: true,
         format: (row) => row.supportLevel,
      },
      {
         name: (
            <>
               <div>Total Events</div>
            </>
         ),
         selector: (row) => row.numberOfEvents,
         wrap: true,
         sortable: true,
         format: (row) => row.numberOfEvents,
      },
      {
         name: (
            <>
               <div>Total Price</div>
            </>
         ),
         selector: (row) => row?.portfolioPrice?.totalPrice,
         wrap: true,
         sortable: true,
         format: (row) => row?.portfolioPrice?.totalPrice,
      },

   ]

   const SolutionPortfolioColumn = [
      {
         name: (
            <>
               {/* <div>Solution Id</div> */}
               <div>Name</div>
            </>
         ),
         // selector: (row) => row.itemId,
         // wrap: true,
         // sortable: true,
         // format: (row) => row.itemId,
         selector: (row) => row.name,
         wrap: true,
         sortable: true,
         format: (row) => row.name,
      },
      {
         name: (
            <>
               <div>Description</div>
            </>
         ),
         selector: (row) => row.description,
         wrap: true,
         sortable: true,
         format: (row) => row.description,
      },
      {
         name: (
            <>
               <div>Strategy</div>
            </>
         ),
         selector: (row) => row.strategyTask,
         wrap: true,
         sortable: true,
         format: (row) => row.strategyTask,
      }, {
         name: (
            <>
               <div>Task Type</div>
            </>
         ),
         selector: (row) => row.taskType,
         wrap: true,
         sortable: true,
         format: (row) => row.taskType,
      },
      {
         name: (
            <>
               <div>Quantity</div>
            </>
         ),
         selector: (row) => row?.quantity,
         wrap: true,
         sortable: true,
         format: (row) => row?.quantity,
      },
      {
         name: (
            <>
               <div>Net Price</div>
            </>
         ),
         selector: (row) => row?.netPrice,
         wrap: true,
         sortable: true,
         format: (row) => row?.netPrice,
      },
      {
         name: (
            <>
               <div>Net Additional</div>
            </>
         ),
         selector: (row) => row.additionalPrice?.additionalPercentage,
         wrap: true,
         sortable: true,
         format: (row) => row.additionalPrice?.additionalPercentage,
      },
      {
         name: (
            <>
               <div>Net Parts Price</div>
            </>
         ),
         selector: (row) => row?.partsprice,
         wrap: true,
         sortable: true,
         format: (row) => row?.partsprice,
      },
      {
         name: (
            <>
               <div>Net Service Price</div>
            </>
         ),
         selector: (row) => row?.portfolioPrice?.servicePrice,
         wrap: true,
         sortable: true,
         format: (row) => row?.portfolioPrice?.servicePrice,
      },
      {
         name: (
            <>
               <div>Total Price</div>
            </>
         ),
         selector: (row) => row?.portfolioPrice?.totalPrice,
         wrap: true,
         sortable: true,
         format: (row) => row?.portfolioPrice?.totalPrice,
      },
      {
         name: (
            <>
               <div>Comments</div>
            </>
         ),
         selector: (row) => row?.comments,
         wrap: true,
         sortable: true,
         format: (row) => row?.comments,
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
               <a className="cursor" onClick={() =>
                  makePortfolioEditableEditable(row)
               }>

                  <img className="mr-2" src={penIcon} />
               </a>
            </div>
         ),
      },
   ]

   const getFormattedDateTimeByTimeStamp = (timeStamp) => {

      var date = new Date(timeStamp);
      var year = date.getFullYear();
      // var m = date.getMonth() + 1;
      var m = date.getMonth();
      // var month = m < 10 ? '0' + m : m;
      var month = m;
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var format = "AM";
      var hour = date.getHours();
      var minutes = date.getMinutes();

      var monthName = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

      if (hour > 11) {
         format = "PM";
      }
      if (hour > 12) {
         hour = hour - 12;
      } else if (hour === 0) {
         hour = 12;
      }

      if (hour < 10) {
         hour = "0" + hour;
      }

      if (minutes < 10) {
         minutes = "0" + minutes;
      }

      // var finalDateString = day + "-" + month + "-" + year + " " + hour + ":" + minutes + " " + format;
      var finalDateString = hour + ":" + minutes + "" + format + ", " + day + " " + monthName[month] + " " + year;
      return finalDateString;
   }


   return (
      <>
         {/* <CommanComponents /> */}
         <div className="content-body" style={{ minHeight: '884px' }}>
            <div class="container-fluid ">
               <div className="d-flex align-items-center justify-content-between mt-2">
                  <h5 className="font-weight-600 mb-0">Solution Builder</h5>
                  <div>
                     {/* <a onClick={handleShow} style={{ cursor: 'pointer' }} className="btn bg-primary cursor text-white">
                        <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create New<span className="ml-2"></span>
                     </a> */}
                     <a onClick={PopupModelBoxShow} className="btn cursor bg-primary text-white">
                        <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create New<span className="ml-2"></span>
                     </a>
                  </div>
               </div>
               <div className="card p-4 mt-5">
                  <div className="mt-1">
                     {/* <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
                     <div className="recent-div p-3">
                        <h6 className="font-weight-600 text-grey mb-0">RECENT SOLUTIONS</h6>
                        {recentPortfolioSolution.length === 0 ? (
                           <LoadingProgress />
                        ) : (

                           <div className="row">

                              {recentPortfolioSolution.message === undefined ?
                                 <>
                                    {recentPortfolioSolution.map((solutionData, index) =>
                                       <div className="col-md-4">
                                          <div className="recent-items mt-3">
                                             <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 overflow-hidden white-space">
                                                   <FontAwesomeIcon className=" font-size-14" icon={faFileAlt} />
                                                   <span className="font-weight-500 ml-2">
                                                      {/* Portfolio Solution */}{solutionData.name}
                                                   </span>
                                                </p>
                                                <div className="d-flex align-items-center">
                                                   {/* <div className="white-space custom-checkbox">
                                             <FormGroup>
                                                <FormControlLabel control={index === 0 ? <Checkbox defaultChecked /> : <Checkbox />} label="" />
                                             </FormGroup>
                                          </div> */}
                                                   <a className="btn-sm cursor">
                                                      <i className="fa fa-pencil" aria-hidden="true" onClick={() => makePortfolioEditableEditable(solutionData)}></i>
                                                   </a>
                                                   <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                                   <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                                   <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                                   {/* <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a> */}
                                                </div>
                                             </div>

                                          </div>
                                          <div className="d-flex justify-content-between align-items-center mt-2">
                                             {/* <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p> */}
                                             <p className="font-size-12 mb-0">
                                                {/* {getFormattedDateTimeByTimeStamp(solutionData.createdAt)} */}
                                                {getFormattedDateTimeByTimeStamp(solutionData.updatedAt)}
                                             </p>
                                             <p className="font-size-12 mb-0">Portfolio Solution</p>
                                          </div>
                                       </div>


                                    )}
                                 </>
                                 :
                                 <p className="font-size-12 mb-0">No Recent Solutions</p>
                              }
                              {/* <div className="col-md-4">
                              <div className="recent-items mt-3">
                                 <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Portfolio Solution </span></p>
                                    <div className="d-flex align-items-center">
                                       <div className="white-space custom-checkbox">
                                          <FormGroup>
                                             <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                                          </FormGroup>
                                       </div>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
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
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
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
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
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
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
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
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
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
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Strategy Task</p>
                              </div>
                           </div> */}

                           </div>)}

                     </div>
                     {/* <div className="recent-div p-3">
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
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
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
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
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
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                       <a className="ml-3 cursor font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                       <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                 </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                 <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                 <p className="font-size-12 mb-0">Strategy Task</p>
                              </div>
                           </div>
                        </div>
                     </div> */}
                  </div>
               </div>

               {/* Search Portfolio Solution commited code below here Start */}

               {/* <div className="bg-primary px-3 mb-3 border-radius-10 ">
                  <div className="d-block height-66 d-md-flex justify-content-between align-items-center">
                     <div className="mx-2">
                        <div className="d-flex align-items-center bg-primary w-100">
                           <div className="d-flex mr-2" style={{ whiteSpace: 'pre' }}>
                              <h5 className="mr-2 mb-0 text-white"><span>Search</span></h5>
                              <p className="ml-4 mb-0">
                                 <a className="ml-3 text-white cursor">
                                    <EditOutlinedIcon />
                                 </a>
                                 <a className="ml-3 text-white cursor">
                                    <ShareOutlinedIcon />
                                 </a>
                              </p>
                           </div>
                           <div className="d-flex justify-content-between align-items-center w-100 mr-4">
                              <div className="row align-items-center m-0">
                                 {
                                    querySearchSelector.map((obj, i) => {
                                       return (
                                          <>
                                             <div className={`customselect ${i < ((querySearchSelector.length - 1)) ? "p-2" : ""} border-white d-flex align-items-center mr-3 my-2 border-radius-10`}>
                                                {i > 0 ? (
                                                   <SelectFilter
                                                      defaultValue={{ label: "And", value: "AND" }}
                                                      options={[
                                                         { label: "And", value: "AND", id: i },
                                                         { label: "Or", value: "OR", id: i },
                                                      ]}
                                                      placeholder="AND/OR"
                                                      onChange={(e) => handleOperator(e, i)}
                                                      value={obj.selectOperator}

                                                   />) : (
                                                   <></>
                                                )}

                                                <div>
                                                   <SelectFilter
                                                      options={[
                                                         { label: "Make", value: "make", id: i },
                                                         { label: "Family", value: "family", id: i },
                                                         { label: "Model", value: "modelNo", id: i },
                                                         { label: "Prefix", value: "serialNumberPrefix", id: i },
                                                         { label: "Name", value: "name", id: i },
                                                         { label: "Description", value: "description", id: i },
                                                      ]}
                                                      onChange={(e) => handleFamily(e, i)}
                                                      value={obj.selectFamily}
                                                   />
                                                </div>
                                                <div className="customselectsearch customize">
                                                   <span className={(i < (querySearchSelector.length - 1)) ? "search-icon-quote" : "search-icon-postn"}>
                                                      <SearchIcon className="text-primary" />
                                                   </span>
                                                   <input
                                                      className="custom-input-sleact "
                                                      style={{ position: "relative" }}
                                                      type="text"
                                                      placeholder="Search string"
                                                      value={obj.inputSearch}
                                                      onChange={(e) => handleInputSearch(e, i)}
                                                      id={"inputSearch-" + i}
                                                      autoComplete="off"
                                                   />

                                                   {(querySearchSelector.length - 1) === i ?
                                                      <>
                                                         <div className="bg-primary text-white btn" onClick={handleQuerySearchClick}>
                                                            <span className="mr-2">
                                                               <SearchIcon />
                                                            </span>
                                                            Search
                                                         </div>
                                                      </> : <></>}

                                                   {<ul className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`} id="style">
                                                      {obj.selectOptions.map((currentItem, j) => (
                                                         <li
                                                            className="list-group-item"
                                                            key={j}
                                                            onClick={(e) => handleSearchListClick(e, currentItem, obj, i)}
                                                         >
                                                            {currentItem}
                                                         </li>
                                                      ))}
                                                   </ul>}
                                                </div>
                                             </div>
                                          </>
                                       );
                                    })}
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
                                    </Link>
                                 </div>

                              </div>
                           </div>
                        </div>

                     </div>
                     <div className="col-auto">
                        <div className="text-center pl-3 py-3">
                        </div>
                     </div>
                  </div>
               </div>
               <div className="card">

                  <div className="" style={{ minHeight: 200, height: "auto", width: '100%', backgroundColor: '#fff' }}>
                     {searchedPortfolioSolution.length > 0 ?
                        <>
                           <DataTable
                              className=""
                              title=""
                              columns={SolutionPortfolioColumn}
                              data={searchedPortfolioSolution}
                              customStyles={customTableStyles}
                              pagination
                           />
                        </> : <></>}

                  </div>
               </div> */}

               {/* Search Portfolio Solution commited code below here End */}

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

               {/* <Modal show={openSolutionSelector} onHide={() => setOpenSolutionSelector(false)} size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered>
                  <Modal.Header className="bg-white">
                     <Modal.Title>Solution Selector</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="p25 pt-4" style={{ backgroundColor: '#F8F8F8 !important' }}>
                     <div>import { PortfolioTemplatesResult } from './PortfolioTemplatesResult';


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
               </Modal> */}


               {/* <Modal show={openSearchSolution} onHide={() => setOpenSearchSolution(false)} size="xl"
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
                           setExploreMasterData={setExploreMasterData}
                           setSelectedExploreMasterData={setSelectedExploreMasterData}

                        // setQuerySearchSelectItem={setQuerySearchSelectItem}
                        // setTempBundleService1={setTempBundleService1}
                        // setLoadingItem={setLoadingItem} 
                        />
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
                        {exploreMasterData.length > 0 ?
                           <>
                              <div className="tableheader">
                                 <ul class="submenu accordion mt-0" style={{ display: 'block' }}>
                                    <li><a className="cursor result" >RESULTS</a></li>
                                 </ul>
                                 <DataTable
                                    className=""
                                    title=""
                                    columns={exploreMasterColumn}
                                    data={exploreMasterData}
                                    customStyles={customStyles}
                                    pagination
                                 />
                                 <div className="m-2 text-right">
                                    <input
                                       onClick={() => {
                                          setSelectedExploreMasterData(exploreFilterMasterData);
                                          setExploreMasterData([]);
                                       }}
                                       className="btn text-white bg-primary"
                                       value="+ Add Selected"
                                       disabled={!exploreFlagIs}
                                    />
                                 </div>
                              </div>
                           </> : <></>
                        }
                        {selectedExploreMasterData.length > 0 ? (
                           <>
                              <div className="tableheader">
                                 <ul class="submenu accordion mt-0" style={{ display: 'block' }}>
                                    <li><a className="cursor result" >Included Data</a></li>
                                 </ul>
                                 <DataTable
                                    className="mt-3"
                                    title=""
                                    columns={SelectedExploreMasterDataColumn}
                                    data={selectedExploreMasterData}
                                    customStyles={customStyles}
                                    pagination
                                 />
                              </div>
                           </>
                        ) : (
                           <></>
                        )}
                     </div>
                  </Modal.Body>
                  <Modal.Footer>
                     {selectedExploreMasterData.length > 0 ?
                        <div>
                           <button className="btn btn-primary w-100" onClick={handleBundleItemSaveAndContinue}>Save & Continue</button>
                        </div>
                        : <></>}
                  </Modal.Footer>
               </Modal> */}

               {/* <Modal show={showExplore} onHide={handleCloseExplore} size="xl"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered>
                  <Modal.Body className='p-0'>
                     <div className='bg-white border-bottom'>
                        <div className='d-flex align-items-center justify-content-between'>
                           <div></div>
                           <div>
                              <a className='btn border-left cursor'>+ Add</a>
                              <a className='btn border-left cursor'>Cancel</a>
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
                                    <a className='cursor bg-yellow text-white btn'>CV agreement</a>
                                    <h4 className='text-red mt-3'><b>$20,000</b></h4>
                                    <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                                    </ul>
                                    <Link to="/service/new" className="btn bg-primary text-white Choose-btn">Choose</Link>
                                 </div>
                                 <div class='item'>
                                    <a className='cursor bg-primary  text-white btn'>Repair {querySearchSelectItem.length > 0 ? querySearchSelectItem[0].itemType.label : ""}</a>
                                    <h4 className='text-red mt-3'><b>$20,000</b></h4>
                                    <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                                    </ul>
                                    <Link to="/service/new" className="btn bg-primary text-white Choose-btn">Choose</Link>
                                 </div>
                                 <div class='item'>
                                    <a className='cursor bg-green-light text-white btn'>Maintenence {querySearchSelectItem.length > 0 ? querySearchSelectItem[0].itemType.label : ""}</a>
                                    <h4 className='text-red mt-3'><b>$20,000</b></h4>
                                    <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                                    </ul>
                                    <Link to="/service/new" className="btn bg-primary text-white Choose-btn">Choose</Link>
                                 </div>
                                 <div class='item'>
                                    <h4 className='text-light'><b>Repair {querySearchSelectItem.length > 0 ? querySearchSelectItem[0].itemType.label : ""}</b></h4>
                                    <h4 className='text-red mt-3'><b>$20,000</b></h4>
                                    <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                                       <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                                    </ul>
                                    <Link to="/service/new" className="btn bg-primary text-white Choose-btn">Choose</Link>
                                 </div>

                              </OwlCarousel>

                           </div>

                           <div>
                              <a onClick={CantFindgoback} className='btn cursor'>I can't find what i need</a>
                           </div>
                        </div>
                     </div>

                  </Modal.Body>
               </Modal> */}


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

                           {/* <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}> */}
                           <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
                              <DataGrid
                                 sx={{
                                    '& .MuiDataGrid-columnHeaders': {
                                       // backgroundColor: '#7380E4', color: '#fff'
                                       backgroundColor: '#872ff7', color: '#fff'
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
                           {/* <input className="btn text-white bg-primary" value="+ Add Selected" disabled={!flagIs} /> */}
                           <a className="btn text-white cursor bg-primary">+ Add Selected</a>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Modal
            size="xl"
            show={bundleServiceShow}
            onHide={() => setBundleServiceShow(false)}
         >
            <Modal.Body>
               <div class="modal-header p-3">
                  <div className="d-flex" >
                     <h5>Search Result</h5>
                  </div>
               </div>
               <div>
                  {masterData.length > 0 ?
                     <>

                        <div className="card w-100 p-2">

                           {/* <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}> */}
                           <div className="" style={{ width: '100%', backgroundColor: '#fff' }}>
                              {/* <DataGrid
                                       sx={{
                                          '& .MuiDataGrid-columnHeaders': {
                                             // backgroundColor: '#7380E4', color: '#fff'
                                             backgroundColor: '#872ff7', color: '#fff'
                                          }
                                       }}
                                       rows={rows}
                                       columns={columns}
                                       pageSize={5}
                                       rowsPerPageOptions={[5]}
                                       checkboxSelection
                                       onCellClick={(e) => handleRowClick(e)}


                                    /> */}
                              <DataTable
                                 className=""
                                 title=""
                                 columns={masterColumns}
                                 data={masterData}
                                 customStyles={customTableStyles}
                                 pagination
                              />

                           </div>


                        </div>
                        <div className="m-2 text-right">
                           <input
                              onClick={() => {
                                 setSelectedMasterData(filterMasterData);
                                 setMasterData([]);
                              }}
                              className="btn text-white bg-primary"
                              value="+ Add Selected"
                              disabled={!flagIs} />
                           {/* <a className="btn cursor text-white bg-primary">+ Add Selected</a> */}

                        </div>
                     </> : <></>}

                  {selectedMasterData.length > 0 ? (
                     <>
                        <div className="card w-100 p-2">

                           {/* <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}> */}
                           <div className="" style={{ width: '100%', backgroundColor: '#fff' }}>
                              <label htmlFor="Included-model">
                                 <h5 className="font-weight-400 text-black mb-2 mt-1">
                                    Included models
                                 </h5>
                              </label>
                              <DataTable
                                 className="mt-3"
                                 title=""
                                 columns={selectedMasterColumns}
                                 data={selectedMasterData}
                                 customStyles={customTableStyles}
                                 pagination
                              />
                           </div>
                        </div>
                     </>
                  ) : (
                     <></>
                  )}
               </div>
            </Modal.Body>
         </Modal>

         {/* New Flow Work On Create New Button */}

         <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
            <Modal.Body>
               <div className='d-flex align-items-center justify-content-between'>
                  <div><h5 class="">Choose what solution you want to build</h5></div>
               </div>
               <div className='card mt-4 p-4'>
                  <div className='row'>
                     <div className='col-md-6 my-3 '>
                        <div className='d-flex'>
                           <div className='mr-2'><img src={Portfoliosicon}></img></div>
                           <div>
                              <h5 className='text-light'>Pre-Configure Solution</h5>
                              <p><b>You build pre-configured repair & maintenance solutions for your customer segment here. </b>
                                 {/* <p><b>You build Portfolios or Service Programs here. </b> */}
                                 Examples of Portfolios are Premium Maintenance Plan, Value added plan etc. A service program is a marketing or product improvement program.
                              </p>
                              <div className=''>
                                 <a onClick={continueClickNextStep} className='btn bg-primary text-white'>Continue <img className='ml-2' src={Buttonarrow}></img></a>
                              </div>

                           </div>
                        </div>
                     </div>
                     <div className='col-md-6 my-3'>
                        <div className='d-flex'>
                           <div className='mr-2'><img src={contract}></img></div>
                           <div>
                              <h5 className='text-light'>Customized Portfolio</h5>
                              <p><b>You build Customized Portfolio here. </b>
                                 Examples of pre-built template are Level I contracts like subscriptions or Level IV contract for Total Maintenance and Repair.
                              </p>
                              <div className=''>
                                 {/* <a onClick={() => history.push(SOLUTION_BUILDER_CUSTOMIZED_PORRTFOLIO)} className='btn bg-primary text-white'>Continue <img className='ml-2' src={Buttonarrow}></img></a> */}
                                 <a onClick={handleCreateNewPortfolio} className='btn bg-primary text-white'>Continue <img className='ml-2' src={Buttonarrow}></img></a>
                              </div>

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
         </Modal>
         <Modal show={showPopup} onHide={() => setShowPopup(false)} size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="align-items-center" style={{ background: "#F0F0F0" }}>
               <Modal.Title><b>Select the solution you want to build</b></Modal.Title>
               <button className="btn text-white bg-primary">Request for help!</button>
            </Modal.Header>
            <Modal.Body>
               <div className=' p-4'>
                  <div className='row'>
                     <div className='col-md-6 my-3'>
                        <div className="px-4">
                           <div className='mr-2'><img src={Portfoliosicon}></img></div>
                           <h5 className='text-light mt-3'>Maintenance Solutions</h5>
                           <p className="mt-2">Develop solutions for maintenance including long term contracts</p>
                           <Button
                              className='btn bg-primary text-white py-2'
                              style={{ textTransform: 'none' }}
                              onClick={handleCreationSolutionPopUp}
                           >
                              Continue <ArrowForwardIosIcon className="ml-2" />
                           </Button>
                        </div>
                     </div>
                     <div className='col-md-6 my-3 '>
                        <div className="px-4">
                           <div className='mr-2'><img src={contract}></img></div>
                           <h5 className='text-light mt-3'>Repair Solutions</h5>
                           <p className="mt-2">Develop solutions for repair, overhaul and rebuild</p>
                           <Button
                              className='btn bg-primary text-white py-2'
                              style={{ textTransform: 'none' }}
                              onClick={handleCreationSolutionPopUp}
                           >
                              Continue <ArrowForwardIosIcon className="ml-2" />
                           </Button>
                        </div>
                     </div>
                     <div className='col-md-6 my-3 '>
                        <div className="px-4">
                           <div className='mr-2'><DesignServicesOutlinedIcon style={{ fontSize: "66px" }} /></div>
                           <h5 className='text-light mt-3'> Routine Maintenance Tasks</h5>
                           <p className="mt-2">Develop solutions for routine maintenance task such as preventive maintenace</p>
                           <Button
                              className='btn bg-primary text-white py-2'
                              style={{ textTransform: 'none' }}
                              onClick={handleCreationSolutionPopUp}
                           >
                              Continue <ArrowForwardIosIcon className="ml-2" />
                           </Button>
                        </div>
                     </div>
                     <div className='col-md-6 my-3 '>
                        <div className="px-4">
                           <div className='mr-2'><DesignServicesOutlinedIcon style={{ fontSize: "66px" }} /></div>
                           <h5 className='text-light mt-3'>Equipment Solutions</h5>
                           <p className="mt-2">Develop solutions for new equipments such as customisation or instalation etc.</p>
                           <Button
                              className='btn bg-primary text-white py-2'
                              style={{ textTransform: 'none' }}
                              onClick={handleCreationSolutionPopUp}
                           >
                              Continue <ArrowForwardIosIcon className="ml-2" />
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
         </Modal>
         <Modal show={exploreSolutionPopup} onHide={() => setExploreSolutionPopup(false)} size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            {/* <Modal.Header className="align-items-center" style={{ background: "#F0F0F0" }}>
               <Modal.Title><b>Select the solution you want to build</b></Modal.Title>
               <button className="btn text-white bg-primary">Request for help!</button>
            </Modal.Header> */}
            <Modal.Body style={{ background: "#F0F0F0" }}>
               <div className=' p-4'>
                  {/* <div className="input-group icons border-radius-10 border-primary">
                <div className="input-group-prepend ">
                  <span
                    className="input-group-text text-primary bg-white border-0 pr-0 "
                    id="basic-addon1"
                  >
                    <SearchIcon style={{fontSize: "32px"}} />
                  </span>
                </div>
                <input
                  type="search"
                  className="form-control search-form-control"
                  aria-label="Search Dashboard"
                  placeholder="Search quotes"
                />

              </div> */}
                  <div class="input-group icons border-radius-10 border overflow-hidden">
                     <div class="input-group-prepend bg-white ">
                        <span class="input-group-text border-0 pr-0 " id="basic-addon1">
                           <SearchIcon /></span>
                     </div>
                     <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" />
                     <div class="input-group-prepend align-items-center bg-white">
                        <div className="w-100 mx-2">
                           <div className="machine-drop d-flex align-items-center bg-white border-primary">
                              {/* <div><lable className="label-div" style={{whiteSpace:'pre'}} >Quote Type</lable></div> */}
                              <FormControl className="" sx={{ m: 1, }}>
                                 <Select
                                    id="demo-simple-select-autowidth"
                                    value={age}
                                    onChange={handleChangedrop}
                                    autoWidth
                                 >
                                    <MenuItem value="5">
                                       <em>Portfolio</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Solution</MenuItem>
                                    {/* <MenuItem value={21}>Solution</MenuItem> */}
                                 </Select>
                              </FormControl>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
         </Modal>
         <Modal
            show={creationSolutionPopup}
            onHide={() => setCreationSolutionPopup(false)}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="align-items-center" style={{ background: "#F0F0F0" }}>
               <Modal.Title><b>Choose the option to create solutions</b></Modal.Title>
               <button
                  // onClick={PopupExoploreSolutionShow} 
                  className="btn text-white bg-primary"
               >Explore available solution</button>
            </Modal.Header>
            <Modal.Body>
               <div className=' p-4'>
                  <div className='row'>
                     <div className='col-md-6 my-3'>
                        <div className="px-4">
                           <div className='mr-2'><img src={Portfoliosicon}></img></div>
                           <h5 className='text-light mt-3'>Pre-configured solution</h5>
                           <p className="mt-2"><b>Get started with pre-configured solution, customise to your need and convert to a quote.</b></p>
                           <p className="mt-2">Your product experts have built pre-configured solution for your miantenance and repair needs.</p>
                           <Button
                              className='btn bg-primary text-white py-2'
                              style={{ textTransform: 'none' }}
                              onClick={handleSearchPortfolioTemplate}
                           >
                              Continue <ArrowForwardIosIcon className="ml-2" />
                           </Button>
                        </div>
                     </div>
                     <div className='col-md-6 my-3 '>
                        <div className="px-4">
                           <div className='mr-2'><img src={contract}></img></div>
                           <h5 className='text-light mt-3'>Develop new solutions</h5>
                           <p className="mt-2"><b>Develop a new solution with the help of the builder platform</b></p>
                           <p className="mt-2">Collaborate with product and solution experts to built new solutions.</p>
                           <Button
                              className='btn bg-primary text-white py-2'
                              style={{ textTransform: 'none' }}
                              onClick={handleCreateNewPortfolio}
                           // onClick={handleSearchPortfolioTemplate}
                           >
                              Continue <ArrowForwardIosIcon className="ml-2" />
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
         <Modal
            // show={searchPortfolioTemplate}
            // onHide={() => setSearchPortfolioTemplate(false)}
            // size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="align-items-center" style={{ background: "#F0F0F0" }}>
               <Modal.Title><b>Search Portfolio Template</b></Modal.Title>
               <button className="btn text-white bg-primary">Guided Solution</button>
            </Modal.Header>
            <Modal.Body>
               <div className="row p-3 radio-button">
                  <div className="col-md-6 col-sm-6">
                     <div className="card bg-light p-4">
                        <Radio
                           checked={solutionValue == 0}
                           onChange={handleChangeRadio}
                           value="a"
                           name="radio-buttons"
                           inputProps={{ 'aria-label': 'A' }}
                        />
                        <h5 className="mb-0 mt-3">Portfolio Template</h5>
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                     <div className="card bg-light p-4">
                        <Radio
                           checked={solutionValue == 1}
                           onChange={handleChangeRadio}
                           value="b"
                           name="radio-buttons"
                           inputProps={{ 'aria-label': 'B' }}
                        />
                        <h5 className="mb-0 mt-3">Solution Template</h5>
                     </div>
                  </div>
               </div>
               {solutionValue !== 3 ? <>
                  <hr />
                  <div>
                     <h5>Search here...</h5>
                  </div>
               </> : <></>}
            </Modal.Body>
         </Modal>
         <Modal show={solutionsPopup} onHide={() => setSolutionsPopup(false)} size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            {/* <Modal.Header closeButton>
               <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
               <div className="p-3">
                  <div>
                     <h5 className='text-black'>Do you want create a new solution or use an existing one?</h5>
                     <RadioGroup className='my-3'
                        row
                        aria-labelledby="demo-form-control-label-placement"
                        name="position"
                        defaultValue="top"
                        value={selectTypeOfSolution}
                        onChange={handleTypeOfSolution}
                     >

                        <FormControlLabel
                           className="col-md-4 m-0 card py-4 align-itemsstart"
                           value="0"
                           control={<Radio />}
                           label="Portfolio Template"
                           labelPlacement="bottom"
                        />
                        <FormControlLabel
                           className="col-md-4 m-0 card py-4 align-itemsstart"
                           value="1"
                           control={<Radio />}
                           label="Solution Template"
                           labelPlacement="bottom"
                        />
                        <FormControlLabel
                           className="col-md-4 m-0 card py-4 align-itemsstart"
                           value="2"
                           control={<Radio />}
                           label="Guided Solutions"
                           labelPlacement="bottom"
                        />
                     </RadioGroup>
                     <div>
                        {/* <button onClick={() => HandleNextStepClick()} className="btn btn-primary w-100">Next  <img className='ml-2' src={Buttonarrow}></img></button> */}
                        <button onClick={() => handleShowSearch()} className="btn btn-primary w-100">Next  <img className='ml-2' src={Buttonarrow}></img></button>
                     </div>
                  </div>
               </div>
            </Modal.Body>
         </Modal>

         <Modal
            show={searchPortfolioTemplate}
            onHide={() => setSearchPortfolioTemplate(false)}
            size="md"
            // show={openTemplateSerachModelBox} onHide={() => setOpenTemplatesSearchModelBox(false)} 
            // size="xl"
            aria-labelledby="contained-modal-title-vcenter"
         >
            <Modal.Header className="align-items-center" style={{ background: "#F0F0F0" }}>
               <Modal.Title><b>Search Portfolio Template</b></Modal.Title>
               <button className="btn text-white bg-primary">Guided Solution</button>
            </Modal.Header>

            <Modal.Body className="">
               <div className=" w-100 border-radius-10 mt-3">
                  <div className="d-flex">
                     <div className="w-100">
                        <div className="maintableheader bg-white border-radius-10 p-2 h-100">
                           <RadioGroup className='my-2 row'
                              row
                              aria-labelledby="demo-form-control-label-placement"
                              name="position"
                              defaultValue="top"
                              value={selectTypeOfSolution}
                              onChange={handleTypeOfSolution}
                           >
                              <div className="w-50 customFormControlLabel col-md-6 ">
                                 <div className=" m-0 mb-3 bg-light-dark p-2 card py-4 align-itemsstart" style={{ height: "160px" }}>
                                    <FormControlLabel
                                       className=" "
                                       value="0"
                                       control={<Radio className="mx-1" checked={solutionValue == 0} />}
                                       label="Portfolio"
                                       labelPlacement="bottom"
                                    />
                                    <FormHelperText
                                       className="pl-5"
                                       children="Portfolio is a service offering by your company or your department. Portfolio can contain service bundles or unique services or both."
                                    />
                                 </div>
                              </div>
                              <div className="w-50 customFormControlLabel col-md-6">
                                 <div className=" m-0 mb-3 bg-light-dark p-2 card py-4 align-itemsstart " style={{ height: "160px" }}>
                                    <FormControlLabel
                                       className=""
                                       value="1"
                                       control={<Radio className="mx-1" checked={solutionValue == 1} />}
                                       label="Solution"
                                       labelPlacement="bottom"
                                    />
                                    <FormHelperText
                                       className="pl-5"
                                       children="A Service Program is initiated by your markting deparrtment as compaigns or product team for improvement and safety programs."
                                    />
                                 </div>
                              </div>
                           </RadioGroup>
                        </div>
                     </div>
                     {/* <div className="align-items-center d-flex px-2">
                        <p>OR</p>
                     </div> */}
                     {/* <div className="w-50">
                        <div className="maintableheader bg-white border-radius-10 p-2 h-100">
                           <RadioGroup className='my-2'
                              row
                              aria-labelledby="demo-form-control-label-placement"
                              name="position"
                              defaultValue="top"
                              value={selectTypeOfSolution}
                              onChange={handleTypeOfSolution}
                           >
                              <div className="customFormControlLabel ">
                                 <div className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart">
                                    <FormControlLabel
                                       className=" "
                                       value="2"
                                       control={<Radio className="mr-5" checked={solutionValue == 2} />}
                                       label="Guided Solution"
                                       labelPlacement="bottom"
                                    />
                                    <FormHelperText
                                       className="pl-5"
                                       children="Portfolio is a service offering by your company or your department. Portfolio can contain service bundles or unique services or both."
                                    />
                                 </div>
                              </div>
                           </RadioGroup>
                        </div>
                     </div> */}
                  </div>
               </div>

               {/* <div className="bg-light-dark w-100 border-radius-10 p-3 mt-3">
                  <div className="row">
                     <div className="col-md-8">
                        <div className="maintableheader bg-white border-radius-10 p-2 h-100">
                           <RadioGroup className='my-2 '
                              row
                              aria-labelledby="demo-form-control-label-placement"
                              name="position"
                              defaultValue="top"
                              value={selectTypeOfSolution}
                              onChange={handleTypeOfSolution}
                           >
                              <div className="col-md-6 customFormControlLabel ">
                                 <div className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart">
                                    <FormControlLabel
                                       className=" "
                                       value="0"
                                       control={<Radio className="mx-1" checked={solutionValue == 0} />}
                                       label="Portfolio"
                                       labelPlacement="bottom"
                                    />
                                    <FormHelperText
                                       className="pl-5"
                                       children="Portfolio is a service offering by your company or your department. Portfolio can contain service bundles or unique services or both."
                                    />
                                 </div>
                              </div>
                              <div className="col-md-6 customFormControlLabel">
                                 <div className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart ">
                                    <FormControlLabel
                                       className=""
                                       value="1"
                                       control={<Radio className="mx-1" />}
                                       label="Solution"
                                       labelPlacement="bottom"
                                    />
                                    <FormHelperText
                                       className="pl-5"
                                       children="A Service Program is initiated by your markting deparrtment as compaigns or product team for improvement and safety programs."
                                    />
                                 </div>
                              </div>
                           </RadioGroup>
                        </div>
                     </div>

                     <div className="col-md-4">
                        <div className="maintableheader bg-white border-radius-10 py-4 h-100 d-flex align-items-center justify-content-center">
                           For Button
                           <div className="w-100 m-0 mb-3  p-2 card p-2 h-100 align-items-center justify-content-center">
                              <a href="/solutionBuilder/guide" className="btn text-white bg-primary " onClick={() => history.push('/solutionBuilder/guide')}>Guided Solution</a>
                           </div>
                           For Radio  button
                           <RadioGroup className='my-2 '
                              row
                              aria-labelledby="demo-form-control-label-placement"
                              name="position"
                              defaultValue="top"
                              value={selectTypeOfSolution}
                              onChange={handleTypeOfSolution}
                           >
                              <div className="customFormControlLabel ">
                                 <div className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart">
                                    <FormControlLabel
                                       className=" "
                                       value="2"
                                       control={<Radio className="mr-5" checked={solutionValue == 0} />}
                                       label="Guided Solution"
                                       labelPlacement="bottom"
                                    />
                                    <FormHelperText
                                       className="pl-5"
                                       children="Portfolio is a service offering by your company or your department. Portfolio can contain service bundles or unique services or both."
                                    />
                                 </div>
                              </div>

                           </RadioGroup>
                        </div>
                     </div>
                  </div>

               </div> */}

               {/* <div className="bg-light-dark w-100 border-radius-10 p-3 mt-3">
                  <div className="d-flex">
                     <div className="w-100">
                        <div className="maintableheader bg-white border-radius-10 p-2 h-100">
                           <p>Search Existing Templates</p>
                           <div className="existing-template-div d-flex justify-content-end">
                              <a className={`${solutionValue == 0 ? "btn text-white mr-2 active" : "btn text-white bg-primary mr-2"}` cursor} onClick={(e) => handleTypeOfTemplateSolutionBtn(e, 0)}>Portfolio</a>
                              <a className={`${solutionValue == 1 ? "btn text-white ml-0 active" : "btn text-white bg-primary ml-0"}` cursor} onClick={(e) => handleTypeOfTemplateSolutionBtn(e, 1)}>Solution</a>
                           </div>
                        </div>
                     </div>
                     <div className="align-items-center d-flex px-2">
                        <p>OR</p>
                     </div>
                     <div className="w-100">
                        <div className="maintableheader bg-white border-radius-10 p-2 h-100  ">
                           <p>Create using Guided Flow</p>
                           <a href="/solutionBuilder/guide" className="btn text-white bg-primary pull-right" onClick={() => history.push('/solutionBuilder/guide')}>Create Solution</a>
                        </div>
                     </div>
                  </div>
               </div> */}


               {/* <hr /> */}
               <div className="maintableheader bg-white mt-2 border-radius-10">
                  {/* <RadioGroup className='my-2'
                     row
                     aria-labelledby="demo-form-control-label-placement"
                     name="position"
                     defaultValue="top"
                     value={selectTypeOfSolution}
                     onChange={handleTypeOfSolution}
                  >

                     <FormControlLabel
                        className="col-md-4 m-0 align-itemsstart"
                        value="0"
                        control={<Radio className="mx-1" checked={solutionValue == 0} />}
                        label="Portfolio Template"
                        labelPlacement="end"
                     />
                     <FormControlLabel
                        className="col-md-4 m-0 align-itemsstart"
                        value="1"
                        control={<Radio className="mx-1" />}
                        label="Solution Template"
                        labelPlacement="end"
                     />
                  </RadioGroup> */}
                  {solutionValue == 0 ? <>
                     <SolutionQuerySearchComp
                        compoFlag="portfolioTempItemSearch"
                        options={[
                           // { label: "Make", value: "make" },
                           // { label: "Family", value: "family" },
                           // { label: "Model", value: "modelNo" },
                           // { label: "Prefix", value: "serialNumberPrefix" },
                           { label: "Make", value: "make" },
                           { label: "Family", value: "family" },
                           { label: "Model", value: "model" },
                           { label: "Prefix", value: "prefix" },
                           { label: "Name", value: "name" },
                           // { label: "Portfolio Id", value: "portfolioId" },
                           { label: "Description", value: "description" },
                        ]}
                        setPortfolioTempMasterData={setPortfolioTempMasterData}
                        setSelectedPortfolioTempMasterData={setSelectedPortfolioTempMasterData}
                        setLoadingStatus={setLoadingStatus}
                        setPortfolioTempFilterMasterData={setPortfolioTempFilterMasterData}
                     />
                  </> :
                     <>
                        {solutionValue == 1 ? <>
                           <SolutionQuerySearchComp
                              compoFlag="solutionTempItemSearch"
                              options={[
                                 { label: "Make", value: "make" },
                                 { label: "Family", value: "family" },
                                 { label: "Model", value: "model" },
                                 { label: "Prefix", value: "prefix" },
                                 { label: "Name", value: "name" },
                                 { label: "Description", value: "description" },
                              ]}
                              setSolutionTempMasterData={setSolutionTempMasterData}
                              setSelectedSolutionTempMasterData={setSelectedSolutionTempMasterData}
                              setSolutionLoadingStatus={setSolutionLoadingStatus}
                           />
                        </> : <></>}
                     </>

                  }
                  {solutionValue == 0 ? <>

                     {loadingStatus === "01" ? ("loading") :

                        <>
                           {portfolioTempMasterData.length > 0 ?
                              <>
                                 <div className="tableheader">
                                    <ul class="submenu selected-li border-custom templateResultheading accordion mt-0" style={{ display: 'block', borderTop: "none !important" }}>
                                       <li className="border-bottom">
                                          <div className="result py-4 px-3 font-size-14"><b>RESULTS</b></div>
                                       </li>
                                       {portfolioTempMasterData.map((row, i) =>
                                          <li key={i} className="border-bottom cursor " onClick={() => handleOnPortfolioResultRow(row.portfolioId, row.name)}>
                                             <div className="d-flex align-items-center p-3">
                                                <div className="d-flex mr-4">
                                                   {/* <div class="checkbox mr-3">
                                                      <input type="checkbox" value=""></input>
                                                   </div> */}
                                                   <p className="mb-0 font-size-14"><b>{row.name}</b></p>
                                                   {/* <p className="mb-0 font-size-12">{row.description}</p> */}
                                                </div>
                                                {/* <div className={`px-3 py-1 mr-4 text-white 
                                                      ${row.supportLevel == "STANDARD" ? "bg-green" :
                                                      row.supportLevel == "PREMIUM" ? "bg-yellow" :
                                                         row.supportLevel == "SUPERIOR" ? "bg-gray" : ""} font-size-12 border-radius-5`}>{row.supportLevel}
                                                </div> */}
                                                <div className={`px-3 py-1 mr-4 text-white 
                                                      ${row.version == "STANDARD" ? "bg-green" :
                                                      row.version == "PREMIUM" ? "bg-yellow" :
                                                         row.version == "SUPERIOR" ? "bg-gray" : "text-dark"} font-size-12 border-radius-5`}>{row.version}
                                                </div>
                                                <div className="d-flex mr-4">
                                                   <p className="mb-0 font-size-14">PRICE</p>
                                                </div>
                                                <div className="d-flex">
                                                   {/* <p className="mb-0 font-size-14 ">$2,000</p> */}
                                                   <p className="mb-0 font-size-14 ">${row.calculatedPrice}</p>
                                                </div>

                                             </div>
                                          </li>

                                       )}
                                       {/* <li className="border-bottom">
                                          <div className="d-flex align-items-center p-3">
                                             <div className="d-flex mt-1 mr-3">
                                                <div class="checkbox">
                                                   <input type="checkbox" value=""></input>
                                                </div>
                                             </div>
                                             <div className="d-flex mr-5">
                                                <p className="mb-0 font-size-14 text-black"><b>PS123-CVA_STD_PLN</b></p>
                                             </div>
                                             <div className="d-flex mr-5">
                                                <div className="px-3 py-2 text-white bg-green font-size-12 border-radius-5">Standard</div>
                                             </div>
                                             <div className="d-flex mr-5">
                                                <p className="mb-0 font-size-14">PRICE</p>
                                             </div>
                                             <div className="d-flex">
                                                <p className="mb-0 font-size-14 text-black">$2,000</p>
                                             </div>
                                          </div>
                                       </li>
                                       <li className="border-bottom">
                                          <div className="d-flex align-items-center p-3">
                                             <div className="d-flex mt-1 mr-3">
                                                <div class="checkbox">
                                                   <input type="checkbox" value=""></input>
                                                </div>
                                             </div>
                                             <div className="d-flex mr-5">
                                                <p className="mb-0 font-size-14 text-black"><b>PS123-CVA_PREM_PLN</b></p>
                                             </div>
                                             <div className="d-flex mr-5">
                                                <div className="px-3 py-2 text-white bg-yellow font-size-12 border-radius-5">Standard</div>
                                             </div>
                                             <div className="d-flex mr-5">
                                                <p className="mb-0 font-size-14">PRICE</p>
                                             </div>
                                             <div className="d-flex">
                                                <p className="mb-0 font-size-14 text-black">$3,000</p>
                                             </div>
                                          </div>
                                       </li>
                                       <li className="bg-primary">
                                          <div className="d-flex align-items-center p-3">
                                             <div className="d-flex mt-1 mr-3">
                                                <div class="checkbox">
                                                   <input type="checkbox" value=""></input>
                                                </div>
                                             </div>
                                             <div className="d-flex mr-5">
                                                <p className="mb-0 font-size-14 text-white"><b>PS123-CVA_SUPER_PLAN</b></p>
                                             </div>
                                             <div className="d-flex mr-5">
                                                <div className="px-3 py-2 text-white bg-gray font-size-12 border-radius-5">Standard</div>
                                             </div>
                                             <div className="d-flex mr-5">
                                                <p className="mb-0 font-size-14 text-white">PRICE</p>
                                             </div>
                                             <div className="d-flex">
                                                <p className="mb-0 font-size-14 text-white">$2,600</p>
                                             </div>
                                          </div>
                                       </li> */}
                                    </ul>
                                    {/* <DataTable
                                       className=""
                                       title=""
                                       columns={portfolioTemplatesMasterColumn}
                                       data={portfolioTempMasterData}
                                       customStyles={customTableStyles}
                                       selectableRows
                                       onSelectedRowsChange={(state) => setPortfolioTempFilterMasterData(state.selectedRows)}
                                       pagination
                                    /> */}
                                    {/* {portfolioTempFlagIs === true ?
                                    <>
                                       <div className="m-2 text-right">
                                          <input
                                             onClick={() => {
                                                setSelectedPortfolioTempMasterData(portfolioTempFilterMasterData);
                                                setPortfolioTempMasterData([]);
                                             }}
                                             className="btn text-white bg-primary"
                                             value="+ Add Selected"
                                             disabled={!portfolioTempFlagIs}
                                          />
                                       </div>
                                    </> : <></>} */}
                                    <div className="m-2 text-right d-none">
                                       <input
                                          // onClick={() => {
                                          //    setSelectedPortfolioTempMasterData(portfolioTempFilterMasterData);
                                          //    setPortfolioTempMasterData([]);
                                          // }}
                                          onClick={handlePortfolioListCheckBoxData}
                                          className="btn text-white bg-primary"
                                          value="+ Add Selected"
                                          disabled={portfolioTempFilterMasterData.length == 0}
                                       />
                                    </div>
                                 </div>
                              </> : <></>
                           }
                        </>}

                     {selectedPortfolioTempMasterData.length > 0 ? (
                        <>
                           <div className="tableheader">
                              <ul class="submenu templateResultheading accordion mt-2" style={{ display: 'block' }}>
                                 <li><a className="cursor result">INCLUDED PORTFOLIO TEMPLATE</a></li>
                              </ul>
                              <div style={{ position: 'relative' }}>

                                 <div className="customtable-loader">
                                    {portfolioToSolutionProgress ?
                                       <>
                                          <LoadingProgress />
                                       </> : <></>}
                                 </div>
                                 <DataTable
                                    className="mt-3"
                                    title=""
                                    columns={SelectedPortfolioMasterDataColumn}
                                    data={selectedPortfolioTempMasterData}
                                    customStyles={customTableStyles}
                                    pagination
                                 />
                              </div>

                              <div className="m-2 text-right">
                                 {/* <div> */}
                                 {/* <button className="btn btn-primary w-100" onClick={handleTemplateItemSaveAndContinue}>Save & Continue</button> */}
                                 {/* </div> */}
                                 <input
                                    onClick={handleTemplateItemSaveAndContinue}
                                    className="btn text-white bg-primary"
                                    value="Save & Continue"
                                    disabled={portfolioToSolutionProgress}
                                 />
                              </div>
                           </div>
                        </>
                     ) : (
                        <></>
                     )}

                  </> : <></>}


                  {/* Solution Templates Search Result Master & Selected Data Starting */}

                  {solutionValue == 1 ?
                     <>
                        {solutionLoadingStatus === "01" ? ("loading") :
                           <>
                              {solutionTempMasterData.length > 0 ?
                                 <>
                                    {/* <div className="tableheader">
                                       <ul class="submenu accordion mt-0" style={{ display: 'block' }}>
                                          <li><a className="cursor result" >SOLUTION TEMPLATE RESULT</a></li>
                                       </ul>
                                       <DataTable
                                          className=""
                                          title=""
                                          columns={solutionTemplatesMasterColumn}
                                          data={solutionTempMasterData}
                                          customStyles={customTableStyles}
                                          pagination
                                       />
                                       <div className="m-2 text-right">
                                          <input
                                             // onClick={() => {

                                             //    setPortfolioTempMasterData([]);
                                             // }}
                                             onClick={handleTemplateItemSaveAndContinue}
                                             className="btn text-white bg-primary"
                                             value="+ Add Selected"
                                             disabled={!solutionTempFlagIs}
                                          />
                                       </div>
                                    </div> */}
                                    <div className="tableheader">
                                       <ul class="submenu selected-li border-custom templateResultheading accordion mt-0" style={{ display: 'block', borderTop: "none !important" }}>
                                          <li className="border-bottom">
                                             <div className="result py-4 px-3 font-size-14"><b>RESULTS</b></div>
                                          </li>
                                          {console.log("solutionTempMasterData =========== ", solutionTempMasterData)}
                                          {solutionTempMasterData.map((row, i) =>
                                             // <li key={i} className="border-bottom cursor " onClick={() => handleOnSolutionPortfolioResultRow(row.customPortfolioId)}>
                                             <li key={i} className="border-bottom cursor " onClick={() => handleOnSolutionPortfolioResultRow(row.portfolioId)}>
                                                {console.log("row ============ ", row)}
                                                <div className="d-flex align-items-center p-3">
                                                   <div className="d-flex mr-4">
                                                      <p className="mb-0 font-size-14"><b>{row.name}</b></p>
                                                   </div>
                                                   {/* <div className={`px-3 py-1 mr-4 text-white 
                                                      ${row.supportLevel == "STANDARD" ? "bg-green" :
                                                         row.supportLevel == "PREMIUM" ? "bg-yellow" :
                                                            row.supportLevel == "SUPERIOR" ? "bg-gray" : "text-bold"} font-size-12 border-radius-5`}>{row.supportLevel}
                                                   </div> */}
                                                   <div className={`px-3 py-1 mr-4 text-white 
                                                      ${row.version == "STANDARD" ? "bg-green" :
                                                         row.version == "PREMIUM" ? "bg-yellow" :
                                                            row.version == "SUPERIOR" ? "bg-gray" : "text-dark"} font-size-12 border-radius-5`}>{row.version}
                                                   </div>
                                                   <div className="d-flex mr-4">
                                                      <p className="mb-0 font-size-14">PRICE</p>
                                                   </div>
                                                   <div className="d-flex">
                                                      {/* <p className="mb-0 font-size-14 ">$2,000</p> */}
                                                      <p className="mb-0 font-size-14 ">${row.calculatedPrice}</p>
                                                   </div>
                                                </div>
                                             </li>
                                          )}
                                       </ul>

                                       <div className="m-2 text-right d-none">
                                          <input
                                             onClick={handlePortfolioListCheckBoxData}
                                             className="btn text-white bg-primary"
                                             value="+ Add Selected"
                                             disabled={solutionTempMasterData.length == 0}
                                          />
                                       </div>
                                    </div>
                                 </> : <></>
                              }
                           </>
                        }
                     </> : <></>}


               </div>
            </Modal.Body>
            {/* {solutionValue == 0 || solutionValue == 1 ? <>
               <Modal.Footer>
                  {(selectedPortfolioTempMasterData.length > 0 && solutionValue == 0) ?
                     <div>
                        <button className="btn btn-primary w-100" onClick={handleTemplateItemSaveAndContinue}>Save & Continue</button>
                     </div>
                     : <></>}
               </Modal.Footer>
            </> : <></>} */}

         </Modal>

      </>
   )
};
