import React from "react";
import DataTable from "react-data-table-component";

const ItemPaginationDataTable = ({props}) => {
    const {className, colums, data = [], pagination } = props;
  const columss = [
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
      format: (row, i) => i,
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
        format: (row) =>  row.taskType,
    },
    {
        id: "quantity",
        name: <div>Quantity</div>,
        selector: "quantity",
        format: (row) =>  row.quantity || 1,
    },
    {
        id: "recommendedValue",
        name: <div>Recommended Value</div>,
        selector: "recommendedValue",
        format: (row) =>  row.recommendedValue,
    },
    {
        id: "servicePrice",
        name: <div>Service Price</div>,
        selector: "servicePrice",
        format: (row) =>  row.servicePrice,
    },
    {
        id: "sparePartsPrice",
        name: <div>Parts Price</div>,
        selector: "sparePartsPrice",
        format: (row) =>  row.sparePartsPrice,
    },
    {
        id: "calculatedPrice",
        name: <div>Total($)</div>,
        selector: "calculatedPrice",
        format: (row) =>  row.calculatedPrice,
    },
    {
        id: "comments",
        name: <div>Comments</div>,
        selector: "comments",
        format: (row) =>  row.comments || "",
    },
    {
        id: "comments",
        name: <div>Actions</div>,
        selector: "comments",
        format: (row) => "Actions",
    },
];

  return (
    <>
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
    </>
  );
};

export default ItemPaginationDataTable;
