import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import { TabList, TabPanel } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Tooltip from "@mui/material/Tooltip";

import { Link } from "react-router-dom";
import { Modal, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";

import DataTable from "react-data-table-component";
import Select from "react-select";

import SearchBox from "../../../Repair/components/SearchBox";
import shareIcon from "../../../../assets/icons/svg/share.svg";
import folderaddIcon from "../../../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../../../assets/icons/svg/upload.svg";
import cpqIcon from "../../../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../../../assets/icons/svg/delete.svg";
import copyIcon from "../../../../assets/icons/svg/Copy.svg";
import editIcon from "../../../../assets/icons/svg/edit.svg";
import searchstatusIcon from "../../../../assets/icons/svg/search-status.svg";
import boxicon from "../../../../assets/icons/png/box.png";
import deleticon from "../../../../assets/images/delete.png";
import link1Icon from "../../../../assets/images/link1.png";
import penIcon from "../../../../assets/images/pen.png";

import { MuiMenuComponent } from "../../../Operational/index";
import PortfolioCoverageSearch from "../PortfolioCoverageSearch";
import ItemAddEdit from "./ItemAddEdit";

import { isEmpty } from "../utilities/textUtilities";
import ItemPriceCalculator from "./ItemPriceCalculator";
import { useDispatch, useSelector } from "react-redux";
import ExpendBundleServiceItem from "./ExpendBundleServiceItem";

import InclusionExclusionModal from "../common/InclusionExclusionModal";
import { API_SUCCESS } from "services/ResponseCode";
import { errorMessage, successMessage } from "../utilities/toastMessage";
import {
  callDeleteApi, callGetApi, callPostApi, callPutApi,
} from "services/ApiCaller";
import {
  CREATE_PORTFOLIO_ITEM, LINK_ITEM_TO_PORTFOLIO, PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE,
} from "services/CONSTANTS";
import { updateItemPriceSjRkId } from "./SJRKIdUpdate";
import BundleServiceAddUpdate from "../BundleServiceAddUpdate";
import {
  additionalPriceKeyValuePair, dataTableCustomStyle, discountTypeKeyValuePair,
  usageTypeKeyValuePair, defaultItemHeaderObj, defaultItemBodyObj,
} from "pages/Common/PortfolioAndSolutionConstants";

const fileTypes = ["JPG", "PNG", "GIF"];
const menuComponentOptions = ["Create Versions", "Show Errors", "Review"];
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const coverageRowData = [
  {
    id: 1,
    GroupNumber: "Snow",
    Type: "Jon",
    Partnumber: 35,
    PriceExtended: "pending",
    Pricecurrency: "Open",
    Usage: "Inconsistent",
    TotalPrice: "Inconsistent",
    Comments: "Inconsistent",
    Actions: "Inconsistent",
  },
  {
    id: 2,
    GroupNumber: "Lannister",
    Type: "Cersei",
    Partnumber: 42,
    PriceExtended: "pending",
    Pricecurrency: "Open",
    Usage: "Consistent",
    TotalPrice: "Inconsistent",
    Comments: "Inconsistent",
    Actions: "Inconsistent",
  },
  {
    id: 3,
    GroupNumber: "Lannister",
    Type: "Jaime",
    Partnumber: 45,
    PriceExtended: "pending",
    Pricecurrency: "Open",
    Usage: "Consistent",
    TotalPrice: "Inconsistent",
    Comments: "Inconsistent",
    Actions: "Inconsistent",
  },
];

const coverageColumns = [
  {
    name: (
      <div>
        {" "}
        <Checkbox className="text-white" {...label} />
      </div>
    ),
    selector: (row) => row.standardJobId,
    wrap: true,
    sortable: true,
    maxWidth: "300px",
    cell: (row) => <Checkbox className="text-black" />,
  },
  {
    name: <div>Make</div>,
    selector: (row) => row.make,
    wrap: true,
    sortable: true,
    format: (row) => row.make,
  },
  {
    name: <div>Family</div>,
    selector: (row) => row.family,
    wrap: true,
    sortable: true,
    format: (row) => row.family,
  },
  {
    name: <div>Model</div>,
    selector: (row) => row.modelDescription,
    wrap: true,
    sortable: true,
    format: (row) => row.modelDescription,
  },
  {
    name: <div>Prefix</div>,
    selector: (row) => row.prefix,
    wrap: true,
    sortable: true,
    format: (row) => row.prefix,
  },
  {
    name: <div>Serial No</div>,
    selector: (row) => row.bundleId,
    sortable: true,
    maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
    format: (row) => row.bundleId,
  },
  {
    name: (
      <div>
        <img className="mr-2" src={boxicon} alt="startSerailNo" />
        Start Serial No
      </div>
    ),
    selector: (row) => row.bundleDescription,
    wrap: true,
    sortable: true,
    format: (row) => row.bundleDescription,
  },
  {
    name: <div>End Serial No</div>,
    selector: (row) => row.strategy,
    wrap: true,
    sortable: true,
    format: (row) => row.strategy,
  },
  {
    name: <div>Action</div>,
    selector: (row) => row.action,
    wrap: true,
    sortable: true,
    format: (row) => row.action,
    cell: (row) => (
      <div>
        <img className="mr-2" src={penIcon} />
        <img className="mr-2" src={deleticon} />
        <img src={link1Icon} />
      </div>
    ),
  },
];

const PortfolioItemsList = (props) => {
  const {
    componentDataTabShow, portfolioRecordId, itemsList, setPortfolioItemsList, portfolioItemsIds,
    setPortfolioItemsIds, showOptionalServicesModal, handleOptionalServiceModal, checkedService,
    setCheckedService, selectedService, setSelectedService, handleUpdatePortfolio,
  } = props;

  const {
    supportLevelKeyValuePair, portfolioStatusKeyValuePair, customerSegmentKeyValuePair, machineComponentKeyValuePair,
    priceMethodKeyValuePair, priceTypeKeyValuePair, priceHeadTypeKeyValuePair, currencyKeyValuePair, frequencyKeyValuePairs, unitKeyValuePairs,
    ...newdataResponse
  } = useSelector((state) => state.commonAPIReducer);

  const dispatch = useDispatch();
  const [showDragAndDropModal, setShowDragAndDropModal] = useState(false);
  const [uploadFileImage, setUploadFileImage] = useState("general");
  const [showCoverageModal, setShowCoverageModal] = useState(false);
  const [machineAge, setMachineAge] = useState("5");

  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const [activeTab, setActiveTab] = useState(1);
  const [bundleServiceNeed, setBundleServiceNeed] = useState(true);

  const [searchBundleServiceItem, setSearchBundleServiceItem] = useState([]);
  const [selectedSearchedItems, setSelectedSearchedItems] = useState([]);
  const [bundleServiceItemsList, setBundleServiceItemsList] = useState([]);
  const [existBundleServiceItems, setExistBundleServiceItems] = useState([]);
  const [
    checkSelectedBundleServiceUpateOrNot,
    setCheckSelectedBundleServiceUpateOrNot,
  ] = useState([]);

  const [reviewTabItemList, setReviewTabItemList] = useState([]);

  const [expandedRows, setExpandedRows] = useState([]);

  const [showInclusionExclusionModal, setShowInclusionExclusionModal] =
    useState(false);

  const [showBundleServiceModel, setShowBundleServiceModel] = useState(false);
  const [bunleServiceItemFlag, setBunleServiceItemFlag] = useState("");
  const [bundleServiceItemId, setBundleServiceItemId] = useState(null);
  const [showBundleServicePriceModel, setShowBundleServicePriceModel] =
    useState(false);

  const [recorItemId, setRecorItemId] = useState(null);
  const [editItem, setEditItem] = useState(false);
  const [itemRequestObj, setItemRequestObj] = useState({
    itemId: 0,
    itemName: "",
  });

  const [itemHeaderModelObj, setItemHeaderModelObj] = useState({
    ...defaultItemHeaderObj,
  });

  const [itemBodyModelObj, setItemBodyModelObj] = useState({
    ...defaultItemBodyObj,
  });

  useEffect(() => {
    if (!showAddItemModal) {
      setRecorItemId(null);
      setEditItem(false);
      setItemRequestObj({
        itemId: 0,
        itemName: "",
      });
      setItemHeaderModelObj({ ...defaultItemHeaderObj });
      setItemBodyModelObj({ ...defaultItemBodyObj });
    }
  }, [showAddItemModal]);

  useEffect(() => {
    if (!showBundleServiceModel && !showBundleServicePriceModel) {
      setBundleServiceItemId(null);
      setBunleServiceItemFlag("");
    }
  }, [showBundleServiceModel, showBundleServicePriceModel]);

  // bundle service Items columns
  const bundleServiceItemsColumns = [
    {
      id: "itemName",
      name: "Name",
      selector: (row) => row.itemName,
      sortable: false,
      wrap: true,
    },
    {
      id: "itemDescription",
      name: "Description",
      selector: (row) => row.itemDescription,
      sortable: false,
      wrap: true,
    },
    {
      id: "itemHeaderStrategy",
      name: "Strategy",
      selector: (row) => row.itemHeaderStrategy,
      sortable: false,
      wrap: true,
    },
    {
      id: "taskType",
      name: "Task Type",
      selector: (row) => row.taskType,
      sortable: false,
      wrap: true,
    },
    {
      id: "quantity",
      name: "Quantity",
      selector: (row) => (isEmpty(row.quantity) ? 1 : row.quantity),
      sortable: false,
      wrap: true,
    },
    {
      id: "recommendedValue",
      name: "Recommended Value",
      selector: (row) => row.recommendedValue,
      sortable: false,
      wrap: true,
    },
    {
      id: "templateKitId",
      name: "Template/Kit ID",
      selector: (row) =>
        !isEmpty(row?.standardJobId)
          ? row?.standardJobId
          : !isEmpty(row?.repairKitId)
            ? row?.repairKitId
            : "NA",
      sortable: false,
      wrap: true,
    },
  ];

  // review tab columns
  const reviewTabColumns = [
    {
      id: "select",
      name: <div>Select</div>,
      cell: (row) => (
        <input
          type="radio"
          name="selectedId"
          className="cursor"
          // value={row.itemId}
          // checked={tempBundleItemCheckList[row.itemId]}
          onChange={(e) => reviewTabItemSelection(e, row)}
          style={{ border: "1px solid #000" }}
        />
      ),
      wrap: true,
      sortable: false,
      allowOverflow: true,
      button: true,
      maxWidth: "53px",
      minWidth: "53px",
    },
    {
      id: "solutionSequence",
      name: (
        <div className="d-flex align-items-baseline">
          <span className="portfolio-icon mr-1">
            <svg
              style={{ width: "11px" }}
              id="uuid-fd97eedc-9e4d-4a33-a68e-8d9f474ba343"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 119.30736 133.59966"
            >
              <path
                className="uuid-e6c3fd4e-386b-4059-8b00-0f6ea13faef9"
                d="M119.3072,35.67679c-.00098-.24805-.03125-.49072-.0752-.72974-.01123-.06348-.02441-.12573-.03857-.18799-.05225-.22827-.11768-.45239-.20703-.66675l-.021-.04858c-.09033-.20923-.20215-.40698-.3252-.59839-.03369-.05298-.06836-.10449-.10498-.15576-.13037-.18457-.27197-.36133-.43164-.52295-.00732-.00781-.01367-.0166-.02148-.02441-.16553-.16504-.3501-.31226-.54395-.44897-.0542-.03784-.10889-.073-.16455-.1084-.05908-.0376-.11377-.08057-.17529-.11548L61.71247,.54446c-1.27637-.72607-2.84082-.72607-4.11719,0L2.10895,32.06937c-.06152,.03491-.11621,.07788-.17529,.11548-.05566,.0354-.11035,.07056-.16406,.1084-.19434,.13672-.37891,.28394-.54443,.44897-.00781,.00781-.01367,.0166-.02148,.02441-.15967,.16162-.30078,.33838-.43164,.52295-.03613,.05127-.0708,.10278-.10498,.15576-.12305,.19141-.23486,.38916-.32471,.59839-.00732,.01636-.01465,.03198-.02148,.04858-.08936,.21436-.1543,.43848-.20703,.66675-.01416,.06226-.02734,.12451-.03857,.18799-.04346,.23901-.07422,.48169-.0752,.72974l.00049,.01001-.00049,.0061v63.37842l59.65381,34.52832,59.65332-34.52832V35.6929l-.00049-.0061,.00049-.01001ZM59.65387,8.96097l47.10889,26.76636-18.42969,10.66675L43.24177,18.28592l16.41211-9.32495Zm4.16748,61.25146l21.55762-12.47778v51.34448l-21.55762,12.47754v-51.34424ZM35.00007,22.96854l45.16357,28.15381-20.50977,11.87085L12.54499,35.72732l22.45508-12.75879ZM8.33503,42.92117l47.15137,27.29126v51.34424L8.33503,94.26565V42.92117Zm85.37891,61.33374V52.91043l17.2583-9.98926v51.34448l-17.2583,9.98926Z"
              />
            </svg>
          </span>
          <p className="mb-0 font-size-12 font-weight-500">Solution Sequence</p>
        </div>
      ),
      cell: (row, i) => <div>{(i + 1) * 10}</div>,
      format: (row, i) => <div>{(i + 1) * 10}</div>,
      wrap: true,
      sortable: false,
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      id: "itemName",
      name: "Solution Id",
      cell: (row) => row.itemName,
      wrap: true,
      sortable: false,
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      id: "itemDescription",
      name: "Solution Description",
      cell: (row) => row.itemDescription,
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "itemHeaderStrategy",
      name: "Strategy",
      cell: (row) => row.itemHeaderStrategy,
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "taskType",
      name: "Task Type",
      cell: (row) => row.taskType,
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },

    {
      id: "quantity",
      name: "Quantity",
      cell: (row) => (isEmpty(row.quantity) ? 1 : row.quantity),
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "recommendedValue",
      name: "Recommended Value",
      cell: (row) => row.recommendedValue,
      wrap: true,
      sortable: false,
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      id: "servicePrice",
      name: "Service Price",
      cell: (row) => row.servicePrice,
      wrap: true,
      sortable: false,
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      id: "sparePartsPrice",
      name: "Parts Price",
      cell: (row) => row.sparePartsPrice,
      wrap: true,
      sortable: false,
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      id: "calculatedPrice",
      name: "Total $",
      cell: (row) => row.calculatedPrice,
      wrap: true,
      sortable: false,
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      id: "comments",
      name: "Comments",
      selector: "comments",
      format: (row) => row.comments || "",
    },
  ];

  // expended review Tab Items columns
  const expendReviewTabColumns = [
    {
      id: "select",
      name: "",
      cell: () => null,
    },
    {
      name: (
        <div className="d-flex align-items-baseline">
          <span className="portfolio-icon mr-1">
            <svg
              style={{ width: "11px" }}
              id="uuid-fd97eedc-9e4d-4a33-a68e-8d9f474ba343"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 119.30736 133.59966"
            >
              <path
                className="uuid-e6c3fd4e-386b-4059-8b00-0f6ea13faef9"
                d="M119.3072,35.67679c-.00098-.24805-.03125-.49072-.0752-.72974-.01123-.06348-.02441-.12573-.03857-.18799-.05225-.22827-.11768-.45239-.20703-.66675l-.021-.04858c-.09033-.20923-.20215-.40698-.3252-.59839-.03369-.05298-.06836-.10449-.10498-.15576-.13037-.18457-.27197-.36133-.43164-.52295-.00732-.00781-.01367-.0166-.02148-.02441-.16553-.16504-.3501-.31226-.54395-.44897-.0542-.03784-.10889-.073-.16455-.1084-.05908-.0376-.11377-.08057-.17529-.11548L61.71247,.54446c-1.27637-.72607-2.84082-.72607-4.11719,0L2.10895,32.06937c-.06152,.03491-.11621,.07788-.17529,.11548-.05566,.0354-.11035,.07056-.16406,.1084-.19434,.13672-.37891,.28394-.54443,.44897-.00781,.00781-.01367,.0166-.02148,.02441-.15967,.16162-.30078,.33838-.43164,.52295-.03613,.05127-.0708,.10278-.10498,.15576-.12305,.19141-.23486,.38916-.32471,.59839-.00732,.01636-.01465,.03198-.02148,.04858-.08936,.21436-.1543,.43848-.20703,.66675-.01416,.06226-.02734,.12451-.03857,.18799-.04346,.23901-.07422,.48169-.0752,.72974l.00049,.01001-.00049,.0061v63.37842l59.65381,34.52832,59.65332-34.52832V35.6929l-.00049-.0061,.00049-.01001ZM59.65387,8.96097l47.10889,26.76636-18.42969,10.66675L43.24177,18.28592l16.41211-9.32495Zm4.16748,61.25146l21.55762-12.47778v51.34448l-21.55762,12.47754v-51.34424ZM35.00007,22.96854l45.16357,28.15381-20.50977,11.87085L12.54499,35.72732l22.45508-12.75879ZM8.33503,42.92117l47.15137,27.29126v51.34424L8.33503,94.26565V42.92117Zm85.37891,61.33374V52.91043l17.2583-9.98926v51.34448l-17.2583,9.98926Z"
              />
            </svg>
          </span>
          <p className="mb-0 font-size-12 font-weight-500">Solution Sequence</p>
        </div>
      ),
      cell: (row) => row.itemId,
      format: (row, i) => row.itemId,
      wrap: true,
      sortable: false,
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      id: "bundleId",
      name: "Bundle Id",
      cell: (row) => row.itemName,
      wrap: true,
      sortable: false,
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      id: "bundleDescription",
      name: "Bundle Description",
      cell: (row) => row.itemDescription || "",
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "bundleStrategy",
      name: "Strategy",
      cell: (row) => row.itemHeaderStrategy || "",
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "bundleStandardJobId",
      name: "Standard Job Id",
      cell: (row) => row.standardJobId || "",
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "bundleRepairOption",
      name: "Repair Option",
      cell: (row) => row?.repairKitId || "",
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "bundleFrequency",
      name: "Frequency",
      cell: (row) => row?.frequency || "",
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "bundleNumberOfEvents",
      name: "No. of Events",
      cell: (row) => row?.numberOfEvents || "",
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "bundleSparePartsPrice",
      name: "Part $",
      cell: (row) => row?.sparePartsPrice || "",
      wrap: true,
      sortable: false,
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      id: "bundleServicePrice",
      name: "Service $",
      cell: (row) => row?.servicePrice || "",
      wrap: true,
      sortable: false,
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      id: "bundleCalculatedPrice",
      name: "Total $",
      cell: (row) => row?.calculatedPrice || "",
      wrap: true,
      sortable: false,
      // minWidth: "120px",
      // maxWidth: "120px",
    },
    {
      name: "Comments",
      cell: (row) => row?.comments || "",
      wrap: true,
      sortable: false,
    },
  ];

  // drag-&-drop file modal box show|hide
  const handleDragAndDropModal = () => {
    setShowDragAndDropModal(!showDragAndDropModal);
  };

  // Image|File upload Modal box show|hide
  const handleImageFileUpload = (e, value) => {
    setUploadFileImage(value);
  };

  // Show|Hide Coverage Modal box
  const handleShowCoverageModal = () => {
    setShowCoverageModal(!showCoverageModal);
  };

  const handleMachineAgeChange = (e) => {
    setMachineAge(e.target.value);
  };

  // Hide Portfolio Item Tabs Model
  const hideItemAddUpdateModel = () => {
    setShowAddItemModal(false);
    setBundleServiceNeed(true);
    setActiveTab(1);
  };

  // handle Item Input Text change
  const handlePortfolioItemTextChange = (e, keyName = false) => { };

  // Search Items
  const handleAddSearchItems = (items) => {
    setSearchBundleServiceItem(items);
  };

  // Add Searched Service and bundle Items
  const addSelectedSearchedItems = () => {
    const _portfolioItemsIds = [...portfolioItemsIds];
    const _bundleServiceItemsList = [...bundleServiceItemsList];
    const _checkSelectedBundleServiceUpateOrNot = [
      ...checkSelectedBundleServiceUpateOrNot,
    ];
    selectedSearchedItems.map((itemRow, i) => {
      const exist = bundleServiceItemsList.some(
        (item) => item.itemId === itemRow.itemId
      );
      if (!exist) {
        _portfolioItemsIds.push({ itemId: itemRow.itemId });
        _bundleServiceItemsList.push(itemRow);
      }
    });
    setBundleServiceItemsList(_bundleServiceItemsList);
    setPortfolioItemsIds(_portfolioItemsIds);

    selectedSearchedItems.map((itemRow, i) => {
      const exist = checkSelectedBundleServiceUpateOrNot.some(
        (item) => item.itemId === itemRow.itemId
      );
      if (!exist) {
        _checkSelectedBundleServiceUpateOrNot.push(itemRow);
      }
    });
    setCheckSelectedBundleServiceUpateOrNot([
      ..._checkSelectedBundleServiceUpateOrNot,
    ]);

    handleAddSearchItems([]);
  };

  // get selected Bundle|Service item details
  const handleGetBundleServiceItemData = async (bundleServiceItemId) => {
    const rUrl = CREATE_PORTFOLIO_ITEM() + "/" + bundleServiceItemId;
    await callGetApi(
      null,
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const { itemId, itemName, itemHeaderModel, itemBodyModel } =
            response.data;
          const _portfolioItemIds = [...itemHeaderModel["portfolioItemIds"]];
          const removeDuplicatePortfolioItemIds = Array.from([...new Set(_portfolioItemIds)]);
          _portfolioItemIds.push(recorItemId);
          const requestObj = {
            itemId: itemId,
            itemName: itemName,
            itemHeaderModel: {
              ...itemHeaderModel,
              // portfolioItemIds: _portfolioItemIds,
              portfolioItemIds: removeDuplicatePortfolioItemIds,
              bundleFlag: itemHeaderModel.bundleFlag,
            },
            itemBodyModel: {
              ...itemBodyModel,
            },
          };

          handleUpdateBundleServiceItem(bundleServiceItemId, requestObj)
            .then((res) => {
              return true;
              // resolve(res);
            })
            .catch((error) => {
              return false;
              // resolve(false);
            });
        } else {
          return false;
          // resolve(false);
        }
      },
      (error) => {
        return false;
        // resolve(false);
      }
    );

    // return new Promise((resolve, reject) => {
    //   const rUrl = CREATE_PORTFOLIO_ITEM() + "/" + bundleServiceItemId;
    // });
  };

  // handle Connect(Link) the item to Portfolio item and create a relation(Portfolio Items Realtion)
  const handleLinkItemToPortfolio = (rUrlEndPath) => {
    return new Promise((resolve, reject) => {
      const rUrl = `${LINK_ITEM_TO_PORTFOLIO + rUrlEndPath}`;
      callGetApi(
        null,
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            // ToDo** Success
          } else {
            // ToDo** Failed
          }
        },
        (error) => {
          // ToDo** api failed.
        }
      );
    });
  };

  // update selected Bundle|Service item
  const handleUpdateBundleServiceItem = async (itemId, requestObj) => {
    const rUrl = CREATE_PORTFOLIO_ITEM() + "/" + itemId;
    callPutApi(
      null,
      rUrl,
      requestObj,
      (response) => {
        if (response.status === API_SUCCESS) {
          return true;
          // resolve(true);
        } else {
          return false;
          // resolve(false);
        }
      },
      (error) => {
        return false;
        // resolve(false);
      }
    );
    // return new Promise((resolve, reject) => {
    // });
  };

  // go through with selected bundle and Service on save & Continue
  const handleContinueWithSelectebundleService = () => {
    try {
      if (checkSelectedBundleServiceUpateOrNot.length !== 0) {
        const bundleServiceNames = checkSelectedBundleServiceUpateOrNot
          .map((obj) => obj.itemName)
          .join(",");
        errorMessage(
          `Expend and update the ${bundleServiceNames} Bundle/Service Items, then you can Add Items and go forword.`
        );
        return;
      }

      if (isEmpty(portfolioRecordId)) {
        errorMessage("Create Portfolio First, then you can Add Items");
        return;
      }

      if (isEmpty(recorItemId)) {
        errorMessage("Create Item First, then you can Add Items.");
        return;
      }

      const selectedItemsLength = bundleServiceItemsList.length;
      const existItemsLength = existBundleServiceItems.length;
      const _portfolioItemsIds = [...portfolioItemsIds];

      // connect bundle|Service to Portfolio request url
      let linkItemReqUrl = bundleServiceItemsList
        .map((item) => `itemIds=${item.itemId}`)
        .join("&");
      linkItemReqUrl = `${linkItemReqUrl}&portfolio_item_id=${recorItemId}&portfolio_id=${portfolioRecordId}`;

      handleLinkItemToPortfolio(linkItemReqUrl).then((res) => { });

      for (let i = 0; i < selectedItemsLength; i++) {
        _portfolioItemsIds.push({
          itemId: bundleServiceItemsList[i].itemId,
        });
      }

      const removeDuplicateIds = _portfolioItemsIds.filter((obj, i, self) => {
        return (
          i ===
          self.findIndex(
            (item) => item.itemId === obj.itemId // Compare object properties for uniqueness
          )
        );
      });
      setPortfolioItemsIds(removeDuplicateIds);
      if (selectedItemsLength === existItemsLength) {
        // check Component data tab is visiable
        if (componentDataTabShow) {
          setActiveTab(3);
        } else {
          setActiveTab(4);
        }
      } else {
        handleAddUpdatePortfolioItem(
          true,
          itemRequestObj,
          itemHeaderModelObj,
          itemBodyModelObj
        )
          .then((res) => {
            if (res.apiSuccess) {
              handleReviewTabTableData(removeDuplicateIds);
              handleReviewTabTableData(removeDuplicateIds);
              if (componentDataTabShow) {
                setActiveTab(3);
              } else {
                setActiveTab(4);
              }
              // handleUpdatePortfolio(_portfolioItemsIds).then((res) => {
              //   if (res) {
              //     handleReviewTabTableData(removeDuplicateIds);
              //     if (componentDataTabShow) {
              //       setActiveTab(3);
              //     } else {
              //       setActiveTab(4);
              //     }
              //   } else {
              //     errorMessage("Something Went Wrong");
              //   }
              // });
            } else {
              errorMessage("Something Went Wrong");
            }
          })
          .catch((error) => {
            return;
          });
      }
    } catch (error) {
      return;
    }
  };

  // get Review Tab Table data list
  const handleReviewTabTableData = async (itemIds = []) => {
    if (itemIds.length !== 0) {
      let rUrl = PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE;
      const shortedItems = itemIds.sort(
        (itemA, itemB) => itemA.itemId - itemB.itemId
      );
      rUrl =
        rUrl + shortedItems.map((item) => `itemIds=${item.itemId}`).join("&");
      await callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const res = response.data;
          const _reviewTabItems = [];

          res.map((data) => {
            let portfolioBundleService = []; // Create a new array for each data object

            for (let i = 0; i < data.bundleItems.length; i++) {
              portfolioBundleService.push(data.bundleItems[i]);
            }

            for (let j = 0; j < data.serviceItems.length; j++) {
              portfolioBundleService.push(data.serviceItems[j]);
            }

            if (
              data.portfolioItem &&
              Object.keys(data.portfolioItem).length !== 0
            ) {
              _reviewTabItems.push({
                ...data.portfolioItem,
                associatedServiceOrBundle: portfolioBundleService,
              });
            }
          });
          setReviewTabItemList(_reviewTabItems);
        }
      });
    }
  };

  // handle Item Create/Update
  const handleAddUpdatePortfolioItem = (
    isEditable,
    itemRequestObj,
    itemHeaderReqObj,
    itemBodyReqObj,
    itemPriceObj = {}
  ) => {
    return new Promise((resolve, reject) => {
      let rUrl = CREATE_PORTFOLIO_ITEM();
      if (isEditable) {
        // rUrl = rUrl + "/" + itemRequestObj.itemId;
        rUrl = rUrl + "/" + recorItemId;
      }

      const requestObj = {
        itemId: itemRequestObj.itemId,
        itemName: itemRequestObj.itemName,
        itemHeaderModel: {
          ...itemHeaderReqObj,
          usage: itemHeaderReqObj.usage?.value || itemHeaderReqObj.usage || "",
          bundleFlag: "PORTFOLIO",
          type: itemHeaderReqObj.type || "EMPTY",
        },
        itemBodyModel: {
          ...itemBodyReqObj,
          // itemBodyDescription: itemBodyReqObj.itemBodyDescription,
          taskType: [itemBodyReqObj.taskType?.value || "EMPTY"],
          usageIn:
            itemBodyReqObj.usageIn?.value || itemBodyReqObj.usageIn || "",
          usage: itemBodyReqObj.usage?.value || itemBodyReqObj.usage || "",
          year: itemBodyReqObj.year?.value || itemBodyReqObj.year || "",
          // itemPrices: _itemPrice,
        },
      };

      if (isEditable) {
        callPutApi(
          null,
          rUrl,
          requestObj,
          (response) => {
            if (response.status === API_SUCCESS) {
              if (Object.keys(itemPriceObj).length !== 0) {
                updateItemPriceSjRkId({
                  standardJobId: itemPriceObj.standardJobId,
                  repairKitId: itemPriceObj.repairKitId,
                  itemId: recorItemId,
                  itemPriceDataId:
                    itemBodyReqObj.itemPrices[
                      itemBodyReqObj.itemPrices.length - 1
                    ].itemPriceDataId,
                });
              }
              resolve({
                apiSuccess: true,
                portfolioItemsIds: portfolioItemsIds,
              });
            } else {
              errorMessage(response?.data.message);
              resolve({
                apiSuccess: false,
                portfolioItemsIds: portfolioItemsIds,
              });
            }
          },
          (error) => {
            resolve({
              apiSuccess: false,
              portfolioItemsIds: portfolioItemsIds,
            });
          }
        );
      } else {
        callPostApi(
          null,
          rUrl,
          requestObj,
          (response) => {
            if (response.status === API_SUCCESS) {
              const res = response.data;
              const _portfolioItemsIds = [...portfolioItemsIds];
              _portfolioItemsIds.push({ itemId: res.itemId });
              setPortfolioItemsIds(_portfolioItemsIds);
              setItemRequestObj({ ...itemRequestObj, itemId: res.itemId });
              setRecorItemId(res.itemId);
              if (Object.keys(itemPriceObj).length !== 0) {
                updateItemPriceSjRkId({
                  standardJobId: itemPriceObj.standardJobId,
                  repairKitId: itemPriceObj.repairKitId,
                  itemId: res.itemId,
                  itemPriceDataId:
                    itemBodyReqObj.itemPrices[
                      itemBodyReqObj.itemPrices.length - 1
                    ].itemPriceDataId,
                });
              }
              resolve({
                apiSuccess: true,
                portfolioItemsIds: _portfolioItemsIds,
              });
            } else {
              errorMessage(response?.data.message);
              resolve({
                apiSuccess: false,
                portfolioItemsIds: portfolioItemsIds,
              });
            }
          },
          (error) => {
            resolve({
              apiSuccess: false,
              portfolioItemsIds: portfolioItemsIds,
            });
          }
        );
      }
    });
  };

  // get Portfolio Item Data
  const handleGetPortfolioItemsData = async (
    isViewModeOn,
    itemRecordObj,
    itemPriceData,
    isPortfolioItem,
    isEditable
  ) => {
    try {
      if (isPortfolioItem) {
        const _itemPrice = [...itemBodyModelObj.itemPrices];
        if (
          !_itemPrice.some(
            (obj) => obj.itemPriceDataId === itemPriceData.itemPriceDataId
          ) &&
          !isEmpty(itemPriceData.itemPriceDataId)
        ) {
          _itemPrice.push({ itemPriceDataId: itemPriceData.itemPriceDataId });
        }

        // set Item basic details
        const _itemRequestObj = {
          ...itemRequestObj,
          itemName: itemRecordObj.name,
        };
        setItemRequestObj({ ..._itemRequestObj });

        // set item header modal Obj Value
        const _itemHeaderModelObj = {
          ...itemHeaderModelObj,
          itemHeaderDescription: itemRecordObj.description,
          usage: itemRecordObj.usageType?.value || "",
          itemHeaderStrategy: itemRecordObj?.strategyTask?.value || "EMPTY",
        };
        setItemHeaderModelObj({ ..._itemHeaderModelObj });

        // set item body modal obj value
        const _itemBodyModelObj = {
          ...itemBodyModelObj,
          itemBodyDescription: itemRecordObj.description,
          taskType: itemRecordObj.taskType,
          usageIn: itemRecordObj.usageIn,
          usage: itemRecordObj.usageType,
          year: itemPriceData.year?.value,
          itemPrices: _itemPrice,
        };
        setItemBodyModelObj({ ..._itemBodyModelObj });

        if (!isViewModeOn) {
          handleAddUpdatePortfolioItem(
            isEditable,
            _itemRequestObj,
            _itemHeaderModelObj,
            _itemBodyModelObj,
            itemPriceData
          ).then((res) => {
            if (res.apiSuccess) {
              handleUpdatePortfolio(res.portfolioItemsIds).then((res) => {
                if (res) {
                  setActiveTab(
                    bundleServiceNeed ? 2 : componentDataTabShow ? 3 : 4
                  );
                } else {
                  errorMessage("Somthing Went wrong.");
                }
              });
            }
          });
        } else {
          setActiveTab(bundleServiceNeed ? 2 : componentDataTabShow ? 3 : 4);
        }
      }
    } catch (error) {
      return;
    }
  };

  // Save item price changes
  const handleSaveItemPriceChanges = async (
    requestItemObj,
    headerModelObj,
    bodyModelObj
  ) => {
    // set item header modal obj
    const _itemHeaderModelObj = {
      ...itemHeaderModelObj,
      usage: headerModelObj.usage?.value || headerModelObj.usage || "",
      currency: headerModelObj.currency?.value || headerModelObj.currency || "",
      type: headerModelObj.type || "EMPTY",
    };
    setItemHeaderModelObj({ ..._itemHeaderModelObj });

    // set item body modal obj
    const _itemBodyModelObj = {
      ...itemBodyModelObj,
      usage: bodyModelObj.usage?.value || bodyModelObj.usage || "",
      year: bodyModelObj.year?.value || bodyModelObj.year || "",
    };
    setItemBodyModelObj({ ..._itemBodyModelObj });

    const requestObj = {
      ...itemRequestObj,
      itemHeaderModel: {
        ...headerModelObj,
        usage: headerModelObj.usage?.value || headerModelObj.usage || "",
        currency:
          headerModelObj.currency?.value || headerModelObj.currency || "",
        type: headerModelObj.type || "EMPTY",
      },
      itemBodyModel: {
        ...bodyModelObj,
        taskType: [
          itemBodyModelObj?.taskType?.value ||
          itemBodyModelObj?.taskType ||
          "EMPTY",
        ],
        usageIn:
          itemBodyModelObj?.usageIn?.value || itemBodyModelObj?.usageIn || "",
        usage: bodyModelObj.usage?.value || bodyModelObj.usage || "",
        year: bodyModelObj.year?.value || bodyModelObj.year || "",
      },
    };

    const rUrl = CREATE_PORTFOLIO_ITEM() + "/" + recorItemId;
    callPutApi(null, rUrl, requestObj, (response) => {
      if (response.status === API_SUCCESS) {
        setActiveTab(5);
      }
    });
  };

  // drag and drop files Modal Box
  const dragAndDropFileModal = () => {
    return (
      <Modal
        show={showDragAndDropModal}
        onHide={handleDragAndDropModal}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Import Files</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3">
            <div className="add-new-recod">
              <div>
                <FontAwesomeIcon
                  className="cloudupload"
                  icon={faCloudUploadAlt}
                />
                <h6 className="font-weight-500 mt-3">
                  Drag and drop files to upload <br /> or
                </h6>
                <FileUploader
                  name="file"
                  types={fileTypes}
                  handleChange={handleImageFileUpload}
                />
              </div>
            </div>
            <p className="mt-3">
              Single upload file should not be more than 10MB. Only the .lgs,
              .lgsx file types are allowed
            </p>
          </div>
        </Modal.Body>
        <div className="row m-0 p-3">
          <div className="col-md-6 col-sm-6">
            <button
              className="btn border w-100 bg-white"
              onClick={handleDragAndDropModal}
            >
              Cancel
            </button>
          </div>
          <div className="col-md-6 col-sm-6">
            <button
              className="btn btn-primary w-100 cursor"
              onClick={handleShowCoverageModal}
            >
              <FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />{" "}
              Upload
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  // Coverage Data Modal
  const viewCoverageModal = () => {
    return (
      <Modal
        show={showCoverageModal}
        onHide={handleShowCoverageModal}
        size="lg"
        centered
      >
        <Modal.Body className="">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Coverage</h5>
            <div className="d-flex justify-content-center align-items-center">
              <a className="ml-3 font-size-14 cursor">
                {" "}
                <img src={shareIcon} />
              </a>
              <a className="ml-3 font-size-14 cursor">
                {" "}
                <img src={folderaddIcon} />{" "}
              </a>
              <a className="ml-3 font-size-14 cursor">
                <img src={uploadIcon} />
              </a>
              <a className="ml-3 font-size-14 cursor">
                <img src={cpqIcon} />
              </a>
              <a className="ml-3 font-size-14 cursor">
                <img src={deleteIcon} />
              </a>
              <a className="ml-3 font-size-14 cursor">
                <img src={copyIcon} />
              </a>
              <a className="ml-2 cursor">
                <MuiMenuComponent options={menuComponentOptions} />
              </a>
            </div>
          </div>
          <div className="card px-4 pb-4 mt-5 pt-0">
            <div className="row align-items-center">
              <div className="col-3">
                <div className="d-flex ">
                  <h5 className=" mb-0">
                    <span>Coverage123</span>
                  </h5>
                  <p className=" mb-0">
                    <a className="ml-3 cursor">
                      <img src={editIcon} />
                    </a>
                    <a className="ml-3 cursor">
                      <img src={shareIcon} />
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-5">
                <div
                  className="d-flex align-items-center"
                  style={{
                    background: "#F9F9F9",
                    padding: "10px 15px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="search-icon mr-2"
                    style={{ lineHeight: "24px" }}
                  >
                    <img src={searchstatusIcon} />
                  </div>
                  <div className="w-100 mx-2">
                    <div className="machine-drop d-flex align-items-center">
                      <div>
                        <label className="label-div">Machine</label>
                      </div>
                      <FormControl className="" sx={{ m: 1 }}>
                        <Select
                          id="demo-simple-select-autowidth"
                          value={machineAge}
                          autoWidth
                          onChange={handleMachineAgeChange}
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
                    <a className="p-1 more-btn cursor">
                      + 3 more
                      <span className="c-btn">C</span>
                      <span className="b-btn">B</span>
                      <span className="a-btn">A</span>
                    </a>
                  </div>
                  <div className="col-5 text-center border-left py-4">
                    <a className="cursor"> + Add Part</a>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ height: 400, width: "100%", backgroundColor: "#fff" }}
            >
              <DataGrid
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#872ff7",
                    color: "#fff",
                  },
                }}
                rows={coverageRowData}
                columns={coverageColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  // Remove Bundle|Service item after update
  const handleRemoveUpdatedBundelServiceItem = (itemId) => {
    const _checkSelectedBundleServiceUpateOrNot = [
      ...checkSelectedBundleServiceUpateOrNot,
    ];
    const indexOfExpened = _checkSelectedBundleServiceUpateOrNot.findIndex(
      (obj) => obj.itemId === itemId
    );
    if (indexOfExpened !== -1) {
      _checkSelectedBundleServiceUpateOrNot.splice(indexOfExpened, 1);
    }
    setCheckSelectedBundleServiceUpateOrNot([
      ..._checkSelectedBundleServiceUpateOrNot,
    ]);
  };

  const handleExpendableRowExpanded = (row) => {
    if (checkSelectedBundleServiceUpateOrNot.length !== 0) {
      const bundleServiceItemObj = checkSelectedBundleServiceUpateOrNot[0];
      return row.itemId === bundleServiceItemObj.itemId;
    }
    return false;
  };

  // Portfolio Items Modal box
  const viewPortfolioItemTabsModel = () => {
    return (
      <Modal show={showAddItemModal} onHide={hideItemAddUpdateModel} size="xl">
        <Modal.Body>
          <Box sx={{ typography: "body1" }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  className="custom-tabs-div"
                  onChange={(e, tabIndex) => editItem && setActiveTab(tabIndex)}
                // onChange={(e, newValue) => { portfolioItemDataEditable && setTabs(newValue) }}
                >
                  <Tab label="Portfolio Item" value={1} />
                  <Tab
                    label="Service/Bundle"
                    value={2}
                    disabled={!bundleServiceNeed}
                  />
                  {componentDataTabShow && (
                    <Tab label="Component Data" value={3} />
                  )}
                  <Tab label="Price Calculator" value={4} />
                  <Tab label="Review" value={5} />
                </TabList>
              </Box>
              <TabPanel value={1}>
                <ItemAddEdit
                  itemType="portfolioItem"
                  isEditable={editItem}
                  isPortfolioItem={true}
                  bundleServiceNeed={bundleServiceNeed}
                  componentDataTabShow={componentDataTabShow}
                  handleBundleServiceNeed={() => setBundleServiceNeed(!bundleServiceNeed)}
                  itemId={recorItemId}
                  portfolioId={portfolioRecordId}
                  handleGetPortfolioItemsData={handleGetPortfolioItemsData}
                  hideItemAddUpdateModel={hideItemAddUpdateModel}
                />
              </TabPanel>
              <TabPanel value={2}>
                <PortfolioCoverageSearch
                  searchFlag="bundleSearch"
                  handleAddSearchItem={handleAddSearchItems}
                />
                {searchBundleServiceItem.length !== 0 && (
                  <>
                    <DataTable
                      columns={bundleServiceItemsColumns}
                      data={searchBundleServiceItem}
                      customStyles={dataTableCustomStyle}
                      selectableRows
                      selectableRowsHighlight
                      onSelectedRowsChange={(rows) =>
                        setSelectedSearchedItems(rows.selectedRows)
                      }
                      pagination
                    />
                    <div className="row mb-3 justify-content-end">
                      <div className="d-flex">
                        <button
                          type="button"
                          className="btn bg-primary text-white mr-3"
                          onClick={() => handleAddSearchItems([])}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn bg-primary text-white"
                          disabled={selectedSearchedItems.length === 0}
                          onClick={addSelectedSearchedItems}
                        >
                          + Add Selected
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {bundleServiceItemsList.length !== 0 && (
                  <>
                    <DataTable
                      columns={bundleServiceItemsColumns}
                      data={bundleServiceItemsList}
                      customStyles={dataTableCustomStyle}
                      pagination
                      expandableRows
                      expandableRowsComponent={(row) => (
                        <ExpendBundleServiceItem
                          bundleServiceRowData={row.data}
                          priceMethodKeyValuePair={priceMethodKeyValuePair}
                          priceTypeKeyValuePair={priceTypeKeyValuePair}
                          frequencyKeyValuePairs={frequencyKeyValuePairs}
                          unitKeyValuePairs={unitKeyValuePairs}
                          existBundleServiceItems={existBundleServiceItems}
                          bundleServiceItemsList={bundleServiceItemsList}
                          portfolioRecordId={portfolioRecordId}
                          portfolioItemId={recorItemId}
                          handleUpdateItem={
                            handleRemoveUpdatedBundelServiceItem
                          }
                        />
                      )}
                      expandOnRowClicked
                      preExpandedRows={[checkSelectedBundleServiceUpateOrNot]}
                      expandableRowDisabled={() => false}
                      // expandableRowExpanded={(row) => checkSelectedBundleServiceUpateOrNot.some((obj) => obj.itemId === row.itemId)}
                      // expandableRowExpanded={(row) =>
                      //   handleExpendableRowExpanded(row)
                      // }
                      expandableRowExpanded={handleExpendableRowExpanded}
                    />
                    <div
                      className="row mt-5"
                      style={{ justifyContent: "right" }}
                    >
                      <button
                        type="button"
                        className="btn bg-primary text-white"
                        onClick={handleContinueWithSelectebundleService}
                      >
                        {existBundleServiceItems.length ===
                          bundleServiceItemsList.length
                          ? "Next"
                          : "Save & Continue"}
                      </button>
                    </div>
                  </>
                )}
              </TabPanel>
              <TabPanel value={3}>
                <>
                  <div className="ligt-greey-bg p-3 mb-5">
                    <div>
                      <span className="mr-3 cursor">
                        <i
                          className="fa fa-pencil font-size-12"
                          aria-hidden="true"
                        ></i>
                        <span className="ml-2">Edit</span>
                      </span>
                      <span className="mr-3">
                        <SellOutlinedIcon className=" font-size-16" />
                        <span className="ml-2">Related repair option</span>
                      </span>
                      <span className="mr-3">
                        <FormatListBulletedOutlinedIcon className=" font-size-16" />
                        <span className="ml-2">Related Standard Job</span>
                      </span>
                      <span className="mr-3">
                        <AccessAlarmOutlinedIcon className=" font-size-16" />
                        <span className="ml-2">Related Kit</span>
                      </span>
                    </div>
                  </div>
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          {" "}
                          Component Code
                        </label>
                        <div className="customselectsearch">
                          <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            name="componentCode"
                            autoComplete="off"
                          // value={componentData.componentCode}
                          // onChange={handleComponentChange}
                          />
                          {/* {<ul className={`list-group customselectsearch-list scrollbar scrolbarCode style`}>
                                                    {componentData.codeSuggestions.map(
                                                        (currentItem, j) => (
                                                            <li className="list-group-item" key={j} onClick={(e) => handleComponentCodeSuggetionsClick(e, j)}
                                                            >
                                                                {currentItem.componentCode}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>} */}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Component Description
                        </label>
                        <input
                          className="form-control border-radius-10 text-primary"
                          type="text"
                          name="description"
                          placeholder="Optional"
                          disabled
                        // value={componentData.description}
                        // onChange={handleComponentChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          Make
                        </label>
                        <input
                          className="form-control border-radius-10 text-primary"
                          type="text"
                          placeholder="Auto Filled"
                          id="make-id"
                          name="make"
                          disabled
                        // value={componentData.make}
                        // onChange={handleMachineDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          MODEL
                        </label>
                        <SearchBox
                        // value={componentData.model}
                        // onChange={(e) =>
                        //     handleMachineSearch(
                        //         "model",
                        //         e.target.value
                        //     )
                        // }
                        // type="model"
                        // result={searchModelResults}
                        // onSelect={handleModelSelect}
                        // noOptions={noOptionsModel}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SERIAL #
                        </label>
                        <SearchBox
                        // value={componentData.serialNo}
                        // onChange={(e) =>
                        //     handleMachineSearch(
                        //         "serialNo",
                        //         e.target.value
                        //     )
                        // }
                        // type="equipmentNumber"
                        // result={searchSerialResults}
                        // onSelect={handleModelSelect}
                        // noOptions={noOptionsSerial}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          {" "}
                          PRICE METHOD
                        </label>
                        <Select
                          // options={priceMethodKeyValue}
                          className="text-primary"
                          // value={priceCalculator.priceMethod}
                          // name="priceMethod"
                          // onChange={(e) =>
                          //     setPriceCalculator({ ...priceCalculator, priceMethod: e })
                          // }
                          placeholder="placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group date-box">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ADDITIONAL
                        </label>
                        <div className=" d-flex form-control-date">
                          <div className="">
                            <Select
                              // isClearable={true}
                              // className="text-primary"
                              // value={priceCalculator.priceAdditionalSelect}
                              // name="priceAdditionalSelect"
                              // onChange={(e) =>
                              //     setPriceCalculator({
                              //         ...priceCalculator,
                              //         priceAdditionalSelect: e,
                              //     })
                              // }
                              // options={additionalPriceHeadTypeKeyValue}
                              placeholder="Select"
                            />
                          </div>
                          <input
                            type="text"
                            className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                          // placeholder="10%"
                          // defaultValue={props?.priceCalculator?.priceAdditionalInput}
                          // value={priceCalculator.priceAdditionalInput}
                          // name="priceAdditionalInput"
                          // onChange={(e) =>
                          //     setPriceCalculator({
                          //         ...priceCalculator,
                          //         priceAdditionalInput: e.target.value,
                          //     })
                          // }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group date-box">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          {" "}
                          PRICE ESCALATION{" "}
                        </label>
                        <div className=" d-flex align-items-center form-control-date">
                          <Select
                            className="select-input text-primary"
                            id="priceEscalationSelect"
                          // options={priceHeadTypeKeyValue}
                          // placeholder="placeholder "
                          // value={priceCalculator.escalationPriceOptionsValue1}
                          // onChange={(e) =>
                          //     handleEscalationPriceValue(e)
                          // }
                          />
                          <input
                            type="text"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
                            placeholder="20%"
                            id="priceEscalationInput"
                          // value={priceCalculator.escalationPriceInputValue}
                          // onChange={(e) =>
                          //     setPriceCalculator({
                          //         ...priceCalculator,
                          //         escalationPriceInputValue: e.target.value,
                          //     })
                          // }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          {" "}
                          CALCULATED PRICE
                        </label>
                        <input
                          className="form-control border-radius-10 text-primary"
                          type="text"
                          name="calculatedPrice"
                          placeholder="$100"
                          disabled
                        // value={priceCalculator.calculatedPrice}
                        // onChange={(e) =>
                        //     setPriceCalculator({
                        //         ...priceCalculator,
                        //         calculatedPrice: e.target.value,
                        //     })
                        // }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          FLAT PRICE / ADJUSTED PRICE
                        </label>
                        <input
                          className="form-control border-radius-10 text-primary"
                          type="text"
                          name="flatPrice"
                          placeholder="0"
                        // value={priceCalculator.flatPrice}
                        // onChange={(e) =>
                        //     setPriceCalculator({
                        //         ...priceCalculator,
                        //         flatPrice: e.target.value,
                        //     })
                        // }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group date-box">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          DISCOUNT TYPE
                        </label>
                        <div className=" d-flex form-control-date">
                          <div className="">
                            <Select
                              className="text-primary"
                              name="discountTypeSelect"
                              placeholder="Select"
                            // value={priceCalculator.discountTypeSelect}
                            // onChange={(e) =>
                            //     setPriceCalculator({
                            //         ...priceCalculator,
                            //         discountTypeSelect: e,
                            //     })
                            // }
                            // isClearable={true}
                            // options={discountTypeOptions}
                            />
                          </div>
                          <input
                            className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                            type="text"
                            name="discountTypeInput"
                            placeholder="10%"
                          // value={priceCalculator.discountTypeInput}
                          // onChange={(e) =>
                          //     setPriceCalculator({
                          //         ...priceCalculator,
                          //         discountTypeInput: e.target.value,
                          //     })
                          // }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </TabPanel>
              <TabPanel value={4}>
                <ItemPriceCalculator
                  itemId={recorItemId}
                  isEditable={editItem}
                  handleSavePriceChanges={handleSaveItemPriceChanges}
                />
              </TabPanel>
              <TabPanel value={5}>
                <div
                  className="custom-table portfolioItems-expandable-data-table card expand-last-child"
                  style={{ height: 400, width: "100%" }}
                >
                  <DataTable
                    columns={reviewTabColumns}
                    data={reviewTabItemList}
                    expandableRows={true}
                    expandOnRowClicked
                    expandableRowsComponent={viewReviewTabExpendedItems}
                    customStyles={dataTableCustomStyle}
                    pagination
                  />
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          {activeTab === 5 && (
            // <Button variant="primary" onClick={addTempItemIntobundleItem}>
            <Button variant="primary" onClick={handleAddReviewTabItem}>
              {/* {bundleServiceEditModeOn ? (Object.keys(tempBundleItemCheckList).length > 0 && tempBundleItemCheckList.selectedId !== currentItemId) ? "Add Selected" : "Close" : "Add Selected"} */}
              Add Selected
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  };

  // Review Tab expend items
  const viewReviewTabExpendedItems = ({ data }) => {
    return (
      <div style={{ paddingTop: "8px" }}>
        <DataTable
          columns={expendReviewTabColumns}
          data={data.associatedServiceOrBundle}
          customStyles={dataTableCustomStyle}
          pagination={false}
        />
      </div>
    );
  };

  // Review tab item selection
  const reviewTabItemSelection = (e, row) => {
    console.log("review tab item selection row :: ", row);
  };

  const handleAddReviewTabItem = () => {
    setPortfolioItemsList([...reviewTabItemList]);
    hideItemAddUpdateModel();
  };

  //
  const handleAddItem = () => {
    setBundleServiceItemsList([]);
    setExistBundleServiceItems([]);
    setShowAddItemModal(true);
  };

  // Item columns
  const itemsColumns = [
    {
      id: "solutionSequence",
      name: (
        <div className="d-flex align-items-baseline">
          <span className="portfolio-icon mr-1">
            <svg
              style={{ width: "11px" }}
              id="uuid-fd97eedc-9e4d-4a33-a68e-8d9f474ba343"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 119.30736 133.59966"
            >
              <path
                className="uuid-e6c3fd4e-386b-4059-8b00-0f6ea13faef9"
                d="M119.3072,35.67679c-.00098-.24805-.03125-.49072-.0752-.72974-.01123-.06348-.02441-.12573-.03857-.18799-.05225-.22827-.11768-.45239-.20703-.66675l-.021-.04858c-.09033-.20923-.20215-.40698-.3252-.59839-.03369-.05298-.06836-.10449-.10498-.15576-.13037-.18457-.27197-.36133-.43164-.52295-.00732-.00781-.01367-.0166-.02148-.02441-.16553-.16504-.3501-.31226-.54395-.44897-.0542-.03784-.10889-.073-.16455-.1084-.05908-.0376-.11377-.08057-.17529-.11548L61.71247,.54446c-1.27637-.72607-2.84082-.72607-4.11719,0L2.10895,32.06937c-.06152,.03491-.11621,.07788-.17529,.11548-.05566,.0354-.11035,.07056-.16406,.1084-.19434,.13672-.37891,.28394-.54443,.44897-.00781,.00781-.01367,.0166-.02148,.02441-.15967,.16162-.30078,.33838-.43164,.52295-.03613,.05127-.0708,.10278-.10498,.15576-.12305,.19141-.23486,.38916-.32471,.59839-.00732,.01636-.01465,.03198-.02148,.04858-.08936,.21436-.1543,.43848-.20703,.66675-.01416,.06226-.02734,.12451-.03857,.18799-.04346,.23901-.07422,.48169-.0752,.72974l.00049,.01001-.00049,.0061v63.37842l59.65381,34.52832,59.65332-34.52832V35.6929l-.00049-.0061,.00049-.01001ZM59.65387,8.96097l47.10889,26.76636-18.42969,10.66675L43.24177,18.28592l16.41211-9.32495Zm4.16748,61.25146l21.55762-12.47778v51.34448l-21.55762,12.47754v-51.34424ZM35.00007,22.96854l45.16357,28.15381-20.50977,11.87085L12.54499,35.72732l22.45508-12.75879ZM8.33503,42.92117l47.15137,27.29126v51.34424L8.33503,94.26565V42.92117Zm85.37891,61.33374V52.91043l17.2583-9.98926v51.34448l-17.2583,9.98926Z"
              />
            </svg>
          </span>
          <p className="mb-0 font-size-12 font-weight-500">Solution Sequence</p>
        </div>
      ),
      selector: "id",
      format: (row, i) => {
        return 10 * (i + 1);
      },
    },
    {
      id: "itemName",
      name: <div>Solution ID</div>,
      selector: "itemName",
      format: (row) => row.itemName,
    },
    {
      id: "itemDescription",
      name: <div>Solution Description</div>,
      selector: "itemDescription",
      format: (row) => row.itemDescription,
      wrap: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "taskType",
      name: <div>Task Type</div>,
      selector: "taskType",
      format: (row) => row.taskType,
    },
    {
      id: "quantity",
      name: <div>Quantity</div>,
      selector: "quantity",
      format: (row) => row.quantity || 1,
    },
    {
      id: "recommendedValue",
      name: <div>Recommended Value</div>,
      selector: "recommendedValue",
      format: (row) => row.recommendedValue,
    },
    {
      id: "servicePrice",
      name: <div>Service Price</div>,
      selector: "servicePrice",
      format: (row) => row.servicePrice,
    },
    {
      id: "sparePartsPrice",
      name: <div>Parts Price</div>,
      selector: "sparePartsPrice",
      format: (row) => row.sparePartsPrice,
    },
    {
      id: "calculatedPrice",
      name: <div>Total($)</div>,
      selector: "calculatedPrice",
      format: (row) => row.calculatedPrice,
    },
    {
      id: "comments",
      name: <div>Comments</div>,
      selector: "comments",
      format: (row) => row.comments || "",
    },
    {
      id: "comments",
      name: <div>Actions</div>,
      selector: "comments",
      //   format: (row) => "Actions",
      cell: (row, i) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <div>
            <Tooltip title="View">
              <Link className="px-1 cursor" onClick={() => handleEditItem(row)}>
                <VisibilityOutlinedIcon />
              </Link>
            </Tooltip>
          </div>
          <div>
            <DropdownButton
              className="customDropdown ml-2 width-p"
              id="dropdown-item-button"
            >
              <Dropdown.Item className=" cursor">
                <Tooltip title="Inclusion">
                  <Link
                    className="px-1 cursor"
                    onClick={(e) => handleItemInclusinExclusion(row)}
                  >
                    <img src={cpqIcon}></img>
                    <span className="ml-2">Inclusion / Exclusion</span>
                  </Link>
                </Tooltip>
              </Dropdown.Item>
              <Dropdown.Item
                className=""
                onClick={(e) => handleItemDelete(row)}
              >
                <Tooltip title="Delete">
                  <Link className="px-1 cursor">
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
                    <span className="ml-2">Delete</span>
                  </Link>
                </Tooltip>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      ),
    },
  ];

  // expended bundle/Service item
  const expendItemsColums = [
    {
      id: "ExpendItemIndex",
      name: <div />,
      sortable: false,
      width: "45px",
    },
    {
      id: "sNo",
      name: (
        <div className="d-flex align-items-baseline">
          <span className="portfolio-icon mr-1">
            <svg
              style={{ width: "11px" }}
              id="uuid-fd97eedc-9e4d-4a33-a68e-8d9f474ba343"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 119.30736 133.59966"
            >
              <path
                className="uuid-e6c3fd4e-386b-4059-8b00-0f6ea13faef9"
                d="M119.3072,35.67679c-.00098-.24805-.03125-.49072-.0752-.72974-.01123-.06348-.02441-.12573-.03857-.18799-.05225-.22827-.11768-.45239-.20703-.66675l-.021-.04858c-.09033-.20923-.20215-.40698-.3252-.59839-.03369-.05298-.06836-.10449-.10498-.15576-.13037-.18457-.27197-.36133-.43164-.52295-.00732-.00781-.01367-.0166-.02148-.02441-.16553-.16504-.3501-.31226-.54395-.44897-.0542-.03784-.10889-.073-.16455-.1084-.05908-.0376-.11377-.08057-.17529-.11548L61.71247,.54446c-1.27637-.72607-2.84082-.72607-4.11719,0L2.10895,32.06937c-.06152,.03491-.11621,.07788-.17529,.11548-.05566,.0354-.11035,.07056-.16406,.1084-.19434,.13672-.37891,.28394-.54443,.44897-.00781,.00781-.01367,.0166-.02148,.02441-.15967,.16162-.30078,.33838-.43164,.52295-.03613,.05127-.0708,.10278-.10498,.15576-.12305,.19141-.23486,.38916-.32471,.59839-.00732,.01636-.01465,.03198-.02148,.04858-.08936,.21436-.1543,.43848-.20703,.66675-.01416,.06226-.02734,.12451-.03857,.18799-.04346,.23901-.07422,.48169-.0752,.72974l.00049,.01001-.00049,.0061v63.37842l59.65381,34.52832,59.65332-34.52832V35.6929l-.00049-.0061,.00049-.01001ZM59.65387,8.96097l47.10889,26.76636-18.42969,10.66675L43.24177,18.28592l16.41211-9.32495Zm4.16748,61.25146l21.55762-12.47778v51.34448l-21.55762,12.47754v-51.34424ZM35.00007,22.96854l45.16357,28.15381-20.50977,11.87085L12.54499,35.72732l22.45508-12.75879ZM8.33503,42.92117l47.15137,27.29126v51.34424L8.33503,94.26565V42.92117Zm85.37891,61.33374V52.91043l17.2583-9.98926v51.34448l-17.2583,9.98926Z"
              />
            </svg>
          </span>
          <p className="mb-0 font-size-12 font-weight-500">Solution Sequence</p>
        </div>
      ),
      cell: (row, i) => <div>{i + 1 + 10}</div>,
      format: (row, i) => <div>{i + 1 + 10}</div>,
      wrap: true,
      sortable: false,
    },
    {
      id: "itemName",
      name: <div>Bundle ID</div>,
      cell: (row) => (
        <div className="d-flex align-items-baseline justify-content-left py-2 w-100 elipsis">
          <div className="icons-table mr-2 align-items-center d-flex justify-content-center">
            <span className="bundle">
              <svg
                version="1.1"
                id="Layer_1"
                style={{ width: "12px" }}
                viewBox="0 0 200 200"
              >
                <path
                  class="st0"
                  d="M191,51.6c-3.2-10.2-9.7-15.2-19.7-15.2c-0.5,0-1,0-1.5,0c-3.3,0.2-6.8,0.2-11.1,0.2c0,0,0,0,0,0
        c-2.9,0-5.9,0-8.7-0.1c-2.9,0-5.9-0.1-8.8-0.1h-1.9c0-0.2,0-0.3,0-0.5c0-1.9,0-3.7,0-5.5c-0.2-11.3-7.2-19.4-16.8-19.6
        c-7.4-0.1-14.9-0.2-22.4-0.2c-7.4,0-15,0.1-22.4,0.2c-9.7,0.2-16.6,8.2-16.8,19.5c0,1.7,0,3.5,0,5.3c0,0.2,0,0.4,0,0.7
        c-0.5,0-1,0.1-1.5,0.1c-2.8,0-5.6,0-8.4,0.1c-3,0-6.2,0.1-9.3,0.1c-4.4,0-8-0.1-11.3-0.2c-0.5,0-1,0-1.5,0c-10.1,0-16.5,5-19.7,15.2
        l-0.1,0.3v119.5l0.1,0.3c3.3,10.4,9.9,15.2,20.9,15.2l0.2,0c23.3-0.1,46.8-0.2,69.9-0.2c23.3,0,46.8,0.1,69.8,0.2l0.2,0
        c11,0,17.6-4.8,20.9-15.2l0.1-0.3V51.9L191,51.6z M127.3,35.6c0,0.2,0,0.5,0,0.7H72.8c0-0.3,0-0.5,0-0.8c-0.1-2.1-0.1-4.1,0.1-6
        c0.3-3.4,2.2-5.4,5.1-5.4c7.3,0,14.8-0.1,22.3-0.1c7,0,14.3,0,21.6,0.1c4.2,0,5.2,3.7,5.3,5.9C127.4,31.8,127.3,33.6,127.3,35.6z
        M104.8,101.2v12.1h-9.7v-12.1H104.8z M179,88.6c0,6.6-2.3,7.9-6.6,7.9c-8,0-16,0-23.9,0l-31.3,0c0-0.5,0-0.9,0-1.4
        c0-4.4-2.4-7.1-6.3-7.2c-3.6-0.1-7.2-0.1-10.8-0.1c-3.6,0-7.2,0-10.8,0.1c-3,0-6.3,2-6.3,7.2c0,0.4,0,0.8,0,1.3c-0.4,0-0.9,0-1.3,0
        c-10.5,0-21,0-31.5,0c-7.4,0-14.8,0-22.2,0c-4.9,0-6.9-1.2-6.9-8.3c0-11.9,0-21.6,0-30.5c0-6.7,2.2-7.9,6.6-7.9
        c24.1,0,48.3,0,72.4,0c24.1,0,48.3,0,72.4,0c4.3,0,6.5,1.2,6.5,8C179,68.2,179,78.6,179,88.6z M21,165.2c0-16.7,0-33.6,0-50
        c0,0,0-6.2,0-6.2c0.9,0.1,1.8,0.1,2.8,0.2c3.6,0.3,7.4,0.5,11.1,0.6c5.9,0,12.3,0.1,20.1,0.1c4.3,0,8.7,0,13,0c4.3,0,8.7,0,13,0H83
        c0,0.5,0,1,0,1.6c0,2.6,0,5.1,0,7.6c0.1,3.9,0.9,7.8,7,7.9c2.1,0,4.1,0,6.2,0c1.4,0,2.8,0,4.2,0c1.4,0,2.8,0,4.2,0
        c1.8,0,3.7,0,5.5,0h0.1c2.1,0,3.8-0.6,5-1.8c1.3-1.3,2-3.3,1.9-5.9c0-2.5,0-5.1,0-7.8c0-0.5,0-1,0-1.6h2.1c4.5,0,8.9,0,13.4,0
        c4.5,0,8.9,0,13.4,0c9.2,0,16.4,0,23.1-0.1c2.8,0,5.6-0.3,8.5-0.7c0.5-0.1,1-0.1,1.5-0.2l0,16.7c0,13.1,0,26.2,0,39.3
        c0,7.4-1.8,8.7-7.3,8.7c-23.3,0-46.6,0-69.9,0c-24.5,0-49,0-73.6,0C22.9,173.6,21,172.3,21,165.2z"
                />
              </svg>
            </span>
          </div>
          <div className="align-items-center d-flex justify-content-center">
            {row.itemName}
          </div>
        </div>
      ),
      sortable: false,
      wrap: true,
    },
    {
      id: "bundleItemDescription",
      name: <div>Bundle Description</div>,
      cell: (row, i) => (
        <div className="d-flex justify-content-between align-items-baseline py-2 elipsis">
          <div className="d-flex align-items-center" data-tag="allowRowEvents">
            {row?.itemDescription}
          </div>
          <div className="d-flex align-items-center">
            <div className="description cursor mr-1"></div>
          </div>
        </div>
      ),
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "bundleItemHeaderStrategy",
      name: <div>Strategy</div>,
      cell: (row) => (
        <div className="d-flex align-items-baseline py-2 w-100 elipsis">
          <div className="icons-table overflow-visible mr-2 align-items-center d-flex justify-content-center">
            <span className="bundle">
              <svg
                version="1.1"
                id="Layer_1"
                style={{ width: "12px" }}
                viewBox="0 0 200 200"
              >
                <path
                  class="st0"
                  d="M191,51.6c-3.2-10.2-9.7-15.2-19.7-15.2c-0.5,0-1,0-1.5,0c-3.3,0.2-6.8,0.2-11.1,0.2c0,0,0,0,0,0
                  c-2.9,0-5.9,0-8.7-0.1c-2.9,0-5.9-0.1-8.8-0.1h-1.9c0-0.2,0-0.3,0-0.5c0-1.9,0-3.7,0-5.5c-0.2-11.3-7.2-19.4-16.8-19.6
                  c-7.4-0.1-14.9-0.2-22.4-0.2c-7.4,0-15,0.1-22.4,0.2c-9.7,0.2-16.6,8.2-16.8,19.5c0,1.7,0,3.5,0,5.3c0,0.2,0,0.4,0,0.7
                  c-0.5,0-1,0.1-1.5,0.1c-2.8,0-5.6,0-8.4,0.1c-3,0-6.2,0.1-9.3,0.1c-4.4,0-8-0.1-11.3-0.2c-0.5,0-1,0-1.5,0c-10.1,0-16.5,5-19.7,15.2
                  l-0.1,0.3v119.5l0.1,0.3c3.3,10.4,9.9,15.2,20.9,15.2l0.2,0c23.3-0.1,46.8-0.2,69.9-0.2c23.3,0,46.8,0.1,69.8,0.2l0.2,0
                  c11,0,17.6-4.8,20.9-15.2l0.1-0.3V51.9L191,51.6z M127.3,35.6c0,0.2,0,0.5,0,0.7H72.8c0-0.3,0-0.5,0-0.8c-0.1-2.1-0.1-4.1,0.1-6
                  c0.3-3.4,2.2-5.4,5.1-5.4c7.3,0,14.8-0.1,22.3-0.1c7,0,14.3,0,21.6,0.1c4.2,0,5.2,3.7,5.3,5.9C127.4,31.8,127.3,33.6,127.3,35.6z
                  M104.8,101.2v12.1h-9.7v-12.1H104.8z M179,88.6c0,6.6-2.3,7.9-6.6,7.9c-8,0-16,0-23.9,0l-31.3,0c0-0.5,0-0.9,0-1.4
                  c0-4.4-2.4-7.1-6.3-7.2c-3.6-0.1-7.2-0.1-10.8-0.1c-3.6,0-7.2,0-10.8,0.1c-3,0-6.3,2-6.3,7.2c0,0.4,0,0.8,0,1.3c-0.4,0-0.9,0-1.3,0
                  c-10.5,0-21,0-31.5,0c-7.4,0-14.8,0-22.2,0c-4.9,0-6.9-1.2-6.9-8.3c0-11.9,0-21.6,0-30.5c0-6.7,2.2-7.9,6.6-7.9
                  c24.1,0,48.3,0,72.4,0c24.1,0,48.3,0,72.4,0c4.3,0,6.5,1.2,6.5,8C179,68.2,179,78.6,179,88.6z M21,165.2c0-16.7,0-33.6,0-50
                  c0,0,0-6.2,0-6.2c0.9,0.1,1.8,0.1,2.8,0.2c3.6,0.3,7.4,0.5,11.1,0.6c5.9,0,12.3,0.1,20.1,0.1c4.3,0,8.7,0,13,0c4.3,0,8.7,0,13,0H83
                  c0,0.5,0,1,0,1.6c0,2.6,0,5.1,0,7.6c0.1,3.9,0.9,7.8,7,7.9c2.1,0,4.1,0,6.2,0c1.4,0,2.8,0,4.2,0c1.4,0,2.8,0,4.2,0
                  c1.8,0,3.7,0,5.5,0h0.1c2.1,0,3.8-0.6,5-1.8c1.3-1.3,2-3.3,1.9-5.9c0-2.5,0-5.1,0-7.8c0-0.5,0-1,0-1.6h2.1c4.5,0,8.9,0,13.4,0
                  c4.5,0,8.9,0,13.4,0c9.2,0,16.4,0,23.1-0.1c2.8,0,5.6-0.3,8.5-0.7c0.5-0.1,1-0.1,1.5-0.2l0,16.7c0,13.1,0,26.2,0,39.3
                  c0,7.4-1.8,8.7-7.3,8.7c-23.3,0-46.6,0-69.9,0c-24.5,0-49,0-73.6,0C22.9,173.6,21,172.3,21,165.2z"
                />
              </svg>
            </span>
          </div>
          <div className="align-items-center d-flex" data-tag="allowRowEvents">
            {row?.itemHeaderStrategy}
          </div>
        </div>
      ),
      wrap: true,
      sortable: false,
    },
    {
      id: "bundleSjIdOrRkId",
      name: <div>Standard Job / Repair Option</div>,
      cell: (row, i) => (
        <div className="d-flex justify-content-between align-items-baseline py-2 w-100">
          <div className="d-flex " data-tag="allowRowEvents">
            {isEmpty(row?.standardJobId) && isEmpty(row?.repairKitId)
              ? "NA"
              : isEmpty(row?.standardJobId)
                ? row?.repairKitId
                : row?.standardJobId}
          </div>
        </div>
      ),
      wrap: true,
      sortable: false,
    },
    {
      id: "bundleFrequency",
      name: <div>Frequency</div>,
      cell: (row) => (
        <div className="d-flex align-items-baseline">
          {isEmpty(row.frequency) ? "NA" : row.frequency}
        </div>
      ),
      wrap: true,
      sortable: false,
    },
    {
      id: "bundleNumberOfEvents",
      name: <div>No. of Events</div>,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-baseline">
          <div>{row?.numberOfEvents}</div>
          <div className="funds-grey" />
        </div>
      ),
      wrap: true,
      sortable: false,
    },
    {
      id: "bundleSparePartsPrice",
      name: <div>Parts $</div>,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-baseline">
          <div>{row?.sparePartsPrice}</div>
          <div className="funds-grey" />
        </div>
      ),
      wrap: true,
      sortable: false,
    },
    {
      id: "bundleServicePrice",
      name: <div>Service $</div>,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-baseline">
          <div>{row?.servicePrice}</div>
          <div className="funds-grey" />
        </div>
      ),
      wrap: true,
      sortable: false,
    },
    {
      id: "bundleCalculatedPrice",
      name: <div>Total $</div>,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-baseline w-100">
          <div>{row?.calculatedPrice}</div>
          <div
            className="funds-grey cursor"
            onClick={() => handleReviewBundleServiceItemPrice(row)}
          >
            <svg
              style={{ width: "13px" }}
              version="1.1"
              id="Layer_1"
              viewBox="0 0 200 200"
            >
              <g>
                <g>
                  <path
                    class="st0"
                    d="M66.3,105.1c-4.5,0.1-8.3-3.7-8.3-8.2c0-4.3,3.6-8,8-8.1c4.5-0.1,8.3,3.7,8.3,8.2
                      C74.2,101.4,70.7,105,66.3,105.1z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M106.8,97.2c-0.1,4.5-4,8.1-8.5,7.9c-4.3-0.2-7.8-4-7.7-8.3c0.1-4.5,4-8.1,8.5-7.9
                      C103.4,89.1,106.9,92.9,106.8,97.2z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M139.4,96.8c0.1,4.5-3.6,8.3-8.1,8.3c-4.3,0-8-3.6-8.1-7.9c-0.1-4.5,3.6-8.3,8.1-8.3
                      C135.6,88.9,139.3,92.5,139.4,96.8z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M74.3,129.6c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.8-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C70.7,121.6,74.3,125.2,74.3,129.6z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M106.8,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C103.2,121.5,106.8,125.2,106.8,129.5z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M74.3,162.1c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C70.7,154.1,74.3,157.7,74.3,162.1z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M98.6,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C90.7,157.7,94.3,154.1,98.6,154z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M139.4,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C135.8,121.5,139.4,125.2,139.4,129.5z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M131.1,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C123.2,157.7,126.8,154.1,131.1,154z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M130.9,195.5H69.1c-25.4,0-46.2-20.7-46.2-46.2V50.6C23,25.2,43.7,4.5,69.1,4.5h61.7
                      c25.4,0,46.2,20.7,46.2,46.2v98.8C177,174.8,156.3,195.5,130.9,195.5z M69.1,16.4c-18.9,0-34.2,15.3-34.2,34.2v98.8
                      c0,18.9,15.3,34.2,34.2,34.2h61.7c18.9,0,34.2-15.3,34.2-34.2V50.6c0-18.9-15.3-34.2-34.2-34.2H69.1z"
                  />
                </g>
                <g>
                  <path
                    class="st0"
                    d="M128.7,68.1H71.3C61.2,68.1,53,59.9,53,49.7s8.2-18.4,18.4-18.4h57.4c10.1,0,18.4,8.2,18.4,18.4
                      S138.8,68.1,128.7,68.1z M71.3,43.3c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4h57.4c3.5,0,6.4-2.9,6.4-6.4
                      c0-3.5-2.9-6.4-6.4-6.4H71.3z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      ),
      wrap: true,
      sortable: false,
    },
    {
      id: "bundleActions",
      name: <div>Actions</div>,
      cell: (row) => (
        <div>
          <Tooltip title="View">
            <Link
              className="px-1 cursor"
              onClick={() => handleReviewBundleServiceItem(row)}
            >
              <VisibilityOutlinedIcon />
            </Link>
          </Tooltip>
        </div>
      ),
      wrap: true,
      sortable: false,
    },
  ];

  // expended Portfolio Bundle/Service Items data table component
  const expendPortfolioItems = ({ data }) => (
    <div className="expened-bundle-service-Items-data-table mb-3">
      <DataTable
        title=""
        columns={expendItemsColums}
        data={data.associatedServiceOrBundle}
        customStyles={dataTableCustomStyle}
        pagination={false}
      />
    </div>
  );

  // Review expended Bundle|Service Item
  const handleReviewBundleServiceItem = (row) => {
    setBundleServiceItemId(row.itemId);
    setBunleServiceItemFlag(
      row.bundleFlag === "SERVICE" ? "SERVICE" : "BUNDLE"
    );
    setShowBundleServiceModel(true);
  };

  const handleReviewBundleServiceItemPrice = (row) => {
    setBundleServiceItemId(row.itemId);
    setBunleServiceItemFlag(
      row.bundleFlag === "SERVICE" ? "SERVICE" : "BUNDLE"
    );
    setShowBundleServicePriceModel(true);
  };

  // Handle Delete Item
  const handleItemDelete = (row) => {
    const rUrl = CREATE_PORTFOLIO_ITEM() + "/" + row.itemId;
    callDeleteApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        // remove selecte row from portfolio items list
        const _itemsList = itemsList.filter(
          (item) => item.itemId !== row.itemId
        );
        setPortfolioItemsList(_itemsList);
        // get all itemId form select row item
        const rowItemIds = [{ itemId: row.itemId }].concat(
          row.associatedServiceOrBundle.map((item) => ({ itemId: item.itemId }))
        );
        // remove all item from portfolioId array list
        const _portfolioItemsIds = portfolioItemsIds.filter(
          (item1) => !rowItemIds.some((item2) => item2.itemId === item1.itemId)
        );
        setPortfolioItemsIds(_portfolioItemsIds);
        successMessage("Item delete successfully.");
      }
    });
  };

  // handle Edit item
  const handleEditItem = (row) => {
    setReviewTabItemList([...itemsList]);
    setRecorItemId(row.itemId);
    setEditItem(true);
    setBundleServiceItemsList(row["associatedServiceOrBundle"]);
    setExistBundleServiceItems(row["associatedServiceOrBundle"]);
    setShowAddItemModal(true);
  };

  //Item Inclusion|Exclusion Modal show
  const handleItemInclusinExclusion = (row) => {
    setShowInclusionExclusionModal(true);
  };

  const viewBundleServiceItemPriceDetails = () => {
    return (
      <Modal
        size="xl"
        show={showBundleServicePriceModel}
        onHide={() => setShowBundleServicePriceModel(false)}
      >
        <Modal.Body>
          <ItemPriceCalculator
            itemId={bundleServiceItemId}
            isEditable={true}
            reviewModeActive={true}
            priceModalView={true}
            hidePriceViewModal={() => setShowBundleServicePriceModel(false)}
            handleSavePriceChanges={handleSaveItemPriceChanges}
          />
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <div className="card mt-4 px-4">
        <div className="row align-items-center mt-3">
          <div className="col-11 mx-1">
            <div className="d-flex align-items-center w-100">
              <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                <h5 className="mb-2 text-black">
                  <span>Portfolio Items</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        {itemsList.length !== 0 ? (
          <div className="table-responsive">
            <div
              className="custom-table portfolioItems-expandable-data-table  card table-child"
              style={{ minHeight: 200, height: "auto", width: "100%" }}
            >
              <DataTable
                className={"portfolioItemsDataDatble"}
                columns={itemsColumns}
                data={itemsList}
                expandableRows={true}
                expandOnRowClicked
                expandableRowsComponent={expendPortfolioItems}
                customStyles={dataTableCustomStyle}
                pagination
              />
            </div>
          </div>
        ) : (
          <div className="p-4 row">
            <div
              className="col-md-6 col-sm-6"
              onClick={handleAddItem}
            // onClick={handleNewBundleItem}
            >
              <Link className="add-new-recod cursor">
                <div>
                  <FontAwesomeIcon icon={faPlus} />
                  <p className="font-weight-600">Add Portfolio Item</p>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="add-new-recod">
                <div>
                  <FontAwesomeIcon
                    className="cloudupload"
                    icon={faCloudUploadAlt}
                  />
                  <h6 className="font-weight-500 mt-3">
                    {" "}
                    Drag and drop files to upload <br /> or{" "}
                  </h6>
                  <a
                    className="btn text-light border-light font-weight-500 border-radius-10 mt-3 cursor"
                    onClick={handleDragAndDropModal}
                  >
                    <span className="mr-2">
                      {" "}
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    Select files to upload
                  </a>
                  <p className="mt-3">
                    Single upload file should not be more than <br />
                    10MB. Only the .lgs, .lgsx file types are allowed
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showDragAndDropModal && dragAndDropFileModal()}
      {showCoverageModal && viewCoverageModal()}
      {showAddItemModal && viewPortfolioItemTabsModel()}
      {showInclusionExclusionModal && (
        <InclusionExclusionModal
          show={showInclusionExclusionModal}
          hideModal={() => setShowInclusionExclusionModal(false)}
          showOptionalServicesModal={showOptionalServicesModal}
          handleOptionalServiceModal={handleOptionalServiceModal}
          checkedService={checkedService}
          setCheckedService={setCheckedService}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}
      {showBundleServiceModel && (
        <BundleServiceAddUpdate
          show={showBundleServiceModel}
          hideModel={() => setShowBundleServiceModel(false)}
          itemFlag={bunleServiceItemFlag}
          itemId={bundleServiceItemId}
          setItemId={setBundleServiceItemId}
          itemEditModeOn={true}
          reviewModeActive={true}
        />
      )}
      {showBundleServicePriceModel && viewBundleServiceItemPriceDetails()}
    </>
  );
};

export default PortfolioItemsList;
