<template>
  <div>
    <!-- 委案变更记录 -->
    <el-table
      :data="caseChangeList"
      :max-height="$store.state.settings.tableHeight"
      border
      fit
      stripe
      highlight-current-row
      header-cell-class-name="table-header-cell"
      style="width: 100%; margin-top: 10px;"
    >
      <el-table-column :label="$t('sysManage.sysManage4')" prop="createTime" align="center" min-width="80px"> <!-- 创建时间 -->
        <template slot-scope="{ row }">
          {{ row.createTime | ArrayToDateFormat }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('collector.collector46')" prop="operatorName" align="center" min-width="90px" /> <!-- 操作人 -->
      <el-table-column :label="$t('collector.collector36')" prop="fromName" align="center" min-width="90px" /> <!-- 转派前催收员 -->
      <el-table-column :label="$t('collector.collector37')" prop="toName" align="center" min-width="90px" /> <!-- 转派后催收员 -->
      <el-table-column :label="$t('collector.collector38')" prop="changeType" align="center" min-width="70px"> <!-- 变更类型 -->
        <template slot-scope="{ row }">
          {{ row.changeType | changeTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.common12')" prop="remark" align="center" min-width="80px"> <!-- 备注 -->
        <template slot-scope="{ row }">
          <el-popover
            v-if="row.remark"
            placement="left-start"
            :title="$t('common.common12') + ':'"
            width="100"
            trigger="click"
            :content="row.remark"
            :visible-arrow="false"
          >
            <el-button slot="reference" type="text">{{ $t('common.common20') }}</el-button> <!-- 查看 -->
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      class="pagination"
      :total="total"
      :page.sync="caseChangeQuery.page"
      :size.sync="caseChangeQuery.size"
      @pagination="getCaseChange"
    />
  </div>
</template>

<script>
import { getCaseChange } from '@/api/collectionManagement'
import Pagination from '@/components/Pagination' // 基于 el-pagination 的二次包
import { mapState } from 'vuex'

export default {
  name: 'RecordInfo',
  components: {
    Pagination
  },
  props: {
    periodId: {
      type: Number,
      default: null
    },
    periodIdRes: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      caseChangeQuery: {
        page: 1,
        size: 10
      },
      total: 0,
      caseChangeList: []
    }
  },
  computed: {
    ...mapState({
      permission: state => state.permission.permission
    })
  },
  mounted() {
    setTimeout(() => {
      this.getCaseChange()
    }, 10)
  },
  methods: {
    // 获取委案变更记录
    async getCaseChange() {
      this.caseChangeQuery.borrowPeriodIdRes = this.periodIdRes
      const res = await getCaseChange(this.caseChangeQuery)
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      this.caseChangeList = res.data.list || []
      this.total = res.data.total
    }
  }
}
</script>

<style lang="scss">
</style>
