import { createI18n } from 'vue-i18n'
import ru from './locales/ru.js'
import en from './locales/en.js'

const saved = localStorage.getItem('locale')
const initial = saved || 'ru'

export const SUPPORTED = ['ru', 'en', 'zh']

export const i18n = createI18n({
  legacy: false,
  locale: initial,
  fallbackLocale: 'en',
  messages: { ru, en, zh: en },
})

export function setLocale(code) {
  i18n.global.locale.value = code
  localStorage.setItem('locale', code)
  document.documentElement.lang = code
}
