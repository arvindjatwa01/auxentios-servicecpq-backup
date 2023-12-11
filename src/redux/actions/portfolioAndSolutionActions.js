import {
  getPortfolioAndSolutionCommonConfig,
  getPortfolioCommonConfig,
  getSolutionPriceCommonConfig,
  getTypeKeyValue,
  getValidityKeyValue,
} from "services";
import { API_SUCCESS } from "services/ResponseCode";

export const GET_SUPPORT_LEVEL = "GET_SUPPORT_LEVEL";
export const GET_SUPPORT_LEVEL_SUCCESS = "SUPPORT_LEVEL_SUCCESS";
export const GET_SUPPORT_LEVEL_FAILED = "SUPPORT_LEVEL_FAILED";

export const GET_STATUS = "GET_STATUS";
export const GET_STATUS_SUCCESS = "GET_STATUS_SUCCESS";
export const GET_STATUS_FAILED = "GET_STATUS_FAILED";

export const GET_CUSTOMER_SEGMENT = "CUSTOMER_SEGMENT";
export const GET_CUSTOMER_SEGMENT_SUCCESS = "CUSTOMER_SEGMENT_SUCCESS";
export const GET_CUSTOMER_SEGMENT_FAILED = "CUSTOMER_SEGMENT_FAILED";

export const GET_PRICE_LIST = "PRICE_LIST";
export const GET_PRICE_LIST_SUCCESS = "PRICE_LIST_SUCCESS";
export const GET_PRICE_LIST_FAILED = "PRICE_LIST_FAILED";

export const GET_PRICE_METHOD = "PRICE_METHOD";
export const GET_PRICE_METHOD_SUCCESS = "PRICE_METHOD_SUCCESS";
export const GET_PRICE_METHOD_FAILED = "PRICE_METHOD_FAILED";

export const GET_PRICE_TYPE = "PRICE_TYPE";
export const GET_PRICE_TYPE_SUCCESS = "PRICE_TYPE_SUCCESS";
export const GET_PRICE_TYPE_FAILED = "PRICE_TYPE_FAILED";

export const GET_PRICE_HEAD_TYPE = "PRICE_HEAD_TYPE";
export const GET_PRICE_HEAD_TYPE_SUCCESS = "PRICE_HEAD_TYPE_SUCCESS";
export const GET_PRICE_HEAD_TYPE_FAILED = "PRICE_HEAD_TYPE_FAILED";

export const GET_CURRENCY = "CURRENCY";
export const GET_CURRENCY_SUCCESS = "CURRENCY_SUCCESS";
export const GET_CURRENCY_FAILED = "CURRENCY_FAILED";

export const GET_MACHINE_COMPONENT_TYPE = "MACHINE_COMPONENT_TYPE";
export const GET_MACHINE_COMPONENT_TYPE_SUCCESS =
  "MACHINE_COMPONENT_TYPE_SUCCESS";
export const GET_MACHINE_COMPONENT_TYPE_FAILED =
  "MACHINE_COMPONENT_TYPE_FAILED";

export const GET_VALIDITY_TYPE = "VALIDITY_TYPE";
export const GET_VALIDITY_TYPE_SUCCESS = "VALIDITY_TYPE_SUCCESS";
export const GET_VALIDITY_TYPE_FAILED = "VALIDITY_TYPE_FAILED";

export const GET_FREQUENCY = "FREQUENCY";
export const GET_FREQUENCY_SUCCESS = "FREQUENCY_SUCCESS";
export const GET_FREQUENCY_FAILED = "FREQUENCY_FAILED";

export const GET_UNIT = "UNIT";
export const GET_UNIT_SUCCESS = "UNIT_SUCCESS";
export const GET_UNIT_FAILED = "UNIT_FAILED";

// support level key value Pair
export const getSupportLevel = () => (dispatch) => {
  dispatch({ type: GET_SUPPORT_LEVEL });
  getSolutionPriceCommonConfig("support-level").then((response) => {
    const supportLevelOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d.key != "EMPTY") {
          supportLevelOptions.push({ value: d.key, label: d.value });
        }
      });
    dispatch({ type: GET_SUPPORT_LEVEL_SUCCESS, options: supportLevelOptions });
  });
};

// status key value pair
export const getStatusKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_STATUS });
  getSolutionPriceCommonConfig("status").then((response) => {
    const portfolioStatusOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d.key != "EMPTY") {
          portfolioStatusOptions.push({ value: d.key, label: d.value });
        }
      });
    dispatch({ type: GET_STATUS_SUCCESS, options: portfolioStatusOptions });
  });
};

