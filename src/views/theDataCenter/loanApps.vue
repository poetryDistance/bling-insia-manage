div<template>
  <!-- 运营管理 -- 常用app列表 -->
  <div class="main-box">
    <el-button size="mini" type="primary" @click="openAdd">{{ $t('sysManage.sysManage126') }}</el-button> <!-- 添加设置 -->
    <el-table
      v-loading="listLoading"
      :data="tableList"
      :max-height="$store.state.settings.tableHeight"
      border
      fit
      stripe
      highlight-current-row
      header-cell-class-name="table-header-cell"
      style="width: 100%; margin-top: 10px;"
    >
      <el-table-column :label="$t('sysManage.sysManage23')" align="center" min-width="100px"> <!-- 操作 -->
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" @click="openUpdate(row)">
            {{ $t('sysManage.sysManage26') }} <!-- 修改 -->
          </el-button>
          <el-button size="mini" type="text" @click="del(row)">
            {{ $t('sysManage.sysManage29') }} <!-- 删除 -->
          </el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.sysManage13')" prop="id" align="center" min-width="90px" /> <!-- 编号 -->
      <el-table-column :label="$t('loanMarket.loanMarket100')" prop="loanAppName" align="center" min-width="120px" /> <!-- app名称 -->
      <el-table-column :label="$t('loanMarket.loanMarket101')" prop="loanAppPageName" align="center" min-width="100px" /> <!-- app包名 -->
      <el-table-column :label="$t('sysManage.sysManage4')" prop="createTime" align="center" min-width="150px"> <!-- 创建时间 -->
        <template slot-scope="{ row }">
          {{ row.createTime | ArrayToDateFormat }}
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

    <add-drawer v-if="openAddDrawer" @closeAdd="closeAdd" />
    <update-drawer v-if="openUpdateDrawer" :current-row="currentRow" @closeUpdate="closeUpdate" />
  </div>
</template>

<script>
import { getLoanApps, delLoanApps } from '@/api/theDataCenter'
import Pagination from '@/components/Pagination' // 基于 el-pagination 的二次包
import addDrawer from './components/loanApps/addDrawer'
import updateDrawer from './components/loanApps/updateDrawer'

export default {
  name: 'SystemSettings',
  components: {
    Pagination,
    addDrawer,
    updateDrawer
  },
  data() {
    return {
      // 获取
      listLoading: true,
      tableList: [],
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },

      // 添加
      openAddDrawer: false,

      // 修改
      openUpdateDrawer: false,
      currentRow: {}
    }
  },

  mounted() {
    this.getTableList()
  },

  methods: {
    // 获取列表
    async getTableList() {
      this.listLoading = true
      const res = await getLoanApps(this.listQuery)
      this.listLoading = false
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      this.tableList = res.data.list
      this.total = res.data.total
    },

    // 添加
    openAdd() {
      this.openAddDrawer = true
    },
    closeAdd(item) {
      this.openAddDrawer = false

      if (item) {
        this.getTableList()
      }
    },

    // 修改
    openUpdate(row) {
      this.openUpdateDrawer = true
      this.currentRow = row
    },
    closeUpdate(item) {
      this.openUpdateDrawer = false

      if (item) {
        this.getTableList()
      }
    },

    // 删除
    del(row) {
      this.$confirm(this.$t('loanMarket.loanMarket104'), this.$t('sysManage.sysManage29'), { /* 此操作将删除数据, 是否继续?  删除 */
        confirmButtonText: this.$t('common.common10'), /* 确定 */
        cancelButtonText: this.$t('common.common11'), /* 取消 */
        type: 'warning'
      }).then(async() => {
        const res = await delLoanApps({ id: row.id })
        if (res.code !== '0' || !res.data) return this.$message.error(res.message || 'Error')
        this.$message({
          type: 'success',
          message: this.$t('sysManage.sysManage42') /* 删除成功 */
        })
        this.getTableList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('sysManage.sysManage43') /* 已取消删除 */
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
