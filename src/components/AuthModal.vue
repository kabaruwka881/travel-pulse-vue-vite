<script setup>
import { ref } from 'vue'
import logo from '../assets/images/logo.png'

defineEmits(['close', 'email'])

const remember = ref(false)
</script>

<template>
  <div class="auth">
    <div class="auth__backdrop" @click="$emit('close')"></div>

    <div class="auth__dialog" role="dialog" aria-modal="true">
      <button class="auth__close" aria-label="Закрыть" @click="$emit('close')">
        ✕
      </button>

      <div class="auth__brand">
        <img :src="logo" alt="" />
        <span>TravelPulse</span>
      </div>

      <h2 class="auth__heading">{{ $t('auth.heading') }}</h2>

      <div class="auth__methods">
        <button class="method" @click="$emit('email')">{{ $t('auth.email') }}</button>

        <button class="method">
          <svg class="brand-ic" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#1877F2"
              d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7v-3.5h3.1V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.24 2.7.24v3h-1.5c-1.5 0-2 .93-2 1.9v2.2h3.4l-.55 3.5h-2.9v8.4A12 12 0 0 0 24 12"
            />
          </svg>
          {{ $t('auth.facebook') }}
        </button>

        <button class="method">
          <svg class="brand-ic" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.3c0-.9-.08-1.5-.24-2.2H12v3.9h6.6c-.13 1.1-.85 2.7-2.44 3.8l-.02.15 3.5 2.7.24.03c2.24-2.06 3.54-5.1 3.54-8.4" />
            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.05 7.87-2.87l-3.75-2.9c-1 .7-2.35 1.2-4.12 1.2-3.14 0-5.8-2.06-6.75-4.9l-.14.01-3.64 2.8-.05.14A12 12 0 0 0 12 24" />
            <path fill="#FBBC05" d="M5.25 14.5A7.3 7.3 0 0 1 4.86 12c0-.87.15-1.7.38-2.5l-.006-.16-3.68-2.85-.12.06A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4z" />
            <path fill="#EB4335" d="M12 4.75c2.23 0 3.73.96 4.6 1.77l3.35-3.27C17.9 1.2 15.2 0 12 0A12 12 0 0 0 1.28 6.6l3.96 3.07C6.2 6.8 8.86 4.75 12 4.75" />
          </svg>
          {{ $t('auth.google') }}
        </button>

        <button class="method">
          <svg class="brand-ic" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#000"
              d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.9-1.21-1.77-3.09-2-3.76-2.03-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.9-1.74.03-3.35 1.01-4.24 2.57-1.81 3.14-.46 7.78 1.3 10.32.86 1.24 1.88 2.63 3.22 2.58 1.29-.05 1.78-.83 3.34-.83 1.56 0 2 .83 3.37.81 1.39-.03 2.27-1.26 3.12-2.51.98-1.44 1.39-2.83 1.41-2.9-.03-.01-2.7-1.04-2.73-4.11M14.6 4.8c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-3 1.54-.66.76-1.24 1.98-1.08 3.14 1.14.09 2.3-.58 3.02-1.43" />
          </svg>
          {{ $t('auth.apple') }}
        </button>
      </div>

      <label class="auth__remember">
        <input type="checkbox" v-model="remember" />
        <span>{{ $t('auth.remember') }}</span>
      </label>

      <p class="auth__terms">
        {{ $t('auth.terms') }}
        <a href="#">{{ $t('auth.termsLink') }}</a>
        {{ $t('auth.and') }}
        <a href="#">{{ $t('auth.privacyLink') }}</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth__backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.25);
}
.auth__dialog {
  position: fixed;
  z-index: 101;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 420px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 90px);
  overflow-y: auto;
  background: #fff;
  border-radius: 15px;
  box-shadow: var(--shadow-popup);
  padding: 26px 32px 30px;
}

.auth__close {
  position: absolute;
  top: 22px;
  right: 24px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 18px;
  color: var(--color-text);
}
.auth__close:hover {
  background: var(--color-surface);
}

.auth__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
}
.auth__brand img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}
.auth__brand span {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-accent);
}

.auth__heading {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 24px;
  line-height: 1.2;
}

.auth__methods {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.method {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 60px;
  border-radius: 10px;
  background: #d9d9d9;
  border: 1px solid rgba(0, 0, 0, 0.35);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  transition: filter 0.15s;
}
.method:hover {
  filter: brightness(0.95);
}
.brand-ic {
  width: 22px;
  height: 22px;
}

.auth__remember {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  font-size: 16px;
  color: var(--color-text);
  cursor: pointer;
}
.auth__remember input {
  width: 20px;
  height: 20px;
  accent-color: var(--color-primary);
}

.auth__terms {
  margin-top: 18px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text);
}
.auth__terms a {
  color: var(--color-blue-bright);
}
.auth__terms a:hover {
  text-decoration: underline;
}
</style>
