import { TextField } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import { useState } from "react";
import Select from 'react-select';
import { createWorkList } from "services/worklistServices";
import { useHistory } from "react-router-dom";



export function CreateWorkList(props) {

    const [selectedOption, setSelectedOption] = useState(null);
    const history = useHistory()
    const [worklistCase, setWorklistCase] = useState({
        caseSource: "", description: "", customer: "",
        requestedDate: "", promiseDate: "", status: "", consistency: "",
        requester: "", attendedBy: "", noteType: "", actionType: "",
        longDescription: "", assignedTo: "", team: ""
    })
    const SOURCE_OPTIONS = [
        { value: "CRM_OPPORTUNITY", label: "CRM Opportunity" },
        { value: "MAINTENANCE_NOTIFICATION", label: "Maintenance Notification" },
        { value: "DIGITAL_NOTIFICATION", label: "Digital Notifications" },
        { value: "ERP_NOTIFICATION", label: "ERP Notification" }
    ]
    const reasonForRequestOptions = [
        { value: 'QUOTE', label: 'Quote' },
        { value: 'ESTIMATE', label: 'Estimate' },
        { value: 'DIGITALALERT', label: 'Digital Alerts' },
        { value: 'MAINTENANCE', label: 'Maintenance Tasks' },
        { value: 'WORKORDERS', label: 'Work Orders ' }
    ];
    const TEAM_OPTIONS = [
        { value: 'quote', label: 'Marketing' },
        { value: 'estimate', label: 'Sales' },
        { value: 'digital-alert', label: 'Planning' },
        { value: 'maintenance', label: 'Workshop' },
        { value: 'work-orders', label: 'Contract Ops' },
        { value: 'field-service', label: 'Field Service' },
        { value: 'digital', label: 'Digital' }

    ];
    const STATUS_OPTIONS = [
        { value: 'NEW', label: 'New' },
        { value: 'INPROGRESS', label: 'In Progress' },
        { value: 'CANCELED', label: 'Canceled' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'OVERDUE', label: 'Overdue ' },
    ];
    const CONSISTENCY_OPTIONS = [
        { value: "CONSISTENT", label: "Consistent" },
        { value: "INCONSISTENT", label: "Inconsistent" },
        { value: "FALSE", label: "False" }
    ]

    const createWorklistCase = async () => {

        let data = {
            caseSource: worklistCase.caseSource.value, description: worklistCase.description, customer: worklistCase.customer,
            requestedDate: worklistCase.requestedDate, promiseDate: worklistCase.promiseDate, status: worklistCase.status.value, consistency: worklistCase.consistency.value,
            requester: worklistCase.requester, attendedBy: worklistCase.attendedBy, noteType: "DESC", actionType: worklistCase.actionType.value, assignedTo: worklistCase.assignedTo,
            longDescription: worklistCase.longDescription, team: worklistCase.team
        }
        await createWorkList(data).then(worklist => {
            console.log(worklist);
            history.push("/worklist");
        }).catch(e => {
            console.log(e)
        })
    }
    //Individual case field value change
    const handleWorklistCase = (event) => {
        var value = event.target.value;
        var name = event.target.name;
        setWorklistCase({
            ...worklistCase,
            [name]: value,
        });
    }
    return (
        <>
            {/* <CommanComponents /> */}
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid mt-3">
                    <div className="card  mt-3 p-3">
                        <div className="row input-fields">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">REASON FOR REQUEST</label>
                                    <Select
                                        onChange={(e) =>
                                            setWorklistCase({
                                                ...worklistCase,
                                                actionType: e,
                                            })
                                        }
                                        options={reasonForRequestOptions}
                                        value={worklistCase.actionType}
                                        styles={FONT_STYLE_SELECT} />
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group w-100">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        TITLE
                                    </label>
                                    <input
                                        type="text"
                                        value={worklistCase.description}
                                        name="description"
                                        onChange={handleWorklistCase}
                                        className="form-control border-radius-10 text-primary"
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        BRIEF DESCRIPTION
                                    </label>
                                    <div>
                                        <TextareaAutosize
                                            minRows={3}
                                            value={worklistCase.longDescription}
                                            name="longDescription"
                                            onChange={handleWorklistCase}
                                            className="form-control border-radius-10 text-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group w-100">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        REQUESTER
                                    </label>
                                    <input
                                        type="text"
                                        value={worklistCase.requester}
                                        name="requester"
                                        onChange={handleWorklistCase}
                                        className="form-control border-radius-10 text-primary"
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group w-100">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        CUSTOMER
                                    </label>
                                    <input
                                        type="text"
                                        value={worklistCase.customer}
                                        name="customer"
                                        onChange={handleWorklistCase}
                                        className="form-control border-radius-10 text-primary"
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>

                            </div>

                            <div className="col-md-3 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        CREATED ON ON
                                    </label>
                                    <div className="align-items-center date-box">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <MobileDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                // minDate={worklistCase.requestedDate}
                                                // maxDate={new Date()}
                                                closeOnSelect
                                                value={worklistCase.requestedDate}
                                                onChange={(e) =>
                                                    setWorklistCase({
                                                        ...worklistCase,
                                                        requestedDate: e,
                                                    })
                                                }
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
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        END DATE
                                    </label>
                                    <div className="align-items-center date-box">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <MobileDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                // minDate={worklistCase.promiseDate}
                                                // maxDate={new Date()}
                                                closeOnSelect
                                                value={worklistCase.promiseDate}
                                                onChange={(e) =>
                                                    setWorklistCase({
                                                        ...worklistCase,
                                                        promiseDate: e,
                                                    })
                                                }
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
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group w-100">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        SOURCE
                                    </label>
                                    <Select
                                        onChange={(e) =>
                                            setWorklistCase({
                                                ...worklistCase,
                                                caseSource: e,
                                            })
                                        }
                                        options={SOURCE_OPTIONS}
                                        value={worklistCase.caseSource}
                                        styles={FONT_STYLE_SELECT} />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">STATUS</label>
                                    <Select
                                        onChange={(e) =>
                                            setWorklistCase({
                                                ...worklistCase,
                                                status: e,
                                            })
                                        }
                                        options={STATUS_OPTIONS}
                                        value={worklistCase.status}
                                        styles={FONT_STYLE_SELECT} />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">TEAM</label>
                                    <Select
                                        onChange={(e) =>
                                            setWorklistCase({
                                                ...worklistCase,
                                                team: e,
                                            })
                                        }
                                        options={TEAM_OPTIONS}
                                        value={worklistCase.team}
                                        styles={FONT_STYLE_SELECT} />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">CONSISTENCY</label>
                                    <Select
                                        onChange={(e) =>
                                            setWorklistCase({
                                                ...worklistCase,
                                                consistency: e,
                                            })
                                        }
                                        options={CONSISTENCY_OPTIONS}
                                        value={worklistCase.consistency}
                                        styles={FONT_STYLE_SELECT} />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group w-100">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        ASSIGN TO
                                    </label>
                                    <input
                                        type="text"
                                        value={worklistCase.assignedTo}
                                        name="assignedTo"
                                        onChange={handleWorklistCase}
                                        className="form-control border-radius-10 text-primary"
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <div className="d-flex Add-new-segment-div p-3 border-radius-10 bg-light-blue justify-content-end">
                                    <button onClick={createWorklistCase} className="btn bg-primary text-white"><span className="mr-2">+</span>Create Task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
