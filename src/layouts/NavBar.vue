<template>
  <v-card class="d-flex flex-grow-1">
    <v-layout>
      <v-app-bar color="grey-darken-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-img
          :max-width="100"
          :src="logo"
          class="logo mx-2 py-6"
          @click="goToHome"
        />

        <v-spacer />

        <SearchBar />
        <v-btn icon="mdi-filter" @click="filterDialog = true" />
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props" />
          </template>
          <v-list @click:select="onSelectSettingItem">
            <v-list-item
              v-for="item in settingItems"
              :key="item.value"
              :value="item"
            >
              <v-list-item-title v-text="item.title" />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer color="grey-darken-3" v-model="drawer" temporary>
        <v-list @click:select="onSelectDrawerItem">
          <v-list-item
            v-for="item in drawerItems"
            :key="item.value"
            :value="item"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" />
            </template>
            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <FilterDialog v-model="filterDialog" />
      <LanguageDialog v-model="languageDialog" />

      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { FilterDialog, LanguageDialog, SearchBar } from 'src/components';
import { useRoute, useRouter } from 'vue-router';
import logo from 'src/assets/long_logo.svg';
import store from 'src/store';

const router = useRouter();
const route = useRoute();

const currentRoutePath = computed(() => route.path);

const drawer = ref(false);
const filterDialog = ref(false);
const languageDialog = ref(false);

const drawerItems = [
  {
    title: 'Discover',
    value: '/',
    icon: 'mdi-compass',
  },
  {
    title: 'Now Playing',
    value: '/now-playing',
    icon: 'mdi-theater',
  },
  {
    title: 'Popular',
    value: '/popular',
    icon: 'mdi-trending-up',
  },
  {
    title: 'Top Rated',
    value: '/top-rated',
    icon: 'mdi-movie-star-outline',
  },
  {
    title: 'Upcoming',
    value: '/upcoming',
    icon: 'mdi-new-box',
  },
];
const settingItems = [
  {
    title: 'Language',
    value: 'language',
  },
];

const goToHome = () => {
  store.commit('movie/setSearchText', '');
  store.commit('movie/resetFilters');
  store.commit('movie/clearMovies');
  router.push('/').then(() => {
    store.dispatch('movie/getDiscoverMovies', { page: 1 });
  });
};

const onSelectDrawerItem = ({ id: item }: { id: any }) => {
  drawer.value = false;
  if (currentRoutePath.value === item.value) return;
  store.commit('movie/setSearchText', '');
  store.commit('movie/clearMovies');
  router.push(item.value);
};

const onSelectSettingItem = ({ id: item }: { id: any }) => {
  switch (item.value) {
    case 'language':
      languageDialog.value = true;
      break;
    default:
      break;
  }
};
</script>

<style scoped>
.logo {
  cursor: pointer;
}
a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
