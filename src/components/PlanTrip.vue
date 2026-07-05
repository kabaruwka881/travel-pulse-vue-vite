<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

const tabs = computed(() => tm('plan.tabs'))
const links = computed(() => tm('plan.links'))

const activeIndex = ref(0)
</script>

<template>
  <section class="plan container">
    <h2 class="plan__title">{{ $t('plan.title') }}</h2>

    <div class="plan__tabs">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        class="tab"
        :class="{ 'tab--active': i === activeIndex }"
        @click="activeIndex = i"
      >
        {{ tab }}
      </button>
    </div>

    <ul class="plan__links">
      <li v-for="(link, i) in links" :key="i">
        <a href="#">{{ link }}</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.plan {
  padding-top: 80px;
  padding-bottom: 64px;
}
.plan__title {
  font-size: 30px;
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 24px;
}
.plan__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 28px;
}
.tab {
  padding: 8px 22px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-size: 15px;
  color: var(--color-text);
  transition:
    background 0.15s,
    color 0.15s;
}
.tab--active,
.tab:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.plan__links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px 40px;
}
.plan__links a {
  font-size: 16px;
  color: var(--color-text);
}
.plan__links a:hover {
  color: var(--color-blue-bright);
  text-decoration: underline;
}

@media (max-width: 800px) {
  .plan__links {
    grid-template-columns: 1fr;
  }
}
</style>
