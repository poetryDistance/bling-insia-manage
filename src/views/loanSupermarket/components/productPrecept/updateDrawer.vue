<template>
  <div>
    <!-- 修改规则 -->
    <el-drawer
      :title="$t('loanMarket.loanMarket42')"
      width="40%"
      :visible.sync="openUpdateDrawer"
    >
      <div style="height: 100vh">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-form
            ref="updateRef"
            :model="updateForm"
            :rules="updateRules"
            class="login-form"
            auto-complete="on"
            size="small"
            label-position="right"
            label-width="130px"
          >
            <el-form-item prop="productId" :label="$t('sysManage.sysManage91') + ':'"> <!-- 产品名称 -->
              <!-- 请选择产品名称 -->
              <el-select
                v-model="updateForm.productId"
                style="width: 100%;"
                :placeholder="$t('risk.risk4')"
              >
                <el-option
                  v-for="item in productIdOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="enableFlag" :label="$t('loanMarket.loanMarket35') + ':'"> <!-- 是否启用 -->
              <!-- 请选择是否启用 -->
              <el-select
                v-model="updateForm.enableFlag"
                style="width: 100%;"
                :placeholder="$t('loanMarket.loanMarket40')"
              >
                <el-option
                  v-for="item in enableFlagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="defaultAmount" :label="$t('loanMarket.loanMarket31') + ':'"> <!-- 默认金额 -->
              <el-input v-model="updateForm.defaultAmount" :placeholder="$t('loanMarket.loanMarket37')" /> <!-- 请输入默认金额 -->
            </el-form-item>
            <el-form-item prop="minCount" :label="$t('loanMarket.loanMarket33') + ':'"> <!-- 借款成功最小次数 -->
              <el-input v-model="updateForm.minCount" :placeholder="$t('loanMarket.loanMarket38')" /> <!-- 请输入借款成功最小次数 -->
            </el-form-item>
            <el-form-item prop="maxCount" :label="$t('loanMarket.loanMarket34') + ':'"> <!-- 借款成功最大次数 -->
              <el-input v-model="updateForm.maxCount" :placeholder="$t('loanMarket.loanMarket39')" /> <!-- 请输入借款成功最大次数 -->
            </el-form-item>
            <el-form-item prop="loanStartAmount" :label="$t('sysManage.sysManage93') + ':'"> <!-- 最小贷款金额 -->
              <el-row>
                <el-col :xs="19" :sm="21">
                  <el-input v-model="updateForm.loanStartAmount" :placeholder="$t('sysManage.sysManage106')" /> <!-- 请输入最小贷款金额 -->
                </el-col>
                <el-col :xs="1" :sm="1" :offset="1"><span style="color: red;">Rp</span></el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="loanEndAmount" :label="$t('sysManage.sysManage94') + ':'"> <!-- 最大贷款金额 -->
              <el-row>
                <el-col :xs="19" :sm="21">
                  <el-input v-model="updateForm.loanEndAmount" :placeholder="$t('sysManage.sysManage107')" /> <!-- 请输入最大贷款金额 -->
                </el-col>
                <el-col :xs="1" :sm="1" :offset="1"><span style="color: red;">Rp</span></el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="loanAmountStep" :label="$t('sysManage.sysManage95') + ':'"> <!-- 贷款金额步进值 -->
              <el-row>
                <el-col :xs="19" :sm="21">
                  <el-input v-model="updateForm.loanAmountStep" :placeholder="$t('sysManage.sysManage108')" /> <!-- 请输入贷款金额步进值 -->
                </el-col>
                <el-col :xs="1" :sm="1" :offset="1"><span style="color: red;">Rp</span></el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="defaultTerm" :label="$t('loanMarket.loanMarket32') + ':'"> <!-- 默认周期 -->
              <el-input v-model="updateForm.defaultTerm" :placeholder="$t('loanMarket.loanMarket41')" /> <!-- 请输入默认周期 -->
            </el-form-item>
            <el-form-item prop="periodUnit" :label="$t('sysManage.sysManage100') + ':'"> <!-- 期单位 -->
              <el-radio-group v-model="updateForm.periodUnit">
                <el-radio v-for="item in periodUnitOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="periodCount" :label="$t('sysManage.sysManage101') + ':'"> <!-- 期数 -->
              <el-input v-model="updateForm.periodCount" :placeholder="$t('sysManage.sysManage114')" @blur="countBlur(updateForm.periodCount)" /> <!-- 请输入期数 -->
            </el-form-item>
            <!-- 期还款时间 -->
            <el-form-item
              v-for="(item, i) in updateForm.repayTimes"
              :key="item.id"
              :prop="'repayTimes.' + i + '.value'"
              :label="(i+1) + $t('sysManage.sysManage118') + ':'"
              :rules="[
                { required: true, message: $t('sysManage.sysManage115'), trigger: 'blur' },
                { required: true, validator: validateRepay, trigger: 'blur' }
              ]"
            > <!-- 请选择还款时间 -->
              <el-row>
                <el-col :xs="19" :sm="21">
                  <el-input v-model="item.value" :placeholder="$t('sysManage.sysManage115')" /> <!-- 请输入还款时间 -->
                </el-col>
                <el-col :xs="1" :sm="1" :offset="1">{{ updateForm.periodUnit | periodUnitFilter }}</el-col>
              </el-row>
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
import { updateProductPrecept, getProductDown } from '@/api/loanSupermarket'
import { mapState } from 'vuex'

