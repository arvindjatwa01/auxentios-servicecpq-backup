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
export { getAllPortfolios } from './solutionBuilderServices'
export { createPortfolio, getPortfolio, updatePortfolio} from './servicePortfolioServices'
export { getPortfolioCommonConfig } from './pricingCommonConfig'
export { getMakeKeyValue, getModelKeyValue, getPrefixKeyValue,createCoverage} from './coverageService'
export { getUsageCategoryKeyValue, getStrategyTaskKeyValue, getTaskTypeKeyValue, getProductHierarchyKeyValue, getGergraphicKeyValue, getMachineTypeKeyValue, getTypeKeyValue, getResponseTimeTaskKeyValue, getValidityKeyValue } from './commonSolutionBuilderServices'
export {getSearchQueryCoverage,getSearchCoverageForFamily} from "./searchQueryService"
export { itemCreation } from './portFolioItemService';

