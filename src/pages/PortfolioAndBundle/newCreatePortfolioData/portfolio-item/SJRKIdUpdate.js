import {
  portfolioItemPriceRkId, portfolioItemPriceSjid,
  customPortfolioItemPriceRkId, customPortfolioItemPriceSJID,
} from "services";
import { isEmpty } from "../utilities/textUtilities";

// use case 3 item price SJId or RkId Update
export const updateItemPriceSjRkId = (obj) => {
  if (isEmpty(obj.standardJobId) && isEmpty(obj.repairKitId)) {
    return;
  } else if (!isEmpty(obj.standardJobId) && isEmpty(obj.repairKitId)) {
    portfolioItemPriceSjid(obj);
  } else if (isEmpty(obj.standardJobId) && !isEmpty(obj.repairKitId)) {
    portfolioItemPriceRkId(obj);
  }
};

// use case 4 custom item price SJId or RkId Update
export const updateCustomItemPricesSjRkId = (obj) => {
  if (isEmpty(obj.standardJobId) && isEmpty(obj.repairKitId)) {
    return;
  } else if (!isEmpty(obj.standardJobId) && isEmpty(obj.repairKitId)) {
    customPortfolioItemPriceSJID(obj);
  } else if (isEmpty(obj.standardJobId) && !isEmpty(obj.repairKitId)) {
    customPortfolioItemPriceRkId(obj);
  }
};