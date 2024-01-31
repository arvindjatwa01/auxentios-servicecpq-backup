import React from "react";

import AddIcon from "@mui/icons-material/Add";
import DataTable from "react-data-table-component";

import {
  dataTableStyle,
  searchOptions,
  warrantySearchOptions,
} from "./equipmentConstant";
import EquipmentSearchComponent from "./EquipmentSearchComponent";

const EquipmentDataTable = ({ columns, data, title, buttonText="Upload" }) => {
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
              // pagination
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentDataTable;
