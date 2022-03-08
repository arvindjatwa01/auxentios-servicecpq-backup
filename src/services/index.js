/**
 * Here you can export functions with corresponding services / endpoints.
 * You can always use the services directly from the specific moduleServices file as well.
 * This is to keep a track of all available services as a list.
 * I think it makes is easy to maintain when you have a long long list as your app gradually scales.
 */

export { getAllUsers } from './userServices';
export { getUserDetails, signup, signIn } from './userServices';
export { getAllPortfolios } from './solutionBuilderServices'
export { createPortfolio, getPortfolio, updatePortfolio } from './servicePortfolioServices'
export { getMakeKeyValue, getModelKeyValue, getPrefixKeyValue } from './coverageService'
export { getUsageCategoryKeyValue, getStrategyTaskKeyValue, getTaskTypeKeyValue, getProductHierarchyKeyValue, getGergraphicKeyValue, getMachineTypeKeyValue, getTypeKeyValue, getResponseTimeTaskKeyValue, getValidityKeyValue } from './commonSolutionBuilderServices'

