<template>
  <div class="loading">
    <div
      :class="`spinner-grow text-${color}`"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ],
    };
  },

  computed: {
    color() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
