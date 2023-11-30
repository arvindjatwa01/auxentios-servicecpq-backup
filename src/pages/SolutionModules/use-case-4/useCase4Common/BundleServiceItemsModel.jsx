import PortfolioCoverageSearch from "pages/PortfolioAndBundle/newCreatePortfolioData/PortfolioCoverageSearch";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { dataTableCustomStyles } from "../Use_Case_4_Constansts";
import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
import {
  CONVERT_LINK_ITEM_TO_PORTFOLIO,
  GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { callGetApi } from "services/ApiCaller";
import ExpendCustomBundleServiceItem from "./ExpendCustomBundleServiceItem";

const BundleServiceItemsModel = (props) => {
  const {
    show,
    hideModal,
    customPortfolioId,
    customItemIds,
    setCustomItemIds,
    expendedCustomItemRow,
    existingBundleService = [],
    bundleServiceItemsList = [],
    setBundleServiceItemsList = null,
    handleUpdateSolutionHeader = null,
    setCustomItemsTableList = null,
    setCustomItemReviewTabItemList = null,
    priceMethodKeyValuePair = [],
    priceTypeKeyValuePair = [],
    frequencyKeyValuePairs = [],
    unitKeyValuePairs = [],
  } = props;

  const [searchBundleServiceItem, setSearchBundleServiceItem] = useState([]);
  const [selectedSearchedItems, setSelectedSearchedItems] = useState([]);

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

      if (isEmpty(expendedCustomItemRow.itemId)) {
        throw "Please Create Item first, then you can add selected Bundle/Service Items";
      }

      let rUrl =
        CONVERT_LINK_ITEM_TO_PORTFOLIO +
        selectedSearchedItems
          .map((data) => `item_id=${data.itemId}`)
          .join("&") +
        `&custom_portfolio_item_id=${expendedCustomItemRow.itemId}&custom_portfolio_id=${customPortfolioId}`;

      handleConvertLinkItemToPortfolio(rUrl).then((res) => {
        if (res.apiSuccess) {
          handleGetBundleServiceItemPriceData(res.responseData);
        }
      });
    } catch (error) {
      errorMessage(error);
      return;
    }
  };

  // link bundle|service item to Portfolio (convert into Custom Bundle|Service)
  const handleConvertLinkItemToPortfolio = async (rUrl) => {
    return new Promise((resolve, reject) => {
      callGetApi(
        null,
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

  // get the selected Bundle|service item Price data
  const handleGetBundleServiceItemPriceData = (reqUrlEndPath) => {
    const rUrl = `${
      GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE + reqUrlEndPath
    }`;
    callGetApi(null, rUrl, (response) => {
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
        });
        setBundleServiceItemsList(_bundleServiceItemsList);
        setSelectedSearchedItems([]);
        setSearchBundleServiceItem([]);
      }
    });
  };

  // go through with selected bundle and Service on save & Continue
  const handleContinueWithSelectebundleService = async () => {
    if (existingBundleService.length === bundleServiceItemsList.length) {
      hideModal();
    } else {
      let rUrl = GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE;
      rUrl =
        rUrl +
        customItemIds.map((item) => `itemIds=${item.customItemId}`).join("&");

      await callGetApi(null, rUrl, (response) => {
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
          hideModal();
        }
      });
    }
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Header className="border-none d-flex justify-content-between align-items-center align-items-center">
        <h4>
          <b>Search Bundle/Services</b>
        </h4>
      </Modal.Header>
      <Modal.Body>
        <PortfolioCoverageSearch
          searchFlag="bundleSearch"
          handleAddSearchItem={(items) => setSearchBundleServiceItem(items)}
        />
        {searchBundleServiceItem.length !== 0 && (
          <>
            <DataTable
              columns={bundleServiceItemsColumns}
              data={searchBundleServiceItem}
              customStyles={dataTableCustomStyles}
              selectableRows
              selectableRowsHighlight
              onSelectedRowsChange={(rows) =>
                setSelectedSearchedItems(rows.selectedRows)
              }
              pagination
            />
            <div className="row mb-3 justify-content-end px-3">
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
              customStyles={dataTableCustomStyles}
              pagination
              expandableRows
              expandableRowsComponent={(row) => (
                <ExpendCustomBundleServiceItem
                  bundleServiceRowData={row.data}
                  priceMethodKeyValuePair={priceMethodKeyValuePair}
                  priceTypeKeyValuePair={priceTypeKeyValuePair}
                  frequencyKeyValuePairs={frequencyKeyValuePairs}
                  unitKeyValuePairs={unitKeyValuePairs}
                  existBundleServiceItems={existingBundleService}
                  bundleServiceItemsList={bundleServiceItemsList}
                />
              )}
              expandOnRowClicked
            />
            <div className="row mt-5 px-3" style={{ justifyContent: "right" }}>
              <button
                type="button"
                className="btn bg-primary text-white"
                onClick={handleContinueWithSelectebundleService}
              >
                {existingBundleService.length === bundleServiceItemsList.length
                  ? "Close"
                  : "Save & Close"}
              </button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BundleServiceItemsModel;
