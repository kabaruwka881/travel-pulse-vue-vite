<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const { locale } = useI18n()

const LABELS = { ru: 'RUS', en: 'ENG', zh: '中国人' }
const ALL = ['ru', 'en', 'zh']

const open = ref(false)

function choose(code) {
  setLocale(code)
  open.value = false
}
</script>

<template>
  <div class="lang">
    <button class="lang__btn" @click="open = !open">
      <span>{{ LABELS[locale] }}</span>
    </button>

    <template v-if="open">
      <div class="lang__backdrop" @click="open = false"></div>
      <ul class="lang__menu">
        <li v-for="code in ALL.filter((c) => c !== locale)" :key="code">
          <button @click="choose(code)">{{ LABELS[code] }}</button>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
}
.lang__btn {
  display: flex;
  align-items: center;
  color: var(--on-primary);
  font-size: 16px;
  font-weight: 600;
}

.lang__backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
}
.lang__menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 55;
  background: var(--color-accent);
  border-radius: 12px;
  padding: 6px;
  min-width: 96px;
  box-shadow: var(--shadow-popup);
}
.lang__menu button {
  width: 100%;
  padding: 8px 14px;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
.lang__menu button:hover {
  background: rgba(255, 255, 255, 0.18);
}
</style>
