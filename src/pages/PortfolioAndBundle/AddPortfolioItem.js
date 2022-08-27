import Reac,{useState} from 'react'
import Select from "react-select";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from 'react-router-dom';




const AddPortfolioItem = (props) => {
    const [addPortFolioItem, setAddportFolioItem] = useState({
        id: 0,
        description: "",
        usageIn: "",
        taskType: "",
        frequency: "",
        unit: "",
        recomondedValue: "",
        quantity: "",
        strategyEvents: "",
        templateId: "",
        templateDescription: "",
        repairOption: "",
      });


      const frequencyOptions = [
        { label: "Cyclic", value: "Cyclic" },
        { label: "once", value: "once" },
        { label: "alternate", value: "alternate" },
        { label: "Custom", value: "Custom" },
      ];
      const options = [
        { value: "chocolate", label: "Construction-Heavy" },
        { value: "strawberry", label: "Construction-Low" },
        { value: "vanilla", label: "Construction-Medium" },
        { value: "Construction", label: "Construction" },
      ];

  return (
    <>
       
          {props.openAddBundleItemHeader}
          
            <div className="ligt-greey-bg p-3">
              <div>
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
            <div className="px-3">
              <p className="mt-4">SUMMARY</p>
              <div className="row mt-4">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      ID
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      disabled
                      placeholder="(AUTO GENERATE)"
                      value={addPortFolioItem.id ? addPortFolioItem.id : ""}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      DESCRIPTION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      placeholder="DESCRIPTION"
                      onChange={(e) =>
                        setAddportFolioItem({
                          ...addPortFolioItem,
                          description: e.target.value,
                        })
                      }
                      value={addPortFolioItem.description}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      USAGE IN
                    </label>
                    <Select
                    //   placeholder={categoryUsageKeyValue1.label}
                      options={props.categoryList}
                    //   defaultValue={
                    //     categoryUsageKeyValue1.value
                    //       ? categoryUsageKeyValue1.value
                    //       : ""
                    //   }
                      value={addPortFolioItem.usageIn}
                      onChange={(e) =>
                        setAddportFolioItem({ ...addPortFolioItem, usageIn: e })
                      }
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4">STRATEGY</p>
              <div className="row mt-4">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      TASK TYPE
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          options={props.updatedTaskList}
                        //   placeholder={stratgyTaskTypeKeyValue.value}
                        //   defaultValue={
                        //     stratgyTaskTypeKeyValue.value
                        //       ? stratgyTaskTypeKeyValue.value
                        //       : ""
                        //   }
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              taskType: e,
                            })
                          }
                          value={addPortFolioItem.taskType}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      FREQUENCY
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          options={frequencyOptions}
                          placeholder="FREQUENCY"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              frequency: e,
                            })
                          }
                          value={addPortFolioItem.frequency}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      UNIT
                    </label>
                    <Select
                      options={[
                        { value: "per Hr", label: "per Hr" },
                        { value: "per Km", label: "per Km" },
                        { value: "per Miles", label: "per Miles" },
                        { value: "per year", label: "per year" },
                        { value: "per month", label: "per month" },
                        { value: "per day", label: "per day" },
                        { value: "per quarter", label: "per quarter" },
                      ]}
                      placeholder="HOURS"
                      onChange={(e) =>
                        setAddportFolioItem({ ...addPortFolioItem, unit: e })
                      }
                      value={addPortFolioItem.unit}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      RECOMMENDED VALUE
                    </label>
                    <Select
                      onChange={(e) =>
                        setAddportFolioItem({
                          ...addPortFolioItem,
                          recomondedValue: e,
                        })
                      }
                      value={addPortFolioItem.recomondedValue}
                      options={options}
                      placeholder="RECOMMENDED VALUE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      QUANTITY
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      placeholder="QUANTITY"
                      onChange={(e) =>
                        setAddportFolioItem({
                          ...addPortFolioItem,
                          quantity: e.target.value,
                        })
                      }
                      value={addPortFolioItem.quantity}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      NO. OF EVENTS
                    </label>
                    <input
                      type="email"
                      className="form-control border-radius-10"
                      placeholder="NO. OF EVENTS"
                      onChange={(e) =>
                        setAddportFolioItem({
                          ...addPortFolioItem,
                          strategyEvents: e.target.value,
                        })
                      }
                      value={addPortFolioItem.strategyEvents}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-4">TEMPLATES</p>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      TEMPLATE ID
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          options={options}
                          placeholder="TEMPLATE ID"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              templateId: e,
                            })
                          }
                          value={addPortFolioItem.templateId}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      TEMPLATE DESCRIPTION
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          options={options}
                          placeholder="TEMPLATE DESCRIPTION"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              templateDescription: e,
                            })
                          }
                          value={addPortFolioItem.templateDescription}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <div className="mt-4">
                      <a
                        href="#"
                        className="form-control Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                      >
                        <span className="mr-2">+</span>Add Template / Kit
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4">REPAIR OPTIONS</p>
              <div className="row">
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      REPAIR OPTION
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          options={options}
                          placeholder="REPAIR OPTION"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              repairOption: e,
                            })
                          }
                          value={addPortFolioItem.repairOption}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <div className="mt-4">
                      <a
                        href="#"
                        className="form-control Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                      >
                        <span className="mr-2">+</span>Add Repair Option
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right pb-2">
                <a
                  href="#"
                  className="btn border mr-4"
                >
                  Cancel
                </a>
                <Link
                  to="#"
                  className="btn border mr-4"
                  onClick={() => {
                    // setTabs(`${parseInt(tabs)+1}`);
                    alert("hello")
                  }}
                >
                  Save & Continue
                </Link>
              </div>
            </div>
       
    </>
  )
}

export default AddPortfolioItem
