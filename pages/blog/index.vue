<template>
  <div class="flex flex-col items-center">
    <h1 class="font-semibold text-3xl">{{ $t('blog.title') }}</h1>
    <div class="flex flex-wrap justify-center py-12">
      <ArticleCard
        v-for="article in articles"
        :key="article.slug"
        :article="article"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData({ app, $content}) {
    const articles = await $content('blog', app.i18n.locale)
      .sortBy('createdAt', 'desc')
      .only(['title', 'slug', 'createdAt', 'image', 'tags'])
      .fetch();

    return { articles };
  }
})
</script>
