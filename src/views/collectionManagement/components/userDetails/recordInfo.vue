<template>
  <div>
    <!-- 催记 -->
    <el-button
      v-if="isUserDetails === '1' && !permission.isAdmin && recordData.principal"
      type="primary"
      size="small"
      @click="openAdd"
    >{{ $t('collect.collect42') }}</el-button> <!-- 新增催记 -->
    <el-button
      v-if="isUserDetails === '1' && !permission.isAdmin && isDiscount && recordData.principal"
      type="primary"
      size="small"
      @click="openAddDiscount"
    >{{ $t('collect.collect83') }}</el-button> <!-- 提交减免 -->
    <el-table
      :data="recordList"
      :max-height="$store.state.settings.tableHeight"
      border
      fit
      stripe
      highlight-current-row
      header-cell-class-name="table-header-cell"
      style="width: 100%; margin-top: 10px;"
    >
      <el-table-column :label="$t('collect.collect2')" prop="collectionOrderId" align="center" min-width="80px" /> <!-- 订单编号 -->
      <el-table-column :label="$t('collect.collect49')" prop="relationName" align="center" min-width="90px" /> <!-- 联系人姓名 -->
      <el-table-column :label="$t('collect.collect51')" prop="relationMobile" align="center" min-width="90px" /> <!-- 联系人电话 -->
      <el-table-column :label="$t('collect.collect53')" prop="relation" align="center" min-width="130px"> <!-- 联系人与债主的关系 -->
        <template slot-scope="{ row }">
          {{ row.relation | relationFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('collect.collect13')" prop="collectionUserName" align="center" min-width="80px" /> <!-- 催收员 -->
      <el-table-column :label="$t('collect.collect45')" prop="commitmentAmount" align="center" min-width="100px" /> <!-- 承诺还款金额 -->
      <el-table-column :label="$t('collect.collect47')" prop="commitmentTime" align="center" min-width="150px" /> <!-- 承诺还款时间 -->
      <el-table-column :label="$t('collect.collect103')" prop="entryTime" align="center" min-width="150px"> <!-- 催收时间 -->
        <template slot-scope="{ row }">
          {{ row.entryTime | ArrayToDateFormat }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('collect.collect65')" prop="repayWish" align="center" min-width="100px"> <!-- 还款意愿 -->
        <template slot-scope="{ row }">
          {{ row.repayWish | repayWishFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('collect.collect63')" prop="remindTime" align="center" min-width="150px"> <!-- 下次跟进时间 -->
        <template slot-scope="{ row }">
          {{ row.remindTime | ArrayToDateFormat }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('collect.collect67')" prop="type" align="center" min-width="70px"> <!-- 类型 -->
        <template slot-scope="{ row }">
          {{ row.type | typeFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('collect.collect208')" prop="content" align="center" min-width="80px"> <!-- 催收内容 -->
        <template slot-scope="{ row }">
          <el-popover
            v-if="row.content"
            placement="left-start"
            :title="$t('common.common12') + ':'"
            width="100"
            trigger="click"
            :content="row.content"
            :visible-arrow="false"
          >
            <el-button slot="reference" type="text">{{ $t('common.common20') }}</el-button> <!-- 查看 -->
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="recordTotal>0"
      class="pagination"
      :total="recordTotal"
      :page.sync="recordQuery.page"
      :size.sync="recordQuery.size"
      @pagination="getRecordInfo"
    />

    <add-push-down v-if="openAddDrawer" :is-remind="isRemind" :current-row="currentRow" @closeAdd="closeAdd" />
    <discount-drawer v-if="openDiscountDrawer" :current-row="discountRow" @closeDiscount="closeDiscount" />
  </div>
</template>

<script>
import { getRecordInfo } from '@/api/collectionManagement'
import Pagination from '@/components/Pagination' // 基于 el-pagination 的二次包
import addPushDown from '../userDetails/addPushDown'
import discountDrawer from '../userDetails/discountDrawer'
import { mapState } from 'vuex'

export default {
  name: 'RecordInfo',
  components: {
    Pagination,
    addPushDown,
    discountDrawer
  },
  props: {
    recordData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    customers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isRemind: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recordQuery: {
        page: 1,
        size: 10
      },
      recordTotal: 0,
      recordList: [],

      // 新增催记
      openAddDrawer: false,
      currentRow: {},

      // 提交减免
      isDiscount: false,
      openDiscountDrawer: false,
      discountRow: {},

      isUserDetails: ''
    }
  },
  computed: {
    ...mapState({
      permission: state => state.permission.permission
    })
  },
  mounted() {
    setTimeout(() => {
      if ('remainOverdue' in this.recordData) {
        this.isDiscount = true
      } else {
        this.isDiscount = false
      }
      const obj = this.sessionData('get', 'isUserDetails') || {}
      this.isUserDetails = obj[this.recordData.userId]
      this.getRecordInfo()
    }, 100)
  },
  methods: {
    // 获取催记
    async getRecordInfo() {
      if (this.isUserDetails === '4') {
        this.recordQuery.userIdRes = this.recordData.userIdRes
      } else if (this.isUserDetails === '2' || this.isUserDetails === '5' || this.isUserDetails === '6') {
        this.recordQuery.borrowIdRes = this.recordData.borrowIdRes
      } else {
        this.recordQuery.borrowPeriodIdRes = this.recordData.periodIdRes
      }
      const res = await getRecordInfo(this.recordQuery)
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      this.recordList = res.data.list || []
      this.recordTotal = res.data.total
    },
    // 增加催记
    openAdd() {
      this.currentRow = {
        userId: this.recordData.userId,
        orderId: this.recordData.orderId,
        periodId: this.recordData.periodId,
        borrowId: this.recordData.borrowId,
        collectionOrderId: this.recordData.orderId,
        companyName: this.customers.customerName,
        customerMobile: this.customers.customerMobile,
        overDueDays: this.customers.overDueDays
      }
      this.openAddDrawer = true
    },
    closeAdd(item) {
      this.openAddDrawer = false
      if (item) {
        this.getRecordInfo()
      }
    },
    // 提交减免
    openAddDiscount() {
      console.log(this.recordData.remainOverdue)
      if (this.recordData.remainOverdue * 1 <= 0) return this.$message.error(this.$t('borrow.borrow63')) /* 暂无可减免金额 */
      this.discountRow = {
        periodId: this.recordData.periodId,
        borrowId: this.recordData.borrowId,
        remainOverdue: this.recordData.remainOverdue
      }
      this.openDiscountDrawer = true
    },
    closeDiscount(item) {
      this.openDiscountDrawer = false
    }
  }
}
</script>

<style lang="scss">
</style>
