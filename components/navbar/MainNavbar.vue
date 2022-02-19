<template>
  <div class="w-full border-b border-slate-800">
    <div class="container mx-auto flex justify-center">
      <nuxt-link class="nav-item uppercase text-sm" :to="localePath('blog')">
        <span>
          {{ $t('app.blog') }}
        </span>
      </nuxt-link>
      
      <nuxt-link class="h-16 overflow-visible p-2 flex justify-center items-center hover:bg-slate-100 group" :to="localePath('/')">
        <img class="w-24 h-24 transition ease-in-out delay-75 group-hover:scale-110" src="/icon.png" :alt="$t('app.logoAlt')">
      </nuxt-link>
      
      <nuxt-link class="nav-item uppercase text-sm" :to="localePath('resume')">
        <span>
          {{ $t('app.resume') }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.nav-item {
  @apply flex px-8 md:px-24 items-center justify-center font-semibold text-slate-700 hover:text-slate-500 hover:underline hover:bg-slate-100;
}
.nav-item span {
  @apply w-16 md:w-24 text-center;
}
</style>
