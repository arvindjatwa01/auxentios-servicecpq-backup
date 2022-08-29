import React,{useEffect, useState} from "react";
import Select from "react-select";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {itemCreation,updatePortfolio} from "../../services/index"



const PriceCalculator = (props) => {
  const [categoryUsageKeyValue1, setCategoryUsageKeyValue1] = useState([]);
  const [stratgyTaskTypeKeyValue, setStratgyTaskTypeKeyValue] = useState([]);
  const [stratgyTaskUsageKeyValue, setStratgyTaskUsageKeyValue] = useState([]);
  const [stratgyResponseTimeKeyValue, setStratgyResponseTimeKeyValue] =useState([]);
  const [stratgyHierarchyKeyValue, setStratgyHierarchyKeyValue] = useState([]);
  const [stratgyGeographicKeyValue, setStratgyGeographicKeyValue] = useState([]);

  const [priceCalculator, setPriceCalculator] = useState({
    priceMethod: props.priceCalculator.priceMethod,
    listPrice: props.priceCalculator.listPrice,
    priceAdditionalSelect: "",
    priceAdditionalInput: props.priceCalculator.priceAdditionalInput,
    priceEscalationSelect: "",
    priceEscalationInput: props.priceCalculator.priceEscalationInput,
    calculatedPrice: props.priceCalculator.calculatedPrice,
    flatPrice: props.priceCalculator.priceMethod,
    discountTypeSelect: "",
    discountTypeInput: props.priceCalculator.discountTypeInput,
        priceYear: "",
        startUsage: "",
        endUsage: "",
        usageType: "",
        frequency: "",
        cycle: "",
        suppresion: "",
        netPrice: 1200,
        totalPrice: props.priceCalculator.totalPrice,
      });
    
      const {setOpenAddBundleItem,setOpenSearchSolution,generalComponentData,
        setGeneralComponentData,addPortFolioItem,bundleItems,setBundleItems,
        createServiceOrBundle,setTempBundleItems,tempBundleItems}=props
console.log("props.priceCalculator",props.priceCalculator)
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

      // const handleBundleItemSaveAndContinue = async () => {
      //   props.setTabs("3");
      //   props.setLoadingItem(true);
      //   try {
      //     let reqObj = {
      //       itemId: 0,
      //       itemName: "",
      //       itemHeaderModel: {
      //         itemHeaderId: 0,
      //         // itemHeaderId: parseInt(generalComponentData.portfolioId),
      //         itemHeaderDescription: generalComponentData.description,
      //         bundleFlag: "PORTFOLIO",
      //         reference: generalComponentData.externalReference,
      //         itemHeaderMake: "",
      //         itemHeaderFamily: "",
      //         model: "",
      //         prefix: "",
      //         type: "MACHINE",
      //         additional: "",
      //         currency: "",
      //         netPrice: 0,
      //         itemProductHierarchy: generalComponentData.productHierarchy,
      //         itemHeaderGeographic: generalComponentData.geographic,
      //         responseTime: generalComponentData.responseTime,
      //         usage: "",
      //         validFrom: generalComponentData.validFrom,
      //         validTo: generalComponentData.validTo,
      //         estimatedTime: "",
      //         servicePrice: 0,
      //         status: "NEW",
      //       },
      //       itemBodyModel: {
      //         itemBodyId: parseInt(addPortFolioItem.id),
      //         itemBodyDescription: addPortFolioItem.description,
      //         quantity: parseInt(addPortFolioItem.quantity),
      //         startUsage: priceCalculator.startUsage,
      //         endUsage: priceCalculator.endUsage,
      //         standardJobId: "",
      //         frequency: addPortFolioItem.frequency.value,
      //         additional: "",
      //         spareParts: ["WITH_SPARE_PARTS"],
      //         labours: ["WITH_LABOUR"],
      //         miscellaneous: ["LUBRICANTS"],
      //         taskType: [addPortFolioItem.taskType.value],
      //         solutionCode: "",
      //         usageIn: addPortFolioItem.usageIn.value,
      //         recommendedValue: 0,
      //         usage: "",
      //         repairKitId: "",
      //         templateDescription: addPortFolioItem.description.value,
      //         partListId: "",
      //         serviceEstimateId: "",
      //         numberOfEvents: parseInt(addPortFolioItem.strategyEvents),
      //         repairOption: addPortFolioItem.repairOption.value,
      //         priceMethod: "LIST_PRICE",
      //         listPrice: parseInt(priceCalculator.listPrice),
      //         priceEscalation: "",
      //         calculatedPrice: parseInt(priceCalculator.calculatedPrice),
      //         flatPrice: parseInt(priceCalculator.flatPrice),
      //         discountType: "",
      //         year: priceCalculator.priceYear.value,
      //         avgUsage: 0,
      //         unit: addPortFolioItem.unit.value,
      //         sparePartsPrice: 0,
      //         sparePartsPriceBreakDownPercentage: 0,
      //         servicePrice: 0,
      //         servicePriceBreakDownPercentage: 0,
      //         miscPrice: 0,
      //         miscPriceBreakDownPercentage: 0,
      //         totalPrice: 0,
      //       },
      //     };
      //     const itemRes = await itemCreation(reqObj);
      //     console.log("itemCreation res:", itemRes);
      //     if (itemRes.status !== 200) {
      //       alert("something went wrong");
      //       return;
      //     }
      //     const _generalComponentData = { ...generalComponentData };
      //     _generalComponentData.items?.push({ itemId: itemRes.data.itemId });
      //     setGeneralComponentData(_generalComponentData);
      //     // put API for porfolio update Item id
      //     // call here
      //     const { portfolioId, ...res } = generalComponentData;
      //     let obj = {
      //       ...res,
      //       visibleInCommerce: true,
      //       customerId: 0,
      //       lubricant: true,
      //       customerSegment: generalComponentData.customerSegment
      //         ? generalComponentData.customerSegment.value
      //         : "EMPTY",
      //       machineType: generalComponentData.machineType
      //         ? generalComponentData.machineType
      //         : "EMPTY",
      //       status: generalComponentData.status
      //         ? generalComponentData.status
      //         : "EMPTY",
      //       strategyTask: generalComponentData.strategyTask
      //         ? generalComponentData.strategyTask
      //         : "EMPTY",
      //       taskType: generalComponentData.taskType
      //         ? generalComponentData.taskType
      //         : "EMPTY",
      //       usageCategory: generalComponentData.usageCategory
      //         ? generalComponentData.usageCategory
      //         : "EMPTY",
      //       productHierarchy: generalComponentData.productHierarchy
      //         ? generalComponentData.productHierarchy
      //         : "EMPTY",
      //       geographic: generalComponentData.geographic
      //         ? generalComponentData.geographic
      //         : "EMPTY",
      //       availability: generalComponentData.availability
      //         ? generalComponentData.availability
      //         : "EMPTY",
      //       responseTime: generalComponentData.responseTime
      //         ? generalComponentData.responseTime
      //         : "EMPTY",
      //       type: generalComponentData.type ? generalComponentData.type : "EMPTY",
      //       application: generalComponentData.application
      //         ? generalComponentData.application
      //         : "EMPTY",
      //       contractOrSupport: generalComponentData.contractOrSupport
      //         ? generalComponentData.contractOrSupport
      //         : "EMPTY",
      //       lifeStageOfMachine: generalComponentData.lifeStageOfMachine
      //         ? generalComponentData.lifeStageOfMachine
      //         : "EMPTY",
      //       supportLevel: generalComponentData.supportLevel
      //         ? generalComponentData.supportLevel
      //         : "EMPTY",
      //       customerGroup: generalComponentData.customerGroup
      //         ? generalComponentData.customerGroup
      //         : "EMPTY",
      //       searchTerm: "EMPTY",
      //       supportLevel: "EMPTY",
      //       portfolioPrice: {},
      //       additionalPrice: {},
      //       escalationPrice: {},
      //       coverages: generalComponentData.coverages
      //         ? generalComponentData.coverages
      //         : [],
      //       items: _generalComponentData.items,
      //       usageCategory: categoryUsageKeyValue1.value,
      //       taskType: stratgyTaskTypeKeyValue.value,
      //       strategyTask: stratgyTaskUsageKeyValue.value,
      //       responseTime: stratgyResponseTimeKeyValue.value,
      //       productHierarchy: stratgyHierarchyKeyValue.value,
      //       geographic: stratgyGeographicKeyValue.value,
      //     };
      //     if (generalComponentData.portfolioId) {
      //       const updatePortfolioRes = await updatePortfolio(
      //         generalComponentData.portfolioId,
      //         obj
      //       );
      //       if (updatePortfolioRes.status != 200) {
      //         throw `${updatePortfolioRes.status}:Something went wrong`;
      //       }
      //     }
    
      //     setGeneralComponentData(_generalComponentData);
      //     setTempBundleItems([...tempBundleItems, itemRes.data]);
    
      //     setOpenAddBundleItem(false);
      //     setOpenSearchSolution(false);
      //     props.setLoadingItem(false);
          
      //   } catch (error) {
      //     console.log("error in item creation err:", error);
      //   }
      // };
    
      // const saveAddNewServiceOrBundle = async () => {
      //   props.setLoadingItem(true);
      //   try {
      //     let reqObj = {
      //       itemId: 0,
      //       itemName: "",
      //       itemHeaderModel: {
      //         itemHeaderId: 0,
      //         // itemHeaderId: parseInt(generalComponentData.portfolioId),
      //         itemHeaderDescription: createServiceOrBundle.description,
      //         bundleFlag:
      //           props.serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
      //         reference: createServiceOrBundle.reference,
      //         itemHeaderMake: createServiceOrBundle.make,
      //         itemHeaderFamily: "",
      //         model: createServiceOrBundle.models,
      //         prefix: createServiceOrBundle.prefix,
      //         type: "MACHINE",
      //         additional: createServiceOrBundle.additional.value,
      //         currency: "",
      //         netPrice: 0,
      //         itemProductHierarchy: generalComponentData.productHierarchy,
      //         itemHeaderGeographic: generalComponentData.geographic,
      //         responseTime: generalComponentData.responseTime,
      //         usage: "",
      //         validFrom: generalComponentData.validFrom,
      //         validTo: generalComponentData.validTo,
      //         estimatedTime: "",
      //         servicePrice: 0,
      //         status: "NEW",
      //       },
      //       itemBodyModel: {
      //         itemBodyId: parseInt(addPortFolioItem.id),
      //         itemBodyDescription: addPortFolioItem.description,
      //         quantity: parseInt(addPortFolioItem.quantity),
      //         startUsage: priceCalculator.startUsage,
      //         endUsage: priceCalculator.endUsage,
      //         standardJobId: "",
      //         frequency: addPortFolioItem.frequency.value,
      //         additional: "",
      //         spareParts: ["WITH_SPARE_PARTS"],
      //         labours: ["WITH_LABOUR"],
      //         miscellaneous: ["LUBRICANTS"],
      //         taskType: [addPortFolioItem.taskType.value],
      //         solutionCode: "",
      //         usageIn: addPortFolioItem.usageIn.value,
      //         recommendedValue: 0,
      //         usage: "",
      //         repairKitId: "",
      //         templateDescription: addPortFolioItem.description.value,
      //         partListId: "",
      //         serviceEstimateId: "",
      //         numberOfEvents: parseInt(addPortFolioItem.strategyEvents),
      //         repairOption: addPortFolioItem.repairOption.value,
      //         priceMethod: "LIST_PRICE",
      //         listPrice: parseInt(priceCalculator.listPrice),
      //         priceEscalation: "",
      //         calculatedPrice: parseInt(priceCalculator.calculatedPrice),
      //         flatPrice: parseInt(priceCalculator.flatPrice),
      //         discountType: "",
      //         year: priceCalculator.priceYear.value,
      //         avgUsage: 0,
      //         unit: addPortFolioItem.unit.value,
      //         sparePartsPrice: 0,
      //         sparePartsPriceBreakDownPercentage: 0,
      //         servicePrice: 0,
      //         servicePriceBreakDownPercentage: 0,
      //         miscPrice: 0,
      //         miscPriceBreakDownPercentage: 0,
      //         totalPrice: 0,
      //       },
      //     };
          
      //     const res = await itemCreation(reqObj);
      //     console.log("service or bundle res:", res);
      //     if (res.status == 200) {
      //       toast(`👏 ${props.serviceOrBundlePrefix} created`, {
      //         position: "top-right",
      //         autoClose: 5000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //         progress: undefined,
      //       });
      //       // call update API for portfolio to update item with service or bundle
      //       const _bundleItems = [...bundleItems];
      //       if (_bundleItems[0].associatedServiceOrBundle) {
      //         _bundleItems[0].associatedServiceOrBundle.push(res.data);
      //       } else {
      //         _bundleItems[0] = {
      //           ..._bundleItems[0],
      //           associatedServiceOrBundle: [res.data],
      //         };
      //       }
      //       props.setBundleServiceShow(false)
      //       setBundleItems(_bundleItems);
      //       props.setLoadingItem(false);
      //       // API call to update portfolio for service or bundle
      //       const { portfolioId, ...rest } = generalComponentData;
      //       let obj = {
      //         ...rest,
      //         visibleInCommerce: true,
      //         customerId: 0,
      //         lubricant: true,
      //         customerSegment: generalComponentData.customerSegment
      //           ? generalComponentData.customerSegment.value
      //           : "EMPTY",
      //         machineType: generalComponentData.machineType
      //           ? generalComponentData.machineType
      //           : "EMPTY",
      //         status: generalComponentData.status
      //         ? generalComponentData.status
      //         : "EMPTY",
      //         strategyTask: generalComponentData.strategyTask
      //         ? generalComponentData.strategyTask
      //           : "EMPTY",
      //         taskType: generalComponentData.taskType
      //           ? generalComponentData.taskType
      //           : "EMPTY",
      //         usageCategory: generalComponentData.usageCategory
      //           ? generalComponentData.usageCategory
      //           : "EMPTY",
      //         productHierarchy: generalComponentData.productHierarchy
      //           ? generalComponentData.productHierarchy
      //           : "EMPTY",
      //         geographic: generalComponentData.geographic
      //           ? generalComponentData.geographic
      //           : "EMPTY",
      //         availability: generalComponentData.availability
      //         ? generalComponentData.availability
      //         : "EMPTY",
      //         responseTime: generalComponentData.responseTime
      //           ? generalComponentData.responseTime
      //           : "EMPTY",
      //         type: generalComponentData.type ? generalComponentData.type : "EMPTY",
      //         application: generalComponentData.application
      //           ? generalComponentData.application
      //           : "EMPTY",
      //         contractOrSupport: generalComponentData.contractOrSupport
      //           ? generalComponentData.contractOrSupport
      //           : "EMPTY",
      //         lifeStageOfMachine: generalComponentData.lifeStageOfMachine
      //         ? generalComponentData.lifeStageOfMachine
      //         : "EMPTY",
      //         supportLevel: generalComponentData.supportLevel
      //           ? generalComponentData.supportLevel
      //           : "EMPTY",
      //         customerGroup: generalComponentData.customerGroup
      //         ? generalComponentData.customerGroup
      //         : "EMPTY",
      //         searchTerm: "EMPTY",
      //         supportLevel: "EMPTY",
      //         portfolioPrice: {},
      //         additionalPrice: {},
      //         escalationPrice: {},
      //         coverages: generalComponentData.coverages
      //         ? generalComponentData.coverages
      //         : [],
      //         items: [...generalComponentData.items, { itemId: res.data.itemId }],
      //         usageCategory: categoryUsageKeyValue1.value,
      //         taskType: stratgyTaskTypeKeyValue.value,
      //         strategyTask: stratgyTaskUsageKeyValue.value,
      //         responseTime: stratgyResponseTimeKeyValue.value,
      //         productHierarchy: stratgyHierarchyKeyValue.value,
      //         geographic: stratgyGeographicKeyValue.value,
      //       };
      //       console.log("request obj for update:", obj);
      //       if (generalComponentData.portfolioId) {
      //         const updatePortfolioRes = await updatePortfolio(
      //           generalComponentData.portfolioId,
      //           obj
      //           );
      //         if (updatePortfolioRes.status != 200) {
      //           throw `${updatePortfolioRes.status}:Something went wrong`;
      //           return
      //         }
      //         console.log("portfolio updated:", updatePortfolioRes);
      //       } else {
      //         throw `Please Create portfolio`;
      //       }
      //     } else {
      //       throw `${res.status}: ${props.serviceOrBundlePrefix} not created`;
      //     }
      //   } catch (error) {
      //     console.log("itemCreation err:", error);
      //     toast("😐" + error, {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //     return;
      //   }
      // };
    

    
      



      return (
    <>
      <div className="ligt-greey-bg p-3">
        <div>
          <span className="mr-3">
            <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
            <span className="ml-2">Edit</span>
          </span>
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
      <div>
        <div className="p-3">
          {/* <h6 className="text-light-dark font-size-12 font-weight-500">
            PRICES
          </h6> */}
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  PRICE METHOD
                </label>
                <Select
                  options={options}
                  value={priceCalculator.priceMethod}
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, priceMethod: e })
                  }
                  placeholder="placeholder (Optional)"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  LIST PRICE{" "}
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10"
                  aria-describedby="emailHelp"
                  placeholder="$100"
                  value={priceCalculator.listPrice}
                  onChange={(e) =>
                    setPriceCalculator({
                      ...priceCalculator,
                      listPrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  ADDITIONAL
                </label>
                <div className=" d-flex form-control-date">
                  <div className="">
                    <Select
                      isClearable={true}
                      value={priceCalculator.priceAdditionalSelect}
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          priceAdditionalSelect: e,
                        })
                      }
                      options={options}
                      placeholder="Select"
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
                    placeholder="10%"
                    value={priceCalculator.priceAdditionalInput}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceAdditionalInput: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  PRICE ESCALATON
                </label>
                <div className=" d-flex align-items-center form-control-date">
                  <Select
                    className="select-input"
                    value={priceCalculator.priceEscalationSelect}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceEscalationSelect: e,
                      })
                    }
                    options={options}
                    placeholder="placeholder "
                  />
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
                    placeholder="20%"
                    value={priceCalculator.priceEscalationInput}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceEscalationInput: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  CALCULATED PRICE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10"
                  value={priceCalculator.calculatedPrice}
                  onChange={(e) =>
                    setPriceCalculator({
                      ...priceCalculator,
                      calculatedPrice: e.target.value,
                    })
                  }
                  placeholder="$100"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  FLAT PRICE / ADJUSTED PRICE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10"
                  value={priceCalculator.flatPrice}
                  onChange={(e) =>
                    setPriceCalculator({
                      ...priceCalculator,
                      flatPrice: e.target.value,
                    })
                  }
                  placeholder="$100"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  DISCOUNT TYPE
                </label>
                <div className=" d-flex form-control-date">
                  <div className="">
                    <Select
                      value={priceCalculator.discountTypeSelect}
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          discountTypeSelect: e,
                        })
                      }
                      isClearable={true}
                      options={options}
                      placeholder="Select"
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
                    value={priceCalculator.discountTypeInput}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        discountTypeInput: e.target.value,
                      })
                    }
                    placeholder="10%"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  YEAR
                </label>
                <Select
                  value={priceCalculator.priceYear}
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, priceYear: e })
                  }
                  options={options}
                  placeholder="Year"
                />
              </div>
            </div>
          </div>

          <h6 className="text-light-dark font-size-12 font-weight-500">
            USAGE
          </h6>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  START USAGE
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
                    placeholder="per hour"
                    value={priceCalculator.startUsage}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        startUsage: e.target.value,
                      })
                    }
                  />
                  <span className="hours-div">hours</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  END USAGE
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
                    placeholder="10%"
                    value={priceCalculator.endUsage}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        endUsage: e.target.value,
                      })
                    }
                  />
                  <span className="hours-div">hours</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  USAGE TYPE
                </label>
                <Select
                  options={options}
                  value={priceCalculator.usageType}
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, usageType: e })
                  }
                  placeholder="placeholder (Optional)"
                />
              </div>
            </div>
          </div>

          <h6 className="text-light-dark font-size-12 font-weight-500">
            QUANTITY
          </h6>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  FREQUENCY
                </label>
                <Select
                //   defaultValue={addPortFolioItem.frequency}
                  options={frequencyOptions}
                  value={priceCalculator.frequency}
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, frequency: e })
                  }
                  placeholder="Cyclical"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  CYCLE
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
                    placeholder="250"
                    value={priceCalculator.cycle}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        cycle: e.target.value,
                      })
                    }
                  />
                  <span className="hours-div">hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div>
              <h6 className="text-light-dark font-size-12 font-weight-500 mr-4">
                NET PRICE
              </h6>
              ${priceCalculator.netPrice}
            </div>
            <div>
              <h6 className="text-light-dark font-size-12 font-weight-500">
                TOTAL PRICE
              </h6>
              ${priceCalculator.totalPrice}
            </div>
          </div>
        </div>
        <div className="m-3 text-right">
          <a
            href="#"
            className="btn text-white bg-primary"
            // onClick={props.serviceOrBundlePrefix === ""? handleBundleItemSaveAndContinue: saveAddNewServiceOrBundle}
            onClick={()=>alert("hello")}
          >
            Save
          </a>
        </div>
      </div>
    </>
  );
};

export default PriceCalculator;
