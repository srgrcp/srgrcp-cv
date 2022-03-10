<template>
  <article
      class="
        prose prose-lg prose-gray mx-auto dark:text-stone-200
        prose-a:no-underline hover:prose-a:underline
        prose-a:text-blue-600 dark:prose-a:text-blue-500 dark:prose-invert
        dark:prose-pre:text-stone-200 dark:prose-code:text-stone-200 dark:prose-pre:!bg-stone-800
      ">
    <h1 class="font-semibold text-3xl">{{ article.title }}</h1>
    <p class="text-stone-500 dark:text-slate-400 my-3 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex !mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {{ formatDate(article.createdAt) }}
    </p>
    <div class="aspect-video rounded-lg shadow-lg w-full overflow-hidden flex justify-center items-center">
      <img class="object-cover min-h-full min-w-full" :src="article.image" :alt="article.title">
    </div>
    <NuxtContent
      :document="article"
    />
  </article>
</template>

<script lang="ts">
import { Article } from '@/store/seo';
import Vue from 'vue'

interface Data {
  article: Article;
}

interface Props {}

interface Computed {}

interface Methods {
  formatDate(date: string): string;
}

export default Vue.extend<Data, Methods, Computed, Props>({
  async asyncData({ app, $content, params }): Promise<{ article: Article }> {
    const slug = params.article;
    const [ article ] = await $content('blog', app.i18n.locale)
      .where({ slug } )
      .fetch() as unknown as Article[];

    console.log(article);
    return { article };
  },
  methods: {
    formatDate(date: string): string {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(this.$i18n.locale, options as any)
    }
  },
  head() {
    const article = this.article;
    return {
      title: `${article?.title} | ${this.$t("app.title").toString()}`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: article?.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: `${article?.title} | ${this.$t("app.title").toString()}`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: article?.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: article?.image,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `${this.$t('app.url')}${this.localeRoute(this.$route.path)?.path}`,
        },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: `${article?.title} | ${this.$t("app.title").toString()}`,
        },
        { hid: "twitter:card", name: "twitter:card", content: "summary" },
        { hid: "twitter:site", name: "twitter:site", content: "@srgrcp" },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: `${article?.title} | ${this.$t("app.title").toString()}`,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: article?.description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: article?.image,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: `${article?.title} | ${this.$t("app.title").toString()}`,
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: `${this.$t('app.url')}${this.localeRoute(this.$route.path)?.path}`,
        },
        { hid: "twitter:creator", name: "twitter:creator", content: "@srgrcp" },
        { hid: "theme-color", name: "theme-color", content: "#2e2e2e" },
        {
          hid: "msapplication-TileColor",
          name: "msapplication-TileColor",
          content: "#2e2e2e",
        },
        {
          hid: "apple-mobile-web-app-status-bar-style",
          name: "apple-mobile-web-app-status-bar-style",
          content: "#2e2e2e",
        },
        {
          hid: "application-name",
          name: "application-name",
          content: `${article?.title} | ${this.$t("app.title").toString()}`,
        },
        {
          hid: "msapplication-TileImage",
          name: "msapplication-TileImage",
          content: "/icon.png",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
    };
  },
})
</script>

<style lang="postcss">
.dark code {
  text-shadow: 0 1px #444!important;
}
.dark .token.operator {
  color: #E7E5E4;
  background: inherit!important;
}
.dark pre[class*="language-"]::selection,
.dark pre[class*="language-"] ::selection,
.dark code[class*="language-"]::selection,
.dark code[class*="language-"] ::selection {
  background: #afafaf!important;
  text-shadow: 0 1px #222!important;
}
</style>
