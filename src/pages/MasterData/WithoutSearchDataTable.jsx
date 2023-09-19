import React from "react";
import { dataTableStyle } from "./equipmentConstant";
import DataTable from "react-data-table-component";

const WithoutSearchDataTable = ({ columns, data, title, showAddBtn=false }) => {
  return (
      <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="font-weight-600 mb-0 mr-3">{title}</h6>
          {showAddBtn && (
            <a className="btn cursor bg-primary text-white">Add New</a>
          )}
        </div>
        <div className="table-responsive mt-3">
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
        </div>
      </div>
  );
};

export default WithoutSearchDataTable;
