<template>
  <Container>
    <div class="home">
      <div class="blank"></div>
      <h1 class="title">영화 검색기</h1>
      <div class="search-form">
        <SearchInputWrapper>
          <SearchInput />
        </SearchInputWrapper>
      </div>
    </div>
  </Container>
</template>
<script>
import SearchInput from '@/components/SearchInput';
import SearchInputWrapper from '@/components/SearchInputWrapper';
import Container from '@/components/Container';

export default {
  components: {
    Container,
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

.home {
  @include mixins.flexBox($align: center, $direction: column);
  height: 100vh;
}

.title {
  @include mixins.flexBox($justify: center, $align: center);
  background-color: #eec0c6;
  background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

.blank {
  height: 33%;
}

.search-form {
  margin: 0 auto;
  width: 100%;
  max-width: 584px;
}
</style>
