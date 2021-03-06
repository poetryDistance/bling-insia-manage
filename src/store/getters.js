const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  currentMarketId: state => state.app.currentMarketId,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  companyNameOptions: state => state.options.companyNameOptions,
  isValidOptions: state => state.options.isValidOptions,
  permission: state => state.permission.permission,
  ids: state => state.permission.ids,

  statusOptions: state => state.options.statusOptions,
  borrowStatusOptions: state => state.options.borrowStatusOptions,
  borrowStatusOptions1: state => state.options.borrowStatusOptions1,
  loanTypeOptions: state => state.options.loanTypeOptions,
  modelResultTypeOptions: state => state.options.modelResultTypeOptions,
  whetherOptions: state => state.options.whetherOptions,
  sexOptions: state => state.options.sexOptions,
  maritalStatusOptions: state => state.options.maritalStatusOptions,
  oldOptions: state => state.options.oldOptions,
  blackCustomerOptions: state => state.options.blackCustomerOptions,
  repayStatusOptions: state => state.options.repayStatusOptions,
  repayWayOptions: state => state.options.repayWayOptions,
  compareTypeOptions: state => state.options.compareTypeOptions,
  marketTypeOptions: state => state.options.marketTypeOptions
}
export default getters
