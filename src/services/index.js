/**
 * Here you can export functions with corresponding services / endpoints.
 * You can always use the services directly from the specific moduleServices file as well.
 * This is to keep a track of all available services as a list.
 * I think it makes is easy to maintain when you have a long long list as your app gradually scales.
 */

export { getAllUsers } from './userServices';
export { getPortfolioSchema } from './schemaConfigServices';
export { getGuidedSolution } from './guidedSolutionServices';
export { getUserDetails, signup, signIn } from './userServices';
export { getAllPortfolios, getSolutionPortfolioById } from './solutionBuilderServices'
export { createPortfolio, getPortfolio, updatePortfolio, portfolioSearch } from './servicePortfolioServices'
export { createCustomPortfolio, updateCustomPortfolio, getCustomPortfolio, solutionPortfolioSearch, getSearchForRecentSolutionPortfolio, getSearchForRecentSolutionBundleService, copyPortfolioICustomPortfolio } from './customPortfolioSolutions'
export { getPortfolioCommonConfig, getPortfolioPriceTypeCommonConfig, getPortfolioPriceHeadTypeCommonConfig, getSolutionPriceCommonConfig, additionalPriceCreation, escalationPriceCreation, portfolioPriceCreation,portfolioItemPriceSjid, getItemPriceData, getCustomItemPriceData } from './pricingCommonConfig'
export { getMakeKeyValue, getModelKeyValue, getPrefixKeyValue, createCoverage, createCutomCoverage } from './coverageService'
export { getUsageCategoryKeyValue, getStrategyTaskKeyValue, getTaskTypeKeyValue, getProductHierarchyKeyValue, getGergraphicKeyValue, getMachineTypeKeyValue, getLifeStageKeyValue, getTypeKeyValue, getResponseTimeTaskKeyValue, getValidityKeyValue, getSolutionTypeKeyValue, getSolutionLevelKeyValue, getAuditRestServiceData } from './commonSolutionBuilderServices'
export { getSearchQueryCoverage, getSearchCoverageForFamily, getSearchForPortfolio, getSearchForRecentPortfolio, getSearchForRecentBundleService, getSearchStandardJobId, getSearchKitId } from "./searchQueryService"
export { itemCreation, itemSearchSuggestion, itemSearch, getItemPrice, updateItemData, deleteItem, itemPriceDataId, updateItemPriceData, createItemPriceData } from './portFolioItemService';
export { getComponentCodeSuggetions } from './masterComponentCode';
export { customitemCreation, getcustomItemPrice, updateCustomItemData, deleteCustomItem, customPriceCreation, getSearchCustomPortfolio, getCustomItemData, getcustomItemPriceById, updateCustomPriceData } from './customPortfolioItemService'
export { quoteCreation, getQuoteMasterData, getSearchQuoteData, updateMasterQuoteData, deleteMasterQuote, convertPortfolioToQuoteData, getConvertQuoteData } from "./quoteService";

