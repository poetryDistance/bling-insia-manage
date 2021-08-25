<template>
  <div class="main-box">
    <!-- 系统管理 -- 产品规则列表 -->
    <el-form ref="listQueryForm" :model="listQuery" size="mini" label-width="120px" inline>
      <el-form-item prop="productId" :label="$t('sysManage.sysManage91') + ':'"> <!-- 产品名称 -->
        <!-- 请选择产品名称 -->
        <el-select
          v-model="listQuery.productId"
          clearable
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
      <el-form-item :label="$t('sysManage.sysManage100') + ': '"> <!-- 期单位 -->
        <el-select v-model="listQuery.periodUnit" filterable clearable :placeholder="$t('sysManage.sysManage113')"> <!-- 请选择期单位 -->
          <el-option
            v-for="item in periodUnitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="enableFlag" :label="$t('loanMarket.loanMarket35') + ':'"> <!-- 是否启用 -->
        <!-- 请选择是否启用 -->
        <el-select
          v-model="listQuery.enableFlag"
          clearable
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

      <el-form-item label=" ">
        <el-button type="primary" @click="getTableList">{{ $t('common.common30') }}</el-button> <!-- 查询 -->
        <el-button @click="reset">{{ $t('common.common31') }}</el-button> <!-- 重置 -->
        <el-button type="primary" @click="openAdd">{{ $t('loanMarket.loanMarket36') }}</el-button> <!-- 添加规则 -->
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
      <el-table-column label="ID" prop="id" align="center" min-width="70px" />
      <el-table-column :label="$t('sysManage.sysManage91')" prop="productId" align="center" min-width="70px" /> <!-- 产品名称 -->
      <el-table-column :label="$t('loanMarket.loanMarket31')" prop="defaultAmount" align="center" min-width="60px" /> <!-- 默认金额 -->
      <el-table-column :label="$t('sysManage.sysManage100')" prop="periodUnit" align="center" min-width="70px"> <!-- 期单位 -->
        <template slot-scope="{ row }">
          {{ row.periodUnit | periodUnitFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.sysManage93')" prop="loanStartAmount" align="center" min-width="130px"> <!-- 最小贷款金额 -->
        <template slot="header">
          <span>{{ $t('sysManage.sysManage93') + '(' }}</span>
          <span style="color: red;"> Rp </span>
          <span>)</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.sysManage94')" prop="loanEndAmount" align="center" min-width="130px"> <!-- 最大贷款金额 -->
        <template slot="header">
          <span>{{ $t('sysManage.sysManage94') + '(' }}</span>
          <span style="color: red;"> Rp </span>
          <span>)</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.sysManage95')" prop="loanAmountStep" align="center" min-width="140px"> <!-- 贷款金额步进值 -->
        <template slot="header">
          <span>{{ $t('sysManage.sysManage95') + '(' }}</span>
          <span style="color: red;"> Rp </span>
          <span>)</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('loanMarket.loanMarket35')" prop="enableFlag" align="center" min-width="90px"> <!-- 是否启用 -->
        <template slot-scope="{ row }">
          <el-tag v-if="row.enableFlag === 0" size="small" type="danger">{{ $t('sysManage.sysManage25') }}</el-tag> <!-- 已禁用 -->
          <el-tag v-else-if="row.enableFlag === 10" size="small" type="success">{{ $t('sysManage.sysManage24') }}</el-tag> <!-- 已启用 -->
        </template>
      </el-table-column>
      <el-table-column :label="$t('loanMarket.loanMarket33')" prop="minCount" align="center" min-width="60px" /> <!-- 借款成功最小次数 -->
      <el-table-column :label="$t('loanMarket.loanMarket34')" prop="maxCount" align="center" min-width="60px" /> <!-- 借款成功最大次数 -->
      <el-table-column :label="$t('sysManage.sysManage102')" prop="repayTimes" align="center" min-width="70px"> <!-- 还款时间 -->
        <template slot-scope="{ row }">
          <el-popover
            v-if="row.repayTimes"
            placement="left-start"
            :title="$t('sysManage.sysManage102') + ':'"
            width="100"
            trigger="click"
            :visible-arrow="false"
          >
            <div v-for="(item, i) in row.repayTimes" :key="item">
              {{ (i+1) + $t('sysManage.sysManage117') + ': ' + item }}
              {{ row.periodUnit | periodUnitFilter }}
            </div> <!-- 期 -->
            <el-button slot="reference" type="text">{{ $t('common.common20') }}</el-button> <!-- 查看 -->
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('loanMarket.loanMarket32')" prop="defaultTerm" align="center" min-width="60px" /> <!-- 默认周期 -->
      <el-table-column prop="updateTime" :label="$t('collect.collect149')" align="center" min-width="150"> <!-- 更新时间 -->
        <template slot-scope="{ row }">
          {{ row.updateTime | ArrayToDateFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('sysManage.sysManage4')" align="center" min-width="150"> <!-- 创建时间 -->
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
import { getProductDown, getProductPrecept, deleteProductPrecept } from '@/api/loanSupermarket'
import Pagination from '@/components/Pagination' // 基于 el-pagination 的二次包
import addDrawer from './components/productPrecept/addDrawer'
import updateDrawer from './components/productPrecept/updateDrawer'
import { mapState } from 'vuex'

export default {
  name: 'ProductPreceptManagement',
  components: {
    Pagination,
    addDrawer,
    updateDrawer
  },
  data() {
    return {
      productIdOptions: [],
      // 登录信息
      listLoading: false,
      tableList: [],
      // 搜索
      listQuery: {
        page: 1,
        size: 10
      },
      total: 0,
      // 添加产品
      openAddDrawer: false,
      // 修改产品
      openUpdateDrawer: false,
      currentRow: {}
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
    }
  },

  mounted() {
    this.getProductDown()
    this.getTableList()
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
    // 处理查询条件
    handleListQuery() {
      const tmp = {}
      for (const k in this.listQuery) {
        if (this.listQuery[k] || this.listQuery[k] === 0) {
          if (k !== 'createTime') {
            tmp[k] = this.listQuery[k]
          } else if (k === 'createTime') {
            tmp.startTime = this.listQuery[k][0]
            tmp.endTime = this.listQuery[k][1] + 86399000
          }
        }
      }
      return tmp
    },
    // 获取产品规则
    async getTableList() {
      this.listLoading = true
      const tmp = this.handleListQuery()

      const res = await getProductPrecept(tmp)
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      this.tableList = res.data.list
      this.tableList.forEach(item => {
        item.repayTimes = item.repayTimes ? JSON.parse(item.repayTimes) : []
      })
      this.total = res.data.total
      this.listLoading = false
    },
    // 重置
    reset() {
      this.listQuery = {
        page: 1,
        size: 10
      }
      this.getTableList()
    },

    // 控制添加用户弹框
    openAdd() {
      this.openAddDrawer = true
    },
    closeAdd(item) {
      this.openAddDrawer = false
      if (item) {
        this.getTableList()
      }
    },
    // 控制修改用户弹框
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
    // 删除产品规则
    del(row) {
      this.$confirm(this.$t('collector.collector23'), this.$t('collector.collector24'), { /* 此操作将删除该规则, 是否继续? 删除规则 */
        confirmButtonText: this.$t('common.common10'), /* 确定 */
        cancelButtonText: this.$t('common.common11'), /* 取消 */
        type: 'warning'
      }).then(async() => {
        const res = await deleteProductPrecept({ id: row.id })
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
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  // padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.el-dropdown-menu__item {
  font-size: 12px;
  color: #409eff;
}
.is-disabled {
  cursor: default;
  color: #bbb;
  pointer-events: none;
}
</style>
