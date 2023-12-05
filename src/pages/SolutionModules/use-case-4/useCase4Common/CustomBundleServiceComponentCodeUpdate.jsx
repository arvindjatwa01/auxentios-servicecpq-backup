import React from "react";
import { Modal } from "react-bootstrap";
import ComponentCodeAddEdit from "../customPortfolioItems/ComponentCodeAddEdit";
import { CREATE_CUSTOM_PORTFOLIO_ITEM } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { callPutApi } from "services/ApiCaller";
import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";

const CustomBundleServiceComponentCodeUpdate = (props) => {
  const { show, hideModal, customPortfolioId, expendedBundleServiceRow } =
    props;

  // Save the Component tab data Changes
  const handleSaveItemComponentCodeData = (
    isEditable,
    requestItemObj,
    requestItemHeaderObj,
    requestItemBodyObj
  ) => {
    if (isEditable) {
    //   hideModal();
    } else {
      const rUrl = `${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${expendedBundleServiceRow.itemId}`;
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
            // hideModal();
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
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body className="px-3">
        <ComponentCodeAddEdit
          itemType="portfolioItem"
          isPortfolioItem={true}
          portfolioId={customPortfolioId}
          itemId={expendedBundleServiceRow.itemId}
          isEditable={false}
          handelSaveComponentCodeData={handleSaveItemComponentCodeData}
          buttonClassName="px-3"
        />
      </Modal.Body>
    </Modal>
  );
};

export default CustomBundleServiceComponentCodeUpdate;
