<template>
  <v-container fluid class="h-100 bg-black">
    <v-row v-if="movie.movies.length > 0">
      <v-col v-for="(item, index) in movie.movies" cols="3">
        <MovieCard :key="item.id || index" :data="item" />
      </v-col>
    </v-row>
    <Loading v-else-if="movie.loading" indeterminate :size="50" />
    <NoResultFound v-else />
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useInfiniteScroll } from 'hooks';
import { Loading, MovieCard, NoResultFound } from 'src/components';

const store = useStore();
const movie = store.state.movie;

useInfiniteScroll({
  onScrollToBottom: () => {
    if (movie.loading || movie.page >= movie.totalPages) return;
    if (movie.searchText.length === 0) {
      store.dispatch('movie/getUpcomingMovies', { page: movie.page + 1 });
    } else {
      store.dispatch('movie/searchMovies', {
        page: movie.page + 1,
        query: movie.searchText,
      });
    }
  },
});

onMounted(() => {
  if (movie.searchText.length === 0 && movie.movies.length === 0) {
    store.dispatch('movie/getUpcomingMovies', { page: 1 });
  }
});
</script>
