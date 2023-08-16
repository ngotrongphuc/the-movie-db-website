<template>
  <v-text-field
    v-bind="$attrs"
    variant="plain"
    class="d-flex"
    density="compact"
    prepend-inner-icon="mdi-magnify"
    v-model="searchText"
    @update:modelValue="searchMovies"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const searchText = ref('');

onMounted(() => {
  searchText.value = store.state.movie.searchText;
});

watch(
  () => store.state.movie.searchText,
  () => {
    searchText.value = store.state.movie.searchText;
  },
);

const searchMovies = _.debounce((value) => {
  router.replace('/');
  store.commit('movie/clearMovies');
  if (value) {
    store.dispatch('movie/searchMovies', { page: 1, query: value });
  } else {
    store.dispatch('movie/getDiscoverMovies', { page: 1 });
  }
}, 1000);
</script>

<style scoped>
:deep(.v-input__control) {
  flex: 1;
  color: black;
  background-color: white;
  border: 1px solid black;
  border-radius: 99px;
  padding: 0px 15px;
}
</style>
