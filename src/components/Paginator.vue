<template>
  <ul class="pagination">
    <li :class="`page-item ${currentIndex <= 1 ? 'disabled' : ''}`">
      <RouterLink
        class="page-link"
        :to="`${baseUrl}${currentIndex - 1}`"
      >
        이전
      </RouterLink>
    </li>
    <li
      v-for="page in paginator"
      :key="page"
      :class="`page-item ${currentIndex === page ? 'active' : ''}`"
    >
      <RouterLink
        class="page-link"
        :to="`${baseUrl}${page}`"
      >
        {{ page }}
      </RouterLink>
    </li>
    <li
      :class="`page-item ${
        currentIndex >= paginator[paginator.length - 1] ? 'disabled' : ''
      }`"
    >
      <RouterLink
        class="page-link"
        :to="`${baseUrl}${currentIndex + 1}`"
      >
        다음
      </RouterLink>
    </li>
  </ul>
</template>
<script>
import { getPaginator } from '@/utils/Paginator';
export default {
  props: {
    totalItems: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 5,
    },
    postPerPage: {
      type: Number,
      default: 10,
    },
    currentIndex: {
      type: Number,
      default: 1,
    },
    baseUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    paginator() {
      return getPaginator({
        totalItems: this.totalItems,
        offset: this.offset,
        postPerPage: this.postPerPage,
        currentIndex: this.currentIndex,
      });
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
.disabled {
  pointer-events: none;
  cursor: default;
}

.pagination {
  justify-content: center;
}
</style>
