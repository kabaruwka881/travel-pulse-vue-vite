<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineEmits(['select', 'close'])

const { tm } = useI18n()
const places = computed(() => tm('origin.items'))
</script>

<template>
  <div class="origin">
    <button class="origin__close" aria-label="Закрыть" @click="$emit('close')">
      ✕
    </button>

    <ul class="origin__list">
      <li v-for="place in places" :key="place.title">
        <button class="place" @click="$emit('select', place.value)">
          <span class="place__icon">{{ place.icon }}</span>
          <span class="place__text">
            <span class="place__title">{{ place.title }}</span>
            <span class="place__sub">{{ place.sub }}</span>
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.origin {
  position: relative;
  width: 412px;
  max-width: 90vw;
  padding: 20px 12px 16px;
}
.origin__close {
  position: absolute;
  top: 14px;
  right: 18px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: var(--color-text);
  font-size: 14px;
  line-height: 1;
}
.origin__close:hover {
  background: var(--color-surface);
}

.origin__list {
  max-height: 470px;
  overflow-y: auto;
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
