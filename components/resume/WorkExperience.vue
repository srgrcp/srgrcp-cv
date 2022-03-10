<template>
  <Section>
    <SectionTitle> {{ $t("resume.workExperienceTitle") }} </SectionTitle>

    <Section v-for="(workExperience, i) in $t(`resume.workExperience`)" :key="i">
      <h3 class="font-semibold"> {{ workExperience.position }} </h3>
      <p> {{ workExperience.company }} </p>
      <p class="text-gray-500 dark:text-stone-400 text-sm"> {{ workExperience.time }} </p>
      <p class="mt-3"> {{ workExperience.description }} </p>

      <ul class="list-disc list-inside pt-3">
        <li v-for="(stack, j) in $t(`resume.workExperience[${i}].stack`)" :key="j"> {{ stack }} </li>
      </ul>
    </Section>
  </Section>
</template>
