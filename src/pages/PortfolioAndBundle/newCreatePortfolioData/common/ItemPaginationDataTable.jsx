import React from "react";
import DataTable from "react-data-table-component";

const ItemPaginationDataTable = ({ props }) => {
  const { className, colums, data = [], pagination } = props;

  return (
    <DataTable
      className={className}
      columns={colums}
      data={data}
      // customStyles={dataTableCustomStyle}
      // selectableRows={isSelectAble}
      // onSelectedRowsChange={(state) =>
      //   setCheckedCoverageData(state.selectedRows)
      // }
      pagination={pagination}
    />
  );
};

export default ItemPaginationDataTable;
