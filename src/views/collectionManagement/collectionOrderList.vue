<template>
  <div class="main-box">
    <!-- 催收管理 -- 催收中订单 -->
    <el-form ref="listQueryForm" :model="listQuery" size="mini" label-width="auto" inline>
      <el-form-item prop="userName" :label="$t('collect.collect3') + ':'"> <!-- 用户名 -->
        <el-input v-model="listQuery.userName" :placeholder="$t('login.iptUserName')" style="width: 178px;" /> <!-- 请输入用户名 -->
      </el-form-item>
      <el-form-item prop="mobile" :label="$t('common.common28') + ':'"> <!-- 手机号 -->
        <el-input v-model="listQuery.mobile" :placeholder="$t('common.common29')" style="width: 178px;" /> <!-- 请输入手机号 -->
      </el-form-item>
      <el-form-item prop="borrowId" :label="$t('collect.collect2') + ':'"> <!-- 订单编号 -->
        <el-input v-model="listQuery.borrowId" :placeholder="$t('collect.collect74')" style="width: 178px;" /> <!-- 请输入订单编号 -->
      </el-form-item>
      <el-form-item prop="flag" :label="$t('collect.collect15') + ': '"> <!-- 标签 -->
        <el-select
          v-model="listQuery.flag"
          filterable
          clearable
          style="width: 100%;"
          :placeholder="$t('collect.collect68')"
        > <!-- 请选择标签 -->
          <el-option
            v-for="item in flagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="overDueDays" :label="$t('collect.collect8') + ':'"> <!-- 逾期天数 -->
        <el-input v-model="listQuery.overDueDays" :placeholder="$t('risk.risk51')" style="width: 178px;" /> <!-- 请输入逾期天数 -->
      </el-form-item>
      <el-form-item prop="repayWish" :label="$t('collect.collect65') + ': '"> <!-- 还款意愿 -->
        <el-select
          v-model="listQuery.repayWish"
          filterable
          clearable
          style="width: 100%;"
          :placeholder="$t('collect.collect73')"
        > <!-- 请选择还款意愿 -->
          <el-option
            v-for="item in repayWishOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="permission.isAdmin" :label="$t('sysManage.sysManage57') + ': '"> <!-- 公司名 -->
        <el-select
          v-model="listQuery.collectionCompanyId"
          filterable
          clearable
          :placeholder="$t('sysManage.sysManage55')"
          @change="companyChange"
        > <!-- 请选择公司名 -->
          <el-option
            v-for="item in companyNameCollectOptions"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="permission.isAdmin || permission.isCollectionLead" :label="$t('collector.collector11') + ': '"> <!-- 催收组 -->
        <el-select
          v-model="listQuery.collectionGroupId"
          filterable
          clearable
          :placeholder="$t('collector.collector35')"
          @change="groupChange"
        > <!-- 请选择催收组 -->
          <el-option
            v-for="item in groupOptions"
            :key="item.id"
            :label="item.groupName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="permission.isAdmin || permission.isCollectionLead || permission.isGroupLead"
        prop="id"
        :label="$t('collect.collect16') + ': '"
      > <!-- 人员 -->
        <el-select
          v-model="listQuery.id"
          filterable
          clearable
          :placeholder="$t('collect.collect17')"
        > <!-- 请选择人员 -->
          <el-option
            v-for="item in teamMembersOptions"
            :key="item.id"
            :label="item.loginName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('sysManage.sysManage102') + ':'">   <!-- 还款时间 -->
        <el-date-picker
          v-model="listQuery.lastRepayTime"
          type="daterange"
          range-separator="-"
          value-format="timestamp"
          :start-placeholder="$t('sysManage.sysManage8')"
          :end-placeholder="$t('sysManage.sysManage9')"
          :editable="false"
        />  <!-- 开始日期  结束日期 -->
      </el-form-item>
      <el-form-item :label="$t('loanMarket.loanMarket32') + ':'">   <!-- 最近一次跟进时间 -->
        <el-date-picker
          v-model="listQuery.collectionTime"
          type="daterange"
          range-separator="-"
          value-format="timestamp"
          :start-placeholder="$t('sysManage.sysManage8')"
          :end-placeholder="$t('sysManage.sysManage9')"
          :editable="false"
        />  <!-- 开始日期  结束日期 -->
      </el-form-item>
      <el-form-item :label="$t('collect.collect14') + ':'">   <!-- 应还款时间 -->
        <el-date-picker
          v-model="listQuery.repayTime"
          type="daterange"
          range-separator="-"
          value-format="timestamp"
          :start-placeholder="$t('sysManage.sysManage8')"
          :end-placeholder="$t('sysManage.sysManage9')"
          :editable="false"
        />  <!-- 开始日期  结束日期 -->
      </el-form-item>

      <el-form-item label=" ">
        <el-button :loading="btnLoading" type="primary" @click="getTableList(true)">{{ $t('common.common30') }}</el-button> <!-- 查询 -->
        <el-button :loading="btnLoading" @click="resetList">{{ $t('common.common31') }}</el-button> <!-- 重置 -->
      </el-form-item>
    </el-form>

    <el-table
      ref="table"
      v-loading="listLoading"
      :data="tableList"
      :max-height="$store.state.settings.tableHeight"
      border
      fit
      stripe
      highlight-current-row
      header-cell-class-name="table-header-cell"
      style="width: 100%; margin-top: 10px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column :label="$t('sysManage.sysManage23')" align="center" min-width="140px"> <!-- 操作 -->
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" @click="viewDetails(row)">
            {{ $t('common.common32') }} <!-- 查看详情 -->
          </el-button>
          <!-- <el-button size="mini" type="text" @click="openRecord(row)"> -->
          <el-button v-if="!permission.isAdmin && row.principal !== 0" size="mini" type="text" @click="openRecord(row)">
            {{ $t('collect.collect42') }} <!-- 新增催记 -->
          </el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('collect.collect2')" prop="borrowId" align="center" min-width="70px" /> <!-- 订单编号 -->
      <el-table-column :label="$t('collect.collect3')" prop="customerName" align="center" min-width="120px" /> <!-- 用户名 -->
      <el-table-column :label="$t('common.common28')" prop="customerMobile" align="center" min-width="90px" /> <!-- 手机号 -->
      <el-table-column :label="$t('collect.collect7')" prop="principalAmount" align="center" min-width="80px" /> <!-- 借款金额 -->
      <el-table-column :label="$t('collect.collect8')" sortable prop="overDueDays" align="center" min-width="100px" /> <!-- 逾期天数 -->
      <el-table-column :label="$t('collect.collect95')" prop="principal" align="center" min-width="80px" /> <!-- 待还金额 -->
      <el-table-column :label="$t('borrow.borrow3')" prop="periodStatus" align="center" min-width="80px"> <!-- 订单状态 -->
        <template slot-scope="{ row }">
          {{ row.periodStatus | borrowStatusFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('collect.collect15')" prop="flag" align="center" min-width="90px"> <!-- 标签 -->
        <template slot-scope="{ row }">
          {{ row.flag | flagFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('collect.collect65')" prop="lastRepayWish" align="center" min-width="80px"> <!-- 还款意愿 -->
        <template slot-scope="{ row }">
          {{ row.lastRepayWish | repayWishFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('collect.collect14')" prop="repayStart" align="center" min-width="150px" /> <!-- 应还款时间 -->
      <el-table-column :label="$t('collect.collect13')" prop="loginName" align="center" min-width="90px" /> <!-- 催收员 -->
      <el-table-column :label="$t('loanMarket.loanMarket32')" prop="lastCollectionTime" align="center" min-width="150px"> <!-- 最近一次跟进时间 -->
        <template slot-scope="{ row }">
          {{ row.lastCollectionTime | ArrayToDateFormat }}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      class="pagination"
      :total="total"
      :page-sizes="[10, 50, 100, 300, 500, 1000]"
      :page.sync="listQuery.page"
      :size.sync="listQuery.size"
      @pagination="getTableList"
    />

    <add-push-down v-if="openRecordDrawer" :is-remind="false" :current-row="recordRow" @closeAdd="closeRecord" />
  </div>
</template>

<script>
import { getCompanyGroup, getGroupCollectionUser } from '@/api/collectionAgentManagement'
import { getInCollectionOrder } from '@/api/collectionManagement'
import Pagination from '@/components/Pagination' // 基于 el-pagination 的二次包
import { mapState } from 'vuex'
import addPushDown from './components/userDetails/addPushDown'

export default {
  name: 'CollectionOrderList',
  components: {
    Pagination,
    addPushDown
  },
  data() {
    return {
      scrollTop: null,
      // 搜索
      btnLoading: false,
      groupOptions: [],
      teamMembersOptions: [],
      // 列表
      listLoading: false,
      tableList: [],
      listQuery: {
        userName: '',
        mobile: '',
        collectionCompanyId: '',
        collectionGroupId: '',
        id: '',
        page: 1,
        size: 100
      },
      total: 0,
      // 是否展示批量派单
      batchTeamId: null,
      isBatchBtn: false,

      // 新增催记
      openRecordDrawer: false,
      recordRow: {}
    }
  },

  computed: {
    ...mapState({
      companyNameCollectOptions: state => state.options.companyNameCollectOptions,
      permission: state => state.permission.permission,
      ids: state => state.permission.ids,
      flagOptions: state => state.options.flagOptions
    }),
    repayWishOptions() {
      return [
        { value: 10, label: this.$t('financial.financial23') }, /* 有能力有意愿还款 */
        { value: 20, label: this.$t('financial.financial24') }, /* 有能力无意愿还款 */
        { value: 30, label: this.$t('financial.financial25') }, /* 无能力有意愿还款 */
        { value: 40, label: this.$t('financial.financial26') }, /* 无意愿无能力还款 */
        { value: 50, label: this.$t('financial.financial22') } /* 其他 */
      ]
    }
  },

  mounted() {
    if (this.permission.isCollectionLead) {
      this.companyChange(this.ids.collectionCompanyId)
    } else if (this.permission.isGroupLead) {
      this.companyChange(this.ids.collectionCompanyId)
      this.groupChange(this.ids.collectionGroupId)
    }
    this.getTableList()
    // 监听滚动条的位置
    this.$refs.table.bodyWrapper.addEventListener('scroll', (res) => {
      const height = res.target
      this.scrollTop = height.scrollTop
    }, false)
  },

  activated() {
    this.saveScroll()
  },
  beforeDestroy() {
    this.$refs.table.bodyWrapper.removeEventListener('scroll', (res) => {
      const height = res.target
      this.scrollTop = height.scrollTop
    }, false)
  },

  methods: {
    // 这里如果直接赋值给this.$el.querySelector('.el-table__body-wrapper').scrollTop会失效，需要加上setTimeout才行。
    saveScroll() {
      this.$nextTick(() => {
        setTimeout(() => {
          var scrollTop = this.$el.querySelector('.el-table__body-wrapper')
          scrollTop.scrollTop = this.scrollTop
        }, 13)
      })
    },

    // 修改公司名获取对应的组
    async companyChange(item) {
      this.teamMembersOptions = []
      this.listQuery.collectionGroupId = ''
      this.listQuery.id = ''
      const res = await getCompanyGroup({ collectionCompanyId: item })
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      this.groupOptions = res.data || []
    },
    async groupChange(item) {
      this.listQuery.id = ''
      const res = await getGroupCollectionUser({ groupId: item })
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      this.teamMembersOptions = res.data || []
    },
    // 处理查询条件
    handleListQuery() {
      const tmp = {}
      for (const k in this.listQuery) {
        if (this.listQuery[k]) {
          if (k === 'lastRepayTime' && this.listQuery[k].length > 0) {
            tmp.lastRepayStartTime = this.listQuery[k][0]
            tmp.lastRepayEndTime = this.listQuery[k][1] + 86399999
          } else if (k === 'collectionTime' && this.listQuery[k].length > 0) {
            tmp.collectionStartTime = this.listQuery[k][0]
            tmp.collectionEndTime = this.listQuery[k][1] + 86399999
          } else if (k === 'repayTime' && this.listQuery[k].length > 0) {
            tmp.repayStartTime = this.listQuery[k][0]
            tmp.repayEndTime = this.listQuery[k][1] + 86399999
          } else {
            tmp[k] = this.listQuery[k]
          }
        }
      }
      tmp.periodStatus = [90]
      tmp.collectionType = 10

      return tmp
    },
    // 查询获取订单信息
    async getTableList(isSearch) {
      if (isSearch === true) this.listQuery.page = 1

      // 当页码改变的时候滚动条重新到顶部
      this.scrollTop = 0
      this.saveScroll()
      this.listLoading = true
      this.btnLoading = true
      const tmp = this.handleListQuery()

      const res = await getInCollectionOrder(tmp)
      if (this.listQuery.collectionGroupId) {
        this.batchTeamId = this.listQuery.collectionGroupId
        this.isBatchBtn = true
      } else {
        this.isBatchBtn = false
      }
      this.listLoading = false
      this.btnLoading = false

      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      this.tableList = res.data.list
      this.total = res.data.total

      if (this.listQuery.page > 1 && res.data.total !== 0 && res.data.list.length <= 0) {
        this.listQuery.page = 1
        this.getTableList()
      }
    },
    // 重置
    resetList() {
      this.listQuery = {
        userName: '',
        mobile: '',
        collectionCompanyId: '',
        collectionGroupId: '',
        id: '',
        page: 1,
        size: 100
      }
      this.getTableList()
    },

    // 选择行
    handleSelectionChange(val) {
      this.currentRow = []
      val.forEach(item => {
        if (item.principal !== 0) {
          this.currentRow.push(item)
        }
      })
    },
    // tabel组件复选框控制禁止选择
    checkboxInit(row) {
      if (row.principal === 0) {
        return 0
      } else {
        return 1
      }
    },
    // 增加催记
    openRecord(row) {
      this.recordRow = {
        userId: row.userId,
        orderId: row.orderId,
        periodId: row.periodId,
        borrowId: row.borrowId,
        collectionOrderId: row.orderId,
        customerName: row.customerName,
        customerMobile: row.customerMobile,
        overDueDays: row.overDueDays
      }
      this.openRecordDrawer = true
    },
    closeRecord(item) {
      this.openRecordDrawer = false
      if (item) {
        this.getTableList()
      }
    },

    // 查看详情
    viewDetails(row) {
      const isUserDetails = this.sessionData('get', 'isUserDetails') || {}
      isUserDetails[row.userId] = '1'
      this.sessionData('set', 'isUserDetails', isUserDetails)

      this.$router.push({
        name: 'UserDetails',
        params: {
          id: row.borrowId,
          remainOverdue: row.remainOverdue.toString(),
          orderId: row.orderId,
          periodId: row.periodId,
          userId: row.userId,
          borrowId: row.borrowId,
          periodIdRes: row.periodIdRes,
          userIdRes: row.userIdRes,
          borrowIdRes: row.borrowIdRes,
          principal: row.principal,
          overDueDays: row.overDueDays
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
