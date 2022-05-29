<template>
  <div class="score-board">
    <div class="score-board__score"><slot name="score"></slot></div>
    <div class="score-board__company"><slot name="company"></slot></div>
  </div>
</template>
<style
  lang="scss"
  scoped
>
@use '@/scss/_vars.scss' as vars;
@use '@/scss/_mixins.scss' as mixins;

.score-board {
  flex-basis: 120px;
  @include mixins.flexBox($direction: column, $justify: center, $align: center);
  align-items: center;
  text-align: center;
  height: 120px;
  padding: 1rem;
  border: 1px solid vars.$gray;
  border-radius: 0.5rem;

  &__score {
    font-weight: 700;
    font-size: 1.5rem;
  }

  &__company {
    font-weight: 500;
    font-size: 0.825rem;
  }

  @include mixins.mobile {
    flex: 1;
    width: 100%;
  }
}

.imdb {
  background-color: #ffd24c;
}

.rotten-tomatoes {
  color: white;
  background-color: #fa320a;
}

.metacritic {
  color: white;
  background-color: #111111;
}
</style>
