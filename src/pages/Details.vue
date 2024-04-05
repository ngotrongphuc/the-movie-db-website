<template>
  <v-container fluid class="h-100 bg-black pt-16">
    <v-btn
      icon="mdi-arrow-left"
      variant="text"
      density="compact"
      class="btn-back mt-n12"
      @click="goBack"
    />
    <div v-if="movie.loading" class="d-flex align-center justify-center h-100">
      <v-progress-circular indeterminate :size="50" />
    </div>
    <div v-else>
      <v-row no-gutters class="pa-0">
        <v-col class="pe-4" order="1" order-sm="0">
          <v-row no-gutters class="align-end">
            <p class="text-h6 text-blue-grey-lighten-3 me-2">Title:</p>
            <p class="text-h6">
              {{ movie.movieDetails?.title }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-2 text-blue-grey-lighten-3 me-2">
              Original title:
            </p>
            <p class="text-subtitle-2">
              {{ movie.movieDetails?.original_title }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">Genre:</p>
            <p class="text-subtitle-1">
              {{ genres }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Director:
            </p>
            <p class="text-subtitle-1">
              {{ directors }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">Cast:</p>
            <p class="text-subtitle-1">
              {{ casts }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Country:
            </p>
            <p class="text-subtitle-1">
              {{ countries }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Company:
            </p>
            <p class="text-subtitle-1">
              {{ companies }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">Status:</p>
            <p class="text-subtitle-1">
              {{ movie.movieDetails?.status }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Release date:
            </p>
            <p class="text-subtitle-1">
              {{ movie.movieDetails?.release_date }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Duration:
            </p>
            <p class="text-subtitle-1">
              {{ movie.movieDetails?.runtime }} mins
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Popularity:
            </p>
            <p class="text-subtitle-1">
              {{ movie.movieDetails?.popularity }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Vote average:
            </p>
            <p class="text-subtitle-1">
              {{ _.round(movie.movieDetails?.vote_average, 1) }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Vote count:
            </p>
            <p class="text-subtitle-1">
              {{ movie.movieDetails?.vote_count }}
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">Budget:</p>
            <p class="text-subtitle-1">
              {{ movie.movieDetails?.budget?.toLocaleString('en-US') }} $
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Revenue:
            </p>
            <p class="text-subtitle-1">
              {{ movie.movieDetails?.revenue?.toLocaleString('en-US') }} $
            </p>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Homepage:
            </p>
            <a
              class="text-subtitle-1 text-white"
              :href="movie.movieDetails?.homepage"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ movie.movieDetails?.homepage }}
            </a>
          </v-row>
          <v-row no-gutters class="align-end">
            <p class="text-subtitle-1 text-blue-grey-lighten-3 me-2">
              Overview:
            </p>
            <p class="text-subtitle-1">
              {{ movie.movieDetails?.overview }}
            </p>
          </v-row>
        </v-col>
        <v-col cols="12" sm="3">
          <v-img
            :src="POSTER_URL"
            :lazy-src="URL.LAZY_LOADING_URL"
            :aspect-ratio="648 / 973"
          />
        </v-col>
      </v-row>

      <div
        v-if="videos?.length > 0"
        class="h-screen d-flex align-center justify-center"
      >
        <v-carousel v-model="playersModel" :hide-delimiters="true">
          <v-carousel-item
            v-for="(item, index) in videos"
            content-class="px-16 pb-16"
          >
            <iframe
              class="youtube-player"
              :key="item?.key || index"
              :src="`${URL.EMBED_YOUTUBE_URL}/${item?.key}?enablejsapi=1`"
              frameborder="0"
              loading="lazy"
              allowfullscreen
              width="100%"
              height="100%"
            />
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { URL, ENV, TITLE } from 'src/constants';
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import _ from 'lodash';

const router = useRouter();
const route = useRoute();
const movieId = ref<string>('');
const store = useStore();
const movie = store.state.movie;
const playersModel = ref(0);

const pauseAllPlayers = () => {
  const youtubePlayers =
    document.querySelectorAll<HTMLIFrameElement>('.youtube-player');
  youtubePlayers.forEach((youtubePlayer) => {
    youtubePlayer?.contentWindow?.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      '*',
    );
  });
};

watch(playersModel, () => {
  pauseAllPlayers();
});

const goBack = () => {
  router.back();
};

const POSTER_URL = computed(() =>
  movie.movieDetails?.poster_path
    ? `${URL.BASE_POSTER_URL}${movie.movieDetails?.poster_path}?api_key=${ENV.API_KEY}`
    : URL.NO_IMAGE_URL,
);

const genres = computed(() => store.getters['movie/getGenres']?.join(', '));
const directors = computed(
  () => store.getters['movie/getDirectors']?.join(', '),
);
const casts = computed(() => {
  const listCasts = store.getters['movie/getCasts'];
  const hasMoreStr = listCasts?.hasMore && ',...';
  return listCasts?.listCastsName?.join(', ') + hasMoreStr;
});
const countries = computed(
  () => store.getters['movie/getProductionCountries']?.join(', '),
);
const companies = computed(
  () => store.getters['movie/getProductionCompanies']?.join(', '),
);
const videos = computed(() => store.getters['movie/getVideos']);

watch(
  () => movie.movieDetails?.title,
  () => {
    document.title = movie.movieDetails?.title || TITLE.TAB_TITLE;
  },
);

onMounted(() => {
  movieId.value = route.params.id as string;
  store.dispatch('movie/getMovieDetails', { movie_id: movieId.value });
});

onBeforeUnmount(() => {
  store.commit('movie/clearMovieDetails');
});
</script>

<style scoped>
.btn-back {
  position: fixed;
}
</style>
