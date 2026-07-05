<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineEmits(['select', 'close'])

const { t, tm } = useI18n()

const options = computed(() => [
  { icon: '🔍', title: t('destination.everywhere'), value: t('destination.everywhereValue') },
  { icon: '🔀', title: t('destination.multicity'), value: t('destination.multicityValue') },
])
const cities = computed(() => tm('destination.items'))
</script>

<template>
  <div class="dest">
    <button class="dest__close" aria-label="Закрыть" @click="$emit('close')">
      ✕
    </button>

    <ul class="dest__options">
      <li v-for="opt in options" :key="opt.title">
        <button class="opt" @click="$emit('select', opt.value)">
          <span class="opt__icon">{{ opt.icon }}</span>
          <span class="opt__title">{{ opt.title }}</span>
        </button>
      </li>
    </ul>

    <div class="dest__divider"></div>

    <ul class="dest__list">
      <li v-for="city in cities" :key="city.title">
        <button class="place" @click="$emit('select', city.value)">
          <span class="place__icon">📍</span>
          <span class="place__text">
            <span class="place__title">{{ city.title }}</span>
            <span class="place__sub">{{ city.sub }}</span>
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dest {
  position: relative;
  width: 360px;
  max-width: 90vw;
  padding: 20px 12px 16px;
}
.dest__close {
  position: absolute;
  top: 14px;
  right: 18px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: var(--color-text);
  font-size: 14px;
}
.dest__close:hover {
  background: var(--color-surface);
}

.opt {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  color: var(--color-blue-bright);
  font-weight: 600;
  font-size: 16px;
}
.opt:hover {
  background: var(--color-surface);
}
.opt__icon {
  width: 22px;
  text-align: center;
}

.dest__divider {
  height: 1px;
  background: var(--color-border-soft);
  margin: 8px 12px;
}

.place {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 12px;
  border-radius: 12px;
  text-align: left;
}
.place:hover {
  background: var(--color-surface);
}
.place__icon {
  font-size: 20px;
  width: 26px;
  text-align: center;
  flex-shrink: 0;
}
.place__text {
  display: flex;
  flex-direction: column;
}
.place__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}
.place__sub {
  font-size: 13px;
  color: var(--color-text-muted);
}
</style>
