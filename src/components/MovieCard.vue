<template>
  <v-card class="movie-card h-100 pa-2 bg-grey-darken-4" @click="goToDetails">
    <v-img
      :src="POSTER_URL"
      :lazy-src="URL.LAZY_LOADING_URL"
      :aspect-ratio="648 / 973"
    />
    <v-card-title class="px-0 pb-0 movie-title">
      {{ props.data?.title }}
    </v-card-title>
    <v-card-text class="px-0 pt-0 align-center d-flex">
      <v-icon size="x-large" color="amber" icon="mdi-star" />
      <span class="text-subtitle-1 font-weight-bold">{{
        _.round(props.data?.vote_average, 1)
      }}</span>
    </v-card-text>
    <v-card-subtitle class="px-0 movie-overview">
      {{ props.data?.overview }}
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { URL, ENV } from 'src/constants';
import _ from 'lodash';
import { useRouter } from 'vue-router';

type MovieCard = {
  data?: any | null;
};

const props = withDefaults(defineProps<MovieCard>(), {
  data: null,
});

const router = useRouter();

const POSTER_URL = computed(() =>
  props.data?.poster_path
    ? `${URL.BASE_POSTER_URL}${props.data?.poster_path}?api_key=${ENV.API_KEY}`
    : URL.NO_IMAGE_URL,
);

const goToDetails = () => {
  router.push('/details/' + props.data?.id);
};
</script>

<style scoped>
.movie-card {
  cursor: pointer;
}
.movie-title {
  white-space: initial;
}
.movie-overview {
  white-space: initial;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
