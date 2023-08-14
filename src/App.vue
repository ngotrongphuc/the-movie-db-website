<template>
  <v-container fluid class="d-flex pa-0">
    <NavBar>
      <router-view />
    </NavBar>
  </v-container>
</template>

<script lang="ts" setup>
import NavBar from 'src/layouts/NavBar.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';

const store = useStore();

onMounted(() => {
  _.isEmpty(store.state.movie.genres) && store.dispatch('movie/getGenres');
  _.isEmpty(store.state.movie.languages) &&
    store.dispatch('movie/getLanguages');
});
</script>
