import React, { useState, useEffect, useCallback } from "react";

import Pagination from "@mui/material/Pagination";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { Button, Modal } from "react-bootstrap";

import { callGetApi } from "services/ApiCaller";
import { CREATE_PORTFOLIO_ITEM } from "services/CONSTANTS";

import { errorMessage } from "../utilities/toastMessage";
import LoadingProgress from "pages/Repair/components/Loader";

const pageSize = 6;

const OptionalServiceModal = ({
  showOptionalServicesModal,
  handleOptionalServiceModal,
  checkedService,
  setCheckedService,
  selectedService,
  setSelectedService,
  showSelectedServicesModal,
  handleSelectedServiceModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [optionalServicesList, setOptionalServicesList] = useState([]);

  useEffect(() => {
    if (showOptionalServicesModal) {
      getOptionalServiceList();
    }
  }, [showOptionalServicesModal]);

  // get Optional Service List
  const getOptionalServiceList = useCallback(
    (pageNo = null) => {
      setLoading(true);
      const rUrl =
        CREATE_PORTFOLIO_ITEM() +
        "/services?pageNumber=" +
        (pageNo ? pageNo : 0) +
        "&pageSize=" +
        pageSize;

      callGetApi(
        rUrl,
        (response) => {
          if (response.status === 200) {
            const res = response.data;
            if (pageNo === null) {
              setTotalRecords(res.totalRecords);
              setTotalPages(res.totalPages + 1);
            }
            setOptionalServicesList(res.data);
            setLoading(false);
            console.log("response optional service ======== ", response);
          } else {
            setLoading(false);
          }
        },
        (error) => {
          setLoading(false);
        }
      );
    },
    [currentPage]
  );

  // handle Page Change
  const handlePageChange = (e, val) => {
    setCurrentPage(val);
    getOptionalServiceList(val - 1);
  };

  // Service CheckBox Check|Uncheck
  const handleServiceCheckbox = (e, obj) => {
    try {
      const { checked } = e.target;
      const _checkedService = [...checkedService];
      if (checked) {
        _checkedService.push({ ...obj, checked: true });
      } else {
        const index = _checkedService.findIndex(
          (checkdObj) => checkdObj.itemId === obj.itemId
        );
        _checkedService.splice(index, 1);
      }
      setCheckedService(_checkedService);
    } catch (error) {
      return;
    }
  };

  // Add selected service items
  const handleAddCheckedServices = () => {
    if (checkedService.length === 0) {
      errorMessage("Select at least one service.");
      return;
    }
    setSelectedService([...checkedService]);
    handleOptionalServiceModal();
  };

  // remove Selected service
  const handleRemoveService = (serviceObj) => {
    // remove from selected list
    const _selectedService = [...selectedService];
    const serviceIndex = _selectedService.findIndex(
      (obj) => obj.itemId === serviceObj.itemId
    );
    _selectedService.splice(serviceIndex, 1);
    setSelectedService(_selectedService);

    // remove from checked list
    const _checkedService = [...checkedService];
    const checkedServiceIndex = _checkedService.findIndex(
      (obj) => obj.itemId === serviceObj.itemId
    );
    _checkedService.splice(checkedServiceIndex, 1);
    setCheckedService(_checkedService);
  };

  // Add more services
  const handleAddMoreServices = () => {
    handleSelectedServiceModal();
    handleOptionalServiceModal();
  };

  // Optional services with pagination modal box
  const viewAllOptionalService = () => {
    return (
      <Modal
        show={showOptionalServicesModal}
        onHide={handleOptionalServiceModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="border-none d-flex justify-content-between align-items-center align-items-center">
          <h4>
            <b>Select Optional Services</b>
          </h4>
          {/* <button className="btn btn-primary mr-2" onClick={handleSelectCheckedServices} disabled={checkedService.length === 0}> + Add Selected</button> */}
          <button
            className="btn btn-primary mr-2"
            onClick={handleAddCheckedServices}
            disabled={checkedService.length === 0}
          >
            {" "}
            + Add Selected
          </button>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingProgress />
            </div>
          ) : (
            <>
              <div className=" p-2">
                <div className="row">
                  {
                    <>
                      {optionalServicesList.length !== 0 &&
                        optionalServicesList.map((serviceObj, i) => (
                          <div className="col-md-6 col-sm-6">
                            <div className="card p-4">
                              <div className="d-flex align-items-center cursor">
                                <div class="checkbox mr-3">
                                  <input
                                    type="checkbox"
                                    id={serviceObj.itemName + "-" + i}
                                    checked={checkedService.some(
                                      (obj) => obj.itemId === serviceObj.itemId
                                    )}
                                    onChange={(e) =>
                                      handleServiceCheckbox(e, serviceObj)
                                    }
                                  />
                                </div>
                                <div
                                  className="mt-1"
                                  htmlFor={serviceObj.itemName + "-" + i}
                                >
                                  <p className="mb-0 font-size-16 text-black">
                                    <b>{serviceObj.itemName}</b>
                                  </p>
                                  <p className=" mt-1 mb-0 font-size-14">
                                    {serviceObj.itemHeaderDescription}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        //   onChange={handleOptionalServicePageClick}
                        onChange={handlePageChange}
                        shape="rounded"
                        hidePrevButton
                        hideNextButton
                        size="large"
                        className="optional-services-pagination"
                      />
                    </>
                  }
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  // Selected Services modal box
  const viewSelectedServices = () => {
    return (
      <Modal
        show={showSelectedServicesModal}
        onHide={handleSelectedServiceModal}
        size="md"
        centered={true}
      >
        <div className="p-3 bg-light-blue">
          <h6 className="m-0 font-weight-600">Selected Optional Services</h6>
        </div>
        <div className="bg-white p-3 select-services-scroll">
          {selectedService.length !== 0 &&
            selectedService.map((serviceObj, i) => (
              <div
                key={i}
                className="d-flex align-items-center mt-2 justify-content-between selected-services border-radius-10"
              >
                <p className="m-0">{serviceObj.itemName}</p>
                <CancelOutlinedIcon
                  className="text-primary cursor"
                  onClick={() => handleRemoveService(serviceObj)}
                />
              </div>
            ))}
        </div>
        <Modal.Footer className="justify-content-between">
          <Button variant="primary" onClick={handleSelectedServiceModal}>
            {" "}
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddMoreServices}>
            Add More +
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      {showOptionalServicesModal && viewAllOptionalService()}
      {showSelectedServicesModal && viewSelectedServices()}
    </>
  );
};

export default OptionalServiceModal;
