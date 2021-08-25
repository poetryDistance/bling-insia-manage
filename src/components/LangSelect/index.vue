<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='id'" command="id">
        Indonesia
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      if (lang === 'zh') {
        document.title = 'BlingInsia 后台管理系统'
      } else {
        document.title = 'Sistem manajemen latar belakang'
      }
      this.$store.dispatch('app/setLanguage', lang)
    }
  }
}
</script>
