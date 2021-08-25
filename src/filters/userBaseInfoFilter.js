import i18n from '@/lang' // internationalization

/**
 * 公司行业
 * @param {Number} companyType
 */
export function companyTypeFilter(companyType) {
  switch (companyType * 1) {
    case 10:
      return i18n.tc('common.common40') /* 金融 */
    case 20:
      return i18n.tc('common.common41') /* 房地产 */
    case 30:
      return i18n.tc('common.common42') /* 互联网 */
    case 40:
      return i18n.tc('common.common43') /* 服务行业 */
    case 50:
      return i18n.tc('common.common44') /* 政府 */
    case 60:
      return i18n.tc('common.common45') /* 制造业 */
    case 70:
      return i18n.tc('common.common46') /* 零售 */
    case 80:
      return i18n.tc('common.common47') /* 广告业 */
    case 90:
      return i18n.tc('common.common48') /* 贸易 */
    case 100:
      return i18n.tc('common.common49') /* 医疗 */
    case 110:
      return i18n.tc('common.common50') /* 物流 */
    case 1000:
      return i18n.tc('common.common51') /* 其它 */
    default:
      return ''
  }
}

/**
 * 使用语言
 * @param {Number} customerLang
 */
export function customerLangFilter(customerLang) {
  switch (customerLang * 1) {
    case 10:
      return i18n.tc('common.common52') /* 英语 */
    case 20:
      return i18n.tc('common.common53') /* 印地语 */
    case 30:
      return i18n.tc('common.common54') /* 马拉地语 */
    case 40:
      return i18n.tc('common.common55') /* 孟加拉语 */
    case 50:
      return i18n.tc('common.common56') /* 泰卢固语 */
    case 60:
      return i18n.tc('common.common57') /* 泰米尔语 */
    case 70:
      return i18n.tc('common.common58') /* 古吉拉特语 */
    case 80:
      return i18n.tc('common.common59') /* 坎纳达语 */
    case 90:
      return i18n.tc('common.common60') /* 乌尔都语 */
    case 100:
      return i18n.tc('common.common61') /* 马拉雅拉姆语 */
    case 110:
      return i18n.tc('common.common62') /* 奥迪亚 */
    case 1000:
      return i18n.tc('common.common63') /* 其它语言 */
    default:
      return ''
  }
}

/**
 *  教育程度
 * @param {Number} eduStatus
 */
export function eduStatusFilter(eduStatus) {
  switch (eduStatus * 1) {
    case 0:
      return i18n.tc('common.common111') /* 未受过教育 */
    case 10:
      return i18n.tc('common.common64') /* 小学 */
    case 20:
      return i18n.tc('common.common65') /* 初中 */
    case 30:
      return i18n.tc('common.common66') /* 高中 */
    case 40:
      return i18n.tc('common.common67') /* 大专 */
    case 50:
      return i18n.tc('common.common68') /* 学士 */
    case 60:
      return i18n.tc('common.common69') /* 硕士 */
    case 70:
      return i18n.tc('common.common70') /* 博士 */
    default:
      return ''
  }
}

/**
 *  借款用途
 * @param {Number} loanPurpose
 */
export function loanPurposeFilter(data) {
  switch (data * 1) {
    case 10:
      return i18n.tc('common.common71') /* 日常消费 */
    case 20:
      return i18n.tc('common.common72') /* 医学治疗 */
    case 30:
      return i18n.tc('common.common73') /* 商业贷款 */
    case 40:
      return i18n.tc('common.common74') /* 教育 */
    case 50:
      return i18n.tc('common.common75') /* 企业运营资金 */
    case 60:
      return i18n.tc('common.common76') /* 房屋装修 */
    case 70:
      return i18n.tc('common.common77') /* 结婚 */
    case 80:
      return i18n.tc('common.common78') /* 旅游 */
    case 1000:
      return i18n.tc('common.common79') /* 其它 */
    default:
      return ''
  }
}

/**
 *  职位类型
 * @param {Number} positionType
 */
export function positionTypeFilter(data) {
  switch (data * 1) {
    case 10:
      return i18n.tc('common.common80') /* 普通职员 */
    case 20:
      return i18n.tc('common.common81') /* 行政人员 */
    case 30:
      return i18n.tc('common.common82') /* 主管 */
    case 40:
      return i18n.tc('common.common83') /* 经理/总监 */
    case 50:
      return i18n.tc('common.common84') /* 会计 */
    case 60:
      return i18n.tc('common.common85') /* 教师 */
    case 70:
      return i18n.tc('common.common86') /* 学生 */
    case 80:
      return i18n.tc('common.common87') /* 医生 */
    case 90:
      return i18n.tc('common.common88') /* IT */
    case 100:
      return i18n.tc('common.common89') /* 律师 */
    case 110:
      return i18n.tc('common.common90') /* 自由职业 */
    case 1000:
      return i18n.tc('common.common79') /* 其它 */
    default:
      return ''
  }
}

/**
 *  职业类型
 * @param {Number} professionType
 */
