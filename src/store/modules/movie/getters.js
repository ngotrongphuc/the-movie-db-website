import _ from 'lodash';

export default {
  getGenres(state) {
    return state.movieDetails?.genres?.map((genre) => genre.name);
  },
  getDirectors(state) {
    const listDirectors = state.movieDetails?.crew?.filter(
      ({ job }) => job === 'Director',
    );
    return listDirectors?.map((director) => director.name);
  },
  getCasts(state) {
    const listCasts = _.orderBy(
      state.movieDetails?.cast,
      ['popularity'],
      ['desc'],
    );
    const slicedListCasts = listCasts.slice(0, 5);
    const listCastsName = slicedListCasts?.map((cast) => cast.name);
    return { listCastsName, hasMore: listCasts.length > 5 };
  },
  getProductionCountries(state) {
    return state.movieDetails?.production_countries?.map(
      (country) => country.name,
    );
  },
  getProductionCompanies(state) {
    return state.movieDetails?.production_companies?.map(
      (company) => company.name,
    );
  },
  getVideos(state) {
    return state.movieDetails?.videosData?.filter(
      ({ site }) => site === 'YouTube',
    );
  },
};
