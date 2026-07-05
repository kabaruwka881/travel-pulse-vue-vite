<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
const columns = computed(() => tm('footer.columns'))

const emit = defineEmits(['login'])
const isLoginLink = (col, row) => col === 1 && row === 2
function onLink(col, row) {
  if (isLoginLink(col, row)) emit('login')
}
</script>

<template>
  <footer class="footer">
    <div class="footer__top container">
      <div v-for="(col, i) in columns" :key="i" class="footer__col">
        <a v-for="(link, j) in col" :key="j" href="#" @click.prevent="onLink(i, j)">
          {{ link }}
        </a>
      </div>

      <div class="footer__region">
        <button class="region-box">{{ $t('footer.region') }}</button>
      </div>
    </div>

    <div class="footer__bottom">{{ $t('footer.copyright') }}</div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-primary);
  color: var(--on-primary);
  margin-top: 24px;
}
.footer__top {
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  gap: 24px 40px;
  padding-top: 48px;
  padding-bottom: 48px;
}
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.footer__col a {
  font-size: 16px;
  color: var(--on-primary);
  opacity: 0.95;
}
.footer__col a:hover {
  text-decoration: underline;
}
.footer__region {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.region-box {
  background: #fff;
  color: var(--color-text);
  border-radius: 6px;
  padding: 9px 16px;
  font-size: 15px;
  white-space: nowrap;
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  text-align: center;
  padding: 18px 16px;
  font-size: 14px;
  font-style: italic;
  opacity: 0.9;
}

@media (max-width: 800px) {
  .footer__top {
    grid-template-columns: 1fr 1fr;
  }
  .footer__region {
    justify-content: flex-start;
  }
}
</style>
