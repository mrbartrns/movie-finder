<template>
  <nav class="header">
    <SearchInputWrapper>
      <SearchInput />
    </SearchInputWrapper>
  </nav>
</template>
<script>
import SearchInput from './SearchInput';
import SearchInputWrapper from './SearchInputWrapper';

export default {
  components: {
    SearchInput,
    SearchInputWrapper,
  },
};
</script>
<style
  lang="scss"
  scoped
>
@use '@/scss/_mixins.scss' as mixins;
@use '@/scss/_vars.scss' as vars;

.header {
  @include mixins.flexBox($justify: center, $align: center);
  position: sticky;
  top: 0;
  z-index: 9;
  border-bottom: 1px solid rgba(223, 225, 229, 0);
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
  background-color: #eec0c6;
  background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
}
</style>
