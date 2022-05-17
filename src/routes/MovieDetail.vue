<template>
  <Container>
    <Loading v-if="isLoading" />
    <template v-else>
      <div class="flex-container movie">
        <div class="movie__poster">
          <img
            v-if="movie.Poster !== 'N/A'"
            :src="movie.Poster"
            class="movie__poster"
          />
          <div v-else>이미지가 없습니다.</div>
        </div>
        <div class="movie__content">
          <h1 class="movie__title">{{ movie.Title }}</h1>
          <div class="movie__ratings">
            <h2
              v-for="item in movie.Ratings"
              :key="item.Source"
            >
              {{ item.Source }}: {{ item.Value }}
            </h2>
          </div>
          <div class="movie__info">
            <div class="movie__info__item">
              Released at: {{ movie.Released }}
            </div>
            <div class="movie__info__item">장르: {{ movie.Genre }}</div>
            <div class="movie__info__item">런타임: {{ movie.Runtime }}</div>
            <div class="movie__info__item">{{ movie.Awards }}</div>
            <div class="movie__info__item">감독: {{ movie.Director }}</div>
            <div class="movie__info__item">작가: {{ movie.Writer }}</div>
            <div class="movie__info__item">출연진: {{ movie.Actors }}</div>
          </div>
          <div class="movie__plot">
            {{ movie.Plot }}
          </div>
        </div>
      </div>
    </template>
  </Container>
</template>
<script>
import movieService from '@/services/movie';
import Container from '@/components/Container';
import Loading from '@/components/Loading';

export default {
  components: { Container, Loading },
  data() {
    return {
      movie: {},
    };
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    // TODO: plot 부분 추후 설정 가능하게 변경
    this.fetchData();
  },
  methods: {
    async getMovieDetail() {
      const data = await movieService
        .getMovieDetail({ i: this.movieId, plot: 'full' })
        .then((response) => response.data);
      this.movie = data;
    },
    fetchData() {
      this.$store.dispatch('fetchData', this.getMovieDetail);
    },
  },
};
</script>
<style
  lang="scss"
  scoped
>
@use '@/scss/_mixins.scss' as mixins;
.flex-container {
  @include mixins.flexBox();
  gap: 1rem;

  @include mixins.tablet {
    align-items: center;
    flex-direction: column;
    gap: 0;
  }
}

.movie {
  margin: 1.5rem;

  &__poster {
    flex: 1;
    display: block;
  }

  &__content {
    flex: 2;
    width: 100%;
  }

  &__ratings {
    margin: 1.5rem 0;
  }

  &__info {
    margin-bottom: 1.5rem;
  }
}
</style>
