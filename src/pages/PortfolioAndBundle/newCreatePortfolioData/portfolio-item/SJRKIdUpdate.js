import { portfolioItemPriceRkId, portfolioItemPriceSjid } from "services";
import { isEmptyData } from "../utilities/textUtilities"

export const updateItemPriceSjRkId = (obj) => {
    if (isEmptyData(obj.standardJobId) && isEmptyData(obj.repairKitId)) {
        return;
    } else if (!isEmptyData(obj.standardJobId) && isEmptyData(obj.repairKitId)) {
        portfolioItemPriceSjid(obj)
    } else if (isEmptyData(obj.standardJobId) && !isEmptyData(obj.repairKitId)) {
        portfolioItemPriceRkId(obj)
    }
}