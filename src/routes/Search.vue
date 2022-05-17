<template>
  <Header />
  <Container>
    <div class="search-wrapper">
      <h1>검색 결과</h1>
      <Loading v-if="isLoading" />
      <template v-else>
        <ul v-if="apiData.Response === 'False'">
          <li>영화를 찾지 못했습니다.</li>
        </ul>
        <ul
          v-else
          class="search-results"
        >
          <li
            v-for="movie in apiData.Search"
            :key="movie.imdbID"
            class="search-results__item"
          >
            <RouterLink :to="`/movie/${movie.imdbID}`">
              <div class="poster-viewer">
                <div class="poster-viewer__img">
                  <img
                    v-if="movie.Poster !== 'N/A'"
                    :src="movie.Poster"
                  />
                </div>
                <div class="poster-viewer__content">
                  <h3 class="poster-viewer__content__title">
                    {{ movie.Title }}
                  </h3>
                  <div class="poster-viewer__content__description">
                    <div>{{ movie.Year }}년</div>
                    <div>{{ movie.Type }}</div>
                  </div>
                </div>
              </div>
            </RouterLink>
          </li>
        </ul>
        <!--
    TODO: baseUrl y option 처리하기
    -->
        <Paginator
          v-if="!isNaN(Number(apiData.totalResults))"
          :total-items="Number(apiData.totalResults)"
          :offset="5"
          :post-per-page="10"
          :base-url="`/search?&s=${query.s}&page=`"
          :current-index="query.page"
        />
      </template>
    </div>
  </Container>
</template>
<script>
import movieService from '@/services/movie';
import Paginator from '@/components/Paginator';
import Header from '@/components/Header';
import Container from '@/components/Container';
import Loading from '@/components/Loading';

export default {
  components: {
    Container,
    Header,
    Paginator,
    Loading,
  },
  data() {
    return {
      apiData: {},
    };
  },
  computed: {
    query() {
      return {
        s: this.$route.query.s,
        y: this.$route.query.y,
        page: Number(this.$route.query.page) || 1,
      };
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  watch: {
    query() {
      /**
       * page를 이동하면서 쿼리가 바뀌므로
       * 다른 페이지로 이동 시 잘못된 데이터를 요청하지 않도록
       * 해당 페이지에서만 fetch하도록 함
       */
      if (this.$route.path === '/search') {
        this.fetchData();
      }
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    async getMovieList() {
      const data = await movieService
        .getMovieList(this.query)
        .then((response) => response.data);
      this.apiData = data;
      return data;
    },
    fetchData() {
      this.$store.dispatch('fetchData', this.getMovieList);
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
@use '@/scss/mixins.scss' as mixins;
.search-wrapper {
  position: relative;
  margin-top: 2rem;
}

.poster-viewer {
  @include mixins.defaultBoxDesign($radius: 0.25rem);
  height: 200px;

  &__img {
    display: flex;
    /* flex: 1; */
    flex-basis: 150px;
    border-radius: 0.25rem;
    background-color: #eec0c6;
    background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
    img {
      flex: 1;
      display: inline-block;
      object-fit: cover;
      width: 100%;
      /* max-width: 150px; */
      max-height: 200px;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }
  }

  &__content {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;

    &__title {
      /* width: 358px; */
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    &__description {
      margin-top: auto;
    }
  }

  @include mixins.mobile {
    flex-direction: column;
    height: auto;

    &__img {
      flex: 100%;
      img {
        border-radius: 0.25rem;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}

ul {
  padding: 0;
  list-style: none;
}

.search-results {
  @include mixins.flexBox($wrap: wrap);

  &__item {
    width: calc(50% - 1rem);
    margin: 0.25rem;

    @include mixins.tablet {
      width: 100%;
    }
  }
}
</style>
