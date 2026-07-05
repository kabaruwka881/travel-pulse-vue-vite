<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppHeader from '../components/AppHeader.vue'
import FlightSearch from '../components/FlightSearch.vue'
import PopularDestinations from '../components/PopularDestinations.vue'
import PopularTours from '../components/PopularTours.vue'
import PlanTrip from '../components/PlanTrip.vue'
import AppFooter from '../components/AppFooter.vue'
import AuthModal from '../components/AuthModal.vue'
import EmailAuthModal from '../components/EmailAuthModal.vue'

import icCar from '../assets/icons/ic-car.png'
import icFlight from '../assets/icons/ic-flight.png'
import icHotel from '../assets/icons/ic-hotel.png'

const { t } = useI18n()

const authView = ref('')

const filters = computed(() => [
  { icon: icCar, label: t('filters.car') },
  { icon: icFlight, label: t('filters.flights') },
  { icon: icHotel, label: t('filters.hotels') },
])
</script>

<template>
  <div class="home">
    <header class="hero">
      <AppHeader @login="authView = 'social'" />

      <div class="hero__body container">
        <div class="hero__filters">
          <button v-for="f in filters" :key="f.label" class="filter">
            <img :src="f.icon" alt="" />
            <span>{{ f.label }}</span>
          </button>
        </div>

        <h1 class="hero__title">{{ $t('hero.title') }}</h1>

        <FlightSearch @submit="authView = 'social'" />
      </div>
    </header>

    <main>
      <PopularDestinations />
      <PopularTours />
      <PlanTrip />
    </main>

    <AppFooter @login="authView = 'social'" />

    <AuthModal
      v-if="authView === 'social'"
      @email="authView = 'email'"
      @close="authView = ''"
    />
    <EmailAuthModal
      v-if="authView === 'email'"
      initial-mode="login"
      @close="authView = ''"
    />
  </div>
</template>

<style scoped>
.hero {
  background: var(--color-primary);
  padding-bottom: 40px;
}
.hero__body {
  padding-top: 8px;
}

.hero__filters {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}
.filter {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  color: var(--color-text);
  border-radius: 20px;
  padding: 9px 20px;
  font-size: 16px;
  font-weight: 600;
  transition: box-shadow 0.15s;
}
.filter:hover {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}
.filter img {
  width: 22px;
  height: 22px;
}

.hero__title {
  color: var(--on-primary);
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 28px;
}

@media (max-width: 1100px) {
  .hero__filters {
    flex-wrap: wrap;
  }
  .hero__title {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .hero__filters {
    display: none;
  }
  .hero__title {
    font-size: 34px;
    line-height: 1.15;
  }
}
</style>
