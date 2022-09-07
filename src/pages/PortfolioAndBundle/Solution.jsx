import React, { useState } from 'react'
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";


const Solution = () => {

    const [solution, setSolution] = useState({
        id: "",
        description: "",
        usageIn: "",
        taskType: "",
        quantity: 1,
        year: "",
        numberYear: "",
        totalPrice: "",
        adjustedPrice: "",
        machineType: "",
        lifeStage: ""
    })
    const handleSolutionChange = (e) => {
        setSolution({
            ...solution,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className="ligt-greey-bg p-3">
                <div>
                    {/* <span className="mr-3 cursor" onClick={() => setDisable(!disable)}>
          <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
          <span className="ml-2">Edit</span>
        </span> */}
                    <span className="mr-3">
                        <MonetizationOnOutlinedIcon className=" font-size-16" />
                        <span className="ml-2"> Adjust price</span>
                    </span>
                    <span className="mr-3">
                        <FormatListBulletedOutlinedIcon className=" font-size-16" />
                        <span className="ml-2">Related part list(s)</span>
                    </span>
                    <span className="mr-3">
                        <AccessAlarmOutlinedIcon className=" font-size-16" />
                        <span className="ml-2">Related service estimate(s)</span>
                    </span>
                    <span>
                        <SellOutlinedIcon className=" font-size-16" />
                        <span className="ml-2">Split price</span>
                    </span>
                </div>
            </div>
            <div className='mt-3'>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                ID
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="netParts"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="description"
                                value={solution.description}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                Usage In
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="usageIn"
                                value={solution.usageIn}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                            >
                                Task Type
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="taskType"
                                value={solution.taskType}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                Quantity
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="quantity"
                                value={solution.quantity}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                Year
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="year"
                                value={solution.year}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                No. of Year
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="numberYear"
                                value={solution.numberYear}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                Total Price
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="totalPrice"
                                value={solution.totalPrice}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                Adjusted Price $
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="adjustedPrice"
                                value={solution.adjustedPrice}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                Machine Type
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="machineType"
                                value={solution.machineType}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                Life Stage
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10"
                                name="lifeStage"
                                value={solution.lifeStage}
                                onChange={handleSolutionChange}
                            />
                        </div>
                    </div>


                </div>
                <div className="m-3 text-right">
          <a
            href="#"
            className="btn text-white bg-primary"
          >
            Save
          </a>
        </div>
            </div>

        </>
    )
}

export default Solution
