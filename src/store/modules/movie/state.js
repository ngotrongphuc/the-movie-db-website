import { ITEMS } from 'src/constants';

export default {
  loading: false,
  page: 1,
  searchText: '',
  movies: [],
  totalPages: 0,
  movieDetails: {},
  genres: [],
  languages: [],
  filters: {
    language: 'en',
    with_genres: [],
    with_original_language: null,
    primary_release_year: null,
    sort_by: ITEMS.SORT_BY[0].value + '.' + ITEMS.SORT_ORDER[1].value,
  },
};
