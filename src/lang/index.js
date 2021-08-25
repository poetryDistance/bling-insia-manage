import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { sessionData } from '@/utils/local'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementIdLocale from 'element-ui/lib/locale/lang/id' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import idLocale from './id'
import zhLocale from './zh'
Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  id: {
    ...idLocale,
    ...elementIdLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
export function getLanguage() {
  const chooseLanguage = sessionData('get', 'language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'id'
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
