<template>
  <div>
    <Title />

    <Description />

    <WorkExperience />

    <Education />

    <References />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  head() {
    return {
      title: this.$t("resume.title").toString(),
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: this.$t("resume.description").toString(),
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.$t("resume.title").toString(),
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.$t("resume.description").toString(),
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.$t("resume.image").toString(),
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.$t("resume.url").toString(),
        },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: this.$t("resume.title").toString(),
        },
        { hid: "twitter:card", name: "twitter:card", content: "summary" },
        { hid: "twitter:site", name: "twitter:site", content: "@srgrcp" },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.$t("resume.title").toString(),
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.$t("resume.description").toString(),
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.$t("resume.image").toString(),
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.$t("resume.title").toString(),
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: this.$t("resume.url").toString(),
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
          content: this.$t("resume.title").toString(),
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
});
</script>
