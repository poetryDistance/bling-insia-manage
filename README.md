运营管理
借款日报
运营日报
应用市场报表
API转换

放款管理
待审核订单
拒绝放款订单
待放款订单
放款记录
放款失败订单

还款管理
代还款订单
还款记录

财务管理
人工入账
人工入账流水
还款流水
待放款订单

借款管理
借款申请
历史借款订单

催收管理
催收订单列表
我的催收订单
线下还款订单
减免订单
我的减免订单
催收业绩

催收员管理
分组设置
催收员列表
自动派单

风控管理
风控配置

用户管理
用户认证信息
用户查询
黑名单列表

系统管理
账号管理
角色管理
系统设置
产品管理
催收公司管理

myDesk: '我的工作台',
  profileData: '数据概况',

theDataCenter: '运营管理',
  borrowingDaily: '借款日报',
  dailyOperations: '运营日报',
  applicationMarketReport: '应用市场报表',
  postLoanPerformance: 'API转换',

loanManagement: '放款管理',
  orderToBeReviewed: '待审核订单',
  rejectLoanOrder: '拒绝放款订单',
  pendingOrder: '待放款订单',
  recordLending: '放款记录',
  loanFailureOrder: '放款失败订单',

paymentManagement: '还款管理',
  repaymentOrder: '还款分期表',
  repaymentHistory: '还款记录',

collectionManagement: '催收管理',
  collectionOrderList: '催收订单列表',
  myOrderCollection: '我的催收订单',
  offlineRepaymentOrder: '线下还款订单',
  breaksTheOrder: '减免订单',
  myCancellationOrder: '我的减免订单',
  collectionPerformance: '催收业绩',

collectionAgentManagement: '催收员管理',
  groupSetUp: '分组设置',
  listOfCollectors: '催收员列表',
  automaticallySendASingle: '自动派单',

borrowManage: '借款管理',
  loanApplication: '贷款订单表',
  historicalLoanOrder: '历史借款订单',

riskControlManagement: '风控管理',
  riskControlConfiguration: '风控产品配置',

userManagement: '用户管理',
  userAuthenticationInformation: '用户认证信息',
  userQuery: '用户查询',
  blacklist: '黑名单列表',

systemSettings: '系统设置',
  accountManagement: '账号管理',
  roleManagement: '角色管理',
  productManagement: '产品管理',
  collectionsCompany: '催收公司管理',

financialManage: '财务管理'
  artificialBooked: '人工入账'
  artificialBookedRunning: '人工入账流水'


isUserDetails
  1. 催收订单列表
  2. 贷款订单表
  3. 还款分期表
  4. 用户查询
  5. 待人审订单



@ApiModelProperty("风控分数")
private BigDecimal score;
@ApiModelProperty("使用的模型类型（10：epoch；20：zelda；30：内部；40：基础,50:cashcash）")
private Integer modelType;
@ApiModelProperty("风控结果类型（10：通过；20：永久拒绝；30：有限拒绝；40：风控获取异常（如果是有限拒绝，要写入下次准入期））")
private Integer modelResult;

