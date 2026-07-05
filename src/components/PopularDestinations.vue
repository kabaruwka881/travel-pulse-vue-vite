<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useIsMobile } from '../composables/useIsMobile'

import paris from '../assets/images/dest-paris.png'
import rome from '../assets/images/dest-rome.png'
import bali from '../assets/images/dest-bali.png'
import baikal from '../assets/images/dest-baikal.png'

const { tm } = useI18n()
const isMobile = useIsMobile()

const images = [paris, rome, bali, baikal]
const destinations = computed(() =>
  tm('destinations.items').map((name, i) => ({ name, img: images[i] })),
)

const PER_PAGE = 2
const page = ref(0)
const pageCount = computed(() => Math.ceil(destinations.value.length / PER_PAGE))

const visible = computed(() =>
  isMobile.value
    ? destinations.value.slice(page.value * PER_PAGE, page.value * PER_PAGE + PER_PAGE)
    : destinations.value,
)

function prev() {
  page.value = (page.value - 1 + pageCount.value) % pageCount.value
}
function next() {
  page.value = (page.value + 1) % pageCount.value
}
</script>

<template>
  <section class="dests container">
    <header class="dests__head">
      <h2>{{ $t('destinations.title') }}</h2>
      <a href="#" class="see-all">{{ $t('destinations.seeAll') }}</a>
    </header>

    <div class="dests__viewport">
      <button v-if="isMobile" class="nav nav--prev" aria-label="Назад" @click="prev">‹</button>

      <div class="dests__grid">
        <a v-for="d in visible" :key="d.name" href="#" class="dest">
          <img :src="d.img" :alt="d.name" class="dest__img" />
          <span class="dest__name">{{ d.name }}</span>
        </a>
      </div>

      <button v-if="isMobile" class="nav nav--next" aria-label="Вперёд" @click="next">›</button>
    </div>

    <div class="dests__dots">
      <template v-if="isMobile">
        <span
          v-for="i in pageCount"
          :key="i"
          class="dot"
          :class="{ 'dot--active': i - 1 === page }"
        ></span>
      </template>
      <template v-else>
        <span class="dot dot--active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </template>
    </div>
  </section>
</template>

<style scoped>
.dests {
  padding-top: 56px;
}
.dests__head {
  position: relative;
  text-align: center;
  margin-bottom: 44px;
}
.dests__head h2 {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #000;
}
.see-all {
  position: absolute;
  right: 0;
  bottom: 4px;
  font-size: 16px;
  color: var(--color-text);
}
.see-all:hover {
  text-decoration: underline;
}

.dests__viewport {
  position: relative;
}
.dests__grid {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}
.dest {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  flex: 1 1 0;
  min-width: 0;
}
.dest__img {
  width: 270px;
  max-width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.2s;
}
.dest:hover .dest__img {
  transform: scale(1.03);
}
.dest__name {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
}

.nav {
  position: absolute;
  top: 0;
  bottom: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  font-size: 40px;
  line-height: 1;
  color: var(--color-text);
  z-index: 2;
}
.nav:hover {
  color: #000;
}
.nav--prev {
  left: -10px;
}
.nav--next {
  right: -10px;
}

.dests__dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 34px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #cfcfcf;
}
.dot--active {
  width: 22px;
  border-radius: 4px;
  background: var(--color-text);
}

@media (max-width: 768px) {
  .dests {
    padding-top: 40px;
  }
  .dests__head {
    margin-bottom: 28px;
  }
  .see-all {
    display: none;
  }
  .dests__viewport {
    padding: 0 30px;
  }
  .dests__grid {
    gap: 18px;
  }
}
</style>
