import { ITEMS } from 'src/constants';

export default {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setMovies(state, payload) {
    if (payload.page === 1) {
      state.movies = payload.results;
    } else {
      state.movies = [...state.movies, ...payload.results];
    }
    state.page = payload.page;
    state.totalPages = payload.total_pages;
  },
  setSearchText(state, payload) {
    state.searchText = payload;
  },
  clearMovies(state, payload) {
    state.movies = [];
  },
  setMovieDetails(state, payload) {
    state.movieDetails = payload;
  },
  clearMovieDetails(state, payload) {
    state.movieDetails = {};
  },
  setGenres(state, payload) {
    state.genres = payload.genres;
  },
  setLanguages(state, payload) {
    state.languages = payload;
  },
  setFilters(state, payload) {
    state.filters = { ...state.filters, ...payload };
  },
  resetFilters(state, payload) {
    state.filters = {
      ...state.filters,
      with_genres: [],
      with_original_language: null,
      primary_release_year: null,
      sort_by: ITEMS.SORT_BY[0].value + '.' + ITEMS.SORT_ORDER[1].value,
    };
  },
  setLanguage(state, payload) {
    state.filters.language = payload;
  },
};
