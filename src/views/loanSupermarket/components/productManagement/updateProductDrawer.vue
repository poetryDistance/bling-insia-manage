<template>
  <div>
    <!-- 修改 -->
    <el-drawer
      :title="$t('sysManage.sysManage26')"
      width="40%"
      :visible.sync="openUpdateDrawer"
      :before-close="handleClose"
    >
      <div style="height: 100vh">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-form
            ref="updateProductRef"
            :model="updateProductForm"
            :rules="updateProductRules"
            class="login-form"
            auto-complete="on"
            size="small"
            label-position="right"
            label-width="120px"
          >
            <el-form-item prop="productName" :label="$t('sysManage.sysManage91') + ':'"> <!-- 产品名称 -->
              <el-input v-model="updateProductForm.productName" :placeholder="$t('sysManage.sysManage104')" /> <!-- 请输入产品名称 -->
            </el-form-item>
            <el-form-item prop="marketId" :label="$t('loanMarket.loanMarket1') + ':'"> <!-- 贷超名称 -->
              <!-- 请选择贷超名称 -->
              <el-select
                v-model="updateProductForm.marketId"
                filterable
                clearable
                style="width: 100%;"
                :placeholder="$t('loanMarket.loanMarket3')"
              >
                <el-option
                  v-for="item in marketNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="upTime" :label="$t('loanMarket.loanMarket26') + ':'"> <!-- 上架时间 -->
              <el-date-picker
                v-model="updateProductForm.upTime"
                type="date"
                value-format="timestamp"
                :placeholder="$t('loanMarket.loanMarket28')"
                :picker-options="pickerOptions"
                style="width: 100%;"
              /> <!-- 请选择上架时间 -->
            </el-form-item>
            <el-form-item prop="downTime" :label="$t('loanMarket.loanMarket27') + ':'"> <!-- 下架时间 -->
              <el-date-picker
                v-model="updateProductForm.downTime"
                type="date"
                value-format="timestamp"
                :placeholder="$t('loanMarket.loanMarket29')"
                :picker-options="pickerOptions"
                style="width: 100%;"
              /> <!-- 请选择下架时间 -->
            </el-form-item>
            <el-form-item prop="modelType" :label="$t('sysManage.sysManage92') + ':'"> <!-- 模型分类型 -->
              <!-- 请选择模型分类型 -->
              <el-select
                v-model="updateProductForm.modelType"
                filterable
                clearable
                style="width: 100%;"
                :placeholder="$t('sysManage.sysManage105')"
              >
                <el-option
                  v-for="item in modelTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="loanStartAmount" :label="$t('sysManage.sysManage93') + ':'"> <!-- 最小贷款金额 -->
              <el-row>
                <el-col :xs="20" :sm="22">
                  <el-input v-model="updateProductForm.loanStartAmount" :placeholder="$t('sysManage.sysManage106')" /> <!-- 请输入最小贷款金额 -->
                </el-col>
                <el-col :xs="1" :sm="1" :offset="1"><span style="color: red;">Rp</span></el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="loanEndAmount" :label="$t('sysManage.sysManage94') + ':'"> <!-- 最大贷款金额 -->
              <el-row>
                <el-col :xs="20" :sm="22">
                  <el-input v-model="updateProductForm.loanEndAmount" :placeholder="$t('sysManage.sysManage107')" /> <!-- 请输入最大贷款金额 -->
                </el-col>
                <el-col :xs="1" :sm="1" :offset="1"><span style="color: red;">Rp</span></el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="loanAmountStep" :label="$t('sysManage.sysManage95') + ':'"> <!-- 贷款金额步进值 -->
              <el-row>
                <el-col :xs="20" :sm="22">
                  <el-input v-model="updateProductForm.loanAmountStep" :placeholder="$t('sysManage.sysManage108')" /> <!-- 请输入贷款金额步进值 -->
                </el-col>
                <el-col :xs="1" :sm="1" :offset="1"><span style="color: red;">Rp</span></el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="deductedServiceRate" :label="$t('sysManage.sysManage96') + ':'"> <!-- 扣除手续费率 -->
              <el-input v-model="updateProductForm.deductedServiceRate" :placeholder="$t('sysManage.sysManage109')" /> <!-- 请输入扣除手续费率 -->
            </el-form-item>
            <el-form-item prop="deductedTaxRate" :label="$t('sysManage.sysManage97') + ':'"> <!-- 扣除税费率 -->
              <el-input v-model="updateProductForm.deductedTaxRate" :placeholder="$t('sysManage.sysManage110')" /> <!-- 请输入扣除税费率 -->
            </el-form-item>
            <el-form-item prop="normalInterestRate" :label="$t('sysManage.sysManage98') + ':'"> <!-- 正常还款利率 -->
              <el-input v-model="updateProductForm.normalInterestRate" :placeholder="$t('sysManage.sysManage111')" /> <!-- 请输入正常还款时的利率 -->
            </el-form-item>
            <el-form-item prop="overdueInterestRate" :label="$t('sysManage.sysManage99') + ':'"> <!-- 逾期利率 -->
              <el-input v-model="updateProductForm.overdueInterestRate" :placeholder="$t('sysManage.sysManage112')" /> <!-- 请输入逾期时的利率 -->
            </el-form-item>
            <el-form-item prop="periodUnit" :label="$t('sysManage.sysManage100') + ':'"> <!-- 期单位 -->
              <el-radio-group v-model="updateProductForm.periodUnit">
                <el-radio v-for="item in periodUnitOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="periodCount" :label="$t('sysManage.sysManage101') + ':'"> <!-- 期数 -->
              <el-input v-model="updateProductForm.periodCount" :placeholder="$t('sysManage.sysManage114')" @blur="countBlur(updateProductForm.periodCount)" /> <!-- 请输入期数 -->
            </el-form-item>
            <!-- 期还款时间 -->
            <el-form-item
              v-for="(item, i) in updateProductForm.repayTimes"
              :key="item.id"
              :prop="'repayTimes.' + i + '.value'"
              :label="(i+1) + $t('sysManage.sysManage118') + ':'"
              :rules="[
                { required: true, message: $t('sysManage.sysManage115'), trigger: 'blur' },
                { required: true, validator: validateRepay, trigger: 'blur' }
              ]"
            > <!-- 请选择还款时间 -->
              <el-row>
                <el-col :xs="20" :sm="22">
                  <el-input v-model="item.value" :placeholder="$t('sysManage.sysManage115')" /> <!-- 请输入还款时间 -->
                </el-col>
                <el-col :xs="1" :sm="1" :offset="1">{{ updateProductForm.periodUnit | periodUnitFilter }}</el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="productRemark" :label="$t('common.common12') + ':'"> <!-- 备注 -->
              <el-input
                v-model="updateProductForm.productRemark"
                type="textarea"
                maxlength="100"
                :autosize="{minRows: 1, maxRows: 8}"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label=" ">
              <el-button type="primary" size="small" @click="submitUpdate">{{ $t('common.common10') }}</el-button> <!-- 确定 -->
              <el-button size="small" @click="openUpdateDrawer = false">{{ $t('common.common11') }}</el-button> <!-- 取消 -->
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { updateProduct, getMarketNameList } from '@/api/loanSupermarket'
import { mapState } from 'vuex'

