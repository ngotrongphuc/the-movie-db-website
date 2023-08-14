import axios from 'axios';
import { URL, AUTH } from 'src/constants';

const axiosInstance = axios.create({
  baseURL: URL.BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH.ACCESS_TOKEN}`,
  },
});

export const getDiscoverMovies = async (params) => {
  try {
    const { data } = await axiosInstance.get(`/discover/movie`, {
      params,
    });
    console.log('discover', data, params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNowPlayingMovies = async (params) => {
  try {
    const { data } = await axiosInstance.get(`/movie/now_playing`, {
      params,
    });
    console.log('now-playing', data, params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = async (params) => {
  try {
    const { data } = await axiosInstance.get(`/movie/popular`, {
      params,
    });
    console.log('popular', data, params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTopRatedMovies = async (params) => {
  try {
    const { data } = await axiosInstance.get(`/movie/top_rated`, {
      params,
    });
    console.log('top-rated', data, params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingMovies = async (params) => {
  try {
    const { data } = await axiosInstance.get(`/movie/upcoming`, {
      params,
    });
    console.log('upcoming', data, params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchMovies = async (params) => {
  try {
    const { data } = await axiosInstance.get(`/search/movie`, { params });
    console.log('search', data, params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async ({ movie_id, ...params }) => {
  try {
    const { data: detailsData } = await axiosInstance.get(
      `/movie/${movie_id}`,
      { params }
    );
    const { data: creditsData } = await axiosInstance.get(
      `/movie/${movie_id}/credits`
    );
    const { data: videosData } = await axiosInstance.get(
      `/movie/${movie_id}/videos`
    );
    return {
      ...detailsData,
      cast: creditsData.cast,
      crew: creditsData.crew,
      videosData: videosData.results,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getGenres = async (params) => {
  try {
    const { data } = await axiosInstance.get(`/genre/movie/list`);
    console.log('genres', data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLanguages = async (params) => {
  try {
    const { data } = await axiosInstance.get(`/configuration/languages`);
    console.log('languages', data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
