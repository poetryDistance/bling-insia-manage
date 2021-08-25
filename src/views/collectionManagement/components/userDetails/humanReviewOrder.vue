<template>
  <div>
    <div class="user-info-box">
      <!-- 基本信息 -->
      <ul class="base-box">
        <li>
          <div>{{ $t('collect.collect7') + ': ' }}</div> <!-- 借款金额 -->
          <div>{{ orderData.principalAmount }}</div>
        </li>
        <li>
          <div>{{ $t('financial.financial27') + ': ' }}</div> <!-- 风控分 -->
          <div>{{ orderData.modelResultScore }}</div>
        </li>
        <li>
          <div>{{ $t('borrow.borrow10') + ': ' }}</div> <!-- 风控结果 -->
          <div>{{ orderData.modelResultType | modelResultTypeFilter }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getUserBorrowData } from '@/api/collectionManagement'

export default {
  name: 'HumanReviewOrder',
  props: {
    commonData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      orderData: {
        principalAmount: null,
        modelResultScore: null,
        modelResultType: null
      }
    }
  },
  mounted() {
    this.getUserBorrowData()
  },
  methods: {
    // 获取借款订单信息
    async getUserBorrowData() {
      const res = await getUserBorrowData({ idRes: this.commonData.userIdRes })
      if (res.code !== '0') return this.$message.error(res.message || 'Error')
      const i = res.data && res.data.findIndex(item => item.id === this.commonData.borrowId)
      if (i !== -1) {
        this.orderData.principalAmount = res.data[i].principalAmount
        this.orderData.modelResultScore = res.data[i].modelResultScore
        this.orderData.modelResultType = res.data[i].modelResultType
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-box {
    width: 100%;
    .base-box {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        display: flex;
        justify-content: flex-start;
        width: 30%;
        margin-bottom: 20px;
        @media screen and (max-width: 1620px) {
          width: 50%;
        }
        @media screen and (max-width: 916px) {
          width: 100%;
        }
        div {
          width: 200px;
          padding: 5px 6px;
          box-sizing: border-box;
        }
        div:nth-child(1) {
          // width: 30%;
          text-align: right;
        }
        div:nth-child(2) {
          width: 260px;
          // width: 50%;
          text-align: left;
          border: 1px solid #eee;
          border-radius: 3px;
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
        }
        .el-tooltip {
          height: 26px;
        }
      }
    }
    .img-box {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        width: 25%;
        display: flex;
        position: relative;
        padding-bottom: 40px;
        margin-bottom: 20px;
        .el-image {
          width: 80%;
          height: 200px;
          margin: 0 auto;
          @media screen and (max-width: 550px) {
            width: 100%;
          }
        }
        .image-slot {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #f5f7fa;
          color: #909399;
          font-size: 14px;
        }
        .img-bottom {
          width: 60%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #eee;
        }
        @media screen and (max-width: 1620px) {
          width: 50%;
        }
        @media screen and (max-width: 916px) {
          width: 100%;
        }
      }
    }
  }
  .add-black {
    color: red;
    cursor: pointer;
  }
</style>
