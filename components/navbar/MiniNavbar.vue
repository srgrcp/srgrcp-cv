<template>
  <div class="w-full bg-stone-100 dark:bg-black dark:text-stone-100">
    <div class="container mx-auto flex justify-end">
      <a class="mini-nav-item" href="https://github.com/srgrcp/srgrcp-cv">Github</a>
      <a class="mini-nav-item" href="https://www.linkedin.com/in/srgrcp/">LinkedIn</a>
      <div class="group mini-nav-item relative text-left">
        <span class="flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd" />
          </svg>
          <svg class="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
        <div class="hidden group-hover:block z-30 origin-top-right absolute right-0 mt-2 w-48 shadow-lg bg-white dark:bg-stone-900 dark:text-stone-100 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
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
  @apply py-2 px-4 text-sm hover:underline hover:bg-white dark:hover:bg-stone-900;
}
.dropdown-item {
  @apply block py-2 px-4 text-sm text-gray-700 dark:text-stone-100 hover:underline hover:bg-stone-100 dark:hover:bg-stone-800;
}
</style>
