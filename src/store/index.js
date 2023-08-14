import { createStore } from 'vuex';
import movie from './modules/movie';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => {
    return {
      movie: {
        filters: {
          language: state.movie.filters.language,
        },
      },
    };
  },
});

const store = createStore({
  modules: {
    movie,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
