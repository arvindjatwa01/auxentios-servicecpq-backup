import React, { useState } from 'react'
import { Modal } from "react-bootstrap";

import { TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import penIcon from "../../assets/images/pen.png";
import { FONT_STYLE } from "pages/Repair/CONSTANTS";


const serviceReportConstant = {
    reportno: "N/A",
    date: "N/A",
    jobno: "N/A",
    smr: "N/A",
    mcslno: "N/A",
    mcmodelno: "N/A",
    enginemodelno: "N/A",
    engineslno: "N/A",
    attatchments: "N/A",
    conditionofmachine: "N/A",
    customercomplaints: "N/A",
    jobsAttended: "N/A",
    customerremarks: "N/A",
    customername: "N/A",
    customerdesignation: "N/A",
    customerphoneno: "N/A",
    customerAddress: "N/A",
    customerpincode: "N/A",
    customersignature: "N/A",
    serviceengineername: "N/A",
    serviceengineerremarks: "N/A",
    serviceengineersignature: "N/A"
}

const EquipmentServiceModal = ({ show, hideModal, handleSignautreUploadModal }) => {
    const [serviceReportData, setServiceReportData] = useState({ ...serviceReportConstant });
    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);
    }

    return (
        <div>
            <Modal show={show} onHide={hideModal} size="xl">
                <Modal.Body>
                    <>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="font-weight-bold fw-bold mb-0">Service Report</h5>
                            <div>
                                <button
                                    className="border-primary text-primary rounded-pill cursor px-3 py-1"
                                    onClick={handleEdit}
                                >
                                    <img className="m-1" src={penIcon} alt="Edit" /> Edit
                                </button>
                            </div>
                        </div>

                        <div className="card border mb-3 mt-2 px-3 py-3">
                            {edit ? (
                                <>
                                    <div className="row input-fields">
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Report Number
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="reportNumber"
                                                    placeholder="Report Number"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Date
                                                </label>
                                                <div className="align-items-center date-box">
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <MobileDatePicker
                                                            inputFormat="dd/MM/yyyy"
                                                            className="form-controldate border-radius-10"
                                                            // maxDate={new Date()}
                                                            closeOnSelect
                                                            value={new Date()}
                                                            //onChange={() => { }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    variant="standard"
                                                                    inputProps={{
                                                                        ...params.inputProps,
                                                                        style: FONT_STYLE,
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Job No
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="jobNumber"
                                                    placeholder="Job Number"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    SMR
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="SMR"
                                                    placeholder="SMR"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    M/C Sl. No.
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="M/cslno"
                                                    placeholder="M/C Sl. No."
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    M/C Model No
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="m/cmodelno"
                                                    placeholder="M/C Model No"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Engine Model. No.
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="engmodno"
                                                    placeholder="Engine Model No"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Engine Sl. No.
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="engslno"
                                                    placeholder="Engine Sl. No"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Attatchments
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="attachment"
                                                    placeholder="Attatchments"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Customer Complaints
                                                </label>
                                                <textarea
                                                    name="customercomplaints"
                                                    cols="30"
                                                    rows="2"
                                                    onChange={() => { }}
                                                    placeholder="Customer Complaints"
                                                    className="form-control border-radius-10 text-primary"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Job Attended
                                                </label>
                                                <textarea
                                                    name="jobattended"
                                                    cols="30"
                                                    rows="2"
                                                    onChange={() => { }}
                                                    placeholder="Job Attended"
                                                    className="form-control border-radius-10 text-primary"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Condition of Machine
                                                </label>
                                                <div className="row mx-2">
                                                    <div className="form-check col-lg-3 col-md-3 col-sm-6 col-12">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            name="machinecondition"
                                                            onChange={() => { }}
                                                            id="working"
                                                        />
                                                        <label class="form-check-label" for="working">
                                                            In-Working Order
                                                        </label>
                                                    </div>
                                                    <div className="form-check col-lg-3 col-md-3 col-sm-6 col-12">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            name="machinecondition"
                                                            onChange={() => { }}
                                                            id="breakdown"
                                                        />
                                                        <label class="form-check-label" for="breakdown">
                                                            Under Breakdown
                                                        </label>
                                                    </div>
                                                    <div className="form-check col-lg-3 col-md-3 col-sm-6 col-12">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            name="machinecondition"
                                                            onChange={() => { }}
                                                            id="observe"
                                                        />
                                                        <label class="form-check-label" for="observe">
                                                            Under Observation
                                                        </label>
                                                    </div>
                                                    <div className="form-check col-lg-3 col-md-3 col-sm-6 col-12">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            name="machinecondition"
                                                            onChange={() => { }}
                                                            id="waiting"
                                                        />
                                                        <label class="form-check-label" for="waiting">
                                                            Waiting For Parts
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="row align-items-end">
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    Report No
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.reportno}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    Date
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {/* {isEmpty(warrantyRecord.dateOfInstall)
                                                ? "NA"
                                                : getFormatDateTime(warrantyRecord.dateOfInstall, false)} */}
                                                    {serviceReportData.date}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    Job No
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.jobno}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    SMR
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.smr}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-end">
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    M/C Sl. No
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.mcslno}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    M/C Model No.
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {/* {isEmpty(warrantyRecord.dateOfInstall)
                                    ? "NA"
                                    : getFormatDateTime(warrantyRecord.dateOfInstall, false)} */}
                                                    {serviceReportData.mcmodelno}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    Engine Model No.
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.enginemodelno}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    Engine Sl. No.
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.engineslno}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-end">
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    Attatchments
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.attatchments}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    Condition Of Machine
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.conditionofmachine}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-end">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    Customer Complaints
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.customercomplaints}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-end">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                    Jobs Attended
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {serviceReportData.jobsAttended}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <h5 className="font-weight-bold fw-bold mb-0">Customer</h5>
                        <div className="card border mb-3 mt-2 px-3 py-3">
                            {edit ? (
                                <>
                                    <div className="row input-fields">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Customer Remarks
                                                </label>
                                                <textarea
                                                    name="customerremarks"
                                                    cols="30"
                                                    rows="2"
                                                    onChange={() => { }}
                                                    placeholder="Customer Remarks"
                                                    className="form-control border-radius-10 text-primary"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Customer
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="customer"
                                                    placeholder="customer"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Designation
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="designation"
                                                    placeholder="Designation"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Phone No
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="customerphno"
                                                    placeholder=" Phone no"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-5 col-sm-6 col-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="address"
                                                    placeholder="Address"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Pin Code
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="pincode"
                                                    placeholder="Pin Code"
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-12">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Signature
                                                </label>
                                                <div>
                                                    <button
                                                        className="btn btn-primary float-end "
                                                        onClick={handleSignautreUploadModal}
                                                    >
                                                        Upload Signature
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (<>
                                <div className="row align-items-end">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Customer Remarks
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.customerremarks}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-end">
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Name
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.customername}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Designation
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.customerdesignation}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Phone No
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.customerphoneno}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-end">
                                    <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Address
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.customerAddress}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Pin Code
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.customerpincode}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Signature
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.customersignature}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </>)}
                        </div>

                        <h5 className="font-weight-bold fw-bold mb-0">Service Engineer</h5>
                        <div className="card border mb-3 mt-2 px-3 py-3">
                            {edit ? (<>
                                <div className="row input-fields">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-14 font-weight-500">
                                                Service Engineer Remarks
                                            </label>
                                            <textarea
                                                name="serviceengineerremarks"
                                                cols="30"
                                                rows="3"
                                                onChange={() => { }}
                                                placeholder="Serice Engineer Remarks"
                                                className="form-control border-radius-10 text-primary"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-14 font-weight-500">
                                                Service Engineer Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                name="serviceenginnername"
                                                placeholder="Service Enginner Name"
                                                onChange={() => { }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-14 font-weight-500">
                                                Service Engineer Signature
                                            </label>
                                            <div>
                                                <button
                                                    className="btn btn-primary float-end "
                                                    onClick={handleSignautreUploadModal}
                                                >
                                                    Upload Signature
                                                </button>
                                            </div>
                                            {/* <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="attachment"
                  placeholder="Attatchments"
                  onChange={() => { }}
                /> */}
                                        </div>
                                    </div>
                                </div>
                            </>) : (<>
                                <div className="row align-items-end">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Service Engineer Remarks
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.serviceengineerremarks}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-end">
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Service Engineer Name
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.serviceengineername}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                                                Service Engineer Signature
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {serviceReportData.serviceengineersignature}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </>)}
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                            {edit && <button className='btn btn-primary mx-2' onClick={handleEdit}>Back</button>}
                            <button
                                className="btn btn-primary"
                               // id="details"
                                onClick={hideModal}
                            >
                                {edit ? "Save & Close" : "Close"}
                            </button>
                        </div>
                    </>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EquipmentServiceModal