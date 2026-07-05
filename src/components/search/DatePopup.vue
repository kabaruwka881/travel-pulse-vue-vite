<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  hint: { type: String, default: '' },
})
const emit = defineEmits(['apply', 'close'])

const { t, tm } = useI18n()
const WEEK = computed(() => tm('calendar.weekdays'))
const MONTHS = computed(() => tm('calendar.months'))
const MONTHS_GEN = computed(() => tm('calendar.monthsGen'))
const FLEX = computed(() => tm('calendar.flexOptions'))

const today = new Date()
const activeTab = ref('exact')

const viewYear = ref(2026)
const viewMonth = ref(5)

const selected = ref(null)

function buildMonth(year, month) {
  const first = new Date(year, month, 1)
  const startOffset = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  return cells
}

const months = computed(() => {
  const list = []
  for (let i = 0; i < 2; i++) {
    const m = viewMonth.value + i
    const year = viewYear.value + Math.floor(m / 12)
    const month = ((m % 12) + 12) % 12
    list.push({ year, month, label: MONTHS.value[month], cells: buildMonth(year, month) })
  }
  return list
})

function shift(step) {
  const m = viewMonth.value + step
  viewYear.value += Math.floor(m / 12)
  viewMonth.value = ((m % 12) + 12) % 12
}

function isSameDay(a, b) {
  return (
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
const isToday = (d) => isSameDay(d, today)
const isSelected = (d) => isSameDay(d, selected.value)
const isPast = (d) => d < new Date(today.getFullYear(), today.getMonth(), today.getDate())

function pick(d) {
  if (!d || isPast(d)) return
  selected.value = d
}

function apply() {
  if (!selected.value) return
  const d = selected.value
  emit('apply', `${d.getDate()} ${MONTHS_GEN.value[d.getMonth()]}`)
}
</script>

<template>
  <div class="cal">
    <div class="cal__top">
      <button class="chip">{{ t('calendar.roundtrip') }} ▾</button>
      <div class="tabs">
        <button :class="{ active: activeTab === 'exact' }" @click="activeTab = 'exact'">
          {{ t('calendar.tabExact') }}
        </button>
        <button :class="{ active: activeTab === 'flexible' }" @click="activeTab = 'flexible'">
          {{ t('calendar.tabFlexible') }}
        </button>
      </div>
      <button class="cal__close" aria-label="Закрыть" @click="$emit('close')">✕</button>
    </div>

    <div v-if="activeTab === 'exact'" class="cal__body">
      <button class="nav nav--prev" aria-label="prev" @click="shift(-1)">‹</button>
      <button class="nav nav--next" aria-label="next" @click="shift(1)">›</button>

      <div v-for="m in months" :key="m.year + '-' + m.month" class="month">
        <div class="month__title">{{ m.label }}</div>
        <div class="week">
          <span v-for="w in WEEK" :key="w">{{ w }}</span>
        </div>
        <div class="grid">
          <template v-for="(cell, i) in m.cells" :key="i">
            <span v-if="!cell" class="day day--empty"></span>
            <button
              v-else
              class="day"
              :class="{
                'day--today': isToday(cell),
                'day--selected': isSelected(cell),
                'day--past': isPast(cell),
              }"
              :disabled="isPast(cell)"
              @click="pick(cell)"
            >
              {{ cell.getDate() }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <div v-else class="cal__flexible">
      <p>{{ t('calendar.flexibleHint') }}</p>
      <div class="flex-opts">
        <button v-for="opt in FLEX" :key="opt">{{ opt }}</button>
      </div>
    </div>

    <div class="cal__footer">
      <span class="cal__hint">{{ hint }}</span>
      <button class="apply" :disabled="!selected" @click="apply">{{ t('calendar.apply') }}</button>
    </div>
  </div>
</template>

<style scoped>
.cal {
  position: relative;
  width: 558px;
  max-width: 92vw;
  padding: 20px 24px 18px;
}

.cal__top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.chip {
  font-size: 13px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 4px 10px;
  color: var(--color-text);
  white-space: nowrap;
}
.tabs {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 4px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 3px;
  max-width: 340px;
  margin: 0 auto;
}
.tabs button {
  flex: 1;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text);
  white-space: nowrap;
}
.tabs button.active {
  background: var(--color-primary);
  color: #fff;
}
.cal__close {
  position: absolute;
  top: 18px;
  right: 22px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 14px;
  color: var(--color-text);
}
.cal__close:hover {
  background: var(--color-surface);
}

.cal__body {
  position: relative;
}
.nav {
  position: absolute;
  top: 46px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 1;
  color: var(--color-text);
  z-index: 2;
}
.nav:hover {
  background: var(--color-surface);
}
.nav--prev {
  left: -6px;
}
.nav--next {
  right: -6px;
}

.month + .month {
  margin-top: 22px;
}
.month__title {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 14px;
  color: var(--color-heading);
}
.week,
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.week {
  margin-bottom: 8px;
}
.week span {
  text-align: center;
  font-size: 13px;
  color: var(--color-text-muted);
}
.grid {
  gap: 4px 0;
}
.day {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: var(--color-text);
  border-radius: 50%;
}
.day--empty {
  height: 38px;
}
.day:not(.day--past):not(.day--empty):hover {
  background: var(--color-surface);
}
.day--today {
  border: 1px solid var(--color-primary);
}
.day--selected {
  background: var(--color-primary);
  color: #fff;
}
.day--past {
  color: #c7c7cc;
  cursor: default;
}

.cal__flexible {
  padding: 20px 6px 28px;
  text-align: center;
}
.cal__flexible p {
  color: var(--color-text-muted);
  margin-bottom: 16px;
}
.flex-opts {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.flex-opts button {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 14px;
}
.flex-opts button:hover {
  border-color: var(--color-primary);
}

.cal__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
}
.cal__hint {
  font-size: 14px;
  color: var(--color-text-muted);
}
.apply {
  background: var(--color-blue-bright);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 26px;
  border-radius: 10px;
}
.apply:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
