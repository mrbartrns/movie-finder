<template>
  <div class="search-input-wrapper">
    <div class="icon-wrapper">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    <slot></slot>
  </div>
</template>
<style
  lang="scss"
  scoped
>
@use '@/scss/_mixins.scss' as mixins;
@use '@/scss/_vars.scss' as vars;

.search-input-wrapper {
  @include mixins.defaultBoxDesign($m: 0.25rem, $p: 0.5rem 1rem);
  background-color: white;
}

.icon-wrapper {
  @include mixins.flexBox($justify: center, $align: center);
  padding: 0 0.5rem;
  color: vars.$gray;
}
</style>
