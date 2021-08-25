<template>
  <div>
    <!-- 新增 -->
    <el-drawer
      :title="$t('collector.collector3')"
      width="40%"
      :visible.sync="openUpdate"
    >
      <div style="height: 100vh">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-form
            ref="updateRef"
            :model="updateForm"
            :rules="updateRules"
            class="login-form"
            auto-complete="on"
            label-position="right"
            label-width="auto"
          >
            <el-form-item prop="loanAppName" :label="$t('loanMarket.loanMarket100') + ':'"> <!-- app名称 -->
              <el-input v-model="updateForm.loanAppName" :placeholder="$t('loanMarket.loanMarket102')" /> <!-- 请输入app名称 -->
            </el-form-item>
            <el-form-item prop="loanAppPageName" :label="$t('loanMarket.loanMarket101') + ':'"> <!-- app包名 -->
              <el-input v-model="updateForm.loanAppPageName" :placeholder="$t('loanMarket.loanMarket103')" /> <!-- 请输入app包名 -->
            </el-form-item>

            <el-form-item label=" ">
              <el-button type="primary" size="small" @click="submitUpdate">{{ $t('common.common10') }}</el-button> <!-- 确定 -->
              <el-button size="small" @click="openUpdate = false">{{ $t('common.common11') }}</el-button> <!-- 取消 -->
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { updateLoanApps } from '@/api/theDataCenter'

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
      marketNameOptions: [],
      // 新增
      updateForm: {
        loanAppName: '',
        loanAppPageName: ''
      },

      openUpdate: false,
      updateSuccess: false
    }
  },

  computed: {
    updateRules() {
      return {
        loanAppName: [{ required: true, message: this.$t('loanMarket.loanMarket102'), trigger: 'blur' }], /* 请输入app名称 */
        loanAppPageName: [{ required: true, message: this.$t('loanMarket.loanMarket103'), trigger: 'blur' }] /* 请输入app包名 */
      }
    }
  },

  watch: {
    openUpdate(newVal, oldVal) {
      if (oldVal) {
        setTimeout(() => {
          this.$emit('closeUpdate', this.updateSuccess)
        }, 200)
      }
    }
  },
  mounted() {
    this.updateForm.id = this.currentRow.id || ''
    this.updateForm.loanAppName = this.currentRow.loanAppName || ''
    this.updateForm.loanAppPageName = this.currentRow.loanAppPageName || ''
    this.openUpdate = true
  },

  methods: {
    // 修改
    submitUpdate() {
      this.$refs['updateRef'].validate(async(valid) => {
        if (valid) {
          const tmp = {}
          for (const k in this.updateForm) {
            if (this.updateForm[k]) {
              tmp[k] = this.updateForm[k]
            }
          }

          const res = await updateLoanApps(tmp)
          if (res.code !== '0') return this.$message.error(res.message || 'Error')
          this.$message.success(this.$t('sysManage.sysManage75')) /* 添加成功 */
          this.updateSuccess = true
          this.openUpdate = false
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
