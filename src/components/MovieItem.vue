<template>
  <div
    v-if="movieInfo[1] && movieInfo[1] !== 'N/A'"
    class="movie__item"
  >
    {{ info }}
  </div>
</template>
<script>
export default {
  props: {
    movieInfo: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    info() {
      return `${this.movieInfo[0]}: ${this.movieInfo[1]}`;
    },
  },
};
</script>
