<template>
  <div style="padding-bottom: 80px;">
    <!-- 数据管理 -- 详情页 -->
    <!-- <el-card shadow="hover" class="basic-info">
      <div class="title">{{ $t('collect.collect79') }}</div> 基本信息
      <el-divider />
      <base-info :customers="customers" :record-data="commonData" @addRecordSuccess="addRecordSuccess" />
    </el-card> -->

    <!-- 客户信息 -->
    <el-card shadow="hover" class="basic-info">
      <div class="title">{{ $t('financial.financial29') }}</div>
      <el-divider />
      <base-info :customers="customers" :record-data="commonData" @addBlack="addBlack" @addRecordSuccess="addRecordSuccess" />
    </el-card>

    <!-- 订单信息 -->
    <el-card v-if="isUserDetails === '5'" shadow="hover" class="basic-info">
      <div class="title">{{ $t('financial.financial32') }}</div>
      <el-divider />
      <human-review-order :common-data="commonData" />
    </el-card>

    <!-- 基本信息 -->
    <el-card v-if="isUserDetails === '6'" shadow="hover" class="basic-info">
      <div class="title">{{ $t('collect.collect79') }}</div>
      <el-divider />
      <user-borrow-info :user-borrow-data="customers.userBorrowInfo || {}" />
    </el-card>

    <!-- 借款订单 -->
    <el-card
      v-if="isUserDetails === '4' || isUserDetails === '2' || isUserDetails === '5' || isUserDetails === '6'"
      shadow="hover"
      class="basic-info"
    >
      <div class="title">{{ $t('collect.collect80') }}</div>
      <el-divider />
      <order-borrowing
        v-if="isUserDetails === '4' || isUserDetails === '2' || isUserDetails === '5' || isUserDetails === '6'"
        :user-id="commonData.userId"
        :user-id-res="commonData.userIdRes"
      />
    </el-card>

    <!-- 分期信息 -->
    <el-card v-if="isUserDetails !== '4'" shadow="hover" class="basic-info">
      <div class="title">{{ $t('collect.collect81') }}</div>
      <el-divider />
      <periods-info
        v-if="isUserDetails !== '4'"
        :common-data="commonData"
      />
    </el-card>

    <!-- 催记 -->
    <el-card shadow="hover" class="basic-info">
      <div class="title">{{ $t('collect.collect82') }}</div>
      <el-divider />
      <record-info :record-data="commonData" :is-remind="commonData.isRemind" :customers="customers" />
    </el-card>

    <!-- 通讯录和通话记录 -->
    <el-card v-if="isUserDetails === '1' || isUserDetails === '5' && isAddressBook" shadow="hover" class="basic-info">
      <address-book :book-row="commonData" :customers="customers" @addRecordSuccess="addRecordSuccess" />
    </el-card>

    <!-- 委案变更记录 -->
    <el-card v-if="permission.isAdmin && isUserDetails === '1'" shadow="hover" class="basic-info">
      <div class="title">{{ $t('collect.collect232') }}</div>
      <el-divider />
      <case-change :period-id="commonData.periodId" :period-id-res="commonData.periodIdRes" />
    </el-card>

    <!-- 审核 -->
    <el-button
      v-if="isUserDetails === '5' && !openRevisarDrawer && isRevisar === 'false'"
      class="btn-revisar"
      type="primary"
      @click="openRevisar"
    >{{ $t('collect.collect94') }}</el-button>
    <revisar-drawer v-if="openRevisarDrawer" :revisar-row="revisarRow" @close="close" />
  </div>
</template>

<script>
import { getUserDate, isBlack } from '@/api/collectionManagement'
import baseInfo from './components/userDetails/baseInfo'
import orderBorrowing from './components/userDetails/orderBorrowing'
import periodsInfo from './components/userDetails/periodsInfo'
import recordInfo from './components/userDetails/recordInfo'
import caseChange from './components/userDetails/caseChange'
import addressBook from './components/userDetails/addressBook'
import revisarDrawer from './components/userDetails/revisarDrawer'
import userBorrowInfo from './components/userDetails/userBorrowInfo'
import humanReviewOrder from './components/userDetails/humanReviewOrder.vue'
import { mapState } from 'vuex'

export default {
  name: 'UserDetails',
  components: {
    baseInfo,
    orderBorrowing,
    periodsInfo,
    recordInfo,
    caseChange,
    addressBook,
    revisarDrawer,
    userBorrowInfo,
    humanReviewOrder
  },
  data() {
    return {
      userInfo: {},
      orderInfoList: [],
      customers: {},

      userIdRes: null,
      periodId: null,
      borrowIdRes: null,
      remainOverdue: null,

      commonData: {},

      // 审核
      isRevisar: false,
      openRevisarDrawer: false,
      revisarRow: {},

      // 是否展示通讯录
      isAddressBook: false,

      isUserDetails: ''
    }
  },

  computed: {
    ...mapState({
      permission: state => state.permission.permission
    })
  },

  mounted() {
    this.$nextTick(() => {
      if (this.$route.params.userId) {
        this.commonData = this.$route.params

        this.isRevisar = this.sessionData('get', 'revisarRowSuccess')
        this.isUserDetails = this.sessionData('get', 'isUserDetails')[this.$route.params.userId]
        this.getUserDate({ idRes: this.$route.params.userIdRes })

        // 判断是否展示通讯录和通讯记录
        const loginUser = this.sessionData('get', 'login_user') || {}
        this.isAddressBook = loginUser.sysRole.isOpenContact
      }
    })
  },
  methods: {
    // 获取用户基本信息
    async getUserDate(item) {
      const res = await getUserDate(item)
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      // if (!Array.isArray(res.data.faceImage)) res.data.faceImage = ['']
      this.customers = res.data || {}
    },
    // 添加黑名单
    async addBlack(blackCustomer) {
      const res = await isBlack({ blackCustomer: blackCustomer, id: this.commonData.userId })
      if (res.code !== '0' && !res.data) return this.$message.error(res.message || 'Error')
      this.getUserDate({ idRes: this.commonData.userIdRes, borrowIdRes: this.commonData.borrowIdRes })
      this.$message.success(blackCustomer ? this.$t('sysManage.sysManage75') : this.$t('userManage.userManage28')) /* 添加成功 移出成功 */
    },
    // 新增催记成功
    addRecordSuccess() {
      // 移除组件
      this.recordFlag = false
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.recordFlag = true
      })
    },

    // 审核弹框
    openRevisar() {
      this.openRevisarDrawer = true
      this.revisarRow.userIdRes = this.commonData.userIdRes
      this.revisarRow.borrowIdRes = this.commonData.borrowIdRes
    },
    close(isSuccess) {
      if (isSuccess) {
        this.getUserDate({ idRes: this.commonData.userIdRes })
        this.$router.push({
          path: '/borrowManage/humanReview',
          query: {
            revisarResult: true
          }
        })
      }
      this.openRevisarDrawer = false
    }
  }
}
</script>

<style lang="scss">
.basic-info {
  margin-bottom: 10px;
  .title {
    padding: 10px 0 0 10px;
    font-size: 20px;
    font-weight: 600;
  }
}
.btn-revisar {
  position: fixed;
  right: 4px;
  top: 120px;
  width: 30px;
  height: 100px;
  font-size: 16px;
  white-space: pre-wrap;
  padding: 10px 0;
  line-height: 1.5;
  border: 0;
  z-index: 9999;
}
</style>
