<template>
  <div class="w-full bg-slate-100">
    <div class="container mx-auto flex justify-end">
      <a class="mini-nav-item" href="https://github.com/srgrcp/srgrcp-cv">Github</a>
      <a class="mini-nav-item" href="https://www.linkedin.com/in/srgrcp/">LinkedIn</a>
      <div class="group mini-nav-item relative text-left">
        <span class="flex">
          {{ $t('app.language') }}
          <svg class="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
        <div class="hidden group-hover:block origin-top-right absolute right-0 mt-2 w-48 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="w-full" role="none">
            <nuxt-link
              v-for="locale in $i18n.locales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
              class="dropdown-item"
              role="menuitem"
              tabindex="-1"
            >{{ locale.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LocaleObject } from '@nuxtjs/i18n'
import Vue from 'vue'
export default Vue.extend({
  computed: {
    availableLocales() {
      const locales: LocaleObject[] = this.$i18n.locales as LocaleObject[];
      return locales.filter((locale: LocaleObject) => locale.code !== this.$i18n.locale)
    },
    currentLocale() {
      const locales: LocaleObject[] = this.$i18n.locales as LocaleObject[];
      return locales.find((locale: LocaleObject) => locale.code === this.$i18n.locale)
    },
  },
})
</script>

<style lang="postcss" scoped>
.mini-nav-item {
  @apply py-2 px-4 text-sm hover:underline hover:bg-white;
}
.dropdown-item {
  @apply block py-2 px-4 text-sm text-gray-700 hover:underline hover:bg-slate-100;
}
</style>
