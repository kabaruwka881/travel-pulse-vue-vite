<script setup>
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['apply', 'close'])

const { t, tm, locale } = useI18n()

const counts = reactive({ adults: 1, children: 0, infants: 0 })
const MIN = { adults: 1, children: 0, infants: 0 }

const rows = computed(() => tm('travelers.rows'))

function dec(key) {
  if (counts[key] > MIN[key]) counts[key]--
}
function inc(key) {
  if (counts[key] < 9) counts[key]++
}

function pluralize(n) {
  const forms = tm('travelers.passengers')
  if (locale.value === 'ru') {
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return forms[0]
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
    return forms[2]
  }
  return n === 1 ? forms[0] : forms[1]
}

const summary = computed(() => {
  const total = counts.adults + counts.children + counts.infants
  return `${total} ${pluralize(total)}`
})
</script>

<template>
  <div class="trav">
    <button class="trav__close" aria-label="Закрыть" @click="$emit('close')">✕</button>

    <div v-for="row in rows" :key="row.key" class="row">
      <div class="row__text">
        <span class="row__title">{{ row.title }}</span>
        <span class="row__sub">{{ row.sub }}</span>
      </div>
      <div class="stepper">
        <button class="stepper__btn" :disabled="counts[row.key] <= MIN[row.key]" @click="dec(row.key)">
          −
        </button>
        <span class="stepper__val">{{ counts[row.key] }}</span>
        <button class="stepper__btn" :disabled="counts[row.key] >= 9" @click="inc(row.key)">
          +
        </button>
      </div>
    </div>

    <button class="apply" @click="emit('apply', summary)">{{ t('travelers.done') }}</button>
  </div>
</template>

<style scoped>
.trav {
  position: relative;
  width: 340px;
  max-width: 90vw;
  padding: 22px 20px 18px;
}
.trav__close {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 14px;
  color: var(--color-text);
}
.trav__close:hover {
  background: var(--color-surface);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}
.row + .row {
  border-top: 1px solid var(--color-border-soft);
}
.row__text {
  display: flex;
  flex-direction: column;
}
.row__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}
.row__sub {
  font-size: 13px;
  color: var(--color-text-muted);
}

.stepper {
  display: flex;
  align-items: center;
  gap: 14px;
}
.stepper__btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  font-size: 20px;
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
  min-width: 18px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}

.apply {
  width: 100%;
  margin-top: 16px;
  background: var(--color-blue-bright);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 11px;
  border-radius: 10px;
}
</style>
