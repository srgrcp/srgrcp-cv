<template>
  <nuxt-link
    class="w-full h-52 md:max-w-xl md:h-72 overflow-hidden rounded-lg shadow-lg shadow-stone-900/50 dark:shadow-stone-100/10 flex justify-center items-center relative transition ease-in-out hover:scale-105 hover:rotate-2 m-4"
    :to="localePath({ name: 'blog-article', params: { article: article.slug } })"
  >
    <img class="object-cover min-h-full min-w-full" :src="article.image" :alt="article.title">
    <div class="absolute bottom-0 left-0 w-full bg-stone-800/30 p-2 text-white">
      <p class="font-semibold truncate">{{ article.title }}</p>
      <p class="text-sm text-gray-300">{{ formatDate(article.createdAt) }}</p>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date: string) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(this.$i18n.locale, options as any)
    }
 }
})
</script>