export function professionTypeFilter(data) {
  switch (data * 1) {
    case 0:
      return i18n.tc('common.common91') /* 无工作 */
    case 10:
      return i18n.tc('common.common92') /* 雇佣 */
    case 20:
      return i18n.tc('common.common93') /* 雇主 */
    case 30:
      return i18n.tc('common.common90') /* 自由职业 */
    case 40:
      return i18n.tc('common.common114') /* 专业人员 */
    case 50:
      return i18n.tc('common.common115') /* 公务员 */
    case 60:
      return i18n.tc('common.common86') /* 学生 */
    case 1000:
      return i18n.tc('common.common79') /* 其它 */
    default:
      return ''
  }
}

/**
 *  宗教信仰
 * @param {Number} religionType
 */
export function religionTypeFilter(data) {
  switch (data * 1) {
    case 0:
      return i18n.tc('common.common94') /* 无 */
    case 10:
      return i18n.tc('common.common95') /* 佛教 */
    case 20:
      return i18n.tc('common.common96') /* 天主教 */
    case 30:
      return i18n.tc('common.common97') /* 基督教 */
    case 40:
      return i18n.tc('common.common98') /* 伊斯兰教 */
    case 50:
      return i18n.tc('common.common99') /* 道教 */
    case 60:
      return i18n.tc('common.common100') /* 印度教 */
    case 70:
      return i18n.tc('common.common112') /* 穆斯林 */
    case 80:
      return i18n.tc('common.common113') /* 儒学 */
    case 1000:
      return i18n.tc('common.common79') /* 其它 */
    default:
      return ''
  }
}

/**
 *  居住方式
 * @param {Number} residenceType
 */
export function residenceTypeFilter(data) {
  switch (data * 1) {
    case 10:
      return i18n.tc('common.common101') /* 租房 */
    case 20:
      return i18n.tc('common.common102') /* 自有住房 */
    case 30:
      return i18n.tc('common.common103') /* 和亲人共住 */
    case 40:
      return i18n.tc('common.common104') /* 单位提供 */
    case 100:
      return i18n.tc('common.common79') /* 其他 */
    default:
      return ''
  }
}

/**
 * 催收状态
 * @param {Number} status
 */
export function statusFilter(data) {
  switch (data * 1) {
    case 1:
      return i18n.tc('common.common105') /* 催收状态 */
    default:
      return ''
  }
}

/**
 * 还款状态
 * @param {Number} repayStatus
 */
export function repayStatusFilter(data) {
  switch (data * 1) {
    case 0:
      return i18n.tc('collect.collect223') /* 等待还款 */
    case 10:
      return i18n.tc('collect.collect224') /* 还款成功 */
    case 20:
      return i18n.tc('collect.collect225') /* 还款失败 */
    default:
      return ''
  }
}

/**
 * 还款途径
 * @param {Number} repayWay
 */
export function repayWayFilter(data) {
  switch (data * 1) {
    case 10:
      return i18n.tc('collect.collect228') /* 主动 */
    case 20:
      return i18n.tc('collect.collect229') /* 被动 */
    case 30:
      return i18n.tc('collect.collect230') /* 线下 */
    default:
      return ''
  }
}

/**
 * 支付公司
 * @param {Number} payCompany
 */
export function payCompanyFilter(data) {
  switch (data * 1) {
    case 10:
      return 'razpay'
    case 20:
      return 'bluepay'
    case 30:
      return 'moneyPay'
    default:
      return ''
  }
}

/**
 * 变更类型
 * @param {Number} changeType
 */
export function changeTypeFilter(data) {
  switch (data * 1) {
    case 10:
      return i18n.tc('collector.collector39') /* 系统分案 */
    case 20:
      return i18n.tc('collector.collector40') /* 手工调案 */
    case 30:
      return i18n.tc('collect.collect83') /* 提交减免 */
    case 40:
      return i18n.tc('collector.collector41') /* 减免审核通过 */
    case 50:
      return i18n.tc('collector.collector42') /* 减免审核驳回 */
    case 60:
      return i18n.tc('collector.collector43') /* 催收（新增催记） */
    case 70:
      return i18n.tc('collector.collector44') /* 入账 */
    default:
      return ''
  }
}

/**
 * 模型分对比方法
 * @param {Number} compareType
 */
export function compareTypeFilter(data) {
  switch (data * 1) {
    case 10:
      return i18n.tc('risk.risk2') /* 大于上限值直过，小于下限值直拒。介于中间值人审 */
    case 20:
      return i18n.tc('risk.risk3') /* 小于下限值直过，大于上限值直拒。介于中间值人审 */
    default:
      return ''
  }
}

/**
 * 模型分对比方法
 * @param {Number} principalAmount
 */
export function principalAmountFilter(data) {
  if (data === 0) return 0
  data = data || ''
  data = data.toString().split('.') // 分隔小数点
  var arr = data[0].split('').reverse() // 转换成字符数组并且倒序排列
  var res = []
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(',') // 添加分隔符
    }
    res.push(arr[i])
  }
  res.reverse() // 再次倒序成为正确的顺序
  if (data[1]) { // 如果有小数的话添加小数部分
    res = res.join('').concat('.' + data[1])
  } else {
    res = res.join('')
  }
  return res
}
