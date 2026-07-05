<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['apply', 'close'])

const { t, tm, locale } = useI18n()
const count = ref(7)

function dec() {
  if (count.value > 1) count.value--
}
function inc() {
  if (count.value < 30) count.value++
}

function pluralize(n) {
  const forms = tm('nights.forms')
  if (locale.value === 'ru') {
    const m10 = n % 10
    const m100 = n % 100
    if (m10 === 1 && m100 !== 11) return forms[0]
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return forms[1]
    return forms[2]
  }
  return n === 1 ? forms[0] : forms[1]
}

const summary = computed(() => `${count.value} ${pluralize(count.value)}`)
</script>

<template>
  <div class="nights">
    <button class="nights__close" aria-label="Закрыть" @click="$emit('close')">✕</button>
    <h3 class="nights__title">{{ t('nights.title') }}</h3>

    <div class="stepper">
      <button class="stepper__btn" :disabled="count <= 1" @click="dec">−</button>
      <span class="stepper__val">{{ summary }}</span>
      <button class="stepper__btn" :disabled="count >= 30" @click="inc">+</button>
    </div>

    <button class="apply" @click="emit('apply', summary)">{{ t('nights.done') }}</button>
  </div>
</template>

<style scoped>
.nights {
  position: relative;
  width: 300px;
  max-width: 90vw;
  padding: 22px 20px 18px;
}
.nights__close {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 14px;
  color: var(--color-text);
}
.nights__close:hover {
  background: var(--color-surface);
}
.nights__title {
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 18px;
}
.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  margin-bottom: 18px;
}
.stepper__btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  font-size: 22px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stepper__btn:disabled {
  border-color: var(--color-border-soft);
  color: #c7c7cc;
  cursor: default;
}
.stepper__val {
  min-width: 90px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.apply {
  width: 100%;
  background: var(--color-blue-bright);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 11px;
  border-radius: 10px;
}
</style>
