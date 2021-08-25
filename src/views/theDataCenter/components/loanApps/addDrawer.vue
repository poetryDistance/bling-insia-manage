<template>
  <div>
    <!-- 新增 -->
    <el-drawer
      :title="$t('collector.collector3')"
      width="40%"
      :visible.sync="openAdd"
    >
      <div style="height: 100vh">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-form
            ref="addRef"
            :model="addForm"
            :rules="addRules"
            class="login-form"
            auto-complete="on"
            label-position="right"
            label-width="auto"
          >
            <el-form-item prop="loanAppName" :label="$t('loanMarket.loanMarket100') + ':'"> <!-- app名称 -->
              <el-input v-model="addForm.loanAppName" :placeholder="$t('loanMarket.loanMarket102')" /> <!-- 请输入app名称 -->
            </el-form-item>
            <el-form-item prop="loanAppPageName" :label="$t('loanMarket.loanMarket101') + ':'"> <!-- app包名 -->
              <el-input v-model="addForm.loanAppPageName" :placeholder="$t('loanMarket.loanMarket103')" /> <!-- 请输入app包名 -->
            </el-form-item>

            <el-form-item label=" ">
              <el-button type="primary" size="small" @click="submitAdd">{{ $t('common.common10') }}</el-button> <!-- 确定 -->
              <el-button size="small" @click="openAdd = false">{{ $t('common.common11') }}</el-button> <!-- 取消 -->
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { addLoanApps } from '@/api/theDataCenter'

export default {
  name: 'AddDrawer',
  data() {
    return {
      marketNameOptions: [],
      // 新增
      addForm: {},

      openAdd: false,
      addSuccess: false
    }
  },

  computed: {
    addRules() {
      return {
        loanAppName: [{ required: true, message: this.$t('loanMarket.loanMarket102'), trigger: 'blur' }], /* 请输入app名称 */
        loanAppPageName: [{ required: true, message: this.$t('loanMarket.loanMarket103'), trigger: 'blur' }] /* 请输入app包名 */
      }
    }
  },

  watch: {
    openAdd(newVal, oldVal) {
      if (oldVal) {
        setTimeout(() => {
          this.$emit('closeAdd', this.addSuccess)
        }, 200)
      }
    }
  },
  mounted() {
    this.openAdd = true
  },

  methods: {
    // 添加
    submitAdd() {
      this.$refs['addRef'].validate(async(valid) => {
        if (valid) {
          const tmp = {}
          for (const k in this.addForm) {
            if (this.addForm[k]) {
              tmp[k] = this.addForm[k]
            }
          }

          const res = await addLoanApps(tmp)
          if (res.code !== '0') return this.$message.error(res.message || 'Error')
          this.$message.success(this.$t('sysManage.sysManage75')) /* 添加成功 */
          this.addSuccess = true
          this.openAdd = false
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
