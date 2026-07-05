<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useIsMobile } from '../composables/useIsMobile'
import SearchField from './search/SearchField.vue'
import OriginPopup from './search/OriginPopup.vue'
import DestinationPopup from './search/DestinationPopup.vue'
import DatePopup from './search/DatePopup.vue'
import TravellersPopup from './search/TravellersPopup.vue'
import ClassPopup from './search/ClassPopup.vue'
import NightsPopup from './search/NightsPopup.vue'

import icPin from '../assets/icons/ic-pin.png'
import icDate from '../assets/icons/ic-date.png'
import icNights from '../assets/icons/ic-nights.png'
import icPeople from '../assets/icons/ic-people.png'
import icClass from '../assets/icons/ic-class.png'
import icChevron from '../assets/icons/ic-chevron.png'

const { t } = useI18n()

const emit = defineEmits(['submit'])

const isMobile = useIsMobile()

const openField = ref(null)

const picked = reactive({
  from: null,
  to: null,
  depart: null,
  return: null,
  nights: null,
  travellers: null,
  class: null,
})

const values = computed(() => ({
  from: picked.from ?? t('search.fromValue'),
  to: picked.to ?? '',
  depart: picked.depart ?? '',
  return: picked.return ?? '',
  travellers: picked.travellers ?? t('search.travelersValue'),
  class: picked.class ?? t('search.classValue'),
}))

const fromCity = computed(() => values.value.from.replace(/\s*\([^)]*\)\s*$/, ''))

function toggle(field) {
  openField.value = openField.value === field ? null : field
}
function close() {
  openField.value = null
}
function set(field, value) {
  picked[field] = value
  close()
}
</script>

