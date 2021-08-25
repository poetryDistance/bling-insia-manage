import route from './id/route'
import common from './id/common'
import sysManage from './id/sysManage'
import collector from './id/collector'
import collect from './id/collect'
import borrow from './id/borrow'
import userManage from './id/userManage'
import financial from './id/financial'
import risk from './id/risk'
import loanMarket from './id/loanMarket'
import theData from './id/theData'

export default {
  route,
  login: {
    title: 'Sistem Keuangan Micro Indonesia', /* 印尼小贷系统 */
    logIn: 'Masuk', /* 登录 */
    userName: 'Akun', /* 账号 */
    password: 'Kata Sandi', /* 密码 */
    validateCode: 'Kode Verifikasi', /* 验证码 */
    iptUserName: 'Masukkan nama pengguna', /* 请输入用户名 */
    pwdNumber: 'Password tidak boleh kurang dari 6 karakter', /* 密码不能少于6位 */
    iptVaildateCode: 'Masukkan kode verifikasi' /* 请输入验证码 */
  },
  navbar: {
    home: 'Depan', /* 首页 */
    logOut: 'Keluar', /* 退出登录 */
    profile: 'Profil', /* 个人中心 */
    sidebarLogo: 'Sistem manajemen BlingInsia', /* BlingInsia 后台管理系统 */
    langSelect: 'Pilih Bahasa' /* 选择语言 */
  },
  tagsView: {
    refresh: 'Segarkan', /* 刷新 */
    close: 'Tutup', /* 关闭 */
    closeOthers: 'Tutup Lainnya', /* 关闭其它 */
    closeAll: 'Tutup Semua' /* 关闭所有 */
  },
  common,
  sysManage,
  collector,
  collect,
  borrow,
  userManage,
  financial,
  risk,
  loanMarket,
  theData
}
