import { getMarketList } from '@/api/loanSupermarket'
import { getCompanyName } from '@/api/sysManage'
import i18n from '@/lang'
import { Message } from 'element-ui'

const state = {
  // 所有公司名
  companyNameOptions: [],
  // 所有公司名 -- 催收
  companyNameCollectOptions: [],
  // 所有公司名 -- 预提醒
  companyNameRemindOptions: [],
  // 账户状态
  isValidOptions: [],
  // 用户类型
  userTypeOptions: [],
  // 模型类型
  modelTypeOptions: [],
  // 期单位类型
  periodUnitOptions: [],
  // 标签
  flagOptions: [],
  // 订单状态
  borrowStatusOptions: [],
  // 订单状态 -- 贷款订单表和人工入账页面
  borrowStatusOptions1: [],
  // 贷款类型
  loanTypeOptions: [],
  // 风控结果
  modelResultTypeOptions: [],
  // 是否存在
  whetherOptions: [],
  // 性别
  sexOptions: [],
  // 婚姻状况
  maritalStatusOptions: [],
  // 客户类型
  oldOptions: [],
  // 黑名单
  blackCustomerOptions: [],
  // 减免状态
  discountStatusOptions: [],
  // 还款状态
  repayStatusOptions: [],
  // 还款途径
  repayWayOptions: [],
  // 模型分对比方法
  compareTypeOptions: [],
  // 贷超类型
  marketTypeOptions: [],
  // 催收类型
  collectionTypeOptions: []
}

const mutations = {
  COMPANY_NAME_OPTIONS: (state, data) => {
    state.companyNameOptions = data
  },
  COMPANY_NAME_COLLECT_OPTIONS: (state, data) => {
    state.companyNameCollectOptions = data
  },
  COMPANY_NAME_REMIND_OPTIONS: (state, data) => {
    state.companyNameRemindOptions = data
  },
  IS_VALID_OPTIONS: (state, data) => {
    state.isValidOptions = data
  },
  USER_TYPE_OPTIONS: (state, data) => {
    state.userTypeOptions = data
  },
  MODEL_TYPE_OPTIONS: (state, data) => {
    state.modelTypeOptions = data
  },
  PERIOD_UNIT_OPTIONS: (state, data) => {
    state.periodUnitOptions = data
  },
  STATUS_OPTIONS: (state, data) => {
    state.flagOptions = data
  },
  BORROW_STATUS_OPTIONS: (state, data) => {
    state.borrowStatusOptions = data
  },
  BORROW_STATUS_OPTIONS1: (state, data) => {
    state.borrowStatusOptions1 = data
  },
  LOAN_TYPE_OPTIONS: (state, data) => {
    state.loanTypeOptions = data
  },
  MODEL_RESULT_TYPE_OPTIONS: (state, data) => {
    state.modelResultTypeOptions = data
  },
  WHETHER_OPTIONS: (state, data) => {
    state.whetherOptions = data
  },
  SEX_OPTIONS: (state, data) => {
    state.sexOptions = data
  },
  MARITAL_STATUS_OPTIONS: (state, data) => {
    state.maritalStatusOptions = data
  },
  OLD_OPTIONS: (state, data) => {
    state.oldOptions = data
  },
  BLACK_CUSTOMER_OPTIONS: (state, data) => {
    state.blackCustomerOptions = data
  },
  DISCOUNT_STATUS_OPTIONS: (state, data) => {
    state.discountStatusOptions = data
  },
  REPAY_STATUS_OPTIONS: (state, data) => {
    state.repayStatusOptions = data
  },
  REPAY_WAY_OPTIONS: (state, data) => {
    state.repayWayOptions = data
  },
  COMPARE_TYPE_OPTIONS: (state, data) => {
    state.compareTypeOptions = data
  },
  MARKET_TYPE_OPTIONS: (state, data) => {
    state.marketTypeOptions = data
  },
  COLLECTION_TYPE_OPTIONS: (state, data) => {
    state.collectionTypeOptions = data
  }
}