export default {
  name: 'UpdateDrawer',
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
      // 产品名称
      productIdOptions: [],
      // 添加产品
      updateForm: {
        id: null,
        productId: null,
        enableFlag: null,
        defaultAmount: null,
        minCount: null,
        maxCount: null,
        loanStartAmount: null,
        loanEndAmount: null,
        loanAmountStep: null,
        periodUnit: null,
        defaultTerm: null,
        periodCount: null,
        repayTimes: []
      },

      openUpdateDrawer: false,
      updateSuccess: false
    }
  },

  computed: {
    ...mapState({
      periodUnitOptions: state => state.options.periodUnitOptions
    }),
    enableFlagOptions() {
      return [
        { value: 0, label: this.$t('sysManage.sysManage27') }, /* 禁用 */
        { value: 10, label: this.$t('sysManage.sysManage28') } /* 启用 */
      ]
    },
    updateRules() {
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
        const min = this.updateForm.loanStartAmount * 1
        const max = this.updateForm.loanEndAmount * 1
        if (min > max) {
          callback(new Error(this.$t('sysManage.sysManage121'))) /* 最小贷款金额不得大于最大贷款金额 */
        } else {
          callback()
        }
      }
      const validateCount = (rule, value, callback) => {
        const min = this.updateForm.minCount * 1
        const max = this.updateForm.maxCount * 1
        if (min > max) {
          callback(new Error(this.$t('sysManage.sysManage121'))) /* 最小贷款金额不得大于最大贷款金额 */
        } else {
          callback()
        }
      }
      const validateStep = (rule, value, callback) => {
        const min = this.updateForm.loanStartAmount * 1
        if (min < value) {
          callback(new Error(this.$t('sysManage.sysManage122'))) /* 步进值不得大于贷款金额 */
        } else {
          callback()
        }
      }
      return {
        productId: [{ required: true, message: this.$t('risk.risk4'), trigger: 'change' }], /* 请选择产品名称 */
        enableFlag: [{ required: true, message: this.$t('loanMarket.loanMarket40'), trigger: 'change' }], /* 请选择是否启用 */
        defaultAmount: [
          { required: true, message: this.$t('loanMarket.loanMarket37'), trigger: 'blur' }, /* 请输入默认金额 */
          { required: true, validator: validateFloat, trigger: 'blur' }
        ],
        minCount: [
          { required: true, message: this.$t('loanMarket.loanMarket38'), trigger: 'blur' }, /* 请输入借款成功最小次数 */
          { required: true, trigger: 'blur', validator: validateInt },
          { required: true, trigger: 'blur', validator: validateCount }
        ],
        maxCount: [
          { required: true, message: this.$t('loanMarket.loanMarket39'), trigger: 'blur' }, /* 请输入借款成功最大次数 */
          { required: true, trigger: 'blur', validator: validateInt },
          { required: true, trigger: 'blur', validator: validateCount }
        ],
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
          { required: true, message: this.$t('sysManage.sysManage108'), trigger: 'blur' }, /* 请输入贷款金额步进值 */
          { required: true, trigger: 'blur', validator: validateInt },
          { required: true, trigger: 'blur', validator: validateStep }
        ],
        periodUnit: [{ required: true, message: this.$t('sysManage.sysManage113'), trigger: 'change' }], /* 请选择期单位 */
        defaultTerm: [
          { required: true, message: this.$t('loanMarket.loanMarket41'), trigger: 'blur' }, /* 请输入默认周期 */
          { required: true, trigger: 'blur', validator: validateInt }
        ],
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
    this.updateForm.id = this.currentRow.id
    this.updateForm.productId = this.currentRow.productId
    this.updateForm.enableFlag = this.currentRow.enableFlag
    this.updateForm.defaultAmount = this.currentRow.defaultAmount
    this.updateForm.minCount = this.currentRow.minCount
    this.updateForm.maxCount = this.currentRow.maxCount
    this.updateForm.loanStartAmount = this.currentRow.loanStartAmount
    this.updateForm.loanEndAmount = this.currentRow.loanEndAmount
    this.updateForm.loanAmountStep = this.currentRow.loanAmountStep
    this.updateForm.periodUnit = this.currentRow.periodUnit
    this.updateForm.defaultTerm = this.currentRow.defaultTerm
    this.currentRow.repayTimes.forEach(item => {
      this.updateForm.repayTimes.push({
        value: item,
        key: Date.now()
      })
    })
    this.updateForm.periodCount = this.currentRow.repayTimes.length
    this.getProductDown()
    this.openUpdateDrawer = true
  },

  methods: {
    // 获取产品名称
    async getProductDown() {
      const res = await getProductDown()
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      res.data.forEach(item => {
        this.productIdOptions.push({
          value: item.id,
          label: item.productName
        })
      })
    },
    validateRepay(rule, value, callback) {
      const i = rule.fullField.split('.')[1] * 1
      const reg = /^[0-9]\d*$/g
      if (!reg.test(value * 1)) {
        callback(new Error(this.$t('sysManage.sysManage116'))) /* 请输入正整数 */
      }
      if (i !== 0 && this.updateForm.repayTimes[i - 1].value * 1 >= value * 1) {
        callback(new Error(this.$t('sysManage.sysManage119'))) /* 当前期时间要大于前一期 */
      }
      callback()
    },
    // 改变期数
    countBlur(val) {
      this.updateForm.repayTimes = [{
        value: ''
      }]
      for (let i = 0; i < val - 1; i++) {
        this.updateForm.repayTimes.push({
          value: '',
          key: Date.now()
        })
      }
    },
    // 添加规则
    submitUpdate() {
      this.$refs['updateRef'].validate(async(valid) => {
        if (valid) {
          const tmp = {}
          const arr = []
          for (const k in this.updateForm) {
            if (k === 'repayTimes') {
              this.updateForm.repayTimes.forEach(item => {
                arr.push(item.value * 1)
              })
              tmp[k] = JSON.stringify(arr)
            } else if (k !== 'periodCount') {
              tmp[k] = this.updateForm[k]
            }
          }
          const res = await updateProductPrecept(tmp)
          if (res.code !== '0' || !res.data) return this.$message.error(res.message || 'Error')
          this.$message.success(this.$t('sysManage.sysManage75')) /* 添加成功 */
          this.updateSuccess = true
          this.openUpdateDrawer = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
