<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  current: { type: String, default: '' },
})
defineEmits(['select', 'close'])

const { tm } = useI18n()
const classes = computed(() => tm('travelClass.options'))
</script>

<template>
  <div class="cls">
    <button class="cls__close" aria-label="Закрыть" @click="$emit('close')">✕</button>

    <ul class="cls__list">
      <li v-for="item in classes" :key="item">
        <button
          class="opt"
          :class="{ 'opt--active': item === current }"
          @click="$emit('select', item)"
        >
          <span>{{ item }}</span>
          <span v-if="item === current" class="check">✓</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cls {
  position: relative;
  width: 260px;
  max-width: 90vw;
  padding: 20px 12px 14px;
}
.cls__close {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 14px;
  color: var(--color-text);
}
.cls__close:hover {
  background: var(--color-surface);
}
.cls__list {
  margin-top: 6px;
}
.opt {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 16px;
  color: var(--color-text);
}
.opt:hover {
  background: var(--color-surface);
}
.opt--active {
  font-weight: 600;
  color: var(--color-primary);
}
.check {
  color: var(--color-primary);
}
</style>