// customer segment key value pair
export const getCustomerSegmentKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_CUSTOMER_SEGMENT });
  getPortfolioCommonConfig("customer-segment").then((response) => {
    const customerSegmentOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d.key != "EMPTY") {
          customerSegmentOptions.push({ value: d.key, label: d.value });
        }
      });
    dispatch({
      type: GET_CUSTOMER_SEGMENT_SUCCESS,
      options: customerSegmentOptions,
    });
  });
};

// price list key value pair
export const getPriceListKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_PRICE_LIST });
  getSolutionPriceCommonConfig("price-list").then((response) => {
    const priceListOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d.key != "EMPTY") {
          priceListOptions.push({ value: d.key, label: d.value });
        }
      });
    dispatch({ type: GET_PRICE_LIST_SUCCESS, options: priceListOptions });
  });
};

// price method key value pair
export const getPriceMethodKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_PRICE_METHOD });
  getSolutionPriceCommonConfig("price-method").then((response) => {
    const priceMethodOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d.key != "EMPTY") {
          priceMethodOptions.push({ value: d.key, label: d.value });
        }
      });
    dispatch({ type: GET_PRICE_METHOD_SUCCESS, options: priceMethodOptions });
  });
};

// price type key value pair
export const getPriceTypeKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_PRICE_TYPE });
  getSolutionPriceCommonConfig("price-type").then((response) => {
    const priceTypeOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d.key != "EMPTY") {
          priceTypeOptions.push({ value: d.key, label: d.value });
        }
      });
    dispatch({ type: GET_PRICE_TYPE_SUCCESS, options: priceTypeOptions });
  });
};

// price head type key value pair
export const getPriceHeadTypeKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_PRICE_HEAD_TYPE });
  getSolutionPriceCommonConfig("price-head-type").then((response) => {
    const priceHeadTypeOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d.key != "EMPTY") {
          priceHeadTypeOptions.push({ value: d.key, label: d.value });
        }
      });
    dispatch({
      type: GET_PRICE_HEAD_TYPE_SUCCESS,
      options: priceHeadTypeOptions,
    });
  });
};

// currency key value pair
export const getCurrencyKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_CURRENCY });
  getSolutionPriceCommonConfig("currency").then((response) => {
    const currencyOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d !== "EMPTY" || d !== "") {
          currencyOptions.push({ value: d, label: d });
        }
      });
    dispatch({
      type: GET_CURRENCY_SUCCESS,
      options: currencyOptions,
    });
  });
};

// machine/component type key value pair
export const getMachineComponentTypeKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_MACHINE_COMPONENT_TYPE });
  getTypeKeyValue().then((response) => {
    const machineTypeOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d.key != "EMPTY") {
          machineTypeOptions.push({ value: d.key, label: d.value });
        }
      });
    dispatch({
      type: GET_MACHINE_COMPONENT_TYPE_SUCCESS,
      options: machineTypeOptions,
    });
  });
};

// validity(unit) type key value pair
export const getValidityTypeKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_VALIDITY_TYPE });
  getValidityKeyValue().then((response) => {
    const validityTypeOptions = [];
    response.length !== 0 &&
      response.map((d) => {
        if (d.key != "EMPTY") {
          validityTypeOptions.push({ value: d.key, label: d.value });
        }
      });
    dispatch({
      type: GET_VALIDITY_TYPE_SUCCESS,
      options: validityTypeOptions,
    });
  });
};

// frequency key value pair
export const getFrequencyKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_FREQUENCY });
  getPortfolioAndSolutionCommonConfig("frequency").then((response) => {
    if (response.status === API_SUCCESS) {
      const frequencyOptions = [];
      response.data.length !== 0 &&
        response.data.map((d) => {
          if (d.key != "EMPTY") {
            frequencyOptions.push({ value: d.key, label: d.value });
          }
        });
      dispatch({
        type: GET_FREQUENCY_SUCCESS,
        options: frequencyOptions,
      });
    }
  });
};

// unit key value pair
export const getUnitKeyValuePair = () => (dispatch) => {
  dispatch({ type: GET_UNIT });
  getPortfolioAndSolutionCommonConfig("unit").then((response) => {
    if (response.status === API_SUCCESS) {
      const unitOptions = [];
      response.data.length !== 0 &&
        response.data.map((d) => {
          if (d.key !== "EMPTY" && d.key !== "MONTH") {
            unitOptions.push({ value: d.key, label: d.value });
          }
        });
      dispatch({
        type: GET_UNIT_SUCCESS,
        options: unitOptions,
      });
    }
  });
};