const actions = {
  async getCompanyNameOptions({ commit }) {
    // 获取所有公司名
    /* const res = await getCompanyName()
    if (res.code !== '0') return this.$message.error(res.message || 'Error')
    commit('COMPANY_NAME_OPTIONS', res.data || []) */

    // 获取所有公司名 -- 催收
    const res = await getCompanyName({ collectionType: 10 })
    if (res.code !== '0') return Message.error(res.message || 'Error')
    commit('COMPANY_NAME_COLLECT_OPTIONS', res.data || [])

    // 获取所有公司名 -- 预提醒
    const item = await getCompanyName({ collectionType: 20 })
    if (item.code !== '0') return Message.error(item.message || 'Error')
    commit('COMPANY_NAME_REMIND_OPTIONS', item.data || [])

    // 获取所有公司名
    const companyNameCollectList = res.data.concat(item.data) || []
    commit('COMPANY_NAME_OPTIONS', companyNameCollectList)
  },
  async getMarketTypeOptions({ commit }) {
    // 获取所有市场类型
    const res = await getMarketList({ page: 1, size: 100 })
    if (res.code !== '0') return Message.error(res.message || 'Error')
    const tmp = []
    res.data.list.forEach(item => {
      tmp.push({
        marketType: item.marketType,
        value: item.id,
        label: item.marketName
      })
    })
    commit('MARKET_TYPE_OPTIONS', tmp)
  },
  getIsValidOptions({ commit }) {
    // 账户状态
    commit('IS_VALID_OPTIONS', [
      { value: 1, label: i18n.tc('sysManage.sysManage28') }, /* 启用 */
      { value: 0, label: i18n.tc('sysManage.sysManage27') } /* 禁用 */
    ])
    // 标签
    commit('STATUS_OPTIONS', [
      { value: 1, label: i18n.tc('financial.financial11') }, /* 有人接听 */
      { value: 2, label: i18n.tc('financial.financial12') }, /* WhatsApp可联 */
      { value: 3, label: i18n.tc('financial.financial13') }, /* whatsAPP未回复 */
      { value: 4, label: i18n.tc('financial.financial14') }, /* 无人接听 */
      { value: 5, label: i18n.tc('financial.financial15') }, /* 电话占线 */
      { value: 6, label: i18n.tc('financial.financial16') }, /* 关机 */
      { value: 7, label: i18n.tc('financial.financial17') }, /* 其他方式可联 */
      { value: 8, label: i18n.tc('financial.financial18') }, /* 没有whatsap账号 */
      { value: 9, label: i18n.tc('financial.financial19') }, /* 空号错号 */
      { value: 10, label: i18n.tc('financial.financial20') }, /* 停机 */
      { value: 11, label: i18n.tc('financial.financial21') }, /* 特殊【中介黑产催收】 */
      { value: 12, label: i18n.tc('financial.financial22') } /* 其他 */
    ])
    // 订单状态
    commit('BORROW_STATUS_OPTIONS', [
      { value: 10, label: i18n.tc('collect.collect24') }, /* 等待推送 */
      { value: 20, label: i18n.tc('collect.collect25') }, /* 推送中 */
      { value: 30, label: i18n.tc('collect.collect27') }, /* 试算中 */
      { value: 40, label: i18n.tc('collect.collect28') }, /* 等待用户确认 */
      { value: 50, label: i18n.tc('collect.collect26') }, /* 风控中 */
      { value: 51, label: i18n.tc('theData.theData62') }, /* 人审中 */
      { value: 60, label: i18n.tc('collect.collect29') }, /* 放款中 */
      { value: 70, label: i18n.tc('collect.collect30') }, /* 借贷中 */
      { value: 80, label: i18n.tc('collect.collect31') }, /* 还款中 */
      { value: 90, label: i18n.tc('collect.collect32') }, /* 逾期中 */
      { value: 1000, label: i18n.tc('collect.collect33') }, /* 正常完成 */
      { value: 1010, label: i18n.tc('collect.collect34') }, /* 逾期完成 */
      { value: 1020, label: i18n.tc('collect.collect35') } /* 放款前失败 */
    ])
    // 订单状态 -- 人工入账和贷款订单表页面
    commit('BORROW_STATUS_OPTIONS1', [
      { value: 70, label: i18n.tc('collect.collect30') }, /* 借贷中 */
      { value: 80, label: i18n.tc('collect.collect31') }, /* 还款中 */
      { value: 90, label: i18n.tc('collect.collect32') } /* 逾期中 */
    ])
    // 贷款类型
    commit('LOAN_TYPE_OPTIONS', [
      { value: 10, label: i18n.tc('collect.collect36') }, /* 首贷 */
      { value: 20, label: i18n.tc('collect.collect37') } /* 复贷 */
    ])
    // 风控结果
    commit('MODEL_RESULT_TYPE_OPTIONS', [
      { value: 10, label: i18n.tc('borrow.borrow7') }, /* 通过 */
      { value: 20, label: i18n.tc('borrow.borrow8') }, /* 永久拒绝 */
      { value: 30, label: i18n.tc('borrow.borrow9') }, /* 有限拒绝 */
      { value: 40, label: i18n.tc('borrow.borrow70') }, /* 风控分异常 */
      { value: 11, label: i18n.tc('loanMarket.loanMarket50') } /* 人审 */

    ])
    // 是否存在
    commit('WHETHER_OPTIONS', [
      { value: true, label: i18n.tc('common.common38') }, /* 存在 */
      { value: false, label: i18n.tc('common.common39') } /* 不存在 */
    ])
    // 性别
    commit('SEX_OPTIONS', [
      { value: 0, label: i18n.tc('common.common6') }, /* 未知 */
      { value: 10, label: i18n.tc('common.common7') }, /* 男 */
      { value: 20, label: i18n.tc('common.common8') }, /* 女 */
      { value: 30, label: i18n.tc('common.common9') } /* 变性人 */
    ])
    // 婚姻状况
    commit('MARITAL_STATUS_OPTIONS', [
      { value: 10, label: i18n.tc('userManage.userManage12') }, /* 未婚 */
      { value: 20, label: i18n.tc('userManage.userManage13') }, /* 已婚 */
      { value: 30, label: i18n.tc('userManage.userManage14') }, /* 离异 */
      { value: 40, label: i18n.tc('userManage.userManage15') }, /* 丧偶 */
      { value: 50, label: i18n.tc('common.common6') } /* 未知 */
    ])
    // 客户类型
    commit('OLD_OPTIONS', [
      { value: true, label: i18n.tc('borrow.borrow21') }, /* 老客 */
      { value: false, label: i18n.tc('borrow.borrow22') } /* 新客 */
    ])
    // 黑名单
    commit('BLACK_CUSTOMER_OPTIONS', [
      { value: true, label: i18n.tc('common.common34') }, /* 是 */
      { value: false, label: i18n.tc('common.common33') } /* 否 */
    ])
    // 减免状态
    commit('DISCOUNT_STATUS_OPTIONS', [
      { value: 0, label: i18n.tc('collect.collect77') }, /* 待审核 */
      { value: 10, label: i18n.tc('borrow.borrow7') }, /* 通过 */
      { value: 20, label: i18n.tc('collect.collect78') } /* 驳回 */
    ])
    // 还款状态
    commit('REPAY_STATUS_OPTIONS', [
      { value: 0, label: i18n.tc('collect.collect223') }, /* 等待还款 */
      { value: 10, label: i18n.tc('collect.collect224') }, /* 还款成功 */
      { value: 20, label: i18n.tc('collect.collect225') } /* 还款失败 */
    ])
    // 还款途径
    commit('REPAY_WAY_OPTIONS', [
      { value: 10, label: i18n.tc('collect.collect228') }, /* 主动 */
      { value: 20, label: i18n.tc('collect.collect229') }, /* 被动 */
      { value: 30, label: i18n.tc('collect.collect230') } /* 线下 */
    ])
    // 模型分对比方法
    commit('COMPARE_TYPE_OPTIONS', [
      { value: 10, label: i18n.tc('risk.risk2') }, /* 大于上限值直过，小于下限值直拒。介于中间值人审 */
      { value: 20, label: i18n.tc('risk.risk3') } /* 小于下限值直过，大于上限值直拒。介于中间值人审 */
    ])
    // 催收类型
    commit('COLLECTION_TYPE_OPTIONS', [
      { value: 10, label: i18n.tc('loanMarket.loanMarket62') }, /* 催收逾期 */
      { value: 20, label: i18n.tc('loanMarket.loanMarket63') } /* 预提醒 */
    ])
  },

  getUserTypeOptions({ commit }) {
    commit('USER_TYPE_OPTIONS', [
      { value: 10, label: i18n.tc('common.common1') }, /* 管理账户 */
      { value: 20, label: i18n.tc('common.common2') } /* 催收账户 */
    ])
  },
  getModelTypeOptions({ commit }) {
    commit('MODEL_TYPE_OPTIONS', [
      { value: 10, label: 'epoch' },
      { value: 20, label: 'zelda' },
      { value: 30, label: i18n.tc('common.common21') }, /* 内部 */
      { value: 40, label: i18n.tc('common.common22') }, /* 基础 */
      { value: 50, label: i18n.tc('theData.theData60') }, /* cash风控 */
      { value: 60, label: i18n.tc('theData.theData61') } /* 冒泡风控 */
    ])
  },
  getPeriodUnitOptions({ commit }) {
    commit('PERIOD_UNIT_OPTIONS', [
      { value: 10, label: i18n.tc('common.common23') }, /* 天 */
      { value: 20, label: i18n.tc('common.common24') }, /* 周 */
      { value: 30, label: i18n.tc('common.common25') }, /* 月 */
      { value: 40, label: i18n.tc('common.common26') }, /* 季 */
      { value: 50, label: i18n.tc('common.common27') } /* 年 */
    ])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

