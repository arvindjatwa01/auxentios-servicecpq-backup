import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";

import {
  claimRequestObj,
  payerOptions,
} from "pages/MasterData/warrantyMaster/WarrantyConstants";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import {
  claimStatusOptions,
  claimTypeOptions,
} from "pages/MasterData/claimMaster/ClaimMasterConstants";
import { Claim_Details_By_Id_Get } from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

const ClaimWarrantyDetails = ({
  show,
  hideModal,
  recordId,
  handleSack,
  handleCreateClaimOrder,
}) => {
  const [claimRecord, setClaimRecord] = useState({ ...claimRequestObj });

  useEffect(() => {
    if (recordId) {
      const rUrl = `${Claim_Details_By_Id_Get}${recordId}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          const _claimStatus = claimStatusOptions.find(
            (obj) => obj.value === responseData.claimStatus
          );
          const _claimType = claimTypeOptions.find(
            (obj) => obj.value === responseData.claimType
          );

          const _payer = payerOptions.find(
            (obj) => obj.value === responseData.payer
          );

          setClaimRecord({
            ...responseData,
            claimStatus: _claimStatus,
            claimType: _claimType,
            payer: _payer,
          });
        }
      });
    }
  }, [recordId]);
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <>
          <h4 style={{ fontWeight: 500 }}>Claim Details</h4>
          <div className="card border px-2 py-3 mt-2 mb-0">
            <div className="row align-items-end px-2 py-2">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Number
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.claimNumber)
                      ? "NA"
                      : claimRecord.claimNumber}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Modal Number
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.modelNumber)
                      ? "NA"
                      : claimRecord.modelNumber}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Equipment Number
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.equipmentNumber)
                      ? "NA"
                      : claimRecord.equipmentNumber}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Serial Number
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.serialNumber)
                      ? "NA"
                      : claimRecord.serialNumber}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Component Code
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.componentCode)
                      ? "NA"
                      : claimRecord.componentCode}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Status
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.claimStatus?.label)
                      ? "NA"
                      : claimRecord.claimStatus?.label}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Type
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.claimType?.label)
                      ? "NA"
                      : claimRecord.claimType?.label}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Replacement
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {claimRecord.replacement ? "Yes" : "No"}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Fill Date
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.fillDate)
                      ? "NA"
                      : getFormatDateTime(claimRecord.fillDate, false)}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Failure Part Number
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.failurePartNumber)
                      ? "NA"
                      : claimRecord.failurePartNumber}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Hour on Machine
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.hourOnMachine)
                      ? "NA"
                      : claimRecord.hourOnMachine}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Hours on Failed Part
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.hoursOnFailedPart)
                      ? "NA"
                      : claimRecord.hoursOnFailedPart}
                  </h6>
                </div>
              </div>
              {/* <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Upload Photo
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.uploadPhoto)
                      ? "NA"
                      : claimRecord.uploadPhoto}
                  </h6>
                </div>
              </div> */}
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Part List
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.partList)
                      ? "NA"
                      : claimRecord.partList}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Time taken for the Repair
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.repairTime)
                      ? "NA"
                      : claimRecord.repairTime}
                  </h6>
                </div>
              </div>

              {/* <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Questionnaire
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.claimQuestionnaire)
                      ? "NA"
                      : claimRecord.claimQuestionnaire}
                  </h6>
                </div>
              </div> */}
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Payer
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.payer?.label)
                      ? "NA"
                      : claimRecord.payer?.label}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Approver
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.claimApprover)
                      ? "NA"
                      : claimRecord.claimApprover}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Created By
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.createdBy)
                      ? "NA"
                      : claimRecord.createdBy}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Updated By
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.updatedBy)
                      ? "NA"
                      : claimRecord.updatedBy}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Created On
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.createdOn)
                      ? "NA"
                      : getFormatDateTime(claimRecord.createdOn, false)}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Updated On
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.updatedOn)
                      ? "NA"
                      : getFormatDateTime(claimRecord.updatedOn, false)}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Receipt Date
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.claimReceiptDate)
                      ? "NA"
                      : getFormatDateTime(claimRecord.claimReceiptDate, false)}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Created Date
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.createdDate)
                      ? "NA"
                      : getFormatDateTime(claimRecord.createdDate, false)}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Closed Date
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.closedDate)
                      ? "NA"
                      : getFormatDateTime(claimRecord.closedDate, false)}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Approved / Rejected On
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.appoverRejectedOn)
                      ? "NA"
                      : getFormatDateTime(claimRecord.appoverRejectedOn, false)}
                  </h6>
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Story
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.claimStory)
                      ? "NA"
                      : claimRecord.claimStory}
                  </h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Approval / Rejection Notes
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.claimNotes)
                      ? "NA"
                      : claimRecord.claimNotes}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <button className="btn btn-primary mx-3" onClick={hideModal}>
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={handleCreateClaimOrder}
            >
              Create Claim Request
            </button>
          </div>
        </>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimWarrantyDetails;
