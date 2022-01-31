import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FileUploader } from "react-drag-drop-files";
import { MuiMenuComponent } from '../Operational/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { SolutionSelector } from './index'
import { CommanComponents } from "../../components/index"



export const Analytics = () => {
  const [value, setValue] = React.useState('1');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fileTypes = ["JPG", "PNG", "GIF"];


  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
  return (
    <>
      <CommanComponents />
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Solution Builder</h5>
          </div>
          <div className="card p-4 mt-5">
            <div>
              <a href="#" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn bg-primary text-white">
                <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create New<span className="ml-2"></span>
              </a>
            </div>
            <div className="mt-5">
              <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6>
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Portfolio Solution </span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Part List </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Part List </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Part List </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Portfolio Solution </span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Part List </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Part List </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Stardegy Task</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Part List </p>
                    </div>
                  </div>

                </div>

              </div>
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">SERVICE BUNDLES</h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Part List </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Part List </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Stardegy Task</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Part List </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal show={open} onHide={handleClose} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
              <Modal.Title>Solution Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 pt-4 bg-white">
              <SolutionSelector />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  )
};
