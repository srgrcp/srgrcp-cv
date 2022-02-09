<template>
  <Section>
    <SectionTitle>
      {{ $t("educationTitle") }}
    </SectionTitle>

    <Section v-for="(education, i) in $t(`education`)" :key="i">
      <h3 class="font-semibold">
        {{ education.school }}
      </h3>
      <p class="text-gray-500 text-sm">
        {{ education.time }}
      </p>
      <p>
        {{ education.career }}
      </p>
    </Section>
  </Section>
</template>