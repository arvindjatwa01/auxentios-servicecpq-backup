import React, { useState } from "react";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { Button, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";

import {
  CONVERT_LINK_ITEM_TO_PORTFOLIO,
  CREATE_CUSTOM_PORTFOLIO_ITEM,
  CREATE_CUSTOM_PRICE,
  CREATE_PORTFOLIO_ITEM,
  GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE,
  PORTFOLIO_ITEM_PRICE_BY_ITEM_ID,
} from "services/CONSTANTS";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import CustomItemAddEdit from "./CustomItemAddEdit";
import ComponentCodeAddEdit from "./ComponentCodeAddEdit";
import CustomItemPriceCalculator from "./CustomItemPriceCalculator";
import ExpendCustomBundleServiceItem from "../useCase4Common/ExpendCustomBundleServiceItem";
import PortfolioCoverageSearch from "pages/PortfolioAndBundle/newCreatePortfolioData/PortfolioCoverageSearch";
import {
  dataTableCustomStyle,
  defaultCustomItemBodyModel,
  defaultCustomItemHeaderModel,
  additionalPriceKeyValuePair,
  usageTypeKeyValuePair,
  discountTypeKeyValuePair,
} from "pages/Common/PortfolioAndSolutionConstants";
import { updateCustomItemPricesSjRkId } from "pages/PortfolioAndBundle/newCreatePortfolioData/portfolio-item/SJRKIdUpdate";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
import { useSelector } from "react-redux";

const CustomItemTabsModal = (props) => {
  const {
    show,
    hideModal,
    customPortfolioId,
    searchBundleServiceItem,
    setSearchBundleServiceItem,
    selectedSearchedItems,
    setSelectedSearchedItems,
    isPortfolioItem,
    editItem,
    recordCustomItemId,
    setRecordCustomItemId,
    customItemIds,
    setCustomItemIds,
    bundleServiceItemsList,
    existBundleServiceItems,
    setBundleServiceItemsList,
    customItemsTableList,
    setCustomItemsTableList,
    handleUpdateSolutionHeader,
    setCustomItemReviewTabItemList,
    customItemReviewTabItemList,
  } = props;

  const {
    priceMethodKeyValuePair,
    priceTypeKeyValuePair,
    priceHeadTypeKeyValuePair,
    currencyKeyValuePair,
    frequencyKeyValuePairs,
    unitKeyValuePairs,
  } = useSelector((state) => state.commonAPIReducer);

  const [activeTab, setActiveTab] = useState(1);
  const [bundleServiceNeed, setBundleServiceNeed] = useState(true);

  const [itemRequestObj, setItemRequestObj] = useState({
    customItemId: 0,
    itemName: "",
  });

  const [customItemHeaderModelObj, setCustomItemHeaderModelObj] = useState({
    ...defaultCustomItemHeaderModel,
  });
  const [customItemBodyModelObj, setCustomItemBodyModelObj] = useState({
    ...defaultCustomItemBodyModel,
  });

  // Search Bundle||Service item Columns
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
    // {
    //   id: "select",
    //   name: <div>Select</div>,
    //   cell: (row) => (
    //     <input
    //       type="radio"
    //       name="selectedId"
    //       className="cursor"
    //       // value={row.itemId}
    //       // checked={tempBundleItemCheckList[row.itemId]}
    //       onChange={(e) => reviewTabItemSelection(e, row)}
    //       style={{ border: "1px solid #000" }}
    //     />
    //   ),
    //   wrap: true,
    //   sortable: false,
    //   allowOverflow: true,
    //   button: true,
    //   maxWidth: "53px",
    //   minWidth: "53px",
    // },
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
    // {
    //   id: "select",
    //   name: "",
    //   cell: () => null,
    // },
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

  // Cancel the Bundle|Service Item table data
  const handleCancelSearchBundleService = () => {
    setSelectedSearchedItems([]);
    setSearchBundleServiceItem([]);
  };

  // Select Search Bundle|Service table Item data
  const handleSelectSearchedItems = async () => {
    try {
      if (isEmpty(customPortfolioId)) {
        throw "Please Create Solution first, then you can add selected Bundle/Service Items";
      }

      if (isEmpty(recordCustomItemId)) {
        throw "Please Create Item first, then you can add selected Bundle/Service Items";
      }

      let rUrl =
        CONVERT_LINK_ITEM_TO_PORTFOLIO +
        selectedSearchedItems
          .map((data) => `item_id=${data.itemId}`)
          .join("&") +
        `&custom_portfolio_item_id=${recordCustomItemId}&custom_portfolio_id=${customPortfolioId}`;

      handleConvertLinkItemToPortfolio(rUrl).then((res) => {
        if (res.apiSuccess) {
          handleGetBundleServiceItemPriceData(res.responseData);
        }
      });

      // const selectedBundleSericeItemIds = [];
      // for (let selectedItem of selectedSearchedItems) {
      //  const customBundleService = await handleGetSelectBundleServiceDetails(
      //     selectedItem,
      //     selectedBundleSericeItemIds
      //   );
      // }
      // if (selectedBundleSericeItemIds.length !== 0) {
      //   var bundleServicePriceUrl = selectedBundleSericeItemIds
      //     .map((data) => `itemIds=${data.customItemId}`)
      //     .join("&");
      //   handleGetBundleServiceItemPriceData(bundleServicePriceUrl);
      // }
    } catch (error) {
      errorMessage(error);
      return;
    }
  };

  // link bundle|service item to Portfolio (convert into Custom Bundle|Service)
  const handleConvertLinkItemToPortfolio = async (rUrl) => {
    return new Promise((resolve, reject) => {
      callGetApi(
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            const result = response.data;

            const bundleServicePriceUrl = result
              .map((data) => `itemIds=${data.customItemId}`)
              .join("&");

            const _customItemIds = [...customItemIds];
            for (let itemData of result) {
              _customItemIds.push({ customItemId: itemData.customItemId });
            }
            setCustomItemIds(_customItemIds);

            resolve({
              apiSuccess: true,
              responseData: bundleServicePriceUrl,
            });
          } else {
            resolve({
              apiSuccess: false,
              responseData: null,
            });
          }
        },
        (error) => {
          resolve({
            apiSuccess: false,
            responseData: null,
          });
        }
      );
    });
  };

  // get the selected Bundle|Service Item Details
  const handleGetSelectBundleServiceDetails = async (
    itemData,
    selectedBundleSericeItemIds
  ) => {
    const rUrl = `${CREATE_PORTFOLIO_ITEM()}/${itemData.itemId}`;
    await callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const { itemId, itemName, itemBodyModel, itemHeaderModel } =
          response.data;
        const customItemPrices = [];
        const customItemPriceSjRkIdData = [];
        if (itemBodyModel.itemPrices.length !== 0) {
          for (let itemPriceData of itemBodyModel.itemPrices) {
            handleGetSelectedBundleServicePriceDetails(
              itemPriceData.itemPriceDataId,
              customItemPrices,
              customItemPriceSjRkIdData
            );
          }
        }

        const itemRecordObj = {
          customItemId: 0,
          itemName: itemName,
          customItemHeaderModel: {
            customItemHeaderId: 0,
            itemHeaderDescription: itemHeaderModel.itemHeaderDescription,
            bundleFlag: itemHeaderModel.bundleFlag,
            withBundleService: itemHeaderModel.withBundleService,
            portfolioItemIds: [recordCustomItemId],
            reference: itemHeaderModel.reference,
            itemHeaderMake: itemHeaderModel.itemHeaderMake,
            itemHeaderFamily: itemHeaderModel.itemHeaderFamily,
            model: itemHeaderModel.model,
            prefix: itemHeaderModel.prefix,
            type: itemHeaderModel.type || "EMPTY",
            additional: itemHeaderModel.additional,
            currency: itemHeaderModel.currency,
            netPrice: itemHeaderModel.netPrice,
            itemProductHierarchy:
              itemHeaderModel.itemProductHierarchy || "EMPTY",
            itemHeaderGeographic:
              itemHeaderModel.itemHeaderGeographic || "EMPTY",
            responseTime: itemHeaderModel.responseTime || "EMPTY",
            usage: itemHeaderModel.usage,
            validFrom: itemHeaderModel.validFrom,
            validTo: itemHeaderModel.validTo,
            estimatedTime: itemHeaderModel.estimatedTime,
            servicePrice: itemHeaderModel.servicePrice,
            status: itemHeaderModel.status,
            componentCode: itemHeaderModel.componentCode,
            componentDescription: itemHeaderModel.componentDescription,
            serialNumber: itemHeaderModel.serialNumber,
            itemHeaderStrategy: itemHeaderModel.itemHeaderStrategy || "EMPTY",
            variant: itemHeaderModel.variant || "EMPTY",
            itemHeaderCustomerSegment:
              itemHeaderModel.itemHeaderCustomerSegment,
            jobCode: itemHeaderModel.jobCode,
            preparedBy: itemHeaderModel.preparedBy,
            approvedBy: itemHeaderModel.approvedBy,
            preparedOn: itemHeaderModel.preparedOn,
            revisedBy: itemHeaderModel.revisedBy,
            revisedOn: itemHeaderModel.revisedOn,
            salesOffice: itemHeaderModel.salesOffice,
            offerValidity: itemHeaderModel.offerValidity,
            serviceChargable: itemHeaderModel.serviceChargable,
            serviceOptional: itemHeaderModel.serviceOptional,
          },
          customItemBodyModel: {
            customItemBodyId: 0,
            itemBodyDescription: itemBodyModel.itemBodyDescription,
            spareParts: [itemBodyModel.spareParts[0] || "EMPTY"],
            labours: [itemBodyModel.labours[0] || "EMPTY"],
            miscellaneous: [itemBodyModel.miscellaneous[0] || "EMPTY"],
            taskType: [itemBodyModel.taskType[0] || "EMPTY"],
            solutionCode: itemBodyModel.solutionCode,
            usageIn: itemBodyModel.usageIn,
            usage: itemBodyModel.usage,
            year: itemBodyModel.year,
            avgUsage: itemBodyModel.avgUsage,
            customItemPrices: customItemPrices,
          },
        };

        handleCreateCustomBundleServiceItem(
          itemRecordObj,
          customItemPrices,
          customItemPriceSjRkIdData
        ).then((res) => {
          if (res.apiSuccess) {
            selectedBundleSericeItemIds.push({
              customItemId: res.responseData,
            });
          }
        });
      }
    });
  };

  // get the Selected Bundle|Service Item Price Details
  const handleGetSelectedBundleServicePriceDetails = async (
    itemPriceDataId,
    customItemPrices,
    customItemPriceSjRkIdData
  ) => {
    return new Promise((resolve, reject) => {
      const priceReqURl = `${PORTFOLIO_ITEM_PRICE_BY_ITEM_ID()}/${itemPriceDataId}`;
      callGetApi(
        priceReqURl,
        (response) => {
          if (response.status === API_SUCCESS) {
            const itemPriceResult = response.data;
            const priceCreateReqObj = {
              customItemPriceDataId: 0,
              quantity: parseInt(itemPriceResult.quantity),
              standardJobId: itemPriceResult.standardJobId,
              repairKitId: itemPriceResult.repairKitId,
              templateDescription: itemPriceResult.templateDescription,
              repairOption: itemPriceResult.repairOption,
              additional: itemPriceResult.additional,
              partListId: itemPriceResult.partListId,
              serviceEstimateId: itemPriceResult.serviceEstimateId,
              numberOfEvents: itemPriceResult.numberOfEvents,
              frequency: itemPriceResult.frequency || "CYCLIC",
              priceMethod: itemPriceResult.priceMethod || "LIST_PRICE",
              priceType: itemPriceResult.priceType || "EVENT_BASED",
              listPrice: itemPriceResult.listPrice,
              priceEscalation: itemPriceResult.priceEscalation,
              calculatedPrice: itemPriceResult.calculatedPrice,
              flatPrice: itemPriceResult.flatPrice,
              year: itemPriceResult.year || 1,
              noOfYear: itemPriceResult.noOfYear || 1,
              sparePartsPrice: itemPriceResult.sparePartsPrice,
              sparePartsPriceBreakDownPercentage:
                itemPriceResult.sparePartsPriceBreakDownPercentage,
              servicePrice: itemPriceResult.servicePrice,
              labourPrice: itemPriceResult.labourPrice,
              labourPriceBreakDownPercentage:
                itemPriceResult.labourPriceBreakDownPercentage,
              miscPrice: itemPriceResult.miscPrice,
              miscPriceBreakDownPercentage:
                itemPriceResult.miscPriceBreakDownPercentage,
              totalPrice: itemPriceResult.totalPrice,
              netService: itemPriceResult.netService,
              additionalPriceType:
                itemPriceResult.additionalPriceType || "ABSOLUTE",
              additionalPriceValue: itemPriceResult.additionalPriceValue,
              discountType:
                itemPriceResult.discountType || "PORTFOLIO_DISCOUNT",
              discountValue: itemPriceResult.discountValue,
              recommendedValue: itemPriceResult.recommendedValue,
              startUsage: itemPriceResult.startUsage,
              endUsage: itemPriceResult.endUsage,
              sparePartsEscalation: itemPriceResult.sparePartsEscalation,
              labourEscalation: itemPriceResult.labourEscalation,
              miscEscalation: itemPriceResult.miscEscalation,
              serviceEscalation: itemPriceResult.serviceEscalation,
              withBundleService: itemPriceResult.withBundleService,
              sparePartsNOE: itemPriceResult.sparePartsNOE,
              labourNOE: itemPriceResult.labourNOE,
              miscNOE: itemPriceResult.miscNOE,
              recommendedUnit: itemPriceResult.recommendedUnit || "MONTH",
              usageUnit: itemPriceResult.usageUnit || "YEAR",
              customPortfolio: isEmpty(customPortfolioId)
                ? null
                : {
                    portfolioId: customPortfolioId,
                  },
              inclusionExclusion: itemPriceResult.inclusionExclusion,
              partsRequired: itemPriceResult.partsRequired,
              labourRequired: itemPriceResult.labourRequired,
              miscRequired: itemPriceResult.miscRequired,
              serviceRequired: itemPriceResult.serviceRequired,
            };

            handleCreateCustomItemPrice(priceCreateReqObj).then((res) => {
              if (res.apiSuccess) {
                customItemPrices.push({
                  customItemPriceDataId: res.responseData.customItemPriceDataId,
                });
                customItemPriceSjRkIdData.push({
                  standardJobId: res.responseData.standardJobId,
                  repairKitId: res.responseData.repairKitId,
                  itemId: null,
                  itemPriceDataId: res.responseData.customItemPriceDataId,
                });
                // resolve({
                //   apiSuccess: true,
                //   responseData: customItemPrices
                // })
                resolve(true);
              } else {
                resolve(false);
              }
            });
          } else {
            resolve(false);
          }
        },
        (error) => {
          resolve(false);
        }
      );
    });
  };

  // create the Custom item Price Data
  const handleCreateCustomItemPrice = async (requestObj) => {
    return new Promise((resolve, reject) => {
      const rUrl = CREATE_CUSTOM_PRICE();
      callPostApi(
        null,
        rUrl,
        requestObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            resolve({ apiSuccess: true, responseData: response.data });
          } else {
            resolve({ apiSuccess: false, responseData: null });
          }
        },
        (error) => {
          resolve({ apiSuccess: false, responseData: null });
        }
      );
    });
  };

  // create Custom Bundle|Service Item
  const handleCreateCustomBundleServiceItem = async (
    requestObj,
    customItemPrices,
    customItemPriceSjRkIdData
  ) => {
    return new Promise((resolve, reject) => {
      const rUrl = CREATE_CUSTOM_PORTFOLIO_ITEM();
      callPostApi(
        null,
        rUrl,
        requestObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            const bundleServiceResult = response.data;
            for (let itemPrice of customItemPrices) {
              const sjRkIdDataObj = customItemPriceSjRkIdData.find(
                (obj) => obj.itemPriceDataId === itemPrice.customItemPriceDataId
              );
              if (!isEmpty(sjRkIdDataObj)) {
                updateCustomItemPricesSjRkId({
                  ...sjRkIdDataObj,
                  itemId: bundleServiceResult.customItemId,
                });
              }
            }
            resolve({
              apiSuccess: true,
              responseData: bundleServiceResult.customItemId,
            });
          } else {
            resolve({
              apiSuccess: false,
              responseData: null,
            });
          }
        },
        (error) => {
          resolve({
            apiSuccess: false,
            responseData: null,
          });
        }
      );
    });
  };

  // get the selected Bundle|service item Price data
  const handleGetBundleServiceItemPriceData = (reqUrlEndPath) => {
    const rUrl = `${
      GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE + reqUrlEndPath
    }`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const res = response.data;
        const _bundleServiceItemsList = [...bundleServiceItemsList];

        res.map((data) => {
          for (let i = 0; i < data.bundleItems.length; i++) {
            _bundleServiceItemsList.push(data.bundleItems[i]);
          }

          for (let j = 0; j < data.serviceItems.length; j++) {
            _bundleServiceItemsList.push(data.serviceItems[j]);
          }

          // if (
          //   data.portfolioItem &&
          //   Object.keys(data.portfolioItem).length !== 0
          // ) {
          //   _portfolioItems.push({
          //     ...data.portfolioItem,
          //     associatedServiceOrBundle: portfolioBundleService,
          //   });
          // }
        });
        setBundleServiceItemsList(_bundleServiceItemsList);
        setSelectedSearchedItems([]);
        setSearchBundleServiceItem([]);
      }
    });
  };

  // go through with selected bundle and Service on save & Continue
  const handleContinueWithSelectebundleService = async () => {
    if (existBundleServiceItems.length === bundleServiceItemsList.length) {
      setActiveTab(3);
    } else {
      let rUrl = GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE;
      rUrl =
        rUrl +
        customItemIds.map((item) => `itemIds=${item.customItemId}`).join("&");

      await callGetApi(rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const res = response.data;
          const _portfolioItems = [];

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
              _portfolioItems.push({
                ...data.portfolioItem,
                associatedServiceOrBundle: portfolioBundleService,
              });
            }
          });
          setCustomItemsTableList(_portfolioItems);
          setCustomItemReviewTabItemList(_portfolioItems);
          handleUpdateSolutionHeader();
          setActiveTab(3);
        }
      });
    }
  };

  // Hide Portfolio Item Tabs Model
  const hideItemAddUpdateModel = () => {
    hideModal();
    setBundleServiceNeed(true);
    setActiveTab(1);
  };

  // fetch the Portfolio item tab data
  const handleGetCustomPortfolioItemData = (
    isViewModeOn,
    itemRecordObj,
    itemPriceData,
    isPortfolioItem,
    isEditable
  ) => {
    if (isPortfolioItem) {
      const _customItemPrice = [...customItemBodyModelObj.customItemPrices];
      if (
        !_customItemPrice.some(
          (obj) =>
            obj.customItemPriceDataId === itemPriceData.customItemPriceDataId
        ) &&
        !isEmpty(itemPriceData.customItemPriceDataId)
      ) {
        _customItemPrice.push({
          customItemPriceDataId: itemPriceData.customItemPriceDataId,
        });
      }

      // set Item basic details
      const _itemRequestObj = {
        ...itemRequestObj,
        itemName: itemRecordObj.name,
      };
      setItemRequestObj({ ..._itemRequestObj });

      // set custom Item header modal Obj Value
      const _customItemHeaderModelObj = {
        ...customItemHeaderModelObj,
        itemHeaderDescription: itemRecordObj.description,
        usage: itemRecordObj.usageType?.value || "",
        itemHeaderStrategy: itemRecordObj?.strategyTask?.value || "EMPTY",
      };
      setCustomItemHeaderModelObj({ ..._customItemHeaderModelObj });

      // set item body modal obj value
      const _customItemBodyModelObj = {
        ...customItemBodyModelObj,
        itemBodyDescription: itemRecordObj.description,
        taskType: itemRecordObj.taskType,
        usageIn: itemRecordObj.usageIn,
        usage: itemRecordObj.usageType,
        year: itemPriceData.year?.value,
        customItemPrices: _customItemPrice,
      };
      setCustomItemBodyModelObj({ ..._customItemBodyModelObj });

      if (!isViewModeOn) {
        handleAddUpdateCustomPortfolioItem(
          isEditable,
          _itemRequestObj,
          _customItemHeaderModelObj,
          _customItemBodyModelObj
        ).then((res) => {
          if (res) {
            setActiveTab(bundleServiceNeed ? 2 : 3);
          }
        });
      } else {
        setActiveTab(bundleServiceNeed ? 2 : 3);
      }
    }
  };

  // create|update Portfolio Item Tabs data
  const handleAddUpdateCustomPortfolioItem = (
    isEditable,
    itemRequestObj,
    customItemHeaderReqObj,
    customItemBodyReqObj
  ) => {
    return new Promise((resolve, reject) => {
      let rUrl = CREATE_CUSTOM_PORTFOLIO_ITEM();
      if (isEditable) {
        // rUrl = rUrl + "/" + itemRequestObj.itemId;
        rUrl = rUrl + "/" + recordCustomItemId;
      }

      const requestObj = {
        customItemId: itemRequestObj.customItemId,
        itemName: itemRequestObj.itemName,
        customItemHeaderModel: {
          ...customItemHeaderReqObj,
          usage:
            customItemHeaderReqObj.usage?.value ||
            customItemHeaderReqObj.usage ||
            "",
          bundleFlag: "PORTFOLIO",
          type: customItemHeaderReqObj.type || "EMPTY",
        },
        customItemBodyModel: {
          ...customItemBodyReqObj,
          // itemBodyDescription: itemBodyReqObj.itemBodyDescription,
          taskType: [customItemBodyReqObj.taskType?.value || "EMPTY"],
          usageIn:
            customItemBodyReqObj.usageIn?.value ||
            customItemBodyReqObj.usageIn ||
            "",
          usage:
            customItemBodyReqObj.usage?.value ||
            customItemBodyReqObj.usage ||
            "",
          year:
            customItemBodyReqObj.year?.value || customItemBodyReqObj.year || "",
        },
      };

      if (isEditable) {
        callPutApi(
          null,
          rUrl,
          requestObj,
          (response) => {
            if (response.status === API_SUCCESS) {
              resolve(true);
            } else {
              resolve(false);
              errorMessage(response?.data.message);
            }
          },
          (error) => {
            resolve(false);
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
              const _customItemIds = [...customItemIds];
              _customItemIds.push({ customItemId: res.customItemId });
              setCustomItemIds(_customItemIds);
              setItemRequestObj({
                ...itemRequestObj,
                customItemId: res.customItemId,
              });
              setRecordCustomItemId(res.customItemId);
              // updateItemPriceSjRkId({
              //   standardJobId: itemPriceObj.standardJobId,
              //   repairKitId: itemPriceObj.repairKitId,
              //   itemId: itemId,
              //   itemPriceDataId:
              //     itemBodyData.itemPrices[itemBodyData.itemPrices.length - 1]
              //       .itemPriceDataId,
              // });
              resolve(true);
            } else {
              resolve(false);
              errorMessage(response?.data.message);
            }
          },
          (error) => {
            resolve(false);
          }
        );
      }
    });
  };

  // Save the Component tab data Changes
  const handleSaveItemComponentCodeData = (
    isEditable,
    requestItemObj,
    requestItemHeaderObj,
    requestItemBodyObj
  ) => {
    if (isEditable) {
      setActiveTab(4);
    } else {
      setCustomItemHeaderModelObj({
        ...customItemHeaderModelObj,
        componentCode: requestItemHeaderObj.componentCode,
        componentDescription: requestItemHeaderObj.componentDescription,
        itemHeaderMake: requestItemHeaderObj.itemHeaderMake,
        itemHeaderFamily: requestItemHeaderObj.itemHeaderFamily,
        model: requestItemHeaderObj.model,
        prefix: requestItemHeaderObj.prefix,
        serialNumber: requestItemHeaderObj.serialNumber,
      });
      const rUrl = `${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${recordCustomItemId}`;
      const requestObj = {
        customItemId: requestItemObj.customItemId,
        itemName: requestItemObj.itemName,
        customItemHeaderModel: {
          ...requestItemHeaderObj,
        },
        customItemBodyModel: {
          ...requestItemBodyObj,
        },
      };
      callPutApi(
        null,
        rUrl,
        requestObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            setActiveTab(4);
          } else {
            errorMessage(response?.data.message);
          }
        },
        (error) => {
          errorMessage(error);
        }
      );
    }
  };

  // Save the Price tab data Changes
  const handleSaveItemPriceChanges = (
    requestItemObj,
    requestItemHeaderObj,
    requestItemBodyObj,
    viewModeActive
  ) => {
    if (viewModeActive) {
      setActiveTab(5);
    } else {
      // set item header modal obj
      const _customItemHeaderModelObj = {
        ...customItemHeaderModelObj,
        usage:
          requestItemHeaderObj.usage?.value || requestItemHeaderObj.usage || "",
        currency:
          requestItemHeaderObj.currency?.value ||
          requestItemHeaderObj.currency ||
          "",
        type: requestItemHeaderObj.type || "EMPTY",
      };
      setCustomItemHeaderModelObj({ ..._customItemHeaderModelObj });

      // set item body modal obj
      const _customItemBodyModelObj = {
        ...customItemBodyModelObj,
        usage:
          requestItemBodyObj.usage?.value || requestItemBodyObj.usage || "",
        year: requestItemBodyObj.year?.value || requestItemBodyObj.year || "",
      };
      setCustomItemBodyModelObj({ ..._customItemBodyModelObj });

      const requestObj = {
        ...itemRequestObj,
        customItemHeaderModel: {
          ...customItemHeaderModelObj,
          usage:
            requestItemHeaderObj.usage?.value ||
            requestItemHeaderObj.usage ||
            "",
          currency:
            requestItemHeaderObj.currency?.value ||
            requestItemHeaderObj.currency ||
            "",
          type: requestItemHeaderObj.type || "EMPTY",
        },
        customItemBodyModel: {
          ...customItemBodyModelObj,
          taskType: [
            customItemBodyModelObj?.taskType?.value ||
              customItemBodyModelObj?.taskType ||
              "EMPTY",
          ],
          usageIn:
            customItemBodyModelObj?.usageIn?.value ||
            customItemBodyModelObj?.usageIn ||
            "",
          usage:
            requestItemBodyObj.usage?.value || requestItemBodyObj.usage || "",
          year: requestItemBodyObj.year?.value || requestItemBodyObj.year || "",
        },
      };

      const rUrl = `${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${recordCustomItemId}`;
      callPutApi(
        null,
        rUrl,
        requestObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            setActiveTab(5);
          } else {
            errorMessage(response?.data?.message);
          }
        },
        (error) => {
          errorMessage(error);
        }
      );
    }
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

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Box sx={{ typography: "body1" }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="custom-tabs-div"
                onChange={(e, tabIndex) => editItem && setActiveTab(tabIndex)}
              >
                <Tab label="Portfolio Item" value={1} />
                <Tab
                  label="Service/Bundle"
                  value={2}
                  // disabled={!bundleServiceNeed}
                />
                <Tab label="Component Data" value={3} />
                <Tab label="Price Calculator" value={4} />
                <Tab label="Review" value={5} />
              </TabList>
            </Box>
            <TabPanel value={activeTab}>
              {activeTab === 1 && (
                <CustomItemAddEdit
                  itemType="portfolioItem"
                  isEditable={editItem}
                  isPortfolioItem={true}
                  bundleServiceNeed={bundleServiceNeed}
                  handleBundleServiceNeed={() =>
                    setBundleServiceNeed(!bundleServiceNeed)
                  }
                  handleGetPortfolioItemsData={handleGetCustomPortfolioItemData}
                  itemId={recordCustomItemId}
                  portfolioId={customPortfolioId}
                  hideItemAddUpdateModel={hideItemAddUpdateModel}
                />
              )}
              {activeTab === 2 && (
                <>
                  <PortfolioCoverageSearch
                    searchFlag="bundleSearch"
                    handleAddSearchItem={(items) =>
                      setSearchBundleServiceItem(items)
                    }
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
                            onClick={() => handleCancelSearchBundleService([])}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn bg-primary text-white"
                            disabled={selectedSearchedItems.length === 0}
                            onClick={handleSelectSearchedItems}
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
                          <ExpendCustomBundleServiceItem
                            bundleServiceRowData={row.data}
                            priceMethodKeyValuePair={priceMethodKeyValuePair}
                            priceTypeKeyValuePair={priceTypeKeyValuePair}
                            frequencyKeyValuePairs={frequencyKeyValuePairs}
                            unitKeyValuePairs={unitKeyValuePairs}
                            existBundleServiceItems={existBundleServiceItems}
                            bundleServiceItemsList={bundleServiceItemsList}
                          />
                        )}
                        expandOnRowClicked
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
                </>
              )}
              {activeTab === 3 && (
                <ComponentCodeAddEdit
                  itemType="portfolioItem"
                  isPortfolioItem={true}
                  portfolioId={customPortfolioId}
                  itemId={recordCustomItemId}
                  isEditable={editItem}
                  handelSaveComponentCodeData={handleSaveItemComponentCodeData}
                />
              )}
              {activeTab === 4 && (
                <CustomItemPriceCalculator
                  itemId={recordCustomItemId}
                  isEditable={editItem}
                  handleSavePriceChanges={handleSaveItemPriceChanges}
                />
              )}

              {activeTab === 5 && (
                <div
                  className="custom-table portfolioItems-expandable-data-table card expand-last-child"
                  style={{ height: 400, width: "100%" }}
                >
                  <DataTable
                    columns={reviewTabColumns}
                    data={customItemReviewTabItemList}
                    expandableRows={true}
                    expandOnRowClicked
                    expandableRowsComponent={viewReviewTabExpendedItems}
                    customStyles={dataTableCustomStyle}
                    pagination
                  />
                </div>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        {activeTab === 5 && (
          <Button
            variant="primary"
            onClick={hideModal}
            // onClick={handleAddReviewTabItem}
          >
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomItemTabsModal;
