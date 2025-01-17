import React, { useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel, Switch } from "@material-ui/core";

import { Modal } from "react-bootstrap";
import deleteIcon from "../../../../assets/icons/svg/delete.svg";
import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
import { LINK_CUSTOM_ITEM_TO_PORTFOLIO } from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

const CustomItemInclusionExclusionModel = ({
  show,
  hideModal,
  showOptionalServicesModal,
  handleOptionalServiceModal,
  checkedService,
  setCheckedService,
  selectedService,
  setSelectedService,
  customPortfolioId,
  inclusionExclusionItemId,
}) => {
  const [sparePartsSwitch, setSparePartsSwitch] = useState({
    withParts: false,
    haveParts: false,
    needOnly: false,
  });

  const [labourSwitch, setLabourSwitch] = useState({
    withLabour: false,
    withOutLabour: false,
  });

  const [miscellaneousSwitch, setMiscellaneousSwitch] = useState({
    lubricants: false,
    travelExpenses: false,
    tools: false,
    externalWork: false,
  });

  const [serviceRequired, setServiceRequired] = useState(false);

  // handle spare parts Switch
  const handleSparePartsCheckbox = (e) => {
    const { name } = e.target;
    const _sparePartsSwitch = { ...sparePartsSwitch };
    for (const key in _sparePartsSwitch) {
      if (_sparePartsSwitch.hasOwnProperty(key)) {
        _sparePartsSwitch[key] = key === name ? !sparePartsSwitch[key] : false;
      }
    }
    setSparePartsSwitch(_sparePartsSwitch);
  };

  // handle Labour Switch
  const handleLabourSwitch = (e) => {
    const { name } = e.target;
    const _labourSwitch = { ...labourSwitch };
    for (const key in _labourSwitch) {
      if (_labourSwitch.hasOwnProperty(key)) {
        _labourSwitch[key] = key === name ? !labourSwitch[key] : false;
      }
    }
    setLabourSwitch(_labourSwitch);
  };

  // handle Miscellaneous Switch
  const handleMiscellaneousSwitch = (e) => {
    const { name } = e.target;
    const _miscellaneousSwitch = { ...miscellaneousSwitch };
    for (const key in _miscellaneousSwitch) {
      if (_miscellaneousSwitch.hasOwnProperty(key)) {
        _miscellaneousSwitch[key] =
          key === name ? !miscellaneousSwitch[key] : false;
      }
    }
    setMiscellaneousSwitch(_miscellaneousSwitch);
  };

  // Toggle Selected Optional Services Switch
  const handleToggleOptionaServices = (checked, serviceObj) => {
    // check-uncheck in selected services
    const _selectedService = [...selectedService];
    _selectedService.forEach((obj) => {
      if (obj.customItemId === serviceObj.customItemId) {
        obj.checked = checked;
      }
    });
    setSelectedService(_selectedService);

    // check -uncheck in checked services
    const _checkedService = [...checkedService];
    _checkedService.forEach((obj) => {
      if (obj.customItemId === serviceObj.customItemId) {
        obj.checked = checked;
      }
    });
    setCheckedService(_checkedService);
  };

  // Link Portfolio to Item
  const handleLinkPortfolioToItem = async () => {
    try {
      let rUrl = `${LINK_CUSTOM_ITEM_TO_PORTFOLIO}portfolio_id=${customPortfolioId}&portfolio_item_id=${inclusionExclusionItemId}&`;
      if (selectedService.length === 0) {
        errorMessage("Please Select optional service items first.");
        return;
      }

      if (selectedService.length !== 0) {
        const selectedCheckedServices = selectedService.filter(
          (service) => service.checked
        );
        if (selectedCheckedServices.length === 0) {
          errorMessage("Please toggle at least one item checked.");
          return;
        }
        rUrl =
          rUrl +
          selectedCheckedServices
            .map((service) => `item_id=${service.customItemId}`)
            .join("&");

        callGetApi(rUrl, (response) => {
          if (response.status === API_SUCCESS) {
            console.log("link portfolio to item response ===== . ", response);
          }
        });
      }
    } catch (error) {
      return;
    }
  };

  return (
    <Modal className="right fade" id="myModal12" show={show} onHide={hideModal}>
      <Modal.Header className="d-block">
        <h4 className="modal-title" id="myModalLabel2">
          Inclusion/Exclusion
        </h4>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="bg-light-blue p-3">
          <h5 className="font-weight-normal text-violet mb-0">
            CHOICE OF SPARE PARTS
          </h5>
        </div>
        <div className="bg-white p-3">
          <FormGroup>
            <FormControlLabel
              control={<Switch disabled={sparePartsSwitch.needOnly} />}
              label="With Spare Parts"
              name="withParts"
              checked={sparePartsSwitch.withParts}
              onChange={handleSparePartsCheckbox}
            />
            <FormControlLabel
              control={<Switch disabled={sparePartsSwitch.needOnly} />}
              label="I have Spare Parts"
              name="haveParts"
              checked={sparePartsSwitch.haveParts}
              onChange={handleSparePartsCheckbox}
            />
            <FormControlLabel
              control={<Switch />}
              label="I need only Spare Parts"
              name="needOnly"
              checked={sparePartsSwitch.needOnly}
              onChange={handleSparePartsCheckbox}
            />
          </FormGroup>
        </div>
        <div className="bg-light-blue p-3">
          <h5 className="font-weight-normal text-violet mb-0">
            CHOICE OF LABOR
          </h5>
        </div>
        <div className="bg-white p-3">
          <div className=" d-flex justify-content-between ">
            <div>
              <FormGroup>
                <FormControlLabel
                  control={<Switch disabled={sparePartsSwitch.needOnly} />}
                  label="With Labor"
                  name="withLabour"
                  onChange={handleLabourSwitch}
                  checked={labourSwitch.withLabour}
                />
                <FormControlLabel
                  control={<Switch disabled />}
                  label="Without Labor"
                  name="withOutLabour"
                />
              </FormGroup>
            </div>
            <div>
              <a className="ml-3 font-size-14 cursor">
                <img src={deleteIcon}></img>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-light-blue p-3">
          <h5 className="font-weight-normal text-violet mb-0">CHOICE MISC.</h5>
        </div>
        <div className="bg-white p-3">
          <FormGroup>
            <FormControlLabel
              control={<Switch disabled />}
              label=" Lubricants"
              name="lubricants"
            />
            <FormControlLabel
              control={<Switch disabled />}
              label="Travel Expenses"
              name="travelExpenses"
            />
            <FormControlLabel
              control={<Switch disabled />}
              label="Tools"
              name="tools"
            />
            <FormControlLabel
              control={<Switch disabled={sparePartsSwitch.needOnly} />}
              label="External Work"
              name="externalWork"
              onChange={handleMiscellaneousSwitch}
              checked={miscellaneousSwitch.externalWork}
            />
          </FormGroup>
          <h5 className="d-flex align-items-center mb-0">
            <div className="" style={{ display: "contents" }}>
              <span className="mr-3 white-space">Includes</span>
            </div>
            <div className="hr"></div>
          </h5>
        </div>
        <div className="bg-light-blue p-3">
          <h5 className="font-weight-normal text-violet mb-0">SERVICES</h5>
        </div>
        <div className="bg-white p-3">
          <div className=" d-flex justify-content-between align-items-center">
            <div>
              <FormGroup>
                <FormControlLabel
                  control={<Switch disabled={sparePartsSwitch.needOnly} />}
                  label=" Changee Oil and Filter"
                  onChange={(e) => setServiceRequired(!serviceRequired)}
                  checked={serviceRequired}
                />
              </FormGroup>
            </div>
            <div>
              <a className="ml-3 font-size-14 cursor">
                <img src={deleteIcon}></img>
              </a>
            </div>
          </div>
          <h5 className="d-flex align-items-center mb-0">
            <div className="" style={{ display: "contents" }}>
              <span className="mr-3 white-space">Optianal services</span>
            </div>
            <div className="hr"></div>
          </h5>
          <FormGroup>
            {selectedService.length !== 0 &&
              selectedService.map((data, i) => (
                <FormControlLabel
                  control={<Switch />}
                  checked={data.checked === true ? true : false}
                  onChange={(e) =>
                    handleToggleOptionaServices(e.target.checked, data)
                  }
                  label={data.itemName}
                  key={i}
                />
              ))}
          </FormGroup>
          <h5 className="d-flex align-items-center mb-0">
            <div className="" style={{ display: "contents" }}>
              <span className="mr-3 white-space">Includes</span>
            </div>
            <div className="hr"></div>
          </h5>
          <div className="mt-3">
            <h6>
              <a
                className="btn-sm text-white mr-2"
                style={{ background: "#79CBA2" }}
              >
                Free
              </a>{" "}
              50 Point Inspection
            </h6>
            <h6 className="mt-3">
              <a
                className="btn-sm text-white mr-2 cursor"
                style={{ background: "#79CBA2" }}
              >
                Free
              </a>{" "}
              50 Point Inspection
            </h6>
          </div>
          <div className=" d-flex justify-content-between mt-4">
            <div>
              <a
                href={undefined}
                className="btn text-violet bg-light-blue"
                onClick={handleOptionalServiceModal}
              >
                <b>
                  <span className="mr-2">+</span>Add more services
                </b>
              </a>
            </div>
          </div>
          <div>
            <button
              className="btn text-violet mt-2"
              onClick={handleLinkPortfolioToItem}
            >
              <b>Save Changes</b>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomItemInclusionExclusionModel;
