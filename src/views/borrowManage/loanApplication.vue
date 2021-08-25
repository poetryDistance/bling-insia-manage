<template>
  <div class="main-box">
    <!-- 借款管理 -- 贷款订单表 -->
    <el-form ref="listQueryForm" :model="listQuery" size="mini" label-width="auto" inline>
      <el-form-item prop="userName" :label="$t('collect.collect3') + ':'"> <!-- 用户名 -->
        <el-input v-model="listQuery.userName" :placeholder="$t('login.iptUserName')" style="width: 178px;" /> <!-- 请输入用户名 -->
      </el-form-item>
      <el-form-item prop="customerMobile" :label="$t('common.common28') + ':'"> <!-- 手机号 -->
        <el-input v-model="listQuery.customerMobile" :placeholder="$t('common.common29')" style="width: 178px;" /> <!-- 请输入手机号 -->
      </el-form-item>
      <el-form-item prop="aadhaarNo" :label="$t('borrow.borrow1') + ':'"> <!-- 身份证号 -->
        <el-input v-model="listQuery.aadhaarNo" :placeholder="$t('borrow.borrow2')" style="width: 178px;" /> <!-- 请输入身份证号 -->
      </el-form-item>
      <el-form-item prop="borrowUid" :label="$t('financial.financial8') + ':'"> <!-- Uid -->
        <el-input v-model="listQuery.borrowUid" :placeholder="$t('financial.financial10')" style="width: 178px;" /> <!-- 请输入Uid -->
      </el-form-item>
      <el-form-item :label="$t('borrow.borrow3') + ': '"> <!-- 订单状态 -->
        <el-select
          v-model="listQuery.borrowStatus"
          filterable
          clearable
          :placeholder="$t('borrow.borrow4')"
        > <!-- 请选择订单状态 -->
          <el-option
            v-for="item in borrowStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('financial.financial33') + ': '"> <!-- 机审结果 -->
        <el-select
          v-model="listQuery.firstReviewStatus"
          filterable
          clearable
          :placeholder="$t('borrow.borrow4')"
        > <!-- 请选择订单状态 -->
          <el-option
            v-for="item in firstReviewStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('borrow.borrow5') + ': '"> <!-- 贷款类型 -->
        <el-select
          v-model="listQuery.loanType"
          filterable
          clearable
          :placeholder="$t('borrow.borrow6')"
        > <!-- 请选择贷款类型 -->
          <el-option
            v-for="item in loanTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="modelResultType" :label="$t('borrow.borrow10') + ': '"> <!-- 风控结果 -->
        <el-select
          v-model="listQuery.modelResultType"
          filterable
          clearable
          :placeholder="$t('borrow.borrow11')"
        > <!-- 请选择风控结果 -->
          <el-option
            v-for="item in modelResultTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="modelType" :label="$t('sysManage.sysManage92') + ': '"> <!-- 模型类型 -->
        <el-select
          v-model="listQuery.modelType"
          filterable
          clearable
          :placeholder="$t('borrow.borrow12')"
        > <!-- 请选择模型类型 -->
          <el-option
            v-for="item in modelTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label=" ">
        <el-button :loading="btnLoading" type="primary" @click="getTableList">{{ $t('common.common30') }}</el-button> <!-- 查询 -->
        <el-button :loading="btnLoading" @click="resetList">{{ $t('common.common31') }}</el-button> <!-- 重置 -->
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="tableList"
      :max-height="$store.state.settings.tableHeight"
      border
      fit
      stripe
      highlight-current-row
      :row-class-name="setClassName"
      header-cell-class-name="table-header-cell"
      style="width: 100%; margin-top: 10px;"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="expand" :label="$t('userManage.userManage17')"> <!-- 分期 -->
        <template slot-scope="{ row }">
          <periods-info
            :common-data="{borrowId: row.id, borrowIdRes: row.idRes}"
            :is-loan="true"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.sysManage23')" align="center" min-width="150px"> <!-- 操作 -->
        <template slot-scope="{ row }">
          <el-dropdown split-button type="primary" trigger="click" @command="handleCommand(row, $event)">
            <span @click="viewDetails(row)">{{ $t('common.common32') }}</span> <!-- 查看详情 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">
                {{ $t('borrow.borrow41') }} <!-- 费用变更 -->
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.sysManage13')" prop="id" align="center" min-width="66px" /> <!-- 编号 -->
      <el-table-column :label="$t('financial.financial8')" prop="borrowUid" align="center" min-width="100px" /> <!-- Uid -->
      <el-table-column :label="$t('borrow.borrow14')" prop="userName" align="center" min-width="120px" /> <!-- 客户名 -->
      <el-table-column :label="$t('common.common28')" prop="customerMobile" align="center" min-width="106px" /> <!-- 手机号 -->
      <el-table-column :label="$t('borrow.borrow1')" prop="aadhaarNo" align="center" min-width="110" /> <!-- 身份证号 -->
      <el-table-column :label="$t('collect.collect95')" prop="principal" align="center" min-width="80px" /> <!-- 待还金额 -->
      <el-table-column :label="$t('borrow.borrow3')" prop="borrowStatus" align="center" min-width="90px"> <!-- 订单状态 -->
        <template slot-scope="{ row }">
          <div v-if="row.firstReviewStatus === 20">{{ $t('financial.financial34') }}</div> <!-- 机审拒绝 -->
          <div
            v-else-if="row.borrowStatus === 1020 && row.modelResultType === 11"
          >{{ $t('financial.financial35') }}</div> <!-- 人审拒绝 -->
          <div v-else>{{ row.borrowStatus | borrowStatusFilter }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('financial.financial33')" prop="firstReviewStatus" align="center" min-width="90px"> <!-- 机审结果 -->
        <template slot-scope="{ row }">
          {{ row.firstReviewStatus | reviewingStatusFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('borrow.borrow5')" prop="loanType" align="center" min-width="70px"> <!-- 贷款类型 -->
        <template slot-scope="{ row }">
          {{ row.loanType | loanTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('borrow.borrow19')" prop="modelResultScore" align="center" min-width="86px" /> <!-- 模型分 -->
      <el-table-column :label="$t('borrow.borrow10')" prop="modelResultType" align="center" min-width="70px"> <!-- 风控结果 -->
        <template slot-scope="{ row }">
          {{ row.modelResultType | modelResultTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.sysManage92')" prop="modelType" align="center" min-width="80px"> <!-- 模型类型 -->
        <template slot-scope="{ row }">
          {{ row.modelType | modelTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('borrow.borrow20')" prop="old" align="center" min-width="80px"> <!-- 客户类型 -->
        <template slot-scope="{ row }">
          <el-tag v-if="row.old === true" size="small" type="success">{{ $t('borrow.borrow21') }}</el-tag> <!-- 老客 -->
          <el-tag v-else-if="row.old === false" size="small" type="danger">{{ $t('borrow.borrow22') }}</el-tag> <!-- 新客 -->
          <div v-else />
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.sysManage4')" prop="createTime" align="center" min-width="150px"> <!-- 创建时间 -->
        <template slot-scope="{ row }">
          {{ row.createTime | ArrayToDateFormat }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('borrow.borrow13')" prop="blackCustomer" align="center" min-width="70px"> <!-- 黑名单 -->
        <template slot-scope="{ row }">
          {{ row.blackCustomer | blackCustomerFilter }}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      class="pagination"
      :total="total"
      :page.sync="listQuery.page"
      :size.sync="listQuery.size"
      @pagination="getTableList"
    />

    <bill-change-drawer v-if="openBillDrawer" :current-row="currentRow" :type="1" @close="close" />
  </div>
</template>

<script>
import { getBorrowInfo } from '@/api/borrowManage'
import Pagination from '@/components/Pagination' // 基于 el-pagination 的二次包
import periodsInfo from '@/views/collectionManagement/components/userDetails/periodsInfo'
import billChangeDrawer from './components/billChangeDrawer'
import { mapState } from 'vuex'

export default {
  name: 'LoanApplication',
  components: {
    Pagination,
    periodsInfo,
    billChangeDrawer
  },
  data() {
    return {
      // 搜索
      btnLoading: false,
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
        size: 10
      },
      total: 0,

      // 费用变更弹框
      openBillDrawer: false,
      currentRow: {}
    }
  },

  computed: {
    ...mapState({
      loanTypeOptions: state => state.options.loanTypeOptions,
      modelResultTypeOptions: state => state.options.modelResultTypeOptions,
      modelTypeOptions: state => state.options.modelTypeOptions,
      borrowStatusOptions: state => state.options.borrowStatusOptions
    }),
    firstReviewStatusOptions() {
      return [
        { value: 10, label: this.$t('borrow.borrow7') }, /* 通过 */
        { value: 20, label: this.$t('collect.collect98') } /* 拒绝 */
      ]
    }
  },

  mounted() {
    this.getTableList()
  },

  methods: {
    setClassName({ row }) {
      return row.isDown ? '' : 'expand'
    },

    // 下拉菜单
    handleCommand(row, command) {
      switch (command) {
        // 费用变更
        case 'a':
          this.openBillChange(row)
          break
      }
    },

    // 处理查询条件
    handleListQuery() {
      const tmp = {}
      for (const k in this.listQuery) {
        if (this.listQuery[k] && k !== 'borrowStatus') {
          tmp[k] = this.listQuery[k]
        } else if (k === 'borrowStatus' && this.listQuery[k]) {
          tmp.status = [this.listQuery[k]]
        }
      }
      if (tmp.borrowStatus === undefined) {
        // tmp.status = [70, 80, 90, 1000, 1010, 1020]
      }
      return tmp
    },
    // 查询获取订单信息
    async getTableList() {
      this.listLoading = true
      this.btnLoading = true
      const tmp = this.handleListQuery()

      const res = await getBorrowInfo(tmp)
      this.listLoading = false
      this.btnLoading = false

      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      this.tableList = res.data.list
      this.total = res.data.total
    },
    // 重置
    resetList() {
      this.listQuery = {
        page: 1,
        size: 10
      }
      this.getTableList()
    },

    // 费用变更
    openBillChange(row) {
      this.openBillDrawer = true
      this.currentRow = row
    },
    close() {
      this.openBillDrawer = false
    },

    // 查看详情
    viewDetails(row) {
      const isUserDetails = this.sessionData('get', 'isUserDetails') || {}
      isUserDetails[row.userId] = '6'
      this.sessionData('set', 'isUserDetails', isUserDetails)

      this.$router.push({
        name: 'UserDetails',
        params: {
          id: row.userId,
          userId: row.userId,
          borrowId: row.id,
          periodsId: row.periodsId,
          userIdRes: row.userIdRes,
          borrowIdRes: row.idRes,
          periodsIdRes: row.periodsIdRes
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .expand .el-table__expand-column .cell {
  display: none;
}
</style>
