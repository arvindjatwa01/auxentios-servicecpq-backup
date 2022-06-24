import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Portfoliosicon from '../../assets/icons/svg/Portfolios-icon.svg'
import Buttonarrow from '../../assets/icons/svg/Button-arrow.svg'
import contract from '../../assets/icons/svg/contract.svg'
import repairicon from '../../assets/icons/svg/repair-icon.svg'
import { SOLUTION_BUILDER_ANALYTICS } from 'navigation/CONSTANTS'

export function SolutionBuilderModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        props.parentCallback(false)
    }
    const handleShow = () => setShow(true);

    const continueClick = (data) => {
        props.continueParentCallback(data)
    }

    const handleShowSearch = () => {
        props.showSearchParentCallback(true)
    }

    useEffect(() => {
        setShow(true)
    }, [props.open]);
    return <>
        <Modal show={show} onHide={handleClose} size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
            <Modal.Body>
                <div className='d-flex align-items-center justify-content-between'>
                    <div><h5 class="">Choose what solution you want to build</h5></div>
                    <div onClick={handleShowSearch}>
                        <a href='#' className='btn border-light font-weight-500 bg-light-grey font-size-18'>Explore available solution</a>
                    </div>
                </div>
                <div className='card mt-4 p-4'>
                    <div className='row'>
                        <div className='col-md-6 my-3 '>
                            <div className='d-flex'>
                                <div className='mr-2'><img src={Portfoliosicon}></img></div>
                                <div>
                                    <h5 className='text-light'>Portfolios or Service Programs</h5>
                                    <p><b>You build Portfolios or Service Programs here. </b>
                                        Examples of Portfolios are Premium Maintenance Plan, Value added plan etc. A service program is a marketing or product improvement program.
                                    </p>
                                    <div className=''>
                                        <a onClick={() => continueClick(true)} className='btn bg-primary text-white'>Continue <img className='ml-2' src={Buttonarrow}></img></a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 my-3'>
                            <div className='d-flex'>
                                <div className='mr-2'><img src={contract}></img></div>
                                <div>
                                    <h5 className='text-light'>Pre-configured contract solution</h5>
                                    <p><b>You build pre-configured repair & maintenance solutions for your customer segment here. </b>
                                        Examples of pre-built template are Level I contracts like subscriptions or Level IV contract for Total Maintenance and Repair.
                                    </p>
                                    <div className=''>
                                        <a onClick={() => continueClick(false)} className='btn bg-primary text-white'>Continue <img className='ml-2' src={Buttonarrow}></img></a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 my-3'>
                            <div className='d-flex'>
                                <div className='mr-2'><img src={repairicon}></img></div>
                                <div>
                                    <h5 className='text-light'>Pre-configured repair solutions</h5>
                                    <p><b>You build pre-configured repair solutions here. </b>
                                        Examples of repair solutions are complex engine overhaul, engine reconditioning, componenet replacment , assembly of comlex
                                    </p>
                                    <div className=''>
                                        <a onClick={() => continueClick(false)} className='btn bg-primary text-white'>Continue <img className='ml-2' src={Buttonarrow}></img></a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
        </Modal>
    </>
}
