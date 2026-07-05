<script setup>
import logo from '../assets/images/logo.png'
import icSearch from '../assets/icons/ic-search.png'

import icLogin from '../assets/icons/ic-globe.png'
import LanguageSwitcher from './LanguageSwitcher.vue'

defineEmits(['login'])
</script>

<template>
  <div class="topbar container">
    <a class="brand" href="#">
      <img :src="logo" alt="Travel Pulse" class="brand__logo" />
      <span class="brand__name">Travel<br />Pulse</span>
    </a>

    <form class="site-search" @submit.prevent>
      <input type="text" :placeholder="$t('nav.searchPlaceholder')" :aria-label="$t('nav.searchPlaceholder')" />
      <button type="submit" class="site-search__btn" :aria-label="$t('nav.searchPlaceholder')">
        <img :src="icSearch" alt="" />
      </button>
    </form>

    <div class="actions">
      <LanguageSwitcher />

      <button class="account" @click="$emit('login')">
        <img :src="icLogin" alt="" />
        <span>{{ $t('nav.login') }}</span>
      </button>

      <button class="burger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-top: 16px;
  padding-bottom: 8px;
  color: var(--on-primary);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.brand__logo {
  width: 52px;
  height: 52px;
  object-fit: contain;
}
.brand__name {
  font-weight: 800;
  font-size: 20px;
  line-height: 1.05;
  color: var(--on-primary);
}

.site-search {
  flex: 1;
  position: relative;
  max-width: 1110px;
}
.site-search input {
  width: 100%;
  height: 46px;
  border: none;
  border-radius: var(--radius);
  padding: 0 52px 0 20px;
  background: #fff;
  color: var(--color-text);
  font-size: 16px;
}
.site-search input:focus {
  outline: 2px solid var(--color-blue-bright);
}
.site-search__btn {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.site-search__btn img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.actions {
  display: flex;
  align-items: center;
  gap: 22px;
  flex-shrink: 0;
}
.account {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--on-primary);
  font-size: 16px;
  font-weight: 600;
}
.account img {
  width: 34px;
  height: 34px;
}
.burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 6px 2px;
}
.burger span {
  display: block;
  width: 30px;
  height: 3px;
  border-radius: 2px;
  background: var(--on-primary);
}

@media (max-width: 768px) {
  .site-search {
    display: none;
  }
  .topbar {
    gap: 12px;
    justify-content: space-between;
  }
  .brand__logo {
    width: 58px;
    height: 58px;
  }
  .brand__name {
    font-size: 22px;
  }
  .actions {
    gap: 14px;
  }
}
</style>
