import * as api from 'src/api';

export default {
  async getDiscoverMovies({ commit, state }, params) {
    commit('setSearchText', '');
    commit('setLoading', true);
    const result = await api.getDiscoverMovies({ ...params, ...state.filters });
    commit('setMovies', result);
    commit('setLoading', false);
  },
  async getNowPlayingMovies({ commit, state }, params) {
    commit('setSearchText', '');
    commit('setLoading', true);
    const result = await api.getNowPlayingMovies({
      ...params,
      ...state.filters,
    });
    commit('setMovies', result);
    commit('setLoading', false);
  },
  async getPopularMovies({ commit, state }, params) {
    commit('setSearchText', '');
    commit('setLoading', true);
    const result = await api.getPopularMovies({ ...params, ...state.filters });
    commit('setMovies', result);
    commit('setLoading', false);
  },
  async getTopRatedMovies({ commit, state }, params) {
    commit('setSearchText', '');
    commit('setLoading', true);
    const result = await api.getTopRatedMovies({ ...params, ...state.filters });
    commit('setMovies', result);
    commit('setLoading', false);
  },
  async getUpcomingMovies({ commit, state }, params) {
    commit('setSearchText', '');
    commit('setLoading', true);
    const result = await api.getUpcomingMovies({ ...params, ...state.filters });
    commit('setMovies', result);
    commit('setLoading', false);
  },
  async searchMovies({ commit, state }, params) {
    commit('setSearchText', params.query);
    commit('setLoading', true);
    const result = await api.searchMovies({ ...params, ...state.filters });
    commit('setMovies', result);
    commit('setLoading', false);
  },
  async getMovieDetails({ commit, state }, params) {
    commit('setLoading', true);
    const result = await api.getMovieDetails({ ...params, ...state.filters });
    commit('setMovieDetails', result);
    commit('setLoading', false);
  },
  async getGenres({ commit }, params) {
    const result = await api.getGenres(params);
    commit('setGenres', result);
  },
  async getLanguages({ commit }, params) {
    const result = await api.getLanguages(params);
    commit('setLanguages', result);
  },
};
