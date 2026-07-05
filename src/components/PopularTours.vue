<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import TourCard from './TourCard.vue'

import disneyland from '../assets/images/tour-disneyland.jpg'
import coliseum from '../assets/images/tour-coliseum.jpg'
import tanahLot from '../assets/images/tour-tanah-lot.jpg'
import olkhon from '../assets/images/tour-olkhon.jpg'
import greatWall from '../assets/images/tour-great-wall.jpg'
import burjKhalifa from '../assets/images/tour-burj-khalifa.jpg'

const { tm } = useI18n()

const meta = [
  { image: disneyland, rating: '4.7' },
  { image: coliseum, rating: '4.2' },
  { image: tanahLot, rating: '5.0' },
  { image: olkhon, rating: '4.0' },
  { image: greatWall, rating: '4.1' },
  { image: burjKhalifa, rating: '4.8' },
]
const tours = computed(() =>
  tm('tours.items').map((item, i) => ({ ...meta[i], location: item.location, title: item.title })),
)
</script>

<template>
  <section class="tours container">
    <header class="tours__head">
      <h2>{{ $t('tours.title') }}</h2>
      <a href="#" class="see-all">{{ $t('tours.seeAll') }}</a>
    </header>

    <div class="tours__grid">
      <TourCard
        v-for="(tour, i) in tours"
        :key="i"
        :image="tour.image"
        :location="tour.location"
        :title="tour.title"
        :rating="tour.rating"
      />
    </div>
  </section>
</template>

<style scoped>
.tours {
  padding-top: 72px;
}
.tours__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 36px;
}
.tours__head h2 {
  font-size: 30px;
  font-weight: 800;
  color: var(--color-heading);
}
.see-all {
  font-size: 16px;
  color: var(--color-text);
}
.see-all:hover {
  text-decoration: underline;
}

.tours__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}

@media (max-width: 1000px) {
  .tours__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }
}
@media (max-width: 640px) {
  .tours__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .see-all {
    display: none;
  }
}
</style>
