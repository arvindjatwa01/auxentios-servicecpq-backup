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
export { createPortfolio, getPortfolio, updatePortfolio, portfolioSearch, portfolioSearchDropdownList, portfolioSearchList, portfolioSearchTableDataList, portfolioItemPriceHierarchySearch} from './servicePortfolioServices'
export { createCustomPortfolio, updateCustomPortfolio, getCustomPortfolio, solutionPortfolioSearch, getSearchForRecentSolutionPortfolio, getSearchForRecentSolutionBundleService, copyPortfolioICustomPortfolio, copyMaterToCustomPortfolio } from './customPortfolioSolutions'
export { getPortfolioCommonConfig, getPortfolioPriceTypeCommonConfig, getPortfolioPriceHeadTypeCommonConfig, getSolutionPriceCommonConfig, additionalPriceCreation, escalationPriceCreation, portfolioPriceCreation, portfolioItemPriceSjid, getItemPriceData, getCustomItemPriceData, updatePortfolioPrice, updateEscalationPriceById, updateAdditionalPriceById, getPortfolioPriceById, portfolioPriceAgreementCreation } from './pricingCommonConfig'
export { getMakeKeyValue, getModelKeyValue, getPrefixKeyValue, createCoverage, updateCoverage, updateCustomCoverage, createCustomCoverage } from './coverageService'
export { getUsageCategoryKeyValue, getStrategyTaskKeyValue, getTaskTypeKeyValue, getProductHierarchyKeyValue, getGergraphicKeyValue, getMachineTypeKeyValue, getLifeStageKeyValue, getTypeKeyValue, getResponseTimeTaskKeyValue, getValidityKeyValue, getSolutionTypeKeyValue, getSolutionLevelKeyValue, getAuditRestServiceData } from './commonSolutionBuilderServices'
export { getSearchQueryCoverage, getSearchCoverageForFamily, getSearchCustomCoverageForFamily, getSearchForPortfolio, getSearchForRecentPortfolio, getSearchForRecentBundleService, getSearchStandardJobId, getSearchKitId, getServiceBundleItemPrices } from "./searchQueryService"
export { itemCreation, getItemDataById, itemSearchSuggestion, itemSearch, itemSearchDropdown, recentItemsList, getItemPrice, updateItemData, deleteItem, portfolioItemPriceRkId, itemPriceDataId, updateItemPriceData, createItemPriceData, getServiceItemsList } from './portFolioItemService';
export { getComponentCodeSuggetions } from './masterComponentCode';
export { customItemCreation, updateCustomItemData, deleteCustomItem, customPriceCreation, getSearchCustomPortfolio, getSearchCustomPortfolioDropdownList, getCustomItemDataById, getCustomItemPriceById, updateCustomPriceData, customPortfolioItemPriceSJID, customPortfolioItemPriceRkId, getCustomServiceBundleItemPrices, customPortfolioSearchTableDataList } from './customPortfolioItemService'
export { quoteCreation, getQuoteMasterData, getSearchQuoteData, updateMasterQuoteData, deleteMasterQuote, convertPortfolioToQuoteData, getConvertQuoteData, getQuoteSearchDropdown } from "./quoteService";

export { getRecentSolutionQuotes, solutionQuoteCreation, updateSolutionQuoteData, getRecentQuotes, searchSolutionQuotes } from "./solutionQuoteServices";