<template>
  <div class="search">
    <div v-if="openField" class="search__backdrop" @click="close"></div>

    <div v-if="!isMobile" class="search__row">
      <SearchField
        :label="$t('search.from')"
        :value="values.from"
        :active="openField === 'from'"
        @toggle="toggle('from')"
      >
        <OriginPopup @select="set('from', $event)" @close="close" />
      </SearchField>

      <SearchField
        :label="$t('search.to')"
        :value="values.to"
        :placeholder="$t('search.toPlaceholder')"
        :active="openField === 'to'"
        @toggle="toggle('to')"
      >
        <DestinationPopup @select="set('to', $event)" @close="close" />
      </SearchField>

      <SearchField
        :label="$t('search.there')"
        :value="values.depart"
        :placeholder="$t('search.datePlaceholder')"
        popup-align="center"
        :active="openField === 'depart'"
        @toggle="toggle('depart')"
      >
        <DatePopup :hint="$t('calendar.hintDepart')" @apply="set('depart', $event)" @close="close" />
      </SearchField>

      <SearchField
        :label="$t('search.back')"
        :value="values.return"
        :placeholder="$t('search.datePlaceholder')"
        popup-align="center"
        :active="openField === 'return'"
        @toggle="toggle('return')"
      >
        <DatePopup :hint="$t('calendar.hintReturn')" @apply="set('return', $event)" @close="close" />
      </SearchField>

      <SearchField
        :label="$t('search.travelers')"
        :value="values.travellers"
        popup-align="right"
        :active="openField === 'travellers'"
        @toggle="toggle('travellers')"
      >
        <TravellersPopup @apply="set('travellers', $event)" @close="close" />
      </SearchField>

      <SearchField
        :label="$t('search.travelClass')"
        :value="values.class"
        popup-align="right"
        :active="openField === 'class'"
        @toggle="toggle('class')"
      >
        <ClassPopup :current="values.class" @select="set('class', $event)" @close="close" />
      </SearchField>

      <button class="search__submit" type="button" @click="emit('submit')">
        {{ $t('search.submit') }}
      </button>
    </div>

    <div v-else class="msearch">
      <button class="morigin" type="button" @click="toggle('from')">
        <span>{{ $t('search.fromPrefix') }} {{ fromCity }}</span>
        <img :src="icChevron" class="morigin__chev" alt="" />
      </button>

      <button
        class="mfield mfield--wide"
        :class="{ 'is-empty': !picked.to }"
        type="button"
        @click="toggle('to')"
      >
        <img :src="icPin" class="mfield__ic" alt="" />
        <span>{{ picked.to || $t('search.destPlaceholder') }}</span>
      </button>

      <div class="mgrid">
        <button
          class="mfield"
          :class="{ 'is-empty': !picked.depart }"
          type="button"
          @click="toggle('depart')"
        >
          <img :src="icDate" class="mfield__ic" alt="" />
          <span>{{ picked.depart || $t('search.dateMobile') }}</span>
        </button>

        <button
          class="mfield"
          :class="{ 'is-empty': !picked.nights }"
          type="button"
          @click="toggle('nights')"
        >
          <img :src="icNights" class="mfield__ic" alt="" />
          <span>{{ picked.nights || $t('search.nights') }}</span>
        </button>

        <button
          class="mfield"
          :class="{ 'is-empty': !picked.travellers }"
          type="button"
          @click="toggle('travellers')"
        >
          <img :src="icPeople" class="mfield__ic" alt="" />
          <span>{{ picked.travellers || $t('search.people') }}</span>
        </button>

        <button
          class="mfield"
          :class="{ 'is-empty': !picked.class }"
          type="button"
          @click="toggle('class')"
        >
          <img :src="icClass" class="mfield__ic" alt="" />
          <span>{{ picked.class || $t('search.classMobile') }}</span>
        </button>
      </div>

      <button class="msearch__submit" type="button" @click="emit('submit')">
        {{ $t('search.submitMobile') }}
      </button>

      <div v-if="openField" class="msheet" @click.stop>
        <OriginPopup v-if="openField === 'from'" @select="set('from', $event)" @close="close" />
        <DestinationPopup v-else-if="openField === 'to'" @select="set('to', $event)" @close="close" />
        <DatePopup v-else-if="openField === 'depart'" :hint="$t('calendar.hintDepart')" @apply="set('depart', $event)" @close="close" />
        <NightsPopup v-else-if="openField === 'nights'" @apply="set('nights', $event)" @close="close" />
        <TravellersPopup v-else-if="openField === 'travellers'" @apply="set('travellers', $event)" @close="close" />
        <ClassPopup v-else-if="openField === 'class'" :current="picked.class || ''" @select="set('class', $event)" @close="close" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.search {
  position: relative;
}

.search__backdrop {
  position: fixed;
  inset: 0;
  z-index: 30;
}

.search__row {
  position: relative;
  z-index: 35;
  display: flex;
  align-items: stretch;
  gap: 20px;
}

.search__submit {
  flex: 0 0 140px;
  align-self: center;
  height: 65px;
  border-radius: 20px;
  background: var(--color-accent);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  transition: background 0.15s;
}
.search__submit:hover {
  background: var(--color-accent-hover);
}

@media (max-width: 1100px) {
  .search__row {
    flex-wrap: wrap;
    gap: 12px;
  }
  .search__row > * {
    flex: 1 1 calc(33.333% - 12px);
  }
  .search__submit {
    flex-basis: 100%;
    width: 100%;
  }
}

.msearch {
  position: relative;
  z-index: 35;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.morigin {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 8px;
  color: var(--on-primary);
  font-size: 18px;
  font-weight: 600;
  padding: 2px 0;
}
.morigin__chev {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.mfield {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  min-width: 0;
  padding: 0 16px;
  background: #fff;
  border-radius: 15px;
  text-align: left;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  overflow: hidden;
}
.mfield span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mfield.is-empty span {
  color: #8a8a8a;
  font-weight: 400;
}
.mfield__ic {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}

.mgrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.msearch__submit {
  height: 52px;
  border-radius: 15px;
  background: var(--color-accent);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  transition: background 0.15s;
}
.msearch__submit:hover {
  background: var(--color-accent-hover);
}

.msheet {
  position: fixed;
  z-index: 40;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  box-shadow: var(--shadow-popup);
  max-height: 88vh;
  overflow-y: auto;
}
</style>
