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
            <ScoreBoard
              v-for="item in movie.Ratings"
              :key="item.Source"
              :class="alias[item.Source][0]"
            >
              <template #score>{{ item.Value }}</template>
              <template #company>{{ alias[item.Source][1] }}</template>
            </ScoreBoard>
          </div>
          <div class="movie__info">
            <template v-if="movie !== {} && !isLoading">
              <MovieItem
                v-for="item in info"
                :key="item[0]"
                :movie-info="item"
              />
            </template>
          </div>
          <div
            v-if="movie.Plot && movie.Plot !== 'N/A'"
            class="movie__plot"
          >
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
import ScoreBoard from '@/components/ScoreBoard';
import MovieItem from '@/components/MovieItem';

export default {
  components: { Container, Loading, ScoreBoard, MovieItem },
  data() {
    return {
      movie: {},
      alias: {
        'Internet Movie Database': ['imdb', 'IMDB'],
        'Rotten Tomatoes': ['rotten-tomatoes', 'Rotten Tomatoes'],
        Metacritic: ['metacritic', 'Metacritic'],
      },
      infoAlias: {
        Released: 'Released at',
        Genre: '장르',
        Runtime: '런타임',
        Awards: '수상',
        Director: '감독',
        Writer: '작가',
        Actors: '출연진',
      },
    };
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    info() {
      return Object.keys(this.infoAlias).map((key) => {
        return [this.infoAlias[key], this.movie[key]];
      });
    },
  },
  created() {
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
  }

  &__content {
    flex: 2;
    width: 100%;
  }

  &__ratings {
    @include mixins.flexBox($wrap: wrap);
    gap: 1rem;
    margin: 1.5rem 0;
  }

  &__info {
    margin-bottom: 1.5rem;
  }
}
</style>
