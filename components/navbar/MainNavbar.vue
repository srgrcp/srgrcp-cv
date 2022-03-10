<template>
  <div class="w-full relative dark:bg-stone-900 dark:text-stone-50">
    <div class="container mx-auto flex justify-center">
      <div class="flex md:hidden flex-grow">
        <button class="px-4" v-on:focusout.prevent="close()" @focus="open()">
          <svg class="w-6 h-6 text-stone-700 dark:text-stone-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>

      <nuxt-link class="nav-item uppercase text-sm" :to="localePath('blog')">
        <span>
          {{ $t('app.blog') }}
        </span>
      </nuxt-link>
      
      <nuxt-link class="h-16 overflow-visible p-2 flex justify-center items-center hover:bg-stone-100 dark:hover:bg-stone-800 group z-10" :to="localePath('/')">
        <img class="w-24 h-24 transition ease-in-out delay-75 group-hover:scale-110" src="/icon.png" :alt="$t('app.logoAlt')">
      </nuxt-link>
      
      <nuxt-link class="nav-item uppercase text-sm" :to="localePath('resume')">
        <span>
          {{ $t('app.resume') }}
        </span>
      </nuxt-link>

      <div class="flex md:hidden flex-grow">
        <div class="px-4">
          <div class="w-6 h-6"></div>
        </div>
      </div>
    </div>
    <div
      :class="isOpen ? 'absolute': 'hidden'"
      class="top-full left-0 w-full flex flex-col py-2 bg-stone-100 dark:bg-stone-800 dark:text-stone-100 shadow-lg border-b border-t border-stone-300 dark:border-stone-700">
      <nuxt-link class="w-full flex justify-center py-6 hover:bg-white hover:underline uppercase text-sm" :to="localePath('blog')">
        <span>
          {{ $t('app.blog') }}
        </span>
      </nuxt-link>

      <nuxt-link class="w-full flex justify-center py-6 hover:bg-white hover:underline uppercase text-sm" :to="localePath('resume')">
        <span>
          {{ $t('app.resume') }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-item {
  @apply hidden md:flex px-8 md:px-24 items-center justify-center font-semibold text-stone-700 dark:text-stone-100 hover:underline hover:bg-stone-100 dark:hover:bg-stone-800;
}
.nav-item span {
  @apply w-16 md:w-24 text-center;
}
</style>
