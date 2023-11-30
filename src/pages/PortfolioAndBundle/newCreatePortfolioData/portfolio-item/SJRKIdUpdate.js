import {
  customPortfolioItemPriceRkId,
  customPortfolioItemPriceSJID,
  portfolioItemPriceRkId,
  portfolioItemPriceSjid,
} from "services";
import { isEmpty } from "../utilities/textUtilities";

export const updateItemPriceSjRkId = (obj) => {
  if (isEmpty(obj.standardJobId) && isEmpty(obj.repairKitId)) {
    return;
  } else if (!isEmpty(obj.standardJobId) && isEmpty(obj.repairKitId)) {
    portfolioItemPriceSjid(obj);
  } else if (isEmpty(obj.standardJobId) && !isEmpty(obj.repairKitId)) {
    portfolioItemPriceRkId(obj);
  }
};

export const updateCustomItemPricesSjRkId = (obj) => {
  if (isEmpty(obj.standardJobId) && isEmpty(obj.repairKitId)) {
    return;
  } else if (!isEmpty(obj.standardJobId) && isEmpty(obj.repairKitId)) {
    customPortfolioItemPriceSJID(obj);
  } else if (isEmpty(obj.standardJobId) && !isEmpty(obj.repairKitId)) {
    customPortfolioItemPriceRkId(obj);
  }
};
