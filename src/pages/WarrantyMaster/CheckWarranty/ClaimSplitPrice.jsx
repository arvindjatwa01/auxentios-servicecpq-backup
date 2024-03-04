import React, { useState } from "react";
import SolutionQuotePayerGridTable from "pages/SolutionModules/SolutionQuotePayerGridTable";

const ClaimSplitPrice = ({ handleSnack }) => {
  const [addPayerData, setAddPayerData] = useState([]);
  const [quoteIdIs, setQuoteIdIs] = useState(0);
  return (
    <>
      <div className="mt-3">
        <SolutionQuotePayerGridTable
          handleSnack={handleSnack}
          dataRows={addPayerData}
          quoteId={quoteIdIs}
        />
      </div>
    </>
  );
};

export default ClaimSplitPrice;
