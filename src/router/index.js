import * as VueRouter from 'vue-router';
import NotFound from 'src/pages/NotFound.vue';
import Home from 'src/pages/Home.vue';
import NowPlaying from 'src/pages/NowPlaying.vue';
import Popular from 'src/pages/Popular.vue';
import TopRated from 'src/pages/TopRated.vue';
import Upcoming from 'src/pages/Upcoming.vue';
import Details from 'src/pages/Details.vue';
import About from 'src/pages/About.vue';
import { nextTick } from 'vue';
import { ENV, TITLE } from 'src/constants';
import { useStore } from 'vuex';
import store from 'src/store';

const routes = [
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound' },
  { path: '/', component: Home, name: 'Home' },
  {
    path: '/now-playing',
    component: NowPlaying,
    name: 'NowPlaying',
    meta: { title: 'Now Playing' },
  },
  {
    path: '/popular',
    component: Popular,
    name: 'Popular',
    meta: { title: 'Popular' },
  },
  {
    path: '/top-rated',
    component: TopRated,
    name: 'TopRated',
    meta: { title: 'Top Rated' },
  },
  {
    path: '/upcoming',
    component: Upcoming,
    name: 'Upcoming',
    meta: { title: 'Upcoming' },
  },
  {
    path: '/details/:id',
    component: Details,
    name: 'Details',
  },
  {
    path: '/about',
    component: About,
    name: 'About',
    meta: { title: 'About' },
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(ENV.BASE_URL),
  routes,
});

router.afterEach((to, from, failure) => {
  nextTick(() => {
    document.title = to.meta.title || TITLE.TAB_TITLE;
  });
});

router.beforeEach(() => {
  store.commit('movie/resetFilters');
});

export default router;
