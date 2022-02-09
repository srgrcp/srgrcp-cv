<template>
  <Section class="no-print">
    <div class="flex justify-between pb-4">
      <div>
        <a class="link" href="https://github.com/srgrcp/srgrcp-cv">Github</a>
      </div>
      <div>
        <a class="link" href="https://www.linkedin.com/in/srgrcp/">LinkedIn</a>
      </div>
      <div>
        <nuxt-link
          class="link"
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          >{{ locale.name }}</nuxt-link
        >
      </div>
    </div>
  </Section>
</template>

<script lang="ts">
import { LocaleObject } from "@nuxtjs/i18n";
import Vue from "vue";
export default Vue.extend({
  computed: {
    availableLocales() {
      return (this.$i18n.locales as LocaleObject[]).filter((i: LocaleObject) => i.code !== this.$i18n.locale);
    },
  },
});
</script>

<style lang="postcss" scoped>
.link {
  @apply text-blue-800 hover:text-blue-600 underline hover:no-underline;
}

@media print
{    
    .no-print, .no-print *
    {
        display: none!important;
    }
}
</style>
