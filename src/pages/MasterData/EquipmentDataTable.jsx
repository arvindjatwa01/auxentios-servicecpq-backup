import React from "react";

import AddIcon from "@mui/icons-material/Add";
import DataTable from "react-data-table-component";

import {
  dataTableStyle,
  searchOptions,
  warrantySearchOptions,
} from "./equipmentConstant";
import EquipmentSearchComponent from "./EquipmentSearchComponent";
import { dataTableCustomStyle } from "pages/Common/PortfolioAndSolutionConstants";

const EquipmentDataTable = ({
  columns,
  data,
  title,
  buttonText = "Upload",
  expandable = false,
  expandablColumns,
}) => {
  const expendSubComponentRow = (data, searchFlag) => {
    return (
      <div className="p-5 border-bottom">
        <div className="border border-radius-10">
          <div className="d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center">
              <h6 className="mb-0 font-weight-600 font-size-14 mr-3">
                Sub Component
              </h6>
              {/* <div className="d-flex align-items-center">
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
              </div> */}
            </div>
            {!searchFlag && (
              <div className="border-left d-flex align-items-center">
                <a
                  style={{ whiteSpace: "pre" }}
                  className="btn-sm cursor"
                  // onClick={handleAddMoreBundleService}
                >
                  <span className="mr-2">
                    <AddIcon />
                  </span>
                  Add
                </a>
              </div>
            )}
          </div>
          {/* {bundelServiceItems.associatedServiceOrBundle.length !== 0 && (
            <DataTable
              customStyles={dataTableCustomStyle}
              data={bundelServiceItems.associatedServiceOrBundle}
              columns={searchBundleServiceItemColumns}
              pagination={true}
            />
          )} */}
        </div>
      </div>
    );
  };
  return (
    <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
      <div className="row align-items-center">
        <div className="col-lg-9 col-md-9">
          <div className="d-flex align-items-center">
            <h6 className="font-weight-500 mb-0 mr-3">{title}</h6>
            <EquipmentSearchComponent
              searchOptions={
                title.toLowerCase() === "warranty"
                  ? warrantySearchOptions
                  : searchOptions
              }
              searchPlaceholder={title}
            />
          </div>
        </div>
        <div className="col-lg-3 col-md-3 text-right">
          <a href="#" className="btn bg-primary text-white">
            <span className="mr-1">
              <AddIcon />
            </span>
            {buttonText}
          </a>
        </div>
      </div>
      <div className="table-responsive mt-3">
        {data.length !== 0 && (
          <div
            className="custom-table  table-child"
            style={{ height: "auto", width: "100%" }}
          >
            <DataTable
              columns={columns}
              data={data}
              customStyles={dataTableStyle}
              expandableRows={expandable}
              expandableRowsComponent={(itemData) =>
                expendSubComponentRow(itemData.data, true)
              }
              pagination={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentDataTable;
