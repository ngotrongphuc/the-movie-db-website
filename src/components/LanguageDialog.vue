<template>
  <v-dialog
    v-model="dialog"
    width="80%"
    max-height="80%"
    persistent
    no-click-animation
  >
    <v-card class="filter-dialog bg-grey-darken-4 h-100 pa-2">
      <v-card-title> Language </v-card-title>
      <v-card-text class="px-8">
        <v-autocomplete
          v-model="selectedLanguage"
          :items="store.state.movie.languages"
          item-title="english_name"
          item-value="iso_639_1"
          variant="outlined"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue-darken-1" variant="flat" @click="confirm">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';

type LanguageDialog = {
  modelValue?: boolean;
};

const props = withDefaults(defineProps<LanguageDialog>(), {
  modelValue: false,
});

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

const selectedLanguage = ref(store.state.movie.filters.language);

const confirm = () => {
  store.commit('movie/setLanguage', selectedLanguage.value);
  store.dispatch('movie/getDiscoverMovies', {
    page: 1,
  });
  dialog.value = false;
};
</script>

<style scoped>
.filter-dialog {
  border-radius: 10px !important;
  box-shadow: 1px 2px 8px rgb(100, 100, 100) !important;
}
</style>
