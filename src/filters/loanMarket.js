import i18n from '@/lang' // internationalization

/**
 * 贷超类型
 * @param {Number} marketType
 */
export function marketTypeFilter(data) {
  switch (data * 1) {
    case 10:
      return 'ocm'
    default:
      return ''
  }
}

/**
 * 费用变更类型
 * @param {Number} changeType
 */
export function billChangeTypeFilter(data) {
  switch (data * 1) {
    case 10:
      return i18n.tc('borrow.borrow47') /* 创建 */
    case 20:
      return i18n.tc('borrow.borrow48') /* 逾期增加 */
    case 30:
      return i18n.tc('borrow.borrow49') /* 线上还款扣减 */
    case 40:
      return i18n.tc('borrow.borrow50') /* 减免 */
    case 50:
      return i18n.tc('borrow.borrow51') /* 管理员增加 */
    case 60:
      return i18n.tc('borrow.borrow55') /* 线下还款扣减（人工入账） */
    default:
      return ''
  }
}

/**
 * 逾期阶段设置 -- 催收类型
 * @param {Number} collectionType
 */
export function collectionTypeFilter(data) {
  switch (parseInt(data)) {
    case 10:
      return i18n.tc('loanMarket.loanMarket62') /* 催收逾期 */
    case 20:
      return i18n.tc('loanMarket.loanMarket63') /* 预提醒 */
    default:
      return ''
  }
}

/**
 * 放款结果是否成功
 * @param {Number} releaseResultSucceed
 */
export function releaseResultSucceedFilter(data) {
  switch (data) {
    case true:
      return i18n.tc('collect.collect224') /* 成功 */
    case false:
      return i18n.tc('collect.collect225') /* 失败 */
    default:
      return ''
  }
}

/**
 * 详情页 -- 人审结果
 * @param {Number} reviewingStatus
 */
export function reviewingStatusFilter(data) {
  switch (parseInt(data)) {
    case 10:
      return i18n.tc('borrow.borrow7') /* 通过 */
    case 20:
      return i18n.tc('collect.collect98') /* 拒绝 */
    default:
      return ''
  }
}
