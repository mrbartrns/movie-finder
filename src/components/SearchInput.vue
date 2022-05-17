<template>
  <form
    class="search"
    @submit.prevent="onSubmit"
  >
    <input
      v-model="title"
      class="search__input"
      type="text"
      placeholder="Search"
    />
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: '',
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
  },
  watch: {
    query() {
      this.title = this.query.s || '';
    },
  },
  created() {
    this.title = this.query.s || '';
  },
  methods: {
    // TODO: 추가로 더 추상화할 여지가 있음
    onSubmit() {
      this.$router.push(`/search?s=${this.title}&page=1`);
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
/** TODO: 정리 필요 */
.search {
  width: 100%;
  &__input {
    width: 100%;
    border: none;
    outline: none;
  }
}
</style>
