<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template>
        <error-log class="errLog-container right-menu-item hover-effect" />

        <div>{{ $t('loanMarket.loanMarket8') + ': ' }}</div> <!-- 贷超类型 -->
        <el-select
          v-model="marketType"
          filterable
          clearable
          size="mini"
          style="width: 140px; margin: 0 10px 0 5px;"
          :placeholder="$t('common.common108')"
          @change="marketChange"
        > <!-- 全部 -->
          <el-option
            v-for="item in marketTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <message-tip id="message-tip" class="right-menu-item" />

        <el-tooltip :content="$t('navbar.langSelect')" effect="dark" placement="bottom"> <!-- 选择语言 -->
          <lang-select class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span style="color: #001528;">{{ loginName }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.home') }}   <!-- 首页 -->
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>    <!-- 退出登录 -->
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import LangSelect from '@/components/LangSelect'
import MessageTip from '@/components/MessageTip'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    LangSelect,
    MessageTip
  },
  data() {
    return {
      loginName: '',

      marketType: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'marketTypeOptions'
    ])
  },
  mounted() {
    this.marketType = this.sessionData('get', 'currentMarketId') ? this.sessionData('get', 'currentMarketId') * 1 : ''
    const loginUser = this.sessionData('get', 'login_user')
    this.loginName = loginUser.loginName
  },
  methods: {
    marketChange(e) {
      this.sessionData('set', 'currentMarketId', e)
      window.location.reload()
    },

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout', this)
      this.$router.push(`/login`)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    @media screen and (max-width: 750px) {
      margin-left: -1000px;
    }
  }

  .right-menu {
    float: right;
    display: flex;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    ::v-deep .el-input--mini .el-input__icon {
      line-height: 53px;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 26px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        font-size: 16px;

        // .user-avatar {
        //   cursor: pointer;
        //   width: 40px;
        //   height: 40px;
        //   border-radius: 10px;
        // }

        .el-icon-caret-bottom {
          cursor: pointer;
          // position: absolute;
          // right: -20px;
          // top: 25px;
          // font-size: 12px;
        }
      }
    }
  }
}
</style>
