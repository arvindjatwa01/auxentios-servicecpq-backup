import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import CustomItemAddEdit from "./CustomItemAddEdit";
import ComponentCodeAddEdit from "./ComponentCodeAddEdit";
import CustomItemPriceCalculator from "./CustomItemPriceCalculator";
import PortfolioCoverageSearch from "pages/PortfolioAndBundle/newCreatePortfolioData/PortfolioCoverageSearch";
import { dataTableCustomStyles } from "../Use_Case_4_Constansts";
import DataTable from "react-data-table-component";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";

const CustomItemTabsModal = (props) => {
  const {
    show,
    hideModal,
    customPortfolioId,
    searchBundleServiceItem,
    setSearchBundleServiceItem,
    selectedSearchedItems,
    setSelectedSearchedItems,
  } = props;
  const [activeTab, setActiveTab] = useState(1);

  const handleAddSearchItems = () => {};

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

  const handleCancelSearchBundleService = () => {
    setSelectedSearchedItems([]);
    setSearchBundleServiceItem([]);
  };

  const handleSelectSearchedItems = () => {
    try {
      if (isEmpty(customPortfolioId)) {
        throw "Please Create Solution first, then you can add selected Bundle/Service Items";
      }

      // if (isEmpty(customPortfolioId)) {
      //   throw "Please Create Item first, then you can add selected Bundle/Service Items";
      // }
      
    } catch (error) {
      errorMessage(error);
      return;
    }
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Box sx={{ typography: "body1" }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="custom-tabs-div"
                onChange={(e, tabIndex) => setActiveTab(tabIndex)}
                // onChange={(e, newValue) => { portfolioItemDataEditable && setTabs(newValue) }}
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
              {activeTab === 1 && <CustomItemAddEdit />}
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
                        customStyles={dataTableCustomStyles}
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
                            // onClick={addSelectedSearchedItems}
                          >
                            + Add Selected
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {activeTab === 3 && <ComponentCodeAddEdit />}
              {activeTab === 4 && <CustomItemPriceCalculator />}

              {/* Tab {activeTab} */}
            </TabPanel>
          </TabContext>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default CustomItemTabsModal;