export default {
  name: 'UpdateProductDrawer',
  props: {
    currentRow: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // marketName: '',
      marketNameOptions: [],
      // 添加用户
      roleOptions: [],
      updateProductForm: {
        productName: '',
        modelType: '',
        loanStartAmount: '',
        loanEndAmount: '',
        loanAmountStep: '',
        deductedServiceRate: '',
        deductedTaxRate: '',
        normalInterestRate: '',
        overdueInterestRate: '',
        upTime: '',
        downTime: '',
        periodUnit: '',
        periodCount: '',
        repayTimes: [],
        productRemark: ''
      },

      // 时间选择器限制当前时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000
        }
      },

      openUpdateDrawer: false,
      updateSuccess: false
    }
  },

  computed: {
    ...mapState({
      modelTypeOptions: state => state.options.modelTypeOptions,
      periodUnitOptions: state => state.options.periodUnitOptions
    }),
    updateProductRules() {
      const validateInt = (rule, value, callback) => {
        const reg = /^[1-9]\d*$/g
        if (!reg.test(value * 1)) {
          callback(new Error(this.$t('sysManage.sysManage116'))) /* 请输入正整数 */
        } else {
          callback()
        }
      }
      const validateFloat = (rule, value, callback) => {
        const reg = /^[0-9]\d*([.][0-9]{1,5})?$/g
        if (!reg.test(value * 1)) {
          callback(new Error(this.$t('sysManage.sysManage120'))) /* 请输入最多五位小数的数字值 */
        } else {
          callback()
        }
      }
      const validateAmount = (rule, value, callback) => {
        const min = this.updateProductForm.loanStartAmount * 1
        const max = this.updateProductForm.loanEndAmount * 1
        if (min > max) {
          callback(new Error(this.$t('sysManage.sysManage121'))) /* 最小贷款金额不得大于最大贷款金额 */
        } else {
          callback()
        }
      }
      const validateStep = (rule, value, callback) => {
        const min = this.updateProductForm.loanStartAmount * 1
        const reg = /^[0-9]\d*$/g
        if (!reg.test(value * 1)) {
          callback(new Error(this.$t('sysManage.sysManage116'))) /* 请输入正整数 */
        }
        if (min < value) {
          callback(new Error(this.$t('sysManage.sysManage122'))) /* 步进值不得大于贷款金额 */
        }
        callback()
      }
      const validateTime = (rule, value, callback) => {
        if (this.updateProductForm.upTime > this.updateProductForm.downTime) {
          callback(new Error(this.$t('loanMarket.loanMarket30'))) /* 下架时间不得小于上架时间 */
        } else {
          callback()
        }
      }
      return {
        productName: [{ required: true, message: this.$t('sysManage.sysManage104'), trigger: 'blur' }], /* 请输入产品名称 */
        modelType: [{ required: true, message: this.$t('sysManage.sysManage105'), trigger: 'change' }], /* 请选择模型分类型 */
        loanStartAmount: [
          { required: true, message: this.$t('sysManage.sysManage106'), trigger: 'blur' }, /* 请输入最小贷款金额 */
          { required: true, trigger: 'blur', validator: validateInt },
          { required: true, trigger: 'blur', validator: validateAmount }
        ],
        loanEndAmount: [
          { required: true, message: this.$t('sysManage.sysManage107'), trigger: 'blur' }, /* 请输入最大贷款金额 */
          { required: true, trigger: 'blur', validator: validateInt },
          { required: true, trigger: 'blur', validator: validateAmount }
        ],
        loanAmountStep: [
          { required: true, trigger: 'blur', validator: validateStep }
        ],
        deductedServiceRate: [
          { required: true, message: this.$t('sysManage.sysManage109'), trigger: 'blur' }, /* 请输入扣除手续费率 */
          { required: true, validator: validateFloat, trigger: 'blur' }
        ],
        deductedTaxRate: [
          { required: true, message: this.$t('sysManage.sysManage110'), trigger: 'blur' }, /* 请输入扣除税费率 */
          { required: true, validator: validateFloat, trigger: 'blur' }
        ],
        normalInterestRate: [
          { required: true, message: this.$t('sysManage.sysManage111'), trigger: 'blur' }, /* 请输入正常还款时的利率 */
          { required: true, validator: validateFloat, trigger: 'blur' }
        ],
        overdueInterestRate: [
          { required: true, message: this.$t('sysManage.sysManage112'), trigger: 'blur' }, /* 请输入逾期时的利率 */
          { required: true, validator: validateFloat, trigger: 'blur' }
        ],
        upTime: [
          { required: true, message: this.$t('loanMarket.loanMarket28'), trigger: 'change' }, /* 请选择上架时间 */
          { required: true, trigger: 'change', validator: validateTime }
        ],
        downTime: [
          { required: true, message: this.$t('loanMarket.loanMarket29'), trigger: 'change' }, /* 请选择下架时间 */
          { required: true, trigger: 'change', validator: validateTime }
        ],
        periodUnit: [{ required: true, message: this.$t('sysManage.sysManage113'), trigger: 'change' }], /* 请选择期单位 */
        periodCount: [
          { required: true, message: this.$t('sysManage.sysManage114'), trigger: 'blur' }, /* 请输入期数 */
          { required: true, trigger: 'blur', validator: validateInt }
        ]
      }
    }
  },

  watch: {
    openUpdateDrawer(newVal, oldVal) {
      if (oldVal) {
        setTimeout(() => {
          this.$emit('closeUpdate', this.updateSuccess)
        }, 200)
      }
    }
  },
  mounted() {
    // this.marketName = this.currentRow.marketName
    this.marketId = this.currentRow.marketId
    this.updateProductForm.id = this.currentRow.id
    this.updateProductForm.productName = this.currentRow.productName
    this.updateProductForm.modelType = this.currentRow.modelType
    this.updateProductForm.loanStartAmount = this.currentRow.loanStartAmount
    this.updateProductForm.loanEndAmount = this.currentRow.loanEndAmount
    this.updateProductForm.loanAmountStep = this.currentRow.loanAmountStep
    this.updateProductForm.deductedServiceRate = this.currentRow.deductedServiceRate
    this.updateProductForm.deductedTaxRate = this.currentRow.deductedTaxRate
    this.updateProductForm.normalInterestRate = this.currentRow.normalInterestRate
    this.updateProductForm.overdueInterestRate = this.currentRow.overdueInterestRate
    if (this.currentRow.upTime) this.updateProductForm.upTime = this.timeToTimestamp(this.currentRow.upTime)
    if (this.currentRow.downTime) this.updateProductForm.downTime = this.timeToTimestamp(this.currentRow.downTime)

    this.updateProductForm.periodUnit = this.currentRow.periodUnit
    this.updateProductForm.periodCount = this.currentRow.periodCount
    this.updateProductForm.productRemark = this.currentRow.productRemark
    this.currentRow.repayTimes.forEach(item => {
      this.updateProductForm.repayTimes.push({
        value: item,
        key: Date.now()
      })
    })
    this.getMarketNameList()
    this.openUpdateDrawer = true
  },

  methods: {
    // 获取贷超名称
    async getMarketNameList() {
      const res = await getMarketNameList()
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      res.data.forEach(item => {
        this.marketNameOptions.push({
          value: item.id,
          label: item.marketName
        })
      })
    },
    // 时间数组转为时间戳
    timeToTimestamp(arr) {
      const tmp = []
      if (!arr || !Array.isArray(arr)) return ''
      arr.forEach(item => {
        if (item < 10) {
          item = '0' + item
          tmp.push(item)
        } else {
          tmp.push(item)
        }
      })
      if (!tmp[3]) tmp[3] = '00'
      if (!tmp[4]) tmp[4] = '00'
      if (!tmp[5]) tmp[5] = '00'
      const date = new Date(tmp[0] + '-' + tmp[1] + '-' + tmp[2] + ' ' + tmp[3] + ':' + tmp[4] + ':' + tmp[5])
      return date.getTime()
    },
    validateRepay(rule, value, callback) {
      const i = rule.fullField.split('.')[1] * 1
      const reg = /^[0-9]\d*$/g
      if (!reg.test(value * 1)) {
        callback(new Error(this.$t('sysManage.sysManage116'))) /* 请输入正整数 */
      }
      if (i !== 0 && this.updateProductForm.repayTimes[i - 1].value * 1 >= value * 1) {
        callback(new Error(this.$t('sysManage.sysManage119'))) /* 当前期时间要大于前一期 */
      }
      callback()
    },
    // 改变期数
    countBlur(val) {
      this.updateProductForm.repayTimes = [{
        value: ''
      }]
      for (let i = 0; i < val - 1; i++) {
        this.updateProductForm.repayTimes.push({
          value: '',
          key: Date.now()
        })
      }
    },
    // 关闭弹出框
    handleClose(done) {
      done()
    },
    // 添加产品
    submitUpdate() {
      this.$refs['updateProductRef'].validate(async(valid) => {
        if (valid) {
          const tmp = {}
          const arr = []
          for (const k in this.updateProductForm) {
            if (k === 'repayTimes') {
              this.updateProductForm.repayTimes.forEach(item => {
                arr.push(item.value * 1)
              })
              tmp[k] = JSON.stringify(arr)
            } else {
              tmp[k] = this.updateProductForm[k]
            }
          }
          const res = await updateProduct(tmp)
          if (res.code !== '0' || !res.data) return this.$message.error(res.message || 'Error')
          this.$message.success(this.$t('sysManage.sysManage78')) /* 修改成功 */
          this.updateSuccess = true
        } else {
          console.log('error submit!!')
          return false
        }
        this.openUpdateDrawer = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
