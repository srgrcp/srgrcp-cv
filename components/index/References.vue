<template>
  <Section>
    <SectionTitle>
      {{ $t("resume.referencesTitle") }}
    </SectionTitle>

    <Section v-for="(reference, i) in $t(`resume.references`)" :key="i">
      <h3 class="font-semibold">
        {{ reference.name }}, {{ reference.position }} - {{ reference.company }}
      </h3>
      <a class="underline" :href="`mailto:${reference.email}`"> {{ reference.email }} </a>
      <p class="text-gray-500 text-sm"> {{ reference.phone }} </p>
    </Section>
  </Section>
</template>