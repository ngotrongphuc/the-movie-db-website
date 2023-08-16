<template>
  <v-dialog
    v-model="dialog"
    width="80%"
    max-height="80%"
    persistent
    no-click-animation
  >
    <v-card class="filter-dialog bg-grey-darken-4 h-100 pa-2">
      <v-card-title> Filter </v-card-title>
      <v-card-subtitle class="text-subtitle-1 px-6">Genres</v-card-subtitle>
      <v-card-text class="px-8">
        <v-chip-group
          v-model="selectedGenres"
          multiple
          selected-class="text-blue-lighten-1"
          class="pt-0 pb-4"
        >
          <v-chip
            v-for="(genre, index) in store.state.movie.genres"
            :key="genre?.id || index"
          >
            {{ genre?.name }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-subtitle class="text-subtitle-1 px-6">Language</v-card-subtitle>
      <v-card-text class="px-8">
        <v-autocomplete
          v-model="selectedLanguage"
          :items="store.state.movie.languages"
          item-title="english_name"
          item-value="iso_639_1"
          variant="outlined"
          clearable
        />
      </v-card-text>
      <v-card-subtitle class="text-subtitle-1 px-6">Year</v-card-subtitle>
      <v-card-text class="px-8">
        <v-select
          v-model="selectedYear"
          :items="availableYears"
          variant="outlined"
          clearable
        />
      </v-card-text>
      <v-card-title>Sort</v-card-title>
      <v-card-text class="px-8 d-flex">
        <v-col class="pa-0 pe-2">
          <v-select
            v-model="selectedSortBy"
            :items="ITEMS.SORT_BY"
            item-title="title"
            item-value="value"
            variant="outlined"
          />
        </v-col>
        <v-col class="pa-0" cols="3">
          <v-select
            v-model="selectedSortOrder"
            :items="ITEMS.SORT_ORDER"
            item-title="title"
            item-value="value"
            variant="outlined"
          />
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue-darken-1" variant="outlined" @click="resetFilter">
          Reset
        </v-btn>
        <v-spacer />
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue-darken-1" variant="flat" @click="confirmFilter">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import { getAvailableYears } from 'src/utils/helpers';
import { ITEMS } from 'src/constants';
import { useRouter } from 'vue-router';

type FilterDialog = {
  modelValue?: boolean;
};

const props = withDefaults(defineProps<FilterDialog>(), {
  modelValue: false,
});

const router = useRouter();
const store = useStore();

const emit = defineEmits(['update:modelValue']);

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const availableYears = getAvailableYears(1874);
const selectedGenres = ref([]);
const selectedLanguage = ref(null);
const selectedYear = ref(null);
const selectedSortBy = ref(ITEMS.SORT_BY[0].value);
const selectedSortOrder = ref(ITEMS.SORT_ORDER[1].value);

const resetFilter = () => {
  selectedGenres.value = [];
  selectedLanguage.value = null;
  selectedYear.value = null;
  selectedSortBy.value = ITEMS.SORT_BY[0].value;
  selectedSortOrder.value = ITEMS.SORT_ORDER[1].value;
};

const confirmFilter = () => {
  const selectedGenreIds = selectedGenres.value.map(
    (indexValue) => store.state.movie.genres[indexValue]?.id,
  );
  const filtersPayload = {
    with_genres: selectedGenreIds.join(','),
    with_original_language: selectedLanguage.value,
    primary_release_year: selectedYear.value,
    sort_by: selectedSortBy.value + '.' + selectedSortOrder.value,
  };

  router.push('/').then(() => {
    store.commit('movie/setFilters', filtersPayload);
    store.dispatch('movie/getDiscoverMovies', {
      page: 1,
    });
  });

  dialog.value = false;

  nextTick(() => {
    window.scrollTo({
      top: 0,
    });
  });
};
</script>

<style scoped>
.filter-dialog {
  border-radius: 10px !important;
  box-shadow: 1px 2px 8px rgb(100, 100, 100) !important;
}
</style>
