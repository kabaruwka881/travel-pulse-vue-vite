<script setup>
import { ref } from 'vue'
import logo from '../assets/images/logo.png'

const props = defineProps({
  initialMode: { type: String, default: 'login' },
})
defineEmits(['close'])

const mode = ref(props.initialMode)
const remember = ref(false)
const accept = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
})
</script>

<template>
  <div class="ea">
    <div class="ea__backdrop" @click="$emit('close')"></div>

    <div class="ea__dialog" role="dialog" aria-modal="true">
      <button class="ea__close" aria-label="Закрыть" @click="$emit('close')">✕</button>

      <div class="ea__brand">
        <img :src="logo" alt="" />
        <span>TravelPulse</span>
      </div>

      <h2 class="ea__title">
        {{ mode === 'login' ? $t('emailAuth.loginTitle') : $t('emailAuth.registerTitle') }}
      </h2>

      <form v-if="mode === 'register'" class="ea__form" @submit.prevent>
        <input v-model="form.firstName" class="ea__input" type="text" :placeholder="$t('emailAuth.firstName')" />
        <input v-model="form.lastName" class="ea__input" type="text" :placeholder="$t('emailAuth.lastName')" />
        <input v-model="form.email" class="ea__input" type="email" :placeholder="$t('emailAuth.email')" />
        <input v-model="form.password" class="ea__input" type="password" :placeholder="$t('emailAuth.password')" />
        <input v-model="form.confirm" class="ea__input" type="password" :placeholder="$t('emailAuth.confirm')" />

        <label class="ea__accept">
          <input type="checkbox" v-model="accept" />
          <span>
            {{ $t('emailAuth.acceptPre') }}
            <a href="#">{{ $t('emailAuth.acceptLink') }}</a>
          </span>
        </label>

        <button class="ea__submit" type="submit">{{ $t('emailAuth.registerBtn') }}</button>

        <p class="ea__switch">
          {{ $t('emailAuth.haveAccount') }}
          <button type="button" @click="mode = 'login'">{{ $t('emailAuth.loginLink') }}</button>
        </p>
      </form>

      <form v-else class="ea__form" @submit.prevent>
        <input v-model="form.email" class="ea__input" type="email" :placeholder="$t('emailAuth.email')" />
        <input v-model="form.password" class="ea__input" type="password" :placeholder="$t('emailAuth.password')" />

        <button class="ea__submit ea__submit--spaced" type="submit">{{ $t('emailAuth.loginBtn') }}</button>

        <label class="ea__remember">
          <input type="checkbox" v-model="remember" />
          <span>{{ $t('emailAuth.remember') }}</span>
        </label>

        <p class="ea__switch ea__switch--center">
          {{ $t('emailAuth.noAccount') }}
          <button type="button" @click="mode = 'register'">{{ $t('emailAuth.signupLink') }}</button>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.ea__backdrop {
  position: fixed;
  inset: 0;
  z-index: 110;
  background: rgba(0, 0, 0, 0.25);
}
.ea__dialog {
  position: fixed;
  z-index: 111;
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
  padding: 26px 34px 30px;
}

.ea__close {
  position: absolute;
  top: 20px;
  right: 22px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 18px;
  color: var(--color-text);
}
.ea__close:hover {
  background: var(--color-surface);
}

.ea__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.ea__brand img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
.ea__brand span {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-accent);
}

.ea__title {
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  color: var(--color-heading);
  margin-bottom: 22px;
}

.ea__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ea__input {
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  background: #f2f2f2;
  padding: 0 18px;
  font-size: 15px;
  color: var(--color-text);
}
.ea__input::placeholder {
  color: #8a8a8a;
}
.ea__input:focus {
  outline: 2px solid var(--color-primary);
  background: #fff;
}

.ea__accept {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: var(--color-text);
  cursor: pointer;
}
.ea__accept input {
  width: 18px;
  height: 18px;
  margin-top: 1px;
  accent-color: var(--color-primary);
  flex-shrink: 0;
}
.ea__accept a {
  color: var(--color-blue-bright);
}
.ea__accept a:hover {
  text-decoration: underline;
}

.ea__submit {
  height: 52px;
  border-radius: 12px;
  background: #d9d9d9;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  transition: filter 0.15s;
}
.ea__submit:hover {
  filter: brightness(0.95);
}
.ea__submit--spaced {
  margin: 10px auto 0;
  width: 60%;
}

.ea__remember {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: var(--color-text);
  cursor: pointer;
}
.ea__remember input {
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary);
}

.ea__switch {
  font-size: 14px;
  color: var(--color-text);
}
.ea__switch--center {
  text-align: center;
}
.ea__switch button {
  color: var(--color-blue-bright);
  font-size: 14px;
  font-weight: 600;
}
.ea__switch button:hover {
  text-decoration: underline;
}
</style>
