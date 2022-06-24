import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import auxentionlogo from '../../assets/icons/png/auxentionlogo.png'
import erroricon from '../../assets/icons/png/error.png'


export function Register() {
    const [value, setValue] = React.useState('2');
    const steps = [
        'Register',
        'Setup Account',
        'Request Activation',
        'Account Activated',
        'Configuration',
        'Load Data',
        'Start Using',

    ];
    return (
        <div class="container mt-2">
            <div className="card  overflow-hidden mt-5 p-3">
                <h6>You’ll be the account admin since you are creating the account</h6>
                <h4> Account Registration</h4>
                <div className="row">
                    <div className="col-md-9 col-sm-9">
                        <div className="row">
                            <div class="col-md-4 col-sm-4">
                                <div class="form-group mt-3">
                                    <p class="font-size-12 font-weight-600 mb-2">COMPANY NAME</p>
                                    <h6 class="font-weight-600">Acme Corp</h6>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <div class="form-group mt-3">
                                    <p class="font-size-12 font-weight-600 mb-2">PRIMARY CONTACT </p>
                                    <h6 class="font-weight-600">Ashok Mohanty</h6>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <div class="form-group mt-3">
                                    <p class="font-size-12 font-weight-600 mb-2">COMPANY LOGO</p>
                                    <h6 class="font-weight-600">company logo </h6>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <div class="form-group mt-3">
                                    <p class="font-size-12 font-weight-600 mb-2">Work EMail</p>
                                    <h6 class="font-weight-600">Janedoe@workemail.com</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <div class="form-group mt-3">
                            <a href="#" className="btn bg-perpal text-white">Upload</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3">
                            <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">STREET/HOUSE NO</label>
                            <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3">
                            <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">STREET/HOUSE NO</label>
                            <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3">
                            <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">COUNTRY</label>
                            <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3">
                            <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">POSTAL CODE</label>
                            <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3">
                            <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CONTACT NO.</label>
                            <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Contact NO." />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3">
                            <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ALTERNATE CONTACT NO.</label>
                            <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                        </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="form-group mt-3">
                            <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PREFERRED MODE OF CONTACT</label>
                            <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email / phone / chat" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3">
                            <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">COMPANY URL</label>
                            <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3">
                            <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">SOCIAL MEDIA</label>
                            <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3">
                            <a href="#" className="btn">Back</a>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group mt-3 text-right">
                            <a href="/AccountComponent" className="btn bg-violet text-white">Update</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}