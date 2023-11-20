import React, { useState } from "react";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import Select from "react-select";
import {
  IS_PORTFOLIO,
  IS_SOLUTION,
  PORTFOLIO_SEARCH,
  PORTFOLIO_SEARCH_OPTIONS,
  dataTableCustomStyles,
} from "../Use_Case_4_Constansts";
import { Link } from "react-router-dom";
import PortfolioSolutionSearch from "./PortfolioSolutionSearch";
import CustomItemTabsModal from "./CustomItemTabsModal";
import DataTable from "react-data-table-component";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import {
  COPY_MASTER_TO_CUSTOM_PORTFOLIO,
  GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE,
} from "services/CONSTANTS";

const CustomPortfolioItemsList = (props) => {
  const {
    customPortfolioId,
    customItemsTableList,
    setCustomItemsTableList,
    customItemIds,
    setCustomItemIds,
  } = props;

  const [searchPortfolioSolutionItems, setSearchPortfolioSolutionItems] =
    useState([]);
  const [selectedSearchSolutionItems, setSelectedSearchSolutionItems] =
    useState([]);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [searchBySolutionOrPortlio, setSearchBySolutionOrPortlio] =
    useState("");

  const handleShowItemCreateModal = () => {
    setShowCustomItemModal(true);
  };

  // item Columns Data
  const searchItemsColumns = [
    {
      id: "searcItemId",
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
      selector: (row) => row.itemId || "",
      wrap: true,
      sortable: false,
      // format: (row) => row.itemId,
    },
    {
      id: "searchItemName",
      name: <div>Solution ID</div>,
      selector: (row) => row.itemName || "",
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemDescription",
      name: <div>Solution Description</div>,
      selector: (row) => row.itemDescription || "N/A",
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "searchItemStrategy",
      name: <div>Strategy</div>,
      selector: (row) => row.itemHeaderStrategy || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemTaskType",
      name: <div>Task Type</div>,
      selector: (row) => row.taskType || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemQuantity",
      name: <div>Quantity</div>,
      selector: (row) => row.quantity || 1,
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemRecommendedValue",
      name: <div>Recommended Value</div>,
      selector: (row) => row.recommendedValue || 0,
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemServicePrice",
      name: <div>Service Price</div>,
      selector: (row) => row.servicePrice || 0,
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemPartsPrice",
      name: <div>Parts Price</div>,
      selector: (row) => row.sparePartsPrice || 0,
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemTotalPrice",
      name: <div>Total $</div>,
      selector: (row) => row.calculatedPrice || 0,
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemComments",
      name: <div>Commnets</div>,
      selector: (row) => row.comments || "NA",
      wrap: true,
      sortable: false,
    },
  ];

  // item bundle Service Items Columns
  const searchBundleServiceItemColumns = [
    {
      id: "searchItemBundleServiceDescription",
      name: <div>Description</div>,
      selector: (row) => row?.itemDescription || "N/A",
      wrap: true,
      sortable: false,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      id: "searchItemBundleServiceQuantity",
      name: <div>Quantity</div>,
      selector: (row) => row?.quantity || 1,
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemBundleServiceServicePrice",
      name: <div>Service Price</div>,
      selector: (row) => row.servicePrice || 0,
      wrap: true,
      sortable: false,
    },
    {
      id: "searchItemBundleServiceTotalPrice",
      name: <div>Total $</div>,
      selector: (row) => row?.calculatedPrice || 0,
      wrap: true,
      sortable: false,
    },
  ];

  // Expended bundle|Service items
  const expendSearchItemRowForBundleService = (
    bundelServiceItems,
    searchFlag
  ) => {
    return (
      <div className="p-5 border-bottom">
        <div className="border border-radius-10">
          <div className="d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center">
              <h6 className="mb-0 font-weight-600 font-size-14 mr-3">
                Item tree
              </h6>
              <div className="d-flex align-items-center">
                <a className="mr-2 cursor">
                  <span>
                    <ModeEditOutlineOutlinedIcon />
                  </span>
                </a>
                <a className="mr-2 cursor">
                  <span>
                    <ShareOutlinedIcon />
                  </span>
                </a>
              </div>
            </div>
            {!searchFlag && (
              <div className="border-left d-flex align-items-center">
                <a
                  style={{ whiteSpace: "pre" }}
                  className="btn-sm cursor"
                  // onClick={showAddBundleServiceItemPopup}
                >
                  <span className="mr-2">
                    <AddIcon />
                  </span>
                  Add
                </a>
              </div>
            )}
          </div>
          {bundelServiceItems.associatedServiceOrBundle.length !== 0 && (
            <DataTable
              customStyles={dataTableCustomStyles}
              data={bundelServiceItems.associatedServiceOrBundle}
              columns={searchBundleServiceItemColumns}
              expandableRows
              expandableRowsComponent={(componentData) =>
                expendSearchItemBundleServiceForComponentData(
                  componentData.data,
                  searchFlag
                )
              }
              pagination={true}
            />
          )}
        </div>
      </div>
    );
  };

  // expended Bundle|Service Componenet data
  const expendSearchItemBundleServiceForComponentData = (data, searchFlag) => {
    return (
      <div className="p-5">
        <div className="border border-radius-10">
          <div className="d-flex align-items-center border-bottom justify-content-between p-3">
            <div className="d-flex align-items-center">
              <h6 className="mb-0 font-weight-600 font-size-14 mr-3">
                Components
              </h6>
              <div className="d-flex align-items-center">
                <a className="mr-2 cursor">
                  <span>
                    <ModeEditOutlineOutlinedIcon />
                  </span>
                </a>
                <a className="mr-2 cursor">
                  <span>
                    <ShareOutlinedIcon />
                  </span>
                </a>
                {/* <a className="cursor">
                <span><SearchIcon /></span>
              </a> */}
              </div>
            </div>
            {!searchFlag && (
              <div className="border-left d-flex align-items-center">
                <a style={{ whiteSpace: "pre" }} className="btn-sm cursor">
                  <span className="mr-2">
                    <AddIcon />
                  </span>
                  Add
                </a>
              </div>
            )}
          </div>
          <ul className="mb-0 component-li">
            <li className="border-bottom p-3">
              <div className="d-flex align-items-center">
                <p className="mb-0 font-size-14">
                  {isEmpty(data.componentCode) ? "N/A" : data.componentCode}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // copy Master to Portfolio
  const handleCopyMasterToPortfolio = async (rUrl) => {
    return new Promise((resolve, reject) => {
      callGetApi(
        null,
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            resolve({ status: true, responsePacket: response.data });
          } else {
            resolve({ status: false, responsePacket: [] });
          }
        },
        (error) => {
          resolve({ status: false, responsePacket: [] });
        }
      );
    });
  };

  // get Select Portfolio item item price data
  const handleShowSelectPortfolioItemInTable = (rUrlEndPoint) => {
    const rUrl = `${
      GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE + rUrlEndPoint
    }`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const res = response.data;
        const _customPortfolioItems = [];
        const _customItemsTableList = [...customItemsTableList];

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
            _customPortfolioItems.push({
              ...data.portfolioItem,
              associatedServiceOrBundle: portfolioBundleService,
            });
          }
        });

        // add select row in master data
        _customPortfolioItems.length !== 0 &&
          _customPortfolioItems.map((data, i) => {
            if (
              !_customItemsTableList.some((item) => item.itemId === data.itemId)
            ) {
              _customItemsTableList.push(data);
            }
          });
        setCustomItemsTableList(_customItemsTableList);
      }
    });
  };

  // Add selected Items data for items table List
  const handleAddSelecteItems = async () => {
    if (searchBySolutionOrPortlio === IS_PORTFOLIO) {
      for (const rowData of selectedSearchSolutionItems) {
        if ("portfolioId" in rowData) {
          const rUrl = `${COPY_MASTER_TO_CUSTOM_PORTFOLIO}portfolio_id=${rowData.portfolioId}&custom_portfolio_id=${customPortfolioId}`;
          handleCopyMasterToPortfolio(rUrl).then((res) => {
            console.log(res);
            if (res.status) {
              const _customItemIds = [...customItemIds];
              const itemArray = [];
              if (res.responsePacket.itemRelations.length !== 0) {
                res.responsePacket.itemRelations.map((itemData) => {
                  _customItemIds.push({
                    customItemId: itemData.portfolioItemId,
                  });
                  itemArray.push({
                    customItemId: itemData.portfolioItemId,
                  });

                  itemData.bundles.length !== 0 &&
                    itemData.bundles.map((bundleItem) => {
                      _customItemIds.push({ customItemId: bundleItem });
                      itemArray.push({ customItemId: bundleItem });
                    });

                  itemData.services.length !== 0 &&
                    itemData.services.map((serviceItem) => {
                      _customItemIds.push({ customItemId: serviceItem });
                      itemArray.push({ customItemId: serviceItem });
                    });
                });
              }
              setCustomItemIds([..._customItemIds]);
              var itemPriceHierachyUrl = itemArray
                .map((data) => `itemIds=${data.customItemId}`)
                .join("&");

              // show selecte Portfolio items data in selected Table List
              handleShowSelectPortfolioItemInTable(itemPriceHierachyUrl);
            }
          });
        }
      }
      setSelectedSearchSolutionItems([]);
      setSearchPortfolioSolutionItems([]);
    } else if (searchBySolutionOrPortlio === IS_SOLUTION) {
      const _customItemsTableList = [...customItemsTableList];
      const _customItemIds = [...customItemIds];

      // add select row in master data
      selectedSearchSolutionItems.map((data, i) => {
        if (
          !_customItemsTableList.some((item) => item.itemId === data.itemId)
        ) {
          _customItemsTableList.push(data);
        }
      });
      setCustomItemsTableList(_customItemsTableList);

      // get Filter item id's from selected Items from add into Solution(Custom Portfolio)
      const customItemIdsFromSelectedRow = selectedSearchSolutionItems
        .flatMap((item) => [
          item.itemId,
          ...item.associatedServiceOrBundle.map(
            (associate) => associate.itemId
          ),
        ])
        .filter(
          (itemId) =>
            !_customItemIds.some((item) => item.customItemId === itemId)
        ) // Include only not exists itemIds
        .map((customItemId) => ({ customItemId }));
      setCustomItemIds([..._customItemIds, ...customItemIdsFromSelectedRow]);

      setSelectedSearchSolutionItems([]);
      setSearchPortfolioSolutionItems([]);
    }
  };

  return (
    <>
      <div className="card mt-4 px-4">
        <div className="d-flex align-items-center mt-3">
          <div className="d-flex align-items-center mr-4">
            <h5 className="mb-0 mr-3 text-black">
              <span style={{ whiteSpace: "pre" }}>Solution Item</span>
            </h5>
            <div className="d-flex">
              <a className="mr-2 cursor">
                <span>
                  <ModeEditOutlineOutlinedIcon />
                </span>
              </a>
              <a className="cursor">
                <span>
                  <ShareOutlinedIcon />
                </span>
              </a>
            </div>
          </div>
          <div
            className="mr-3 input-group icons border"
            style={{ borderRadius: "5px" }}
          >
            <PortfolioSolutionSearch
              customPortfolioId={customPortfolioId}
              setCustomItemsTableList={setCustomItemsTableList}
              setSearchPortfolioSolutionItems={setSearchPortfolioSolutionItems}
              setSelectedSearchSolutionItems={setSelectedSearchSolutionItems}
              setSearchBySolutionOrPortlio={setSearchBySolutionOrPortlio}
            />
          </div>
          <div className="border-left d-flex align-items-center px-2 py-2">
            <a
              style={{ whiteSpace: "pre" }}
              className="btn-sm cursor"
              onClick={handleShowItemCreateModal}
              // onClick={handleNewBundleItem}
            >
              <span className="mr-2">
                <AddIcon />
              </span>
              Add
            </a>
          </div>
        </div>
        <div>
          <div
            className="custom-table card mt-3"
            style={{ minHeight: 200, height: "auto", width: "100%" }}
          >
            {searchPortfolioSolutionItems.length !== 0 && (
              <>
                <DataTable
                  data={searchPortfolioSolutionItems}
                  columns={searchItemsColumns}
                  expandableRows
                  expandableRowsComponent={(itemData) =>
                    expendSearchItemRowForBundleService(itemData.data, true)
                  }
                  selectableRows
                  onSelectedRowsChange={(row) =>
                    setSelectedSearchSolutionItems(row.selectedRows)
                  }
                  customStyles={dataTableCustomStyles}
                  pagination={true}
                />
                <div>
                  <div className="text-right pb-3 pr-4">
                    <input
                      // onClick={handleAddSearchPortfolioSolutionItems}
                      onClick={handleAddSelecteItems}
                      className="btn bg-primary text-white"
                      value="+ Add Selected"
                      disabled={selectedSearchSolutionItems.length === 0}
                    />
                  </div>
                </div>
              </>
            )}
            {customItemsTableList.length !== 0 && (
              <DataTable
                data={customItemsTableList}
                columns={searchItemsColumns}
                expandableRows
                expandableRowsComponent={(itemData) =>
                  expendSearchItemRowForBundleService(itemData.data, false)
                }
                customStyles={dataTableCustomStyles}
                pagination={true}
              />
            )}
          </div>
        </div>
      </div>
      {showCustomItemModal && (
        <CustomItemTabsModal
          show={showCustomItemModal}
          hideModal={() => setShowCustomItemModal(false)}
        />
      )}
    </>
  );
};

export default CustomPortfolioItemsList;
