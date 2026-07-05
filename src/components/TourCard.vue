<script setup>
import star from '../assets/icons/ic-star.png'

defineProps({
  image: { type: String, required: true },
  location: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: [Number, String], required: true },
})
</script>

<template>
  <article class="card">
    <div class="card__media">
      <img :src="image" :alt="location" />
    </div>
    <div class="card__body">
      <p class="card__location">{{ location }}</p>
      <h3 class="card__title">{{ title }}</h3>
      <div class="card__rating">
        <span>{{ rating }}</span>
        <img :src="star" alt="рейтинг" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}
.card:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
}
.card__media {
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 412 / 315;
}
.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__body {
  padding: 16px 4px 4px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card__location {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}
.card__title {
  font-size: 17px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
}
.card__rating {
  margin-top: auto;
  padding-top: 16px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}
.card__rating img {
  width: 20px;
  height: 20px;
}
</style>
