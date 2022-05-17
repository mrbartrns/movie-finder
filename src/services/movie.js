import api, { API_DEFAULT_PARAMS } from './instance';

class MovieService {
  /**
   * MovieData
   * Title: string
   * Year: string,
   * imdbID: string
   * Type: string
   * Poster: string
   * {
   * Search: [...MovieData],
   * totalResults: string(number)
   * Response: string(boolean)
   * }
   */
  getMovieList(query) {
    return api.get('', { params: { ...API_DEFAULT_PARAMS, ...query } });
  }

  /**
   * Title: string
   * Year: string(number),
   * Rated: string
   * Released: string
   * Runtime: string
   * Genre: string
   * Director: string
   * Writer: string
   * Actors: string
   * Plot: string
   * Language: string
   * Country: string
   * Awards: string
   * Poster: string(src)
   * Ratings: [{ Source: string, Value: String }]
   * Metascore: string(number)
   * imdbRating: string(number)
   * imdbVotes: string(number)
   * imdbID: string
   * Type: string
   * DVD: string
   * BoxOffice: string
   * Production: string
   * Website: string
   * Response: string(boolean)
   */
  getMovieDetail(query) {
    return api.get('', { params: { ...API_DEFAULT_PARAMS, ...query } });
  }
}

export default new MovieService();
