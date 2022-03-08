import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import FormGroup from '@mui/material/FormGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import shearchIcon from '../../assets/icons/svg/search.svg'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import makeAnimated from 'react-select/animated';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as ENUM from './CONSTS.js';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { FileUploader } from "react-drag-drop-files";
import { MuiMenuComponent } from '../Operational/index'
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import { CommanComponents } from "../../components/index"
// import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


import DataTable from 'react-data-table-component';
import boxicon from '../../assets/icons/png/box.png'
import PartIcons from '../../assets/icons/png/PartIcons.png'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Portfoliosicon from '../../assets/icons/svg/Portfolios-icon.svg'
import Buttonarrow from '../../assets/icons/svg/Button-arrow.svg'
import contract from '../../assets/icons/svg/contract.svg'
import repairicon from '../../assets/icons/svg/repair-icon.svg'
import { SOLUTION_BUILDER_ANALYTICS } from 'navigation/CONSTANTS'



import {
    createPortfolio, getPortfolio,
    getMakeKeyValue, getModelKeyValue, getPrefixKeyValue,
    updatePortfolio, getUsageCategoryKeyValue, getTaskTypeKeyValue, getResponseTimeTaskKeyValue, getValidityKeyValue, getStrategyTaskKeyValue, getProductHierarchyKeyValue, getGergraphicKeyValue, getMachineTypeKeyValue, getTypeKeyValue
} from '../../services/index'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Button = () => <button type="button" className="btn bg-primary text-white"><span><img className='mr-2' src={PartIcons}></img></span>Build</button>;
const CustomTitle = ({ row }) => (
    <div>
        { }
        <div>{row.title}</div>
        <div>
            <div
                data-tag="allowRowEvents"
                style={{ color: 'grey', overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}
            >
                { }
                {row.plot}
            </div>
        </div>
    </div>
);
const animatedComponents = makeAnimated();

const data = [
    {
        id: 1,
        itemType: 'P-Parts',
        itemNumber: "All",
        specialPrice: "NA",
        discount: '5%',
        absoluteDiscount: "NA"
    },
    {
        id: 2,
        itemType: 'L-Labor',
        itemNumber: "P",
        specialPrice: "NA",
        discount: '50%',
        absoluteDiscount: "NA"
    },
    {
        id: 3,
        itemType: 'M-Misc',
        itemNumber: "P",
        specialPrice: "NA",
        discount: 'NA',
        absoluteDiscount: "$100"
    },
    {
        id: 4,
        itemType: 'A-All',
        itemNumber: "P",
        specialPrice: "$200",
        discount: 'NA',
        absoluteDiscount: "$5"
    },
]

const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            // backgroundColor: "#000"
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

const conditionalRowStyles = [
    {
        when: row => row.id >= 1,
        style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    }
];

var HTMLLi = React.createElement('li', { className: 'bar' }, 'foo');

const columns = [
    // {
    //   name: <><div>
    //     <div>
    //     <Checkbox {...label} />
    //   </div>
    //     </div></>,
    //   selector: row => row.title,
    //   sortable: true,
    //   maxWidth: '600px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
    //   cell: row => <CustomTitle row={row} />,
    // },
    {
        name: <><div><img className='mr-2' src={boxicon}></img>Bundle ID</div></>,
        selector: row => row.bundleId,
        sortable: true,
        maxWidth: '300px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        cell: row => row.bundleId,
    },
    {
        name: <><div><img className='mr-2' src={boxicon}></img>Bundle Description</div></>,
        selector: row => row.bundleDescription,
        wrap: true,
        sortable: true,
        format: row => row.bundleDescription,
    },
    {
        name: <><div>Strategy
        </div></>,
        selector: row => row.strategy,
        wrap: true,
        sortable: true,
        format: row => row.strategy,
    },
    {
        name: <><div>Standard Job Ids
        </div></>,
        selector: row => row.standardJobId,
        wrap: true,
        sortable: true,
        format: row => row.standardJobId,
    },
    {
        name: <><div>Frequency
        </div></>,
        selector: row => row.frequency,
        wrap: true,
        sortable: true,
        format: row => row.frequency,
    },
    {
        name: <><div>Qunatity
        </div></>,
        selector: row => row.quantity,
        wrap: true,
        sortable: true,
        format: row => row.quantity,
    },
    {
        name: <><div>Part $
        </div></>,
        selector: row => row.part,
        wrap: true,
        sortable: true,
        format: row => row.part
        ,
    },
    {
        name: <><div>Service $
        </div></>,
        selector: row => row.service,
        wrap: true,
        sortable: true,
        format: row => row.service
        ,
    },
    {
        name: <><div>Total $
        </div></>,
        selector: row => row.total,
        wrap: true,
        sortable: true,
        format: row => row.total
    },
    {
        name: <><div>Action
        </div></>,
        selector: row => row.action,
        wrap: true,
        sortable: true,
        format: row => row.action
    }

    // {
    //   name:<><div>Progress
    //   </div></>,
    //   selector: row => row.plot,
    //   wrap: true,
    //   sortable: true,
    //   format: row => `${row.plot.slice(0, 200)}...`,
    // },
    // {
    //   name:<><div>Status
    //   </div></>,
    //   selector: row => row.plot,
    //   wrap: true,
    //   sortable: true,
    //   format: row => `${row.plot.slice(0, 200)}...`,
    // },
    // {
    //   name:<><div>Consistency status
    //   </div></>,
    //   selector: row => row.plot,
    //   wrap: true,
    //   sortable: true,
    //   format: row => `${row.plot.slice(0, 200)}...`,
    // },
    // {
    //   name:<><div>Description
    //   </div></>,
    //   selector: row => row.plot,
    //   wrap: true,
    //   sortable: true,
    //   format: row => `${row.plot.slice(0, 200)}...`,
    // },
    // {
    //   name: 'Actions',

    //   cell: row => (
    //     <div>
    //       {row.genres.map((genre, i) => (
    //         <div key={i}>{genre}</div>
    //       ))}
    //     </div>
    //   ),
    // },
    // {
    //   name: 'Thumbnail',
    //   grow: 0,
    //   cell: row => <img height="84px" width="56px" alt={row.name} src={row.posterUrl} />,
    // },
    // {
    //   name: 'Poster Link',
    //   button: true,
    //   cell: row => (
    //     <a href={row.posterUrl} target="_blank" rel="noopener noreferrer">
    //       Download
    //     </a>
    //   ),
    // },
    // {
    //     name: 'Actions',
    //     button: true,
    //     cell: () => <Button>Download Poster</Button>,
    // },
];
const coverageFleetsColumns = [
    // {
    //   name: <><div>
    //     <div>
    //     <Checkbox {...label} />
    //   </div>
    //     </div></>,
    //   selector: row => row.title,
    //   sortable: true,
    //   maxWidth: '600px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
    //   cell: row => <CustomTitle row={row} />,
    // },
    {
        name: <><div><img className='mr-2' src={boxicon}></img>Fleet#</div></>,
        selector: row => row.fleet,
        sortable: true,
        maxWidth: '300px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        cell: row => row.fleet,
    },
    {
        name: <><div><img className='mr-2' src={boxicon}></img>Make</div></>,
        selector: row => row.make,
        wrap: true,
        sortable: true,
        format: row => row.make,
    },
    {
        name: <><div>Products
        </div></>,
        selector: row => row.products,
        wrap: true,
        sortable: true,
        format: row => row.products,
    },
    {
        name: <><div>Services
        </div></>,
        selector: row => row.services,
        wrap: true,
        sortable: true,
        format: row => row.services,
    },
    {
        name: <><div>Bundles
        </div></>,
        selector: row => row.bundles,
        wrap: true,
        sortable: true,
        format: row => row.bundles,
    },
    {
        name: <><div>Action
        </div></>,
        selector: row => row.action,
        wrap: true,
        sortable: true,
        format: row => row.action,
    }
];


export function CreatePortfolio() {

    const [makeKeyValue, setMakeKeyValue] = useState([])
    const [modelKeyValue, setModelKeyValue] = useState([])
    const [prefixKeyValue, setPrefixKeyValue] = useState([])
    const [validityKeyValue, setValidityKeyValue] = useState([])
    const [customerSegmentKeyValue, setCustomerSegmentKeyValue] = useState([])
    const [responseTimeTaskKeyValue, setResponseTimeTaskKeyValue] = useState([])
    const [strategyTaskKeyValue, setStrategyTaskKeyValue] = useState([])
    const [taskTypeKeyValue, setTaskTypeKeyValue] = useState([])
    const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState([])
    const [categoryUsageKeyValue, setCategoryUsageKeyValue] = useState([])
    const [productHierarchyKeyValue, setProductHierarchyKeyValue] = useState([])
    const [geographicKeyValue, setGeographicKeyValue] = useState([])
    const [typeKeyValue, setTypeKeyValue] = useState([])
    const [machineTypeKeyValue, setMachineTypeKeyValue] = useState([])
    const [age, setAge] = React.useState('5');
    const [isView, setIsView] = useState(false) //Use for show data into label format
    const [showExitPrompt, setShowExitPrompt] = useState(true);
    const [createNewBundle, setCreateNewBundle] = useState(false)
    const [openSearchSolution, setOpenSearchSolution] = useState(false)
    const [columnSearch, setColumnSearch] = useState(null)
    const [columnSearchKeyValue, setColumnSearchKeyValue] = useState([{ label: "Bundle", value: 'bundle' }, { label: "Service", value: 'service' }, { label: "Bundle Item", value: 'bundleItem' }])
    const [columnSearchText, setColumnSearchText] = useState('');
    const [openAddBundleItem, setOpenAddBundleItem] = useState(false)
    const [bundleItems, setBundleItems] = useState([])
    const [coverageItems, setCoverageItems] = useState([])
    const [showAddSolutionModal, setShowAddSolutionModal] = useState(false)
    const [showAvailableCoverage, setShowAvailableCoverage] = useState(false)
    const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("")


    const [coverageData, setCoverageData] = useState({
        make: '',
        modal: '',
        prefix: '',
        makeSelect: null,
        modelSelect: null,
        prefixSelect: null,
        machineComponent: null,
        machineType: null,
        marchineDate: new Date()

    })

    const [strategyData, setStrategyData] = useState({
        strategyTask: null,
        taskType: null,
        categoryUsage: null,
        options: null,
        responseTime: null,
        productHierarchy: null,
        geographic: null
    })

    const [validityData, setValidityData] = useState({
        fromDate: new Date(),
        toDate: new Date(),
        from: null,
        fromInput: "",
        to: null,
        toInput: ""
    })
    const [generalComponetData, setGeneralComponetData] = useState({
        portfolioName: "",
        description: "",
        serviceDescription: "",
        reference: "",
        customerSegment: null
    })
    const [newBundle, setNewBundle] = useState({
        serviceDescription: "",
        bundleFlag: "",
        reference: "",
        customerSegment: null,
        machineComponent: null
    })
    const [portfolioId, setPortfolioId] = useState(4);
    const [alignment, setAlignment] = React.useState('Portfolio');
    const [prefixLabelGeneral, setPrefixLabelGeneral] = useState("PORTFOLIO")
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const handleCustomerSegmentChange = (e) => {
        setGeneralComponetData({
            ...generalComponetData,
            customerSegment: e
        })
    }

    const handleShowAddSolution = () => {
        setShowAddSolutionModal(!showAddSolutionModal)
    }

    const handleCreateSolution = (event) => {
        if (event == 'bundle') {
            setCreateNewBundle(true)
            setOpenAddBundleItem(false)
            setOpenSearchSolution(false)
            setOpenAddBundleItemHeader("Add New Bundle Item")

        } else if (event == 'service') {
            setCreateNewBundle(false)
            setOpenSearchSolution(false)
            setOpenAddBundleItem(true)
            setOpenAddBundleItemHeader("Add New Service")
        } else if (event == 'bundleItem') {
            setCreateNewBundle(false)
            setOpenSearchSolution(false)
            setOpenAddBundleItem(true)
            setOpenAddBundleItemHeader("Add New Bundle Item")
        }
    }


    const handleChangeToggle = (event, newAlignment) => {
        setAlignment(newAlignment);
        setPrefixLabelGeneral(newAlignment.toUpperCase())
    };


    const handleColumnSearch = (e) => {
        setColumnSearch(e)
    }

    const handleBundleItemSaveAndContinue = () => {
        // alert("Save And Continue")
        var temp = [];
        var dict = {
            id: 1,
            bundleId: "PM125",
            bundleDescription: 'Preventive Maintenance 125',
            strategy: 'Preventive Maintenance',
            standardJobId: 'SJ1034',
            frequency: '125 hours',
            quantity: '4',
            part: '$1250',
            service: '$350',
            total: '$1575',
            action: "-"
        }
        temp.push(dict)
        setBundleItems(temp)
        setOpenAddBundleItem(false)
        setOpenSearchSolution(false)
        toast('👏 Item Added', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handleNewBundleItem = () => {
        setOpenAddBundleItem(true)
        setOpenSearchSolution(false)
        setCreateNewBundle(false)
        setOpenAddBundleItemHeader("Add New Bundle Item")
    }
    const handleCreateNewServiceBundle = () => {
        setCreateNewBundle(true)
        setOpenSearchSolution(false)
    }

    const handleDropdownChange = (type, e) => {
        if (type == ENUM.STRATEGY_TASK) {
            setStrategyData({
                ...strategyData,
                strategyTask: e
            })
            if (e == null) {
                setTaskTypeKeyValue([])
                setStrategyData({
                    ...strategyData,
                    taskType: null,
                    strategyTask: null
                })
            } else {
                const options = e.second.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setTaskTypeKeyValue(options)
            }
        } else if (type == ENUM.TASK_TYPE) {
            setStrategyData({
                ...strategyData,
                taskType: e
            })
        }
        else if (type == ENUM.CATEGORY_USAGE) {
            setStrategyData({
                ...strategyData,
                categoryUsage: e
            })
        } else if (type == ENUM.RESPONSE_TIME) {
            setStrategyData({
                ...strategyData,
                responseTime: e
            })
        }
        else if (type == ENUM.PRODUCT_HIERARCHY) {
            setStrategyData({
                ...strategyData,
                productHierarchy: e
            })
        } else if (type == ENUM.GEOGRAPHIC) {
            setStrategyData({
                ...strategyData,
                geographic: e
            })
        } else if (type == ENUM.MACHINE_COMPONENT) {
            setCoverageData({
                ...coverageData,
                machineComponent: e
            })
        } else if (type == ENUM.MACHINE_TYPE) {
            setCoverageData({
                ...coverageData,
                machineType: e
            })
        } else if (type == ENUM.MAKE) {
            setCoverageData({
                ...coverageData,
                makeSelect: e
            })
        } else if (type == ENUM.MODEL) {
            setCoverageData({
                ...coverageData,
                modelSelect: e
            })
        } else if (type == ENUM.PREFIX) {
            setCoverageData({
                ...coverageData,
                prefixSelect: e
            })
        }
    }
    const handleAddBundleDropdownChange = (type, e) => {
        if (type == ENUM.MACHINE_COMPONENT) {
            setNewBundle({
                ...newBundle,
                machineComponent: e
            })
        } else if (type == ENUM.MACHINE_TYPE) {
            setCoverageData({
                ...coverageData,
                machineType: e
            })
        }
    }

    const handleNextClick = () => {
        setValue(value + 1)
    }


    // const handleNextClick = (type) => {
    //     var request;
    //     if (type == 'CREATE') {
    //         if (portfolioId != null) {

    //         } else {
    //             request = {
    //                 "name": generalComponetData.portfolioName,
    //                 "description": generalComponetData.portfolioDescription,
    //                 "externalReference": generalComponetData.reference,
    //                 "machineType": "NEW",
    //                 "searchTerm": "",
    //                 "lubricant": false,
    //                 "strategyTask": "PREVENTIVE_MAINTENANCE",
    //                 "taskType": "PREVENTIVE_MAINTENANCE",
    //                 "usageCategory": "CONTRACT",
    //                 "productHierarchy": "END_PRODUCT",
    //                 "geographic": "END_PRODUCT",
    //                 "type": "MACHINE",
    //                 "items": [],
    //                 "coverages": [],
    //                 "saveState": false,
    //                 "userId": ""
    //             }
    //             const apiResponse = createPortfolio(request);
    //             console.log(apiResponse)
    //         }

    //     } else if (type == 'Update') {
    //         var tempValidFromMonth = ((validityData.fromDate.getMonth() + 1) + "").length > 1 ? (validityData.fromDate.getMonth() + 1) : "0" + (validityData.fromDate.getMonth() + 1)
    //         var tempValidToMonth = ((validityData.toDate.getMonth() + 1) + "").length > 1 ? (validityData.toDate.getMonth() + 1) : "0" + (validityData.toDate.getMonth() + 1)
    //         var tempValidFromDate = (validityData.fromDate.getDate() + "").length > 1 ? validityData.fromDate.getDate() : "0" + validityData.fromDate.getDate()
    //         var tempValidToDate = (validityData.toDate.getDate() + "").length > 1 ? validityData.toDate.getDate() : "0" + validityData.toDate.getDate()
    //         const tempValidFrom = validityData.fromDate.getFullYear() + "-" + tempValidFromMonth + "-" + tempValidFromDate;
    //         const tempValidTo = validityData.toDate.getFullYear() + "-" + tempValidToMonth + "-" + tempValidToDate;
    //         request = {
    //             "name": generalComponetData.portfolioName,
    //             "description": generalComponetData.portfolioDescription,
    //             "externalReference": generalComponetData.reference,
    //             "validFrom": tempValidFrom,
    //             "validTo": tempValidTo,
    //             "machineType": "NEW",
    //             "searchTerm": "",
    //             "lubricant": false,
    //             "strategyTask": "PREVENTIVE_MAINTENANCE",
    //             "taskType": "PREVENTIVE_MAINTENANCE",
    //             "usageCategory": "CONTRACT",
    //             "productHierarchy": "END_PRODUCT",
    //             "geographic": "END_PRODUCT",
    //             "type": "MACHINE",
    //             "items": [],
    //             "coverages": [],
    //             "saveState": false,
    //             "userId": ""
    //         }
    //         updatePortfolio(portfolioId, request).then((res) => {
    //             alert("Update Success")
    //             setValue(value + 1)
    //         })
    //             .catch((err) => {
    //                 alert(err)
    //             })
    //     }
    // }

    const handleGeneralInputChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        setGeneralComponetData({
            ...generalComponetData,
            [name]: value
        })
    }
    const handleAddBundleInputChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        setNewBundle({
            ...newBundle,
            [name]: value
        })
    }
    const handleCoverageInputChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        setCoverageData({
            ...coverageData,
            [name]: value
        })
    }

    const getPortfolioDetails = (portfolioId) => {
        // getAllUsers()
        //     .then((res) => {
        //         console.log("Dashboard > getAllUsers > res=", res);
        //         setUsers(res);
        //         setIsLoading(false);
        //     })
        //     .catch((err) => {
        //         console.log("axios err=", err);
        //         setUsers([]);
        //         setIsLoading(false);
        //     });



        if (portfolioId != null) {
            getPortfolio(portfolioId).then((res) => {
                const portfolioDetails = res
                console.log(portfolioDetails)
                if (portfolioDetails.portfolioId != null) {
                    setGeneralComponetData({
                        portfolioName: portfolioDetails.name,
                        portfolioDescription: portfolioDetails.description,
                        serviceProgramDescription: "",
                        reference: portfolioDetails.externalReference,
                        customerSegment: ""
                    })
                }
            })
                .catch((err) => {

                })

        }
    }

    const initFetch = () => {

        setCoverageItems([{
            id: 1,
            fleet: "Spare Part 1",
            make: 'P',
            products: '$20',
            services: '100%',
            bundles: '%',
            quantity: '4',
            part: '$1250',
            service: '$350',
            total: '$1575',
            action: "-"
        }])

        // setBundleItemTaskTypeKeyValue


        getTaskTypeKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value
            }));
            setBundleItemTaskTypeKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getPrefixKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value
            }));
            setPrefixKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getModelKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value
            }));
            setModelKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getMakeKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value
            }));
            setMakeKeyValue(options)
        }).catch((err) => {
            alert(err)
        })

        getValidityKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value
            }));
            setValidityKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getStrategyTaskKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value,
                second: d.nestedKeyValues
            }));
            setStrategyTaskKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getResponseTimeTaskKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value
            }));
            setResponseTimeTaskKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getUsageCategoryKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value,
            }));
            setCategoryUsageKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getProductHierarchyKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value,
            }));
            setProductHierarchyKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getGergraphicKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value,
            }));
            setGeographicKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getTypeKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value,
            }));
            setTypeKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
        getMachineTypeKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d.key,
                label: d.value,
            }));
            setMachineTypeKeyValue(options)
        }).catch((err) => {
            alert(err)
        })
    }

    useEffect(() => {
        const portfolioId = 4;
        getPortfolioDetails(portfolioId)
        initFetch()
    }, []);

    const initBeforeUnLoad = (showExitPrompt) => {
        window.onbeforeunload = (event) => {
            // Show prompt based on state
            if (showExitPrompt) {
                alert("Reload Lose Data")
                const e = event || window.event;
                e.preventDefault();
                if (e) {
                    e.returnValue = ''
                }
                return '';
            }
        };
    };

    window.onload = function () {
        // initBeforeUnLoad(showExitPrompt)
    };




    const handleChangedrop = (event) => {
        setAge(event.target.value);
    };
    const options = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);

    const [value, setValue] = React.useState(1);

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [openCoverage, setOpenCoveragetable] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClose1 = () => setOpen1(false);
    const handleCoveragetable = () => setOpenCoveragetable(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fileTypes = ["JPG", "PNG", "GIF"];


    const activityOptions = [
        'None',
        'Atria',
        'Callisto'
    ];

    const rows = [
        { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Inconsistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
        { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
        { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
        // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
        // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
        // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
        // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
        // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
        // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
    ];
    return (
        <>
            <CommanComponents />
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div className="container-fluid ">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h5 className="font-weight-600 mb-0">Portfolio and Bundles</h5>
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>

                        </div>
                    </div>
                    <div className="card p-4 mt-5">
                        <h5 className="d-flex align-items-center mb-0">
                            <div className="" style={{ display: 'contents' }}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><i className="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                            <div className="input-group icons border-radius-10 border">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                        <img src={shearchIcon} /></span>
                                </div>
                                <input type="search" className="form-control search-form-control" aria-label="Search Dashboard" />
                            </div>
                        </h5>
                        <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="General" value={1} />
                                        <Tab label="Validity " value={2} />
                                        <Tab label="Strategy" value={3} />
                                        <Tab label="Price" value={4} />
                                        <Tab label="Price Agreement" value={5} />
                                        <Tab label="Coverage" value={6} />

                                    </TabList>
                                </Box>
                                <TabPanel value={1}>
                                    <div className="row mt-4">
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" >SELECT TYPE</label>
                                                <div>
                                                    <ToggleButtonGroup
                                                        color="primary"
                                                        value={alignment}
                                                        exclusive
                                                        onChange={handleChangeToggle}
                                                    >
                                                        <ToggleButton value="Portfolio">Portfolio</ToggleButton>
                                                        <ToggleButton value="Program">Program</ToggleButton>
                                                    </ToggleButtonGroup>
                                                </div>

                                                {/* <input type="email" className="form-control border-radius-10" name="portfolioName" placeholder="Placeholder" value={generalComponetData.portfolioName} onChange={handleGeneralInputChange} /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" >{prefixLabelGeneral} DESCRIPTION</label>
                                                <input type="email" className="form-control border-radius-10" name="portfolioDescription" placeholder="Placeholder" value={generalComponetData.portfolioDescription} onChange={handleGeneralInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" >SERVICE {prefixLabelGeneral} DESCRIPTION (IF ANY)</label>
                                                <input type="email" className="form-control border-radius-10" name="serviceProgramDescription" placeholder="Placeholder" value={generalComponetData.serviceProgramDescription} onChange={handleGeneralInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" >REFERENCE</label>
                                                <input type="email" className="form-control border-radius-10" name="reference" placeholder="Placeholder" value={generalComponetData.reference} onChange={handleGeneralInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" >CUSTOMER SEGMENT</label>
                                                <Select
                                                    onChange={handleCustomerSegmentChange}
                                                    isClearable={true}
                                                    value={generalComponetData.customerSegment}
                                                    isLoading={customerSegmentKeyValue.length > 0 ? false : true}
                                                    options={customerSegmentKeyValue}
                                                    placeholder="Strategy Task"
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" name="customerSegment" placeholder="Placeholder" value={generalComponetData.customerSegment} onChange={handleGeneralInputChange} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ justifyContent: 'right' }}>
                                        <button type="button" onClick={handleNextClick} className="btn btn-light">Next</button>
                                    </div>
                                    {isView ?
                                        <div className="row mt-4">
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">PORTFOLIO ID</p>
                                                    <h6 className="font-weight-600">CVA - Premium plan</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">PORTFOLIO DESCRIPTION</p>
                                                    <h6 className="font-weight-600">Premium Customer Value Agreement D8T and D6T</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">SERVICE PROGRAM DESCRIPTION (IF ANY)</p>
                                                    <h6 className="font-weight-600">NA</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">REFERENCE</p>
                                                    <h6 className="font-weight-600">NA</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">CUSTOMER SEGMENT</p>
                                                    <h6 className="font-weight-600">Construction</h6>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <></>}

                                </TabPanel>
                                <TabPanel value={2}>
                                    <div className="row mt-4">
                                        <div className="col-md-6 col-sm-6">

                                            <div className="d-flex align-items-center">
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">FROM</label>
                                                <div className="form-group w-100">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <DatePicker
                                                            variant="inline"
                                                            className="form-control border-radius-10"
                                                            label=""
                                                            value={validityData.fromDate}
                                                            onChange={(e) => setValidityData({
                                                                ...validityData,
                                                                fromDate: e
                                                            })}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                    {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" /> */}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex align-items-center date-box w-100">
                                                            <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1"><span className="mr-2">FROM</span></label>
                                                            <div className="form-group w-100">
                                                                <div className=" d-flex form-control-date ">
                                                                    <Select className="select-input"
                                                                        value={validityData.from}
                                                                        onChange={(e) => setValidityData({
                                                                            ...validityData,
                                                                            from: e
                                                                        })}
                                                                        options={validityKeyValue}
                                                                        placeholder="Select "
                                                                    />
                                                                    <div>
                                                                        <input type="email" className="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" value={validityData.fromInput} onChange={(e) => setValidityData({
                                                                            ...validityData,
                                                                            fromInput: e.target.value
                                                                        })} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center date-box w-100">
                                                            <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1"><span className="">TO</span></label>
                                                            <div className="form-group w-100">
                                                                <div className=" d-flex form-control-date">
                                                                    <Select className="select-input"
                                                                        value={validityData.to}
                                                                        defaultValue={selectedOption}
                                                                        onChange={(e) => setValidityData({
                                                                            ...validityData,
                                                                            to: e
                                                                        })}
                                                                        options={validityKeyValue}
                                                                        placeholder="Select "
                                                                    />
                                                                    <div>
                                                                        <input type="email" className="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" value={validityData.toInput} onChange={(e) => setValidityData({
                                                                            ...validityData,
                                                                            toInput: e.target.value
                                                                        })} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">

                                        </div>
                                        {/* <div className="col-md-6 col-sm-6">
                                            <div className="d-flex align-items-center">
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">FROM</label>
                                                <div className="form-group w-100">
                                                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">HR</label>
                                                <div className="form-group w-100">
                                                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-12 col-sm-12">
                <div className="form-group">
                  <Link to={"/repairOption"} className="btn bg-primary text-white">
                 Next
                  </Link>
                </div>
                </div> */}
                                    </div>
                                    {/* <div className="row mt-4">
                                        <div className="col-md-6 col-sm-6">

                                            <div className="d-flex align-items-center">
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">DATE</label>
                                                <div className="form-group w-100 text-center">
                                                    <h6 className="font-weight-600 mb-0"><small className="mr-2">FROM</small>31st October 2021</h6>
                                                </div>
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">TO</label>
                                                <div className="form-group w-100">
                                                    <h6 className="font-weight-600 mb-0">30st October 2022</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">

                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="d-flex align-items-center">
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">FROM</label>
                                                <div className="form-group w-100 text-center">
                                                    <h6 className="font-weight-600 mb-0"><small className="mr-2">HOURS</small>10,000 hours</h6>
                                                </div>
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">HR</label>
                                                <div className="form-group w-100">
                                                    <h6 className="font-weight-600 mb-0">15,000 hours</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row" style={{ justifyContent: 'right' }}>
                                        <button type="button" onClick={handleNextClick} className="btn btn-light">Next</button>
                                    </div>
                                </TabPanel>
                                <TabPanel value={3}>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">STRATEGY TASK</label>
                                                <Select
                                                    onChange={(e) => handleDropdownChange(ENUM.STRATEGY_TASK, e)}
                                                    isClearable={true}
                                                    value={strategyData.strategyTask}
                                                    isLoading={strategyTaskKeyValue.length > 0 ? false : true}
                                                    options={strategyTaskKeyValue}
                                                    placeholder="Strategy Task"
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TASK TYPE</label>
                                                <Select
                                                    onChange={(e) => handleDropdownChange(ENUM.TASK_TYPE, e)}
                                                    isClearable={true}
                                                    value={strategyData.taskType}
                                                    isLoading={taskTypeKeyValue.length > 0 ? false : true}
                                                    options={taskTypeKeyValue}
                                                    placeholder="Task Type"
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CATEGORY USAGE</label>
                                                <Select
                                                    onChange={(e) => handleDropdownChange(ENUM.CATEGORY_USAGE, e)}
                                                    isClearable={true}
                                                    value={strategyData.categoryUsage}
                                                    isLoading={categoryUsageKeyValue.length > 0 ? false : true}
                                                    options={categoryUsageKeyValue}
                                                    placeholder="Category Usage"
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">OPTIONALS</label>
                                                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">RESPONSE TIME</label>
                                                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRODUCT HIERARCHY</label>
                                                <Select
                                                    onChange={(e) => handleDropdownChange(ENUM.PRODUCT_HIERARCHY, e)}
                                                    isClearable={true}
                                                    value={strategyData.productHierarchy}
                                                    isLoading={productHierarchyKeyValue.length > 0 ? false : true}
                                                    options={productHierarchyKeyValue}
                                                    placeholder="Product Hierarchy"
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">GEOGRAPHIC</label>
                                                <Select
                                                    onChange={(e) => handleDropdownChange(ENUM.GEOGRAPHIC, e)}
                                                    isClearable={true}
                                                    value={strategyData.geographic}
                                                    isLoading={geographicKeyValue.length > 0 ? false : true}
                                                    options={geographicKeyValue}
                                                    placeholder="Geographic"
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    {isView ?
                                        <div className="row">
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">STRATEGY TASK</p>
                                                    <h6 className="font-weight-600">PM</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">CATEGORY USAGE</p>
                                                    <h6 className="font-weight-600">Contract</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">OPTIONALS</p>
                                                    <h6 className="font-weight-600">Misc</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">RESPONSE TIME</p>
                                                    <h6 className="font-weight-600">Fast - 24x7 available,response within 4 hours of call</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">PRODUCT HIERARCHY</p>
                                                    <h6 className="font-weight-600">End Product</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">GEOGRAPHIC</p>
                                                    <h6 className="font-weight-600">Field Support</h6>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <></>}

                                    <div className="row" style={{ justifyContent: 'right' }}>
                                        <button type="button" onClick={() => setValue(value + 1)} className="btn btn-light">Next</button>
                                    </div>
                                </TabPanel>
                                <TabPanel value={4}>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE LIST</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE DATE</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <h6>PRICES</h6>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE TYPE</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE </label>
                                                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$100" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ADDITIONAL</label>
                                                <div className=" d-flex">
                                                    {/* <Select className="select-input"
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="placeholder "
                                                    /> */}
                                                    <div className="customselect customselectPortfolio">
                                                        <Select
                                                            onChange={setSelectedOption}
                                                            isClearable={true}
                                                            // value={options}
                                                            options={options}
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                    <input type="email" className="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="10%" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE ESCALATON</label>
                                                <div className=" d-flex">
                                                    <Select className="select-input"
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="placeholder "
                                                    />
                                                    <input type="email" className="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="20%" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CALCULATED PRICE</label>
                                                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$100" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE BREAK DOWN</label>
                                                <div className=" d-flex">
                                                    <Select className="select-input"
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="placeholder "
                                                    />
                                                    <input type="email" className="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="20%" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE BREAK DOWN</label>
                                                <div className=" d-flex">
                                                    <Select className="select-input"
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="placeholder "
                                                    />
                                                    <input type="email" className="form-control rounded-top-left-0 rounded-bottom-left-0" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="20%" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ justifyContent: 'right' }}>
                                        <button type="button" onClick={() => setValue(value + 1)} className="btn btn-light">Next</button>
                                    </div>
                                </TabPanel>

                                <TabPanel value={5}>
                                    <div className="card border">
                                        <div className="d-flex align-items-center justify-content-between px-3">
                                            <div className="">
                                                <div className="d-flex ">
                                                    <h5 className=" mb-0"><span>Price Agreement</span></h5>
                                                    <p className=" mb-0">
                                                        <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                                                        <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center ">
                                                <div className=" text-center border-left py-4 pl-3">
                                                    <a href="#" className=" ">+ Add</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
                                            <DataTable title="" columns={columns} data={data} customStyles={customStyles} pagination selectableRows />
                                        </div>
                                    </div>
                                    <div className="row" style={{ justifyContent: 'right' }}>
                                        <button type="button" onClick={() => setValue(value + 1)} className="btn btn-light">Next</button>
                                    </div>
                                </TabPanel>
                                <TabPanel value={6}>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" >MAKE</label>
                                                {makeKeyValue.length > 0
                                                    ?
                                                    <Select
                                                        onChange={(e) => handleDropdownChange(ENUM.MAKE, e)}
                                                        isClearable={true}
                                                        value={coverageData.makeSelect}
                                                        isLoading={makeKeyValue.length > 0 ? false : true}
                                                        options={makeKeyValue}
                                                    />
                                                    :
                                                    <input type="email" className="form-control border-radius-10" name="make" placeholder="" value={coverageData.make} onChange={handleCoverageInputChange} />
                                                }

                                                {/* <input type="email" className="form-control border-radius-10" name="make" placeholder="" value={coverageData.make} onChange={handleCoverageInputChange} /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" >MODEL(S)</label>
                                                {/* <Select
                                                    onChange={(e) => handleDropdownChange(ENUM.MACHINE_COMPONENT, e)}
                                                    isClearable={true}
                                                    value={coverageData.machineComponent}
                                                    isLoading={typeKeyValue.length > 0 ? false : true}
                                                    options={typeKeyValue}
                                                /> */}
                                                {modelKeyValue.length > 0
                                                    ?
                                                    <Select
                                                        onChange={(e) => handleDropdownChange(ENUM.MODEL, e)}
                                                        isClearable={true}
                                                        value={coverageData.modelSelect}
                                                        isLoading={modelKeyValue.length > 0 ? false : true}
                                                        options={modelKeyValue}
                                                    />
                                                    :
                                                    <input type="email" className="form-control border-radius-10" name="modal" placeholder="" value={coverageData.modal} onChange={handleCoverageInputChange} />
                                                }

                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" >PREFIX(S)</label>
                                                {prefixKeyValue.length > 0
                                                    ?
                                                    <Select
                                                        onChange={(e) => handleDropdownChange(ENUM.PREFIX, e)}
                                                        isClearable={true}
                                                        value={coverageData.prefixSelect}
                                                        isLoading={prefixKeyValue.length > 0 ? false : true}
                                                        options={prefixKeyValue}
                                                    />
                                                    :
                                                    <input type="email" className="form-control border-radius-10" name="prefix" placeholder="" value={coverageData.prefix} onChange={handleCoverageInputChange} />
                                                }

                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MACHINE/COMPOMENT</label>
                                                <Select
                                                    onChange={(e) => handleDropdownChange(ENUM.MACHINE_COMPONENT, e)}
                                                    isClearable={true}
                                                    value={coverageData.machineComponent}
                                                    isLoading={typeKeyValue.length > 0 ? false : true}
                                                    options={typeKeyValue}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MACHINE TYPE</label>
                                                <Select
                                                    onChange={(e) => handleDropdownChange(ENUM.MACHINE_TYPE, e)}
                                                    isClearable={true}
                                                    value={coverageData.machineType}
                                                    isLoading={machineTypeKeyValue.length > 0 ? false : true}
                                                    options={machineTypeKeyValue}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4 col-sm-4"> */}
                                        {/* <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">COVERAGE DATA</label>
                                            </div> */}
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">COVERAGE DATA</label>
                                                <h6 >Coverage123<span className="ml-3 cursor" onClick={() => setShowAvailableCoverage(true)}><i className="fa fa-external-link"></i></span></h6>
                                            </div>
                                        </div>
                                        {/* <a href="#" className="btn btn-primary w-100" onClick={() => setShowAvailableCoverage(true)}> Create New</a> */}
                                        {/* </div> */}
                                    </div>

                                    {isView ?
                                        <div className="row">
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">MAKE</p>
                                                    <h6 className="font-weight-600">Caterpillar</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">MODEL(S)</p>
                                                    <h6 className="font-weight-600">D8T,D6T</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">PREFIX(S)</p>
                                                    <h6 className="font-weight-600">MBB</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">MACHINE/COMPOMENT</p>
                                                    <h6 className="font-weight-600">Machine</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">MACHINE TYPE</p>
                                                    <h6 className="font-weight-600">New</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">MACHINE DATE</p>
                                                    <h6 className="font-weight-600">Coverrage123</h6>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <></>}

                                </TabPanel>

                            </TabContext>
                        </Box>

                    </div>
                    <div className="card mt-5">
                        <div className="fileheader p-4 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="font-weight-600 text-light mb-0">Bundle Items<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                            <h6 className="font-weight-600 text-light mb-0 cursor" onClick={handleShowAddSolution}><span className="mr-2">+</span>Add Solution</h6>
                            {/* <h6 className="font-weight-600 text-light mb-0 cursor" onClick={() => setOpenSearchSolution(true)}><span className="mr-2">+</span>Add Solution</h6> */}
                        </div>
                        {bundleItems.length > 0 ?
                            <div>
                                {/* <div className="row align-items-center">
                                    <div className="col-4">
                                        <div className="d-flex align-items-center pl-2">
                                            <h6 className="mr-2 mb-0 font-size-12"><span>Repair Option</span></h6>
                                            <p className="mb-0">Version 1</p>
                                            <p className="ml-2 mb-0">
                                                <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                                                <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="d-flex align-items-center" style={{ background: '#F9F9F9', padding: '5px 10px 5px 35px', borderRadius: '10px' }}>
                                            <div className="search-icon1 mr-2" style={{ lineHeight: '24px' }}>
                                                <img src={searchstatusIcon}></img>
                                            </div>
                                            <div className=" mx-2">
                                                <div className="machine-drop">
                                                    <FormControl className="" sx={{ m: 1, }}>
                                                        <Select
                                                            id="demo-simple-select-autowidth"
                                                            value={age}
                                                            onChange={handleChangedrop}
                                                            autoWidth
                                                        >
                                                            <MenuItem value="5">
                                                                <em>Engine</em>
                                                            </MenuItem>
                                                            <MenuItem value={10}>Twenty</MenuItem>
                                                            <MenuItem value={21}>Twenty one</MenuItem>
                                                            <MenuItem value={22}>Twenty one and a half</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-3  text-right">
                                        <div className="">
                                            <a href="#" className="border-left  btn">+ Add Part</a>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="custom-table  card " style={{ height: 400, width: '100%' }}>
                                    <DataTable title="" columns={columns} data={bundleItems} customStyles={customStyles} pagination />
                                </div>
                            </div>
                            :
                            <div className="p-4  row">
                                <div className="col-md-6 col-sm-6" onClick={handleNewBundleItem}>
                                    <a href="#" className="add-new-recod">
                                        <div>
                                            <FontAwesomeIcon icon={faPlus} />
                                            <p className="font-weight-600">Add new record</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="add-new-recod">

                                        <div>
                                            <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                            <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                            <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                                            <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }


                    </div>
                </div>
            </div>
            <Modal show={open1} onHide={handleClose1} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body className="">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h5 className="font-weight-600 mb-0">Coverage</h5>
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>

                        </div>
                    </div>
                    <div className="card mt-4">
                        <div className="fileheader border-bottom d-flex align-items-center justify-content-between">
                            <h6 className="font-weight-600 text-light mb-0 ml-3">Table Name<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                            <div>
                                <a href="#" className="btn">+Add</a>
                            </div>
                        </div>
                        <div className="p-4  row">
                            <div className="col-md-6 col-sm-6">
                                <a href="#" className="add-new-recod">
                                    <div>
                                        <FontAwesomeIcon icon={faPlus} />
                                        <p className="font-weight-600">Add new record</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="add-new-recod">

                                    <div>
                                        <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                        <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                        <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                                        <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showAvailableCoverage} onHide={() => setShowAvailableCoverage(!showAvailableCoverage)} size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body className="">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h5 className="font-weight-600 mb-0">Coverage</h5>
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>

                        </div>
                    </div>
                    <div className="card mt-4">
                        <div className="fileheader border-bottom d-flex align-items-center justify-content-between">
                            <h6 className="font-weight-600 text-light mb-0 ml-3">Fleets<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                            <div>
                                <a href="#" className="btn">+Add</a>
                            </div>
                        </div>
                        <div className="custom-table  card " style={{ height: 400, width: '100%' }}>
                            <DataTable title="" columns={coverageFleetsColumns} data={coverageItems} customStyles={customStyles} pagination />
                        </div>
                        {/* <div className="p-4  row">
                            <div className="col-md-6 col-sm-6">
                                <a href="#" className="add-new-recod">
                                    <div>
                                        <FontAwesomeIcon icon={faPlus} />
                                        <p className="font-weight-600">Add new record</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="add-new-recod">

                                    <div>
                                        <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                        <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                        <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                                        <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={open} onHide={handleClose} size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Import Files</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="p-3">
                        <div className="add-new-recod">
                            <div>
                                <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                            </div>
                        </div>
                        <p className="mt-3">Single upload file should not be more than 10MB. Only the  .xls, .xlsx file types are allowed</p>
                    </div>
                    <div className="recent-div p-3">
                        <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                        <div className="recent-items mt-3">
                            <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Engine Partlist</span></p>
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
                            <p className="font-size-12 mb-0">Part List </p>
                        </div>
                        <div className="recent-items mt-3">
                            <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Engine Partlist</span></p>
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
                            <p className="font-size-12 mb-0">Part List </p>
                        </div>
                    </div>


                </Modal.Body>
                <div className="row m-0 p-3">
                    <div className="col-md-6 col-sm-6">
                        <button className="btn border w-100 bg-white" onClick={handleClose}>Cancel</button>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <button className="btn btn-primary w-100" onClick={() => setOpenCoveragetable(true)} style={{ cursor: 'pointer' }}><FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />Upload</button>
                    </div>
                </div>


            </Modal>
            <Modal show={openCoverage} onHide={handleCoveragetable} size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Body className="">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h5 className="font-weight-600 mb-0">Coverage</h5>
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>

                        </div>
                    </div>
                    <div className="card px-4 pb-4 mt-5 pt-0">
                        <div className="row align-items-center">
                            <div className="col-3">
                                <div className="d-flex ">
                                    <h5 className=" mb-0"><span>Coverage123</span></h5>
                                    <p className=" mb-0">
                                        <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                                        <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="d-flex align-items-center" style={{ background: '#F9F9F9', padding: '10px 15px', borderRadius: '10px' }}>
                                    <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                                        <img src={searchstatusIcon}></img>
                                    </div>
                                    <div className="w-100 mx-2">
                                        <div className="machine-drop d-flex align-items-center">
                                            <div><lable className="label-div">Machine</lable></div>
                                            <FormControl className="" sx={{ m: 1, }}>
                                                <Select
                                                    id="demo-simple-select-autowidth"
                                                    value={age}
                                                    onChange={handleChangedrop}
                                                    autoWidth
                                                >
                                                    <MenuItem value="5">
                                                        <em>Engine</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Twenty</MenuItem>
                                                    <MenuItem value={21}>Twenty one</MenuItem>
                                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-4">
                                <div className="d-flex align-items-center">
                                    <div className="col-7 text-center">
                                        <a href="#" className="p-1 more-btn">+ 3 more
                                            <span className="c-btn">C</span>
                                            <span className="b-btn">B</span>
                                            <span className="a-btn">A</span>
                                        </a>
                                    </div>
                                    <div className="col-5 text-center border-left py-4">
                                        <a href="#" className=" ">+ Add Part</a>
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


                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={openSearchSolution} onHide={() => setOpenSearchSolution(false)} size="xl"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className="">
                    Search Solution
                    <div className="maintableheader bg-white mt-3 border-radius-10">
                        <div className="d-flex justify-content-between align-items-center pl-2">
                            <div className="d-flex align-items-center">
                                <div className="customselect d-flex ml-3">
                                    <span>
                                        <a href="#" className="btn-sm">+</a>
                                    </span>
                                    <Select
                                        onChange={handleColumnSearch}
                                        isClearable={true}
                                        value={columnSearch}
                                        options={columnSearchKeyValue}
                                        placeholder="Add by"
                                    />
                                    {columnSearch != null
                                        ?
                                        <input type="email" class="" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter text" style={{ border: 'none', background: 'transparent', width: '80px', fontWeight: '600', paddingLeft: '10px' }} value={columnSearchText} onChange={(e) => setColumnSearchText(e.target.value)}></input>
                                        : <></>
                                    }
                                </div>

                            </div>
                            <div>
                                <div className="">
                                    <a href="#" style={{ cursor: 'pointer' }} className="btn border-left"><span>+</span> Add</a>
                                    <a href="#" className="btn border-left">Cancel</a>
                                </div>
                            </div>
                        </div>
                        {columnSearchText.trim() != ""
                            ?
                            <div className="tableheader">
                                <ul class="submenu accordion mt-0" style={{ display: 'block' }}>
                                    <li><a className="cursor" className="result">RESULTS</a></li>
                                    <li><a className="cursor" onClick={handleBundleItemSaveAndContinue}>PM125</a></li>
                                    <li><a className="cursor" onClick={handleBundleItemSaveAndContinue}>PM2</a></li>
                                    <li><a className="cursor" onClick={handleCreateNewServiceBundle} className="lastOption text-violet"><span className="mr-2">+</span>Create New Service Bundle</a></li>
                                </ul>
                            </div>
                            :
                            <></>}
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={createNewBundle} onHide={() => setCreateNewBundle(false)} size="xl"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className="">
                    <div className="container-fluid ">
                        <div className="d-flex align-items-center justify-content-between mt-2">
                            <h5 className="font-weight-600 mb-0">Add Bundle</h5>
                            <div className="d-flex justify-content-center align-items-center">
                                <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                                <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                                <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                                <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                                <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                                <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                                <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>

                            </div>
                        </div>
                        <div className="card p-4 mt-5">
                            <h5 className="d-flex align-items-center mb-0">
                                <div className="" style={{ display: 'contents' }}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i className="fa fa-pencil" aria-hidden="true"></i></a>
                                    <a href="#" className="btn-sm"><i className="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                    <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                                <div className="input-group icons border-radius-10 border">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                            <img src={shearchIcon} /></span>
                                    </div>
                                    <input type="search" className="form-control search-form-control" aria-label="Search Dashboard" />
                                </div>
                            </h5>
                            <div className="row mt-4">
                                <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500" >PORTFOLIO ID</label>
                                        <input type="email" className="form-control border-radius-10" name="portfolioName" placeholder="Placeholder" value={generalComponetData.portfolioName} onChange={handleGeneralInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500" >PORTFOLIO DESCRIPTION</label>
                                        <input type="email" className="form-control border-radius-10" name="portfolioDescription" placeholder="Placeholder" value={generalComponetData.portfolioDescription} onChange={handleGeneralInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500" >SERVICE PROGRAM DESCRIPTION (IF ANY)</label>
                                        <input type="email" className="form-control border-radius-10" name="serviceProgramDescription" placeholder="Placeholder" value={generalComponetData.serviceProgramDescription} onChange={handleGeneralInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500" >REFERENCE</label>
                                        <input type="email" className="form-control border-radius-10" name="reference" placeholder="Placeholder" value={generalComponetData.reference} onChange={handleGeneralInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500" >CUSTOMER SEGMENT</label>
                                        <input type="email" className="form-control border-radius-10" name="customerSegment" placeholder="Placeholder" value={generalComponetData.customerSegment} onChange={handleGeneralInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ justifyContent: 'right' }}>
                                <button type="button" className="btn btn-light">Save</button>
                            </div>
                            {isView ?
                                <div className="row mt-4">
                                    <div className="col-md-4 col-sm-3">
                                        <div className="form-group">
                                            <p className="font-size-12 font-weight-500 mb-2">PORTFOLIO ID</p>
                                            <h6 className="font-weight-600">CVA - Premium plan</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-3">
                                        <div className="form-group">
                                            <p className="font-size-12 font-weight-500 mb-2">PORTFOLIO DESCRIPTION</p>
                                            <h6 className="font-weight-600">Premium Customer Value Agreement D8T and D6T</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-3">
                                        <div className="form-group">
                                            <p className="font-size-12 font-weight-500 mb-2">SERVICE PROGRAM DESCRIPTION (IF ANY)</p>
                                            <h6 className="font-weight-600">NA</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-3">
                                        <div className="form-group">
                                            <p className="font-size-12 font-weight-500 mb-2">REFERENCE</p>
                                            <h6 className="font-weight-600">NA</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-3">
                                        <div className="form-group">
                                            <p className="font-size-12 font-weight-500 mb-2">CUSTOMER SEGMENT</p>
                                            <h6 className="font-weight-600">Construction</h6>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>}

                        </div>
                        <div className="card mt-5">
                            <div className="fileheader p-4 border-bottom d-flex justify-content-between align-items-center">
                                <h6 className="font-weight-600 text-light mb-0">Bundle Items<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                            </div>
                            <div className="p-4  row">
                                <div className="col-md-6 col-sm-6">
                                    <a href="#" className="add-new-recod" onClick={handleNewBundleItem}>
                                        <div>
                                            <FontAwesomeIcon icon={faPlus} />
                                            <p className="font-weight-600">Add new record</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="add-new-recod">

                                        <div>
                                            <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                            <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                            <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                                            <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={openAddBundleItem} onHide={() => setOpenAddBundleItem(false)} size="xl"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className="">
                    {openAddBundleItemHeader}
                    <Modal.Body className="p-0 bg-white">
                        <div className="ligt-greey-bg p-3">
                            <div>
                                <span className="mr-3">
                                    <i class="fa fa-pencil font-size-12" aria-hidden="true"></i><span className="ml-2">Edit</span>
                                </span>
                                <span className="mr-3">
                                    < MonetizationOnOutlinedIcon className=" font-size-16" />
                                    <span className="ml-2"> Adjudt price</span>
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
                        <div className="px-3">
                            {/* <Box className="" sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={1}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="General" value="1" />
                                            <Tab label="Price " value="2" disabled />

                                        </TabList>
                                    </Box>
                                    <TabPanel value="1"> */}
                            <div>
                                <a href="#" className="btn-sm border" onClick={() => setOpenAddBundleItem(false)}>Cancel</a>
                                <a href="#" className="btn-sm bg-primary text-white ml-3" onClick={handleBundleItemSaveAndContinue}>Save & Continue</a>
                            </div>
                            <p className="mt-4">SUMMARY</p>
                            <div class="row mt-4">
                                <div className="col-md-6 col-sm-6">
                                    <div class="form-group w-100">
                                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOLUTION ID</label>
                                        <input type="email" class="form-control border-radius-10" disabled id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(AUTO GENERATE)" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div class="form-group w-100">
                                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOLUTION DESCRIPTION</label>
                                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Replace Cranskshaft" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div class="form-group w-100">
                                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">USAGE IN</label>
                                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Overhaul" />
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4">STRATEGY</p>
                            <div class="row mt-4">
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">TASK TYPE</label>
                                        <div className="icon-defold">
                                            <div className="form-control">
                                                <Select
                                                    // defaultValue={selectedOption}
                                                    // onChange={setSelectedOption}
                                                    options={bundleItemTaskTypeKeyValue}
                                                    placeholder="Select Or Search"
                                                />
                                                <span className="search-icon searchIcon"><SearchOutlinedIcon className="font-size-16" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">FREQUENCY</label>
                                        <div className="icon-defold">
                                            <div className="form-control">
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="Cyclical"
                                                />
                                                <span className="search-icon searchIcon"><SearchOutlinedIcon className="font-size-16" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">TIME/HOURS</label>
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                            placeholder="HOURS"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">VALUE</label>
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                            placeholder="250"
                                        />
                                    </div>
                                </div>

                            </div>
                            {/* <div className="text-right">
                                <a href="#" className="btn-sm border mr-3" onClick={() => setOpenAddBundleItem(true)} style={{ cursor: 'pointer' }}>Review</a>
                                <a href="#" className="btn-sm bg-primary text-white" onClick={() => setOpen1(true)} style={{ cursor: 'pointer' }} >Copy to Solution</a>
                            </div> */}

                            {/* </TabPanel>
                                    <TabPanel value="2">
                                        <p>Data not found</p>
                                    </TabPanel>
                                </TabContext>
                            </Box> */}
                        </div>
                    </Modal.Body>
                </Modal.Body>
            </Modal>

            <Modal show={showAddSolutionModal} onHide={handleShowAddSolution} size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
                <Modal.Body>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div><h5 class="">Choose what solution you want to build</h5></div>
                        {/* <div>
                        <a href='#' className='btn border-light font-weight-500 bg-light-grey font-size-18'>Explore available solution</a>
                    </div> */}
                    </div>
                    <div className='card mt-4 p-4'>
                        <div className='row'>
                            <div className='col-md-6 my-3 '>
                                <div className='d-flex'>
                                    <div className='mr-2'><img src={Portfoliosicon}></img></div>
                                    <div>
                                        <h5 className='text-light'>Bundle</h5>
                                        <p><b>You build Bundle here. </b>
                                            Examples of Portfolios are Premium Maintenance Plan, Value added plan etc. A service program is a marketing or product improvement program.
                                        </p>
                                        <div className=''>
                                            <a onClick={() => handleCreateSolution("bundle")} className='btn bg-primary text-white cursor'>Create <img className='ml-2' src={Buttonarrow}></img></a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 my-3'>
                                <div className='d-flex'>
                                    <div className='mr-2'><img src={contract}></img></div>
                                    <div>
                                        <h5 className='text-light'>Service</h5>
                                        <p><b>You build Service & maintenance solutions for your customer segment here. </b>
                                            Examples of pre-built template are Level I contracts like subscriptions or Level IV contract for Total Maintenance and Repair.
                                        </p>
                                        <div className=''>
                                            <a onClick={() => handleCreateSolution("service")} className='btn bg-primary text-white cursor'>Create <img className='ml-2' src={Buttonarrow}></img></a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 my-3'>
                                <div className='d-flex'>
                                    <div className='mr-2'><img src={repairicon}></img></div>
                                    <div>
                                        <h5 className='text-light'>Bundle Item</h5>
                                        <p><b>You build Bundle Item here. </b>
                                            Examples of repair solutions are complex engine overhaul, engine reconditioning, componenet replacment , assembly of comlex
                                        </p>
                                        <div className=''>
                                            <a onClick={() => handleCreateSolution("bundleItem")} className='btn bg-primary text-white cursor'>Create <img className='ml-2' src={Buttonarrow}></img></a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            <ToastContainer />
        </>

    )
}
