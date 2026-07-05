<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  active: { type: Boolean, default: false },

  popupAlign: { type: String, default: 'left' },
})

defineEmits(['toggle'])
</script>

<template>
  <div class="field" :class="{ 'field--active': active }">
    <button type="button" class="field__btn" @click="$emit('toggle')">
      <span class="field__label">{{ label }}</span>
      <span class="field__value" :class="{ 'is-placeholder': !value }">
        {{ value || placeholder }}
      </span>
    </button>

    <div
      v-if="active"
      class="field__popup"
      :class="`field__popup--${popupAlign}`"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.field {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
}

.field__btn {
  width: 100%;
  height: 93px;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: #fff;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.field__btn:hover {
  border-color: var(--color-primary);
}
.field--active .field__btn {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(0, 77, 191, 0.25);
}

.field__label {
  font-size: 12px;
  color: var(--color-text);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.field__value {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.field__value.is-placeholder {
  font-weight: 500;
  color: var(--color-text);
}

.field__popup {
  position: absolute;
  top: calc(100% + 10px);
  z-index: 40;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 30px;
  box-shadow: var(--shadow-popup);
}
.field__popup--left {
  left: 0;
}
.field__popup--center {
  left: 50%;
  transform: translateX(-50%);
}
.field__popup--right {
  right: 0;
}

@media (max-width: 1100px) {
  .field__btn {
    height: 80px;
  }
}
</style>
